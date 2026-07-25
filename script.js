// Varsayılan Takım Verileri
let teams = [
  { id: 1, name: "Los Pesicos FC", o: 5, g: 4, b: 1, m: 0, ag: 14, yg: 5, p: 13 },
  { id: 2, name: "Sampuanlar United", o: 5, g: 3, b: 2, m: 0, ag: 10, yg: 4, p: 11 },
  { id: 3, name: "Atletico Pesico", o: 5, g: 3, b: 0, m: 2, ag: 9, yg: 7, p: 9 },
  { id: 4, name: "Real Pesico", o: 5, g: 2, b: 1, m: 2, ag: 8, yg: 8, p: 7 },
  { id: 5, name: "Pesico City", o: 5, g: 1, b: 0, m: 4, ag: 5, yg: 11, p: 3 }
];

let currentUserRole = null; // null, 'admin', veya 'team'
let isEditMode = false;

// Sayfa Yüklenince
document.addEventListener("DOMContentLoaded", () => {
  renderLeagueTable();
});

// Tabloyu Çizme
function renderLeagueTable() {
  const tbody = document.getElementById("league-body");
  tbody.innerHTML = "";

  // Puan ve Averaja göre sırala
  teams.sort((a, b) => b.p - a.p || (b.ag - b.yg) - (a.ag - a.yg));

  teams.forEach((team, index) => {
    const rank = index + 1;
    const av = team.ag - team.yg;
    let rankClass = "";

    if (rank <= 3) rankClass = "sl-rank";
    else if (rank <= 5) rankClass = "playoff-rank";

    const tr = document.createElement("tr");
    tr.className = rankClass;

    tr.innerHTML = `
      <td><strong>${rank}</strong></td>
      <td style="text-align: left; font-weight: 700;">${team.name}</td>
      <td>${team.o}</td>
      <td>${team.g}</td>
      <td>${team.b}</td>
      <td>${team.m}</td>
      <td>${team.ag}</td>
      <td>${team.yg}</td>
      <td>${av > 0 ? '+' + av : av}</td>
      <td style="color: var(--accent); font-weight: 800;">${team.p}</td>
      ${currentUserRole === 'admin' && isEditMode ? `<td><button onclick="deleteTeam(${team.id})" style="background:#ef4444; color:white; border:none; padding:0.2rem 0.5rem; border-radius:4px; cursor:pointer;">Sil</button></td>` : ''}
    `;

    tbody.appendChild(tr);
  });
}

// Modal İşlemleri
function openLoginModal() {
  document.getElementById("login-modal").classList.remove("hidden");
}

function closeLoginModal() {
  document.getElementById("login-modal").classList.add("hidden");
}

// Giriş Denetimi (Admin Şifresi: admin123)
function handleLogin() {
  const role = document.getElementById("login-role").value;
  const pass = document.getElementById("login-pass").value;

  if (role === "admin") {
    if (pass === "admin123") {
      currentUserRole = "admin";
      alert("Admin olarak giriş yapıldı!");
      document.getElementById("admin-control-card").classList.remove("hidden");
      document.getElementById("user-status-btn").innerText = "👨‍💼 Admin (Çıkış)";
      document.getElementById("user-status-btn").onclick = handleLogout;
      closeLoginModal();
      renderLeagueTable();
    } else {
      alert("Hatalı Admin Şifresi!");
    }
  } else {
    alert("Takım Yöneticisi Girişi Yapıldı.");
    currentUserRole = "team";
    closeLoginModal();
  }
}

function handleLogout() {
  currentUserRole = null;
  isEditMode = false;
  document.getElementById("admin-control-card").classList.add("hidden");
  document.getElementById("user-status-btn").innerText = "🔑 Giriş Yap";
  document.getElementById("user-status-btn").onclick = openLoginModal;
  renderLeagueTable();
}

// Admin Fonksiyonları
function addNewTeamPrompt() {
  const name = prompt("Eklenecek Takım Adı:");
  if (name) {
    teams.push({
      id: Date.now(),
      name: name,
      o: 0, g: 0, b: 0, m: 0, ag: 0, yg: 0, p: 0
    });
    renderLeagueTable();
  }
}

function toggleEditMode() {
  isEditMode = !isEditMode;
  document.getElementById("edit-toggle-btn").innerText = isEditMode ? "💾 Düzenlemeyi Kapat" : "✏️ Tablo Düzenlemeyi Aç";
  renderLeagueTable();
}

function deleteTeam(id) {
  teams = teams.filter(t => t.id !== id);
  renderLeagueTable();
}
