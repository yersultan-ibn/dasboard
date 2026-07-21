import type { ButtonHTMLAttributes, FC } from "react";

import { cn } from "@/shared/lib/cn";

import styles from "./button.module.scss";
import { Icon, type IconName } from "./icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  icon?: IconName;
  iconOnly?: boolean;
};

export const Button: FC<ButtonProps> = ({
  variant = "secondary",
  size = "md",
  icon,
  iconOnly = false,
  className,
  children,
  type = "button",
  ...rest
}) => (
  <button
    type={type}
    className={cn(
      styles.button,
      styles[variant],
      styles[size],
      iconOnly && styles.iconOnly,
      className,
    )}
    {...rest}
  >
    {icon ? <Icon name={icon} size={size === "sm" ? 16 : 18} /> : null}
    {iconOnly ? null : children}
  </button>
);
