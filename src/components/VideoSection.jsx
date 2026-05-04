import './VideoSection.css';

export default function VideoSection() {
  return (
    <section className="video-section reveal">
      <div className="two-col">
        <div className="video-thumb">
          <img src="/squeeze.png" alt="V-Shapes in use" />
          <div className="play-btn">&#9658;</div>
        </div>
        <div className="col-content">
          <h2>The world is ready<br />to <em>use better</em></h2>
          <p>
            V-Shapes introduces a patented format that changes how single-serve
            packaging is used. A simple fold, a controlled snap, and a natural
            squeeze come together in one intuitive, single-handed action.
            Designed to feel effortless from the very first use.
          </p>
          <button className="btn-outline">Request for Sample</button>
        </div>
      </div>
    </section>
  );
}
