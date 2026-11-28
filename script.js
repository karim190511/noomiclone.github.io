const players = [
      {name:"Сильнейший градусник", points:1000, hardest:"2160", records:1},
        {name:"Lyuty jNoomimen", points:1000, hardest:"2160", records:1},
          {name:"Наисильнейший", points:1000, hardest:"2160", records:1},
            {name:"Lumi", points:7900, hardest:"Slaughterhouse", records:31},
              {name:"Zenith", points:7200, hardest:"Acheron", records:28},
                {name:"Kairo", points:6550, hardest:"Tidal Wave", records:24},
                  {name:"Vex", points:5900, hardest:"Sakupen Circles", records:22},
                    {name:"Nox", points:5100, hardest:"Kyouki", records:19},
                      {name:"Arctic", points:4400, hardest:"Acheron", records:16},
                        {name:"Pulse", points:3800, hardest:"Slaughterhouse", records:13}
                        ];

                        const recentRecords = [
                          {player:"Rori", level:"Tidal Wave", percent:"100%"},
                            {player:"Aether", level:"Silent Clubstep", percent:"100%"},
                              {player:"Nova", level:"Kyouki", percent:"100%"},
                                {player:"Lumi", level:"Slaughterhouse", percent:"100%"},
                                  {player:"Zenith", level:"Acheron", percent:"100%"}
                                  ];

                                  const table = document.getElementById("playerTable");
                                  const podium = document.getElementById("podium");
                                  const search = document.getElementById("search");
                                  const sort = document.getElementById("sort");
                                  const total = document.getElementById("playerTotal");
                                  const recordsList = document.getElementById("recordsList");
                                  const modal = document.getElementById("modal");
                                  const profile = document.getElementById("profileContent");

                                  function sortedPlayers() {
                                    let data = [...players];

                                      if (sort.value === "name") {
                                          data.sort((a,b) => a.name.localeCompare(b.name));
                                            } else {
                                                data.sort((a,b) => b.points - a.points);
                                                  }

                                                    return data;
                                                    }

                                                    function renderPodium() {
                                                      const top = [...players].sort((a,b) => b.points-a.points).slice(0,3);

                                                        podium.innerHTML = top.map((p,i) => `
                                                            <div class="podium-card ${i===0 ? "first" : ""}"
                                                                     onclick="openProfile('${p.name}')">
                                                                           <div class="podium-rank">#${i+1}</div>
                                                                                 <div class="podium-name">${p.name}</div>
                                                                                       <div class="podium-points">${p.points.toLocaleString()} pts</div>
                                                                                             <div class="podium-hardest">${p.hardest}</div>
                                                                                                 </div>
                                                                                                   `).join("");
                                                                                                   }

                                                                                                   function renderTable() {
                                                                                                     let data = sortedPlayers();

                                                                                                       const query = search.value.trim().toLowerCase();

                                                                                                         data = data.filter(p =>
                                                                                                             p.name.toLowerCase().includes(query) ||
                                                                                                                 p.hardest.toLowerCase().includes(query)
                                                                                                                   );

                                                                                                                     total.textContent = `${players.length} players`;

                                                                                                                       table.innerHTML = data.map(p => `
                                                                                                                           <tr onclick="openProfile('${p.name}')">
                                                                                                                                 <td class="rank">#${players
                                                                                                                                         .sort((a,b)=>b.points-a.points)
                                                                                                                                                 .findIndex(x=>x.name===p.name)+1}</td>
                                                                                                                                                       <td class="player-cell">${p.name}</td>
                                                                                                                                                             <td class="points">${p.points.toLocaleString()}</td>
                                                                                                                                                                   <td class="hardest">${p.hardest}</td>
                                                                                                                                                                         <td>${p.records}</td>
                                                                                                                                                                             </tr>
                                                                                                                                                                               `).join("");
                                                                                                                                                                               }

                                                                                                                                                                               function renderRecords() {
                                                                                                                                                                                 recordsList.innerHTML = recentRecords.map(r => `
                                                                                                                                                                                     <div class="record">
                                                                                                                                                                                           <div class="record-left">
                                                                                                                                                                                                   <div class="record-level">${r.level}</div>
                                                                                                                                                                                                           <div class="record-player">${r.player}</div>
                                                                                                                                                                                                                 </div>
                                                                                                                                                                                                                       <div class="record-percent">${r.percent}</div>
                                                                                                                                                                                                                           </div>
                                                                                                                                                                                                                             `).join("");
                                                                                                                                                                                                                             }

                                                                                                                                                                                                                             function openProfile(name) {
                                                                                                                                                                                                                               const p = players.find(x => x.name === name);
                                                                                                                                                                                                                                 if (!p) return;

                                                                                                                                                                                                                                   const rank = [...players]
                                                                                                                                                                                                                                       .sort((a,b)=>b.points-a.points)
                                                                                                                                                                                                                                           .findIndex(x=>x.name===p.name)+1;

                                                                                                                                                                                                                                             profile.innerHTML = `
                                                                                                                                                                                                                                                 <div class="eyebrow">PLAYER PROFILE</div>
                                                                                                                                                                                                                                                     <div class="profile-name">${p.name}</div>
                                                                                                                                                                                                                                                         <div class="profile-rank">GLOBAL RANK #${rank}</div>

                                                                                                                                                                                                                                                             <div style="margin-top:25px">
                                                                                                                                                                                                                                                                   <div class="profile-stat">
                                                                                                                                                                                                                                                                           <span>Points</span>
                                                                                                                                                                                                                                                                                   <strong>${p.points.toLocaleString()}</strong>
                                                                                                                                                                                                                                                                                         </div>
                                                                                                                                                                                                                                                                                               <div class="profile-stat">
                                                                                                                                                                                                                                                                                                       <span>Hardest</span>
                                                                                                                                                                                                                                                                                                               <strong class="hardest">${p.hardest}</strong>
                                                                                                                                                                                                                                                                                                                     </div>
                                                                                                                                                                                                                                                                                                                           <div class="profile-stat">
                                                                                                                                                                                                                                                                                                                                   <span>Records</span>
                                                                                                                                                                                                                                                                                                                                           <strong>${p.records}</strong>
                                                                                                                                                                                                                                                                                                                                                 </div>
                                                                                                                                                                                                                                                                                                                                                     </div>
                                                                                                                                                                                                                                                                                                                                                       `;

                                                                                                                                                                                                                                                                                                                                                         modal.classList.add("show");
                                                                                                                                                                                                                                                                                                                                                         }

                                                                                                                                                                                                                                                                                                                                                         document.getElementById("closeModal").onclick = () => {
                                                                                                                                                                                                                                                                                                                                                           modal.classList.remove("show");
                                                                                                                                                                                                                                                                                                                                                           };

                                                                                                                                                                                                                                                                                                                                                           modal.addEventListener("click", e => {
                                                                                                                                                                                                                                                                                                                                                             if (e.target === modal) modal.classList.remove("show");
                                                                                                                                                                                                                                                                                                                                                             });

                                                                                                                                                                                                                                                                                                                                                             search.addEventListener("input", renderTable);
                                                                                                                                                                                                                                                                                                                                                             sort.addEventListener("change", renderTable);

                                                                                                                                                                                                                                                                                                                                                             renderPodium();
                                                                                                                                                                                                                                                                                                                                                             renderTable();
                                                                                                                                                                                                                                                                                                                                                             renderRecords();
]
