import React, { useEffect, useState } from "react";

const SOLUTIONS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .sol-root {
    font-family: 'DM Sans', sans-serif;
    color: #0a2540;
    background: #ffffff;
    overflow-x: hidden;
  }

  .sol-bg-wave {
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 80% 60% at 90% 20%, #bde0ff 0%, transparent 70%),
      radial-gradient(ellipse 60% 50% at 10% 80%, #cce8ff 0%, transparent 70%);
    opacity: 0.22;
  }

  /* ── ANNOUNCE ── */
  .sol-announce {
    position: relative; z-index: 10;
    background: #0a2540; color: #a8c4e8;
    text-align: center; font-size: 13px;
    letter-spacing: 0.06em; padding: 10px 24px;
  }

  /* ── HERO ── */
  .sol-hero {
    position: relative; z-index: 1;
    background: #eef3f8;
    overflow: hidden;
  }

  /* Floating image card — inset gaps on top/left/right */
  .sol-hero-img-card {
    position: relative;
    margin: 12px 12px 0 8px;
    border-radius: 20px;
    overflow: hidden;
    height: 380px;
  }
  .sol-hero-img-card img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center 20%;
    display: block;
  }
  .sol-hero-img-card::after {
    content: '';
    position: absolute; inset: 0;
    background: rgba(22, 52, 100, 0.25);
    pointer-events: none;
  }

  /* White text panel — sits ON the image, anchored bottom-left */
  .sol-hero-text {
    position: absolute;
    bottom: 0; left: 0;
    z-index: 3;
    background: #ffffff;
    border-top-right-radius: 26px;
    padding: 24px 80px 28px 28px;
    clip-path: polygon(0 0, 80% 0, 100% 100%, 0% 100%);
  }
  .sol-hero-text h1 {
    font-size: clamp(22px, 2.6vw, 40px);
    font-weight: 800;
    line-height: 1.18;
    color: #0a2540;
    margin: 0;
    letter-spacing: -0.02em;
    white-space: nowrap;
  }
  .sol-hero-text h1 em {
    font-style: normal;
    color: #1e7ce8;
  }

  /* Light bg strip below the image card */
  .sol-hero-bottom {
    height: 56px;
    background: #eef3f8;
  }

  /* ── DIVIDER ── */
  .sol-divider {
    position: relative; z-index: 1;
    border: none; border-top: 1px solid rgba(10,37,80,0.1);
    margin: 0;
  }

  /* ── INTRO ── */
  .sol-intro {
    position: relative; z-index: 1;
    text-align: center; max-width: 680px;
    margin: 56px auto; padding: 0 24px;
  }
  .sol-intro p {
    font-size: clamp(14px,1.5vw,17px); color: #4a6080; line-height: 1.9; margin: 0;
  }

  /* ── SECTION TITLE ── */
  .sol-stitle {
    position: relative; z-index: 1;
    text-align: center; margin-bottom: 40px;
    font-size: clamp(22px,3vw,38px); font-weight: 800;
    color: #0a2540; letter-spacing: -0.02em;
  }
  .sol-stitle em { font-style: normal; color: #1e7ce8; }

  /* ── TECHNOLOGY — single image diagonal split ── */
  .tech-section { position: relative; z-index: 1; padding: 0 60px 64px; }
  .tech-banner {
    position: relative; max-width: 1100px; margin: 0 auto;
    border-radius: 22px; overflow: hidden; min-height: 420px;
    cursor: pointer;
  }
  .tech-banner > img {
    position: absolute; inset: 0;
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.55s ease;
  }
  .tech-banner:hover > img { transform: scale(1.03); }
  .tech-dark-side {
    position: absolute; inset: 0;
    background: linear-gradient(105deg,
      rgba(5,18,55,0.78) 0%,
      rgba(5,18,55,0.72) 52%,
      rgba(5,18,55,0.10) 66%,
      transparent 72%
    );
  }
  .tech-light-side {
    position: absolute; inset: 0;
    background: linear-gradient(105deg,
      transparent 55%,
      rgba(140,200,255,0.45) 65%,
      rgba(160,215,255,0.62) 100%
    );
  }
  .tech-left-body {
    position: absolute; bottom: 0; left: 0;
    padding: 32px 36px; color: white; max-width: 480px;
  }
  .tech-left-body h3 {
    font-size: clamp(36px,5vw,72px); font-weight: 900;
    margin: 0 0 14px; letter-spacing: -0.02em; line-height: 1;
    opacity: 0.55;
  }
  .tech-left-body p {
    font-size: 13.5px; opacity: 0.9; line-height: 1.65;
    margin: 0 0 20px; max-width: 320px;
  }
  .tech-btn {
    display: inline-block; border: 2px solid white; color: white;
    border-radius: 8px; padding: 10px 24px; font-size: 13px;
    font-weight: 700; cursor: pointer; background: white; color: #0a2540;
    font-family: inherit; letter-spacing: 0.06em; text-transform: uppercase;
    transition: background 0.2s, color 0.2s;
  }
  .tech-btn:hover { background: #1e7ce8; color: white; border-color: #1e7ce8; }
  .tech-right-body {
    position: absolute; bottom: 0; right: 0;
    padding: 32px 40px; color: white; text-align: right;
  }
  .tech-right-body h3 {
    font-size: clamp(28px,3.5vw,48px); font-weight: 800;
    margin: 0; letter-spacing: -0.02em; line-height: 1;
  }

  /* ── SUPPORT ── */
  .support-section { position: relative; z-index: 1; padding: 72px 60px; }
  .support-card {
    max-width: 1100px; margin: 0 auto;
    border-radius: 22px; overflow: hidden;
    position: relative; min-height: 380px;
    display: flex; align-items: flex-end;
    box-shadow: 0 20px 60px rgba(10,37,80,0.14);
  }
  .support-card > img {
    position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
    transition: opacity 0.4s;
  }
  .support-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(90deg, rgba(5,20,60,0.76) 0%, rgba(5,20,40,0.10) 65%, transparent 100%);
  }
  .support-body {
    position: relative; z-index: 2;
    padding: 44px 52px; color: white; max-width: 480px;
  }
  .support-body h3 {
    font-size: clamp(18px,2.5vw,28px); font-weight: 700; margin: 0 0 14px;
  }
  .support-body p { font-size: 14px; opacity: 0.88; line-height: 1.7; margin: 0 0 22px; }
  .support-side-nav {
    position: absolute; right: 28px; top: 50%; transform: translateY(-50%);
    z-index: 3; display: flex; flex-direction: column; gap: 10px;
  }
  .s-dot {
    width: 10px; height: 10px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.5);
    cursor: pointer; transition: background 0.2s, border-color 0.2s;
  }
  .s-dot.active { background: white; border-color: white; }

  /* ── APPS ── */
  .apps-section { position: relative; z-index: 1; padding: 0 60px 72px; }
  .apps-inner {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 64px; align-items: center;
  }
  .apps-label {
    font-size: 12.5px; font-weight: 700; color: #1e7ce8;
    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px;
  }
  .apps-heading {
    font-size: clamp(24px,3vw,36px); font-weight: 800;
    color: #0a2540; line-height: 1.15; margin: 0; letter-spacing: -0.02em;
  }
  .apps-heading em { font-style: normal; color: #1e7ce8; }
  .apps-desc { font-size: 14px; color: #4a6080; line-height: 1.85; margin: 16px 0 28px; }
  .apps-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
  .app-tab {
    padding: 7px 18px; border-radius: 20px; border: 1.5px solid #c8d8ec;
    font-size: 13px; font-weight: 600; color: #4a6080;
    cursor: pointer; background: white; transition: all 0.2s; font-family: inherit;
  }
  .app-tab.active, .app-tab:hover { background: #1e7ce8; color: white; border-color: #1e7ce8; }
  .apps-know {
    background: #1e7ce8; color: white; border: none; border-radius: 8px;
    padding: 11px 28px; font-size: 13.5px; font-weight: 700;
    cursor: pointer; font-family: inherit; transition: background 0.2s;
  }
  .apps-know:hover { background: #1565c0; }
  .apps-img { height: 400px; border-radius: 22px; overflow: hidden; box-shadow: 0 24px 64px rgba(10,37,80,0.16); }
  .apps-img img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* ── DOT-LINE NAV ── */
  .dl-nav { display: flex; align-items: center; justify-content: center; margin: 24px 0; }
  .dl-line { height: 2px; width: 52px; background: #c0d8ee; }
  .dl-btn {
    width: 32px; height: 32px; border-radius: 50%;
    border: 2px solid #1e7ce8; background: white;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    margin: 0 5px; transition: background 0.2s;
  }
  .dl-btn:hover { background: #1e7ce8; }
  .dl-btn:hover svg { stroke: white; }
  .dl-btn svg { width: 13px; height: 13px; stroke: #1e7ce8; fill: none; stroke-width: 2.2; stroke-linecap: round; }

  /* ── TEST SAMPLE ── */
  .sample-section { position: relative; z-index: 1; padding: 0 60px 72px; }
  .sample-card {
    max-width: 1160px; margin: 0 auto;
    background: linear-gradient(130deg, #d9eeff 0%, #c4e1ff 45%, #d8eeff 100%);
    border-radius: 28px; overflow: hidden;
    display: grid; grid-template-columns: 1fr 1.1fr;
    min-height: 560px; position: relative;
  }
  .sample-card::before {
    content: ''; position: absolute;
    bottom: -80px; left: -80px;
    width: 380px; height: 380px; border-radius: 50%;
    background: rgba(255,255,255,0.16); pointer-events: none;
  }
  .sample-mock-side {
    position: relative; display: flex;
    align-items: center; justify-content: center; padding: 40px;
    overflow: hidden;
  }
  .sample-single-img {
    width: 260px;
    filter: drop-shadow(0 28px 52px rgba(10,37,80,0.26));
    transition: transform 0.35s ease;
  }
  .sample-single-img:hover { transform: translateY(-10px) scale(1.03); }
  .sample-form-side { padding: 52px 52px 52px 28px; display: flex; flex-direction: column; justify-content: center; }
  .sample-form-side h2 {
    font-size: clamp(26px,3vw,38px); font-weight: 800;
    color: #0a2540; margin: 0 0 12px; letter-spacing: -0.02em;
  }
  .sample-form-side h2 em { font-style: normal; color: #1e7ce8; }
  .sample-form-side > p { font-size: 14.5px; color: #3a5878; line-height: 1.7; margin: 0 0 28px; }
  .s-form { display: flex; flex-direction: column; gap: 12px; }
  .s-input, .s-select, .s-textarea {
    width: 100%; padding: 12px 16px;
    border: 1.5px solid rgba(30,100,200,0.2); border-radius: 10px;
    font-size: 14px; color: #0a2540; background: rgba(255,255,255,0.82);
    outline: none; transition: border-color 0.2s, background 0.2s;
    font-family: 'DM Sans', sans-serif; appearance: none;
  }
  .s-input::placeholder, .s-textarea::placeholder { color: #7a98b8; }
  .s-input:focus, .s-select:focus, .s-textarea:focus { border-color: #1e7ce8; background: white; }
  .s-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231e7ce8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 14px center;
    padding-right: 36px; cursor: pointer;
  }
  .s-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .s-phone { display: grid; grid-template-columns: auto 1fr; gap: 8px; }
  .s-cc {
    display: flex; align-items: center; gap: 6px; padding: 12px 14px;
    border: 1.5px solid rgba(30,100,200,0.2); border-radius: 10px;
    background: rgba(255,255,255,0.82); font-size: 14px; font-weight: 600;
    color: #0a2540; cursor: pointer; white-space: nowrap;
    font-family: 'DM Sans', sans-serif; transition: border-color 0.2s;
  }
  .s-cc:hover { border-color: #1e7ce8; }
  .s-uploads { display: flex; gap: 10px; }
  .s-upload {
    flex: 1; display: flex; align-items: center; gap: 9px; padding: 12px 14px;
    border: 1.5px solid rgba(30,100,200,0.2); border-radius: 10px;
    background: rgba(255,255,255,0.82); font-size: 13px; color: #3a5878;
    cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500;
    transition: border-color 0.2s, background 0.2s;
  }
  .s-upload:hover { border-color: #1e7ce8; background: white; }
  .s-upload svg { width: 17px; height: 17px; flex-shrink: 0; }
  .s-textarea { min-height: 88px; resize: vertical; }
  .s-check { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #3a5878; }
  .s-check input { width: 15px; height: 15px; cursor: pointer; accent-color: #1e7ce8; }
  .s-submit {
    background: #0a2540; color: white; border: none; border-radius: 40px;
    padding: 14px 40px; font-size: 14px; font-weight: 700;
    cursor: pointer; letter-spacing: 0.08em; text-transform: uppercase;
    font-family: 'DM Sans', sans-serif; transition: background 0.2s, transform 0.15s;
    align-self: center; margin-top: 4px;
  }
  .s-submit:hover { background: #1e7ce8; transform: translateY(-1px); }

  /* ── VIDEO ── */
  .video-wrap { position: relative; z-index: 1; padding: 0 60px 72px; }
  .video-card {
    border-radius: 24px; overflow: hidden;
    min-height: 420px; position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  .video-card > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .video-dim { position: absolute; inset: 0; background: rgba(5,20,45,0.44); }
  .video-play {
    position: relative; z-index: 2; width: 80px; height: 80px; border-radius: 50%;
    background: rgba(255,255,255,0.18); border: 2px solid rgba(255,255,255,0.7);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; backdrop-filter: blur(6px); transition: background 0.2s, transform 0.2s;
  }
  .video-play:hover { background: rgba(255,255,255,0.32); transform: scale(1.1); }
  .video-play svg { width: 30px; height: 30px; margin-left: 5px; }
  .video-arrows {
    position: absolute; bottom: 24px; right: 32px; z-index: 3; display: flex; gap: 10px;
  }
  .vid-arrow {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.4);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; backdrop-filter: blur(4px); transition: background 0.2s;
  }
  .vid-arrow:hover { background: rgba(255,255,255,0.3); }
  .vid-arrow svg { width: 13px; height: 13px; stroke: white; fill: none; stroke-width: 2; stroke-linecap: round; }

  /* ── STANDARDS ── */
  .std-section {
    position: relative; z-index: 1; padding: 80px 60px 56px;
    background: linear-gradient(180deg, #ffffff 0%, #eef6ff 50%, #f6fbff 100%);
    text-align: center;
  }
  .std-section h2 {
    font-size: clamp(26px,4vw,46px); font-weight: 800;
    color: #0a2540; margin-bottom: 14px; letter-spacing: -0.02em;
  }
  .std-section h2 em { font-style: normal; color: #1e7ce8; }
  .std-section > p { font-size: 15px; color: #4a6080; max-width: 600px; margin: 0 auto 52px; line-height: 1.8; }
  .std-badges { display: flex; justify-content: center; align-items: stretch; gap: 16px; flex-wrap: wrap; max-width: 900px; margin: 0 auto 36px; }
  .std-badge {
    border: 1.5px solid #c8ddf0; border-radius: 16px; padding: 24px 20px; width: 152px;
    display: flex; flex-direction: column; align-items: center; gap: 14px;
    background: white; box-shadow: 0 2px 12px rgba(10,37,80,0.05);
    transition: box-shadow 0.22s, transform 0.22s; cursor: default;
  }
  .std-badge:hover { box-shadow: 0 10px 32px rgba(30,124,232,0.14); transform: translateY(-3px); }
  .std-badge-img { height: 54px; display: flex; align-items: center; justify-content: center; }
  .std-badge-sub { font-size: 12px; color: #4a6080; font-weight: 500; text-align: center; line-height: 1.4; }

  /* ── MATERIAL ── */
  .mat-section { position: relative; z-index: 1; padding: 72px 60px; background: white; }
  .mat-inner { max-width: 1100px; margin: 0 auto; }
  .acc-item { border-bottom: 1.5px solid #d8e8f4; }
  .acc-hdr {
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 0; cursor: pointer;
    font-size: 15.5px; font-weight: 700; color: #0a2540;
    transition: color 0.2s; user-select: none;
  }
  .acc-hdr:hover, .acc-hdr.open { color: #1e7ce8; }
  .acc-icon {
    width: 30px; height: 30px; border-radius: 50%; border: 2px solid #1e7ce8;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: transform 0.3s; color: #1e7ce8;
  }
  .acc-icon.open { transform: rotate(45deg); }
  .acc-body { overflow: hidden; max-height: 0; transition: max-height 0.38s ease; }
  .acc-body.open { max-height: 300px; }
  .acc-inner { padding-bottom: 24px; }
  .acc-item.active .acc-inner { background: #eef5ff; border-radius: 10px; padding: 18px 22px 22px; }
  .acc-inner p { font-size: 13.5px; color: #4a6080; line-height: 1.85; margin: 0; }

  /* ── CTA ── */
  .cta-wrap { position: relative; z-index: 1; margin: 0 60px 80px; }
  .cta-card {
    border-radius: 24px; overflow: hidden;
    min-height: 360px; display: flex; align-items: center; position: relative;
  }
  .cta-card > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .cta-dim {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(5,20,60,0.82) 0%, rgba(10,37,80,0.42) 60%, transparent 100%);
  }
  .cta-body { position: relative; z-index: 2; padding: 56px 64px; color: white; }
  .cta-body h2 {
    font-size: clamp(28px,4vw,48px); font-weight: 800;
    line-height: 1.1; margin-bottom: 28px; letter-spacing: -0.02em;
  }
  .cta-body h2 em { font-style: normal; color: #4db6f0; }
  .cta-body button {
    background: white; color: #0a2540; border: none; border-radius: 8px;
    padding: 12px 28px; font-size: 13px; font-weight: 700;
    cursor: pointer; font-family: inherit; letter-spacing: 0.06em; text-transform: uppercase;
    transition: background 0.2s, color 0.2s;
  }
  .cta-body button:hover { background: #4db6f0; color: white; }

  /* ── REVEAL ── */
  .sr { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .sr.vis { opacity: 1; transform: none; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .sol-hero-img-card { height: 280px; }
    .sol-hero-text { padding: 18px 60px 22px 20px; }
    .sol-hero-text h1 { white-space: normal; font-size: 22px; }
    .apps-inner { grid-template-columns: 1fr; gap: 24px; }
    .tech-grid { grid-template-columns: 1fr; }
    .sample-card { grid-template-columns: 1fr; }
    .tech-section, .support-section, .apps-section, .sample-section,
    .video-wrap, .mat-section { padding-left: 28px; padding-right: 28px; }
    .std-section { padding: 60px 28px; }
    .cta-wrap { margin-left: 20px; margin-right: 20px; }
  }
  @media (max-width: 580px) {
    .sol-hero-img-card { height: 200px; margin: 8px 8px 0 6px; }
    .sol-hero-text { padding: 14px 50px 18px 16px; }
    .sol-hero-text h1 { font-size: 18px; }
    .sol-hero-bottom { height: 40px; }
    .s-row { grid-template-columns: 1fr; }
    .s-uploads { flex-direction: column; }
    .cta-body { padding: 36px 24px; }
    .support-body { padding: 32px 28px; }
  }
`;

const SUPPORT_SLIDES = [
  {
    img: "/Solutions/technical_assisitant.png",
    title: "Technical Assistance",
    desc: "Our expert team supports you through every stage — from line integration to production ramp-up and beyond.",
  },
  {
    img: "/Solutions/machines.png",
    title: "On-Site Training",
    desc: "We train your operators directly on your floor so your team runs V-Shapes machines with confidence from day one.",
  },
  {
    img: "/Solutions/smarter.jpg",
    title: "Remote Monitoring",
    desc: "Connect with our engineers remotely for rapid diagnostics, live updates, and real-time troubleshooting.",
  },
];

const APP_TABS = [
  {
    label: "Food",
    img: "/Solutions/food.jpg",
    desc: "Our packaging solutions are designed for recyclability, with an ongoing shift toward Nomo polymer structures for easier recycling — ideal for sauces, condiments, oils, and single-serve food portions.",
  },
  {
    label: "Pharma",
    img: "/Solutions/smarter.jpg",
    desc: "Precise, hygienic single-dose packaging for pharmaceuticals, nutraceuticals, and supplements — built for clinical accuracy and patient compliance.",
  },
  {
    label: "Cosmetics",
    img: "/Solutions/get_in_touch.jpg",
    desc: "Elegant, tamper-evident packs for serums, creams, and personal care — with zero product residue by design.",
  },
  {
    label: "Beverages",
    img: "/Solutions/food.jpg",
    desc: "Compact, portable, and precise — ideal for coffee shots, energy drinks, and flavor concentrates that demand premium presentation.",
  },
];

const ACCORDION = [
  {
    title: "Material Usage",
    body: "Designed with a clear material direction, supporting recyclability today and enabling simpler recovery pathways across future packaging systems. We work with mono-material structures wherever possible.",
  },
  {
    title: "Use Efficiency",
    body: "V-Shapes packaging is engineered for complete product dispensing — no residue, no waste. Every pack opens cleanly and empties fully, reducing product loss across millions of units.",
  },
  {
    title: "Standards & Certification",
    body: "Our processes and materials comply with international food-contact, pharmaceutical, and sustainability standards including CE, GMP, and FDA requirements — validated at every production stage.",
  },
];

const UL_LOGO = () => (
  <svg
    viewBox="0 0 54 54"
    width="54"
    height="54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="27"
      cy="27"
      r="24.5"
      stroke="#d32f2f"
      strokeWidth="3.5"
      fill="white"
    />
    <circle
      cx="27"
      cy="27"
      r="19"
      stroke="#d32f2f"
      strokeWidth="1.2"
      fill="none"
    />
    <text
      x="27"
      y="34"
      textAnchor="middle"
      fontFamily="'Arial Black',sans-serif"
      fontWeight="900"
      fontSize="19"
      fill="#d32f2f"
    >
      UL
    </text>
    <text
      x="27"
      y="45"
      textAnchor="middle"
      fontFamily="Arial,sans-serif"
      fontSize="6"
      fill="#d32f2f"
    >
      ®
    </text>
  </svg>
);

const CSA_LOGO = () => (
  <svg
    viewBox="0 0 54 54"
    width="54"
    height="54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="27"
      cy="27"
      r="24.5"
      stroke="#1565c0"
      strokeWidth="3"
      fill="white"
    />
    <path
      d="M27 10 A17 17 0 0 0 10 27"
      stroke="#1565c0"
      strokeWidth="2.5"
      fill="none"
    />
    <path
      d="M27 44 A17 17 0 0 0 44 27"
      stroke="#1565c0"
      strokeWidth="2.5"
      fill="none"
    />
    <text
      x="27"
      y="33"
      textAnchor="middle"
      fontFamily="'Arial Black',sans-serif"
      fontWeight="900"
      fontSize="14"
      fill="#1565c0"
    >
      CSA
    </text>
  </svg>
);

const FDA_LOGO = () => (
  <svg
    viewBox="0 0 72 42"
    width="72"
    height="42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="2"
      y="36"
      fontFamily="'Arial Black',sans-serif"
      fontWeight="900"
      fontSize="38"
      fill="#1565c0"
      letterSpacing="-1"
    >
      FDA
    </text>
  </svg>
);

const GSA_LOGO = () => (
  <svg
    viewBox="0 0 72 54"
    width="72"
    height="54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="0"
      y="32"
      fontFamily="'Arial Black',sans-serif"
      fontWeight="900"
      fontSize="30"
      fill="#1e7ce8"
      letterSpacing="1"
    >
      GSA
    </text>
    <text
      x="0"
      y="46"
      fontFamily="Arial,sans-serif"
      fontWeight="700"
      fontSize="9.5"
      fill="#1e7ce8"
      letterSpacing="2.5"
    >
      CERTIFIED
    </text>
    <polygon
      points="60,2 63,10 72,10 65,16 68,24 60,19 52,24 55,16 48,10 57,10"
      fill="#1e7ce8"
      transform="translate(-48,-2) scale(1)"
    />
  </svg>
);

const COMP_LOGO = () => (
  <svg
    viewBox="0 0 54 54"
    width="54"
    height="54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="27"
      cy="27"
      r="24.5"
      stroke="#2e7d32"
      strokeWidth="2"
      fill="white"
    />
    <text x="27" y="34" textAnchor="middle" fontSize="24" fill="#2e7d32">
      ♻
    </text>
  </svg>
);

const DotLineNav = () => (
  <div className="dl-nav">
    <div className="dl-line" />
    <button className="dl-btn" aria-label="Previous">
      <svg viewBox="0 0 13 13">
        <polyline points="9,2 4,6.5 9,11" />
      </svg>
    </button>
    <button className="dl-btn" aria-label="Next">
      <svg viewBox="0 0 13 13">
        <polyline points="4,2 9,6.5 4,11" />
      </svg>
    </button>
    <div className="dl-line" />
  </div>
);

export default function Solutions() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [openAcc, setOpenAcc] = useState(0);

  useEffect(() => {
    const id = "solutions-css-v4";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = SOLUTIONS_CSS;
      document.head.appendChild(el);
    }
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        }),
      { threshold: 0.07 },
    );
    document.querySelectorAll(".sr").forEach((el) => obs.observe(el));
    const timer = setInterval(
      () => setActiveSlide((p) => (p + 1) % SUPPORT_SLIDES.length),
      4200,
    );
    return () => {
      obs.disconnect();
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="sol-root">
      <div className="sol-bg-wave" />

      {/* ANNOUNCE */}
      <div className="sol-announce">
        Lorem ipsum is a dummy or placeholder text commonly used in graphic
        design
      </div>

      {/* HERO */}
      <section className="sol-hero">
        {/* Floating image card — inset gaps top/left/right, text panel sits on top of it */}
        <div className="sol-hero-img-card">
          <img src="/Solutions/smarter.jpg" alt="V-Shapes packaging operator" />
          {/* White diagonal text panel anchored to bottom-left of the image */}
          <div className="sol-hero-text">
            <h1>
              <em>A Smarter Way</em> to
              <br />
              Build Packaging
            </h1>
          </div>
        </div>
        {/* Light bg strip visible below the image card */}
        <div className="sol-hero-bottom" />
      </section>

      <hr className="sol-divider" />

      {/* INTRO */}
      <div className="sol-intro sr">
        <p>
          V-Shapes is a patented packaging platform designed to help brands
          rethink how single-serve products are opened, used, and produced at
          scale.
        </p>
      </div>

      {/* TECHNOLOGY */}
      <section className="tech-section">
        <h2 className="sol-stitle sr">
          <em>Technology</em> That Delivers
        </h2>
        <div className="tech-banner sr">
          <img src="/Solutions/machines.png" alt="V-Shapes Packaging Machine" />
          <div className="tech-dark-side" />
          <div className="tech-light-side" />
          <div className="tech-left-body">
            <h3>Machines</h3>
            <p>
              This automatic packaging machine is equipped to produce
              single-serve packs with industry 4.0 ready technology.
            </p>
            <button className="tech-btn">Know More</button>
          </div>
          <div className="tech-right-body">
            <h3>Co-Packaging</h3>
          </div>
        </div>
        <DotLineNav />
      </section>

      {/* WE'VE GOT YOUR BACK */}
      <section className="support-section">
        <h2 className="sol-stitle sr">
          We've <em>Got</em> Your Back
        </h2>
        <div className="support-card sr">
          <img
            src={SUPPORT_SLIDES[activeSlide].img}
            alt={SUPPORT_SLIDES[activeSlide].title}
          />
          <div className="support-card-overlay" />
          <div className="support-body">
            <h3>{SUPPORT_SLIDES[activeSlide].title}</h3>
            <p>{SUPPORT_SLIDES[activeSlide].desc}</p>
          </div>
          <div className="support-side-nav">
            {SUPPORT_SLIDES.map((_, i) => (
              <div
                key={i}
                className={`s-dot${activeSlide === i ? " active" : ""}`}
                onClick={() => setActiveSlide(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ONE PLATFORM */}
      <section className="apps-section">
        <div className="apps-inner sr">
          <div>
            <div className="apps-label">{APP_TABS[activeTab].label}</div>
            <div className="apps-heading">
              One Platform.
              <br />
              <em>Multiple Applications</em>
            </div>
            <p className="apps-desc">{APP_TABS[activeTab].desc}</p>
            <div className="apps-tabs">
              {APP_TABS.map((t, i) => (
                <button
                  key={t.label}
                  className={`app-tab${activeTab === i ? " active" : ""}`}
                  onClick={() => setActiveTab(i)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <button className="apps-know">Know More</button>
          </div>
          <div className="apps-img">
            <img
              src={APP_TABS[activeTab].img}
              alt={APP_TABS[activeTab].label}
            />
          </div>
        </div>
        <DotLineNav />
      </section>

      {/* TEST SAMPLE */}
      <section className="sample-section">
        <div className="sample-card sr">
          <div className="sample-mock-side">
            <img
              className="sample-single-img"
              src="/Solutions/sample.png"
              alt="V-Shapes Pack"
            />
          </div>
          <div className="sample-form-side">
            <h2>
              Get A <em>Test Sample</em>
            </h2>
            <p>
              Choose from a spectrum of sizes and designs to get custom-made
              single-serve packs that suit your brand requirements.
            </p>
            <div className="s-form">
              <input className="s-input" placeholder="Name *" />
              <input className="s-input" type="email" placeholder="Email *" />
              <div className="s-phone">
                <div className="s-cc">
                  <span style={{ fontSize: 18 }}>🇮🇳</span>
                  <span>+91</span>
                  <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                    <path
                      d="M1 1l4 4 4-4"
                      stroke="#1e7ce8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <input className="s-input" placeholder="Mobile *" />
              </div>
              <div className="s-row">
                <select className="s-select">
                  <option>Select Pack Size</option>
                  <option>5ml</option>
                  <option>10ml</option>
                  <option>15ml</option>
                  <option>20ml</option>
                </select>
                <select className="s-select">
                  <option>Select Filling Capacity</option>
                  <option>Liquid</option>
                  <option>Gel</option>
                  <option>Powder</option>
                </select>
              </div>
              <select className="s-select">
                <option>Select Product Type</option>
                <option>Food</option>
                <option>Pharma</option>
                <option>Cosmetics</option>
                <option>Beverages</option>
              </select>
              <div className="s-uploads">
                <button className="s-upload">
                  <svg
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="#1e7ce8"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  >
                    <path d="M9 12V4M6 7l3-3 3 3" />
                    <path d="M3 15h12" />
                  </svg>
                  Upload Your Own Design Front
                </button>
                <button className="s-upload">
                  <svg
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="#1e7ce8"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  >
                    <path d="M9 12V4M6 7l3-3 3 3" />
                    <path d="M3 15h12" />
                  </svg>
                  Upload Your Own Design Back
                </button>
              </div>
              <textarea
                className="s-textarea"
                placeholder="Share Any Extra Details Here"
              />
              <label className="s-check">
                <input type="checkbox" />I have read and agree to the Privacy
                Policy
              </label>
              <button className="s-submit">SUBMIT</button>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <div className="video-wrap">
        <div className="video-card sr">
          <img src="/Solutions/video_bg.png" alt="V-Shapes machine" />
          <div className="video-dim" />
          <div className="video-play">
            <svg viewBox="0 0 30 30" fill="white">
              <polygon points="8,4 26,15 8,26" />
            </svg>
          </div>
          <div className="video-arrows">
            <div className="vid-arrow">
              <svg viewBox="0 0 13 13">
                <polyline points="9,2 4,6.5 9,11" />
              </svg>
            </div>
            <div className="vid-arrow">
              <svg viewBox="0 0 13 13">
                <polyline points="4,2 9,6.5 4,11" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* GLOBAL STANDARDS */}
      <section className="std-section sr">
        <h2>
          Validated by <em>Global Standards</em>
        </h2>
        <p>
          Brands work with V-Shapes to create packaging that is easier to use,
          <br />
          more inclusive by design, and built to scale responsibly
        </p>
        <div className="std-badges">
          {[
            { Logo: UL_LOGO, sub: "UL Standard" },
            { Logo: CSA_LOGO, sub: "CSA Standard" },
            { Logo: FDA_LOGO, sub: "FDA Standard" },
            { Logo: GSA_LOGO, sub: "GSA Certificates" },
            { Logo: COMP_LOGO, sub: "Compostable Packaging" },
          ].map(({ Logo, sub }) => (
            <div className="std-badge" key={sub}>
              <div className="std-badge-img">
                <Logo />
              </div>
              <div className="std-badge-sub">{sub}</div>
            </div>
          ))}
        </div>
        <DotLineNav />
      </section>

      {/* MATERIAL & SUSTAINABILITY */}
      <section className="mat-section">
        <div className="mat-inner sr">
          <h2 className="sol-stitle" style={{ textAlign: "left" }}>
            Material &amp; <em>Sustainability</em>
          </h2>
          {ACCORDION.map((item, i) => (
            <div
              key={i}
              className={`acc-item${openAcc === i ? " active" : ""}`}
            >
              <div
                className={`acc-hdr${openAcc === i ? " open" : ""}`}
                onClick={() => setOpenAcc(openAcc === i ? -1 : i)}
              >
                {item.title}
                <div className={`acc-icon${openAcc === i ? " open" : ""}`}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  >
                    <line x1="6" y1="1" x2="6" y2="11" />
                    <line x1="1" y1="6" x2="11" y2="6" />
                  </svg>
                </div>
              </div>
              <div className={`acc-body${openAcc === i ? " open" : ""}`}>
                <div className="acc-inner">
                  <p>{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-wrap sr">
        <div className="cta-card">
          <img
            src="/Solutions/get_in_touch.jpg"
            alt="Build Better Packaging Together"
          />
          <div className="cta-dim" />
          <div className="cta-body">
            <h2>
              Build <em>Better</em>
              <br />
              Packaging Together
            </h2>
            <button>GET IN TOUCH</button>
          </div>
        </div>
      </div>
    </div>
  );
}
