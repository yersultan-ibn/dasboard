export type Launch = {
  id: string;
  name: string;
  details: string | null;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  rocket: string;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
  };
};

export type Rocket = {
  id: string;
  name: string;
};

export type LaunchesByYearPoint = {
  year: string;
  launches: number;
};

export type LaunchStats = {
  total: number;
  successful: number;
  failed: number;
  /** Success share of decided launches (0–100), or null when nothing is decided. */
  successRate: number | null;
  upcomingLabel: string;
};
