import { useMemo, useState } from 'react';
import { Zap, Droplets, ShieldCheck, ClipboardList, Trees, Wrench, Sparkles, Wifi, Package, Info } from 'lucide-react';
import { finanzas } from './data.js';

const ICONS = { Zap, Droplets, ShieldCheck, ClipboardList, Trees, Wrench, Sparkles, Wifi, Package };
const fmt = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });
export const colones = (n) => (n < 0 ? '−₡' : '₡') + fmt.format(Math.abs(Math.round(n)));
const corto = (n) => (n >= 1e6 ? '₡' + (n / 1e6).toFixed(1).replace('.', ',') + ' M' : n >= 1e3 ? '₡' + Math.round(n / 1e3) + ' mil' : '₡' + n);
const pct = (v, t) => (t ? ((v / t) * 100).toFixed(1).replace('.', ',') : '0') + ' %';
const sum = (a) => a.reduce((s, x) => s + x, 0);

/* Escala "bonita" del eje: si todo es 0, usa ₡1 M para que el gráfico conserve su forma */
function niceMax(v) {
  if (v <= 0) return 1_000_000;
  const p = 10 ** Math.floor(Math.log10(v));
  return Math.ceil(v / p) * p;
}

function Donut({ items, total }) {
  const R = 80, C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <div className="donut">
      <svg viewBox="0 0 200 200" role="img" aria-label={`Distribución del gasto. Total ${colones(total)}.`}>
        <circle cx="100" cy="100" r={R} className="donut__track" />
        {total > 0 && items.map((g) => {
          const len = (g.total / total) * C;
          const el = <circle key={g.id} cx="100" cy="100" r={R} stroke={g.color} strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-acc} className="donut__seg" />;
          acc += len;
          return el;
        })}
      </svg>
      <div className="donut__center">
        <strong>{colones(total)}</strong>
        <span>gasto del año</span>
      </div>
    </div>
  );
}

function Bars({ meses, series, height = 260 }) {
  const W = 720, H = height, L = 64, B = 30, T = 14;
  const max = niceMax(Math.max(0, ...meses.map((_, i) => Math.max(...series.map((s) => s.stack ? sum(s.stack.map((x) => x.montos[i])) : s.montos[i])))));
  const plotH = H - B - T;
  const slot = (W - L) / meses.length;
  const groups = series.length;
  const bw = Math.min(18, (slot * 0.7) / groups);
  const ticks = [0, 0.25, 0.5, 0.75, 1];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="bars" role="img" aria-label="Gráfico mensual. Los valores están en la tabla de abajo.">
      {ticks.map((t) => {
        const y = T + plotH * (1 - t);
        return (
          <g key={t}>
            <line x1={L} x2={W} y1={y} y2={y} className={t === 0 ? 'bars__base' : 'bars__grid'} />
            <text x={L - 10} y={y + 4} textAnchor="end" className="bars__tick">{corto(max * t)}</text>
          </g>
        );
      })}
      {meses.map((m, i) => {
        const x0 = L + slot * i + (slot - bw * groups - 4 * (groups - 1)) / 2;
        return (
          <g key={m}>
            {series.map((s, j) => {
              const x = x0 + j * (bw + 4);
              if (s.stack) {
                let y = T + plotH;
                return s.stack.map((part) => {
                  const h = (part.montos[i] / max) * plotH;
                  y -= h;
                  return <rect key={part.id} x={x} y={y} width={bw} height={h} fill={part.color} />;
                });
              }
              const h = (s.montos[i] / max) * plotH;
              return <rect key={s.id} x={x} y={T + plotH - h} width={bw} height={h} rx="3" fill={s.color} />;
            })}
            <text x={L + slot * i + slot / 2} y={H - 8} textAnchor="middle" className="bars__month">{m}</text>
          </g>
        );
      })}
    </svg>
  );
}

function Spark({ montos, color }) {
  const max = Math.max(...montos);
  const pts = montos.map((v, i) => `${(i / (montos.length - 1)) * 100},${max ? 28 - (v / max) * 24 : 26}`).join(' ');
  return <svg viewBox="0 0 100 30" className="spark" aria-hidden="true" preserveAspectRatio="none"><polyline points={pts} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" /></svg>;
}

