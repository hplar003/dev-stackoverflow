import { ActionResponse } from "@/types/global";

import handleError from "./error";
import { RequestError } from "../http-errors";
import logger from "../logger";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    timeout = 5000,
    headers: customHeaders = {},
    ...restOptions
  } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };
  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(id);
    if (!response.ok) {
      throw new RequestError(
        response.status,
        `HTTP Error in fetch: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (err) {
    const error = isError(err) ? err : new Error("Unknown Error");
    if (error.name === "AbortError") {
      logger.warn(`Request to ${url} timed out`);
    } else {
      logger.error(`Error Fetching to  ${url} failed`, error);
    }
    return handleError(error) as ActionResponse<T>;
  }
}
