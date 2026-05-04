import { useEffect, useRef } from 'react';
import './Advantage.css';

const leftCards = [
  { icon: '✈️', h: 'Convenience Reimagined', p: 'One-hand use: Fold, Snap, Squeeze' },
  { icon: '🛡️', h: 'Premium Brand Appeal', p: 'Sleek, premium and interactive design', feat: true },
  { icon: '🤝', h: 'Inclusive by Design', p: 'For users of all ages and abilities' },
];
const rightCards = [
  { icon: '♻️', h: 'Optimized for Sustainability', p: 'Recyclable materials, no tear-off litter' },
  { icon: '🔒', h: 'Protects Your Brand', p: 'Fight fakes, build consumer trust' },
  { icon: '🌐', h: 'Globally-Patented Innovation', p: 'Secured worldwide to enable confident adoption across industries' },
];

function AdvCard({ card, index }) {
  return (
    <div
      className={`adv-card${card.feat ? ' feat' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="adv-icon">{card.icon}</div>
      <div>
        <div className="adv-h">{card.h}</div>
        <div className="adv-p">{card.p}</div>
      </div>
    </div>
  );
}

export default function Advantage() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.adv-card');
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          cards?.forEach((c, i) => setTimeout(() => c.classList.add('vis'), i * 90));
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="advantage" id="secAdv" ref={sectionRef}>
      <div className="section-title reveal">The <em>V-Shapes</em> Advantage</div>
      <div className="adv-grid">
        <div className="adv-col">
          {leftCards.map((c, i) => <AdvCard key={i} card={c} index={i} />)}
        </div>
        <div className="center-drop-wrap">
          <img src="/tear.png" alt="V-Shapes drop" />
        </div>
        <div className="adv-col">
          {rightCards.map((c, i) => <AdvCard key={i} card={c} index={i} />)}
        </div>
      </div>
    </section>
  );
}
