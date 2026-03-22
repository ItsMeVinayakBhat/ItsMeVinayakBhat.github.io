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
    "Currently converting complicated systems into calm architecture and suspiciously good charts.",
    "Equal parts backend engineer, anomaly hunter, and enemy of unnecessary storage costs.",
    "Builds APIs, tames data, mentors humans, and occasionally touches grass on treks.",
    "Some engineers ship features. Some ship clarity. The fun ones try to ship both.",
  ];

  const missions = [
    { title: "Storage whisperer mode", text: "Optimizing data flows, compressing complexity, and making infra bills slightly less dramatic." },
    { title: "Anomaly detective mode", text: "Looking for signals in noisy systems while side-eyeing dashboards that clearly know something." },
    { title: "API architect mode", text: "Designing interfaces that make sense on the first read, which should not be a radical concept." },
    { title: "Mentor mode", text: "Helping newer engineers level up without making the conversation feel like an oral exam." },
  ];

  const forecasts = [
    { title: "Today's Vinayak forecast", text: "High chance of solving a backend problem, medium chance of improving architecture, low chance of leaving a TODO unresolved." },
    { title: "Career climate update", text: "Patchy clouds of complexity with strong bursts of system design. Visibility remains excellent near elegant abstractions." },
    { title: "Engineering horoscope", text: "The APIs are aligned, the metrics are favorable, and a performance bottleneck should be nervous." },
    { title: "Operational reading", text: "Today favors analytical thinking, thoughtful trade-offs, and politely refusing bad ideas with data." },
  ];

  const funFacts = [
    "Fun fact: starting at ISRO is a wildly unfair advantage for making a career sound cinematic.",
    "Fun fact: reducing storage by 70 percent is what resumes look like after they discover efficiency.",
    "Fun fact: if a chart became useful under pressure, there is a non-zero chance Vinayak was involved.",
    "Fun fact: trekking exists so distributed systems do not become the only mountains in life.",
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
      factTitle.textContent = "Random fun fact";
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
        "Vinayak Bhat is a Senior Engineer who builds backend systems, analytics features, and practical AI-powered solutions without the buzzword overload.";
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
