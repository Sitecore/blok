"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { mdiMicrophone, mdiSquare } from "@mdi/js";
import type { ComponentProps, ReactNode } from "react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void)
    | null;
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void)
    | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

type SpeechInputMode = "speech-recognition" | "media-recorder" | "none";

export type SpeechInputVoiceUiPhase = "idle" | "listening" | "processing";

export type SpeechInputHandle = {
  /** Begin listening / recording (same as tapping the mic when idle). */
  start: () => void;
  /**
   * Stop capture. For MediaRecorder, resolves after transcription finishes.
   * For Web Speech API, resolves when recognition has ended.
   */
  stop: () => Promise<void>;
};

export type SpeechInputProps = ComponentProps<typeof Button> & {
  onTranscriptionChange?: (text: string) => void;
  /**
   * Callback for when audio is recorded using MediaRecorder fallback.
   * This is called in browsers that don't support the Web Speech API (Firefox, Safari).
   * The callback receives an audio Blob that should be sent to a transcription service.
   * Return the transcribed text, which will be passed to onTranscriptionChange.
   */
  onAudioRecorded?: (audioBlob: Blob) => Promise<string>;
  lang?: string;
  /**
   * `toggle` — mic starts/stops capture and swaps to a square while listening (default).
   * `prompt` — mic only starts; keep the mic icon (disabled while active); call `ref.stop()`
   * from a separate control (e.g. submit-as-stop). Fires `onVoiceSessionComplete` after
   * capture + transcription fully finish.
   */
  integration?: "toggle" | "prompt";
  /** Fires whenever listening / processing / idle changes (for coordinating submit UI). */
  onVoiceUiPhaseChange?: (phase: SpeechInputVoiceUiPhase) => void;
  /**
   * After a `prompt` session ends via `stop()` (including async transcription when
   * using MediaRecorder). Use to `requestSubmit()` the surrounding form.
   */
  onVoiceSessionComplete?: () => void;
  /**
   * Hover tooltip (same pattern as `PromptInputButton` / floating attach).
   * Defaults to "Voice input" when omitted.
   */
  tooltip?:
    | string
    | null
    | {
        content: ReactNode;
        shortcut?: string;
        side?: "top" | "right" | "bottom" | "left";
      };
};

const detectSpeechInputMode = (): SpeechInputMode => {
  if (typeof window === "undefined") {
    return "none";
  }

  if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    return "speech-recognition";
  }

  if ("MediaRecorder" in window && "mediaDevices" in navigator) {
    return "media-recorder";
  }

  return "none";
};

