import type { FC } from "react";

import { env } from "@/shared/config/env";

import styles from "./environment-banner.module.scss";

export const EnvironmentBanner: FC = () => {
  if (!env.banner.visible) {
    return null;
  }

  return (
    <div className={styles.banner} role="status" aria-live="polite">
      <span className={styles.dot} aria-hidden="true" />
      Среда: {env.banner.label}
    </div>
  );
};
