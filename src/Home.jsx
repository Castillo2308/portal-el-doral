import { Link } from 'react-router-dom';
import { ArrowRight, Trash2, Moon, DoorOpen, Bike, Play, Lock, Building2, ShieldCheck, Trees, LayoutGrid } from 'lucide-react';
import { condominio, fotos, instalaciones, proyectos, tour } from './data.js';
import { useAuth } from './auth.jsx';
import { useLogin } from './LoginModal.jsx';

/* El Doral en cifras */
export function Cifras() {
  const datos = [
    { I: Building2, v: condominio.filiales, l: 'filiales' },
    { I: LayoutGrid, v: condominio.bloques, l: 'bloques residenciales' },
    { I: ShieldCheck, v: '24/7', l: 'portería y control de acceso' },
    { I: Trees, v: instalaciones.length, l: 'instalaciones y servicios' },
  ];
  return (
    <section className="numbers" aria-label="El Doral en cifras">
      <div className="wrap numbers__inner">
        {datos.map(({ I, v, l }) => (
          <div key={l} className="numbers__item">
            <I size={22} strokeWidth={1.5} aria-hidden="true" />
            <strong>{v}</strong>
            <span>{l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Lo que más se consulta, a la mano */
export function AMano() {
  const items = [
    { I: Trash2, t: 'Basura', d: 'El basurero abre los lunes a las 8:00 a.m. y los viernes a las 12:00 m.d. Bolsas siempre cerradas.' },
    { I: Moon, t: 'Silencio', d: 'De 10:00 p.m. a 6:00 a.m. el ruido máximo es de 45 dB. De día, 65 dB.' },
    { I: DoorOpen, t: 'Visitas', d: 'Avise a portería antes de que llegue su visita. Sin autorización no se permite el ingreso.' },
    { I: Bike, t: 'Pedidos', d: 'Avise a portería antes de que llegue el repartidor. No puede ingresar libremente.' },
  ];
  return (
    <section className="section section--soft" aria-labelledby="mano-t">
      <div className="wrap">
        <div className="split-head">
          <div>
            <p className="eyebrow">Para tener a mano</p>
            <h2 id="mano-t" className="title">Lo que más <em>se pregunta.</em></h2>
          </div>
          <Link to="/convivencia" className="pill pill--line">Ver todas las normas <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
        <ul className="handy">
          {items.map(({ I, t, d }) => (
            <li key={t}>
              <span className="circle"><I size={22} strokeWidth={1.6} aria-hidden="true" /></span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Proyectos en marcha (estado activo y procesándose) */
export function EnMarcha() {
  const lista = proyectos.filter((p) => p.estado === 'activo' || p.estado === 'procesando');
  return (
    <section className="section" aria-labelledby="marcha-t">
      <div className="wrap marcha">
        <div>
          <p className="eyebrow">Proyectos</p>
          <h2 id="marcha-t" className="title">Lo que está <em>en marcha.</em></h2>
          <p className="muted marcha__text">{proyectos.filter((p) => p.estado === 'completado').length} proyectos completados y {proyectos.filter((p) => p.estado === 'pendiente').length} por iniciar.</p>
          <Link to="/proyectos" className="pill pill--solid">Ver todos los proyectos <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
        <ol className="marcha__list">
          {lista.map((p) => (
            <li key={p.titulo}>
              <span className={`tag tag--${p.estado}`}>{p.estado === 'activo' ? 'Activo' : 'Procesándose'}</span>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Galería de fotos del condominio */
export function Galeria() {
  const imgs = [
    { src: fotos.portada, alt: 'Entrada y portería' },
    { src: fotos.areasComunes, alt: 'Kiosco y juegos' },
    { src: fotos.residentes, alt: 'Fachada de un bloque' },
    { src: fotos.administracion, alt: 'Áreas comunes y parqueos' },
  ].filter((x) => x.src);
  if (!imgs.length) return null;
  return (
    <section className="section section--soft" aria-labelledby="gal-t">
      <div className="wrap">
        <p className="eyebrow">Galería</p>
        <h2 id="gal-t" className="title">Así se vive <em>en El Doral.</em></h2>
        <ul className="mosaic">
          {imgs.map((x) => (
            <li key={x.alt}><img src={x.src} alt={x.alt} loading="lazy" /><span>{x.alt}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Adelanto del tour en video */
export function TourTeaser() {
  return (
    <section className="section" aria-labelledby="tt-t">
      <div className="wrap">
        <Link to="/tour" className="teaser" style={tour.poster ? { '--poster': `url(${tour.poster})` } : undefined}>
          <span className="teaser__veil" aria-hidden="true" />
          <span className="teaser__play" aria-hidden="true"><Play size={26} fill="currentColor" /></span>
          <span className="teaser__text">
            <span className="eyebrow eyebrow--light">Tour</span>
            <span id="tt-t" className="teaser__title">Recorra El Doral <em>en video.</em></span>
          </span>
        </Link>
      </div>
    </section>
  );
}

/* Acceso al estado de cuenta */
export function CuentaCTA() {
  const { usuario } = useAuth();
  const abrirLogin = useLogin();
  return (
    <section className="section section--soft" aria-labelledby="cta-t">
      <div className="wrap account">
        <span className="account__icon"><Lock size={24} strokeWidth={1.6} aria-hidden="true" /></span>
        <div className="account__text">
          <h2 id="cta-t" className="title title--sm-flat">Su estado de cuenta, <em>en privado.</em></h2>
          <p className="muted">Cuota de condominio, agua, cargos y pagos de su filial. Solo usted puede verlo.</p>
        </div>
        {usuario
          ? <Link to={`/filiales/${usuario}`} className="pill pill--solid pill--lg">Ver filial {usuario} <ArrowRight size={18} aria-hidden="true" /></Link>
          : <button className="pill pill--solid pill--lg" onClick={() => abrirLogin()}>Iniciar sesión</button>}
      </div>
    </section>
  );
}
