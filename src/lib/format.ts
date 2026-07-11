export function formatCurrency(value: number, symbol: "৳" | "$") {
  return `${symbol}${value.toLocaleString("en-US")}`;
}
