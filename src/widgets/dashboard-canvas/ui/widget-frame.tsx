import type { FC, ReactNode } from "react";

import { getWidgetDefinition, type WidgetType } from "@/entities/widget";
import { RemoveWidgetButton } from "@/features/remove-widget";
import { DragHandle } from "@/features/reorder-widgets";
import { Card, CardHeader } from "@/shared/ui";

import styles from "./widget-frame.module.scss";

type WidgetFrameProps = {
  widgetId: string;
  type: WidgetType;
  children: ReactNode;
};

export const WidgetFrame: FC<WidgetFrameProps> = ({
  widgetId,
  type,
  children,
}) => {
  const definition = getWidgetDefinition(type);

  return (
    <Card interactive className={styles.frame}>
      <CardHeader
        headingLevel={3}
        leading={<DragHandle />}
        icon={definition?.icon}
        title={definition?.title ?? type}
        caption={definition?.caption}
        action={<RemoveWidgetButton widgetId={widgetId} />}
      />
      <div className={styles.body}>{children}</div>
    </Card>
  );
};
