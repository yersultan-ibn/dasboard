export const widgetTypes = [
  "launch-table",
  "stats",
  "launch-chart",
  "news",
] as const;

export type WidgetType = (typeof widgetTypes)[number];

/** Named glyphs resolved to inline SVGs by `shared/ui` — keeps the model layer component-free. */
export type WidgetIcon = "table" | "gauge" | "chart" | "sparkles";

/** Static, catalog-level description of a widget kind. */
export type WidgetDefinition = {
  type: WidgetType;
  /** Shown as the frame heading on the canvas. */
  title: string;
  /** Shown under the heading on the canvas. */
  caption: string;
  /** Longer copy shown in the widget library. */
  description: string;
  icon: WidgetIcon;
};
