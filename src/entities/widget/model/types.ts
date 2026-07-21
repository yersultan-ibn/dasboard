export const widgetTypes = [
  "launch-table",
  "stats",
  "launch-chart",
  "news",
] as const;

export type WidgetType = (typeof widgetTypes)[number];

export type WidgetIcon = "table" | "gauge" | "chart" | "sparkles";

export type WidgetDefinition = {
  type: WidgetType;
  title: string;
  caption: string;
  description: string;
  icon: WidgetIcon;
};
