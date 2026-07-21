/**
 * Single source of truth for launch/rocket query keys.
 *
 * Both the SSR prefetch (`launchQueries`) and the client hooks build their keys
 * from here, so cache reads on the client hit exactly the entries the server
 * warmed — and invalidation has one canonical prefix to target.
 */
export const launchKeys = {
  all: ["launches"] as const,
  list: () => [...launchKeys.all, "list"] as const,
  latest: () => [...launchKeys.all, "latest"] as const,
  next: () => [...launchKeys.all, "next"] as const,
};

export const rocketKeys = {
  all: ["rockets"] as const,
  list: () => [...rocketKeys.all, "list"] as const,
};
