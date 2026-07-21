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

/** Immutable array move — keeps the store free of any DnD-library dependency. */
function moveItem<T>(items: T[], from: number, to: number): T[] {
  const next = items.slice();
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

function isWidgetEnabled(type: WidgetType): boolean {
  return env.features.newsWidget || type !== "news";
}

/** Seed layout for a first-time visitor (no persisted config yet). */
function createDefaultWidgets(): DashboardWidget[] {
  const seed: DashboardWidget[] = [
    { id: "stats-1", type: "stats" },
    { id: "launch-chart-1", type: "launch-chart" },
    { id: "launch-table-1", type: "launch-table" },
    { id: "news-1", type: "news" },
  ];
  return seed.filter((widget) => isWidgetEnabled(widget.type));
}

/**
 * Client-only dashboard configuration. Deliberately holds *only* the user's
 * layout (which widgets, in what order) — never server data, which lives in
 * React Query. Persisted to localStorage so the arrangement survives reloads.
 */
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
      // Drop feature-flagged-off widgets on rehydrate, so a config saved while a
      // flag was enabled doesn't resurrect that widget after it's turned off.
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

// Selector hooks — each component subscribes to the smallest slice it needs.
export const useDashboardWidgets = () =>
  useDashboardStore((state) => state.widgets);
export const useAddWidget = () => useDashboardStore((state) => state.addWidget);
export const useRemoveWidget = () =>
  useDashboardStore((state) => state.removeWidget);
export const useReorderWidgets = () =>
  useDashboardStore((state) => state.reorderWidgets);
export const useResetWidgets = () =>
  useDashboardStore((state) => state.resetWidgets);

/**
 * True once the persisted config has rehydrated on the client. Gating the canvas
 * on this keeps SSR output (defaults) and the first client render identical,
 * avoiding a hydration mismatch when localStorage differs from the seed.
 */
export function useDashboardHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
