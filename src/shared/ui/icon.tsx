import type { FC, ReactNode, SVGProps } from "react";

export type IconName =
  | "table"
  | "gauge"
  | "chart"
  | "sparkles"
  | "plus"
  | "trash"
  | "grip"
  | "sun"
  | "moon"
  | "rocket"
  | "check"
  | "alert"
  | "clock"
  | "refresh"
  | "arrow-up-right";

const PATHS: Record<IconName, ReactNode> = {
  table: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9.5h18M3 14.5h18M9 4v16" />
    </>
  ),
  gauge: <path d="M3 12h3.5l2-6 4 13 2.5-9 1.5 2H21" />,
  chart: (
    <>
      <path d="M3 20h18" />
      <path d="M6 20V11M12 20V5M18 20v-7" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" />
      <path d="M18 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  trash: (
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13M10 11v6M14 11v6" />
  ),
  grip: (
    <>
      <circle cx="9" cy="6" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="9" cy="12" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="9" cy="18" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="15" cy="6" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="15" cy="18" r="1.25" fill="currentColor" stroke="none" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />,
  rocket: (
    <>
      <path d="M5 15c-1.6 1.6-2 5-2 5s3.4-.4 5-2M9.5 13.5 15 8a5 5 0 0 1 5-3 5 5 0 0 1-3 5l-5.5 5.5-2-2z" />
      <circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  check: <path d="M5 13l4 4L19 7" />,
  alert: (
    <path d="M12 9v4M12 17h.01M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  refresh: (
    <>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" />
    </>
  ),
};

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  size?: number;
};

export const Icon: FC<IconProps> = ({ name, size = 20, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {PATHS[name]}
  </svg>
);
