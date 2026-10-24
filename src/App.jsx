import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth.jsx';
import { LoginProvider, useLogin } from './LoginModal.jsx';
import { PaginaFiliales, EstadoCuenta } from './Filiales.jsx';
import {
  ArrowRight, Check, Menu, X, Mail, MessageCircle, ClipboardList, Users, Trees, ShieldCheck, Cctv, Building2,
  TentTree, Car, Bike, Accessibility, Recycle, Trash2, VolumeX, PawPrint, DoorOpen, House, Megaphone, Plus,
  ImageIcon, Phone, ChevronRight, BarChart3, UserRound, LogOut, KeyRound,
} from 'lucide-react';

// Los gráficos solo se descargan al abrir Finanzas
const Finanzas = lazy(() => import('./Finanzas.jsx'));
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
  ['/condominio', 'El condominio'],
  ['/convivencia', 'Convivencia'],
  ['/mejoras', 'Mejoras'],
  ['/finanzas', 'Finanzas'],
  ['/filiales', 'Filiales'],
];

/* Botón principal de sesión: "Iniciar sesión" o, con sesión, la filial y "Cerrar sesión" */
function SesionBoton() {
  const { usuario, logout } = useAuth();
  const abrirLogin = useLogin();
  const navigate = useNavigate();
  if (!usuario) {
    return <button className="pill pill--line" onClick={() => abrirLogin()}><UserRound size={18} aria-hidden="true" /> Iniciar sesión</button>;
  }
  return (
    <span className="session">
      <Link className="session__me" to={`/filiales/${usuario}`}>Filial {usuario}</Link>
      <button className="pill pill--line" onClick={() => { logout(); navigate('/filiales'); }}><LogOut size={18} aria-hidden="true" /> Cerrar sesión</button>
    </span>
  );
}

