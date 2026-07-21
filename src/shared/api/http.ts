import { env } from "@/shared/config/env";
import { logError, logRequest, logResponse } from "@/shared/lib/logger";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly url: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = RequestInit;

export async function fetchJson<T>(
  path: string,
  options?: RequestOptions,
): Promise<T> {
  const url = `${env.apiBaseUrl}${path}`;

  logRequest("Fetching resource", {
    url,
    method: options?.method ?? "GET",
  });

  const response = await fetch(url, {
    cache: "no-store",
    ...options,
    headers: {
      // Content-Type only with a body: on a GET it triggers a CORS preflight.
      ...(options?.body ? { "Content-Type": "application/json" } : {}),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = new ApiError(
      `Request to ${url} failed with status ${response.status}`,
      response.status,
      url,
    );

    logError(error.message, { status: response.status });
    throw error;
  }

  const data = (await response.json()) as T;

  logResponse("Fetched resource", {
    url,
    status: response.status,
  });

  return data;
}
