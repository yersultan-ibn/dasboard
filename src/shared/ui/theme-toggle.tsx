"use client";

import { useEffect, useState } from "react";

import { Icon } from "./icon";
import styles from "./theme-toggle.module.scss";

export type Theme = "light" | "dark";
export const THEME_STORAGE_KEY = "dashboard-theme";

function readInitialTheme(): Theme {
  const attr = document.documentElement.dataset.theme;
  if (attr === "light" || attr === "dark") {
    return attr;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Toggles between light and dark by stamping `data-theme` on <html> (which the
 * token scopes in globals.scss react to) and persisting the choice. The initial
 * paint is handled by the inline script in the layout to avoid a flash.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(readInitialTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // ignore storage failures (private mode, quota) — theme still applies
    }
  }

  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      title={isDark ? "Светлая тема" : "Тёмная тема"}
      suppressHydrationWarning
    >
      <Icon name={isDark ? "sun" : "moon"} size={18} />
    </button>
  );
}
