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
