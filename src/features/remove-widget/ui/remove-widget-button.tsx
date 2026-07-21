"use client";

import type { FC } from "react";

import { useRemoveWidget } from "@/entities/dashboard";
import { Button } from "@/shared/ui";

type RemoveWidgetButtonProps = {
  widgetId: string;
};

export const RemoveWidgetButton: FC<RemoveWidgetButtonProps> = ({
  widgetId,
}) => {
  const removeWidget = useRemoveWidget();

  return (
    <Button
      variant="danger"
      size="sm"
      icon="trash"
      iconOnly
      aria-label="Удалить виджет"
      onClick={() => removeWidget(widgetId)}
    />
  );
};
