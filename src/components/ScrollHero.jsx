import { useEffect, useRef, useState } from 'react';
import './ScrollHero.css';

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function lerp(a, b, t) { return a + (b - a) * clamp(t, 0, 1); }
function range(v, a, b) { return clamp((v - a) / (b - a), 0, 1); }
function eio(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
function eout(t) { return 1 - Math.pow(1 - clamp(t, 0, 1), 3); }

export default function ScrollHero({ onProgress }) {
  const hwRef = useRef(null);
  const imgRef = useRef(null);
  const dTRef = useRef(null);
  const mDRef = useRef(null);
  const dARef = useRef(null);
  const hTRef = useRef(null);
  const sHRef = useRef(null);
  const ripFiredRef = useRef(false);

  function fireRipples() {
    ['rr1', 'rr2', 'rr3'].forEach((id, i) => {
      const r = document.getElementById(id);
      if (!r) return;
      r.style.transition = 'none';
      r.style.width = '0';
      r.style.height = '0';
      r.style.opacity = '0.75';
      r.style.marginLeft = '0';
      r.style.marginTop = '0';
      setTimeout(() => {
        r.style.transition = 'all 1.2s ease-out';
        r.style.width = '120px';
        r.style.height = '38px';
        r.style.opacity = '0';
        r.style.marginLeft = '-60px';
        r.style.marginTop = '-19px';
      }, i * 240);
    });
  }

  useEffect(() => {
    function onScroll() {
      const hw = hwRef.current;
      if (!hw) return;
      const top = hw.getBoundingClientRect().top;
      const total = hw.offsetHeight - window.innerHeight;
      const scrolled = -top;
      const p = clamp(scrolled / total, 0, 1);

      if (onProgress) onProgress(p);

      const img = imgRef.current;
      const dT = dTRef.current;
      const mD = mDRef.current;
      const dA = dARef.current;
      const hT = hTRef.current;
      const sH = sHRef.current;

      if (sH) sH.classList.toggle('hidden', p > 0.06);

      if (img) {
        const sq = eio(range(p, 0.15, 0.5));
        const scY = lerp(1, 1.18, sq);
        const scX = lerp(1, 0.9, sq);
        img.style.transform = `scaleX(${scX}) scaleY(${scY})`;
        img.style.opacity = lerp(1, 0.85, sq);
      }

      if (dT) {
        const dt = eout(range(p, 0.48, 0.65));
        dT.style.height = lerp(0, 60, dt) + 'px';
        dT.style.opacity = dt > 0.01 ? 1 : 0;
      }

      if (mD && dA) {
        const dp = eio(range(p, 0.62, 0.85));
        const sz = lerp(0, 118, dp);
        mD.style.width = sz + 'px';
        mD.style.height = sz * 1.3 + 'px';
        mD.style.opacity = dp > 0.01 ? 1 : 0;

        const fall = lerp(0, 36, eout(range(p, 0.7, 0.88)));
        dA.style.transform = `translateX(-50%) translateY(${fall}px)`;
      }

      if (hT) {
        const tp = range(p, 0.83, 1.0);
        hT.classList.toggle('shown', tp > 0.18);

        if (tp > 0.02 && !ripFiredRef.current) {
          ripFiredRef.current = true;
          fireRipples();
        }
        if (tp < 0.01) ripFiredRef.current = false;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onProgress]);

  return (
    <div className="hero-wrapper" id="heroWrapper" ref={hwRef}>
      <div className="hero-sticky">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>

        <div className="packet-scene" id="packetScene">
          <img
            src="/squeeze.png"
            alt="V-Shapes open"
            className="open-pack-img"
            ref={imgRef}
          />

          <div className="drop-assembly" id="dropAssembly" ref={dARef}>
            <div className="drip-thread" ref={dTRef}></div>
            <svg
              className="main-drop"
              ref={mDRef}
              viewBox="0 0 100 130"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="dg" cx="33%" cy="28%" r="72%">
                  <stop offset="0%" stopColor="#bae6fd" />
                  <stop offset="38%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0369a1" />
                </radialGradient>
                <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              <path d="M50 4 C50 4,6 58,6 86 C6 113,26 128,50 128 C74 128,94 113,94 86 C94 58,50 4,50 4Z" fill="url(#dg)" />
              <path d="M50 4 C50 4,6 58,6 86 C6 113,26 128,50 128 C74 128,94 113,94 86 C94 58,50 4,50 4Z" fill="url(#shine)" opacity="0.42" />
              <ellipse cx="34" cy="52" rx="13" ry="22" fill="rgba(255,255,255,0.35)" transform="rotate(-22 34 52)" />
              <ellipse cx="40" cy="38" rx="5" ry="9" fill="rgba(255,255,255,0.55)" transform="rotate(-22 40 38)" />
            </svg>
            <div className="ripple-ring" id="rr1"></div>
            <div className="ripple-ring" id="rr2"></div>
            <div className="ripple-ring" id="rr3"></div>
          </div>
        </div>

        <div className="hero-text" id="heroText" ref={hTRef}>
          <h1>The <em>V-Shapes</em> Advantage</h1>
          <p>
            A patented single-serve format that changes how packaging is
            experienced — fold, snap, squeeze. One motion. Zero waste.
          </p>
          <div className="hero-cta">
            <button className="btn-primary">Request a Sample</button>
            <button className="btn-outline">Learn More</button>
          </div>
        </div>

        <div className="scroll-hint" id="scrollHint" ref={sHRef}>
          <div className="scroll-arrow"></div>
          Scroll to reveal
        </div>
      </div>
    </div>
  );
}
