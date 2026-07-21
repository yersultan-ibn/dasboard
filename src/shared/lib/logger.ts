import { env } from "@/shared/config/env";

type LogPayload = Record<string, unknown> | undefined;

function stringifyPayload(payload: LogPayload): string {
  if (!payload) {
    return "";
  }
  return JSON.stringify(payload);
}

/** Request/response logs are verbose-only (development); errors always log. */
export function logRequest(message: string, payload?: LogPayload): void {
  if (!env.logging.verbose) {
    return;
  }
  console.info(`[api:request] ${message}`, stringifyPayload(payload));
}

export function logResponse(message: string, payload?: LogPayload): void {
  if (!env.logging.verbose) {
    return;
  }
  console.info(`[api:response] ${message}`, stringifyPayload(payload));
}

export function logError(message: string, payload?: LogPayload): void {
  console.error(`[api:error] ${message}`, stringifyPayload(payload));
}
