import { useEffect, useRef, useState } from "react";

/* ─── helpers ─── */
function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}
function lerp(a, b, t) {
  return a + (b - a) * clamp(t, 0, 1);
}
function range(v, a, b) {
  return clamp((v - a) / (b - a), 0, 1);
}
function eio(t) {
  t = clamp(t, 0, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function eout(t) {
  return 1 - Math.pow(1 - clamp(t, 0, 1), 3);
}
function eoutStrong(t) {
  return 1 - Math.pow(1 - clamp(t, 0, 1), 4);
}

/* ─── SVG Icons ─── */
const IconConvenience = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path
      d="M18 4 L28 10 L28 22 L18 28 L8 22 L8 10 Z"
      stroke="#1a3a5c"
      strokeWidth="1.5"
      fill="none"
    />
    <path d="M18 4 L18 28" stroke="#1a3a5c" strokeWidth="1.5" />
    <path d="M8 10 L28 22" stroke="#1a3a5c" strokeWidth="1.5" />
    <path d="M28 10 L8 22" stroke="#1a3a5c" strokeWidth="1.5" />
  </svg>
);
const IconPremium = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle
      cx="18"
      cy="14"
      r="7"
      stroke="white"
      strokeWidth="1.8"
      fill="none"
    />
    <path
      d="M11 14 L6 28 L18 22 L30 28 L25 14"
      stroke="white"
      strokeWidth="1.8"
      fill="none"
      strokeLinejoin="round"
    />
    <circle
      cx="18"
      cy="14"
      r="3"
      stroke="white"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M14 28 L18 24 L22 28"
      stroke="white"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);
const IconInclusive = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle
      cx="18"
      cy="10"
      r="4"
      stroke="#1a3a5c"
      strokeWidth="1.5"
      fill="none"
    />
    <circle
      cx="8"
      cy="12"
      r="3"
      stroke="#1a3a5c"
      strokeWidth="1.5"
      fill="none"
    />
    <circle
      cx="28"
      cy="12"
      r="3"
      stroke="#1a3a5c"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M10 26 Q18 20 26 26"
      stroke="#1a3a5c"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M4 30 Q8 24 12 26"
      stroke="#1a3a5c"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M32 30 Q28 24 24 26"
      stroke="#1a3a5c"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M13 32 Q18 26 23 32"
      stroke="#1a3a5c"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);
const IconSustainability = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path
      d="M26 10 C26 10 28 18 20 22 C20 22 24 14 16 12 C16 12 20 20 12 26"
      stroke="#1a3a5c"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M8 28 C12 24 16 22 20 22"
      stroke="#1a3a5c"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M6 10 C10 8 16 10 18 16"
      stroke="#1a3a5c"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);
const IconBrand = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path
      d="M18 4 L20 14 L30 14 L22 20 L25 30 L18 24 L11 30 L14 20 L6 14 L16 14 Z"
      stroke="#1a3a5c"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
    />
    <path
      d="M18 8 L19.5 13 L25 13 L20.5 16.5 L22.5 22 L18 18.5 L13.5 22 L15.5 16.5 L11 13 L16.5 13 Z"
      fill="rgba(26,58,92,0.1)"
    />
  </svg>
);
const IconGlobal = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle
      cx="18"
      cy="16"
      r="10"
      stroke="#1a3a5c"
      strokeWidth="1.5"
      fill="none"
    />
    <ellipse
      cx="18"
      cy="16"
      rx="5"
      ry="10"
      stroke="#1a3a5c"
      strokeWidth="1.5"
      fill="none"
    />
    <path d="M8 16 L28 16" stroke="#1a3a5c" strokeWidth="1.5" />
    <path d="M10 11 L26 11M10 21 L26 21" stroke="#1a3a5c" strokeWidth="1" />
    <rect
      x="14"
      y="24"
      width="8"
      height="8"
      rx="1"
      stroke="#1a3a5c"
      strokeWidth="1.5"
      fill="none"
    />
    <path d="M18 26 L18 30M16 28 L20 28" stroke="#1a3a5c" strokeWidth="1.2" />
  </svg>
);

