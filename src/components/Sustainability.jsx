import './Sustainability.css';

export default function Sustainability() {
  return (
    <section className="sustain">
      <div className="sustain-bg">
        <img src="/trees.jpg" alt="Forest" />
      </div>
      <div className="sustain-overlay"></div>
      <div className="sustain-card reveal">
        <h2><em>Better Design</em> Leaves Less Behind</h2>
        <p>
          Thoughtfully designed formats that reduce waste, improve use, and
          support more responsible packaging at scale.
        </p>
        <button className="btn-green">
          Read More About Our Sustainability Approach
        </button>
      </div>
    </section>
  );
}
