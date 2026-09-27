/* Moteur du site : lit window.CV (content.js) et construit la page.
   Normalement, tu n'as pas besoin de toucher à ce fichier. */
(() => {
  "use strict";

  const CV = window.CV || {};
  const app = document.getElementById("app");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const params = new URLSearchParams(location.search);
  const pour = (params.get("pour") || "").trim().slice(0, 40);
  const nom = pour || CV.pourParDefaut || "";
  // Remplace {pour} par le prénom ; sans prénom, « Alors {pour}, on se voit ? » devient « Alors, on se voit ? ».
  const t = (s) => (nom ? String(s ?? "").replaceAll("{pour}", nom) : String(s ?? "").replace(/\s*\{pour\}/g, ""));

  /* ---------- Petit helper DOM : h("div", {class: "x"}, enfant1, enfant2) ---------- */
  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else if (k === "style") el.style.cssText = v;
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      el.append(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return el;
  }

  function placeholder(src, icon, label) {
    return h("div", { class: "ph", title: src },
      h("span", { class: "ph-icon" }, icon),
      h("span", { class: "ph-label" }, label),
      h("code", {}, src || "")
    );
  }

  // Image qui se remplace par un joli cadre si le fichier n'existe pas encore.
  function img(src, alt, cls) {
    if (!src) return placeholder("", "📸", "Photo à venir");
    const el = h("img", { src, alt: alt || "", loading: "lazy", decoding: "async", class: cls });
    el.addEventListener("error", () => el.replaceWith(placeholder(src, "📸", "Photo à venir")), { once: true });
    return el;
  }

  function section(id, key, title, ...content) {
    const num = String(++section.n).padStart(2, "0");
    return h("section", { class: `sec sec-${id}`, id },
      h("header", { class: "sec-head reveal" },
        h("span", { class: "sec-num" }, num),
        h("p", { class: "kicker" }, key),
        h("h2", {}, t(title))
      ),
      ...content
    );
  }
  section.n = 0;

  /* ---------- Lecteur audio façon message vocal ---------- */
  const audios = new Set();

  function seeded(str) {
    let x = 0;
    for (const ch of str) x = (x * 31 + ch.charCodeAt(0)) >>> 0;
    return () => ((x = (x * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  }

  function fmt(sec) {
    if (!isFinite(sec)) return "0:00";
    const s = Math.round(sec);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }

  function voice(item, variant = "") {
    const N = 36;
    const rnd = seeded(item.src || item.titre || "x");
    const audio = new Audio();
    audio.preload = "metadata";
    audios.add(audio);

    const icon = h("span", { class: "vp-icon", "aria-hidden": "true" });
    const btn = h("button", { class: "vp-btn", "aria-label": `Écouter : ${item.titre || "vocal"}` }, icon);
    const bars = Array.from({ length: N }, (_, i) => {
      const env = Math.sin((i / (N - 1)) * Math.PI) * 0.55 + 0.35;
      return h("span", { style: `--h:${Math.round((0.25 + rnd() * 0.75) * env * 100)}%` });
    });
    const wave = h("div", { class: "vp-wave", role: "slider", "aria-label": "Position", tabindex: "-1" }, bars);
    const time = h("span", { class: "vp-time" }, "0:00");
    const el = h("div", { class: `vp ${variant}` }, btn, wave, time);

    const paint = () => {
      const p = audio.duration ? audio.currentTime / audio.duration : 0;
      bars.forEach((b, i) => b.classList.toggle("on", i / N < p));
      time.textContent = audio.paused && !audio.currentTime ? fmt(audio.duration) : fmt(audio.currentTime);
    };

    btn.addEventListener("click", () => {
      if (el.classList.contains("missing")) return;
      if (audio.paused) {
        audios.forEach((a) => a !== audio && a.pause());
        audio.play().catch(() => {});
      } else audio.pause();
    });
    wave.addEventListener("click", (e) => {
      if (!audio.duration) return;
      const r = wave.getBoundingClientRect();
      audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
      if (audio.paused) btn.click();
    });
    audio.addEventListener("play", () => el.classList.add("playing"));
    audio.addEventListener("pause", () => el.classList.remove("playing"));
    audio.addEventListener("ended", () => { audio.currentTime = 0; paint(); });
    audio.addEventListener("timeupdate", paint);
    audio.addEventListener("loadedmetadata", paint);
    audio.addEventListener("error", () => {
      el.classList.add("missing");
      time.textContent = "bientôt";
      btn.title = `Fichier manquant : ${item.src}`;
    });
    if (item.src) audio.src = item.src;
    else audio.dispatchEvent(new Event("error"));
    return el;
  }

  /* ================================ SECTIONS ================================ */

  function hero() {
    const H = CV.hero || {};
    const greet = H.salut ? t(H.salut) : pour ? `${pour}, ce dossier est pour toi.` : "";
    const hearts = h("div", { class: "hearts", "aria-hidden": "true" },
      Array.from({ length: 10 }, (_, i) =>
        h("span", { style: `--x:${(i * 37) % 100}%;--d:${6 + (i % 5) * 1.6}s;--delay:${-(i * 1.3)}s;--s:${0.6 + (i % 4) * 0.25}` }, "♥")
      )
    );
    return h("header", { class: "hero" },
      hearts,
      h("div", { class: "hero-inner" },
        h("div", { class: "hero-text" },
          h("p", { class: "eyebrow reveal" }, "Dossier de candidature · n° 001"),
          h("p", { class: "greet reveal" }, greet),
          h("h1", { class: "reveal" }, CV.prenom || ""),
          h("p", { class: "poste reveal" }, "Candidat au poste de ", h("em", {}, t(H.poste))),
          H.accroche && h("p", { class: "accroche reveal" }, t(H.accroche)),
          H.vocal && h("div", { class: "hero-voice reveal" },
            h("p", { class: "hand" }, t(H.vocal.titre || "Écoute ma voix"), " ↓"),
            voice(H.vocal, "vp-light")
          ),
          h("a", { class: "btn reveal", href: "#dossier" }, "Ouvrir le dossier", h("span", { "aria-hidden": "true" }, " →"))
        ),
        h("figure", { class: "polaroid reveal" },
          h("div", { class: "tape", "aria-hidden": "true" }),
          h("div", { class: "polaroid-img" }, img(H.photo, CV.prenom)),
          H.legendePhoto && h("figcaption", { class: "hand" }, t(H.legendePhoto)),
          H.tampon && h("div", { class: "stamp", "aria-hidden": "true" }, t(H.tampon))
        )
      ),
      h("a", { class: "scroll-cue", href: "#dossier", "aria-label": "Faire défiler" }, h("span"))
    );
  }

  function identite() {
    const I = CV.identite;
    if (!I) return null;
    return section("identite", "Identité", I.titre || "Fiche d'identité",
      h("div", { class: "id-card reveal" },
        h("div", { class: "id-photo" }, img(I.photo, CV.prenom)),
        h("div", { class: "id-body" },
          h("p", { class: "id-top" }, h("span", {}, "Carte d'identité amoureuse"), h("span", { class: "id-rf" }, "RF ♥")),
          h("p", { class: "id-name" }, CV.prenom),
          h("dl", { class: "id-fields" },
            (I.champs || []).map((c) => h("div", {}, h("dt", {}, c.label), h("dd", {}, t(c.valeur))))
          ),
          h("p", { class: "id-mrz", "aria-hidden": "true" },
            `IDFRA<<${String(CV.prenom || "").toUpperCase()}<<<<<<CŒUR<<A<<PRENDRE<<<<<`)
        )
      ),
      I.aPropos && h("p", { class: "lead reveal" }, t(I.aPropos)),
      I.passions && h("ul", { class: "chips reveal" }, I.passions.map((p) => h("li", {}, p)))
    );
  }

  function experiences() {
    const E = CV.experiences;
    if (!E?.liste?.length) return null;
    return section("experiences", "Parcours", E.titre || "Expériences",
      h("ol", { class: "timeline" },
        E.liste.map((x) => h("li", { class: "reveal" },
          x.periode && h("p", { class: "tl-date" }, x.periode),
          h("h3", {}, x.poste, x.lieu && h("span", { class: "tl-lieu" }, ` · ${x.lieu}`)),
          x.description && h("p", {}, t(x.description))
        ))
      )
    );
  }

  function competences() {
    const S = CV.competences;
    if (!S?.liste?.length) return null;
    return section("competences", "Savoir-faire", S.titre || "Compétences",
      h("ul", { class: "skills" },
        S.liste.map((s) => {
          const n = Math.max(0, Math.min(100, Number(s.niveau) || 0));
          return h("li", { class: "reveal", style: `--v:${n}%` },
            h("div", { class: "sk-top" }, h("span", {}, s.nom), h("span", { class: "sk-val" }, `${n}%`)),
            h("div", { class: "sk-bar" }, h("span"))
          );
        })
      )
    );
  }

  /* ---------- Galerie + visionneuse ---------- */
  function galerie() {
    const G = CV.galerie;
    if (!G?.medias?.length) return null;
    const items = G.medias.filter((m) => m && m.src);
    const grid = h("div", { class: "gallery" });
    items.forEach((m, i) => {
      const isVid = m.type === "video";
      let media;
      if (isVid) {
        media = h("video", {
          src: m.src + (m.poster ? "" : "#t=0.1"), poster: m.poster || null,
          muted: true, loop: true, playsinline: true, preload: "metadata",
        });
        media.muted = true;
        media.addEventListener("error", () => {
          media.replaceWith(placeholder(m.src, "🎬", "Vidéo à venir"));
          tile.classList.add("is-missing");
        }, { once: true });
      } else {
        media = img(m.src, m.legende);
      }
      const tile = h("button", {
        class: `tile reveal ${isVid ? "is-video" : ""}`,
        style: `--r:${((i * 7) % 5) - 2}deg`,
        "aria-label": m.legende || (isVid ? "Vidéo" : "Photo"),
        onclick: () => !tile.classList.contains("is-missing") && openLightbox(items, i),
      },
        h("div", { class: "tile-media" }, media, isVid && h("span", { class: "play", "aria-hidden": "true" })),
        m.legende && h("span", { class: "tile-cap hand" }, m.legende)
      );
      if (!isVid) tile.querySelector("img")?.addEventListener("error", () => tile.classList.add("is-missing"));
      if (isVid && !reduceMotion) {
        tile.addEventListener("mouseenter", () => media.play?.().catch(() => {}));
        tile.addEventListener("mouseleave", () => media.pause?.());
      }
      grid.append(tile);
    });
    return section("galerie", "Portfolio", G.titre || "Galerie",
      G.intro && h("p", { class: "sec-intro reveal" }, t(G.intro)),
      grid
    );
  }

  const lb = document.querySelector(".lightbox");
  const lbStage = lb.querySelector(".lb-stage");
  let lbItems = [], lbIndex = 0;

  function renderLightbox() {
    const m = lbItems[lbIndex];
    lbStage.replaceChildren(
      m.type === "video"
        ? h("video", { src: m.src, poster: m.poster || null, controls: true, autoplay: true, playsinline: true })
        : h("img", { src: m.src, alt: m.legende || "" }),
      m.legende && h("figcaption", { class: "hand" }, m.legende)
    );
    lb.classList.toggle("single", lbItems.length < 2);
  }
  function openLightbox(items, i) {
    lbItems = items; lbIndex = i;
    audios.forEach((a) => a.pause());
    renderLightbox();
    lb.hidden = false;
    document.body.classList.add("no-scroll");
    lb.querySelector(".lb-close").focus();
  }
  function closeLightbox() {
    lb.hidden = true;
    lbStage.replaceChildren();
    document.body.classList.remove("no-scroll");
  }
  const step = (d) => { lbIndex = (lbIndex + d + lbItems.length) % lbItems.length; renderLightbox(); };
  lb.querySelector(".lb-close").addEventListener("click", closeLightbox);
  lb.querySelector(".lb-prev").addEventListener("click", () => step(-1));
  lb.querySelector(".lb-next").addEventListener("click", () => step(1));
  lb.addEventListener("click", (e) => e.target === lb && closeLightbox());
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  let touchX = null;
  lb.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50 && lbItems.length > 1) step(dx < 0 ? 1 : -1);
    touchX = null;
  });

  function vocaux() {
    const V = CV.vocaux;
    if (!V?.liste?.length) return null;
    return section("vocaux", "À écouter", V.titre || "Vocaux",
      V.intro && h("p", { class: "sec-intro reveal" }, t(V.intro)),
      h("div", { class: "voices" },
        V.liste.map((v) => h("article", { class: "voice-card reveal" },
          h("h3", {}, t(v.titre)),
          v.description && h("p", {}, t(v.description)),
          voice(v)
        ))
      )
    );
  }

  function flags() {
    const F = CV.flags;
    if (!F) return null;
    const col = (cls, title, list, mark) => list?.length && h("div", { class: `flag-col ${cls} reveal` },
      h("h3", {}, h("span", { class: "flag", "aria-hidden": "true" }), title),
      h("ul", {}, list.map((x) => h("li", {}, h("span", { class: "mark", "aria-hidden": "true" }, mark), t(x))))
    );
    return section("flags", "Honnêteté", F.titre || "Qualités & défauts",
      h("div", { class: "flags" },
        col("green", F.qualitesTitre || "Qualités", F.qualites, "✓"),
        col("red", F.defautsTitre || "Défauts", F.defauts, "!")
      )
    );
  }

  function recherche() {
    const R = CV.recherche;
    if (!R) return null;
    const block = (title, list) => list?.length && h("div", { class: "job-block" },
      h("h3", {}, title),
      h("ul", {}, list.map((x) => h("li", {}, t(x))))
    );
    return section("recherche", "Offre", R.titre || "Profil recherché",
      h("article", { class: "job reveal" },
        h("div", { class: "job-head" },
          h("span", { class: "job-badge" }, "Poste ouvert"),
          h("span", {}, "Temps plein · Télétravail possible sur mon canapé")
        ),
        R.intro && h("p", { class: "job-intro" }, t(R.intro)),
        h("div", { class: "job-grid" },
          block("Missions", R.missions),
          block("Avantages du poste", R.avantages)
        )
      )
    );
  }

  /* ---------- Quiz ---------- */
  function quiz() {
    const Q = CV.quiz;
    if (!Q?.questions?.length) return null;
    const box = h("div", { class: "quiz reveal" });
    let answers = [];

    const start = () => {
      answers = [];
      box.replaceChildren(
        h("p", { class: "quiz-intro" }, t(Q.intro)),
        h("button", { class: "btn", onclick: () => ask(0) }, "Commencer le test")
      );
    };

    const ask = (i) => {
      const q = Q.questions[i];
      box.replaceChildren(
        h("div", { class: "quiz-progress" },
          Q.questions.map((_, j) => h("span", { class: j < i ? "done" : j === i ? "cur" : "" }))
        ),
        h("p", { class: "quiz-count" }, `Question ${i + 1} / ${Q.questions.length}`),
        h("h3", { class: "quiz-q" }, t(q.question)),
        h("div", { class: "quiz-answers" },
          q.reponses.map((r, k) => h("button", {
            class: "answer",
            onclick: (e) => {
              answers.push(k);
              e.currentTarget.classList.add("picked");
              setTimeout(() => (i + 1 < Q.questions.length ? ask(i + 1) : result()), reduceMotion ? 0 : 320);
            },
          }, t(r)))
        )
      );
      box.classList.remove("swap"); void box.offsetWidth; box.classList.add("swap");
    };

    const result = () => {
      // Score toujours flatteur (entre 92 et 99 %), mais qui dépend des réponses.
      const score = 92 + (answers.reduce((a, b, i) => a + (b + 1) * (i + 3), 0) % 8);
      const num = h("span", { class: "score-num" }, "0");
      box.replaceChildren(h("p", { class: "quiz-calc" }, "Analyse des résultats", h("span", { class: "dots" })));
      setTimeout(() => {
        box.replaceChildren(
          h("div", { class: "score", style: `--p:${score}` }, h("div", { class: "score-in" }, num, h("small", {}, "%"))),
          h("h3", { class: "quiz-q" }, t(Q.resultat?.titre || "Compatibles !")),
          Q.resultat?.message && h("p", { class: "quiz-intro" }, t(Q.resultat.message)),
          h("div", { class: "quiz-actions" },
            h("a", { class: "btn", href: "#final" }, "Passer à l'étape suivante"),
            h("button", { class: "btn btn-ghost", onclick: start }, "Refaire le test")
          )
        );
        const t0 = performance.now();
        const tick = (now) => {
          const k = Math.min(1, (now - t0) / 1200);
          num.textContent = Math.round(score * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(tick);
        };
        reduceMotion ? (num.textContent = score) : requestAnimationFrame(tick);
        if (score >= 97) burst(60);
      }, reduceMotion ? 0 : 1500);
    };

    start();
    return section("quiz", "Petit test", Q.titre || "Compatibilité", box);
  }

  function temoignages() {
    const T = CV.temoignages;
    if (!T?.liste?.length) return null;
    return section("temoignages", "Références", T.titre || "Recommandations",
      h("div", { class: "quotes" },
        T.liste.map((q, i) => h("figure", { class: "quote reveal", style: `--r:${(i % 2 ? 1 : -1) * 1.2}deg` },
          h("blockquote", {}, t(q.texte)),
          h("figcaption", {}, h("strong", {}, q.auteur), q.role && h("span", {}, q.role))
        ))
      )
    );
  }

  /* ---------- Final : Oui / Non ---------- */
  const ICONS = {
    whatsapp: '<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"/><path d="M8.8 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.4.5c-.1.1-.2.3 0 .5.4.8 1.4 1.8 2.3 2.2.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.4 0 .7-.5 1.5-1.2 1.7-.8.3-2 .2-3.6-.7a8.6 8.6 0 0 1-3-3.1c-.7-1.3-.6-2.4-.3-3.1Z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
    sms: '<path d="M4 5h16v11H9l-5 4V5Z"/><path d="M8 10h8M8 13h5"/>',
    telephone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z"/>',
    email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    lien: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  };
  function icon(type) {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24");
    s.setAttribute("aria-hidden", "true");
    s.innerHTML = ICONS[type] || ICONS.lien;
    return s;
  }

  function final() {
    const F = CV.final;
    if (!F) return null;
    const textes = F.nonTextes || [];
    let tries = 0;

    const reponse = h("div", { class: "reponse", hidden: true },
      h("p", { class: "merci hand" }, t(F.merci)),
      h("div", { class: "contacts" },
        (F.contacts || []).map((c) => h("a", {
          class: `contact contact-${c.type}`, href: c.url,
          target: /^https?:/.test(c.url) ? "_blank" : null, rel: "noopener",
        }, icon(c.type), h("span", {}, c.label)))
      )
    );

    const zone = h("div", { class: "cta-zone" });
    const yes = h("button", { class: "btn btn-yes", onclick: accept }, t(F.boutonOui || "Oui"));
    const no = h("button", { class: "btn btn-no", type: "button" }, t(F.boutonNon || "Non"));
    zone.append(yes, no);

    function accept() {
      zone.hidden = true;
      reponse.hidden = false;
      burst(160);
      reponse.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    }

    function dodge(e) {
      e.preventDefault();
      if (tries >= textes.length) {
        // Le bouton « Non » capitule et devient un deuxième « Oui ».
        no.textContent = "Bon… d'accord, oui 🙈";
        no.className = "btn btn-yes";
        no.style.cssText = "";
        no.removeEventListener("pointerenter", dodge);
        no.removeEventListener("click", dodge);
        no.addEventListener("click", accept);
        return;
      }
      no.textContent = textes[tries++];
      const z = zone.getBoundingClientRect();
      const b = no.getBoundingClientRect();
      const x = Math.random() * Math.max(0, z.width - b.width);
      const y = Math.random() * Math.max(0, z.height - b.height);
      no.classList.add("flying");
      no.style.left = `${x}px`;
      no.style.top = `${y}px`;
      yes.style.transform = `scale(${1 + tries * 0.08})`;
    }
    no.addEventListener("pointerenter", (e) => e.pointerType === "mouse" && dodge(e));
    no.addEventListener("click", dodge);

    return h("section", { class: "final", id: "final" },
      h("div", { class: "final-inner" },
        h("p", { class: "eyebrow reveal" }, "Dernière étape"),
        h("h2", { class: "reveal" }, t(F.titre)),
        F.sousTitre && h("p", { class: "final-sub reveal" }, t(F.sousTitre)),
        zone,
        reponse
      )
    );
  }

  /* ---------- Confettis en forme de cœurs ---------- */
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  let parts = [], raf = 0;
  const COLORS = ["#d6456b", "#f28aa5", "#c9a063", "#ffd3de", "#a8264b"];

  function burst(n) {
    if (reduceMotion) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    for (let i = 0; i < n; i++) {
      parts.push({
        x: innerWidth / 2 + (Math.random() - 0.5) * innerWidth * 0.3,
        y: innerHeight * 0.65,
        vx: (Math.random() - 0.5) * 14, vy: -8 - Math.random() * 12,
        s: 8 + Math.random() * 12, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.2,
        c: COLORS[i % COLORS.length], life: 1,
      });
    }
    if (!raf) raf = requestAnimationFrame(frame);
  }
  function heart(x, y, s) {
    ctx.beginPath();
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(0, 0, -s * 0.5, 0, -s * 0.5, s * 0.3);
    ctx.bezierCurveTo(-s * 0.5, s * 0.6, 0, s * 0.8, 0, s);
    ctx.bezierCurveTo(0, s * 0.8, s * 0.5, s * 0.6, s * 0.5, s * 0.3);
    ctx.bezierCurveTo(s * 0.5, 0, 0, 0, 0, s * 0.3);
    ctx.fill();
  }
  function frame() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter((p) => p.life > 0 && p.y < innerHeight + 40);
    for (const p of parts) {
      p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life -= 0.004;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.c;
      ctx.translate(p.x, p.y); ctx.rotate(p.r);
      heart(0, 0, p.s);
      ctx.restore();
    }
    raf = parts.length ? requestAnimationFrame(frame) : (ctx.clearRect(0, 0, innerWidth, innerHeight), 0);
  }

  /* ================================ MONTAGE ================================ */
  app.append(
    hero(),
    h("div", { id: "dossier", class: "dossier" },
      identite(), experiences(), competences(), galerie(), vocaux(), flags(), recherche(), quiz(), temoignages()
    ),
    final(),
    h("footer", { class: "foot" }, t(CV.piedDePage || ""))
  );
  if (CV.prenom) document.title = `${CV.prenom} · Dossier de candidature 💌`;

  // Apparition au scroll
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.setProperty("--i", i % 6);
    io.observe(el);
  });

  // Barre de progression
  const bar = document.querySelector(".progress span");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
