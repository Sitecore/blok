"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { mdiPaperclip } from "@mdi/js";
import type { ChatStatus, FileUIPart, SourceDocumentUIPart } from "ai";
import {
  ArrowUpIcon,
  Monitor,
  PlusIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";
import { nanoid } from "nanoid";
import type {
  ChangeEvent,
  ChangeEventHandler,
  ClipboardEventHandler,
  ComponentProps,
  FormEvent,
  FormEventHandler,
  HTMLAttributes,
  InputEventHandler,
  KeyboardEventHandler,
  PropsWithChildren,
  ReactNode,
  RefObject,
} from "react";
import {
  Children,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// ============================================================================
// Helpers
// ============================================================================

const convertBlobUrlToDataUrl = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    // FileReader uses callback-based API, wrapping in Promise is necessary
    // oxlint-disable-next-line eslint-plugin-promise(avoid-new)
    return new Promise((resolve) => {
      const reader = new FileReader();
      // oxlint-disable-next-line eslint-plugin-unicorn(prefer-add-event-listener)
      reader.onloadend = () => resolve(reader.result as string);
      // oxlint-disable-next-line eslint-plugin-unicorn(prefer-add-event-listener)
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
};

const captureScreenshot = async (): Promise<File | null> => {
  if (
    typeof navigator === "undefined" ||
    !navigator.mediaDevices?.getDisplayMedia
  ) {
    return null;
  }

  let stream: MediaStream | null = null;
  const video = document.createElement("video");
  video.muted = true;
  video.playsInline = true;

  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      audio: false,
      video: true,
    });

    video.srcObject = stream;

    // Video element uses callback-based API, wrapping in Promise is necessary
    // oxlint-disable-next-line eslint-plugin-promise(avoid-new)
    await new Promise<void>((resolve, reject) => {
      // oxlint-disable-next-line eslint-plugin-unicorn(prefer-add-event-listener)
      video.onloadedmetadata = () => resolve();
      // oxlint-disable-next-line eslint-plugin-unicorn(prefer-add-event-listener)
      video.onerror = () => reject(new Error("Failed to load screen stream"));
    });

    await video.play();

    const width = video.videoWidth;
    const height = video.videoHeight;
    if (!width || !height) {
      return null;
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) {
      return null;
    }

    context.drawImage(video, 0, 0, width, height);
    // canvas.toBlob uses callback-based API, wrapping in Promise is necessary
    // oxlint-disable-next-line eslint-plugin-promise(avoid-new)
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/png");
    });
    if (!blob) {
      return null;
    }

    const timestamp = new Date()
      .toISOString()
      .replaceAll(/[:.]/g, "-")
      .replace("T", "_")
      .replace("Z", "");

    return new File([blob], `screenshot-${timestamp}.png`, {
      lastModified: Date.now(),
      type: "image/png",
    });
  } finally {
    if (stream) {
      for (const track of stream.getTracks()) {
        track.stop();
      }
    }
    video.pause();
    video.srcObject = null;
  }
};

// ============================================================================
// Provider Context & Types
// ============================================================================

