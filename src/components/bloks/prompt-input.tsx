"use client"; // Remove this line if you are not using Next.js

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

export interface PromptInputMessage {
  text: string;
  files?: PromptInputFile[];
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
  ...props
}: PromptInputProps) {
  const [files, setFiles] = useState<PromptInputFile[]>([]);
  const [isMultiline, setIsMultiline] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const text = textareaRef.current?.value?.trim() ?? "";
      if (!text && files.length === 0) return;

      onSubmit?.({ text, files: files.length > 0 ? files : undefined }, e);

      if (textareaRef.current) {
        textareaRef.current.value = "";
        autoResize(textareaRef.current);
      }
      setIsMultiline(false);
      clearFiles();
    },
    [files, onSubmit, clearFiles],
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
  const isFloatingInline = variant === "floating" && !isMultiline && !hasFiles;

  return (
    <PromptInputContext.Provider
      value={{
        variant,
        isMultiline,
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
      }}
    >
      <form
        data-slot="prompt-input"
        data-variant={variant}
        data-multiline={isMultiline || undefined}
        onSubmit={handleSubmit}
        className={cn(
          "group/prompt-input relative bg-white dark:bg-input/30 border transition-shadow",
          "focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50",
          variant === "default" && "flex flex-col w-full rounded-xl",
          isFloatingInline &&
            "flex flex-row items-center gap-2 w-full max-w-2xl rounded-xl shadow-lg px-3 py-2",
          variant === "floating" &&
            !isFloatingInline &&
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
  const isFloatingInline =
    variant === "floating" && !isMultiline && files.length === 0;

  if (isFloatingInline) return null;

  return (
    <div
      data-slot="prompt-input-header"
      className={cn("px-3 pt-3", className)}
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
  const { variant, isMultiline, files } = usePromptInputContext();
  const isFloatingInline =
    variant === "floating" && !isMultiline && files.length === 0;

  return (
    <div
      data-slot="prompt-input-body"
      className={cn(
        "flex-1",
        isFloatingInline ? "min-w-0" : "px-4",
        variant === "floating" && !isFloatingInline && "pt-3",
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
  const { textareaRef, variant, setIsMultiline, isMultiline } =
    usePromptInputContext();
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

  return (
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
  );
}

// ---------------------------------------------------------------------------
// PromptInputFooter
// ---------------------------------------------------------------------------

function PromptInputFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { variant, isMultiline, files } = usePromptInputContext();
  const isFloatingInline =
    variant === "floating" && !isMultiline && files.length === 0;

  return (
    <div
      data-slot="prompt-input-footer"
      className={cn(
        "flex items-center gap-2",
        isFloatingInline ? "shrink-0" : "justify-between px-3 pb-3",
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
  const { variant, isMultiline, files } = usePromptInputContext();
  const isFloatingColumn = isMultiline || files.length > 0;

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
// PromptInputAttachButton (+ icon)
// ---------------------------------------------------------------------------

function PromptInputAttachButton({
  className,
  tooltip = "Add attachment",
  ...props
}: Omit<PromptInputButtonProps, "onClick">) {
  const { openFileDialog } = usePromptInputContext();

  return (
    <PromptInputButton
      tooltip={tooltip}
      onClick={openFileDialog}
      className={cn("shrink-0", className)}
      {...props}
    >
      <Icon path={mdiPlus} className="size-5" />
    </PromptInputButton>
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
  ...props
}: PromptInputSubmitProps) {
  const isStreaming = status === "submitted" || status === "streaming";

  return (
    <Button
      type={isStreaming ? "button" : "submit"}
      variant="default"
      size="icon-sm"
      data-slot="prompt-input-submit"
      disabled={disabled}
      className={cn("shrink-0", className)}
      {...props}
    >
      {isStreaming ? (
        <Icon path={mdiSquare} className="size-3" />
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
      className="min-h-13 shrink-0 gap-2 overflow-visible! py-1.5"
      style={{ width: PROMPT_INPUT_ATTACHMENT_BADGE_WIDTH_PX }}
      data-slot="prompt-input-attachment-chip"
    >
      <AttachmentDocLeadingIcon kind={docKind} />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 leading-tight">
        <span className="truncate text-xs font-medium">{file.name}</span>
        <span className="text-[10px] text-muted-foreground">
          {formatAttachmentSize(file.size)}
        </span>
      </div>
      <AttachmentRemoveControl fileName={file.name} onRemove={onRemove} />
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
// PromptInputMicButton
// ---------------------------------------------------------------------------

function PromptInputMicButton({
  className,
  tooltip = "Voice input",
  ...props
}: PromptInputButtonProps) {
  return (
    <PromptInputButton tooltip={tooltip} className={className} {...props}>
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
  PromptInputMicButton,
  usePromptInputContext,
};
