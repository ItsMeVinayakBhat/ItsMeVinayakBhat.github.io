(() => {
  "use strict";

  const savedTheme = localStorage.getItem("vb-theme");
  if (savedTheme === "light") document.body.classList.add("light");

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.body.classList.toggle("light");
      localStorage.setItem(
        "vb-theme",
        document.body.classList.contains("light") ? "light" : "dark"
      );
    });
  });

  const punchlines = [
    "Focused on turning complex systems into clean architecture and actionable analytics.",
    "Backend engineering, anomaly detection, and storage optimization — driven by real impact.",
    "Designing APIs, working with data, mentoring engineers, and building reliable systems.",
    "Shipping features and clarity in equal measure across every project.",
  ];

  const missions = [
    { title: "Storage optimization", text: "Optimizing data flows, compressing records, and reducing infrastructure costs through better design." },
    { title: "Anomaly detection", text: "Identifying meaningful signals in noisy systems using ML-backed analysis and time-series models." },
    { title: "API architecture", text: "Designing well-documented interfaces that are intuitive, durable, and easy to integrate with." },
    { title: "Mentoring", text: "Helping engineers grow their technical depth through hands-on collaboration and knowledge sharing." },
  ];

  const forecasts = [
    { title: "Current focus", text: "Backend system design, data compression strategies, and building analytics capabilities for better observability." },
    { title: "Technical outlook", text: "Deep work on system architecture paired with practical AI and analytics exploration across projects." },
    { title: "Engineering priorities", text: "API reliability, performance improvements, and data-driven decision making across the stack." },
    { title: "Growth areas", text: "Analytical thinking, thoughtful trade-off evaluation, and continued investment in mentoring and team development." },
  ];

  const funFacts = [
    "Started his career at ISRO, modeling cyclones and tornadoes for satellite-related testing.",
    "Led a compression effort at Salesforce that reduced storage consumption by 70 percent.",
    "Has built analytics tooling, anomaly detection systems, and data visualization pipelines across multiple organizations.",
    "Outside of work, enjoys trekking and biking — a good counterbalance to deep technical work.",
  ];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const rotatingLine = document.querySelector("[data-rotating-line]");
  if (rotatingLine) {
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % punchlines.length;
      rotatingLine.textContent = punchlines[idx];
    }, 8000);
  }

  const missionTitle  = document.querySelector("[data-mission-title]");
  const missionText   = document.querySelector("[data-mission-text]");
  const missionButton = document.querySelector("[data-mission-button]");

  if (missionButton && missionTitle && missionText) {
    missionButton.addEventListener("click", () => {
      const m = pick(missions);
      missionTitle.textContent = m.title;
      missionText.textContent  = m.text;
    });
  }

  const factTitle  = document.querySelector("[data-fact-title]");
  const factText   = document.querySelector("[data-fact-text]");
  const factButton = document.querySelector("[data-fact-button]");

  if (factButton && factTitle && factText) {
    factButton.addEventListener("click", () => {
      const f = pick(forecasts);
      factTitle.textContent = f.title;
      factText.textContent  = f.text;
    });
  }

  const surpriseButton = document.querySelector("[data-surprise-button]");

  if (surpriseButton && factTitle && factText) {
    surpriseButton.addEventListener("click", () => {
      factTitle.textContent = "Did you know?";
      factText.textContent  = pick(funFacts);
      document.querySelector("[data-fun-panel]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  document.querySelectorAll("[data-counter]").forEach((el) => {
    const target   = Number(el.dataset.counter);
    const decimals = target % 1 !== 0 ? 1 : 0;

    const animate = () => {
      const duration = 1200;
      const start    = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { animate(); obs.unobserve(e.target); }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
  });

  document.querySelectorAll(".timeline-item").forEach((item) => {
    const toggle = () => {
      item.classList.toggle("open");
      item.setAttribute("aria-expanded", item.classList.contains("open") ? "true" : "false");
    };
    item.addEventListener("click", toggle);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
    });
  });

  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const chips = group.querySelectorAll("[data-filter]");
    const groupId = group.dataset.filterGroup;
    const items = document.querySelectorAll(`[data-filter-item="${groupId}"]`);

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        const filter = chip.dataset.filter;
        items.forEach((item) => {
          const tags = (item.dataset.tags || "").split(" ");
          item.classList.toggle("hidden", filter !== "all" && !tags.includes(filter));
        });
      });
    });
  });

  const copyButton = document.querySelector("[data-copy-bio]");
  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const pitch =
        "Vinayak Bhat is a Lead Engineer at Salesforce specializing in backend systems, analytics, and AI-powered solutions.";
      try {
        await navigator.clipboard.writeText(pitch);
        copyButton.textContent = "Bio copied";
        setTimeout(() => { copyButton.textContent = "Copy one-line bio"; }, 1400);
      } catch {
        alert(pitch);
      }
    });
  }
})();