export interface AttachmentsContext {
  files: (FileUIPart & { id: string })[];
  add: (files: File[] | FileList) => void;
  remove: (id: string) => void;
  clear: () => void;
  openFileDialog: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

export interface TextInputContext {
  value: string;
  setInput: (v: string) => void;
  clear: () => void;
}

export interface PromptInputControllerProps {
  textInput: TextInputContext;
  attachments: AttachmentsContext;
  /** INTERNAL: Allows PromptInput to register its file textInput + "open" callback */
  __registerFileInput: (
    ref: RefObject<HTMLInputElement | null>,
    open: () => void,
  ) => void;
}

const PromptInputController = createContext<PromptInputControllerProps | null>(
  null,
);
const ProviderAttachmentsContext = createContext<AttachmentsContext | null>(
  null,
);

export const usePromptInputController = () => {
  const ctx = useContext(PromptInputController);
  if (!ctx) {
    throw new Error(
      "Wrap your component inside <PromptInputProvider> to use usePromptInputController().",
    );
  }
  return ctx;
};

// Optional variants (do NOT throw). Useful for dual-mode components.
const useOptionalPromptInputController = () =>
  useContext(PromptInputController);

export const useProviderAttachments = () => {
  const ctx = useContext(ProviderAttachmentsContext);
  if (!ctx) {
    throw new Error(
      "Wrap your component inside <PromptInputProvider> to use useProviderAttachments().",
    );
  }
  return ctx;
};

const useOptionalProviderAttachments = () =>
  useContext(ProviderAttachmentsContext);

export type PromptInputProviderProps = PropsWithChildren<{
  initialInput?: string;
}>;

/**
 * Optional global provider that lifts PromptInput state outside of PromptInput.
 * If you don't use it, PromptInput stays fully self-managed.
 */
export const PromptInputProvider = ({
  initialInput: initialTextInput = "",
  children,
}: PromptInputProviderProps) => {
  // ----- textInput state
  const [textInput, setTextInput] = useState(initialTextInput);
  const clearInput = useCallback(() => setTextInput(""), []);

  // ----- attachments state (global when wrapped)
  const [attachmentFiles, setAttachmentFiles] = useState<
    (FileUIPart & { id: string })[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // oxlint-disable-next-line eslint(no-empty-function)
  const openRef = useRef<() => void>(() => {});

  const add = useCallback((files: File[] | FileList) => {
    const incoming = [...files];
    if (incoming.length === 0) {
      return;
    }

    setAttachmentFiles((prev) => [
      ...prev,
      ...incoming.map((file) => ({
        filename: file.name,
        id: nanoid(),
        mediaType: file.type,
        type: "file" as const,
        url: URL.createObjectURL(file),
      })),
    ]);
  }, []);

  const remove = useCallback((id: string) => {
    setAttachmentFiles((prev) => {
      const found = prev.find((f) => f.id === id);
      if (found?.url) {
        URL.revokeObjectURL(found.url);
      }
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clear = useCallback(() => {
    setAttachmentFiles((prev) => {
      for (const f of prev) {
        if (f.url) {
          URL.revokeObjectURL(f.url);
        }
      }
      return [];
    });
  }, []);

  // Keep a ref to attachments for cleanup on unmount (avoids stale closure)
  const attachmentsRef = useRef(attachmentFiles);

  useEffect(() => {
    attachmentsRef.current = attachmentFiles;
  }, [attachmentFiles]);

  // Cleanup blob URLs on unmount to prevent memory leaks
  useEffect(
    () => () => {
      for (const f of attachmentsRef.current) {
        if (f.url) {
          URL.revokeObjectURL(f.url);
        }
      }
    },
    [],
  );

  const openFileDialog = useCallback(() => {
    openRef.current?.();
  }, []);

  const attachments = useMemo<AttachmentsContext>(
    () => ({
      add,
      clear,
      fileInputRef,
      files: attachmentFiles,
      openFileDialog,
      remove,
    }),
    [attachmentFiles, add, remove, clear, openFileDialog],
  );

  const __registerFileInput = useCallback(
    (ref: RefObject<HTMLInputElement | null>, open: () => void) => {
      fileInputRef.current = ref.current;
      openRef.current = open;
    },
    [],
  );

  const controller = useMemo<PromptInputControllerProps>(
    () => ({
      __registerFileInput,
      attachments,
      textInput: {
        clear: clearInput,
        setInput: setTextInput,
        value: textInput,
      },
    }),
    [textInput, clearInput, attachments, __registerFileInput],
  );

  return (
    <PromptInputController.Provider value={controller}>
      <ProviderAttachmentsContext.Provider value={attachments}>
        {children}
      </ProviderAttachmentsContext.Provider>
    </PromptInputController.Provider>
  );
};

// ============================================================================
// Component Context & Hooks
// ============================================================================

const LocalAttachmentsContext = createContext<AttachmentsContext | null>(null);

export const usePromptInputAttachments = () => {
  // Prefer local context (inside PromptInput) as it has validation, fall back to provider
  const provider = useOptionalProviderAttachments();
  const local = useContext(LocalAttachmentsContext);
  const context = local ?? provider;
  if (!context) {
    throw new Error(
      "usePromptInputAttachments must be used within a PromptInput or PromptInputProvider",
    );
  }
  return context;
};

// ============================================================================
// Referenced Sources (Local to PromptInput)
// ============================================================================

export interface ReferencedSourcesContext {
  sources: (SourceDocumentUIPart & { id: string })[];
  add: (sources: SourceDocumentUIPart[] | SourceDocumentUIPart) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const LocalReferencedSourcesContext =
  createContext<ReferencedSourcesContext | null>(null);

export const usePromptInputReferencedSources = () => {
  const ctx = useContext(LocalReferencedSourcesContext);
  if (!ctx) {
    throw new Error(
      "usePromptInputReferencedSources must be used within a LocalReferencedSourcesContext.Provider",
    );
  }
  return ctx;
};

export type PromptInputActionAddAttachmentsProps = ComponentProps<
  typeof DropdownMenuItem
> & {
  label?: string;
};

export const PromptInputActionAddAttachments = ({
  label = "Attach files",
  className,
  ...props
}: PromptInputActionAddAttachmentsProps) => {
  const attachments = usePromptInputAttachments();

  const handleSelect = useCallback(
    (e: Event) => {
      e.preventDefault();
      attachments.openFileDialog();
    },
    [attachments],
  );

  return (
    <DropdownMenuItem
      {...props}
      className={cn(
        "gap-3 py-2.5 pr-2 pl-2.5 [&>svg:first-child]:size-[18px] [&>svg:first-child]:text-muted-foreground",
        className,
      )}
      onSelect={handleSelect}
    >
      <Icon path={mdiPaperclip} className="shrink-0" />
      <span className="min-w-0 flex-1">{label}</span>
    </DropdownMenuItem>
  );
};

export type PromptInputActionAddScreenshotProps = ComponentProps<
  typeof DropdownMenuItem
> & {
  label?: string;
};

export const PromptInputActionAddScreenshot = ({
  label = "Take screenshot",
  onSelect,
  className,
  ...props
}: PromptInputActionAddScreenshotProps) => {
  const attachments = usePromptInputAttachments();

  const handleSelect = useCallback(
    async (event: Event) => {
      onSelect?.(event);
      if (event.defaultPrevented) {
        return;
      }

      try {
        const screenshot = await captureScreenshot();
        if (screenshot) {
          attachments.add([screenshot]);
        }
      } catch (error) {
        if (
          error instanceof DOMException &&
          (error.name === "NotAllowedError" || error.name === "AbortError")
        ) {
          return;
        }
        throw error;
      }
    },
    [onSelect, attachments],
  );

  return (
    <DropdownMenuItem
      {...props}
      className={cn(
        "gap-3 py-2.5 pr-2 pl-2.5 [&>svg:first-child]:size-[18px] [&>svg:first-child]:text-muted-foreground",
        className,
      )}
      onSelect={handleSelect}
    >
      <Monitor className="shrink-0" />
      <span className="min-w-0 flex-1">{label}</span>
    </DropdownMenuItem>
  );
};

export interface PromptInputMessage {
  text: string;
  files: FileUIPart[];
}

export type PromptInputVariant = "default" | "floating";

const SINGLE_LINE_HEIGHT = 32;

interface PromptInputLayoutContextValue {
  variant: PromptInputVariant;
  isMultiline: boolean;
  setIsMultiline: (value: boolean) => void;
  effectiveMultiline: boolean;
  hasFiles: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

const PromptInputLayoutContext =
  createContext<PromptInputLayoutContextValue | null>(null);

const useOptionalPromptInputLayout = () => useContext(PromptInputLayoutContext);

export type PromptInputProps = Omit<
  HTMLAttributes<HTMLFormElement>,
  "onSubmit" | "onError"
> & {
  variant?: PromptInputVariant;
  /** In floating mode, force column layout (e.g. when selection chips are present). */
  floatingColumn?: boolean;
  // e.g., "image/*" or leave undefined for any
  accept?: string;
  multiple?: boolean;
  // When true, accepts drops anywhere on document. Default false (opt-in).
  globalDrop?: boolean;
  // Render a hidden input with given name and keep it in sync for native form posts. Default false.
  syncHiddenInput?: boolean;
  // Minimal constraints
  maxFiles?: number;
  // bytes
  maxFileSize?: number;
  onError?: (err: {
    code: "max_files" | "max_file_size" | "accept";
    message: string;
  }) => void;
  onSubmit: (
    message: PromptInputMessage,
    event: FormEvent<HTMLFormElement>,
  ) => void | Promise<void>;
};

export const PromptInput = forwardRef<HTMLFormElement, PromptInputProps>(
  function PromptInput(
    {
      className,
      accept,
      multiple,
      globalDrop,
      syncHiddenInput,
      maxFiles,
      maxFileSize,
      onError,
      onSubmit,
      children,
      variant = "default",
      floatingColumn = false,
      ...props
    },
    ref,
  ) {
    // Try to use a provider controller if present
    const controller = useOptionalPromptInputController();
    const usingProvider = !!controller;

    // Refs
    const inputRef = useRef<HTMLInputElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);
    const setFormRef = useCallback(
      (node: HTMLFormElement | null) => {
        formRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as RefObject<HTMLFormElement | null>).current = node;
        }
      },
      [ref],
    );

    // ----- Local attachments (only used when no provider)
    const [items, setItems] = useState<(FileUIPart & { id: string })[]>([]);
    const files = usingProvider ? controller.attachments.files : items;
    const [isMultiline, setIsMultiline] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const hasFiles = files.length > 0;
    const effectiveMultiline =
      variant === "floating" && (isMultiline || floatingColumn);
    const floatingSingleLine = variant === "floating" && !effectiveMultiline;

    // ----- Local referenced sources (always local to PromptInput)
    const [referencedSources, setReferencedSources] = useState<
      (SourceDocumentUIPart & { id: string })[]
    >([]);

    // Keep a ref to files for cleanup on unmount (avoids stale closure)
    const filesRef = useRef(files);

    useEffect(() => {
      filesRef.current = files;
    }, [files]);

    const openFileDialogLocal = useCallback(() => {
      inputRef.current?.click();
    }, []);

    const matchesAccept = useCallback(
      (f: File) => {
        if (!accept || accept.trim() === "") {
          return true;
        }

        const patterns = accept
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        return patterns.some((pattern) => {
          if (pattern.endsWith("/*")) {
            // e.g: image/* -> image/
            const prefix = pattern.slice(0, -1);
            return f.type.startsWith(prefix);
          }
          return f.type === pattern;
        });
      },
      [accept],
    );

    const addLocal = useCallback(
      (fileList: File[] | FileList) => {
        const incoming = [...fileList];
        const accepted = incoming.filter((f) => matchesAccept(f));
        if (incoming.length && accepted.length === 0) {
          onError?.({
            code: "accept",
            message: "No files match the accepted types.",
          });
          return;
        }
        const withinSize = (f: File) =>
          maxFileSize ? f.size <= maxFileSize : true;
        const sized = accepted.filter(withinSize);
        if (accepted.length > 0 && sized.length === 0) {
          onError?.({
            code: "max_file_size",
            message: "All files exceed the maximum size.",
          });
          return;
        }

        setItems((prev) => {
          const capacity =
            typeof maxFiles === "number"
              ? Math.max(0, maxFiles - prev.length)
              : undefined;
          const capped =
            typeof capacity === "number" ? sized.slice(0, capacity) : sized;
          if (typeof capacity === "number" && sized.length > capacity) {
            onError?.({
              code: "max_files",
              message: "Too many files. Some were not added.",
            });
          }
          const next: (FileUIPart & { id: string })[] = [];
          for (const file of capped) {
            next.push({
              filename: file.name,
              id: nanoid(),
              mediaType: file.type,
              type: "file",
              url: URL.createObjectURL(file),
            });
          }
          return [...prev, ...next];
        });
      },
      [matchesAccept, maxFiles, maxFileSize, onError],
    );

    const removeLocal = useCallback(
      (id: string) =>
        setItems((prev) => {
          const found = prev.find((file) => file.id === id);
          if (found?.url) {
            URL.revokeObjectURL(found.url);
          }
          return prev.filter((file) => file.id !== id);
        }),
      [],
    );

    // Wrapper that validates files before calling provider's add
    const addWithProviderValidation = useCallback(
      (fileList: File[] | FileList) => {
        const incoming = [...fileList];
        const accepted = incoming.filter((f) => matchesAccept(f));
        if (incoming.length && accepted.length === 0) {
          onError?.({
            code: "accept",
            message: "No files match the accepted types.",
          });
          return;
        }
        const withinSize = (f: File) =>
          maxFileSize ? f.size <= maxFileSize : true;
        const sized = accepted.filter(withinSize);
        if (accepted.length > 0 && sized.length === 0) {
          onError?.({
            code: "max_file_size",
            message: "All files exceed the maximum size.",
          });
          return;
        }

        const currentCount = files.length;
        const capacity =
          typeof maxFiles === "number"
            ? Math.max(0, maxFiles - currentCount)
            : undefined;
        const capped =
          typeof capacity === "number" ? sized.slice(0, capacity) : sized;
        if (typeof capacity === "number" && sized.length > capacity) {
          onError?.({
            code: "max_files",
            message: "Too many files. Some were not added.",
          });
        }

        if (capped.length > 0) {
          controller?.attachments.add(capped);
        }
      },
      [matchesAccept, maxFileSize, maxFiles, onError, files.length, controller],
    );

    const clearAttachments = useCallback(
      () =>
        usingProvider
          ? controller?.attachments.clear()
          : setItems((prev) => {
              for (const file of prev) {
                if (file.url) {
                  URL.revokeObjectURL(file.url);
                }
              }
              return [];
            }),
      [usingProvider, controller],
    );

    const clearReferencedSources = useCallback(
      () => setReferencedSources([]),
      [],
    );

    const add = usingProvider ? addWithProviderValidation : addLocal;
    const remove = usingProvider ? controller.attachments.remove : removeLocal;
    const openFileDialog = usingProvider
      ? controller.attachments.openFileDialog
      : openFileDialogLocal;

    const clear = useCallback(() => {
      clearAttachments();
      clearReferencedSources();
    }, [clearAttachments, clearReferencedSources]);

    // Let provider know about our hidden file input so external menus can call openFileDialog()
    useEffect(() => {
      if (!usingProvider) {
        return;
      }
      controller.__registerFileInput(inputRef, () => inputRef.current?.click());
    }, [usingProvider, controller]);

    // Note: File input cannot be programmatically set for security reasons
    // The syncHiddenInput prop is no longer functional
    useEffect(() => {
      if (syncHiddenInput && inputRef.current && files.length === 0) {
        inputRef.current.value = "";
      }
    }, [files, syncHiddenInput]);

    // Attach drop handlers on nearest form and document (opt-in)
    useEffect(() => {
      const form = formRef.current;
      if (!form) {
        return;
      }
      if (globalDrop) {
        // when global drop is on, let the document-level handler own drops
        return;
      }

      const onDragOver = (e: DragEvent) => {
        if (e.dataTransfer?.types?.includes("Files")) {
          e.preventDefault();
        }
      };
      const onDrop = (e: DragEvent) => {
        if (e.dataTransfer?.types?.includes("Files")) {
          e.preventDefault();
        }
        if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
          add(e.dataTransfer.files);
        }
      };
      form.addEventListener("dragover", onDragOver);
      form.addEventListener("drop", onDrop);
      return () => {
        form.removeEventListener("dragover", onDragOver);
        form.removeEventListener("drop", onDrop);
      };
    }, [add, globalDrop]);

    useEffect(() => {
      if (!globalDrop) {
        return;
      }

      const onDragOver = (e: DragEvent) => {
        if (e.dataTransfer?.types?.includes("Files")) {
          e.preventDefault();
        }
      };
      const onDrop = (e: DragEvent) => {
        if (e.dataTransfer?.types?.includes("Files")) {
          e.preventDefault();
        }
        if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
          add(e.dataTransfer.files);
        }
      };
      document.addEventListener("dragover", onDragOver);
      document.addEventListener("drop", onDrop);
      return () => {
        document.removeEventListener("dragover", onDragOver);
        document.removeEventListener("drop", onDrop);
      };
    }, [add, globalDrop]);

    useEffect(
      () => () => {
        if (!usingProvider) {
          for (const f of filesRef.current) {
            if (f.url) {
              URL.revokeObjectURL(f.url);
            }
          }
        }
      },
      [usingProvider],
    );

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      (event) => {
        if (event.currentTarget.files) {
          add(event.currentTarget.files);
        }
        // Reset input value to allow selecting files that were previously removed
        event.currentTarget.value = "";
      },
      [add],
    );

    const attachmentsCtx = useMemo<AttachmentsContext>(
      () => ({
        add,
        clear: clearAttachments,
        fileInputRef: inputRef,
        files: files.map((item) => ({ ...item, id: item.id })),
        openFileDialog,
        remove,
      }),
      [files, add, remove, clearAttachments, openFileDialog],
    );

    const refsCtx = useMemo<ReferencedSourcesContext>(
      () => ({
        add: (incoming: SourceDocumentUIPart[] | SourceDocumentUIPart) => {
          const array = Array.isArray(incoming) ? incoming : [incoming];
          setReferencedSources((prev) => [
            ...prev,
            ...array.map((s) => ({ ...s, id: nanoid() })),
          ]);
        },
        clear: clearReferencedSources,
        remove: (id: string) => {
          setReferencedSources((prev) => prev.filter((s) => s.id !== id));
        },
        sources: referencedSources,
      }),
      [referencedSources, clearReferencedSources],
    );

    const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
      async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const text = usingProvider
          ? controller.textInput.value
          : (() => {
              const formData = new FormData(form);
              return (formData.get("message") as string) || "";
            })();

        // Reset form immediately after capturing text to avoid race condition
        // where user input during async blob conversion would be lost
        if (!usingProvider) {
          form.reset();
        }

        try {
          // Convert blob URLs to data URLs asynchronously
          const convertedFiles: FileUIPart[] = await Promise.all(
            files.map(async ({ id: _id, ...item }) => {
              if (item.url?.startsWith("blob:")) {
                const dataUrl = await convertBlobUrlToDataUrl(item.url);
                // If conversion failed, keep the original blob URL
                return {
                  ...item,
                  url: dataUrl ?? item.url,
                };
              }
              return item;
            }),
          );

          const result = onSubmit({ files: convertedFiles, text }, event);

          // Handle both sync and async onSubmit
          if (result instanceof Promise) {
            try {
              await result;
              clear();
              if (usingProvider) {
                controller.textInput.clear();
              }
              if (variant === "floating") {
                setIsMultiline(false);
              }
            } catch {
              // Don't clear on error - user may want to retry
            }
          } else {
            // Sync function completed without throwing, clear inputs
            clear();
            if (usingProvider) {
              controller.textInput.clear();
            }
          }
          if (variant === "floating") {
            setIsMultiline(false);
          }
        } catch {
          // Don't clear on error - user may want to retry
        }
      },
      [usingProvider, controller, files, onSubmit, clear, variant],
    );

    const layoutCtx = useMemo<PromptInputLayoutContextValue>(
      () => ({
        variant,
        isMultiline,
        setIsMultiline,
        effectiveMultiline,
        hasFiles,
        textareaRef,
      }),
      [variant, isMultiline, effectiveMultiline, hasFiles],
    );

    // Render with or without local provider
    const inner = (
      <>
        <input
          accept={accept}
          aria-label="Upload files"
          className="hidden"
          multiple={multiple}
          onChange={handleChange}
          ref={inputRef}
          title="Upload files"
          type="file"
        />
        <form
          className={cn("w-full", className)}
          onSubmit={handleSubmit}
          ref={setFormRef}
          {...props}
        >
          <InputGroup
            className={cn(
              "overflow-hidden border-border",
              floatingSingleLine &&
                cn(
                  "h-auto! min-h-0 gap-2 rounded-xl border bg-white shadow-lg dark:bg-input/30",
                  "flex-row items-center px-4",
                  hasFiles ? "pb-3 pt-0" : "py-3",
                  hasFiles && "flex-wrap",
                ),
              variant === "floating" && effectiveMultiline && "flex-col",
            )}
          >
            {children}
          </InputGroup>
        </form>
      </>
    );

    const withReferencedSources = (
      <LocalReferencedSourcesContext.Provider value={refsCtx}>
        {inner}
      </LocalReferencedSourcesContext.Provider>
    );

    const withLayout = (
      <PromptInputLayoutContext.Provider value={layoutCtx}>
        {withReferencedSources}
      </PromptInputLayoutContext.Provider>
    );

    // Always provide LocalAttachmentsContext so children get validated add function
    return (
      <LocalAttachmentsContext.Provider value={attachmentsCtx}>
        {withLayout}
      </LocalAttachmentsContext.Provider>
    );
  },
);

