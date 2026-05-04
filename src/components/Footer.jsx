import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer style={{ position: 'relative', color: 'rgba(255,255,255,0.55)', padding: '60px 60px 28px', overflow: 'hidden' }}>
      
      {/* Looping video background */}
      <video
        autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      >
        <source src="/footer.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10, 20, 40, 0.82)', zIndex: 1 }} />

      {/* Footer content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 40, marginBottom: 44 }}>

          {/* Brand */}
          <div>
            <img src="/logo.png" alt="V-Shapes" style={{ height: 52, width: 'auto', marginBottom: 14, filter: 'brightness(0) invert(1)' }} />
            <p style={{ fontSize: 12, lineHeight: 1.8 }}>
              CP ITALY S.r.l.<br />Via Felsinistica, 25/B, 40122 Bologna, Italy<br />
              Email: packaging-eu@v-shapes.com<br /><br />
              CP ITALY S.r.l. is a wholly owned subsidiary of Central Print Ltd<br />
              C-105, Andheri (East), Mumbai 400059, India<br />
              Email: packaging-in@v-shapes.com
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: 'white', marginBottom: 14, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Links</h4>
            {['Home','About Us','Sustainability','Solutions','Industry','News & Events','Contact'].map(l => (
              <a key={l} href="#" style={{ display: 'block', fontSize: 12.5, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: 8 }}
                onMouseEnter={e => e.target.style.color = 'var(--blue-light)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
              >{l}</a>
            ))}
          </div>

          {/* Help */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: 'white', marginBottom: 14, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Help</h4>
            {['Privacy Policy','Cookie Policy','Terms & Conditions','Legal'].map(l => (
              <a key={l} href="#" style={{ display: 'block', fontSize: 12.5, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: 8 }}
                onMouseEnter={e => e.target.style.color = 'var(--blue-light)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
              >{l}</a>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: 'white', marginBottom: 14, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Newsletter</h4>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <input
                type="email" placeholder="Enter Your Email Address" value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ flex: 1, padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.07)', color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: 12, outline: 'none' }}
              />
              <button style={{ padding: '9px 14px', background: 'var(--blue-accent)', border: 'none', borderRadius: 8, color: 'white', fontSize: 11.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                Subscribe
              </button>
            </div>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: 'white', marginBottom: 0, letterSpacing: '0.07em', textTransform: 'uppercase', marginTop: 22 }}>Social Media</h4>
            <div style={{ display: 'flex', gap: 9, marginTop: 16 }}>
              {['f','📷','𝕏','in','▶'].map((s, i) => (
                <div key={i} style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue-accent)'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                >{s}</div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', fontSize: 11.5 }}>
          <span>©2025 Acme. All rights reserved</span>
          <span>V-Shapes™ — Patented Packaging Innovation</span>
        </div>
      </div>
    </footer>
  );
}