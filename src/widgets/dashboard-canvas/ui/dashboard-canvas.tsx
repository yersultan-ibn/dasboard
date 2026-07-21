"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import type { FC, ReactNode } from "react";

import {
  useDashboardHydrated,
  useDashboardWidgets,
  useReorderWidgets,
} from "@/entities/dashboard";
import type { WidgetType } from "@/entities/widget";
import { SortableWidget } from "@/features/reorder-widgets";
import { Skeleton, StateMessage } from "@/shared/ui";

import styles from "./dashboard-canvas.module.scss";
import { WidgetFrame } from "./widget-frame";

type DashboardCanvasProps = {
  /**
   * Inversion of control: the app layer supplies the type→content mapping, so
   * the canvas never imports sibling widget slices (which FSD forbids) and stays
   * a pure layout + reordering surface.
   */
  renderWidgetContent: (type: WidgetType) => ReactNode;
};

export const DashboardCanvas: FC<DashboardCanvasProps> = ({
  renderWidgetContent,
}) => {
  const widgets = useDashboardWidgets();
  const reorderWidgets = useReorderWidgets();
  const hydrated = useDashboardHydrated();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Until the persisted config rehydrates, render a skeleton that matches on the
  // server and the first client render (no hydration mismatch).
  if (!hydrated) {
    return (
      <div className={styles.grid} aria-hidden="true">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} height={280} radius="var(--radius-lg)" />
        ))}
      </div>
    );
  }

  if (widgets.length === 0) {
    return (
      <StateMessage
        icon="sparkles"
        title="Дашборд пуст"
        description="Добавьте виджеты из библиотеки, чтобы собрать свою панель."
      />
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }
    reorderWidgets(String(active.id), String(over.id));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={widgets.map((widget) => widget.id)}
        strategy={rectSortingStrategy}
      >
        <div className={styles.grid}>
          {widgets.map((widget) => (
            <SortableWidget key={widget.id} id={widget.id}>
              <WidgetFrame widgetId={widget.id} type={widget.type}>
                {renderWidgetContent(widget.type)}
              </WidgetFrame>
            </SortableWidget>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
