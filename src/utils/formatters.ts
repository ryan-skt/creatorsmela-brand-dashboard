function formatIndianShortValue(value: number): string {
  const absValue = Math.abs(value);

  if (absValue < 1_000) return `${value}`;
  if (absValue < 100_000) {
    const formatted = (value / 1_000).toFixed(absValue % 1_000 === 0 ? 0 : 1).replace(/\.0$/, '');
    return `${formatted} thousand`;
  }
  if (absValue < 10_000_000) {
    const formatted = (value / 100_000).toFixed(absValue % 100_000 === 0 ? 0 : 1).replace(/\.0$/, '');
    return `${formatted} lakh`;
  }

  const formatted = (value / 10_000_000).toFixed(absValue % 10_000_000 === 0 ? 0 : 1).replace(/\.0$/, '');
  return `${formatted} crore`;
}

export function formatCurrency(value: number): string {
  return `₹${formatIndianShortValue(value)}`;
}

export function formatFollowers(value: number): string {
  return formatIndianShortValue(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
