import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, ShieldCheck, Cctv, Trees, TentTree, Car, ParkingSquare, Bike, Accessibility, Recycle,
  Trash2, VolumeX, PawPrint, DoorOpen, House, Megaphone, PaintRoller, Hammer, Footprints, Construction,
  Paintbrush, Fence, Gauge, Wrench, Droplets, Sprout, Mail, Droplet, CreditCard, BarChart3, Lock, Scale,
  CheckCircle2, AlertTriangle, Info,
} from 'lucide-react';

const ICONS = {
  Building2, ShieldCheck, Cctv, Trees, TentTree, Car, ParkingSquare, Bike, Accessibility, Recycle,
  Trash2, VolumeX, PawPrint, DoorOpen, House, Megaphone, PaintRoller, Hammer, Footprints, Construction,
  Paintbrush, Fence, Gauge, Wrench, Droplets, Sprout, Mail, Droplet, CreditCard, BarChart3, Lock, Scale,
};

export function Icon({ name, size = 20, ...rest }) {
  const C = ICONS[name] || Info;
  return <C size={size} aria-hidden="true" strokeWidth={1.75} {...rest} />;
}

/* Formato de Costa Rica: ₡30.785.841 */
const fmt = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });
export const colones = (n) => (n < 0 ? '−₡' : '₡') + fmt.format(Math.abs(Math.round(n)));
export const pct = (n, d = 1) => (n < 0 ? '−' : '') + Math.abs(n).toFixed(d).replace('.', ',') + ' %';
/* Versión corta para ejes de gráficos: ₡2,6 M */
export const colonesCorto = (n) => {
  const a = Math.abs(n);
  const s = a >= 1e6 ? (a / 1e6).toFixed(1).replace('.', ',') + ' M' : a >= 1e3 ? Math.round(a / 1e3) + ' mil' : String(a);
  return (n < 0 ? '−₡' : '₡') + s;
};

export function Money({ value, signed = false, tone }) {
  const t = tone ?? (signed ? (value < 0 ? 'neg' : 'pos') : undefined);
  return <span className={`money${t ? ' money--' + t : ''}`}>{colones(value)}</span>;
}

/* Cada sección del portal es una página: encabezado con ruta de navegación + contenido */
export function Section({ id, title, intro, children, tone }) {
  useEffect(() => {
    document.title = `${title} — Condominio Residencial El Doral`;
  }, [title]);
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <nav aria-label="Ruta de navegación" className="crumbs">
            <Link to="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{title}</span>
          </nav>
          <h1 id={`${id}-t`} className="page-head__title">{title}</h1>
          {intro && <p className="page-head__intro">{intro}</p>}
        </div>
      </header>
      <section id={id} className={`section${tone ? ' section--' + tone : ''}`} aria-labelledby={`${id}-t`}>
        <div className="wrap">{children}</div>
      </section>
    </>
  );
}

export function Callout({ tone = 'info', title, children }) {
  const I = tone === 'ok' ? CheckCircle2 : tone === 'warn' || tone === 'alert' ? AlertTriangle : Info;
  return (
    <div className={`callout callout--${tone}`} role={tone === 'alert' ? 'alert' : undefined}>
      <I size={20} aria-hidden="true" className="callout__icon" />
      <div>
        {title && <p className="callout__title">{title}</p>}
        <div className="callout__body">{children}</div>
      </div>
    </div>
  );
}

export function Stat({ label, value, note, tone }) {
  return (
    <div className={`stat${tone ? ' stat--' + tone : ''}`}>
      <dt className="stat__label">{label}</dt>
      <dd className="stat__value">{value}</dd>
      {note && <dd className="stat__note">{note}</dd>}
    </div>
  );
}

/* Pestañas accesibles con flechas de teclado */
export function Tabs({ tabs, label }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef([]);
  const onKey = (e, i) => {
    let n = null;
    if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
    if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = tabs.length - 1;
    if (n !== null) {
      e.preventDefault();
      setActive(n);
      refs.current[n]?.focus();
    }
  };
  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" aria-label={label}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => (refs.current[i] = el)}
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            className="tabs__tab"
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${base}-panel-${i}`}
          aria-labelledby={`${base}-tab-${i}`}
          hidden={active !== i}
          className="tabs__panel"
          tabIndex={0}
        >
          {active === i && t.content}
        </div>
      ))}
    </div>
  );
}

/* Tabla con desplazamiento horizontal propio en pantallas chicas */
export function DataTable({ caption, columns, rows, total, className = '' }) {
  return (
    <div className={`table-scroll ${className}`} tabIndex={0} role="region" aria-label={caption}>
      <table className="table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={c.num ? 'num' : undefined}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={r._className}>
              {columns.map((c, j) => {
                const v = c.render ? c.render(r) : r[c.key];
                return j === 0
                  ? <th key={c.key} scope="row">{v}</th>
                  : <td key={c.key} className={c.num ? 'num' : undefined}>{v}</td>;
              })}
            </tr>
          ))}
        </tbody>
        {total && (
          <tfoot>
            <tr>
              {columns.map((c, j) => {
                const v = c.render ? c.render(total) : total[c.key];
                return j === 0
                  ? <th key={c.key} scope="row">{v}</th>
                  : <td key={c.key} className={c.num ? 'num' : undefined}>{v}</td>;
              })}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
