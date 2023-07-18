import "./style.css";

(async () => {
  const response = await fetch("/api/users");

  if (response.ok) {
    const json = await response.json();
    // eslint-disable-next-line no-console
    console.log("json = ", json);
  } else {
    // eslint-disable-next-line no-console
    console.log(`HTTP error: ${response.status}`);
  }
})();
