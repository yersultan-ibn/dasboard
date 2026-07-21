import { useQuery } from "@tanstack/react-query";

import { launchQueries, rocketQueries } from "./queries";

/**
 * Thin client hooks over the shared query-option factories. They read the same
 * cache entries the server prefetched in `app/page.tsx`, so the first render is
 * already hydrated — no client-side loading flash on initial paint.
 */
export const useLaunchesQuery = () => useQuery(launchQueries.list());
export const useLatestLaunchQuery = () => useQuery(launchQueries.latest());
export const useNextLaunchQuery = () => useQuery(launchQueries.next());
export const useRocketsQuery = () => useQuery(rocketQueries.list());
