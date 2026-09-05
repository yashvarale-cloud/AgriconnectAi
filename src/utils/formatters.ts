export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatWeight(quantity: number, unit: string = 'kg'): string {
  if (unit === 'kg' && quantity >= 1000) {
    return (quantity / 1000).toFixed(1).replace(/\.0$/, '') + ' Tons';
  }
  return new Intl.NumberFormat('en-IN').format(quantity) + ' ' + unit;
}