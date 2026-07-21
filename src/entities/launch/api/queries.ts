import { queryOptions } from "@tanstack/react-query";

import { fetchJson } from "@/shared/api/http";

import { launchKeys, rocketKeys } from "./query-keys";
import type { Launch, Rocket } from "../model/types";

/**
 * Query-option factories shared by the server (prefetch) and the client (hooks).
 * `queryOptions` keeps the key and the return type of `queryFn` in lockstep, so
 * a `useQuery(launchQueries.list())` on the client is fully typed and always
 * matches the key the server prefetched.
 */
export const launchQueries = {
  list: () =>
    queryOptions({
      queryKey: launchKeys.list(),
      queryFn: () => fetchJson<Launch[]>("/launches"),
    }),
  latest: () =>
    queryOptions({
      queryKey: launchKeys.latest(),
      queryFn: () => fetchJson<Launch>("/launches/latest"),
    }),
  next: () =>
    queryOptions({
      queryKey: launchKeys.next(),
      queryFn: () => fetchJson<Launch>("/launches/next"),
    }),
};

export const rocketQueries = {
  list: () =>
    queryOptions({
      queryKey: rocketKeys.list(),
      queryFn: () => fetchJson<Rocket[]>("/rockets"),
    }),
};
