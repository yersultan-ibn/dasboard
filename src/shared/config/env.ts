export type AppEnv = "development" | "production";

function parseAppEnv(value: string | undefined): AppEnv {
  return value === "production" ? "production" : "development";
}

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value.trim() === "") {
    return fallback;
  }
  return value.trim().toLowerCase() === "true";
}

const appEnv = parseAppEnv(process.env.NEXT_PUBLIC_APP_ENV);
const bannerLabel = (process.env.NEXT_PUBLIC_ENV_BANNER ?? "").trim();

export const env = {
  appEnv,
  isDevelopment: appEnv === "development",
  isProduction: appEnv === "production",

  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.spacexdata.com/v4",

  banner: {
    label: bannerLabel,
    visible: bannerLabel.length > 0,
  },

  features: {
    newsWidget: parseBoolean(process.env.NEXT_PUBLIC_FEATURE_NEWS_WIDGET, true),
  },

  logging: {
    verbose: appEnv === "development",
  },
} as const;
