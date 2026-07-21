import { useQuery } from "@tanstack/react-query";

import { launchQueries, rocketQueries } from "./queries";

export const useLaunchesQuery = () => useQuery(launchQueries.list());
export const useLatestLaunchQuery = () => useQuery(launchQueries.latest());
export const useNextLaunchQuery = () => useQuery(launchQueries.next());
export const useRocketsQuery = () => useQuery(rocketQueries.list());