function Logo() {
  return (
    <Link to="/" className="logo" aria-label="El Doral, ir al inicio">
      <span className="logo__name">El Doral</span>
      <svg viewBox="0 0 40 36" className="logo__mark" aria-hidden="true">
        <path d="M3 18 20 3l17 15M8 14v19h24V14" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
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
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
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
          {NAV.map(([h, l]) => <NavLink key={h} to={h}>{l}</NavLink>)}
        </nav>
        <div className="top__actions">
          <SesionBoton />
          <Link className="pill pill--solid" to="/contacto">Contactar</Link>
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
            {[['/', 'Inicio'], ...NAV, ['/contacto', 'Contacto']].map(([h, l]) => (
              <NavLink key={h} to={h} end={h === '/'}>{l}<ChevronRight size={18} aria-hidden="true" /></NavLink>
            ))}
          </nav>
          <div className="sheet__session"><SesionBoton /></div>
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
            <Link className="pill pill--solid pill--lg" to="/condominio">Conoce El Doral <ArrowRight size={18} aria-hidden="true" /></Link>
            <Link className="play" to="/convivencia">
              <span className="play__ring"><ChevronRight size={18} aria-hidden="true" /></span>
              Ver las normas
            </Link>
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

function Pilares({ level: H = 'h2' }) {
  return (
    <section id="condominio" className="section" aria-labelledby="pil-t">
      <div className="wrap">
        <div className="split-head">
          <H id="pil-t" className="title">Menos trámites. <em>Más vida.</em></H>
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

function Normas({ level: H = 'h2' }) {
  const [open, setOpen] = useState(null);
  return (
    <section id="normas" className="section" aria-labelledby="nor-t">
      <div className="wrap norms">
        <div className="norms__intro">
          <p className="eyebrow">Convivencia</p>
          <H id="nor-t" className="title">Reglas claras, <em>vecinos tranquilos.</em></H>
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

function Mejoras({ level: H = 'h2' }) {
  return (
    <section id="mejoras" className="section section--soft" aria-labelledby="mej-t">
      <div className="wrap">
        <div className="split-head">
          <div>
            <p className="eyebrow">Mejoras</p>
            <H id="mej-t" className="title">Un condominio <em>que se cuida.</em></H>
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

function Contacto({ level: H = 'h2' }) {
  const canales = [
    { href: `mailto:${condominio.correo}`, I: Mail, label: 'Correo', value: condominio.correo },
    { href: condominio.whatsappLink, I: MessageCircle, label: 'WhatsApp', value: condominio.whatsapp, ext: true },
  ];
  return (
    <section id="contacto" className="contact" aria-labelledby="con-t">
      <div className="wrap contact__inner">
        <div>
          <p className="eyebrow eyebrow--light">Canales oficiales</p>
          <H id="con-t" className="title title--light">¿Necesita algo? <em>Escríbanos.</em></H>
          <p className="contact__text">Use estos canales para que su solicitud quede registrada y tenga seguimiento.</p>
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
          {[['/', 'Inicio'], ...NAV, ['/contacto', 'Contacto']].map(([h, l]) => <Link key={h} to={h}>{l}</Link>)}
        </nav>
      </div>
    </footer>
  );
}

/* ---------- Páginas ---------- */

function usePageTitle(t) {
  useEffect(() => { document.title = t ? `${t} — El Doral` : 'El Doral — Condominio Residencial en Zapote'; }, [t]);
}

function Crumbs({ label }) {
  return (
    <nav className="wrap crumbs" aria-label="Ruta de navegación">
      <Link to="/">Inicio</Link><span aria-hidden="true">/</span><span aria-current="page">{label}</span>
    </nav>
  );
}

const EXPLORA = [
  { to: '/condominio', I: Building2, t: 'El condominio', d: 'Administración, residentes, áreas comunes e instalaciones.' },
  { to: '/convivencia', I: Users, t: 'Convivencia', d: 'Las normas vigentes: basura, ruido, mascotas, visitas y más.' },
  { to: '/mejoras', I: Check, t: 'Mejoras', d: 'Obras terminadas y en curso, con fotos del antes y después.' },
  { to: '/finanzas', I: BarChart3, t: 'Finanzas', d: 'Ingresos y gastos en gráficos, por rubro y mes a mes.' },
];

function Inicio() {
  usePageTitle('');
  return (
    <>
      <Hero />
      <section className="section" aria-labelledby="exp-t">
        <div className="wrap">
          <div className="split-head">
            <h2 id="exp-t" className="title">Todo El Doral, <em>en un solo lugar.</em></h2>
            <p className="split-head__text">Elija qué quiere consultar. La información se actualiza cada mes.</p>
          </div>
          <ul className="explore">
            {EXPLORA.map(({ to, I, t, d }) => (
              <li key={to}>
                <Link to={to} className="explore__card">
                  <span className="circle"><I size={22} strokeWidth={1.6} aria-hidden="true" /></span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                  <span className="explore__go">Ver {t.toLowerCase()} <ArrowRight size={16} aria-hidden="true" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Contacto />
    </>
  );
}

function PaginaCondominio() {
  usePageTitle('El condominio');
  return <><Crumbs label="El condominio" /><Pilares level="h1" /><Instalaciones /></>;
}
function PaginaConvivencia() {
  usePageTitle('Convivencia');
  return <><Crumbs label="Convivencia" /><Normas level="h1" /></>;
}
function PaginaMejoras() {
  usePageTitle('Mejoras');
  return <><Crumbs label="Mejoras" /><Mejoras level="h1" /></>;
}
function PaginaContacto() {
  usePageTitle('Contacto');
  return <><Crumbs label="Contacto" /><Contacto level="h1" /></>;
}
function PaginaFinanzas() {
  usePageTitle('Finanzas');
  return (
    <>
      <Crumbs label="Finanzas" />
      <section className="section section--fin" aria-labelledby="fin-t">
        <div className="wrap">
          <div className="split-head">
            <div>
              <p className="eyebrow">Finanzas</p>
              <h1 id="fin-t" className="title">Las cuentas, <em>claras.</em></h1>
            </div>
            <p className="split-head__text">Cuánto entra, cuánto sale y en qué se usa cada colón: electricidad, agua, seguridad, administración y más.</p>
          </div>
          <Suspense fallback={<div className="loading" role="status"><span className="sr-only">Cargando…</span></div>}>
            <Finanzas />
          </Suspense>
        </div>
      </section>
    </>
  );
}
function PaginaFilialesWrap() {
  usePageTitle('Filiales');
  return <><Crumbs label="Filiales" /><PaginaFiliales /></>;
}
function EstadoCuentaWrap() {
  usePageTitle('Estado de cuenta');
  return <><Crumbs label="Estado de cuenta" /><EstadoCuenta /></>;
}

function NoEncontrada() {
  usePageTitle('Página no encontrada');
  return (
    <section className="section"><div className="wrap">
      <h1 className="title">Esta página <em>no existe.</em></h1>
      <p className="muted" style={{ margin: '20px 0 28px' }}>Puede que el enlace esté incompleto.</p>
      <Link className="pill pill--solid" to="/">Ir al inicio</Link>
    </div></section>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <AuthProvider>
      <LoginProvider>
      <ScrollToTop />
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/condominio" element={<PaginaCondominio />} />
          <Route path="/convivencia" element={<PaginaConvivencia />} />
          <Route path="/mejoras" element={<PaginaMejoras />} />
          <Route path="/finanzas" element={<PaginaFinanzas />} />
          <Route path="/contacto" element={<PaginaContacto />} />
          <Route path="/filiales" element={<PaginaFilialesWrap />} />
          <Route path="/filiales/:id" element={<EstadoCuentaWrap />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Footer />
      </LoginProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
