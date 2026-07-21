import { formatLaunchDate } from "@/shared/lib/format";

import type {
  Launch,
  LaunchStats,
  LaunchesByYearPoint,
  Rocket,
} from "../model/types";

export function createRocketNameMap(rockets: Rocket[]): Map<string, string> {
  return new Map(rockets.map((rocket) => [rocket.id, rocket.name]));
}

export type LaunchStatusTone = "good" | "critical" | "warning" | "neutral";

export function getLaunchStatus(
  success: boolean | null,
  upcoming: boolean,
): { tone: LaunchStatusTone; label: string } {
  if (upcoming) {
    return { tone: "warning", label: "Запланирован" };
  }
  if (success === true) {
    return { tone: "good", label: "Успешно" };
  }
  if (success === false) {
    return { tone: "critical", label: "Неуспешно" };
  }
  return { tone: "neutral", label: "Неизвестно" };
}

export function getRecentLaunches(launches: Launch[], limit: number): Launch[] {
  return [...launches]
    .sort(
      (left, right) => Date.parse(right.date_utc) - Date.parse(left.date_utc),
    )
    .slice(0, limit);
}

export function getLaunchesByYear(launches: Launch[]): LaunchesByYearPoint[] {
  const grouped = launches.reduce<Record<string, number>>(
    (accumulator, launch) => {
      const year = new Date(launch.date_utc).getUTCFullYear().toString();
      accumulator[year] = (accumulator[year] ?? 0) + 1;
      return accumulator;
    },
    {},
  );

  return Object.entries(grouped)
    .sort(([leftYear], [rightYear]) => Number(leftYear) - Number(rightYear))
    .map(([year, launches]) => ({ year, launches }));
}

export function getLaunchStats(
  launches: Launch[],
  nextLaunch: Launch | null,
): LaunchStats {
  const successful = launches.filter(
    (launch) => launch.success === true,
  ).length;
  const failed = launches.filter((launch) => launch.success === false).length;
  const decided = successful + failed;

  return {
    total: launches.length,
    successful,
    failed,
    successRate:
      decided === 0 ? null : Math.round((successful / decided) * 100),
    upcomingLabel: nextLaunch
      ? formatLaunchDate(nextLaunch.date_utc)
      : "Нет данных",
  };
}