export const SpeechInput = forwardRef<SpeechInputHandle, SpeechInputProps>(
  function SpeechInput(
    {
      className,
      onTranscriptionChange,
      onAudioRecorded,
      lang = "en-US",
      variant = "ghost",
      size = "icon-xs",
      integration = "toggle",
      onVoiceUiPhaseChange,
      onVoiceSessionComplete,
      tooltip,
      ...props
    },
    ref,
  ) {
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [mode] = useState<SpeechInputMode>(detectSpeechInputMode);
    const [isRecognitionReady, setIsRecognitionReady] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const onTranscriptionChangeRef = useRef<
      SpeechInputProps["onTranscriptionChange"]
    >(onTranscriptionChange);
    const onAudioRecordedRef =
      useRef<SpeechInputProps["onAudioRecorded"]>(onAudioRecorded);
    const onVoiceSessionCompleteRef = useRef(onVoiceSessionComplete);
    const onVoiceUiPhaseChangeRef = useRef(onVoiceUiPhaseChange);
    const integrationRef = useRef(integration);
    const isListeningRef = useRef(false);
    const isProcessingRef = useRef(false);
    /** Resolves the Promise returned by imperative `stop()` for Web Speech. */
    const speechStopResolverRef = useRef<(() => void) | null>(null);
    /** When true, the next recognition `end` came from an explicit `stop()` call. */
    const awaitingPromptSpeechStopRef = useRef(false);
    /** Resolves the Promise returned by imperative `stop()` for MediaRecorder. */
    const mediaStopResolverRef = useRef<(() => void) | null>(null);

    onTranscriptionChangeRef.current = onTranscriptionChange;
    onAudioRecordedRef.current = onAudioRecorded;
    onVoiceSessionCompleteRef.current = onVoiceSessionComplete;
    onVoiceUiPhaseChangeRef.current = onVoiceUiPhaseChange;
    integrationRef.current = integration;

    useEffect(() => {
      isListeningRef.current = isListening;
    }, [isListening]);

    useEffect(() => {
      isProcessingRef.current = isProcessing;
    }, [isProcessing]);

    const scheduleVoiceSessionComplete = useCallback(() => {
      if (integrationRef.current !== "prompt") return;
      setTimeout(() => {
        onVoiceSessionCompleteRef.current?.();
      }, 0);
    }, []);

    useEffect(() => {
      const phase: SpeechInputVoiceUiPhase = isProcessing
        ? "processing"
        : isListening
          ? "listening"
          : "idle";
      onVoiceUiPhaseChangeRef.current?.(phase);
    }, [isListening, isProcessing]);

    // Initialize Speech Recognition when mode is speech-recognition
    useEffect(() => {
      if (mode !== "speech-recognition") {
        return;
      }

      const SpeechRecognitionCtor =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const speechRecognition = new SpeechRecognitionCtor();

      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = lang;

      const handleStart = () => {
        setIsListening(true);
      };

      const handleEnd = () => {
        setIsListening(false);
        speechStopResolverRef.current?.();
        speechStopResolverRef.current = null;
        if (awaitingPromptSpeechStopRef.current) {
          awaitingPromptSpeechStopRef.current = false;
          scheduleVoiceSessionComplete();
        }
      };

      const handleResult = (event: Event) => {
        const speechEvent = event as SpeechRecognitionEvent;
        let finalTranscript = "";

        for (
          let i = speechEvent.resultIndex;
          i < speechEvent.results.length;
          i += 1
        ) {
          const result = speechEvent.results[i];
          if (result.isFinal) {
            finalTranscript += result[0]?.transcript ?? "";
          }
        }

        if (finalTranscript) {
          onTranscriptionChangeRef.current?.(finalTranscript);
        }
      };

      const handleError = () => {
        setIsListening(false);
        speechStopResolverRef.current?.();
        speechStopResolverRef.current = null;
        awaitingPromptSpeechStopRef.current = false;
      };

      speechRecognition.addEventListener("start", handleStart);
      speechRecognition.addEventListener("end", handleEnd);
      speechRecognition.addEventListener("result", handleResult);
      speechRecognition.addEventListener("error", handleError);

      recognitionRef.current = speechRecognition;
      setIsRecognitionReady(true);

      return () => {
        speechRecognition.removeEventListener("start", handleStart);
        speechRecognition.removeEventListener("end", handleEnd);
        speechRecognition.removeEventListener("result", handleResult);
        speechRecognition.removeEventListener("error", handleError);
        speechRecognition.stop();
        recognitionRef.current = null;
        setIsRecognitionReady(false);
      };
    }, [mode, lang, scheduleVoiceSessionComplete]);

    // Cleanup MediaRecorder and stream on unmount
    useEffect(
      () => () => {
        if (mediaRecorderRef.current?.state === "recording") {
          mediaRecorderRef.current.stop();
        }
        if (streamRef.current) {
          for (const track of streamRef.current.getTracks()) {
            track.stop();
          }
        }
      },
      [],
    );

    // Start MediaRecorder recording
    const startMediaRecorder = useCallback(async () => {
      if (!onAudioRecordedRef.current) {
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streamRef.current = stream;
        const mediaRecorder = new MediaRecorder(stream);
        audioChunksRef.current = [];

        const handleDataAvailable = (event: BlobEvent) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        const handleStop = async () => {
          setIsListening(false);

          for (const track of stream.getTracks()) {
            track.stop();
          }
          streamRef.current = null;

          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });

          if (audioBlob.size > 0 && onAudioRecordedRef.current) {
            setIsProcessing(true);
            try {
              const transcript = await onAudioRecordedRef.current(audioBlob);
              if (transcript) {
                onTranscriptionChangeRef.current?.(transcript);
              }
            } catch {
              // Error handling delegated to the onAudioRecorded caller
            } finally {
              setIsProcessing(false);
            }
          }

          mediaStopResolverRef.current?.();
          mediaStopResolverRef.current = null;
          scheduleVoiceSessionComplete();
        };

        const handleError = () => {
          setIsListening(false);
          mediaStopResolverRef.current?.();
          mediaStopResolverRef.current = null;
          for (const track of stream.getTracks()) {
            track.stop();
          }
          streamRef.current = null;
        };

        mediaRecorder.addEventListener("dataavailable", handleDataAvailable);
        mediaRecorder.addEventListener("stop", handleStop);
        mediaRecorder.addEventListener("error", handleError);

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }, [scheduleVoiceSessionComplete]);

    const stopMediaRecorder = useCallback(() => {
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    }, []);

    const toggleListening = useCallback(() => {
      if (mode === "speech-recognition" && recognitionRef.current) {
        if (isListening) {
          recognitionRef.current.stop();
        } else {
          recognitionRef.current.start();
        }
      } else if (mode === "media-recorder") {
        if (isListening) {
          stopMediaRecorder();
        } else {
          void startMediaRecorder();
        }
      }
    }, [mode, isListening, startMediaRecorder, stopMediaRecorder]);

    const startCapture = useCallback(() => {
      if (mode === "speech-recognition" && recognitionRef.current) {
        if (!isListeningRef.current && !isProcessingRef.current) {
          recognitionRef.current.start();
        }
        return;
      }
      if (mode === "media-recorder") {
        if (!isListeningRef.current && !isProcessingRef.current) {
          void startMediaRecorder();
        }
      }
    }, [mode, startMediaRecorder]);

    const stopCapture = useCallback(async () => {
      if (mode === "speech-recognition") {
        const recognition = recognitionRef.current;
        if (!recognition || !isListeningRef.current) return;
        if (integrationRef.current === "prompt") {
          awaitingPromptSpeechStopRef.current = true;
        }
        await new Promise<void>((resolve) => {
          speechStopResolverRef.current = resolve;
          try {
            recognition.stop();
          } catch {
            speechStopResolverRef.current = null;
            awaitingPromptSpeechStopRef.current = false;
            resolve();
          }
        });
        return;
      }

      if (mode === "media-recorder") {
        const mr = mediaRecorderRef.current;
        if (!mr || mr.state !== "recording") return;
        await new Promise<void>((resolve) => {
          mediaStopResolverRef.current = resolve;
          mr.stop();
        });
      }
    }, [mode]);

    useImperativeHandle(
      ref,
      () => ({
        start: () => {
          startCapture();
        },
        stop: () => stopCapture(),
      }),
      [startCapture, stopCapture],
    );

    const isDisabled =
      mode === "none" ||
      (mode === "speech-recognition" && !isRecognitionReady) ||
      (mode === "media-recorder" && !onAudioRecorded) ||
      isProcessing;

    const micDisabled =
      isDisabled || (integration === "prompt" && (isListening || isProcessing));

    const showPulse = integration === "toggle" && isListening && !isProcessing;

    const promptMic = integration === "prompt";

    const effectiveTooltip =
      tooltip === null ? null : tooltip === undefined ? "Voice input" : tooltip;

    const buttonEl = (
      <Button
        className={cn(
          "relative z-10 transition-all duration-300 shadow-none",
          promptMic
            ? "text-muted-foreground hover:text-foreground"
            : isListening
              ? "text-destructive hover:bg-destructive/10 hover:text-destructive"
              : "text-muted-foreground hover:text-foreground",
          className,
        )}
        disabled={promptMic ? micDisabled : isDisabled}
        onClick={promptMic ? () => startCapture() : toggleListening}
        size={size}
        variant={variant}
        {...props}
      >
        {integration === "toggle" && isProcessing && <Spinner />}
        {integration === "toggle" && !isProcessing && isListening && (
          <Icon path={mdiSquare} className="shrink-0" />
        )}
        {(promptMic || !(isProcessing || isListening)) && (
          <Icon path={mdiMicrophone} className="shrink-0" />
        )}
      </Button>
    );

    const tooltipLabel =
      effectiveTooltip === null
        ? null
        : typeof effectiveTooltip === "string"
          ? effectiveTooltip
          : effectiveTooltip.content;
    const tooltipShortcut =
      effectiveTooltip !== null && typeof effectiveTooltip === "object"
        ? effectiveTooltip.shortcut
        : undefined;
    const tooltipSide =
      effectiveTooltip !== null && typeof effectiveTooltip === "object"
        ? (effectiveTooltip.side ?? "top")
        : "top";

    const micWrapped =
      effectiveTooltip === null ? (
        buttonEl
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>{buttonEl}</TooltipTrigger>
          <TooltipContent side={tooltipSide}>
            <span>{tooltipLabel}</span>
            {tooltipShortcut ? (
              <kbd className="border-border bg-muted text-muted-foreground ml-2 rounded border px-1.5 py-0.5 text-xs">
                {tooltipShortcut}
              </kbd>
            ) : null}
          </TooltipContent>
        </Tooltip>
      );

    return (
      <div className="relative inline-flex items-center justify-center">
        {showPulse &&
          [0, 1, 2].map((index) => (
            <div
              className="absolute inset-0 animate-ping rounded-full border-2 border-destructive/25"
              key={index}
              style={{
                animationDelay: `${index * 0.3}s`,
                animationDuration: "2s",
              }}
            />
          ))}

        {micWrapped}
      </div>
    );
  },
);

SpeechInput.displayName = "SpeechInput";
