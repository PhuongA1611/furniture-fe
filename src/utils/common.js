// create function format currency from number location us
export const formatCurrency = (number) => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatNumber = (number) => {
  return number.toLocaleString("en-US", { style: "decimal" });
};
