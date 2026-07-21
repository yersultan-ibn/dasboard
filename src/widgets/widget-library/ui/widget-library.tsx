import type { FC } from "react";

import { getAvailableWidgetDefinitions } from "@/entities/widget";
import { AddWidgetButton } from "@/features/add-widget";
import { Card, CardHeader, Icon } from "@/shared/ui";

import styles from "./widget-library.module.scss";

export const WidgetLibrary: FC = () => {
  const widgets = getAvailableWidgetDefinitions();

  return (
    <Card>
      <CardHeader
        title="Библиотека виджетов"
        caption="Соберите панель из готовых блоков"
      />
      <div className={styles.list}>
        {widgets.map((widget) => (
          <article key={widget.type} className={styles.item}>
            <span className={styles.icon} aria-hidden="true">
              <Icon name={widget.icon} size={18} />
            </span>
            <div className={styles.info}>
              <h3 className={styles.title}>{widget.title}</h3>
              <p className={styles.description}>{widget.description}</p>
            </div>
            <AddWidgetButton type={widget.type} />
          </article>
        ))}
      </div>
    </Card>
  );
};
