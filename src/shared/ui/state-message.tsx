import type { FC, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

import { Icon, type IconName } from "./icon";
import styles from "./state-message.module.scss";

type StateMessageProps = {
  title: string;
  description?: string;
  icon?: IconName;
  tone?: "default" | "error";
  action?: ReactNode;
};

/** Centered empty/error placeholder with an icon, title and optional action. */
export const StateMessage: FC<StateMessageProps> = ({
  title,
  description,
  icon,
  tone = "default",
  action,
}) => (
  <div className={cn(styles.root, tone === "error" && styles.error)}>
    {icon ? (
      <span className={styles.icon} aria-hidden="true">
        <Icon name={icon} size={22} />
      </span>
    ) : null}
    <p className={styles.title}>{title}</p>
    {description ? <p className={styles.description}>{description}</p> : null}
    {action ? <div className={styles.action}>{action}</div> : null}
  </div>
);
