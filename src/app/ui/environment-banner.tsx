import type { FC } from "react";

import { env } from "@/shared/config/env";

import styles from "./environment-banner.module.scss";

/**
 * Environment strip — one of the visible differences between the dev and prod
 * builds. Shown only when `NEXT_PUBLIC_ENV_BANNER` has a label (dev); hidden in
 * production where the variable is left empty.
 */
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
