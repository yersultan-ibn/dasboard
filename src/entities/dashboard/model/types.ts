import type { WidgetType } from "@/entities/widget";

/**
 * A widget instance placed on the user's dashboard. This is the dashboard's own
 * domain model (persisted client state), distinct from the widget *kind* that
 * `entities/widget` describes — hence the type-only reference to `WidgetType`.
 */
export type DashboardWidget = {
  id: string;
  type: WidgetType;
};
