async function loadHealth() {
  const el = document.getElementById("healthJson");
  try {
    const res = await fetch("/api/health");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    el.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    el.textContent = JSON.stringify(
      { error: String(err.message), hint: "¿El servidor está en marcha?" },
      null,
      2
    );
  }
}

document.getElementById("refreshBtn").addEventListener("click", loadHealth);
loadHealth();
