const dateTimeFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const numberFormatter = new Intl.NumberFormat("ru-RU");

export function formatLaunchDate(value: string): string {
  return dateTimeFormatter.format(new Date(value));
}

export function formatCompactNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatPercent(value: number | null): string {
  return value === null ? "—" : `${value}%`;
}
