"use client";

import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { createContext, useContext } from "react";

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
