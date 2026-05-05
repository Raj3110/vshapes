import React, { useEffect, useState } from "react";

const SUSTAIN_CSS = `
  *, *::before, *::after { box-sizing: border-box; }

  .sustain-hero {
    position: relative; height: 70vh; min-height: 420px;
    display: flex; align-items: flex-end; overflow: hidden;
  }
  .sustain-hero img.bg {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; object-position: center top;
  }
  .sustain-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(5,20,40,0.18) 0%, rgba(5,20,40,0.55) 100%);
  }
  .sustain-hero-text { position: relative; z-index: 2; padding: 0 80px 64px; color: white; }
  .sustain-hero-text h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(30px,5vw,62px); font-weight: 900; line-height: 1.1; margin: 0;
  }
  .sustain-hero-text h1 em { font-style: normal; color: #4db6f0; }

  .sustain-intro { text-align: center; max-width: 720px; margin: 72px auto; padding: 0 24px; }
  .sustain-intro p { font-size: clamp(14px,1.6vw,17px); color: #4a6080; line-height: 1.9; }

  .dwi-title {
    text-align: center; font-family: 'Playfair Display', serif;
    font-size: clamp(22px,3.5vw,40px); font-weight: 700; color: #0a2540; margin-bottom: 40px;
  }
  .dwi-title em { font-style: normal; color: #1e7ce8; }

  .dwi-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto; gap: 16px; max-width: 1000px; margin: 0 auto;
  }
  .dwi-card { position: relative; border-radius: 16px; overflow: hidden; min-height: 200px; }
  .dwi-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .dwi-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(5,20,40,0.05) 0%, rgba(5,20,40,0.65) 100%);
  }
  .dwi-card-label {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 20px 24px; color: white; font-weight: 700; font-size: 15px;
  }
  .dwi-card.featured { grid-row: span 2; min-height: 420px; }
  .dwi-card.featured .dwi-card-label {
    bottom: auto; top: 0;
    background: linear-gradient(180deg, rgba(10,37,80,0.82), transparent);
    border-radius: 16px 16px 0 0; padding: 28px 28px 40px; font-size: 18px;
  }
  .dwi-card.featured .dwi-card-label p {
    font-size: 13px; font-weight: 400; margin-top: 8px; opacity: 0.92; line-height: 1.7; max-width: 320px;
  }

  .dot-nav { display: flex; justify-content: center; gap: 8px; margin: 28px 0; }
  .dot-nav span {
    width: 10px; height: 10px; border-radius: 50%;
    border: 2px solid #1e7ce8; cursor: pointer; transition: background 0.2s; display: inline-block;
  }
  .dot-nav span.active { background: #1e7ce8; }

  .materials-section {
    padding: 80px 60px; max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center;
  }
  .materials-section h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px,3.2vw,40px); font-weight: 700; color: #0a2540; line-height: 1.18; margin-bottom: 16px;
  }
  .materials-section h2 em { font-style: normal; color: #1e7ce8; }
  .materials-section p { font-size: 14.5px; color: #4a6080; line-height: 1.85; margin-bottom: 24px; }
  .cert-badges { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; margin-top: 8px; }
  .cert-badge {
    border: 1.5px solid #c8d8ec; border-radius: 10px; padding: 8px 14px;
    font-size: 13px; font-weight: 700; color: #0a2540; background: white;
  }
  .materials-img { height: 380px; }
  .materials-img img {
    width: 100%; height: 100%; object-fit: cover;
    border-radius: 20px; box-shadow: 0 24px 60px rgba(10,37,64,0.18);
  }

  .quote-banner {
    background: white; border: 1.5px solid #d8e8f8; border-radius: 14px;
    padding: 18px 32px; text-align: center; max-width: 680px; margin: 0 auto 60px;
    font-size: 15px; color: #1e7ce8; font-weight: 600;
    box-shadow: 0 4px 24px rgba(30,124,232,0.08);
  }

  .feat-row {
    display: grid; grid-template-columns: repeat(3,1fr);
    max-width: 1100px; margin: 0 auto 80px;
    border-radius: 20px; overflow: hidden; box-shadow: 0 16px 60px rgba(10,37,64,0.14);
    background-size: cover; background-position: center;
  }
  .feat-row-card { position: relative; min-height: 280px; overflow: hidden; }
  .feat-row-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(5,20,50,0.72) 100%);
  }
  .feat-row-card-label { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px 24px; color: white; }
  .feat-row-card-label h3 { font-size: 15px; font-weight: 700; margin: 0 0 6px; }
  .feat-row-card-label p { font-size: 12.5px; opacity: 0.88; line-height: 1.6; margin: 0; }
  .feat-row-card-label a { font-size: 12px; color: #7bc8f8; text-decoration: none; display: inline-block; margin-top: 8px; font-weight: 600; }
  .feat-row-card:not(:last-child) { border-right: 1px solid rgba(255,255,255,0.15); }

  .scale-section {
    background: linear-gradient(135deg, #0a2540 0%, #1a4a8a 60%, #0d3570 100%);
    padding: 80px 60px; text-align: center; color: white; position: relative; overflow: hidden;
  }
  .scale-section h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px,3.5vw,40px); font-weight: 700; margin-bottom: 14px;
  }
  .scale-section > p { font-size: 14.5px; opacity: 0.82; max-width: 620px; margin: 0 auto 60px; line-height: 1.85; }
  .scale-flow {
    display: flex; align-items: flex-start; justify-content: center;
    flex-wrap: wrap; max-width: 900px; margin: 0 auto; gap: 8px;
  }
  .scale-node { display: flex; flex-direction: column; align-items: center; gap: 12px; width: 140px; }
  .scale-node-circle {
    width: 72px; height: 72px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.25); background: rgba(255,255,255,0.1);
    display: flex; align-items: center; justify-content: center; position: relative;
  }
  .scale-node-circle svg { width: 32px; height: 32px; }
  .scale-node p { font-size: 12px; opacity: 0.85; line-height: 1.4; text-align: center; margin: 0; }
  .scale-arrow {
    width: 36px; height: 2px; background: rgba(255,255,255,0.25);
    flex-shrink: 0; margin-top: 35px; position: relative;
  }
  .scale-arrow::after {
    content: ''; position: absolute; right: -6px; top: -4px;
    border: 5px solid transparent; border-left-color: rgba(255,255,255,0.35);
  }

  .standards-section { padding: 80px 60px; text-align: center; background: white; }
  .standards-section h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px,3.5vw,38px); font-weight: 700; color: #0a2540; margin-bottom: 48px;
  }
  .standards-section h2 em { font-style: normal; color: #1e7ce8; }
  .standards-badges {
    display: flex; justify-content: center; align-items: center;
    gap: 20px; flex-wrap: wrap; max-width: 800px; margin: 0 auto 48px;
  }
  .std-badge {
    border: 2px solid #d8e8f8; border-radius: 14px; padding: 18px 28px; min-width: 110px;
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    font-weight: 700; font-size: 13px; color: #0a2540; background: #f8fbff; transition: box-shadow 0.2s;
  }
  .std-badge:hover { box-shadow: 0 8px 24px rgba(30,124,232,0.12); }
  .std-badge-logo { font-size: 22px; font-weight: 900; }

  .cta-sustain {
    position: relative; margin: 0 60px 80px; border-radius: 24px;
    overflow: hidden; min-height: 360px; display: flex; align-items: center;
  }
  .cta-sustain img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .cta-sustain-overlay { position: absolute; inset: 0; background: rgba(5,20,40,0.42); }
  .cta-sustain-content { position: relative; z-index: 2; padding: 56px 64px; color: white; }
  .cta-sustain-content h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(24px,3.5vw,44px); font-weight: 900; line-height: 1.12; margin-bottom: 24px;
  }
  .cta-sustain-content h2 em { font-style: normal; color: #4db6f0; }

  .s-reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .s-reveal.vis { opacity: 1; transform: translateY(0); }

  @media (max-width: 900px) {
    .materials-section { grid-template-columns: 1fr; gap: 40px; padding: 60px 32px; }
    .feat-row { grid-template-columns: 1fr; }
    .sustain-hero-text { padding: 0 32px 48px; }
    .scale-arrow { display: none; }
    .cta-sustain { margin: 0 24px 60px; }
    .cta-sustain-content { padding: 40px 32px; }
  }
  @media (max-width: 768px) {
    .dwi-grid { grid-template-columns: 1fr; }
    .dwi-card.featured { grid-row: span 1; min-height: 260px; }
    .sustain-hero { height: 60vh; }
    .sustain-hero-text { padding: 0 20px 36px; }
    .materials-section { padding: 48px 20px; }
    .scale-section { padding: 60px 20px; }
    .standards-section { padding: 60px 20px; }
    .cta-sustain { margin: 0 16px 48px; }
    .cta-sustain-content { padding: 32px 20px; }
  }
`;