PromptInput.displayName = "PromptInput";

export type PromptInputBodyProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputBody = ({
  className,
  ...props
}: PromptInputBodyProps) => (
  <div className={cn("contents", className)} {...props} />
);

export type PromptInputTextareaProps = ComponentProps<
  typeof InputGroupTextarea
>;

export const PromptInputTextarea = ({
  onChange,
  onInput,
  onKeyDown,
  className,
  placeholder = "What would you like to know?",
  ...props
}: PromptInputTextareaProps) => {
  const controller = useOptionalPromptInputController();
  const attachments = usePromptInputAttachments();
  const layout = useOptionalPromptInputLayout();
  const [isComposing, setIsComposing] = useState(false);
  const inlineWidthRef = useRef(0);

  const floatingMaxHeight = 120;

  useLayoutEffect(() => {
    if (layout?.variant !== "floating" || !layout.textareaRef.current) {
      return;
    }
    const el = layout.textareaRef.current;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, floatingMaxHeight)}px`;
  }, [layout?.variant, layout?.textareaRef]);

  const handleInput: InputEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      onInput?.(e);

      if (layout?.variant !== "floating") {
        return;
      }

      const el = e.currentTarget;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, floatingMaxHeight)}px`;

      if (!layout.effectiveMultiline) {
        if (el.offsetWidth > 0) {
          inlineWidthRef.current = el.offsetWidth;
        }
        if (el.scrollHeight > SINGLE_LINE_HEIGHT) {
          layout.setIsMultiline(true);
        }
      } else if (inlineWidthRef.current > 0) {
        const savedWidth = el.style.width;
        el.style.width = `${inlineWidthRef.current}px`;
        el.style.height = "auto";
        const heightAtInlineWidth = el.scrollHeight;
        el.style.width = savedWidth;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, floatingMaxHeight)}px`;

        if (heightAtInlineWidth <= SINGLE_LINE_HEIGHT) {
          layout.setIsMultiline(false);
        }
      }
    },
    [layout, onInput],
  );

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      // Call the external onKeyDown handler first
      onKeyDown?.(e);

      // If the external handler prevented default, don't run internal logic
      if (e.defaultPrevented) {
        return;
      }

      if (e.key === "Enter") {
        if (isComposing || e.nativeEvent.isComposing) {
          return;
        }
        if (e.shiftKey) {
          return;
        }
        e.preventDefault();

        // Check if the submit button is disabled before submitting
        const { form } = e.currentTarget;
        const submitButton = form?.querySelector(
          'button[type="submit"]',
        ) as HTMLButtonElement | null;
        if (submitButton?.disabled) {
          return;
        }

        form?.requestSubmit();
      }

      // Remove last attachment when Backspace is pressed and textarea is empty
      if (
        e.key === "Backspace" &&
        e.currentTarget.value === "" &&
        attachments.files.length > 0
      ) {
        e.preventDefault();
        const lastAttachment = attachments.files.at(-1);
        if (lastAttachment) {
          attachments.remove(lastAttachment.id);
        }
      }
    },
    [onKeyDown, isComposing, attachments],
  );

  const handlePaste: ClipboardEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      const items = event.clipboardData?.items;

      if (!items) {
        return;
      }

      const files: File[] = [];

      for (const item of items) {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file) {
            files.push(file);
          }
        }
      }

      if (files.length > 0) {
        event.preventDefault();
        attachments.add(files);
      }
    },
    [attachments],
  );

  const handleCompositionEnd = useCallback(() => setIsComposing(false), []);
  const handleCompositionStart = useCallback(() => setIsComposing(true), []);

  const controlledProps = controller
    ? {
        onChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
          controller.textInput.setInput(e.currentTarget.value);
          onChange?.(e);
        },
        value: controller.textInput.value,
      }
    : {
        onChange,
      };

  return (
    <InputGroupTextarea
      ref={layout?.textareaRef}
      className={cn(
        "field-sizing-content max-h-48 min-h-6",
        layout?.variant === "floating" &&
          !layout.effectiveMultiline &&
          "max-h-[120px] min-h-6 min-w-0 flex-1 py-0",
        layout?.variant === "floating" &&
          layout.effectiveMultiline &&
          "max-h-[120px] px-3 py-3",
        className,
      )}
      name="message"
      rows={layout?.variant === "floating" ? 1 : undefined}
      onCompositionEnd={handleCompositionEnd}
      onCompositionStart={handleCompositionStart}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      placeholder={placeholder}
      {...props}
      {...controlledProps}
    />
  );
};

export type PromptInputHeaderProps = Omit<
  ComponentProps<typeof InputGroupAddon>,
  "align"
>;

export const PromptInputHeader = ({
  className,
  children,
  ...props
}: PromptInputHeaderProps) => {
  const layout = useOptionalPromptInputLayout();
  const variant = layout?.variant ?? "default";
  const hasFiles = layout?.hasFiles ?? false;
  const effectiveMultiline = layout?.effectiveMultiline ?? false;
  const floatingSingleLine = variant === "floating" && !effectiveMultiline;

  if (floatingSingleLine && !hasFiles) {
    return null;
  }

  if (floatingSingleLine && hasFiles) {
    return (
      <div
        data-slot="prompt-input-header"
        className={cn(
          "order-first w-full min-w-full shrink-0 basis-full pt-3",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <InputGroupAddon
      align={
        variant === "floating" && effectiveMultiline
          ? "block-start"
          : "block-end"
      }
      className={cn(
        "order-first flex-wrap gap-1 empty:hidden empty:p-0",
        variant === "floating" && effectiveMultiline && "px-3 pt-3",
        className,
      )}
      {...props}
    >
      {children}
    </InputGroupAddon>
  );
};

export type PromptInputFooterProps = Omit<
  ComponentProps<typeof InputGroupAddon>,
  "align"
>;

export const PromptInputFooter = ({
  className,
  ...props
}: PromptInputFooterProps) => {
  const layout = useOptionalPromptInputLayout();
  const variant = layout?.variant ?? "default";
  const effectiveMultiline = layout?.effectiveMultiline ?? false;
  const floatingSingleLine = variant === "floating" && !effectiveMultiline;

  if (floatingSingleLine) {
    return (
      <InputGroupAddon
        align="inline-end"
        className={cn("shrink-0 gap-2 py-0 pr-0 has-[>button]:mr-0", className)}
        {...props}
      />
    );
  }

  return (
    <InputGroupAddon
      align="block-end"
      className={cn(
        "justify-between gap-1",
        variant === "floating" && effectiveMultiline && "px-3 pb-3 pt-2",
        className,
      )}
      {...props}
    />
  );
};

export type PromptInputToolbarProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * When true, visible only in floating single-line layout (inline row).
   * When false, visible in default layout and floating multiline layout.
   */
  inline?: boolean;
};

export const PromptInputToolbar = ({
  inline = false,
  className,
  ...props
}: PromptInputToolbarProps) => {
  const layout = useOptionalPromptInputLayout();
  const variant = layout?.variant ?? "default";
  const effectiveMultiline = layout?.effectiveMultiline ?? false;

  if (variant === "floating") {
    if (inline && effectiveMultiline) return null;
    if (!inline && !effectiveMultiline) return null;
  } else if (inline) {
    return null;
  }

  if (inline) {
    return (
      <InputGroupAddon
        align="inline-start"
        className={cn(
          "shrink-0 gap-1.5 py-0 pl-0 has-[>button]:ml-0",
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <div
      data-slot="prompt-input-toolbar"
      className={cn("flex min-w-0 items-center gap-1", className)}
      {...props}
    />
  );
};

export type PromptInputActionsProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputActions = ({
  className,
  ...props
}: PromptInputActionsProps) => (
  <div
    data-slot="prompt-input-actions"
    className={cn("flex shrink-0 items-center gap-2", className)}
    {...props}
  />
);

export type PromptInputToolsProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputTools = ({
  className,
  ...props
}: PromptInputToolsProps) => (
  <div
    className={cn("flex min-w-0 items-center gap-1", className)}
    {...props}
  />
);

export type PromptInputButtonTooltip =
  | string
  | {
      content: ReactNode;
      shortcut?: string;
      side?: ComponentProps<typeof TooltipContent>["side"];
    };

export type PromptInputButtonProps = ComponentProps<typeof InputGroupButton> & {
  tooltip?: PromptInputButtonTooltip;
};

export const PromptInputButton = ({
  variant = "ghost",
  className,
  size,
  tooltip,
  ...props
}: PromptInputButtonProps) => {
  const newSize =
    size ?? (Children.count(props.children) > 1 ? "xs" : "icon-sm");

  const button = (
    <InputGroupButton
      className={cn(className)}
      size={newSize}
      type="button"
      variant={variant}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  const tooltipContent =
    typeof tooltip === "string" ? tooltip : tooltip.content;
  const shortcut = typeof tooltip === "string" ? undefined : tooltip.shortcut;
  const side = typeof tooltip === "string" ? "top" : (tooltip.side ?? "top");

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side={side}>
        {tooltipContent}
        {shortcut && (
          <kbd className="border-border bg-muted text-muted-foreground ml-2 rounded border px-1.5 py-0.5 text-xs">
            {shortcut}
          </kbd>
        )}
      </TooltipContent>
    </Tooltip>
  );
};

export type PromptInputActionMenuProps = ComponentProps<typeof DropdownMenu>;
export const PromptInputActionMenu = (props: PromptInputActionMenuProps) => (
  <DropdownMenu {...props} />
);

export type PromptInputActionMenuTriggerProps = PromptInputButtonProps;

export const PromptInputActionMenuTrigger = ({
  className,
  children,
  size = "icon-xs",
  tooltip = "Add attachment",
  ...props
}: PromptInputActionMenuTriggerProps) => (
  <DropdownMenuTrigger asChild>
    <PromptInputButton
      className={cn("text-muted-foreground hover:text-foreground", className)}
      size={size}
      {...props}
      tooltip={tooltip}
    >
      {children ?? <PlusIcon />}
    </PromptInputButton>
  </DropdownMenuTrigger>
);

export type PromptInputActionMenuContentProps = ComponentProps<
  typeof DropdownMenuContent
>;
export const PromptInputActionMenuContent = ({
  className,
  sideOffset = 6,
  onCloseAutoFocus,
  ...props
}: PromptInputActionMenuContentProps) => (
  <DropdownMenuContent
    align="start"
    side="bottom"
    sideOffset={sideOffset}
    className={cn("min-w-0 w-[min(100vw-2rem,13rem)] rounded-lg", className)}
    onCloseAutoFocus={(e) => {
      onCloseAutoFocus?.(e);
      e.preventDefault();
    }}
    {...props}
  />
);

export type PromptInputActionMenuItemProps = ComponentProps<
  typeof DropdownMenuItem
>;
export const PromptInputActionMenuItem = ({
  className,
  ...props
}: PromptInputActionMenuItemProps) => (
  <DropdownMenuItem className={cn(className)} {...props} />
);

// Note: Actions that perform side-effects (like opening a file dialog)
// are provided in opt-in modules (e.g., prompt-input-attachments).

export type PromptInputSubmitProps = ComponentProps<typeof InputGroupButton> & {
  status?: ChatStatus;
  onStop?: () => void;
};

export const PromptInputSubmit = ({
  className,
  variant = "default",
  size = "icon-sm",
  status,
  onStop,
  onClick,
  children,
  ...props
}: PromptInputSubmitProps) => {
  const isGenerating = status === "submitted" || status === "streaming";

  let Icon = <ArrowUpIcon className="size-5!" />;

  if (status === "submitted") {
    Icon = <Spinner className="text-current" />;
  } else if (status === "streaming") {
    Icon = <SquareIcon className="size-4" />;
  } else if (status === "error") {
    Icon = <XIcon className="size-4" />;
  }

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isGenerating && onStop) {
        e.preventDefault();
        onStop();
        return;
      }
      onClick?.(e);
    },
    [isGenerating, onStop, onClick],
  );

  return (
    <InputGroupButton
      aria-label={isGenerating ? "Stop" : "Submit"}
      className={cn(className)}
      onClick={handleClick}
      size={size}
      type={isGenerating && onStop ? "button" : "submit"}
      variant={variant}
      {...props}
    >
      {children ?? Icon}
    </InputGroupButton>
  );
};

export type PromptInputSelectProps = ComponentProps<typeof Select>;

export const PromptInputSelect = (props: PromptInputSelectProps) => (
  <Select {...props} />
);

export type PromptInputSelectTriggerProps = ComponentProps<
  typeof SelectTrigger
>;

export const PromptInputSelectTrigger = ({
  className,
  size = "sm",
  ...props
}: PromptInputSelectTriggerProps) => (
  <SelectTrigger
    size={size}
    className={cn(
      "border-none bg-transparent text-muted-foreground shadow-none transition-colors",
      "hover:bg-accent hover:text-foreground aria-expanded:bg-accent aria-expanded:text-foreground",
      "h-7 min-h-7 gap-1 px-2 py-1 text-xs data-[size=sm]:h-7",
      className,
    )}
    {...props}
  />
);

export type PromptInputSelectContentProps = ComponentProps<
  typeof SelectContent
>;

export const PromptInputSelectContent = ({
  className,
  ...props
}: PromptInputSelectContentProps) => (
  <SelectContent className={cn(className)} {...props} />
);

export type PromptInputSelectItemProps = ComponentProps<typeof SelectItem>;

export const PromptInputSelectItem = ({
  className,
  ...props
}: PromptInputSelectItemProps) => (
  <SelectItem className={cn(className)} {...props} />
);

export type PromptInputSelectValueProps = ComponentProps<typeof SelectValue>;

export const PromptInputSelectValue = ({
  className,
  ...props
}: PromptInputSelectValueProps) => (
  <SelectValue className={cn(className)} {...props} />
);

export type PromptInputHoverCardProps = ComponentProps<typeof HoverCard>;

export const PromptInputHoverCard = ({
  openDelay = 0,
  closeDelay = 0,
  ...props
}: PromptInputHoverCardProps) => (
  <HoverCard closeDelay={closeDelay} openDelay={openDelay} {...props} />
);

export type PromptInputHoverCardTriggerProps = ComponentProps<
  typeof HoverCardTrigger
>;

export const PromptInputHoverCardTrigger = (
  props: PromptInputHoverCardTriggerProps,
) => <HoverCardTrigger {...props} />;

export type PromptInputHoverCardContentProps = ComponentProps<
  typeof HoverCardContent
>;

export const PromptInputHoverCardContent = ({
  align = "start",
  ...props
}: PromptInputHoverCardContentProps) => (
  <HoverCardContent align={align} {...props} />
);

export type PromptInputTabsListProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputTabsList = ({
  className,
  ...props
}: PromptInputTabsListProps) => <div className={cn(className)} {...props} />;

export type PromptInputTabProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputTab = ({
  className,
  ...props
}: PromptInputTabProps) => <div className={cn(className)} {...props} />;

export type PromptInputTabLabelProps = HTMLAttributes<HTMLHeadingElement>;

export const PromptInputTabLabel = ({
  className,
  ...props
}: PromptInputTabLabelProps) => (
  // Content provided via children in props
  // oxlint-disable-next-line eslint-plugin-jsx-a11y(heading-has-content)
  <h3
    className={cn("mb-2 px-3 text-muted-foreground text-xs", className)}
    {...props}
  />
);

export type PromptInputTabBodyProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputTabBody = ({
  className,
  ...props
}: PromptInputTabBodyProps) => (
  <div className={cn("space-y-1", className)} {...props} />
);

export type PromptInputTabItemProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputTabItem = ({
  className,
  ...props
}: PromptInputTabItemProps) => (
  <div
    className={cn(
      "flex items-center gap-2 px-3 py-2 text-xs hover:bg-accent",
      className,
    )}
    {...props}
  />
);

export type PromptInputCommandProps = ComponentProps<typeof Command>;

export const PromptInputCommand = ({
  className,
  ...props
}: PromptInputCommandProps) => <Command className={cn(className)} {...props} />;

export type PromptInputCommandInputProps = ComponentProps<typeof CommandInput>;

export const PromptInputCommandInput = ({
  className,
  ...props
}: PromptInputCommandInputProps) => (
  <CommandInput className={cn(className)} {...props} />
);

export type PromptInputCommandListProps = ComponentProps<typeof CommandList>;

export const PromptInputCommandList = ({
  className,
  ...props
}: PromptInputCommandListProps) => (
  <CommandList className={cn(className)} {...props} />
);

export type PromptInputCommandEmptyProps = ComponentProps<typeof CommandEmpty>;

export const PromptInputCommandEmpty = ({
  className,
  ...props
}: PromptInputCommandEmptyProps) => (
  <CommandEmpty className={cn(className)} {...props} />
);

export type PromptInputCommandGroupProps = ComponentProps<typeof CommandGroup>;

export const PromptInputCommandGroup = ({
  className,
  ...props
}: PromptInputCommandGroupProps) => (
  <CommandGroup className={cn(className)} {...props} />
);

export type PromptInputCommandItemProps = ComponentProps<typeof CommandItem>;

export const PromptInputCommandItem = ({
  className,
  ...props
}: PromptInputCommandItemProps) => (
  <CommandItem className={cn(className)} {...props} />
);

export type PromptInputCommandSeparatorProps = ComponentProps<
  typeof CommandSeparator
>;

export const PromptInputCommandSeparator = ({
  className,
  ...props
}: PromptInputCommandSeparatorProps) => (
  <CommandSeparator className={cn(className)} {...props} />
);
