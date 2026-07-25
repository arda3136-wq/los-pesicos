// Varsayılan Takım Verileri
let teams = [
  { id: 1, logo: "https://cdn-icons-png.flaticon.com/512/824/824722.png", name: "Los Pesicos FC", o: 5, g: 4, b: 1, m: 0, ag: 14, yg: 5 },
  { id: 2, logo: "https://cdn-icons-png.flaticon.com/512/824/824719.png", name: "Sampuanlar United", o: 5, g: 3, b: 2, m: 0, ag: 10, yg: 4 }
];

// Varsayılan Haber Verileri
let news = [
  {
    id: 1,
    tag: "LİG BAŞLADI",
    title: "Şampuanlar Ligi Sezonu Açıldı!",
    desc: "Yeni sezon büyük heyecanla başladı. İlk 3 sıradaki takım üst tura çıkacak.",
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600",
    date: "Bugün"
  }
];

let currentUserRole = null;
let isEditMode = false;

document.addEventListener("DOMContentLoaded", () => {
  renderLeagueTable();
  renderNews();
});

// PUAN DURUMU TABLOSUNU ÇİZME VE HESAPLAMA
function renderLeagueTable() {
  const tbody = document.getElementById("league-body");
  if (!tbody) return;
  tbody.innerHTML = "";

  // Otomatik Puan ve Averaj Hesaplama
  teams.forEach(t => {
    t.p = (t.g * 3) + (t.b * 1);
    t.av = t.ag - t.yg;
  });

  // Puan ve Averaja Göre Sıralama
  teams.sort((a, b) => b.p - a.p || b.av - a.av);

  teams.forEach((team, index) => {
    const tr = document.createElement("tr");

    if (currentUserRole === 'admin' && isEditMode) {
      // ADMIN DÜZENLEME MODU (GİRDİ KUTULARI)
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td><input class="edit-input text" value="${team.logo}" onchange="updateTeam(${team.id}, 'logo', this.value)" placeholder="Logo URL"></td>
        <td><input class="edit-input text" value="${team.name}" onchange="updateTeam(${team.id}, 'name', this.value)"></td>
        <td><input type="number" class="edit-input" value="${team.o}" onchange="updateTeam(${team.id}, 'o', this.value)"></td>
        <td><input type="number" class="edit-input" value="${team.g}" onchange="updateTeam(${team.id}, 'g', this.value)"></td>
        <td><input type="number" class="edit-input" value="${team.b}" onchange="updateTeam(${team.id}, 'b', this.value)"></td>
        <td><input type="number" class="edit-input" value="${team.m}" onchange="updateTeam(${team.id}, 'm', this.value)"></td>
        <td><input type="number" class="edit-input" value="${team.ag}" onchange="updateTeam(${team.id}, 'ag', this.value)"></td>
        <td><input type="number" class="edit-input" value="${team.yg}" onchange="updateTeam(${team.id}, 'yg', this.value)"></td>
        <td><strong>${team.av}</strong></td>
        <td><strong style="color:#06b6d4">${team.p}</strong></td>
        <td><button onclick="deleteTeam(${team.id})" style="background:#ef4444; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;">Sil</button></td>
      `;
    } else {
      // NORMAL ZİYARETÇİ GÖRÜNÜMÜ
      tr.innerHTML = `
        <td><strong>${index + 1}</strong></td>
        <td><img src="${team.logo}" class="team-logo" alt="logo" onerror="this.src='https://cdn-icons-png.flaticon.com/512/824/824722.png'"></td>
        <td style="text-align: left; font-weight: 700;">${team.name}</td>
        <td>${team.o}</td>
        <td>${team.g}</td>
        <td>${team.b}</td>
        <td>${team.m}</td>
        <td>${team.ag}</td>
        <td>${team.yg}</td>
        <td>${team.av > 0 ? '+' + team.av : team.av}</td>
        <td style="color: var(--accent); font-weight: 800;">${team.p}</td>
      `;
    }
    tbody.appendChild(tr);
  });
}

// HABER KARTLARINI ÇİZME
function renderNews() {
  const container = document.getElementById("news-grid");
  if (!container) return;
  container.innerHTML = "";

  news.forEach(item => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <img src="${item.img}" class="news-img" alt="Haber" onerror="this.src='https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600'">
      <div class="news-content">
        <span class="news-tag">${item.tag}</span>
        <h3 class="news-title">${item.title}</h3>
        <p class="news-desc">${item.desc}</p>
        ${currentUserRole === 'admin' ? `<button onclick="deleteNews(${item.id})" class="btn-delete-news">Haberi Sil</button>` : ''}
      </div>
    `;
    container.appendChild(card);
  });
}

// ADMIN FONKSİYONLARI
function updateTeam(id, field, value) {
  const team = teams.find(t => t.id === id);
  if (team) {
    if (field === 'name' || field === 'logo') team[field] = value;
    else team[field] = parseInt(value) || 0;
    renderLeagueTable();
  }
}

function changeLeagueLogoPrompt() {
  const logoUrl = prompt("Yeni Lig Logosu URL (Görsel Linki) yapıştırın:");
  if (logoUrl && logoUrl.trim() !== "") {
    document.getElementById("league-logo-img").src = logoUrl;
  }
  const titleName = prompt("Lig Adını değiştirmek isterseniz yazın (Boş bırakabilirsiniz):");
  if (titleName && titleName.trim() !== "") {
    document.getElementById("league-title-text").innerText = titleName;
  }
}

function addNewNewsPrompt() {
  const title = prompt("Haber Başlığı:");
  if (!title) return;
  const desc = prompt("Haber İçeriği / Açıklaması:");
  const tag = prompt("Kategori (örn: TRANSFER, DUYURU):") || "GÜNCEL";
  let img = prompt("Haber Görsel Linki (URL) yapıştırın:\n(Boş bırakırsanız varsayılan resim koyulur)");

  if (!img || img.trim() === "") {
    img = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600";
  }

  news.unshift({
    id: Date.now(),
    tag: tag.toUpperCase(),
    title: title,
    desc: desc,
    img: img
  });

  renderNews();
}

function deleteNews(id) {
  news = news.filter(n => n.id !== id);
  renderNews();
}

function addNewTeamPrompt() {
  const name = prompt("Eklenecek Takım Adı:");
  if (name) {
    teams.push({
      id: Date.now(),
      logo: "https://cdn-icons-png.flaticon.com/512/824/824722.png",
      name: name, o: 0, g: 0, b: 0, m: 0, ag: 0, yg: 0
    });
    renderLeagueTable();
  }
}

function toggleEditMode() {
  isEditMode = !isEditMode;
  document.getElementById("edit-toggle-btn").innerText = isEditMode ? "💾 Kaydet & Kapat" : "✏️ Tabloyu Düzenle";
  renderLeagueTable();
}

function deleteTeam(id) {
  teams = teams.filter(t => t.id !== id);
  renderLeagueTable();
}

// GİRİŞ VE MODAL İŞLEMLERİ (Admin Şifresi: admin123)
function openLoginModal() { document.getElementById("login-modal").classList.remove("hidden"); }
function closeLoginModal() { document.getElementById("login-modal").classList.add("hidden"); }

function handleLogin() {
  const pass = document.getElementById("login-pass").value;
  if (pass === "admin123") {
    currentUserRole = "admin";
    document.getElementById("admin-control-card").classList.remove("hidden");
    document.getElementById("user-status-btn").innerText = "👨‍💼 Admin (Çıkış)";
    document.getElementById("user-status-btn").onclick = handleLogout;
    closeLoginModal();
    renderLeagueTable();
    renderNews();
  } else {
    alert("Hatalı Şifre!");
  }
}

function handleLogout() {
  currentUserRole = null;
  isEditMode = false;
  document.getElementById("admin-control-card").classList.add("hidden");
  document.getElementById("user-status-btn").innerText = "🔑 Giriş Yap";
  document.getElementById("user-status-btn").onclick = openLoginModal;
  renderLeagueTable();
  renderNews();
}
