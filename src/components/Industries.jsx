import { useState } from 'react';
import './Industries.css';

export default function Industries() {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section className="industries reveal">
      <div className="ind-grid">
        <div className="ind-content">
          <h2>Customized Packaging Solutions for Diverse Industries</h2>
          <span className="ind-label">Personal Care</span>
          <p>
            V-Shapes provides customized packaging solutions tailored to the
            unique requirements of diverse industries
          </p>
          <button className="btn-outline">Know More</button>
          <div className="dots">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`dot${activeDot === i ? ' active' : ''}`}
                onClick={() => setActiveDot(i)}
              />
            ))}
          </div>
        </div>
        <div className="ind-visual">
          <div className="ind-card">
            <img src="/couple.jpg" alt="Personal Care" />
            <div className="ind-card-label">Personal Care</div>
          </div>
          <div className="badge">
            <span style={{ fontSize: '20px' }}>💧</span>
            <span>V-Shapes</span>
          </div>
        </div>
      </div>
    </section>
  );
}
