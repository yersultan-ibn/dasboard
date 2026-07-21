import { env } from "@/shared/config/env";

import type { WidgetDefinition, WidgetType } from "./types";

const CATALOG: WidgetDefinition[] = [
  {
    type: "launch-table",
    title: "Таблица запусков",
    caption: "Последние миссии и их статусы",
    description:
      "Хронология последних запусков: миссия, дата, ракета и результат.",
    icon: "table",
  },
  {
    type: "stats",
    title: "Статистика",
    caption: "Ключевые показатели программы",
    description:
      "Всего запусков, доля успешных и ближайший старт в виде KPI-плиток.",
    icon: "gauge",
  },
  {
    type: "launch-chart",
    title: "Запуски по годам",
    caption: "Динамика активности SpaceX",
    description:
      "Распределение количества запусков по годам в виде столбчатой диаграммы.",
    icon: "chart",
  },
  {
    type: "news",
    title: "Карточка запуска",
    caption: "Последний или ближайший старт",
    description:
      "Ближайший (или последний) запуск с эмблемой миссии и описанием.",
    icon: "sparkles",
  },
];

export function getAvailableWidgetDefinitions(): WidgetDefinition[] {
  return CATALOG.filter(
    (widget) => env.features.newsWidget || widget.type !== "news",
  );
}

export function getWidgetDefinition(
  type: WidgetType,
): WidgetDefinition | undefined {
  return CATALOG.find((widget) => widget.type === type);
}
