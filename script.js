document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // PLAYER DATA
  // =========================

  const players = [
    { name: "Сильнейший градусник", points: 1000, hardest: "2160" },
    { name: "Lyuty jNoomimen", points: 1000, hardest: "2160" },
    { name: "Наисильнейший", points: 1000, hardest: "2160" }
  ];

  const elements = [];

  // =========================
  // HELPERS
  // =========================

  const $ = id => document.getElementById(id);

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }

  function show(element) {
    if (element) element.classList.remove("hidden");
  }

  function hide(element) {
    if (element) element.classList.add("hidden");
  }

  // =========================
  // PLAYER RANKING
  // =========================

  function renderPlayers() {
    const table = $("playerTable");
    if (!table) return;

    const search = ($("search")?.value || "").toLowerCase();
    const sort = $("sort")?.value || "rating";

    let list = players.filter(player =>
      player.name.toLowerCase().includes(search)
    );

    if (sort === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => b.points - a.points);
    }

    const rows = list.map((player, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${escapeHTML(player.name)}</td>
        <td>${player.points}</td>
        <td>${escapeHTML(player.hardest)}</td>
      </tr>
    `).join("");

    const emptyRow = `
      <tr>
        <td colspan="4">No players found</td>
      </tr>
    `;

    if (table.tagName === "TABLE") {
      let tbody = table.querySelector("tbody");

      if (!tbody) {
        tbody = document.createElement("tbody");
        table.appendChild(tbody);
      }

      tbody.innerHTML = rows || emptyRow;
    } else {
      table.innerHTML = rows || emptyRow;
    }

    if ($("playerTotal")) {
      $("playerTotal").textContent = players.length;
    }

    renderPodium(list);
  }

  function renderPodium(list) {
    const podium = $("podium");
    if (!podium) return;

    if (!list.length) {
      podium.innerHTML = "";
      return;
    }

    podium.innerHTML = list.slice(0, 3).map((player, index) => `
      <div class="podium-card">
        <div class="podium-place">#${index + 1}</div>
        <h3>${escapeHTML(player.name)}</h3>
        <p>${player.points} points</p>
      </div>
    `).join("");
  }

  $("search")?.addEventListener("input", renderPlayers);
  $("sort")?.addEventListener("change", renderPlayers);

  // =========================
  // ELEMENTS RANKING
  // =========================

  function renderElements() {
    const table = $("elementTable");
    if (!table) return;

    const search = ($("elementSearch")?.value || "").toLowerCase();

    const filtered = elements.filter(element =>
      element.name.toLowerCase().includes(search)
    );

    const rows = filtered.map((element, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${escapeHTML(element.name)}</td>
      </tr>
    `).join("");

    const emptyRow = `
      <tr>
        <td colspan="2">No elements added yet</td>
      </tr>
    `;

    if (table.tagName === "TABLE") {
      let tbody = table.querySelector("tbody");

      if (!tbody) {
        tbody = document.createElement("tbody");
        table.appendChild(tbody);
      }

      tbody.innerHTML = rows || emptyRow;
    } else {
      table.innerHTML = rows || emptyRow;
    }
  }

  $("elementSearch")?.addEventListener("input", renderElements);
  $("elementSort")?.addEventListener("change", renderElements);

  // =========================
  // PAGE NAVIGATION
  // =========================

  function openList(type = "players") {
    hide($("homePage"));
    show($("listPage"));

    if (type === "elements") {
      $("elementsTab")?.click();
    } else {
      $("playerTab")?.click();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    hide($("listPage"));
    show($("homePage"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  $("exploreBtn")?.addEventListener("click", () => {
    openList("players");
  });

  $("backHomeBtn")?.addEventListener("click", goHome);

  // =========================
  // RANKING TABS
  // =========================

  $("playerTab")?.addEventListener("click", () => {
    show($("playersSection"));
    hide($("elementsSection"));

    $("playerTab")?.classList.add("active");
    $("elementsTab")?.classList.remove("active");

    if ($("listPageTitle")) {
      $("listPageTitle").textContent = "Player Ranking";
    }

    renderPlayers();
  });

  $("elementsTab")?.addEventListener("click", () => {
    hide($("playersSection"));
    show($("elementsSection"));

    $("elementsTab")?.classList.add("active");
    $("playerTab")?.classList.remove("active");

    if ($("listPageTitle")) {
      $("listPageTitle").textContent = "Elements Ranking";
    }

    renderElements();
  });

  // =========================
  // SIDE MENU
  // =========================

  const menu = $("sideMenu");
  const overlay = $("menuOverlay");

  function openMenu() {
    menu?.classList.add("open");
    show(overlay);
  }

  function closeMenu() {
    menu?.classList.remove("open");
    hide(overlay);
  }

  $("menuBtn")?.addEventListener("click", openMenu);
  overlay?.addEventListener("click", closeMenu);

  $("listsToggle")?.addEventListener("click", () => {
    $("listsSubmenu")?.classList.toggle("hidden");
  });

  $("languagesToggle")?.addEventListener("click", () => {
    $("languagesSubmenu")?.classList.toggle("hidden");
  });

  $("menuPlayersBtn")?.addEventListener("click", () => {
    closeMenu();
    openList("players");
  });

  $("menuElementsBtn")?.addEventListener("click", () => {
    closeMenu();
    openList("elements");
  });

  // =========================
  // SUBMIT A RECORD FORM
  // =========================

  const authModal = $("authModal");
  const authContent = $("authContent");
  const closeAuthBtn = $("closeAuthBtn");

  function openRecordForm() {
    if (!authModal || !authContent) {
      alert("The form container was not found in index.html.");
      return;
    }

    authContent.innerHTML = `
      <div class="record-form">
        <h2>Submit a record</h2>
        <p class="form-description">
          Submit your completion for review.
        </p>

        <form id="recordSubmissionForm">

          <label for="recordElement">Element</label>
          <input
            id="recordElement"
            name="element"
            type="text"
            placeholder="Start typing to search..."
            required
          >

          <label for="youtubeLink">YouTube</label>
          <input
            id="youtubeLink"
            name="youtube"
            type="url"
            placeholder="https://youtu.be/"
          >

          <label for="tiktokLink">TikTok</label>
          <input
            id="tiktokLink"
            name="tiktok"
            type="url"
            placeholder="https://www.tiktok.com/"
          >

          <label for="recordNotes">Notes or comments
            <span class="optional-label">OPTIONAL</span>
          </label>
          <textarea
            id="recordNotes"
            name="notes"
            placeholder="Your dreams and hopes..."
            rows="5"
          ></textarea>

          <button type="submit" class="submit-record-button">
            Submit record
          </button>

          <p id="recordFormMessage" class="form-message"></p>
        </form>
      </div>
    `;

    show(authModal);
    document.body.style.overflow = "hidden";

    $("recordSubmissionForm")?.addEventListener("submit", event => {
      event.preventDefault();

      const element = $("recordElement").value.trim();
      const youtube = $("youtubeLink").value.trim();
      const tiktok = $("tiktokLink").value.trim();
      const notes = $("recordNotes").value.trim();

      const message = $("recordFormMessage");

      if (!element) {
        message.textContent = "Please enter an element.";
        return;
      }

      if (!youtube && !tiktok) {
        message.textContent = "Please add a YouTube or TikTok link.";
        return;
      }

      const validYouTube =
        !youtube || /^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(youtube);

      const validTikTok =
        !tiktok || /^https:\/\/(www\.)?tiktok\.com\//i.test(tiktok);

      if (!validYouTube || !validTikTok) {
        message.textContent = "Please enter valid YouTube and TikTok links.";
        return;
      }

      const submission = {
        element,
        youtube,
        tiktok,
        notes,
        date: new Date().toISOString()
      };

      try {
        const saved = JSON.parse(
          localStorage.getItem("noomiSubmissions") || "[]"
        );

        saved.push(submission);

        localStorage.setItem(
          "noomiSubmissions",
          JSON.stringify(saved)
        );

        message.textContent =
          "Saved on this device. Online submission is not connected yet.";

        event.target.reset();
      } catch (error) {
        message.textContent =
          "Could not save this submission on this device.";
      }
    });
  }

  $("submitRecordBtn")?.addEventListener("click", openRecordForm);

  // =========================
  // SIGN IN / SIGN UP
  // =========================

  function openAuthForm(type) {
    if (!authModal || !authContent) return;

    const isSignup = type === "signup";

    authContent.innerHTML = `
      <div class="auth-form">
        <h2>${isSignup ? "Create an account" : "Sign in"}</h2>

        <form id="accountForm">
          <label>Email</label>
          <input type="email" placeholder="Your email" required>

          <label>Password</label>
          <input type="password" placeholder="Your password" required>

          <button type="submit">
            ${isSignup ? "Sign up" : "Sign in"}
          </button>

          <p id="accountMessage">
            Account registration is not connected yet.
          </p>
        </form>
      </div>
    `;

    show(authModal);
    document.body.style.overflow = "hidden";

    $("accountForm")?.addEventListener("submit", event => {
      event.preventDefault();
      $("accountMessage").textContent =
        "Online authentication has not been connected yet.";
    });
  }

  $("accountBtn")?.addEventListener("click", () => openAuthForm("signin"));
  $("signInBtn")?.addEventListener("click", () => {
    closeMenu();
    openAuthForm("signin");
  });

  $("signUpBtn")?.addEventListener("click", () => {
    closeMenu();
    openAuthForm("signup");
  });

  // =========================
  // MODAL CLOSE
  // =========================

  function closeModal() {
    hide(authModal);
    document.body.style.overflow = "";
  }

  closeAuthBtn?.addEventListener("click", closeModal);

  authModal?.addEventListener("click", event => {
    if (event.target === authModal) closeModal();
  });

  $("closeProfileBtn")?.addEventListener("click", () => {
    hide($("profileModal"));
  });

  $("profileModal")?.addEventListener("click", event => {
    if (event.target === $("profileModal")) {
      hide($("profileModal"));
    }
  });

  // =========================
  // LANGUAGE BUTTONS
  // =========================

  $("englishBtn")?.addEventListener("click", () => {
    closeMenu();
    alert("English selected.");
  });

  $("russianBtn")?.addEventListener("click", () => {
    closeMenu();
    alert("Русский язык будет добавлен отдельно.");
  });

  // =========================
  // INITIAL RENDER
  // =========================

  renderPlayers();
  renderElements();

  console.log("GLOBAL NOOMIPLAYER LIST loaded successfully.");
});
