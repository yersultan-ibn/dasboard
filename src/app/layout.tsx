import type { Metadata } from "next";
import type { FC, ReactNode } from "react";

import { AppProviders } from "./providers";
import { AppHeader } from "./ui/app-header";
import { EnvironmentBanner } from "./ui/environment-banner";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Dashboard Builder — SpaceX",
  description:
    "Конструктор дашборда на данных SpaceX: React Query, Zustand, Next.js App Router и Feature-Sliced Design.",
};

// Applies the saved theme before first paint to avoid a light/dark flash.
const themeInitScript = `(function(){try{var t=localStorage.getItem('dashboard-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

type RootLayoutProps = Readonly<{ children: ReactNode }>;

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="ru" suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
    </head>
    <body>
      <AppProviders>
        <EnvironmentBanner />
        <AppHeader />
        {children}
      </AppProviders>
    </body>
  </html>
);

export default RootLayout;
