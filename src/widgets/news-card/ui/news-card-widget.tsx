"use client";

import type { FC } from "react";

import {
  getLaunchStatus,
  useLatestLaunchQuery,
  useNextLaunchQuery,
} from "@/entities/launch";
import { formatLaunchDate } from "@/shared/lib/format";
import { QueryBoundary, Skeleton, StatusBadge } from "@/shared/ui";

import styles from "./news-card-widget.module.scss";

const FALLBACK_IMAGE = "https://images2.imgbox.com/40/e3/GypSkayF_o.png";

const NewsSkeleton: FC = () => (
  <div className={styles.card} aria-hidden="true">
    <Skeleton width={84} height={84} radius="var(--radius-md)" />
    <div className={styles.content}>
      <Skeleton width="40%" height="1rem" />
      <Skeleton width="80%" height="1.2rem" />
      <Skeleton width="100%" height="3rem" />
    </div>
  </div>
);

export const NewsCardWidget: FC = () => {
  const latestQuery = useLatestLaunchQuery();
  const nextQuery = useNextLaunchQuery();

  // Prefer the upcoming launch; fall back to the most recent one.
  const launch = nextQuery.data ?? latestQuery.data ?? null;
  const status = launch
    ? getLaunchStatus(launch.success, launch.upcoming)
    : null;

  // The data source falls back across both queries, so mirror that in the
  // boundary state: only show loading/error while there is nothing to render.
  // A single endpoint lagging or failing must not blank a card we can display.
  const isLoading = (latestQuery.isLoading || nextQuery.isLoading) && !launch;
  const isError = !launch && (latestQuery.isError || nextQuery.isError);

  return (
    <QueryBoundary
      isLoading={isLoading}
      isError={isError}
      isEmpty={!launch}
      emptyTitle="Нет доступной карточки запуска"
      errorTitle="Не удалось загрузить карточку"
      loading={<NewsSkeleton />}
    >
      {launch && status ? (
        <article className={styles.card}>
          <div className={styles.imageWrap}>
            {/* Plain <img>: SpaceX patch images live on arbitrary hosts, so we
                skip next/image's host allowlist and fall back on error. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.image}
              src={launch.links.patch.small ?? FALLBACK_IMAGE}
              alt={`Эмблема миссии ${launch.name}`}
              loading="lazy"
              onError={(event) => {
                if (event.currentTarget.src !== FALLBACK_IMAGE) {
                  event.currentTarget.src = FALLBACK_IMAGE;
                }
              }}
            />
          </div>
          <div className={styles.content}>
            <StatusBadge tone={status.tone} label={status.label} />
            <h4 className={styles.title}>{launch.name}</h4>
            <p className={styles.meta}>{formatLaunchDate(launch.date_utc)}</p>
            <p className={styles.description}>
              {launch.details ??
                "Для этой миссии API не вернуло подробного описания."}
            </p>
          </div>
        </article>
      ) : null}
    </QueryBoundary>
  );
};
