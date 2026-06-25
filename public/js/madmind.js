// Mad Minds Unified JS
const MM = {
  api: "/api", // Cloudflare Worker endpoint

  go(page) {
    window.location.href = page;
  },

  async login() {
    const id = document.getElementById("login-id").value.trim();
    const pw = document.getElementById("login-pw").value.trim();

    if (!id || !pw) return alert("Enter both fields.");

    const res = await fetch("../json/users.json");
    const users = await res.json();

    const user = users.find(u =>
      (u.username === id || u.email === id) && u.password === pw
    );

    if (!user) return alert("Invalid login.");

    localStorage.setItem("mm_user", JSON.stringify(user));
    MM.go("dashboard.html");
  },

  guest() {
    localStorage.removeItem("mm_user");
    MM.go("map.html");
  },

  loadDashboard() {
    const user = JSON.parse(localStorage.getItem("mm_user") || "{}");
    document.getElementById("dash-name").textContent = user.username || "Guest Nomad";
  },

  loadMap() {
    document.getElementById("map").innerHTML = `
      <div class="loading">Map will load here (Cloudflare Worker → Mapbox)</div>
    `;
  }
};
