import { Play } from 'lucide-react';
import { tour } from './data.js';

/* Convierte un enlace de YouTube (watch, youtu.be o shorts) en su dirección para insertar */
function youtubeEmbed(url) {
  const m = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0` : null;
}

export default function Tour() {
  const yt = tour.youtube ? youtubeEmbed(tour.youtube) : null;
  return (
    <section className="section" aria-labelledby="tour-t">
      <div className="wrap tour">
        <p className="eyebrow">Tour</p>
        <h1 id="tour-t" className="title">Recorra El Doral <em>en video.</em></h1>
        <p className="muted tour__text">Un recorrido por la entrada, las áreas verdes, el kiosco y los bloques del condominio.</p>

        <div className="tour__frame">
          {yt ? (
            <iframe src={yt} title="Tour en video del Condominio El Doral" loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen />
          ) : tour.video ? (
            <video src={tour.video} poster={tour.poster || undefined} controls playsInline preload="metadata">
              Su navegador no puede reproducir este video.
            </video>
          ) : (
            <div className="tour__empty" style={tour.poster ? { '--poster': `url(${tour.poster})` } : undefined}>
              <span className="tour__veil" aria-hidden="true" />
              <span className="teaser__play" aria-hidden="true"><Play size={26} fill="currentColor" /></span>
              <p>El video del recorrido estará disponible muy pronto.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
