// Public API of the `dashboard` entity — the user's dashboard configuration.
export type { DashboardWidget } from "./model/types";
export {
  useDashboardStore,
  useDashboardWidgets,
  useAddWidget,
  useRemoveWidget,
  useReorderWidgets,
  useResetWidgets,
  useDashboardHydrated,
} from "./model/store";
