"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { WidgetType } from "@/entities/widget";
import { env } from "@/shared/config/env";

import type { DashboardWidget } from "./types";

const STORAGE_KEY = "dashboard-builder-config";

type DashboardState = {
  widgets: DashboardWidget[];
  addWidget: (type: WidgetType) => void;
  removeWidget: (id: string) => void;
  reorderWidgets: (activeId: string, overId: string) => void;
  resetWidgets: () => void;
};

function moveItem<T>(items: T[], from: number, to: number): T[] {
  const next = items.slice();
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

function isWidgetEnabled(type: WidgetType): boolean {
  return env.features.newsWidget || type !== "news";
}

function createDefaultWidgets(): DashboardWidget[] {
  const seed: DashboardWidget[] = [
    { id: "stats-1", type: "stats" },
    { id: "launch-chart-1", type: "launch-chart" },
    { id: "launch-table-1", type: "launch-table" },
    { id: "news-1", type: "news" },
  ];
  return seed.filter((widget) => isWidgetEnabled(widget.type));
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      widgets: createDefaultWidgets(),

      addWidget: (type) =>
        set((state) => ({
          widgets: [
            ...state.widgets,
            { id: `${type}-${crypto.randomUUID()}`, type },
          ],
        })),

      removeWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((widget) => widget.id !== id),
        })),

      reorderWidgets: (activeId, overId) =>
        set((state) => {
          const from = state.widgets.findIndex(
            (widget) => widget.id === activeId,
          );
          const to = state.widgets.findIndex((widget) => widget.id === overId);
          if (from === -1 || to === -1) {
            return state;
          }
          return { widgets: moveItem(state.widgets, from, to) };
        }),

      resetWidgets: () => set({ widgets: createDefaultWidgets() }),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      merge: (persisted, current) => {
        const saved = persisted as Partial<DashboardState> | undefined;
        const widgets = (saved?.widgets ?? current.widgets).filter((widget) =>
          isWidgetEnabled(widget.type),
        );
        return { ...current, ...saved, widgets };
      },
    },
  ),
);

export const useDashboardWidgets = () =>
  useDashboardStore((state) => state.widgets);
export const useAddWidget = () => useDashboardStore((state) => state.addWidget);
export const useRemoveWidget = () =>
  useDashboardStore((state) => state.removeWidget);
export const useReorderWidgets = () =>
  useDashboardStore((state) => state.reorderWidgets);
export const useResetWidgets = () =>
  useDashboardStore((state) => state.resetWidgets);

export function useDashboardHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
