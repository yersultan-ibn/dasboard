import type { FC } from "react";

import { RefreshButton } from "@/features/refresh-data";
import { Icon, ThemeToggle } from "@/shared/ui";

import styles from "./app-header.module.scss";

export const AppHeader: FC = () => (
  <header className={styles.header}>
    <div className={styles.inner}>
      <a className={styles.brand} href="/">
        <span className={styles.logo} aria-hidden="true">
          <Icon name="rocket" size={20} />
        </span>
        <span className={styles.brandText}>
          <span className={styles.name}>Dashboard Builder</span>
          <span className={styles.sub}>SpaceX mission control</span>
        </span>
      </a>
      <div className={styles.actions}>
        <RefreshButton />
        <ThemeToggle />
      </div>
    </div>
  </header>
);
