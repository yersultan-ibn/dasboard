"use client";

import type { FC } from "react";
import { useMemo } from "react";

import {
  createRocketNameMap,
  getLaunchStatus,
  getRecentLaunches,
  useLaunchesQuery,
  useRocketsQuery,
} from "@/entities/launch";
import { formatLaunchDate } from "@/shared/lib/format";
import { QueryBoundary, Skeleton, StatusBadge } from "@/shared/ui";

import styles from "./launches-table-widget.module.scss";

const ROW_COUNT = 6;

const TableSkeleton: FC = () => (
  <div className={styles.skeleton} aria-hidden="true">
    {Array.from({ length: ROW_COUNT }).map((_, index) => (
      <Skeleton key={index} height="2.1rem" />
    ))}
  </div>
);

export const LaunchesTableWidget: FC = () => {
  const launchesQuery = useLaunchesQuery();
  const rocketsQuery = useRocketsQuery();

  const rocketNameMap = useMemo(
    () => createRocketNameMap(rocketsQuery.data ?? []),
    [rocketsQuery.data],
  );

  const launches = useMemo(
    () => getRecentLaunches(launchesQuery.data ?? [], ROW_COUNT),
    [launchesQuery.data],
  );

  return (
    <QueryBoundary
      isLoading={launchesQuery.isLoading || rocketsQuery.isLoading}
      isError={launchesQuery.isError || rocketsQuery.isError}
      isEmpty={launches.length === 0}
      emptyTitle="Запуски не найдены"
      errorTitle="Не удалось загрузить запуски"
      loading={<TableSkeleton />}
    >
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Миссия</th>
              <th>Дата</th>
              <th>Ракета</th>
              <th className={styles.statusCol}>Статус</th>
            </tr>
          </thead>
          <tbody>
            {launches.map((launch) => {
              const status = getLaunchStatus(launch.success, launch.upcoming);
              return (
                <tr key={launch.id}>
                  <td className={styles.mission}>{launch.name}</td>
                  <td className={styles.muted}>
                    {formatLaunchDate(launch.date_utc)}
                  </td>
                  <td className={styles.muted}>
                    {rocketNameMap.get(launch.rocket) ?? "—"}
                  </td>
                  <td className={styles.statusCol}>
                    <StatusBadge tone={status.tone} label={status.label} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </QueryBoundary>
  );
};
