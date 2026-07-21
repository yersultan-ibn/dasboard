"use client";

import type { FC } from "react";

import { useAddWidget } from "@/entities/dashboard";
import type { WidgetType } from "@/entities/widget";
import { Button } from "@/shared/ui";

type AddWidgetButtonProps = {
  type: WidgetType;
};

export const AddWidgetButton: FC<AddWidgetButtonProps> = ({ type }) => {
  const addWidget = useAddWidget();

  return (
    <Button
      variant="primary"
      size="sm"
      icon="plus"
      onClick={() => addWidget(type)}
    >
      Добавить
    </Button>
  );
};
