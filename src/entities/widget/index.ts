// Public API of the `widget` entity — describes widget *kinds* (catalog).
export { widgetTypes } from "./model/types";
export type { WidgetType, WidgetIcon, WidgetDefinition } from "./model/types";
export {
  getAvailableWidgetDefinitions,
  getWidgetDefinition,
} from "./model/catalog";
