export function priceToString(value: number) {
  return String(value.toFixed(2)).replace('.', ',');
}