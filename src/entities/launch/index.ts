// Public API of the `launch` entity — everything outside this slice imports
// from here, never from deep paths.
export type {
  Launch,
  Rocket,
  LaunchStats,
  LaunchesByYearPoint,
} from "./model/types";

export { launchKeys, rocketKeys } from "./api/query-keys";
export { launchQueries, rocketQueries } from "./api/queries";
export {
  useLaunchesQuery,
  useLatestLaunchQuery,
  useNextLaunchQuery,
  useRocketsQuery,
} from "./api/hooks";
export {
  createRocketNameMap,
  getRecentLaunches,
  getLaunchesByYear,
  getLaunchStats,
  getLaunchStatus,
} from "./lib/selectors";
export type { LaunchStatusTone } from "./lib/selectors";
