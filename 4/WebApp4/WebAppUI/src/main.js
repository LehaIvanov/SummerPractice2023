import "./style.css";

(async () => {
  const response = await fetch(
    `/api/prices?${new URLSearchParams({
      // API expects DateTimes in in UTC timezone
      FromDateTime: "2023-07-25T09:05:00.000",
      PaymentCurrency: "PLN",
      PurchasedCurrency: "CAD",
    })}`,
  );

  if (response.ok) {
    const json = await response.json();
    // eslint-disable-next-line no-console
    console.log("prices = ", json);
  } else {
    // eslint-disable-next-line no-console
    console.log(`HTTP error: ${response.status}`);
  }
})();
