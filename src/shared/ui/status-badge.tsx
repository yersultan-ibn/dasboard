import type { FC } from "react";

import { cn } from "@/shared/lib/cn";

import { Icon, type IconName } from "./icon";
import styles from "./status-badge.module.scss";

export type StatusTone = "good" | "critical" | "warning" | "neutral";

const TONE_ICON: Record<StatusTone, IconName> = {
  good: "check",
  critical: "alert",
  warning: "clock",
  neutral: "clock",
};

type StatusBadgeProps = {
  tone: StatusTone;
  label: string;
};

export const StatusBadge: FC<StatusBadgeProps> = ({ tone, label }) => (
  <span className={cn(styles.badge, styles[tone])}>
    <Icon name={TONE_ICON[tone]} size={13} />
    {label}
  </span>
);
