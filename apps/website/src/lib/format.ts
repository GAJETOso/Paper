/** Number formatting shared by counters and dashboards. */
export function formatCompact(value: number, decimals = 0): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value % 1_000_000 ? 1 : 0)}M`;
  if (value >= 10_000) return `${Math.round(value / 1_000)}K`;
  return value.toFixed(decimals);
}
