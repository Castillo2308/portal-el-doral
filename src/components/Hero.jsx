import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { mesesCalc, consolidado } from '../calc.js';
import { reserva, actualizacion, condominio, cuentasPorCobrar, fotos } from '../data.js';
import { colones, colonesCorto, pct } from './ui.jsx';

function ResultChart() {
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setGrown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const W = 560, H = 300, top = 34, bottom = 36, left = 8, right = 8;
  const max = Math.max(...mesesCalc.map((m) => Math.max(m.resultado, 0)));
  const min = Math.min(...mesesCalc.map((m) => Math.min(m.resultado, 0)));
  const span = max - min;
  const plotH = H - top - bottom;
  const y0 = top + plotH * (max / span);
  const scale = plotH / span;
  const slot = (W - left - right) / mesesCalc.length;
  const bw = Math.min(46, slot * 0.58);

  return (
    <figure className="hero-chart">
      <figcaption className="hero-chart__cap">
        <span className="hero-chart__title">Resultado de cada mes en 2026</span>
        <span className="hero-chart__legend">
          <span><i className="dot dot--pos" />Superávit</span>
          <span><i className="dot dot--neg" />Déficit</span>
        </span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="hc-desc" className="hero-chart__svg">
        <desc id="hc-desc">
          {mesesCalc.map((m) => `${m.nombre}: ${colones(m.resultado)}`).join('. ')}.
        </desc>
        <line x1={left} x2={W - right} y1={y0} y2={y0} className="hc-zero" />
        {mesesCalc.map((m, i) => {
          const cx = left + slot * i + slot / 2;
          const h = Math.abs(m.resultado) * scale;
          const neg = m.resultado < 0;
          const y = neg ? y0 : y0 - h;
          return (
            <g key={m.id} className={neg ? 'hc-bar hc-bar--neg' : 'hc-bar'}>
              <rect
                x={cx - bw / 2} y={y} width={bw} height={h} rx="1"
                style={{ transform: grown ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: `${cx}px ${y0}px`, transitionDelay: `${i * 70}ms` }}
              />
              <text x={cx} y={neg ? y + h + 18 : y - 9} className="hc-val" textAnchor="middle">{colonesCorto(m.resultado)}</text>
              <text x={cx} y={neg ? y0 - 10 : y0 + 22} className="hc-month" textAnchor="middle">{m.corto}</text>
            </g>
          );
        })}
      </svg>
      <p className="hero-chart__note">
        <strong>Junio:</strong> se pagaron {colones(797845)} de la pintura de techos en un solo mes, sin cuota extraordinaria.
        Julio volvió al superávit.
      </p>
    </figure>
  );
}

const PILARES = [
  ['/finanzas', 'Finanzas'], ['/lineamientos', 'Lineamientos'], ['/proyectos', 'Proyectos'],
  ['/legal', 'Gestión legal'], ['/condominio', 'Condominio'], ['/contacto', 'Contacto'],
];

export default function Hero() {
  const facts = [
    { v: condominio.filiales, l: 'Filiales en 3 bloques' },
    { v: pct(cuentasPorCobrar.recaudacionMes), l: 'De lo facturado en julio, cobrado' },
    { v: colones(reserva.total), l: 'En el fondo de reserva' },
    { v: colones(consolidado.utilidad), l: 'Utilidad Sep 2025 – Jul 2026' },
  ];
  return (
    <>
      <section id="inicio" className={`cover${fotos.portada ? ' cover--photo' : ''}`} aria-labelledby="hero-t"
        style={fotos.portada ? { '--cover-img': `url(${fotos.portada})` } : undefined}>
        <div className="cover__veil" aria-hidden="true" />
        <div className="wrap cover__inner">
          <p className="eyebrow eyebrow--light">Informe de gestión · {actualizacion.mes}</p>
          <h1 id="hero-t" className="cover__title">
            ¿Alcanza la cuota?<br /><em>Sí, y con utilidad.</em>
          </h1>
          <p className="cover__lead">
            Finanzas, normas y proyectos de El Doral,<br /><em>en claro y cada mes.</em>
          </p>
          <nav aria-label="Secciones del portal" className="cover__pillars">
            {PILARES.map(([to, l]) => <Link key={to} to={to}>{l}</Link>)}
          </nav>
        </div>
      </section>

      <section className="hero" aria-labelledby="hero-res-t">
        <div className="wrap hero__grid">
          <div className="hero__text">
            <p className="eyebrow">Resultado operativo</p>
            <h2 id="hero-res-t" className="hero__title">La cuota sostiene <em>la operación.</em></h2>
            <p className="hero__lead">
              De setiembre 2025 a julio 2026 el condominio recibió {colones(consolidado.ingresos)} en
              ingresos operativos y gastó {colones(consolidado.egresos)}. Quedó una utilidad de{' '}
              <strong>{colones(consolidado.utilidad)}</strong>.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--gold" to="/finanzas">Ver las finanzas <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link className="btn btn--ghost" to="/contacto">Contactar a la Administración</Link>
            </div>
          </div>
          <ResultChart />
        </div>
        <div className="wrap">
          <dl className="hero__facts">
            {facts.map((f) => (
              <div key={f.l}><dt>{f.l}</dt><dd>{f.v}</dd></div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
