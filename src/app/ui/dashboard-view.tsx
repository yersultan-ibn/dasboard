"use client";

import type { FC, ReactNode } from "react";

import type { WidgetType } from "@/entities/widget";
import { DashboardCanvas } from "@/widgets/dashboard-canvas";
import { LaunchChartWidget } from "@/widgets/launch-chart";
import { LaunchStatsWidget } from "@/widgets/launch-stats";
import { LaunchesTableWidget } from "@/widgets/launches-table";
import { NewsCardWidget } from "@/widgets/news-card";
import { WidgetLibrary } from "@/widgets/widget-library";

import styles from "../page.module.scss";

const WIDGET_COMPONENTS: Record<WidgetType, FC> = {
  "launch-table": LaunchesTableWidget,
  stats: LaunchStatsWidget,
  "launch-chart": LaunchChartWidget,
  news: NewsCardWidget,
};

function renderWidgetContent(type: WidgetType): ReactNode {
  const Component = WIDGET_COMPONENTS[type];
  return Component ? <Component /> : null;
}

export const DashboardView: FC = () => (
  <div className={styles.layout}>
    <aside className={styles.sidebar}>
      <WidgetLibrary />
    </aside>
    <div className={styles.canvas}>
      <DashboardCanvas renderWidgetContent={renderWidgetContent} />
    </div>
  </div>
);
