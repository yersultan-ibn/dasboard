"use client";

import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getLaunchesByYear, useLaunchesQuery } from "@/entities/launch";
import { QueryBoundary, Skeleton } from "@/shared/ui";

import styles from "./launch-chart-widget.module.scss";

type ChartTokens = {
  accent: string;
  grid: string;
  muted: string;
  surface: string;
  border: string;
  text: string;
};

// Sensible light-theme fallbacks for SSR / first paint before CSS vars are read.
const FALLBACK: ChartTokens = {
  accent: "#2a78d6",
  grid: "#e1e0d9",
  muted: "#898781",
  surface: "#ffffff",
  border: "rgba(11, 11, 11, 0.1)",
  text: "#0b0e14",
};

/**
 * Recharts renders SVG attributes, which don't resolve `var(--token)`. So we
 * read the resolved token values off the document and re-read whenever the theme
 * changes (toggle stamps `data-theme`; OS change fires the media query) — the
 * chart recolors in lockstep with the rest of the UI.
 */
function useChartTokens(): ChartTokens {
  const [tokens, setTokens] = useState<ChartTokens>(FALLBACK);

  useEffect(() => {
    const read = () => {
      const styles = getComputedStyle(document.documentElement);
      const get = (name: string, fallback: string) =>
        styles.getPropertyValue(name).trim() || fallback;
      setTokens({
        accent: get("--accent", FALLBACK.accent),
        grid: get("--grid-line", FALLBACK.grid),
        muted: get("--muted", FALLBACK.muted),
        surface: get("--surface", FALLBACK.surface),
        border: get("--border", FALLBACK.border),
        text: get("--text", FALLBACK.text),
      });
    };

    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", read);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", read);
    };
  }, []);

  return tokens;
}

export const LaunchChartWidget: FC = () => {
  const launchesQuery = useLaunchesQuery();
  const tokens = useChartTokens();

  const data = useMemo(
    () => getLaunchesByYear(launchesQuery.data ?? []),
    [launchesQuery.data],
  );

  return (
    <QueryBoundary
      isLoading={launchesQuery.isLoading}
      isError={launchesQuery.isError}
      isEmpty={data.length === 0}
      emptyTitle="Недостаточно данных для графика"
      errorTitle="Не удалось загрузить данные графика"
      loading={<Skeleton height={260} radius="var(--radius-md)" />}
    >
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: -14 }}
            barCategoryGap="22%"
          >
            <CartesianGrid stroke={tokens.grid} vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: tokens.border }}
              tick={{ fill: tokens.muted, fontSize: 12 }}
            />
            <YAxis
              allowDecimals={false}
              width={34}
              tickLine={false}
              axisLine={false}
              tick={{ fill: tokens.muted, fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: tokens.accent, fillOpacity: 0.08 }}
              contentStyle={{
                background: tokens.surface,
                border: `1px solid ${tokens.border}`,
                borderRadius: 10,
                boxShadow: "var(--shadow-md)",
                fontSize: 12,
              }}
              labelStyle={{ color: tokens.text, fontWeight: 600 }}
              itemStyle={{ color: tokens.text }}
              formatter={(value) => [value, "Запусков"]}
            />
            <Bar
              dataKey="launches"
              name="Запусков"
              fill={tokens.accent}
              radius={[6, 6, 0, 0]}
              maxBarSize={46}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </QueryBoundary>
  );
};