const SCALE_STEPS = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="#7bc8f8" strokeWidth="1.8">
        <rect x="6" y="4" width="14" height="18" rx="2" />
        <path d="M9 9h8M9 13h8M9 17h5" strokeLinecap="round" />
      </svg>
    ),
    label: "Design with Care",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="#7bc8f8" strokeWidth="1.8">
        <circle cx="16" cy="16" r="10" />
        <path d="M11 16l4 4 6-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Test Responsibly",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="#7bc8f8" strokeWidth="1.8">
        <circle cx="16" cy="16" r="6" />
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4" strokeLinecap="round" />
      </svg>
    ),
    label: "Engineer Efficiently",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="#7bc8f8" strokeWidth="1.8">
        <rect x="4" y="10" width="24" height="16" rx="3" />
        <path d="M10 10V7a6 6 0 0112 0v3" />
      </svg>
    ),
    label: "Compliant Global Rollout",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="#7bc8f8" strokeWidth="1.8">
        <circle cx="16" cy="16" r="10" />
        <ellipse cx="16" cy="16" rx="5" ry="10" />
        <path d="M6 16h20M8 11h16M8 21h16" />
      </svg>
    ),
    label: "Responsible Manufacturing",
  },
];

export default function Sustainability() {
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const styleId = "sustain-page-css";
    if (!document.getElementById(styleId)) {
      const tag = document.createElement("style");
      tag.id = styleId;
      tag.textContent = SUSTAIN_CSS;
      document.head.appendChild(tag);
    }
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".s-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const DotNav = () => (
    <div className="dot-nav">
      {[0, 1].map((i) => (
        <span
          key={i}
          className={activeDot === i ? "active" : ""}
          onClick={() => setActiveDot(i)}
        />
      ))}
    </div>
  );

  return (
    <>
      {/* ANNOUNCEMENT */}
      <div
        style={{
          background: "#0a2540",
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

      {/* HERO */}
      <section className="sustain-hero">
        <img
          className="bg"
          src="/Sustainability/hands_on_globe.png"
          alt="Sustainability"
        />
        <div className="sustain-hero-overlay" />
        <div className="sustain-hero-text">
          <h1>
            Where Design
            <br />
            Meets <em>Responsibility</em>
          </h1>
        </div>
      </section>

      {/* INTRO */}
      <div className="sustain-intro s-reveal">
        <p>
          At V-Shapes, sustainability is not a feature. It is the outcome of
          thoughtful design, responsible material choices, and packaging that
          performs better in real life.
        </p>
      </div>

      {/* DESIGNED WITH INTENT */}
      <section style={{ padding: "0 60px 60px", background: "white" }}>
        <h2 className="dwi-title s-reveal">
          <em>Designed</em> With Intent
        </h2>
        <div className="dwi-grid s-reveal">
          <div className="dwi-card featured">
            <img
              src="/Sustainability/no_tear_by_design.jpg"
              alt="No Tear-Offs By Design"
            />
            <div className="dwi-card-overlay" />
            <div className="dwi-card-label">
              <div style={{ fontSize: 18, fontWeight: 800 }}>
                No Tear-Offs
                <br />
                By Design
              </div>
              <p>
                By designing packs without tear-offs, V-Shapes enables cleaner
                use, controlled dispensing, and more responsible end-of-life
                outcomes.
              </p>
            </div>
          </div>
          <div className="dwi-card" style={{ minHeight: 200 }}>
            <img
              src="/Sustainability/less_wasted.jpg"
              alt="Less Wasted Less Produced"
            />
            <div className="dwi-card-overlay" />
            <div className="dwi-card-label">Less Wasted Less Produced</div>
          </div>
          <div className="dwi-card" style={{ minHeight: 200 }}>
            <img
              src="/Sustainability/single_format.png"
              alt="Single-Use Format"
            />
            <div className="dwi-card-overlay" />
            <div className="dwi-card-label">Single-Use Format</div>
          </div>
        </div>
        <DotNav />
      </section>

      {/* MATERIALS */}
      <section style={{ background: "#f5f9ff" }}>
        <div className="materials-section s-reveal">
          <div>
            <h2>
              <em>Materials</em> That
              <br />
              Make Sense
            </h2>
            <p>
              Our packaging solutions are designed for recyclability, with an
              ongoing shift toward Nomo polymer structures for easier recycling.
            </p>
            <div className="cert-badges">
              {["CE", "GMP Quality", "fcms"].map((b) => (
                <div className="cert-badge" key={b}>
                  {b}
                </div>
              ))}
            </div>
          </div>
          <div className="materials-img">
            <img src="/Sustainability/make_sense.jpg" alt="Materials" />
          </div>
        </div>

        <div className="quote-banner s-reveal">
          A packaging that opens cleanly and empties fully helps reduce product
          waste naturally.
        </div>

        <div style={{ padding: "0 60px", marginBottom: 16 }}>
          {/* Single shared background image on the feat-row wrapper */}
          <div
            className="feat-row s-reveal"
            style={{
              backgroundImage: "url('/Sustainability/banner.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {[
              {
                title: "The Problem With Traditional Sachets",
                desc: "From spillage to waste, a closer look at why legacy single-serve formats no longer serve modern needs.",
              },
              {
                title: "Why One-Handed Matters",
                desc: "Exploring how intuitive, single-hand use improves everyday experiences across food, personal care, and on-the-go products.",
              },
              {
                title: "Designed for Complete Use",
                desc: "How controlled dispensing helps ensure products are used fully, not left behind.",
              },
            ].map((card) => (
              <div className="feat-row-card" key={card.title}>
                <div className="feat-row-card-overlay" />
                <div className="feat-row-card-label">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <a href="#">Read More →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DotNav />
      </section>

      {/* SCALE RESPONSIBLY */}
      <section className="scale-section s-reveal">
        <h2>Designed to Scale Responsibly</h2>
        <p>
          Because V-Shapes designs both the packaging format and the machines
          that produce it, sustainability is built into the system. Improvements
          scale seamlessly across production lines, partners, and global
          markets.
        </p>
        <div className="scale-flow">
          {SCALE_STEPS.map((step, i) => (
            <React.Fragment key={step.label}>
              <div className="scale-node">
                <div className="scale-node-circle">
                  <span
                    style={{
                      position: "absolute",
                      top: 6,
                      left: 10,
                      fontSize: 10,
                      opacity: 0.5,
                      color: "#7bc8f8",
                    }}
                  >
                    {i + 1}
                  </span>
                  {step.icon}
                </div>
                <p>{step.label}</p>
              </div>
              {i < SCALE_STEPS.length - 1 && <div className="scale-arrow" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* GLOBAL STANDARDS */}
      <section className="standards-section s-reveal">
        <h2>
          Validated by <em>Global Standards</em>
        </h2>
        <div className="standards-badges">
          {[
            { logo: "UL", sub: "UL Standard" },
            { logo: "CSA", sub: "CSA Standard" },
            { logo: "FDA", sub: "FDA Standard" },
            { logo: "GSA", sub: "GSA Certified" },
            { logo: "♻", sub: "Compostable Packaging", green: true },
          ].map((b) => (
            <div className="std-badge" key={b.sub}>
              <div
                className="std-badge-logo"
                style={{ color: b.green ? "#2e8b57" : "#1e3a8a" }}
              >
                {b.logo}
              </div>
              <div style={{ fontSize: 11, color: "#4a6080", fontWeight: 500 }}>
                {b.sub}
              </div>
            </div>
          ))}
        </div>
        <DotNav />
      </section>

      {/* CTA */}
      <div className="cta-sustain s-reveal">
        <img src="/Sustainability/shape_future.jpg" alt="Shape the Future" />
        <div className="cta-sustain-overlay" />
        <div className="cta-sustain-content">
          <h2>
            Shape the <em>Future</em>
            <br />
            Responsibly
          </h2>
          <button
            style={{
              background: "white",
              color: "#0a2540",
              border: "none",
              borderRadius: 8,
              padding: "12px 28px",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Talk to us
          </button>
        </div>
      </div>
    </>
  );
}
