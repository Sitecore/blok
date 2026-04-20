"use client"; // Remove this line if you are not using Next.js

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import {
  mdiArrowUp,
  mdiClose,
  mdiFileOutline,
  mdiMicrophone,
  mdiPaperclip,
  mdiPlus,
  mdiSquare,
} from "@mdi/js";
import {
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type * as React from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PromptInputVariant = "default" | "floating";

export type PromptInputStatus = "ready" | "submitted" | "streaming" | "error";

export interface PromptInputFile {
  id: string;
  file: File;
  preview?: string;
}

/**
 * Non-file selection (agent / flow / tool / context) chosen from the attach
 * menu and rendered as an inline chip in the toolbar.
 */
export interface PromptInputSelection {
  id: string;
  label: string;
  /** MDI path string for the leading icon tile. */
  iconPath?: string;
  /** Tailwind classes for the leading icon tile background. */
  iconClassName?: string;
}

export interface PromptInputMessage {
  text: string;
  files?: PromptInputFile[];
  selections?: PromptInputSelection[];
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface PromptInputContextValue {
  variant: PromptInputVariant;
  isMultiline: boolean;
  setIsMultiline: (v: boolean) => void;
  files: PromptInputFile[];
  addFiles: (files: FileList | File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  openFileDialog: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number;
  selections: PromptInputSelection[];
  addSelection: (selection: PromptInputSelection) => void;
  removeSelection: (id: string) => void;
  clearSelections: () => void;
  /** Inline voice capture: waveform in the text area; stop on the submit control. */
  isRecording: boolean;
  recordingDurationSec: number;
  recordingAnalyser: AnalyserNode | null;
  startVoiceRecording: () => Promise<void>;
  cancelVoiceRecording: () => void;
  confirmVoiceRecording: () => void;
  recordingError: string | null;
}

const PromptInputContext = createContext<PromptInputContextValue | null>(null);

function usePromptInputContext() {
  const ctx = useContext(PromptInputContext);
  if (!ctx) {
    throw new Error(
      "PromptInput compound components must be used within <PromptInput>",
    );
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function generateFileId() {
  return `file-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function autoResize(el: HTMLTextAreaElement) {
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}

const SINGLE_LINE_HEIGHT = 32;

/** Matches `PromptInputAttachments` default `maxDisplayItems` and fixed badge width. */
export const PROMPT_INPUT_MAX_VISIBLE_ATTACHMENTS = 3;

/** Fixed file-badge width (px). */
export const PROMPT_INPUT_ATTACHMENT_BADGE_WIDTH_PX = 160;

/** Header `px-3` (12px × 2) + 3 fixed badges + 3× `gap-1.5` + overflow chip `min-w-12`. */
export const PROMPT_INPUT_FORM_MIN_WIDTH_PX =
  24 +
  PROMPT_INPUT_MAX_VISIBLE_ATTACHMENTS *
    PROMPT_INPUT_ATTACHMENT_BADGE_WIDTH_PX +
  3 * 6 +
  48;

/** Vertical bars in the recording waveform. */
const VOICE_WAVE_BAR_COUNT = 52;

function pickAudioMimeType(): string {
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"];
  for (const t of candidates) {
    if (
      typeof MediaRecorder !== "undefined" &&
      MediaRecorder.isTypeSupported(t)
    ) {
      return t;
    }
  }
  return "";
}

/** Centered vertical frequency bars scaling from the middle. */
function PromptInputVoiceWaveform({
  analyser,
}: { analyser: AnalyserNode | null }) {
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    let raf = 0;
    const tick = () => {
      analyser.getByteFrequencyData(data);
      const n = VOICE_WAVE_BAR_COUNT;
      for (let i = 0; i < n; i++) {
        const t = i / (n - 1 || 1);
        const idx = Math.floor(t * (data.length - 1));
        const raw = data[idx] ?? 0;
        const v = raw / 255;
        const eased = v ** 0.65;
        const scale = 0.12 + eased * 0.88;
        const el = barRefs.current[i];
        if (el) el.style.transform = `scaleY(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [analyser]);

  return (
    <div
      className="flex min-w-0 flex-1 items-center justify-center gap-[3px] px-1"
      aria-hidden
    >
      {Array.from({ length: VOICE_WAVE_BAR_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            barRefs.current[i] = el;
          }}
          className="h-7 w-0.5 shrink-0 origin-center rounded-full bg-primary dark:bg-primary/45"
          style={{ transform: "scaleY(0.12)" }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PromptInput (root)
// ---------------------------------------------------------------------------

export interface PromptInputProps
  extends Omit<React.ComponentProps<"form">, "onSubmit" | "onError"> {
  variant?: PromptInputVariant;
  onSubmit?: (message: PromptInputMessage, event: FormEvent) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number;
  onError?: (err: {
    code: "max_files" | "max_file_size" | "accept";
    message: string;
  }) => void;
}

function PromptInput({
  variant = "default",
  onSubmit,
  accept,
  multiple = true,
  maxFiles,
  maxFileSize,
  onError,
  className,
  children,
  style,
  onKeyDown,
  ...props
}: PromptInputProps) {
  const [files, setFiles] = useState<PromptInputFile[]>([]);
  const [selections, setSelections] = useState<PromptInputSelection[]>([]);
  const [isMultiline, setIsMultiline] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDurationSec, setRecordingDurationSec] = useState(0);
  const [recordingAnalyser, setRecordingAnalyser] =
    useState<AnalyserNode | null>(null);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const voiceStreamRef = useRef<MediaStream | null>(null);
  const voiceAudioContextRef = useRef<AudioContext | null>(null);
  const voiceMediaRecorderRef = useRef<MediaRecorder | null>(null);
  const voiceChunksRef = useRef<Blob[]>([]);
  const voiceDiscardRef = useRef(false);
  const voiceMimeRef = useRef("");
  const voiceDurationTimerRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const voiceStartingRef = useRef(false);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const newFiles = Array.from(incoming);

      for (const f of newFiles) {
        if (accept) {
          const accepted = accept.split(",").map((t) => t.trim());
          const matches = accepted.some((pattern) => {
            if (pattern.endsWith("/*")) {
              return f.type.startsWith(pattern.replace("/*", "/"));
            }
            return f.type === pattern || f.name.endsWith(pattern);
          });
          if (!matches) {
            onError?.({
              code: "accept",
              message: `File "${f.name}" is not an accepted type`,
            });
            return;
          }
        }
        if (maxFileSize && f.size > maxFileSize) {
          onError?.({
            code: "max_file_size",
            message: `File "${f.name}" exceeds maximum size`,
          });
          return;
        }
      }

      setFiles((prev) => {
        const combined = [
          ...prev,
          ...newFiles.map((file) => {
            const entry: PromptInputFile = { id: generateFileId(), file };
            if (file.type.startsWith("image/")) {
              entry.preview = URL.createObjectURL(file);
            }
            return entry;
          }),
        ];

        if (maxFiles && combined.length > maxFiles) {
          onError?.({
            code: "max_files",
            message: `Maximum ${maxFiles} files allowed`,
          });
          return prev;
        }
        return combined;
      });
    },
    [accept, maxFileSize, maxFiles, onError],
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const clearFiles = useCallback(() => {
    for (const f of files) {
      if (f.preview) URL.revokeObjectURL(f.preview);
    }
    setFiles([]);
  }, [files]);

  const addSelection = useCallback((selection: PromptInputSelection) => {
    setSelections((prev) => {
      if (prev.some((s) => s.id === selection.id)) return prev;
      return [...prev, selection];
    });
  }, []);

  const removeSelection = useCallback((id: string) => {
    setSelections((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const clearSelections = useCallback(() => {
    setSelections([]);
  }, []);

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const cleanupVoiceResources = useCallback(() => {
    voiceStreamRef.current?.getTracks().forEach((t) => t.stop());
    voiceStreamRef.current = null;
    const ctx = voiceAudioContextRef.current;
    voiceAudioContextRef.current = null;
    if (ctx && ctx.state !== "closed") {
      void ctx.close().catch(() => {});
    }
    voiceMediaRecorderRef.current = null;
    setRecordingAnalyser(null);
  }, []);

  const startVoiceRecording = useCallback(async () => {
    if (
      voiceStartingRef.current ||
      voiceMediaRecorderRef.current?.state === "recording"
    ) {
      return;
    }
    voiceStartingRef.current = true;
    setRecordingError(null);
    voiceDiscardRef.current = false;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      voiceStreamRef.current = stream;

      const audioCtx = new AudioContext();
      voiceAudioContextRef.current = audioCtx;
      if (audioCtx.state === "suspended") {
        await audioCtx.resume();
      }
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.72;
      source.connect(analyser);
      setRecordingAnalyser(analyser);

      const mime = pickAudioMimeType();
      voiceMimeRef.current = mime;
      const recorder = mime
        ? new MediaRecorder(stream, { mimeType: mime })
        : new MediaRecorder(stream);
      voiceMediaRecorderRef.current = recorder;
      voiceChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) voiceChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        if (voiceDurationTimerRef.current) {
          clearInterval(voiceDurationTimerRef.current);
          voiceDurationTimerRef.current = null;
        }

        const discard = voiceDiscardRef.current;
        const chunks = voiceChunksRef.current;
        voiceChunksRef.current = [];
        const usedMime = voiceMimeRef.current;

        cleanupVoiceResources();
        setIsRecording(false);
        setRecordingDurationSec(0);
        voiceMimeRef.current = "";

        if (discard || chunks.length === 0) {
          return;
        }

        const blobType = usedMime || chunks[0]?.type || "audio/webm";
        const blob = new Blob(chunks, { type: blobType });
        const ext = blobType.includes("mp4") ? "m4a" : "webm";
        const file = new File([blob], `Voice message.${ext}`, {
          type: blob.type || blobType,
        });
        addFiles([file]);
      };

      recorder.start(120);
      setIsRecording(true);
      setRecordingDurationSec(0);
      voiceDurationTimerRef.current = setInterval(() => {
        setRecordingDurationSec((s) => s + 1);
      }, 1000);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Microphone access was denied.";
      setRecordingError(msg);
      cleanupVoiceResources();
      setIsRecording(false);
      setRecordingDurationSec(0);
    } finally {
      voiceStartingRef.current = false;
    }
  }, [addFiles, cleanupVoiceResources]);

  const cancelVoiceRecording = useCallback(() => {
    voiceDiscardRef.current = true;
    if (voiceDurationTimerRef.current) {
      clearInterval(voiceDurationTimerRef.current);
      voiceDurationTimerRef.current = null;
    }
    const rec = voiceMediaRecorderRef.current;
    if (rec && rec.state !== "inactive") {
      rec.stop();
    } else {
      cleanupVoiceResources();
      voiceChunksRef.current = [];
      setIsRecording(false);
      setRecordingDurationSec(0);
    }
  }, [cleanupVoiceResources]);

  const confirmVoiceRecording = useCallback(() => {
    voiceDiscardRef.current = false;
    if (voiceDurationTimerRef.current) {
      clearInterval(voiceDurationTimerRef.current);
      voiceDurationTimerRef.current = null;
    }
    const rec = voiceMediaRecorderRef.current;
    if (rec && rec.state === "recording") {
      rec.stop();
    }
  }, []);

  useEffect(() => {
    return () => {
      voiceDiscardRef.current = true;
      if (voiceDurationTimerRef.current) {
        clearInterval(voiceDurationTimerRef.current);
        voiceDurationTimerRef.current = null;
      }
      const rec = voiceMediaRecorderRef.current;
      if (rec && rec.state !== "inactive") {
        try {
          rec.stop();
        } catch {
          /* ignore */
        }
      }
      voiceStreamRef.current?.getTracks().forEach((t) => t.stop());
      const ctx = voiceAudioContextRef.current;
      if (ctx && ctx.state !== "closed") {
        void ctx.close().catch(() => {});
      }
    };
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (isRecording) return;
      const text = textareaRef.current?.value?.trim() ?? "";
      if (!text && files.length === 0 && selections.length === 0) return;

      onSubmit?.(
        {
          text,
          files: files.length > 0 ? files : undefined,
          selections: selections.length > 0 ? selections : undefined,
        },
        e,
      );

      if (textareaRef.current) {
        textareaRef.current.value = "";
        autoResize(textareaRef.current);
      }
      setIsMultiline(false);
      clearFiles();
      clearSelections();
    },
    [files, selections, onSubmit, clearFiles, clearSelections, isRecording],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        addFiles(e.target.files);
        e.target.value = "";
      }
    },
    [addFiles],
  );

  const hasFiles = files.length > 0;
  /**
   * Floating treats any selection chip the same as wrapped text — the chip
   * needs the same multiline layout (textarea on top, toolbar row below) so
   * it has room to render without squashing the textarea on a single row.
   */
  const effectiveMultiline =
    isMultiline || (variant === "floating" && selections.length > 0);
  /** Single-line floating: one horizontal row for toolbar + textarea + actions. */
  const floatingSingleLine = variant === "floating" && !effectiveMultiline;
  /** No attachments — entire form is that single row. */
  const floatingPureInline = floatingSingleLine && !hasFiles;
  /** Attachments on first row, then same centered row as `floatingPureInline`. */
  const floatingAttachmentsRow = floatingSingleLine && hasFiles;

  return (
    <PromptInputContext.Provider
      value={{
        variant,
        isMultiline: effectiveMultiline,
        setIsMultiline,
        files,
        addFiles,
        removeFile,
        clearFiles,
        openFileDialog,
        fileInputRef,
        textareaRef,
        accept,
        multiple,
        maxFiles,
        maxFileSize,
        selections,
        addSelection,
        removeSelection,
        clearSelections,
        isRecording,
        recordingDurationSec,
        recordingAnalyser,
        startVoiceRecording,
        cancelVoiceRecording,
        confirmVoiceRecording,
        recordingError,
      }}
    >
      <form
        data-slot="prompt-input"
        data-variant={variant}
        data-multiline={effectiveMultiline || undefined}
        onSubmit={handleSubmit}
        data-recording={isRecording || undefined}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.defaultPrevented) return;
          if (isRecording && e.key === "Escape") {
            e.preventDefault();
            cancelVoiceRecording();
          }
        }}
        className={cn(
          "group/prompt-input relative bg-white dark:bg-input/30 border transition-shadow",
          "focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50",
          variant === "default" && "flex flex-col w-full rounded-xl",
          floatingPureInline &&
            "flex flex-row items-center gap-2 w-full max-w-2xl rounded-xl shadow-lg px-3 py-2",
          floatingAttachmentsRow &&
            "flex flex-row flex-wrap items-center gap-x-2 gap-y-2 w-full max-w-2xl rounded-xl shadow-lg px-3 pb-2 pt-0",
          variant === "floating" &&
            !floatingSingleLine &&
            "flex flex-col w-full max-w-2xl rounded-xl shadow-lg",
          className,
        )}
        style={{
          minWidth: PROMPT_INPUT_FORM_MIN_WIDTH_PX,
          ...style,
        }}
        {...props}
      >
        {children}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          tabIndex={-1}
        />
      </form>
    </PromptInputContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// PromptInputHeader
// ---------------------------------------------------------------------------

function PromptInputHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { variant, isMultiline, files } = usePromptInputContext();
  const hideHeader =
    variant === "floating" && !isMultiline && files.length === 0;

  if (hideHeader) return null;

  const floatingSingleLine = variant === "floating" && !isMultiline;

  return (
    <div
      data-slot="prompt-input-header"
      className={cn(
        "pt-3",
        floatingSingleLine && files.length > 0
          ? "w-full min-w-full shrink-0 basis-full px-0"
          : "px-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PromptInputBody
// ---------------------------------------------------------------------------

function PromptInputBody({ className, ...props }: React.ComponentProps<"div">) {
  const { variant, isMultiline } = usePromptInputContext();
  const floatingSingleLine = variant === "floating" && !isMultiline;

  return (
    <div
      data-slot="prompt-input-body"
      className={cn(
        "flex-1",
        floatingSingleLine ? "min-w-0" : "px-4",
        variant === "floating" && !floatingSingleLine && "pt-3",
        className,
      )}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// PromptInputTextarea
// ---------------------------------------------------------------------------

export interface PromptInputTextareaProps
  extends Omit<React.ComponentProps<"textarea">, "onKeyDown"> {
  minHeight?: number;
  maxHeight?: number;
  onKeyDown?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

function PromptInputTextarea({
  className,
  minHeight,
  maxHeight = 200,
  placeholder = "Type anything...",
  onKeyDown,
  ...props
}: PromptInputTextareaProps) {
  const {
    textareaRef,
    variant,
    setIsMultiline,
    isMultiline,
    isRecording,
    recordingAnalyser,
    recordingError,
  } = usePromptInputContext();
  const id = useId();
  const inlineWidthRef = useRef(0);

  const resolvedMinHeight = minHeight ?? (variant === "floating" ? 24 : 40);
  const resolvedMaxHeight = variant === "floating" ? 120 : maxHeight;

  useLayoutEffect(() => {
    if (variant === "floating" && textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, resolvedMaxHeight)}px`;
    }
  }, [variant, textareaRef, resolvedMaxHeight]);

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      const el = e.currentTarget;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, resolvedMaxHeight)}px`;

      if (variant === "floating") {
        if (!isMultiline) {
          if (el.offsetWidth > 0) {
            inlineWidthRef.current = el.offsetWidth;
          }
          if (el.scrollHeight > SINGLE_LINE_HEIGHT) {
            setIsMultiline(true);
          }
        } else if (inlineWidthRef.current > 0) {
          const savedWidth = el.style.width;
          el.style.width = `${inlineWidthRef.current}px`;
          el.style.height = "auto";
          const heightAtInlineWidth = el.scrollHeight;
          el.style.width = savedWidth;
          el.style.height = "auto";
          el.style.height = `${Math.min(el.scrollHeight, resolvedMaxHeight)}px`;

          if (heightAtInlineWidth <= SINGLE_LINE_HEIGHT) {
            setIsMultiline(false);
          }
        }
      }
    },
    [resolvedMaxHeight, variant, setIsMultiline, isMultiline],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        e.currentTarget.form?.requestSubmit();
      }
      onKeyDown?.(e);
    },
    [onKeyDown],
  );

  if (isRecording) {
    return (
      <div
        data-slot="prompt-input-voice-meter"
        className={cn(
          "flex w-full min-w-0 items-center",
          variant === "default" && "py-3",
          variant === "floating" && "py-0",
        )}
        style={{
          minHeight: `${resolvedMinHeight}px`,
          maxHeight: `${resolvedMaxHeight}px`,
        }}
        aria-label="Recording audio"
      >
        <PromptInputVoiceWaveform analyser={recordingAnalyser} />
      </div>
    );
  }

  return (
    <>
      {recordingError ? (
        <p className="pb-1.5 text-xs text-destructive" role="alert">
          {recordingError}
        </p>
      ) : null}
      <Textarea
        ref={textareaRef}
        id={id}
        data-slot="prompt-input-textarea"
        rows={1}
        placeholder={placeholder}
        className={cn(
          "w-full resize-none border-0 bg-transparent shadow-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:border-0 rounded-none min-h-0 overflow-y-auto px-0",
          variant === "default" && "py-3",
          variant === "floating" && "py-0",
          className,
        )}
        style={{
          minHeight: `${resolvedMinHeight}px`,
          maxHeight: `${resolvedMaxHeight}px`,
        }}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// PromptInputFooter
// ---------------------------------------------------------------------------

function PromptInputFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { variant, isMultiline } = usePromptInputContext();
  const floatingSingleLine = variant === "floating" && !isMultiline;
  const floatingColumn = variant === "floating" && isMultiline;

  return (
    <div
      data-slot="prompt-input-footer"
      className={cn(
        "flex items-center gap-2",
        floatingSingleLine ? "shrink-0" : "justify-between px-3 pb-3",
        floatingColumn && "pt-2",
        className,
      )}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// PromptInputToolbar
// ---------------------------------------------------------------------------

interface PromptInputToolbarProps extends React.ComponentProps<"div"> {
  /**
   * When true, this toolbar is only visible in the floating variant's
   * single-line (inline) layout. When false (default), it is visible in
   * the multiline layout (and always visible in the default variant).
   */
  inline?: boolean;
}

function PromptInputToolbar({
  inline = false,
  className,
  ...props
}: PromptInputToolbarProps) {
  const { variant, isMultiline } = usePromptInputContext();
  /** Only multiline floating moves the + button to the footer toolbar. */
  const isFloatingColumn = isMultiline;

  if (variant === "floating") {
    if (inline && isFloatingColumn) return null;
    if (!inline && !isFloatingColumn) return null;
  } else if (inline) {
    return null;
  }

  return (
    <div
      data-slot="prompt-input-toolbar"
      className={cn("flex items-center gap-2 shrink-0", className)}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// PromptInputActions (right-side actions: mic, submit, etc.)
// ---------------------------------------------------------------------------

function PromptInputActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="prompt-input-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// PromptInputButton
// ---------------------------------------------------------------------------

export interface PromptInputButtonProps
  extends React.ComponentProps<typeof Button> {
  tooltip?:
    | string
    | {
        content: ReactNode;
        shortcut?: string;
        side?: "top" | "right" | "bottom" | "left";
      };
}

function PromptInputButton({
  tooltip,
  className,
  ...props
}: PromptInputButtonProps) {
  const button = (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      data-slot="prompt-input-button"
      className={cn("text-muted-foreground hover:text-foreground", className)}
      {...props}
    />
  );

  if (!tooltip) return button;

  const tooltipProps =
    typeof tooltip === "string" ? { content: tooltip } : tooltip;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side={tooltipProps.side ?? "top"}>
        <span>{tooltipProps.content}</span>
        {tooltipProps.shortcut && (
          <kbd className="ml-2 rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-mono">
            {tooltipProps.shortcut}
          </kbd>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

// ---------------------------------------------------------------------------
// PromptInputAttachButton (+ icon → attach menu dropdown)
// ---------------------------------------------------------------------------

export type PromptInputAttachMenuRenderArgs = {
  openFileDialog: () => void;
};

export type PromptInputAttachButtonProps = Omit<
  PromptInputButtonProps,
  "onClick"
> & {
  /**
   * Dropdown body for the “+” control. Pass demo/example menus from app
   * content; when omitted, a single “Attach file” row is shown.
   */
  attachMenu?:
    | ReactNode
    | ((args: PromptInputAttachMenuRenderArgs) => ReactNode);
};

function PromptInputAttachButton({
  className,
  tooltip = "Add attachment",
  disabled,
  attachMenu,
  ...props
}: PromptInputAttachButtonProps) {
  const { openFileDialog, isRecording } = usePromptInputContext();
  const blocked = Boolean(disabled || isRecording);

  const tooltipProps =
    typeof tooltip === "string" ? { content: tooltip } : tooltip;

  const menuContent =
    attachMenu === undefined ? (
      <DropdownMenuItem
        className="gap-3 py-2.5 pr-2 pl-2.5 [&>svg:first-child]:size-[18px] [&>svg:first-child]:text-muted-foreground"
        onSelect={() => {
          openFileDialog();
        }}
      >
        <Icon path={mdiPaperclip} className="shrink-0" />
        <span className="min-w-0 flex-1 font-normal">Attach file</span>
      </DropdownMenuItem>
    ) : typeof attachMenu === "function" ? (
      attachMenu({ openFileDialog })
    ) : (
      attachMenu
    );

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              data-slot="prompt-input-attach-trigger"
              className={cn(
                "text-muted-foreground hover:text-foreground shrink-0",
                className,
              )}
              disabled={blocked}
              {...props}
            >
              <Icon path={mdiPlus} className="size-5" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side={tooltipProps.side ?? "top"}>
          <span>{tooltipProps.content}</span>
          {tooltipProps.shortcut && (
            <kbd className="ml-2 rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-mono">
              {tooltipProps.shortcut}
            </kbd>
          )}
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent
        side="bottom"
        align="start"
        sideOffset={6}
        className="min-w-0 w-[min(100vw-2rem,13rem)] rounded-lg"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {menuContent}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ---------------------------------------------------------------------------
// PromptInputSubmit
// ---------------------------------------------------------------------------

export interface PromptInputSubmitProps
  extends React.ComponentProps<typeof Button> {
  status?: PromptInputStatus;
}

function PromptInputSubmit({
  status = "ready",
  className,
  disabled,
  onClick,
  ...props
}: PromptInputSubmitProps) {
  const { isRecording, confirmVoiceRecording } = usePromptInputContext();

  const isStreaming = status === "submitted" || status === "streaming";

  if (isRecording) {
    return (
      <Button
        type="button"
        variant="default"
        size="icon-sm"
        data-slot="prompt-input-submit"
        disabled={disabled}
        className={cn("shrink-0", className)}
        aria-label="Stop recording"
        {...props}
        onClick={(e) => {
          onClick?.(e);
          if (!e.defaultPrevented) confirmVoiceRecording();
        }}
      >
        <Icon path={mdiSquare} className="h-4! w-4! shrink-0" />
      </Button>
    );
  }

  return (
    <Button
      type={isStreaming ? "button" : "submit"}
      variant="default"
      size="icon-sm"
      data-slot="prompt-input-submit"
      disabled={disabled}
      className={cn("shrink-0", className)}
      {...props}
      onClick={onClick}
    >
      {isStreaming ? (
        <Icon path={mdiSquare} className="h-4! w-4! shrink-0" />
      ) : (
        <Icon path={mdiArrowUp} className="size-5" />
      )}
    </Button>
  );
}

// ---------------------------------------------------------------------------
// PromptInputAttachments (file badges with overflow)
// ---------------------------------------------------------------------------

type AttachmentDocKind = "pdf" | "word" | "other";

function formatAttachmentSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function getAttachmentDocKind(file: File): AttachmentDocKind {
  const n = file.name.toLowerCase();
  const t = file.type.toLowerCase();
  if (t === "application/pdf" || n.endsWith(".pdf")) return "pdf";
  if (
    t === "application/msword" ||
    t ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    n.endsWith(".doc") ||
    n.endsWith(".docx")
  ) {
    return "word";
  }
  return "other";
}

function isAttachmentImage(file: File, hasPreview: boolean): boolean {
  return file.type.startsWith("image/") && Boolean(hasPreview);
}

function PdfAttachmentIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded bg-red-600 text-[9px] font-bold uppercase leading-none tracking-tight text-white",
        className,
      )}
      aria-hidden
    >
      PDF
    </span>
  );
}

function WordAttachmentIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded bg-blue-600 text-sm font-bold leading-none text-white",
        className,
      )}
      aria-hidden
    >
      W
    </span>
  );
}

function AttachmentDocLeadingIcon({ kind }: { kind: AttachmentDocKind }) {
  if (kind === "pdf") return <PdfAttachmentIcon />;
  if (kind === "word") return <WordAttachmentIcon />;
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded border bg-muted">
      <Icon path={mdiFileOutline} className="size-4 text-muted-foreground" />
    </span>
  );
}

function AttachmentRemoveControl({
  fileName,
  onRemove,
  className,
}: {
  fileName: string;
  onRemove: () => void;
  className?: string;
}) {
  return (
    <span
      role="button"
      tabIndex={0}
      className={cn(
        "shrink-0 cursor-pointer rounded-full p-0.5 hover:bg-neutral-bg-active inline-flex items-center justify-center pointer-events-auto text-neutral-fg focus:outline-none focus:ring-1 focus:ring-ring",
        className,
      )}
      onClick={onRemove}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onRemove();
        }
      }}
      aria-label={`Remove ${fileName}`}
    >
      <Icon path={mdiClose} className="size-3 pointer-events-none" />
    </span>
  );
}

function PromptInputAttachmentBadge({
  entry,
  onRemove,
}: {
  entry: PromptInputFile;
  onRemove: () => void;
}) {
  const { file, preview } = entry;
  if (isAttachmentImage(file, Boolean(preview))) {
    return (
      <div
        className="relative size-13 shrink-0 overflow-visible"
        data-slot="prompt-input-attachment-chip"
      >
        <div className="size-13 overflow-hidden rounded-lg border bg-muted">
          <img src={preview} alt="" className="size-full object-cover" />
        </div>
        <AttachmentRemoveControl
          fileName={file.name}
          onRemove={onRemove}
          className="absolute -right-1 -top-1 border bg-background shadow-sm"
        />
      </div>
    );
  }

  const docKind = getAttachmentDocKind(file);
  return (
    <Badge
      colorScheme="neutral"
      size="lg"
      className="relative min-h-13 shrink-0 gap-2 overflow-visible! py-1.5"
      style={{ width: PROMPT_INPUT_ATTACHMENT_BADGE_WIDTH_PX }}
      data-slot="prompt-input-attachment-chip"
    >
      <AttachmentDocLeadingIcon kind={docKind} />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 pr-5 leading-tight">
        <span className="truncate text-xs font-medium">{file.name}</span>
        <span className="text-[10px] text-muted-foreground">
          {formatAttachmentSize(file.size)}
        </span>
      </div>
      <AttachmentRemoveControl
        fileName={file.name}
        onRemove={onRemove}
        className="absolute -right-1 -top-1 z-10 border bg-background shadow-sm"
      />
    </Badge>
  );
}

function PromptInputAttachmentListRow({
  entry,
  onRemove,
}: {
  entry: PromptInputFile;
  onRemove: () => void;
}) {
  const { file, preview } = entry;
  return (
    <div className="flex items-center gap-2 rounded-md px-1.5 py-1 text-xs hover:bg-muted/50">
      {isAttachmentImage(file, Boolean(preview)) ? (
        <img
          src={preview}
          alt=""
          className="size-13 shrink-0 rounded-lg border border-border object-cover"
        />
      ) : (
        <AttachmentDocLeadingIcon kind={getAttachmentDocKind(file)} />
      )}
      <div className="min-w-0 flex-1">
        <span className="block truncate">{file.name}</span>
        {!isAttachmentImage(file, Boolean(preview)) && (
          <span className="text-[10px] text-muted-foreground">
            {formatAttachmentSize(file.size)}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        aria-label={`Remove ${file.name}`}
      >
        <Icon path={mdiClose} className="size-3" />
      </button>
    </div>
  );
}

export interface PromptInputAttachmentsProps
  extends React.ComponentProps<"div"> {
  maxDisplayItems?: number;
}

function PromptInputAttachments({
  maxDisplayItems = PROMPT_INPUT_MAX_VISIBLE_ATTACHMENTS,
  className,
  ...props
}: PromptInputAttachmentsProps) {
  const { files, removeFile } = usePromptInputContext();

  if (files.length === 0) return null;

  const visibleFiles = files.slice(0, maxDisplayItems);
  const overflowCount = files.length - maxDisplayItems;

  return (
    <div
      data-slot="prompt-input-attachments"
      className={cn("flex flex-nowrap items-center gap-1.5 pt-3", className)}
      {...props}
    >
      {visibleFiles.map((f) => (
        <PromptInputAttachmentBadge
          key={f.id}
          entry={f}
          onRemove={() => removeFile(f.id)}
        />
      ))}
      {overflowCount > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <button type="button" className="shrink-0 cursor-pointer">
              <Badge
                colorScheme="neutral"
                size="lg"
                className="min-h-7 min-w-12 shrink-0 justify-center overflow-visible!"
              >
                +{overflowCount}
              </Badge>
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            side="top"
            className="w-72 max-h-60 overflow-y-auto p-2"
          >
            <p className="text-xs font-medium text-muted-foreground px-1 pb-2">
              All attachments ({files.length})
            </p>
            <div className="flex flex-col gap-1">
              {files.map((f) => (
                <PromptInputAttachmentListRow
                  key={f.id}
                  entry={f}
                  onRemove={() => removeFile(f.id)}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PromptInputSelections (inline chips for picked agents/tools/contexts)
// ---------------------------------------------------------------------------

/**
 * Fixed chip width — every selection chip occupies the same space so the
 * `+`, mic, and submit controls on the toolbar row do not shift around as
 * chips are added/removed. Long labels truncate to fit. Narrower than the
 * file-attachment badges since this row also has to fit `+`, mic, submit.
 */
const PROMPT_INPUT_SELECTION_CHIP_WIDTH_PX = 140;

/** Fixed `+N` overflow chip width so the toolbar footprint is stable. */
const PROMPT_INPUT_SELECTION_OVERFLOW_WIDTH_PX = 36;

function PromptInputSelectionChip({
  selection,
  onRemove,
}: {
  selection: PromptInputSelection;
  onRemove: () => void;
}) {
  return (
    <Badge
      colorScheme="neutral"
      size="lg"
      data-slot="prompt-input-selection-chip"
      className={cn(
        "group/selection-chip min-h-7 shrink-0 justify-start gap-1.5 py-1 pl-1 pr-2 text-sm",
      )}
      style={{
        width: PROMPT_INPUT_SELECTION_CHIP_WIDTH_PX,
        minWidth: PROMPT_INPUT_SELECTION_CHIP_WIDTH_PX,
      }}
    >
      {selection.iconPath ? (
        <span
          className={cn(
            "flex size-5 shrink-0 items-center justify-center rounded text-white",
            selection.iconClassName ?? "bg-muted-foreground/40",
          )}
          aria-hidden
        >
          <Icon path={selection.iconPath} className="size-3 text-white" />
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate text-left">
        {selection.label}
      </span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${selection.label}`}
        className={cn(
          "ml-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-muted-foreground opacity-0 transition-opacity",
          "group-hover/selection-chip:opacity-100 focus-visible:opacity-100",
          "hover:bg-foreground/10 hover:text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        )}
      >
        <Icon path={mdiClose} className="size-3" />
      </button>
    </Badge>
  );
}

function PromptInputSelectionListRow({
  selection,
  onRemove,
}: {
  selection: PromptInputSelection;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-md px-1.5 py-1 text-xs hover:bg-muted/50">
      {selection.iconPath ? (
        <span
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded text-white",
            selection.iconClassName ?? "bg-muted-foreground/40",
          )}
          aria-hidden
        >
          <Icon path={selection.iconPath} className="size-3.5 text-white" />
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate">{selection.label}</span>
      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label={`Remove ${selection.label}`}
      >
        <Icon path={mdiClose} className="size-3" />
      </button>
    </div>
  );
}

/** Default visible chips before overflowing into a `+N` popover. */
export const PROMPT_INPUT_MAX_VISIBLE_SELECTIONS = 2;

export interface PromptInputSelectionsProps
  extends React.ComponentProps<"div"> {
  maxDisplayItems?: number;
}

function PromptInputSelections({
  maxDisplayItems = PROMPT_INPUT_MAX_VISIBLE_SELECTIONS,
  className,
  ...props
}: PromptInputSelectionsProps) {
  const { selections, removeSelection } = usePromptInputContext();

  if (selections.length === 0) return null;

  const visibleSelections = selections.slice(0, maxDisplayItems);
  const overflowCount = selections.length - maxDisplayItems;

  return (
    <div
      data-slot="prompt-input-selections"
      className={cn("flex min-w-0 flex-nowrap items-center gap-1.5", className)}
      {...props}
    >
      {visibleSelections.map((s) => (
        <PromptInputSelectionChip
          key={s.id}
          selection={s}
          onRemove={() => removeSelection(s.id)}
        />
      ))}
      {overflowCount > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="shrink-0 cursor-pointer"
              aria-label={`Show ${overflowCount} more ${
                overflowCount === 1 ? "selection" : "selections"
              }`}
            >
              <Badge
                colorScheme="neutral"
                size="lg"
                className="min-h-7 shrink-0 justify-center"
                style={{
                  width: PROMPT_INPUT_SELECTION_OVERFLOW_WIDTH_PX,
                  minWidth: PROMPT_INPUT_SELECTION_OVERFLOW_WIDTH_PX,
                }}
              >
                +{overflowCount}
              </Badge>
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            side="top"
            className="max-h-60 w-72 overflow-y-auto p-2"
          >
            <p className="px-1 pb-2 text-xs font-medium text-muted-foreground">
              All selections ({selections.length})
            </p>
            <div className="flex flex-col gap-1">
              {selections.map((s) => (
                <PromptInputSelectionListRow
                  key={s.id}
                  selection={s}
                  onRemove={() => removeSelection(s.id)}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PromptInputMicButton
// ---------------------------------------------------------------------------

function PromptInputMicButton({
  className,
  tooltip = "Voice input",
  onClick,
  disabled,
  ...props
}: PromptInputButtonProps) {
  const { startVoiceRecording, isRecording } = usePromptInputContext();

  return (
    <PromptInputButton
      tooltip={tooltip}
      className={className}
      onClick={(e) => {
        onClick?.(e);
        void startVoiceRecording();
      }}
      {...props}
      disabled={disabled || isRecording}
    >
      <Icon path={mdiMicrophone} className="size-5" />
    </PromptInputButton>
  );
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export {
  PromptInput,
  PromptInputHeader,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputToolbar,
  PromptInputActions,
  PromptInputButton,
  PromptInputAttachButton,
  PromptInputSubmit,
  PromptInputAttachments,
  PromptInputSelections,
  PromptInputMicButton,
  usePromptInputContext,
};
