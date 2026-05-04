import { useEffect, useRef, useState } from "react";

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }

  /* ════ HERO ════ */
  .ab-hero {
    position: relative;
    height: 520px;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    border-radius: 20px;
    margin: 16px;
  }
  .ab-hero__bg {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center 35%;
  }
  .ab-hero__overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      90deg,
      rgba(8,24,52,0.82) 0%,
      rgba(8,24,52,0.5) 45%,
      rgba(8,24,52,0.08) 100%
    );
  }
  .ab-hero__text {
    position: relative; z-index: 2;
    padding: 0 72px 60px;
    max-width: 620px;
  }
  .ab-label {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 12px;
    display: block;
  }

  /* ════ INTRO ════ */
  .ab-intro {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 72px;
    align-items: center;
    max-width: 1140px;
    margin: 0 auto;
    padding: 96px 60px;
  }
  .ab-intro__img-wrap { position: relative; height: 480px; }
  .ab-intro__img-bg {
    position: absolute;
    top: 28px; left: -20px;
    width: 52%; height: 58%;
    border-radius: 22px;
    background: linear-gradient(135deg, #c4d9f0 0%, #d8ecff 100%);
    z-index: 1;
  }
  .ab-intro__img-frame {
    position: absolute;
    right: 0; bottom: 0;
    width: 87%; height: 91%;
    border-radius: 22px;
    overflow: hidden;
    box-shadow: 0 28px 72px rgba(8,24,52,0.22);
    z-index: 2;
  }
  .ab-intro__img-frame img { width: 100%; height: 100%; object-fit: cover; }
  .ab-intro__badge {
    position: absolute;
    bottom: 36px; left: -10px; z-index: 3;
    background: white;
    border-radius: 14px;
    padding: 12px 18px;
    box-shadow: 0 10px 36px rgba(8,24,52,0.16);
    display: flex; align-items: center; gap: 10px;
  }

  /* ════ STATS BAR ════ */
  .ab-stats {
    background: var(--blue-dark);
    padding: 52px 60px;
  }
  .ab-stats__inner {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    max-width: 1140px;
    margin: 0 auto;
    text-align: center;
  }
  .ab-stats__num {
    font-family: "Playfair Display", serif;
    font-size: clamp(32px, 3.5vw, 48px);
    font-weight: 900;
    color: white;
    line-height: 1;
    margin-bottom: 8px;
  }
  .ab-stats__lbl {
    font-size: 12.5px;
    color: rgba(160,200,255,0.82);
    letter-spacing: 0.03em;
  }

  /* ════ INNOVATION GRID — 2x2 equal ════ */
  .ab-inno {
    padding: 80px 60px;
    background: white;
  }
  .ab-inno__inner { max-width: 1140px; margin: 0 auto; }
  .ab-inno__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 300px 300px;
    gap: 16px;
    margin-top: 44px;
  }
  .ab-card {
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    background: #eef4ff;
  }
  .ab-card img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    display: block;
  }
  .ab-card:hover img { transform: scale(1.04); }
  .ab-card__overlay {
    position: absolute; inset: 0;
    background: linear-gradient(0deg, rgba(8,24,52,0.78) 0%, transparent 55%);
    display: flex; flex-direction: column;
    justify-content: flex-end;
    padding: 24px 26px;
  }
  /* Top-left card: light bg, text at bottom-left, no dark overlay */
  .ab-card--light {
    background: #eef5ff;
  }
  .ab-card--light .ab-card__overlay {
    background: linear-gradient(0deg, rgba(230,242,255,0.95) 0%, rgba(230,242,255,0.2) 50%, transparent 100%);
  }

  /* ════ SPECTRUM — accordion style ════ */
  .ab-spectrum {
    background: #f0f6ff;
    padding: 80px 60px;
  }
  .ab-spectrum__inner {
    max-width: 1140px; margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
  .ab-spectrum__accordion {
    display: flex; flex-direction: column; gap: 12px;
  }
  .ab-spectrum__acc-item {
    border-radius: 14px;
    background: #dceeff;
    overflow: hidden;
    transition: background 0.2s;
  }
  .ab-spectrum__acc-item.open {
    background: #dceeff;
  }
  .ab-spectrum__acc-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 20px;
    cursor: pointer;
    font-size: 15px; font-weight: 700;
    color: var(--blue-dark);
    font-family: inherit;
    border: none; background: none; width: 100%; text-align: left;
  }
  .ab-spectrum__acc-icon {
    width: 32px; height: 32px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 400; flex-shrink: 0;
    color: white;
  }
  .ab-spectrum__acc-icon.minus { background: var(--blue-dark); }
  .ab-spectrum__acc-icon.plus { background: var(--blue-accent); }
  .ab-spectrum__acc-body {
    padding: 0 20px 18px;
    background: #eef7ff;
    border-radius: 0 0 14px 14px;
  }
  .ab-spectrum__bullet {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 13.5px; color: var(--text-mid);
    margin-bottom: 8px; line-height: 1.55;
    padding: 4px 0;
  }
  .drop-bullet {
    width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px;
  }

  /* ════ MACHINE — full-width dark rounded banner ════ */
  .ab-machine {
    padding: 40px 24px;
    background: white;
  }
  .ab-machine__banner {
    background: #0a2a6e;
    border-radius: 24px;
    position: relative;
    overflow: hidden;
    padding: 72px 72px;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
    border: 1.5px solid rgba(100,160,255,0.25);
  }
  .ab-machine__globe-bg {
    position: absolute;
    right: -80px; top: 50%;
    transform: translateY(-50%);
    width: 620px; height: 620px;
    opacity: 0.12; pointer-events: none;
  }

  /* ════ STEPS — fold/snap/squeeze ════ */
  .ab-steps {
    background: #f5f8ff;
    padding: 80px 60px;
  }
  .ab-steps__inner { max-width: 900px; margin: 0 auto; text-align: center; }
  .ab-steps__row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    margin-top: 56px;
  }
  .ab-step {
    display: flex; flex-direction: column; align-items: center; gap: 18px;
    width: 200px;
  }
  .ab-step__icon-wrap {
    width: 140px; height: 140px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 24px;
  }
  .ab-step__icon-wrap--active {
    background: linear-gradient(135deg, #1a4aaa 0%, #1e7ce8 100%);
    box-shadow: 0 12px 40px rgba(30,124,232,0.35);
  }
  .ab-step__label {
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--blue-dark);
  }
  .ab-step__label--active { color: var(--blue-accent); }

  /* ════ QUALITY ════ */
  .ab-quality {
    background: white;
    padding: 60px 24px;
  }
  .ab-quality__inner {
    max-width: 1200px; margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 8px 60px rgba(10,37,64,0.12);
    background: white;
    min-height: 440px;
  }
  .ab-quality__img {
    position: relative; overflow: hidden;
  }
  .ab-quality__img img {
    width: 100%; height: 100%; object-fit: cover; object-position: top center;
  }
  .ab-quality__text { padding: 52px 52px; }
  .ab-quality__tabs {
    display: flex; gap: 10px;
    margin-bottom: 28px;
    flex-wrap: wrap;
  }
  .ab-quality__tab {
    font-size: 13px; font-weight: 600;
    padding: 12px 22px; border-radius: 50px;
    cursor: pointer; border: 1.5px solid;
    font-family: inherit; transition: all 0.2s;
    white-space: nowrap;
  }
  .ab-quality__tab.active {
    background: var(--blue-dark); color: white; border-color: var(--blue-dark);
  }
  .ab-quality__tab:not(.active) {
    background: white; color: var(--blue-dark); border-color: rgba(26,58,92,0.25);
  }
  .ab-quality__logos {
    display: flex; gap: 32px; align-items: center; margin-top: 28px;
    flex-wrap: wrap;
  }
  .ab-quality__logo-item {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
  }
  .ab-quality__logo-img {
    height: 52px; width: auto; object-fit: contain;
  }
  .ab-quality__logo-lbl {
    font-size: 11px; color: var(--text-light); font-weight: 500;
  }
  .ab-quality__divider {
    width: 1px; height: 60px; background: rgba(26,58,92,0.15);
  }

  /* ════ SOLUTIONS ════ */
  .ab-solutions {
    background: white;
    padding: 80px 60px;
  }
  .ab-solutions__inner {
    max-width: 1140px; margin: 0 auto;
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 60px;
    align-items: center;
  }
  .ab-solutions__row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .ab-sol-card {
    border-radius: 18px;
    overflow: hidden;
    position: relative;
    height: 260px;
    cursor: pointer;
  }
  .ab-sol-card img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.45s ease;
  }
  .ab-sol-card:hover img { transform: scale(1.06); }
  .ab-sol-card__label {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 16px 18px;
    background: linear-gradient(0, rgba(8,24,52,0.85), transparent);
    color: white; font-weight: 700; font-size: 14px;
    border-radius: 0 0 18px 18px;
    line-height: 1.3;
  }
  .ab-sol-card__badge {
    position: absolute; top: 14px; right: 14px;
    background: white; border-radius: 8px;
    padding: 5px 11px; font-size: 11px;
    font-weight: 700; color: var(--blue-dark);
  }

  /* ════ CTA — rounded banner ════ */
  .ab-cta {
    padding: 40px 24px 60px;
    background: white;
  }
  .ab-cta__banner {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 360px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
  .ab-cta__bg {
    position: absolute; inset: 0;
    width: 100%; height: 100%; object-fit: cover; object-position: center;
  }
  .ab-cta__overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      90deg,
      rgba(255,255,255,0.97) 0%,
      rgba(255,255,255,0.92) 35%,
      rgba(255,255,255,0.3) 65%,
      rgba(255,255,255,0.05) 100%
    );
  }
  .ab-cta__text {
    position: relative; z-index: 2;
    padding: 60px 64px;
  }

  /* ════ REVEAL ════ */
  .rv {
    opacity: 0; transform: translateY(32px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .rv.vis { opacity: 1; transform: translateY(0); }

  /* ════ RESPONSIVE ════ */
  @media (max-width: 960px) {
    .ab-hero { margin: 10px; height: 400px; }
    .ab-intro { grid-template-columns: 1fr; gap: 40px; padding: 64px 40px; }
    .ab-intro__img-wrap { height: 340px; }
    .ab-stats__inner { grid-template-columns: repeat(2,1fr); }
    .ab-inno__grid { grid-template-rows: 240px 240px; }
    .ab-machine__banner { grid-template-columns: 1fr; padding: 48px 40px; }
    .ab-spectrum__inner { grid-template-columns: 1fr; gap: 36px; }
    .ab-quality__inner { grid-template-columns: 1fr; }
    .ab-quality__img { min-height: 280px; }
    .ab-solutions__inner { grid-template-columns: 1fr; gap: 32px; }
    .ab-solutions__row { grid-template-columns: 1fr 1fr; }
    .ab-cta__banner { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .ab-hero { height: 340px; border-radius: 14px; margin: 8px; }
    .ab-hero__text { padding: 0 24px 36px; }
    .ab-intro { padding: 48px 20px; }
    .ab-stats { padding: 40px 24px; }
    .ab-inno { padding: 60px 20px; }
    .ab-inno__grid { grid-template-columns: 1fr; grid-template-rows: auto; }
    .ab-inno__grid .ab-card { height: 240px; }
    .ab-spectrum { padding: 60px 20px; }
    .ab-machine { padding: 20px 12px; }
    .ab-machine__banner { padding: 40px 24px; border-radius: 18px; }
    .ab-steps { padding: 60px 20px; }
    .ab-steps__row { flex-wrap: wrap; gap: 24px; }
    .ab-quality { padding: 40px 16px; }
    .ab-solutions { padding: 60px 20px; }
    .ab-solutions__row { grid-template-columns: 1fr; }
    .ab-cta { padding: 20px 12px 40px; }
    .ab-cta__text { padding: 48px 28px; }
  }
`;

const stats = [
  { num: "2018", label: "Founded in Bologna, Italy" },
  { num: "60+", label: "Global Patents Secured" },
  { num: "30+", label: "Countries Reached" },
  { num: "100%", label: "Recyclable Material" },
];

const solutionCards = [
  { src: "/about/card5.jpg", label: "Patented Packaging Format", badge: "PATENTED" },
  { src: "/about/card6.png", label: "Innovative Technology", badge: "Tech" },
  { src: "/about/card7.jpg", label: "Sustainable Design", badge: "Eco" },
];

/* ─── Drop SVG bullet ─── */
const DropBullet = () => (
  <svg className="drop-bullet" viewBox="0 0 18 18" fill="none">
    <path d="M9 2 C9 2 3 8 3 12 C3 15.3 5.7 17 9 17 C12.3 17 15 15.3 15 12 C15 8 9 2 9 2Z"
      fill="url(#dropGrad)" />
    <defs>
      <linearGradient id="dropGrad" x1="9" y1="2" x2="9" y2="17" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4da8ff"/>
        <stop offset="100%" stopColor="#1a4aaa"/>
      </linearGradient>
    </defs>
  </svg>
);

/* ─── Fold SVG (hand folding packet) ─── */
const FoldSVG = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    <path d="M20 65 Q30 50 45 55 Q55 58 60 45 Q65 32 75 30" stroke="#1a3a5c" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M20 65 Q35 72 55 68 Q70 64 75 30" stroke="#1a3a5c" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M35 78 Q50 85 65 80" stroke="#1a3a5c" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M18 60 Q10 65 8 75 Q7 80 12 82 Q18 84 22 80" stroke="#1a3a5c" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M22 80 Q25 83 30 82 Q36 80 38 75 Q40 68 35 65" stroke="#1a3a5c" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M75 30 Q80 22 78 18 Q76 14 72 15" stroke="#1a3a5c" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);

/* ─── Snap SVG (hand snapping) ─── */
const SnapSVG = ({ light }) => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    <path d="M15 35 Q30 20 50 25 Q65 28 75 20" stroke={light?"white":"#1a3a5c"} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M15 35 Q20 50 35 55 Q50 60 55 75" stroke={light?"white":"#1a3a5c"} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M75 20 Q85 30 80 45 Q75 55 55 75" stroke={light?"white":"#1a3a5c"} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M35 55 Q45 52 50 45 Q55 38 65 40" stroke={light?"white":"#1a3a5c"} strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M42 78 Q42 85 48 87 Q54 87 56 82" stroke={light?"white":"#1a3a5c"} strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M38 75 Q35 82 38 86" stroke={light?"white":"#1a3a5c"} strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M58 75 Q62 82 60 86" stroke={light?"white":"#1a3a5c"} strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);

/* ─── Squeeze SVG (squeeze drop falling) ─── */
const SqueezeSVG = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    <path d="M30 20 Q30 45 50 62 Q70 45 70 20" stroke="#1a3a5c" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M22 28 Q15 35 18 45 Q20 50 28 48" stroke="#1a3a5c" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M78 28 Q85 35 82 45 Q80 50 72 48" stroke="#1a3a5c" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M50 62 Q50 70 50 74" stroke="#1a3a5c" strokeWidth="2" strokeLinecap="round"/>
    <path d="M50 74 C50 74 44 79 44 83 C44 86.3 46.7 88 50 88 C53.3 88 56 86.3 56 83 C56 79 50 74 50 74Z" fill="#1e7ce8" opacity="0.8"/>
    <path d="M38 82 Q35 88 38 91" stroke="#1e7ce8" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
    <path d="M62 82 Q65 88 62 91" stroke="#1e7ce8" strokeWidth="1.8" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

export default function About() {
  const initialized = useRef(false);
  const [openTab, setOpenTab] = useState(0);
  const [qualityTab, setQualityTab] = useState(0);

  const spectrumData = [
    {
      label: "For Brands & Manufacturers",
      bullets: [
        "Premium interaction by design",
        "Flexible formats across applications",
        "Production-ready at scale",
        "Globally patented technology",
        "Supports sustainability targets",
      ],
    },
    {
      label: "For Consumers",
      bullets: [
        "One-hand opening, zero mess",
        "Intuitive for all ages and abilities",
        "Precise single-serve dosing",
        "No scissors, teeth, or two hands needed",
        "Hygienic and easy on the go",
      ],
    },
  ];

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const id = "about-css-v3";
      if (!document.getElementById(id)) {
        const tag = document.createElement("style");
        tag.id = id;
        tag.textContent = CSS;
        document.head.appendChild(tag);
      }
    }
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ══ 1. HERO ══ */}
      <section className="ab-hero">
        <img src="/about/building.jpg" alt="V-Shapes HQ" className="ab-hero__bg" />
        <div className="ab-hero__overlay" />
        <div className="ab-hero__text">
          <span className="ab-label" style={{ color: "rgba(160,205,255,0.9)" }}>About V-Shapes</span>
          <h1 style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(28px,4.5vw,56px)",
            fontWeight: 900, color: "white", lineHeight: 1.08, marginBottom: 14,
          }}>
            A New Platform for<br />
            <em style={{ fontStyle: "normal", color: "#7ec8ff" }}>Modern Packaging</em>
          </h1>
          <p style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "rgba(200,225,255,0.88)", lineHeight: 1.75, maxWidth: 440 }}>
            Envisioned in Bologna, Italy, V-Shapes is a patented packaging company founded in 2018
            that redefines single-serve through smarter, more inclusive, one-hand-opening designs
            made for modern, on-the-go use.
          </p>
        </div>
      </section>

      {/* ══ 2. INTRO ══ */}
      <div style={{ background: "white", overflow: "hidden" }}>
        <div className="ab-intro">
          <div className="ab-intro__img-wrap rv">
            <div className="ab-intro__img-bg" />
            <div className="ab-intro__img-frame">
              <img src="/about/About.jpg" alt="V-Shapes team" />
            </div>
            <div className="ab-intro__badge">
              <img src="/about/verified.png" alt="" style={{ width: 32, height: 32, objectFit: "contain" }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--blue-dark)", letterSpacing: "0.06em" }}>GLOBALLY PATENTED</div>
                <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 2 }}>60+ Patents Worldwide</div>
              </div>
            </div>
          </div>
          <div className="rv" style={{ transitionDelay: "0.15s" }}>
            <span className="ab-label" style={{ color: "var(--blue-accent)" }}>Our Story</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(24px,3vw,42px)", fontWeight: 900, color: "var(--blue-dark)", lineHeight: 1.15, marginBottom: 18 }}>
              Innovation Designed<br />for Real-World Use
            </h2>
            <p style={{ fontSize: "clamp(13px,1.3vw,15px)", color: "var(--text-mid)", lineHeight: 1.85, marginBottom: 18 }}>
              V-Shapes was born from a simple frustration: opening single-serve packaging shouldn't require
              two hands, teeth, or scissors. Our founders set out to reimagine the sachet entirely —
              combining Italian engineering precision with patented snap technology to create a format
              that is genuinely effortless.
            </p>
            <p style={{ fontSize: "clamp(13px,1.3vw,15px)", color: "var(--text-mid)", lineHeight: 1.85, marginBottom: 32 }}>
              Today, V-Shapes serves brands across food & beverage, personal care, pharma, and more —
              offering a packaging platform that elevates the consumer experience while supporting
              sustainability goals at scale.
            </p>
            <button className="btn-sample">Request for Sample</button>
          </div>
        </div>
      </div>

      {/* ══ 3. STATS ══ */}
      <div className="ab-stats">
        <div className="ab-stats__inner">
          {stats.map((s, i) => (
            <div key={i} className="rv" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="ab-stats__num">{s.num}</div>
              <div className="ab-stats__lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ 4. INNOVATION GRID — 2x2 ══ */}
      <section className="ab-inno">
        <div className="ab-inno__inner">
          <div className="rv">
            <span className="ab-label" style={{ color: "var(--blue-accent)" }}>How It Works</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(22px,3vw,40px)", fontWeight: 900, color: "var(--blue-dark)", lineHeight: 1.15 }}>
              Innovation Designed<br />
              <em style={{ fontStyle: "normal", color: "var(--blue-accent)" }}>for Real-World Use</em>
            </h2>
          </div>

          <div className="ab-inno__grid">
            {/* Top-left: light bg card */}
            <div className="ab-card ab-card--light rv" style={{ transitionDelay: "0.06s" }}>
              <img src="/about/card1.png" alt="Intuitive One-Hand Use" />
              <div className="ab-card__overlay">
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 20, color: "var(--blue-dark)", fontWeight: 800, margin: "0 0 4px" }}>
                  Intuitive One-Hand Use
                </h3>
                <p style={{ fontSize: 12.5, color: "var(--text-mid)", margin: 0, lineHeight: 1.4 }}>
                  Fold. Snap. Squeeze. Three natural motions, zero fuss.
                </p>
              </div>
            </div>

            {/* Top-right */}
            <div className="ab-card rv" style={{ transitionDelay: "0.12s" }}>
              <img src="/about/card2.png" alt="Inclusive by Design" />
              <div className="ab-card__overlay">
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 18, color: "white", fontWeight: 700, margin: "0 0 5px" }}>Inclusive by Design</h3>
                <p style={{ fontSize: 12.5, color: "rgba(200,225,255,0.85)", margin: 0, lineHeight: 1.4 }}>For users of all ages and abilities</p>
              </div>
            </div>

            {/* Bottom-left */}
            <div className="ab-card rv" style={{ transitionDelay: "0.18s" }}>
              <img src="/about/card3.jpg" alt="Premium by Experience" />
              <div className="ab-card__overlay">
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 18, color: "white", fontWeight: 700, margin: "0 0 5px" }}>Premium by Experience</h3>
                <p style={{ fontSize: 12.5, color: "rgba(200,225,255,0.85)", margin: 0, lineHeight: 1.4 }}>Tactile, refined, and brand-elevating</p>
              </div>
            </div>

            {/* Bottom-right */}
            <div className="ab-card rv" style={{ transitionDelay: "0.24s" }}>
              <img src="/about/card4.jpg" alt="Convenient to Use" style={{ objectPosition: "center 40%" }} />
              <div className="ab-card__overlay">
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 18, color: "white", fontWeight: 700, margin: "0 0 5px" }}>Convenient to Use</h3>
                <p style={{ fontSize: 12.5, color: "rgba(200,225,255,0.85)", margin: 0, lineHeight: 1.4 }}>
                  Single-serve precision. No mess, no waste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. WORKS ACROSS THE SPECTRUM — accordion ══ */}
      <section className="ab-spectrum">
        <div className="ab-spectrum__inner rv">
          {/* Left */}
          <div>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, color: "var(--blue-dark)", lineHeight: 1.1, marginBottom: 32 }}>
              Works Across<br />
              <em style={{ fontStyle: "normal", color: "var(--blue-accent)" }}>The Spectrum</em>
            </h2>
            <div style={{ marginBottom: 28 }}>
              <button className="btn-outline" style={{ fontSize: 12, padding: "11px 26px", letterSpacing: "0.1em" }}>
                REQUEST FOR SAMPLE
              </button>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="ab-spectrum__accordion">
            {spectrumData.map((item, i) => (
              <div key={i} className={`ab-spectrum__acc-item${openTab === i ? " open" : ""}`}>
                <button className="ab-spectrum__acc-header" onClick={() => setOpenTab(openTab === i ? -1 : i)}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "var(--blue-dark)" }}>{item.label}</span>
                  <span className={`ab-spectrum__acc-icon ${openTab === i ? "minus" : "plus"}`}>
                    {openTab === i ? "−" : "+"}
                  </span>
                </button>
                {openTab === i && (
                  <div className="ab-spectrum__acc-body">
                    {item.bullets.map((b) => (
                      <div key={b} className="ab-spectrum__bullet">
                        <DropBullet />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. MACHINE — dark rounded banner ══ */}
      <section className="ab-machine">
        <div className="ab-machine__banner">
          {/* Globe bg */}
          <svg className="ab-machine__globe-bg" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="195" stroke="rgba(100,180,255,0.6)" strokeWidth="1"/>
            <ellipse cx="200" cy="200" rx="100" ry="195" stroke="rgba(100,180,255,0.6)" strokeWidth="1"/>
            <path d="M5 200 Q200 160 395 200" stroke="rgba(100,180,255,0.5)" strokeWidth="1" fill="none"/>
            <path d="M5 200 Q200 240 395 200" stroke="rgba(100,180,255,0.5)" strokeWidth="1" fill="none"/>
            <path d="M30 120 Q200 90 370 120" stroke="rgba(100,180,255,0.4)" strokeWidth="0.8" fill="none"/>
            <path d="M30 280 Q200 310 370 280" stroke="rgba(100,180,255,0.4)" strokeWidth="0.8" fill="none"/>
            <path d="M80 50 Q200 30 320 50" stroke="rgba(100,180,255,0.3)" strokeWidth="0.6" fill="none"/>
            <path d="M80 350 Q200 370 320 350" stroke="rgba(100,180,255,0.3)" strokeWidth="0.6" fill="none"/>
            {[60,120,180,240,300,340].map(a => {
              const r = a * Math.PI / 180;
              return <line key={a} x1="200" y1="200" x2={200 + 195*Math.cos(r)} y2={200 + 195*Math.sin(r)} stroke="rgba(100,180,255,0.25)" strokeWidth="0.6"/>;
            })}
          </svg>

          {/* Left text */}
          <div className="rv">
            <span className="ab-label" style={{ color: "rgba(130,185,255,0.85)" }}>Italian Engineering Excellence</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(24px,3.2vw,44px)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 18 }}>
              Italian Engineering Excellence.<br />
              <em style={{ fontStyle: "normal" }}>Built for Global Production.</em>
            </h2>
            <p style={{ fontSize: "clamp(13px,1.3vw,14.5px)", color: "rgba(180,210,255,0.85)", lineHeight: 1.8, marginBottom: 32, maxWidth: 440 }}>
              International patents and global certifications ensure V-Shapes technologies are protected,
              compliant, and ready for deployment across markets.
            </p>
            <button style={{
              background: "white", color: "var(--blue-dark)", border: "none",
              padding: "13px 28px", borderRadius: 50, fontWeight: 700,
              fontSize: 12, letterSpacing: "0.1em", cursor: "pointer",
              textTransform: "uppercase", fontFamily: "inherit",
            }}>
              DISCOVER OUR MACHINES
            </button>
          </div>

          {/* Right machine image */}
          <div className="rv" style={{ transitionDelay: "0.15s", position: "relative", zIndex: 2 }}>
            <img
              src="/about/machine.png"
              alt="V-Shapes Alpha Machine"
              style={{ width: "100%", objectFit: "contain", filter: "drop-shadow(0 30px 64px rgba(0,60,200,0.6))" }}
            />
          </div>
        </div>
      </section>

      {/* ══ 7. FOLD / SNAP / SQUEEZE ══ */}
      <section className="ab-steps">
        <div className="ab-steps__inner">
          <div className="rv">
            <span className="ab-label" style={{ color: "var(--blue-accent)" }}>Built for a Better Way to Use</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(22px,3vw,38px)", fontWeight: 900, color: "var(--blue-dark)", lineHeight: 1.15 }}>
              A single, intuitive way to open and use.
            </h2>
          </div>

          <div className="ab-steps__row">
            {[
              { label: "FOLD", el: <FoldSVG />, active: false },
              { label: "SNAP", el: <SnapSVG light />, active: true },
              { label: "SQUEEZE", el: <SqueezeSVG />, active: false },
            ].map(({ label, el, active }) => (
              <div key={label} className="ab-step">
                <div className={`ab-step__icon-wrap${active ? " ab-step__icon-wrap--active" : ""}`}>
                  {el}
                </div>
                <span className={`ab-step__label${active ? " ab-step__label--active" : ""}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. QUALITY ══ */}
      <section className="ab-quality">
        <div className="ab-quality__inner rv">
          <div className="ab-quality__img">
            <img src="/about/dr.png" alt="Quality assurance" />
          </div>
          <div className="ab-quality__text">
            <span className="ab-label" style={{ color: "var(--blue-accent)" }}>Standards & Trust</span>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(22px,2.8vw,38px)", fontWeight: 900, color: "var(--blue-dark)", lineHeight: 1.15, marginBottom: 14 }}>
              <em style={{ fontStyle: "normal", color: "var(--blue-accent)" }}>Quality</em> Built Into<br />Every System
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-mid)", lineHeight: 1.8, marginBottom: 24 }}>
              V-Shapes operates in full compliance with leading international quality and certification
              standards, enabling reliable production and global deployment.
            </p>
            <div className="ab-quality__tabs">
              {["Standards & Certifications", "Patents Protecting Our Technology"].map((t, i) => (
                <button key={t} onClick={() => setQualityTab(i)} className={`ab-quality__tab${qualityTab === i ? " active" : ""}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="ab-quality__logos">
              {[
                { src: null, top: "UL", label: "UL Standard", color: "#e62222" },
                { src: null, top: "CSA", label: "CSA Standard", color: "#1a3a5c" },
                { src: null, top: "FDA", label: "FDA Standard", color: "#1e7ce8" },
              ].map((l, i) => (
                <div key={i} className="ab-quality__logo-item">
                  <div style={{
                    width: 64, height: 52, border: `2px solid ${l.color}`,
                    borderRadius: 8, display: "flex", alignItems: "center",
                    justifyContent: "center", fontWeight: 900, fontSize: 16,
                    color: l.color, letterSpacing: "-0.02em",
                  }}>{l.top}</div>
                  <span className="ab-quality__logo-lbl">{l.label}</span>
                </div>
              ))}
              <div className="ab-quality__divider" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9. PACKAGING SOLUTIONS ══ */}
      <section className="ab-solutions">
        <div className="ab-solutions__inner">
          {/* Left: title */}
          <div className="rv">
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 900, color: "var(--blue-dark)", lineHeight: 1.1, marginBottom: 14 }}>
              Our<br />
              <em style={{ fontStyle: "normal", color: "var(--blue-accent)" }}>Packaging<br />Solutions</em>
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-mid)", lineHeight: 1.7, maxWidth: 220 }}>
              A complete packaging platform designed to scale with your brand.
            </p>
          </div>

          {/* Right: 3 cards */}
          <div className="ab-solutions__row">
            {solutionCards.map((c, i) => (
              <div key={i} className="ab-sol-card rv" style={{ transitionDelay: `${i * 0.1}s` }}>
                <img src={c.src} alt={c.label} />
                <div className="ab-sol-card__label">{c.label}</div>
                <div className="ab-sol-card__badge">{c.badge}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 10. CTA — rounded banner ══ */}
      <section className="ab-cta">
        <div className="ab-cta__banner">
          <img src="/about/family.jpg" alt="Build Better" className="ab-cta__bg" />
          <div className="ab-cta__overlay" />
          <div className="ab-cta__text rv">
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(24px,3.5vw,46px)", fontWeight: 900, color: "var(--blue-dark)", lineHeight: 1.1, marginBottom: 28 }}>
              Build Better Packaging<br />
              <em style={{ fontStyle: "normal", color: "var(--blue-accent)" }}>with V-Shapes</em>
            </h2>
            <button style={{
              background: "transparent", color: "var(--blue-dark)",
              border: "1.5px solid var(--blue-dark)", padding: "13px 32px",
              borderRadius: 50, fontWeight: 700, fontSize: 12,
              letterSpacing: "0.1em", cursor: "pointer", textTransform: "uppercase",
              fontFamily: "inherit",
            }}>
              GET IN TOUCH
            </button>
          </div>
          {/* Right half is just the image showing through */}
          <div />
        </div>
      </section>
    </>
  );
}