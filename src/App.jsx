import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, Check, Menu, X, Mail, MessageCircle, ClipboardList, Users, Trees, ShieldCheck, Cctv, Building2,
  TentTree, Car, Bike, Accessibility, Recycle, Trash2, VolumeX, PawPrint, DoorOpen, House, Megaphone, Plus,
  ImageIcon, Phone, ChevronRight,
} from 'lucide-react';
import { autor, fotos, condominio, pilares, instalaciones, normas, mejoras, fotosTechos } from './data.js';

const ICONS = {
  ClipboardList, Users, Trees, ShieldCheck, Cctv, Building2, TentTree, Car, Bike, Accessibility, Recycle,
  Trash2, VolumeX, PawPrint, DoorOpen, House, Megaphone,
};
const Icon = ({ name, size = 22 }) => {
  const C = ICONS[name] || House;
  return <C size={size} strokeWidth={1.6} aria-hidden="true" />;
};

const NAV = [
  ['#condominio', 'El condominio'],
  ['#instalaciones', 'Instalaciones'],
  ['#normas', 'Convivencia'],
  ['#mejoras', 'Mejoras'],
];

function Logo() {
  return (
    <a href="#inicio" className="logo" aria-label="El Doral, ir al inicio">
      <span className="logo__name">El Doral</span>
      <svg viewBox="0 0 40 36" className="logo__mark" aria-hidden="true">
        <path d="M3 18 20 3l17 15M8 14v19h24V14" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

/* Foto o, si todavía no existe, un espacio de diseño que dice qué foto va ahí */
function Photo({ src, label, className = '' }) {
  if (src) return <img src={src} alt={label} className={`photo ${className}`} loading="lazy" />;
  return (
    <div className={`photo photo--empty ${className}`} role="img" aria-label={`Espacio para foto: ${label}`}>
      <span className="photo__ph"><ImageIcon size={26} strokeWidth={1.5} aria-hidden="true" /><span>{label}</span></span>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const panel = useRef(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector('a, button')?.focus();
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <>
    <header className="top">
      <div className="wrap top__inner">
        <Logo />
        <nav className="top__nav" aria-label="Secciones">
          {NAV.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <div className="top__actions">
          <a className="pill pill--line" href={condominio.whatsappLink} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a className="pill pill--solid" href="#contacto">Contactar</a>
        </div>
        <button className="top__menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>
          <Menu size={22} aria-hidden="true" /><span className="sr-only">Abrir menú</span>
        </button>
      </div>
    </header>

      <div className={`sheet${open ? ' is-open' : ''}`} inert={open ? undefined : ''}>
        <div className="sheet__scrim" onClick={() => setOpen(false)} />
        <div id="menu" ref={panel} className="sheet__panel" role="dialog" aria-modal="true" aria-label="Menú">
          <div className="sheet__head">
            <Logo />
            <button className="sheet__close" onClick={() => setOpen(false)}><X size={20} aria-hidden="true" /><span className="sr-only">Cerrar menú</span></button>
          </div>
          <nav aria-label="Secciones" className="sheet__nav">
            {[...NAV, ['#contacto', 'Contacto']].map(([h, l]) => (
              <a key={h} href={h} onClick={() => setOpen(false)}>{l}<ChevronRight size={18} aria-hidden="true" /></a>
            ))}
          </nav>
          <div className="sheet__foot">
            <a className="pill pill--solid" href={condominio.whatsappLink} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" /> WhatsApp</a>
            <a className="pill pill--line" href={`mailto:${condominio.correo}`}><Mail size={18} aria-hidden="true" /> Correo</a>
          </div>
        </div>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-t">
      <div className="wrap hero__grid">
        <div className="hero__text">
          <p className="eyebrow">Vivir mejor, juntos</p>
          <h1 id="hero-t" className="hero__title">Tu hogar,<br />en <em>comunidad.</em></h1>
          <p className="hero__lead">Normas, mejoras y canales oficiales de El Doral, en un solo lugar.</p>
          <div className="hero__actions">
            <a className="pill pill--solid pill--lg" href="#condominio">Conoce El Doral <ArrowRight size={18} aria-hidden="true" /></a>
            <a className="play" href="#normas">
              <span className="play__ring"><ChevronRight size={18} aria-hidden="true" /></span>
              Ver las normas
            </a>
          </div>
        </div>
        <div className="hero__media">
          <Photo src={fotos.portada} label="Entrada y portería del Condominio El Doral" className="hero__photo" />
          <div className="badge-card">
            <span className="badge-card__check"><Check size={18} aria-hidden="true" /></span>
            <span><strong>Portería 24/7</strong><small>Acceso controlado todo el día</small></span>
          </div>
        </div>
      </div>
      <div className="strip">
        <div className="wrap strip__inner">
          <p className="strip__lead">Más tranquilidad para todos</p>
          <ul>
            <li><ShieldCheck size={20} strokeWidth={1.6} aria-hidden="true" /> Seguridad permanente</li>
            <li><Trees size={20} strokeWidth={1.6} aria-hidden="true" /> Áreas verdes cuidadas</li>
            <li><MessageCircle size={20} strokeWidth={1.6} aria-hidden="true" /> Comunicación directa</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Pilares() {
  return (
    <section id="condominio" className="section" aria-labelledby="pil-t">
      <div className="wrap">
        <div className="split-head">
          <h2 id="pil-t" className="title">Menos trámites. <em>Más vida.</em></h2>
          <p className="split-head__text">{condominio.filiales} filiales en {condominio.bloques} bloques, en {condominio.ubicacion}, con áreas comunes cuidadas y una administración que informa a tiempo.</p>
        </div>
        <ul className="pillars">
          {pilares.map((p) => (
            <li key={p.titulo} className="pillar">
              <div className="pillar__head">
                <span className="circle"><Icon name={p.icon} /></span>
                <div>
                  <h3>{p.titulo}</h3>
                  <p className="pillar__sub">{p.bajada}</p>
                  <p>{p.texto}</p>
                </div>
              </div>
              <Photo src={fotos[p.foto]} label={p.titulo} className="pillar__photo" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Instalaciones() {
  return (
    <section id="instalaciones" className="section section--soft" aria-labelledby="ins-t">
      <div className="wrap">
        <p className="eyebrow">Instalaciones</p>
        <h2 id="ins-t" className="title">Todo lo que tiene <em>El Doral.</em></h2>
        <ul className="amenities">
          {instalaciones.map((x) => (
            <li key={x.titulo}>
              <span className="circle circle--sm"><Icon name={x.icon} size={20} /></span>
              <div><h3>{x.titulo}</h3><p>{x.texto}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Normas() {
  const [open, setOpen] = useState(null);
  return (
    <section id="normas" className="section" aria-labelledby="nor-t">
      <div className="wrap norms">
        <div className="norms__intro">
          <p className="eyebrow">Convivencia</p>
          <h2 id="nor-t" className="title">Reglas claras, <em>vecinos tranquilos.</em></h2>
          <p className="muted">Un resumen de cada norma vigente. El documento completo se solicita a la Administración por los canales oficiales.</p>
          <a className="pill pill--line" href={`mailto:${condominio.correo}?subject=${encodeURIComponent('Solicitud de las normas de convivencia')}`}>Solicitar el documento completo</a>
        </div>
        <ul className="norms__list">
          {normas.map((n, i) => (
            <li key={n.titulo} className={`norm${open === i ? ' is-open' : ''}`}>
              <h3>
                <button aria-expanded={open === i} aria-controls={`norma-${i}`} onClick={() => setOpen(open === i ? null : i)}>
                  <span className="circle circle--sm"><Icon name={n.icon} size={20} /></span>
                  <span className="norm__title">{n.titulo}</span>
                  <Plus size={20} aria-hidden="true" className="norm__plus" />
                </button>
              </h3>
              <div id={`norma-${i}`} className="norm__body" hidden={open !== i}>
                <p>{n.resumen}</p>
                <ul>{n.puntos.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Mejoras() {
  return (
    <section id="mejoras" className="section section--soft" aria-labelledby="mej-t">
      <div className="wrap">
        <div className="split-head">
          <div>
            <p className="eyebrow">Mejoras</p>
            <h2 id="mej-t" className="title">Un condominio <em>que se cuida.</em></h2>
          </div>
          <p className="split-head__text">Obras terminadas y en curso para mantener la infraestructura, la seguridad y el aspecto de El Doral.</p>
        </div>
        <div className="beforeafter">
          {fotosTechos.map((f) => (
            <figure key={f.etiqueta}>
              <img src={f.src} alt={`Techos: ${f.etiqueta.toLowerCase()}`} loading="lazy" />
              <figcaption>{f.etiqueta}</figcaption>
            </figure>
          ))}
        </div>
        <ul className="works">
          {mejoras.map((m) => (
            <li key={m.titulo}>
              <span className={`tag tag--${m.estado === 'Listo' ? 'done' : m.estado === 'En curso' ? 'now' : 'next'}`}>{m.estado}</span>
              <h3>{m.titulo}</h3>
              <p>{m.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contacto() {
  const canales = [
    { href: `mailto:${condominio.correo}`, I: Mail, label: 'Correo', value: condominio.correo },
    { href: condominio.whatsappLink, I: MessageCircle, label: 'WhatsApp', value: condominio.whatsapp, ext: true },
  ];
  return (
    <section id="contacto" className="contact" aria-labelledby="con-t">
      <div className="wrap contact__inner">
        <div>
          <p className="eyebrow eyebrow--light">Canales oficiales</p>
          <h2 id="con-t" className="title title--light">¿Necesita algo? <em>Escríbanos.</em></h2>
          <p className="contact__text">Use estos canales para que su solicitud quede registrada y tenga seguimiento. Administración a cargo de {condominio.empresa}</p>
        </div>
        <ul className="contact__list">
          {canales.map(({ href, I, label, value, ext }) => (
            <li key={label}>
              <a href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <span className="circle circle--light"><I size={20} strokeWidth={1.6} aria-hidden="true" /></span>
                <span><small>{label}</small><strong>{value}</strong></span>
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  const datos = [
    autor.cargo && { I: Users, v: autor.cargo },
    autor.telefono && { I: Phone, v: autor.telefono, href: `tel:${autor.telefono.replace(/[^+\d]/g, '')}` },
    autor.correo && { I: Mail, v: autor.correo, href: `mailto:${autor.correo}` },
  ].filter(Boolean);
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <Logo />
          <p>{condominio.nombre}<br />{condominio.ubicacion}</p>
        </div>
        {autor.nombre && (
          <div className="footer__me">
            <p className="footer__name">{autor.nombre}</p>
            <ul>
              {datos.map(({ I, v, href }) => (
                <li key={v}><I size={16} aria-hidden="true" />{href ? <a href={href}>{v}</a> : v}</li>
              ))}
            </ul>
            {autor.nota && <p className="footer__note">{autor.nota}</p>}
          </div>
        )}
        <nav className="footer__nav" aria-label="Secciones">
          {[...NAV, ['#contacto', 'Contacto']].map(([h, l]) => <a key={h} href={h}>{l}</a>)}
        </nav>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <Hero />
        <Pilares />
        <Instalaciones />
        <Normas />
        <Mejoras />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
