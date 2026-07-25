const teams = [
  { rank: 1, name: "Los Pesicos FC", o: 5, g: 4, b: 1, m: 0, ag: 14, yg: 5, p: 13, form: "WWWDW" },
  { rank: 2, name: "Sampuanlar United", o: 5, g: 3, b: 2, m: 0, ag: 10, yg: 4, p: 11, form: "WDWDW" },
  { rank: 3, name: "Atletico Pesico", o: 5, g: 3, b: 0, m: 2, ag: 9, yg: 7, p: 9, form: "LWWLW" },
  { rank: 4, name: "Real Pesico", o: 5, g: 2, b: 1, m: 2, ag: 8, yg: 8, p: 7, form: "WDLWL" },
  { rank: 5, name: "Pesico City", o: 5, g: 1, b: 0, m: 4, ag: 5, yg: 11, p: 3, form: "LLLWL" }
];

function renderTable() {
  const tbody = document.getElementById("standings-body");
  if (!tbody) return;
  tbody.innerHTML = "";

  teams.forEach((team) => {
    const av = team.ag - team.yg;
    let rowClass = "";
    
    if (team.rank <= 3) rowClass = "sl-row";
    else if (team.rank <= 5) rowClass = "playoff-row";

    const tr = document.createElement("tr");
    tr.className = rowClass;
    tr.innerHTML = `
      <td>${team.rank}</td>
      <td style="text-align: left; font-weight: bold;">${team.name}</td>
      <td>${team.o}</td>
      <td>${team.g}</td>
      <td>${team.b}</td>
      <td>${team.m}</td>
      <td>${team.ag}</td>
      <td>${team.yg}</td>
      <td>${av > 0 ? '+' + av : av}</td>
      <td><strong>${team.p}</strong></td>
      <td>${team.form}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded", renderTable);