"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties, FC, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

import styles from "./sortable-widget.module.scss";
import { DragHandleContext } from "../model/drag-handle-context";

type SortableWidgetProps = {
  id: string;
  children: ReactNode;
};

export const SortableWidget: FC<SortableWidgetProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(styles.item, isDragging && styles.dragging)}
    >
      <DragHandleContext.Provider
        value={{ attributes, listeners, setActivatorNodeRef }}
      >
        {children}
      </DragHandleContext.Provider>
    </div>
  );
};
