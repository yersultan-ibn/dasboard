import type { CSSProperties, FC } from "react";

import { cn } from "@/shared/lib/cn";

import styles from "./skeleton.module.scss";

type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  className?: string;
};

export const Skeleton: FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  radius = "var(--radius-sm)",
  className,
}) => {
  const style: CSSProperties = { width, height, borderRadius: radius };
  return (
    <span
      className={cn(styles.skeleton, className)}
      style={style}
      aria-hidden="true"
    />
  );
};
