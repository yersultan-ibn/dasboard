/** Tiny classnames joiner: drops falsy values and joins the rest with a space. */
export function cn(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}
