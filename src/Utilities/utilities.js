const MONTHS = {
  JANUARY: 0,
  FEBRUARY: 1,
  MARCH: 2
}

const convertDollarsToPoints = (dollars) => (
  Math.max(0, Math.floor(dollars) - 50) + // 1 point for all dollars spent over 50
  Math.max(0, Math.floor(dollars) - 100) // 1 additional point for all dollars spent over 100
);

const calculatePointsFromPurchases = (purchases) => (
  purchases.reduce((acc, purchase) => (
    acc + convertDollarsToPoints(purchase.price)
  ), 0)
);

const filterPurchasesByMonth = (purchases, monthIndex) => (
  purchases.filter((purchase) => {
    const purchaseDate = new Date(purchase.date);
    const purchaseMonth = purchaseDate.getMonth();
    return (purchaseMonth === monthIndex);
  })
);

const calculatePointsFromPurchasesByMonth = (purchases, monthIndex) => (
  calculatePointsFromPurchases(
    filterPurchasesByMonth(purchases, monthIndex)
  )
);

const processPointsData = (purchases) => {
  const jan = calculatePointsFromPurchasesByMonth(purchases, MONTHS.JANUARY);
  const feb = calculatePointsFromPurchasesByMonth(purchases, MONTHS.FEBRUARY);
  const mar = calculatePointsFromPurchasesByMonth(purchases, MONTHS.MARCH);
  const total = jan + feb + mar;

  return { jan, feb, mar, total };
}

export {
  MONTHS,
  convertDollarsToPoints,
  calculatePointsFromPurchases,
  filterPurchasesByMonth,
  calculatePointsFromPurchasesByMonth,
  processPointsData
}