async function fetchSystemInfo() {
  const response = await fetch("/info");
  const data = await response.json();
  document.getElementById("hostname").textContent = data.hostname;
  document.getElementById("uptime").textContent = data.uptime;
  document.getElementById("platform").textContent = data.platform;
  document.getElementById("architecture").textContent = data.architecture;
  document.getElementById("totalMemory").textContent = data.totalMemory;
  document.getElementById("freeMemory").textContent = data.freeMemory;
  document.getElementById("cpuModel").textContent = data.cpuModel;
  document.getElementById("cpuCount").textContent = data.cpuCount;
}

async function updatePageTitle() {
  const response = await fetch("/info");
  if (response.ok) {
    const data = await response.json();
    const hostname = data.hostname;
    document.getElementById(
      "pageTitle"
    ).textContent = `${hostname}'s System Info`;
  }
}

setInterval(fetchSystemInfo, 1000); // Update every second
fetchSystemInfo(); // Initial fetch
updatePageTitle();
