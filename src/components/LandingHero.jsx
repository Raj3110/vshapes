import './LandingHero.css';

export default function LandingHero() {
  return (
    <section className="landing-hero">
      <div className="swirl"></div>
      <div className="swirl"></div>
      <div className="swirl"></div>
      <div className="blob blob-1" style={{ opacity: 0.18 }}></div>
      <div className="blob blob-2" style={{ opacity: 0.14 }}></div>

      <div className="lh-content">
        <h1>Better packaging<br />starts here.</h1>
        <p>
          At first glance, it's a pack. At first use, it's something else
          entirely. Powered by patented snap technology, V-Shapes creates a
          simpler, single-handed way to open, use and move on — effortlessly.
        </p>
        <button className="btn-sample">Request for Sample</button>
      </div>

      <div className="lh-product">
        <img src="/packet.png" alt="V-Shapes single-serve packaging" />
      </div>

      <div className="lh-scroll">
        <div className="lh-scroll-line"></div>
        Scroll to explore
      </div>
    </section>
  );
}
