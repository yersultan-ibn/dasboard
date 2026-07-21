"use client";

import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { createContext, useContext } from "react";

/**
 * Bridges the sortable wrapper (this feature) and the drag handle rendered
 * inside the card header (the widget layer). The wrapper publishes the DnD
 * activator bindings here; `DragHandle` consumes them — so the handle can sit in
 * the header without the widget layer ever touching dnd-kit directly.
 */
export type DragHandleContextValue = {
  attributes: DraggableAttributes;
  listeners: DraggableSyntheticListeners;
  setActivatorNodeRef: (element: HTMLElement | null) => void;
};

export const DragHandleContext = createContext<DragHandleContextValue | null>(
  null,
);

export function useDragHandle(): DragHandleContextValue | null {
  return useContext(DragHandleContext);
}
