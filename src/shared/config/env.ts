/**
 * Typed, centralized access to public environment configuration.
 *
 * The environment is driven by `NEXT_PUBLIC_APP_ENV` rather than `NODE_ENV`:
 * on a host like Vercel every deployment runs with `NODE_ENV=production`, so
 * `NODE_ENV` cannot tell a *development* deployment apart from a *production*
 * one. An explicit public flag can, and it is what makes the two environments
 * differ in more than name (API endpoint, banner, feature flags, logging).
 */
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
    // dev: full request/response tracing; prod: errors only
    verbose: appEnv === "development",
  },
} as const;
