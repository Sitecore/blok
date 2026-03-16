/**
 * Telemetry helper for Gainsight PX.
 * Only sends events when the Gainsight script is loaded (NEXT_PUBLIC_GAINSIGHT_PX_TAG set).
 */

import type { TelemetryEventName } from "./events";

declare global {
  interface Window {
    aptrinsic?:
      | ((...args: unknown[]) => void)
      | { (...args: unknown[]): void; q?: unknown[] };
  }
}

/**
 * Track a telemetry event. Safe to call from SSR (no-op).
 * No PII should be passed in eventData.
 */
export function track(
  eventName: TelemetryEventName | string,
  eventData?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  if (!window.aptrinsic) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[Telemetry] Gainsight not loaded. Event "${eventName}" not tracked.`,
      );
    }
    return;
  }
  try {
    window.aptrinsic("track", eventName, eventData ?? {});
  } catch (e) {
    console.error(`[Telemetry] Failed to track "${eventName}":`, e);
  }
}

export { TELEMETRY_EVENTS } from "./events";
export type { CopyCodePayload } from "./events";
