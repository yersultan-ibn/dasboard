"use client";

import type { FC } from "react";

import { Icon } from "@/shared/ui";

import styles from "./drag-handle.module.scss";
import { useDragHandle } from "../model/drag-handle-context";

/** Grip that activates dragging; renders nothing outside a SortableWidget. */
export const DragHandle: FC = () => {
  const handle = useDragHandle();

  if (!handle) {
    return null;
  }

  return (
    <button
      type="button"
      ref={handle.setActivatorNodeRef}
      className={styles.handle}
      aria-label="Перетащите, чтобы изменить порядок"
      {...handle.attributes}
      {...handle.listeners}
    >
      <Icon name="grip" size={18} />
    </button>
  );
};
