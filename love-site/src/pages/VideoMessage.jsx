import "./VideoMessage.css";

export default function VideoMessage({ onNext, onRestart }) {
  return (
    <main className="page video-page">
      <section className="card video-card">
        <span className="video-sticker">♡ made with love ♡</span>

        <h1 className="script">A little message for you</h1>

        <p className="caption">Press play... this one's just for you 🎀</p>

        <div className="video-frame">
          <div className="video-frame-inner">
            <video
              className="love-video"
              controls
              playsInline
              preload="metadata"
              poster="/images/video-poster.jpg"
            >
              <source src="/images/love-video.mp4" type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </div>
          <span className="frame-heart heart-one">♥</span>
          <span className="frame-heart heart-two">♡</span>
          <span className="frame-sparkle sparkle-one">✧</span>
          <span className="frame-sparkle sparkle-two">✦</span>
        </div>

        <div className="video-note">
          <p className="script">Save a little place for me in your heart ♡</p>
        </div>

        <button className="btn video-btn" onClick={onNext}>
          Read your letter 💌
        </button>

        <button className="video-back" onClick={onRestart}>
          Start again ↺
        </button>
      </section>
    </main>
  );
}