const leftCards = [
  {
    Icon: IconConvenience,
    h: "Convenience Reimagined",
    p: "One-hand use: Fold. Snap. Squeeze",
  },
  {
    Icon: IconPremium,
    h: "Premium Brand Appeal",
    p: "Sleek, premium and interactive design",
    feat: true,
  },
  {
    Icon: IconInclusive,
    h: "Inclusive by Design",
    p: "For users of all ages and abilities",
  },
];
const rightCards = [
  {
    Icon: IconSustainability,
    h: "Optimized for Sustainability",
    p: "Recyclable materials, no tear-off litter",
  },
  {
    Icon: IconBrand,
    h: "Protects Your Brand",
    p: "Fight fakes, build consumer trust",
  },
  {
    Icon: IconGlobal,
    h: "Globally-Patented Innovation",
    p: "Secured worldwide to enable confident adoption across industries",
  },
];

/* ─── inline responsive styles injected once ─── */
const RESPONSIVE_CSS = `
  /* ── reset box-sizing ── */
  *, *::before, *::after { box-sizing: border-box; }

  /* ── progress bar ── */
  #progress-bar {
    position: fixed; top: 0; left: 0; height: 3px;
    background: linear-gradient(90deg, var(--blue-accent), var(--cyan));
    width: 0%; z-index: 999; transition: width 0.08s linear;
  }

  /* ── Section 1: hero ── */
  .hero-section {
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    background: radial-gradient(ellipse 110% 90% at 65% 50%, #cde5ff 0%, #eaf4ff 50%, #f5f9ff 100%);
  }
  .hero-text {
    position: relative;
    z-index: 3;
    padding: 0 80px;
    max-width: 560px;
  }
  .hero-img-wrap {
    position: absolute;
    right: 0; top: 0; bottom: 0;
    width: 56%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 2;
  }
  .scroll-label {
    position: absolute;
    bottom: 38px; left: 80px;
    display: flex; align-items: center; gap: 10px;
    font-size: 11px; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--text-light);
  }

  /* ── Section 3: advantage grid ── */
  .adv-grid {
    position: relative;
    max-width: 1160px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 130px 1fr;
    gap: 20px;
    align-items: center;
  }
  .adv-center-col {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    position: relative;
  }
  .adv-divider {
    position: absolute; top: 0; bottom: 0; left: 50%;
    transform: translateX(-50%); width: 1px;
    background: linear-gradient(180deg, transparent, rgba(30,124,232,0.15) 30%, rgba(30,124,232,0.15) 70%, transparent);
    pointer-events: none;
  }

  /* ── Section 4: video ── */
  .video-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    max-width: 1080px;
    margin: 0 auto;
  }

  /* ── Section 5: industries ── */
  .industries-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
    max-width: 1080px;
    margin: 0 auto;
  }
  .industries-img-wrap { position: relative; height: 380px; }

  /* ── Sticky section image stage ── */
  .img-stage {
    position: relative;
    width: 760px;
    height: 580px;
    flex-shrink: 0;
  }

  /* ════════════════════════
     TABLET  ≤ 900px
  ════════════════════════ */
  @media (max-width: 900px) {
    .adv-grid {
      grid-template-columns: 1fr 80px 1fr;
      gap: 12px;
    }
    .video-grid, .industries-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .industries-img-wrap { height: 300px; }
    .hero-text { padding: 0 40px; max-width: 480px; }
    .hero-img-wrap { width: 48%; }
  }

  /* ════════════════════════
     MOBILE  ≤ 768px
  ════════════════════════ */
  @media (max-width: 768px) {
    /* Hero — stack vertically */
    .hero-section {
      flex-direction: column-reverse;
      align-items: flex-start;
      height: auto;
      min-height: 100vh;
      padding-top: 72px;
      padding-bottom: 40px;
    }
    .hero-text {
      padding: 0 24px;
      max-width: 100%;
      position: relative;
      z-index: 3;
    }
    .hero-img-wrap {
      position: relative;
      width: 100%;
      height: 280px;
      right: auto; top: auto; bottom: auto;
      margin-bottom: 8px;
    }
    .scroll-label { left: 24px; bottom: 16px; }

    /* Sticky section */
    .img-stage { width: 280px; height: 260px; }

    /* Advantage cards — single column */
    .adv-grid {
      grid-template-columns: 1fr;
      gap: 0;
    }
    .adv-center-col { display: none; }
    .adv-col-left, .adv-col-right {
      opacity: 1 !important;
      transform: none !important;
    }

    /* Sections padding */
    .sec-adv { padding: 60px 20px 80px !important; }
    .sec-video { padding: 60px 20px !important; }
    .sec-industries { padding: 60px 20px !important; }
    .sec-sustainability { padding: 40px 20px !important; }
    .sec-sustain-inner { min-height: 520px !important; }

    /* Video section */
    .video-grid { grid-template-columns: 1fr; gap: 24px; }

    /* Industries */
    .industries-grid { grid-template-columns: 1fr; gap: 28px; }
    .industries-img-wrap { height: 260px; }

    /* Sustainability card */
    .sustain-card {
      margin-left: 0 !important;
      margin-right: 0 !important;
      max-width: 100% !important;
      border-radius: 0 !important;
      padding: 32px 24px !important;
    }
  }

  /* ════════════════════════
     SMALL MOBILE  ≤ 480px
  ════════════════════════ */
  @media (max-width: 480px) {
    .hero-img-wrap { height: 220px; }
    .img-stage { width: 220px; height: 200px; }
    .adv-card { gap: 10px !important; padding: 14px 12px !important; }
    .hero-text { padding: 0 16px; }
    .sec-adv { padding: 48px 16px 64px !important; }
    .sec-video, .sec-industries { padding: 48px 16px !important; }
  }
`;

