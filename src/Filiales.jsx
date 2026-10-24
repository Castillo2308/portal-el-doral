import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Lock, LockOpen, ArrowLeft, ShieldAlert, Info, LogOut } from 'lucide-react';
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

        {datos && (
          <>
            {datos.demo && (
              <div className="notice"><Info size={20} aria-hidden="true" />
                <p><strong>Cuenta de demostración.</strong> Todavía no hay movimientos reales registrados para esta filial.</p>
              </div>
            )}
            <dl className="kpis">
              <div className="kpis__main"><dt>Saldo pendiente</dt><dd>{colones(datos.saldo)}</dd></div>
              <div><dt>Estado</dt><dd>{datos.estado}</dd></div>
              <div><dt>Cuota de mantenimiento</dt><dd>{colones(datos.cuotaMensual)}</dd></div>
              <div><dt>Último pago</dt><dd>{datos.ultimoPago || '—'}</dd></div>
            </dl>

            <div className="panel">
              <h2 className="panel__title">Movimientos <em>recientes</em></h2>
              <p className="panel__sub">{datos.corte ? `Corte al ${datos.corte}.` : 'Sin fecha de corte todavía.'}</p>
              {datos.movimientos.length === 0 ? (
                <p className="empty-state">Todavía no hay movimientos registrados.</p>
              ) : (
                <div className="table-wrap" tabIndex={0} role="region" aria-label="Movimientos de la filial">
                  <table className="table">
                    <thead><tr><th scope="col">Fecha</th><th scope="col">Concepto</th><th scope="col" className="num">Cargo</th><th scope="col" className="num">Pago</th></tr></thead>
                    <tbody>
                      {datos.movimientos.map((m, i) => (
                        <tr key={i}><th scope="row">{m.fecha}</th><td>{m.concepto}</td><td className="num">{m.cargo ? colones(m.cargo) : '—'}</td><td className="num">{m.pago ? colones(m.pago) : '—'}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
