import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu, X, House, BarChart3, ScrollText, Hammer, Phone, Building2, Scale, ClipboardCheck, Mail, MessageCircle, ChevronRight,
} from 'lucide-react';
import { actualizacion, condominio } from '../data.js';

export const NAV = [
  { to: '/', label: 'Inicio', desc: 'Resumen del mes', I: House },
  { to: '/finanzas', label: 'Finanzas', desc: 'Resultados, agua y cobros', I: BarChart3 },
  { to: '/lineamientos', label: 'Lineamientos', desc: 'Normas de convivencia', I: ScrollText },
  { to: '/proyectos', label: 'Proyectos', desc: 'Obras y mejoras', I: Hammer },
  { to: '/legal', label: 'Gestión legal', desc: 'Expedientes y casos', I: Scale },
  { to: '/condominio', label: 'Condominio', desc: 'Instalaciones', I: Building2 },
  { to: '/administracion', label: 'Administración', desc: 'Tareas de cada mes', I: ClipboardCheck },
  { to: '/contacto', label: 'Contacto', desc: 'Canales oficiales', I: Phone },
];

const BOTTOM = ['/', '/finanzas', '/lineamientos', '/proyectos', '/contacto'];
const CORTO = { '/lineamientos': 'Normas' };

export function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <svg viewBox="0 0 40 36" className="logo__mark" aria-hidden="true">
        <path d="M3 18 20 3l17 15M8 14v19h24V14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="16.5" y="21" width="7" height="12" rx="1" fill="currentColor" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">El Doral</span>
        <span className="logo__sub">Condominio residencial</span>
      </span>
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const panel = useRef(null);
  const toggle = useRef(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector('a, button')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
      // Mantiene el foco dentro del panel
      if (e.key === 'Tab' && panel.current) {
        const f = panel.current.querySelectorAll('a, button');
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <>
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <header className="topbar">
        <div className="wrap topbar__inner">
          <Link to="/" className="topbar__brand" aria-label="El Doral, ir al inicio"><Logo /></Link>
          <nav aria-label="Secciones" className="topbar__nav">
            <ul>
              {NAV.slice(1).map((n) => (
                <li key={n.to}><NavLink to={n.to}>{n.label}</NavLink></li>
              ))}
            </ul>
          </nav>
          <span className="topbar__update">Datos a {actualizacion.mes.toLowerCase()}</span>
          <button ref={toggle} className="topbar__menu" aria-expanded={open} aria-controls="menu-movil" onClick={() => setOpen(true)}>
            <Menu size={22} aria-hidden="true" />
            <span className="topbar__menu-label">Menú</span>
          </button>
        </div>
      </header>

      <div className={`sheet${open ? ' is-open' : ''}`} aria-hidden={!open} inert={open ? undefined : ''}>
        <div className="sheet__scrim" onClick={() => setOpen(false)} />
        <div id="menu-movil" ref={panel} className="sheet__panel" role="dialog" aria-modal="true" aria-label="Menú del portal">
          <div className="sheet__head">
            <Logo />
            <button className="sheet__close" onClick={() => { setOpen(false); toggle.current?.focus(); }}>
              <X size={22} aria-hidden="true" /><span className="sr-only">Cerrar menú</span>
            </button>
          </div>
          <p className="sheet__upd">Datos actualizados a {actualizacion.mes.toLowerCase()}</p>
          <nav aria-label="Secciones">
            <ul className="sheet__list">
              {NAV.map(({ to, label, desc, I }) => (
                <li key={to}>
                  <NavLink to={to} end={to === '/'} className="sheet__link">
                    <span className="sheet__icon"><I size={20} aria-hidden="true" /></span>
                    <span className="sheet__txt"><span className="sheet__label">{label}</span><span className="sheet__desc">{desc}</span></span>
                    <ChevronRight size={18} aria-hidden="true" className="sheet__chev" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="sheet__foot">
            <a className="btn btn--brand" href={condominio.whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" /> WhatsApp
            </a>
            <a className="btn btn--line" href={`mailto:${condominio.correo}`}>
              <Mail size={18} aria-hidden="true" /> Correo
            </a>
          </div>
        </div>
      </div>

      <nav className="bottombar" aria-label="Accesos rápidos">
        {NAV.filter((n) => BOTTOM.includes(n.to)).map(({ to, label, I }) => (
          <NavLink key={to} to={to} end={to === '/'}>
            <I size={20} aria-hidden="true" />
            <span>{CORTO[to] || label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