export default function Finanzas() {
  const { meses, gastos, ingresos, anio, fondoReserva } = finanzas;
  const [activos, setActivos] = useState(() => new Set(gastos.map((g) => g.id)));

  const gastosT = useMemo(() => gastos.map((g) => ({ ...g, total: sum(g.montos) })), [gastos]);
  const totalGastos = sum(gastosT.map((g) => g.total));
  const ingresosMes = meses.map((_, i) => sum(ingresos.map((x) => x.montos[i])));
  const gastosMes = meses.map((_, i) => sum(gastos.map((g) => g.montos[i])));
  const totalIngresos = sum(ingresosMes);
  const resultado = totalIngresos - totalGastos;
  const sinDatos = totalIngresos === 0 && totalGastos === 0;

  const toggle = (id) => setActivos((s) => {
    const n = new Set(s);
    if (n.has(id) && n.size > 1) n.delete(id); else n.add(id);
    return n;
  });

  return (
    <>
      {sinDatos && (
        <div className="notice">
          <Info size={20} aria-hidden="true" />
          <p><strong>Todavía no hay cifras publicadas para {anio}.</strong> Los montos aparecerán aquí cuando la Administración cierre cada mes.</p>
        </div>
      )}

      <dl className="kpis">
        <div><dt>Ingresos del año</dt><dd>{colones(totalIngresos)}</dd></div>
        <div><dt>Gastos del año</dt><dd>{colones(totalGastos)}</dd></div>
        <div className="kpis__main"><dt>Resultado</dt><dd>{colones(resultado)}</dd></div>
        <div><dt>Fondo de reserva</dt><dd>{colones(fondoReserva)}</dd></div>
      </dl>

      <div className="fin-grid">
        <section className="panel" aria-labelledby="dist-t">
          <h2 id="dist-t" className="panel__title">¿En qué se <em>usa el dinero?</em></h2>
          <p className="panel__sub">Distribución del gasto de {anio} por rubro.</p>
          <div className="dist">
            <Donut items={gastosT} total={totalGastos} />
            <ul className="legend">
              {gastosT.map((g) => (
                <li key={g.id}>
                  <i style={{ background: g.color }} />
                  <span>{g.nombre}</span>
                  <strong>{pct(g.total, totalGastos)}</strong>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="panel" aria-labelledby="mes-t">
          <h2 id="mes-t" className="panel__title">Ingresos y gastos <em>mes a mes</em></h2>
          <p className="panel__sub">Comparación de lo que entra y lo que sale cada mes.</p>
          <ul className="keys">
            <li><i style={{ background: 'var(--coral-d)' }} />Ingresos</li>
            <li><i style={{ background: 'var(--ink)' }} />Gastos</li>
          </ul>
          <Bars meses={meses} series={[
            { id: 'ing', color: 'var(--coral-d)', montos: ingresosMes },
            { id: 'gas', color: 'var(--ink)', montos: gastosMes },
          ]} />
        </section>
      </div>

      <section className="panel panel--wide" aria-labelledby="rub-t">
        <h2 id="rub-t" className="panel__title">Gastos por rubro, <em>mes a mes</em></h2>
        <p className="panel__sub">Toque un rubro para mostrarlo u ocultarlo en el gráfico.</p>
        <div className="chips" role="group" aria-label="Rubros visibles">
          {gastos.map((g) => (
            <button key={g.id} className="chip" aria-pressed={activos.has(g.id)} onClick={() => toggle(g.id)}>
              <i style={{ background: g.color }} />{g.nombre}
            </button>
          ))}
        </div>
        <Bars meses={meses} height={300} series={[{ id: 'stack', stack: gastos.filter((g) => activos.has(g.id)) }]} />
      </section>

      <h2 className="title title--sm">Cada rubro, <em>en detalle.</em></h2>
      <ul className="rubros">
        {gastosT.map((g) => {
          const I = ICONS[g.icon] || Package;
          return (
            <li key={g.id} className="rubro">
              <span className="rubro__icon" style={{ color: g.color, background: g.color + '1f' }}><I size={20} strokeWidth={1.7} aria-hidden="true" /></span>
              <h3>{g.nombre}</h3>
              <p className="rubro__total">{colones(g.total)}</p>
              <p className="rubro__pct">{pct(g.total, totalGastos)} del gasto anual</p>
              <Spark montos={g.montos} color={g.color} />
            </li>
          );
        })}
      </ul>

      <div className="table-wrap" tabIndex={0} role="region" aria-label="Tabla de gastos por rubro y mes">
        <table className="table">
          <caption className="sr-only">Gastos por rubro y mes, {anio}</caption>
          <thead><tr><th scope="col">Rubro</th>{meses.map((m) => <th key={m} scope="col" className="num">{m}</th>)}<th scope="col" className="num">Total</th></tr></thead>
          <tbody>
            {gastosT.map((g) => (
              <tr key={g.id}>
                <th scope="row"><i className="dot" style={{ background: g.color }} />{g.nombre}</th>
                {g.montos.map((v, i) => <td key={i} className="num">{colones(v)}</td>)}
                <td className="num"><strong>{colones(g.total)}</strong></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr><th scope="row">Total de gastos</th>{gastosMes.map((v, i) => <td key={i} className="num">{colones(v)}</td>)}<td className="num">{colones(totalGastos)}</td></tr>
            <tr><th scope="row">Ingresos</th>{ingresosMes.map((v, i) => <td key={i} className="num">{colones(v)}</td>)}<td className="num">{colones(totalIngresos)}</td></tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
