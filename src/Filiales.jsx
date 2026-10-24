import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Lock, LockOpen, ArrowLeft, ShieldAlert, Info, LogOut, Droplets, Home, Receipt, AlertTriangle } from 'lucide-react';
import { FILIALES, normalizar, useAuth } from './auth.jsx';
import { useLogin } from './LoginModal.jsx';

const fmt = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });
const colones = (n) => (n < 0 ? '−₡' : '₡') + fmt.format(Math.abs(Math.round(n || 0)));

function SinPermiso({ id, onClose }) {
  return (
    <div className="alert-perm" role="alert">
      <ShieldAlert size={20} aria-hidden="true" />
      <p><strong>No tienes permiso para consultar esta filial.</strong> Tu sesión solo da acceso a la filial {id}.</p>
      {onClose && <button className="pill pill--line pill--sm" onClick={onClose}>Entendido</button>}
    </div>
  );
}

export function PaginaFiliales() {
  const { usuario } = useAuth();
  const abrirLogin = useLogin();
  const navigate = useNavigate();
  const [aviso, setAviso] = useState(false);

  const elegir = (id) => {
    setAviso(false);
    if (!usuario) return abrirLogin(id);
    if (usuario !== id) return setAviso(true);
    navigate(`/filiales/${id}`);
  };

  return (
    <section className="section" aria-labelledby="fil-t">
      <div className="wrap">
        <div className="split-head">
          <div>
            <p className="eyebrow">Filiales</p>
            <h1 id="fil-t" className="title">Su estado de cuenta, <em>en privado.</em></h1>
          </div>
          <p className="split-head__text">
            {usuario ? <>Sesión iniciada como <strong>filial {usuario}</strong>. Solo puede consultar su propia filial.</> : 'Elija su filial e inicie sesión para ver su estado de cuenta. Cada cuenta solo puede consultar su propia filial.'}
          </p>
        </div>
        {aviso && <SinPermiso id={usuario} onClose={() => setAviso(false)} />}
        <ul className="filiales" aria-label="Filiales del condominio">
          {FILIALES.map((id) => {
            const mia = usuario === id;
            return (
              <li key={id}>
                <button className={`filial${mia ? ' filial--mia' : ''}`} onClick={() => elegir(id)}
                  aria-label={`Filial ${id}${mia ? ', su filial' : ''}`}>
                  <span className="filial__id">{id}</span>
                  {mia ? <LockOpen size={16} aria-hidden="true" /> : <Lock size={16} aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function EstadoCuenta() {
  const { id: crudo } = useParams();
  const id = normalizar(crudo || '');
  const { usuario, estadoDe, logout } = useAuth();
  const abrirLogin = useLogin();
  const navigate = useNavigate();
  const [datos, setDatos] = useState(null);
  const [fallo, setFallo] = useState(false);

  useEffect(() => {
    setDatos(null); setFallo(false);
    if (!usuario || usuario !== id) return;
    let vivo = true;
    estadoDe(id).then((d) => vivo && setDatos(d)).catch(() => vivo && setFallo(true));
    return () => { vivo = false; };
  }, [id, usuario, estadoDe]);

  const volver = <Link to="/filiales" className="back"><ArrowLeft size={16} aria-hidden="true" /> Todas las filiales</Link>;

  if (!FILIALES.includes(id)) {
    return <section className="section"><div className="wrap">{volver}<h1 className="title">Esta filial <em>no existe.</em></h1></div></section>;
  }
  if (!usuario) {
    return (
      <section className="section"><div className="wrap narrow">
        {volver}
        <h1 className="title">Filial {id}</h1>
        <p className="muted lead-gap">Para ver tu estado de cuenta, inicia sesión.</p>
        <button className="pill pill--solid" onClick={() => abrirLogin(id)}>Iniciar sesión</button>
      </div></section>
    );
  }
  if (usuario !== id) {
    return <section className="section"><div className="wrap narrow">{volver}<h1 className="title">Filial {id}</h1><SinPermiso id={usuario} /></div></section>;
  }

  return (
    <section className="section" aria-labelledby="ec-t">
      <div className="wrap">
        {volver}
        <div className="split-head">
          <div>
            <p className="eyebrow">Estado de cuenta</p>
            <h1 id="ec-t" className="title">Filial <em>{id}</em></h1>
          </div>
          <button className="pill pill--line" onClick={() => { logout(); navigate('/filiales'); }}>
            <LogOut size={18} aria-hidden="true" /> Cerrar sesión
          </button>
        </div>

        {fallo && <div className="alert-perm" role="alert"><ShieldAlert size={20} aria-hidden="true" /><p>No se pudo abrir el estado de cuenta. Cierre sesión e inicie de nuevo.</p></div>}
        {!datos && !fallo && <div className="loading" role="status"><span className="sr-only">Cargando…</span></div>}

        {datos && <Detalle d={datos} />}
      </div>
    </section>
  );
}

const n = (v) => Number(v) || 0;

function ConsumoAgua({ historial }) {
  const W = 640, H = 200, L = 40, B = 26, T = 12;
  const max = Math.max(10, ...historial.map((m) => n(m.consumoM3)));
  const top = Math.ceil(max / 10) * 10;
  const plotH = H - B - T;
  const slot = (W - L) / historial.length;
  const bw = Math.min(26, slot * 0.55);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="bars" role="img" aria-label="Consumo de agua por mes, en metros cúbicos. Los valores están en el historial.">
      {[0, 0.5, 1].map((t) => {
        const y = T + plotH * (1 - t);
        return <g key={t}><line x1={L} x2={W} y1={y} y2={y} className={t ? 'bars__grid' : 'bars__base'} /><text x={L - 8} y={y + 4} textAnchor="end" className="bars__tick">{Math.round(top * t)}</text></g>;
      })}
      {historial.map((m, i) => {
        const h = (n(m.consumoM3) / top) * plotH;
        const x = L + slot * i + (slot - bw) / 2;
        return <g key={m.mes}><rect x={x} y={T + plotH - h} width={bw} height={h} rx="3" fill="#3b82a6" /><text x={x + bw / 2} y={H - 6} textAnchor="middle" className="bars__month">{m.mes}</text></g>;
      })}
    </svg>
  );
}

function Detalle({ d }) {
  const cuota = d.cuota || {}, agua = d.agua || {}, extra = d.extraordinarias || {}, multas = d.multas || {};
  const historial = d.historial || [];
  const movimientos = d.movimientos || [];
  const total = n(cuota.pendiente) + n(agua.pendiente) + n(extra.pendiente) + n(multas.pendiente);
  let saldo = 0;
  const filas = historial.map((m) => {
    const cargos = n(m.cuota) + n(m.agua) + n(m.otros);
    saldo += cargos - n(m.pagado);
    return { ...m, cargos, saldo };
  });
  const tot = filas.reduce((a, m) => ({ cuota: a.cuota + n(m.cuota), agua: a.agua + n(m.agua), m3: a.m3 + n(m.consumoM3), otros: a.otros + n(m.otros), cargos: a.cargos + m.cargos, pagado: a.pagado + n(m.pagado) }), { cuota: 0, agua: 0, m3: 0, otros: 0, cargos: 0, pagado: 0 });

  return (
    <>
      {d.demo && (
        <div className="notice"><Info size={20} aria-hidden="true" />
          <p><strong>Cuenta de demostración.</strong> Todavía no hay cargos ni pagos reales registrados para esta filial.</p>
        </div>
      )}
      <dl className="kpis">
        <div className="kpis__main"><dt>Total pendiente</dt><dd>{colones(total)}</dd></div>
        <div><dt>Estado</dt><dd>{d.estado || '—'}</dd></div>
        <div><dt>Último pago</dt><dd>{d.ultimoPago || '—'}</dd></div>
        <div><dt>Fecha de corte</dt><dd>{d.corte || '—'}</dd></div>
      </dl>

      <ul className="cargos">
        <li className="cargo">
          <span className="cargo__icon"><Home size={20} strokeWidth={1.7} aria-hidden="true" /></span>
          <h2>Cuota de condominio</h2>
          <dl>
            <div><dt>Cuota mensual</dt><dd>{colones(cuota.mensual)}</dd></div>
            <div><dt>Meses pendientes</dt><dd>{n(cuota.mesesPendientes)}</dd></div>
            <div className="cargo__due"><dt>Pendiente</dt><dd>{colones(cuota.pendiente)}</dd></div>
          </dl>
        </li>
        <li className="cargo cargo--water">
          <span className="cargo__icon"><Droplets size={20} strokeWidth={1.7} aria-hidden="true" /></span>
          <h2>Agua</h2>
          <dl>
            <div><dt>Lectura anterior</dt><dd>{n(agua.lecturaAnterior)} m³</dd></div>
            <div><dt>Lectura actual</dt><dd>{n(agua.lecturaActual)} m³</dd></div>
            <div><dt>Consumo del mes</dt><dd>{n(agua.consumoM3)} m³</dd></div>
            <div><dt>Monto del mes</dt><dd>{colones(agua.monto)}</dd></div>
            <div className="cargo__due"><dt>Pendiente</dt><dd>{colones(agua.pendiente)}</dd></div>
          </dl>
        </li>
        <li className="cargo">
          <span className="cargo__icon"><Receipt size={20} strokeWidth={1.7} aria-hidden="true" /></span>
          <h2>Cuotas extraordinarias</h2>
          <dl>
            <div><dt>Monto</dt><dd>{colones(extra.monto)}</dd></div>
            {extra.detalle && <div><dt>Detalle</dt><dd>{extra.detalle}</dd></div>}
            <div className="cargo__due"><dt>Pendiente</dt><dd>{colones(extra.pendiente)}</dd></div>
          </dl>
        </li>
        <li className="cargo">
          <span className="cargo__icon"><AlertTriangle size={20} strokeWidth={1.7} aria-hidden="true" /></span>
          <h2>Multas y mora</h2>
          <dl>
            <div><dt>Monto</dt><dd>{colones(multas.monto)}</dd></div>
            {multas.detalle && <div><dt>Detalle</dt><dd>{multas.detalle}</dd></div>}
            <div className="cargo__due"><dt>Pendiente</dt><dd>{colones(multas.pendiente)}</dd></div>
          </dl>
        </li>
      </ul>

      <div className="panel panel--wide">
        <h2 className="panel__title">Consumo de agua, <em>mes a mes</em></h2>
        <p className="panel__sub">Metros cúbicos medidos en su filial este año. Total: {tot.m3} m³.</p>
        <ConsumoAgua historial={historial} />
      </div>

      <div className="panel panel--wide">
        <h2 className="panel__title">Historial <em>del año</em></h2>
        <p className="panel__sub">Cargos y pagos de cada mes, con el saldo acumulado.</p>
        <div className="table-wrap" tabIndex={0} role="region" aria-label="Historial mensual de la filial">
          <table className="table">
            <thead><tr><th scope="col">Mes</th><th scope="col" className="num">Cuota</th><th scope="col" className="num">Agua</th><th scope="col" className="num">m³</th><th scope="col" className="num">Otros</th><th scope="col" className="num">Total cargos</th><th scope="col" className="num">Pagado</th><th scope="col" className="num">Saldo</th></tr></thead>
            <tbody>
              {filas.map((m) => (
                <tr key={m.mes}><th scope="row">{m.mes}</th><td className="num">{colones(m.cuota)}</td><td className="num">{colones(m.agua)}</td><td className="num">{n(m.consumoM3)}</td><td className="num">{colones(m.otros)}</td><td className="num">{colones(m.cargos)}</td><td className="num">{colones(m.pagado)}</td><td className="num"><strong>{colones(m.saldo)}</strong></td></tr>
              ))}
            </tbody>
            <tfoot><tr><th scope="row">Total</th><td className="num">{colones(tot.cuota)}</td><td className="num">{colones(tot.agua)}</td><td className="num">{tot.m3}</td><td className="num">{colones(tot.otros)}</td><td className="num">{colones(tot.cargos)}</td><td className="num">{colones(tot.pagado)}</td><td className="num">{colones(tot.cargos - tot.pagado)}</td></tr></tfoot>
          </table>
        </div>
      </div>

      <div className="panel panel--wide">
        <h2 className="panel__title">Movimientos <em>recientes</em></h2>
        <p className="panel__sub">Pagos y cargos registrados por la Administración.</p>
        {movimientos.length === 0 ? (
          <p className="empty-state">Todavía no hay movimientos registrados.</p>
        ) : (
          <div className="table-wrap" tabIndex={0} role="region" aria-label="Movimientos de la filial">
            <table className="table">
              <thead><tr><th scope="col">Fecha</th><th scope="col">Concepto</th><th scope="col" className="num">Cargo</th><th scope="col" className="num">Pago</th></tr></thead>
              <tbody>
                {movimientos.map((m, i) => (
                  <tr key={i}><th scope="row">{m.fecha}</th><td>{m.concepto}</td><td className="num">{m.cargo ? colones(m.cargo) : '—'}</td><td className="num">{m.pago ? colones(m.pago) : '—'}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