export default function Home() {
  const progressRef = useRef(null);
  const hwRef = useRef(null);
  const packetRef = useRef(null);
  const heroPacketRef = useRef(null);
  const squeezeRef = useRef(null);
  const tearRef = useRef(null);
  const restingDropRef = useRef(null);
  const hTRef = useRef(null);
  const sHRef = useRef(null);
  const impFiredRef = useRef(false);
  const [activeDot, setActiveDot] = useState(0);

  function fireImpact() {
    ["rr1", "rr2", "rr3"].forEach((id, i) => {
      const r = document.getElementById(id);
      if (!r) return;
      r.style.transition = "none";
      r.style.width = "0";
      r.style.height = "0";
      r.style.opacity = "0.75";
      r.style.marginLeft = "0";
      r.style.marginTop = "0";
      setTimeout(() => {
        r.style.transition = "all 1.2s ease-out";
        r.style.width = "120px";
        r.style.height = "38px";
        r.style.opacity = "0";
        r.style.marginLeft = "-60px";
        r.style.marginTop = "-19px";
      }, i * 240);
    });
  }

  useEffect(() => {
    // Inject responsive CSS once
    const styleId = "vshapes-responsive";
    if (!document.getElementById(styleId)) {
      const tag = document.createElement("style");
      tag.id = styleId;
      tag.textContent = RESPONSIVE_CSS;
      document.head.appendChild(tag);
    }

    function isMobile() {
      return window.innerWidth <= 768;
    }

    function onScroll() {
      const hw = hwRef.current;
      if (!hw) return;
      const top = hw.getBoundingClientRect().top;
      const total = hw.offsetHeight - window.innerHeight;
      const p = clamp(-top / total, 0, 1);

      if (progressRef.current) progressRef.current.style.width = p * 100 + "%";
      if (sHRef.current) sHRef.current.classList.toggle("hidden", p > 0.06);

      /* HERO PACKET */
      if (heroPacketRef.current) {
        const heroScroll = clamp(window.scrollY / window.innerHeight, 0, 1);
        const heroOut = eio(heroScroll);
        heroPacketRef.current.style.opacity = (1 - heroOut).toFixed(3);
        heroPacketRef.current.style.transform = `translateY(${lerp(0, -60, heroOut).toFixed(1)}px) scale(${lerp(1, 0.85, heroOut).toFixed(3)})`;
      }

      /* PHASE 1 — sticky packet */
      if (packetRef.current) {
        const ph1 = eout(range(p, 0, 0.35));
        const ty = lerp(-120, 0, ph1);
        const rot = lerp(12, 0, ph1);
        const sc = lerp(0.88, 1, ph1);
        const fadeOut = eio(range(p, 0.32, 0.46));
        const fadeIn = eout(range(p, 0, 0.12));
        packetRef.current.style.transform = `translateY(${ty}px) rotate(${rot}deg) scale(${sc})`;
        packetRef.current.style.opacity = (fadeIn * (1 - fadeOut)).toFixed(3);
      }

      /* PHASE 2 — squeeze */
      if (squeezeRef.current) {
        const sqFadeIn = eout(range(p, 0.38, 0.5));
        const sqDeform = eio(range(p, 0.5, 0.72));
        const sx = lerp(1, 0.8, sqDeform);
        const sy = lerp(1, 1.25, sqDeform);
        const squeezeY = lerp(0, -14, sqDeform);
        const shadowBlur = lerp(24, 64, sqDeform);
        const shadowOp = lerp(0.2, 0.5, sqDeform);
        const sqFadeOut = eio(range(p, 0.68, 0.8));
        squeezeRef.current.style.opacity = (sqFadeIn * (1 - sqFadeOut)).toFixed(
          3,
        );
        squeezeRef.current.style.transform = `translateY(${squeezeY}px) scaleX(${sx}) scaleY(${sy})`;
        squeezeRef.current.style.filter = `drop-shadow(0 ${Math.round(shadowBlur * 0.5)}px ${Math.round(shadowBlur)}px rgba(30,124,232,${shadowOp.toFixed(2)}))`;
      }

      /* PHASE 3 — tear drop */
      if (tearRef.current) {
        const tearT = eoutStrong(range(p, 0.7, 0.9));
        const tearY = lerp(-80, 0, eout(range(p, 0.7, 0.87)));
        const tearScale = lerp(0.12, 1, tearT);
        const tearFadeOut = eio(range(p, 0.86, 0.97));
        let tearOpacity = tearT > 0.02 ? tearT * (1 - tearFadeOut) : 0;
        tearRef.current.style.opacity = tearOpacity.toFixed(3);
        tearRef.current.style.transform = `scale(${tearScale.toFixed(3)}) translateY(${tearY.toFixed(1)}px)`;

        if (p > 0.84 && !impFiredRef.current) {
          impFiredRef.current = true;
          fireImpact();
        }
        if (p < 0.76) impFiredRef.current = false;
      }
    }

    const revObs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((r) => revObs.observe(r));

    const advSection = document.getElementById("secAdv");
    const cardObs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          if (restingDropRef.current) {
            restingDropRef.current.style.opacity = "1";
            restingDropRef.current.style.transform = "scale(1) translateY(0px)";
          }
          setTimeout(() => {
            const left = document.querySelector(".adv-col-left");
            const right = document.querySelector(".adv-col-right");
            if (left) {
              left.style.opacity = "1";
              left.style.transform = "translateX(0)";
            }
            if (right) {
              right.style.opacity = "1";
              right.style.transform = "translateX(0)";
            }
          }, 500);
          setTimeout(() => {
            document
              .querySelectorAll(".adv-card")
              .forEach((c, i) =>
                setTimeout(() => c.classList.add("vis"), i * 90),
              );
          }, 600);
        }
      },
      { threshold: 0.15 },
    );
    if (advSection) cardObs.observe(advSection);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      revObs.disconnect();
      cardObs.disconnect();
    };
  }, []);

  return (
    <>
      {/* ── PROGRESS BAR ── */}
      <div ref={progressRef} id="progress-bar" />

      {/* ── ANNOUNCEMENT ── */}
      <div
        style={{
          background: "var(--blue-dark)",
          color: "#a8c4e8",
          textAlign: "center",
          fontSize: 13,
          letterSpacing: "0.06em",
          padding: 10,
        }}
      >
        Lorem ipsum is a dummy or placeholder text commonly used in graphic
        design
      </div>

      {/* ════════════════════════════
          SECTION 1 — LANDING HERO
      ════════════════════════════ */}
      <section className="hero-section">
        {/* decorative rings */}
        {[
          { width: 500, height: 500, right: -60, rotate: -18 },
          { width: 680, height: 680, right: -160, rotate: -10 },
          { width: 900, height: 900, right: -300, rotate: 4 },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              border: "1.5px solid rgba(100,180,255,0.15)",
              pointerEvents: "none",
              width: s.width,
              height: s.height,
              right: s.right,
              top: "50%",
              transform: `translateY(-50%) rotate(${s.rotate}deg)`,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            borderRadius: "50%",
            filter: "blur(90px)",
            opacity: 0.18,
            pointerEvents: "none",
            width: 580,
            height: 580,
            background: "#a8d0ff",
            top: -160,
            left: -120,
            animation: "bd 10s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            borderRadius: "50%",
            filter: "blur(90px)",
            opacity: 0.14,
            pointerEvents: "none",
            width: 420,
            height: 420,
            background: "#c4e8ff",
            top: "35%",
            right: -100,
            animation: "bd 13s ease-in-out infinite reverse",
          }}
        />

        <div className="hero-text">
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(32px,5.5vw,66px)",
              fontWeight: 900,
              color: "var(--blue-dark)",
              lineHeight: 1.06,
              marginBottom: 24,
            }}
          >
            Better packaging
            <br />
            starts here.
          </h1>
          <p
            style={{
              fontSize: "clamp(13px,1.5vw,15px)",
              color: "var(--text-mid)",
              lineHeight: 1.9,
              marginBottom: 38,
              maxWidth: 420,
            }}
          >
            At first glance, it's a pack. At first use, it's something else
            entirely. Powered by patented snap technology, V-Shapes creates a
            simpler, single-handed way to open, use and move on — effortlessly.
          </p>
          <button className="btn-sample">Request for Sample</button>
        </div>

        <div className="hero-img-wrap">
          <img
            ref={heroPacketRef}
            src="/packet.png"
            alt="V-Shapes single-serve packaging"
            style={{
              width: "90%",
              maxWidth: 600,
              height: "70%",
              objectFit: "contain",
              objectPosition: "center",
              animation: "pFloat 7s ease-in-out infinite",
              filter: "drop-shadow(0 40px 80px rgba(30,100,200,0.2))",
              willChange: "transform, opacity",
              transformOrigin: "center center",
            }}
          />
        </div>

        <div className="scroll-label">
          <div className="lh-scroll-line" />
          Scroll to explore
        </div>
      </section>

      {/* ════════════════════════════
          SECTION 2 — PACKET → SQUEEZE → TEAR
      ════════════════════════════ */}
      <div ref={hwRef} style={{ height: "500vh", position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background:
              "radial-gradient(ellipse 90% 70% at 50% 20%, #cde5ff 0%, #ecf5ff 55%, #ffffff 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              borderRadius: "50%",
              filter: "blur(90px)",
              opacity: 0.28,
              width: 580,
              height: 580,
              background: "#a8d0ff",
              top: -160,
              left: -120,
              animation: "bd 10s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              borderRadius: "50%",
              filter: "blur(90px)",
              opacity: 0.28,
              width: 420,
              height: 420,
              background: "#c4e8ff",
              top: "35%",
              right: -100,
              animation: "bd 13s ease-in-out infinite reverse",
            }}
          />

          {/* image stage */}
          <div className="img-stage">
            <img
              ref={packetRef}
              src="/packet.png"
              alt="V-Shapes packet"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transformOrigin: "center center",
                willChange: "transform, opacity",
                filter: "drop-shadow(0 32px 64px rgba(30,100,200,0.22))",
                opacity: 0,
                transform: "translateY(-120px) rotate(12deg) scale(0.88)",
              }}
            />
            <img
              ref={squeezeRef}
              src="/squeeze.png"
              alt="V-Shapes squeeze"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transformOrigin: "center bottom",
                willChange: "transform, opacity, filter",
                filter: "drop-shadow(0 24px 48px rgba(30,124,232,0.22))",
                opacity: 0,
              }}
            />
          </div>

          {/* tear drop */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: -12,
              pointerEvents: "none",
            }}
          >
            <img
              ref={tearRef}
              src="/tear.png"
              alt="V-Shapes drop"
              style={{
                width: 130,
                filter: "drop-shadow(0 18px 36px rgba(30,124,232,0.40))",
                opacity: 0,
                transform: "scale(0.12) translateY(-80px)",
                transformOrigin: "center top",
                willChange: "transform, opacity",
              }}
            />
            <div
              style={{
                position: "relative",
                height: 10,
                width: 140,
                overflow: "visible",
              }}
            >
              {["rr1", "rr2", "rr3"].map((id) => (
                <div
                  key={id}
                  id={id}
                  style={{
                    position: "absolute",
                    bottom: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    borderRadius: "50%",
                    border: "2px solid rgba(30,124,232,0.38)",
                    width: 0,
                    height: 0,
                    opacity: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* scroll hint */}
          <div
            ref={sHRef}
            className="scroll-hint"
            style={{
              position: "absolute",
              bottom: 30,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-light)",
              transition: "opacity 0.4s",
            }}
          >
            <div className="scroll-arrow" />
            Scroll to reveal
          </div>
        </div>
      </div>

      {/* ════════════════════════════
          SECTION 3 — ADVANTAGE
      ════════════════════════════ */}
      <section
        id="secAdv"
        className="sec-adv"
        style={{
          padding: "80px 60px 100px",
          background: "var(--white)",
          overflow: "hidden",
        }}
      >
        <div className="adv-grid">
          {/* LEFT CARDS */}
          <div
            className="adv-col-left"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              opacity: 0,
              transform: "translateX(-80px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            {leftCards.map((c, i) => (
              <div
                key={i}
                className={`adv-card${c.feat ? " feat" : ""}`}
                style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: c.feat
                      ? "rgba(255,255,255,0.18)"
                      : "rgba(26,58,92,0.06)",
                  }}
                >
                  <c.Icon />
                </div>
                <div>
                  <div className="adv-h">{c.h}</div>
                  <div className="adv-p">{c.p}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CENTER */}
          <div className="adv-center-col">
            <div className="adv-divider" />
            <img
              ref={restingDropRef}
              src="/tear.png"
              alt="V-Shapes drop"
              style={{
                width: 100,
                filter: "drop-shadow(0 16px 40px rgba(30,124,232,0.45))",
                opacity: 0,
                transform: "scale(0.4) translateY(-40px)",
                transformOrigin: "center top",
                willChange: "transform, opacity",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                position: "relative",
                zIndex: 2,
              }}
            />
          </div>

          {/* RIGHT CARDS */}
          <div
            className="adv-col-right"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              opacity: 0,
              transform: "translateX(80px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            {rightCards.map((c, i) => (
              <div
                key={i}
                className="adv-card"
                style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: "rgba(26,58,92,0.06)",
                  }}
                >
                  <c.Icon />
                </div>
                <div>
                  <div className="adv-h">{c.h}</div>
                  <div className="adv-p">{c.p}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          SECTION 4 — VIDEO
      ════════════════════════════ */}
      <section
        className="reveal sec-video"
        style={{
          padding: "80px 60px",
          background: "linear-gradient(180deg, #f0f6ff, white)",
        }}
      >
        <div className="video-grid">
          <div className="video-thumb">
            <img
              src="/squeeze.png"
              alt="V-Shapes in use"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className="play-btn">&#9658;</div>
          </div>
          <div>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(22px,3.5vw,40px)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "var(--blue-dark)",
                marginBottom: 16,
              }}
            >
              The world is ready
              <br />
              to{" "}
              <em style={{ fontStyle: "normal", color: "var(--blue-accent)" }}>
                use better
              </em>
            </h2>
            <p
              style={{
                fontSize: "clamp(13px,1.4vw,15px)",
                color: "var(--text-mid)",
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              V-Shapes introduces a patented format that changes how
              single-serve packaging is used. A simple fold, a controlled snap,
              and a natural squeeze come together in one intuitive,
              single-handed action. Designed to feel effortless from the very
              first use.
            </p>
            <button className="btn-outline">Request for Sample</button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          SECTION 5 — INDUSTRIES
      ════════════════════════════ */}
      <section
        className="reveal sec-industries"
        style={{
          padding: "80px 60px",
          background: "white",
        }}
      >
        <div className="industries-grid">
          {/* LEFT — text */}
          <div>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(22px,3.5vw,42px)",
                fontWeight: 700,
                color: "var(--blue-dark)",
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              Customized Packaging Solutions for Diverse Industries
            </h2>
            <span
              style={{
                fontSize: "clamp(16px,2vw,20px)",
                fontWeight: 700,
                color: "var(--blue-accent)",
                marginBottom: 12,
                display: "block",
              }}
            >
              Personal Care
            </span>
            <p
              style={{
                fontSize: "clamp(13px,1.4vw,14.5px)",
                color: "var(--text-mid)",
                lineHeight: 1.8,
                marginBottom: 26,
              }}
            >
              V-Shapes provides customized packaging solutions tailored to the
              unique requirements of diverse industries
            </p>
            <button className="btn-outline">Know More</button>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  onClick={() => setActiveDot(i)}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    border: "2px solid var(--blue-accent)",
                    cursor: "pointer",
                    background:
                      activeDot === i ? "var(--blue-accent)" : "transparent",
                    transition: "background 0.2s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — image card */}
          <div className="industries-img-wrap">
            <div
              style={{
                position: "absolute",
                top: 24,
                left: 0,
                width: "45%",
                height: "55%",
                borderRadius: 18,
                background: "#c8dcf0",
                zIndex: 1,
              }}
            />
            <div
              style={{
                width: "86%",
                height: "100%",
                position: "absolute",
                right: 0,
                borderRadius: 22,
                overflow: "hidden",
                boxShadow: "0 28px 60px rgba(10,37,64,0.2)",
                zIndex: 2,
              }}
            >
              <img
                src="/couple.jpg"
                alt="Personal Care"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 18,
                  color: "white",
                  fontWeight: 600,
                  fontSize: 14,
                  background:
                    "linear-gradient(0, rgba(10,37,64,0.85), transparent)",
                  borderRadius: "0 0 22px 22px",
                }}
              >
                Personal Care
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          SECTION 6 — SUSTAINABILITY
      ════════════════════════════ */}
      <section
        className="sec-sustainability"
        style={{ padding: "60px 60px", background: "white" }}
      >
        <div
          className="sec-sustain-inner"
          style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            minHeight: 480,
            display: "flex",
            alignItems: "center",
            maxWidth: 1080,
            margin: "0 auto",
          }}
        >
          <img
            src="/trees.jpg"
            alt="Forest"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(5,20,12,0.38)",
            }}
          />
          <div
            className="reveal sustain-card"
            style={{
              position: "relative",
              zIndex: 2,
              marginLeft: "auto",
              marginRight: 56,
              background: "rgba(240,247,255,0.95)",
              borderRadius: 18,
              padding: "44px 48px",
              maxWidth: 460,
              boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
            }}
          >
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(20px,3vw,36px)",
                fontWeight: 900,
                color: "var(--blue-dark)",
                lineHeight: 1.18,
                marginBottom: 14,
              }}
            >
              <em style={{ fontStyle: "normal", color: "var(--blue-accent)" }}>
                Better Design
              </em>{" "}
              Leaves Less Behind
            </h2>
            <p
              style={{
                fontSize: "clamp(13px,1.4vw,14px)",
                color: "var(--text-mid)",
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              Thoughtfully designed formats that reduce waste, improve use, and
              support more responsible packaging at scale.
            </p>
            <button className="btn-green">
              Read More About Our Sustainability Approach
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes dropFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1); }
        }
      `}</style>
    </>
  );
}
