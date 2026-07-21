import { queryOptions } from "@tanstack/react-query";

import { fetchJson } from "@/shared/api/http";

import { launchKeys, rocketKeys } from "./query-keys";
import type { Launch, Rocket } from "../model/types";

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
