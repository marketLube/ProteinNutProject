export const getStockStatusClass = (stock) => {
  if (!stock) return null;
  if (stock.includes("Out")) return "out-of-stock";
  if (stock.includes("Low")) return "low-inventory";
  if (stock.includes("On Demand")) return "on-demand";
  return "in-stock";
};
