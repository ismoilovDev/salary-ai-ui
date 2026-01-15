export function formatCurrency(value: number, currency: string = 'UZS'): string {
   return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
   }).format(value) + ' ' + currency;
}

export function formatCompactCurrency(value: number): string {
   if (value >= 1_000_000) {
      return `${value / 1_000_000}M`;
   }
   if (value >= 1_000) {
      return `${value / 1_000}K`;
   }
   return value.toString();
}
