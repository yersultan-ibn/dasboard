import type { FC, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

import styles from "./card.module.scss";
import { Icon, type IconName } from "./icon";

type CardProps = {
  className?: string;
  interactive?: boolean;
  children: ReactNode;
};

/** The base surface panel every framed block sits on. Purely presentational. */
export const Card: FC<CardProps> = ({ className, interactive, children }) => (
  <section
    className={cn(styles.card, interactive && styles.interactive, className)}
  >
    {children}
  </section>
);

type CardHeaderProps = {
  title: ReactNode;
  caption?: ReactNode;
  icon?: IconName;
  /** Rendered at the far left, before the icon (e.g. a drag handle). */
  leading?: ReactNode;
  /** Rendered at the far right (e.g. a remove button). */
  action?: ReactNode;
  headingLevel?: 2 | 3;
};

export const CardHeader: FC<CardHeaderProps> = ({
  title,
  caption,
  icon,
  leading,
  action,
  headingLevel = 2,
}) => {
  const Heading = headingLevel === 3 ? "h3" : "h2";

  return (
    <header className={styles.header}>
      {leading ? <div className={styles.leading}>{leading}</div> : null}
      {icon ? (
        <span className={styles.iconWrap} aria-hidden="true">
          <Icon name={icon} size={18} />
        </span>
      ) : null}
      <div className={styles.heading}>
        <Heading className={styles.title}>{title}</Heading>
        {caption ? <p className={styles.caption}>{caption}</p> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </header>
  );
};
