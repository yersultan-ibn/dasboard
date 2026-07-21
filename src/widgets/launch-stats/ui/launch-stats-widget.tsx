"use client";

import type { FC } from "react";
import { useMemo } from "react";

import {
  getLaunchStats,
  useLaunchesQuery,
  useNextLaunchQuery,
} from "@/entities/launch";
import { formatCompactNumber, formatPercent } from "@/shared/lib/format";
import { Icon, type IconName, QueryBoundary, Skeleton } from "@/shared/ui";

import styles from "./launch-stats-widget.module.scss";

type MetricTone = "neutral" | "good" | "critical" | "accent";

type MetricProps = {
  label: string;
  value: string;
  icon: IconName;
  tone?: MetricTone;
  small?: boolean;
};

const Metric: FC<MetricProps> = ({
  label,
  value,
  icon,
  tone = "neutral",
  small,
}) => (
  <div className={styles.metric}>
    <span className={`${styles.metricHead} ${styles[tone]}`}>
      <Icon name={icon} size={16} />
      {label}
    </span>
    <strong className={small ? styles.valueSmall : styles.value}>
      {value}
    </strong>
  </div>
);

const StatsSkeleton: FC = () => (
  <div className={styles.grid} aria-hidden="true">
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className={styles.metric}>
        <Skeleton width="60%" height="0.8rem" />
        <Skeleton width="70%" height="1.6rem" />
      </div>
    ))}
  </div>
);

export const LaunchStatsWidget: FC = () => {
  const launchesQuery = useLaunchesQuery();
  const nextLaunchQuery = useNextLaunchQuery();

  const stats = useMemo(
    () =>
      getLaunchStats(launchesQuery.data ?? [], nextLaunchQuery.data ?? null),
    [launchesQuery.data, nextLaunchQuery.data],
  );

  return (
    <QueryBoundary
      isLoading={launchesQuery.isLoading || nextLaunchQuery.isLoading}
      isError={launchesQuery.isError || nextLaunchQuery.isError}
      errorTitle="Не удалось построить статистику"
      loading={<StatsSkeleton />}
    >
      <div className={styles.grid}>
        <Metric
          icon="rocket"
          label="Всего запусков"
          value={formatCompactNumber(stats.total)}
        />
        <Metric
          icon="check"
          tone="good"
          label="Успешных"
          value={formatCompactNumber(stats.successful)}
        />
        <Metric
          icon="gauge"
          tone="accent"
          label="Доля успеха"
          value={formatPercent(stats.successRate)}
        />
        <Metric
          icon="clock"
          label="Ближайший старт"
          value={stats.upcomingLabel}
          small
        />
      </div>
    </QueryBoundary>
  );
};
