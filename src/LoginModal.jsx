import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from './auth.jsx';

const LoginCtx = createContext(() => {});
export const useLogin = () => useContext(LoginCtx);

function Modal({ destino, onClose }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(destino || '');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const ref = useRef(null);
  const primero = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const quien = document.activeElement;
    (destino ? ref.current?.querySelector('#login-clave') : primero.current)?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && ref.current) {
        const f = ref.current.querySelectorAll('input, button');
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); quien?.focus?.(); };
  }, [destino, onClose]);

  const enviar = async (e) => {
    e.preventDefault();
    if (!usuario.trim() || !clave) { setError('Escriba su usuario y su contraseña.'); return; }
    setCargando(true);
    setError('');
    const r = await login(usuario, clave);
    setCargando(false);
    if (!r.ok) { setError('Usuario o contraseña incorrectos. Revíselos e intente de nuevo.'); setClave(''); return; }
    onClose();
    navigate(`/filiales/${destino || r.usuario}`);
  };

  return (
    <div className="modal" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} className="modal__card" role="dialog" aria-modal="true" aria-labelledby="login-t" aria-describedby="login-d">
        <button className="modal__close" onClick={onClose}><X size={18} aria-hidden="true" /><span className="sr-only">Cerrar</span></button>
        <span className="modal__icon"><Lock size={20} strokeWidth={1.7} aria-hidden="true" /></span>
        <h2 id="login-t" className="modal__title">{destino ? `Filial ${destino}` : 'Iniciar sesión'}</h2>
        <p id="login-d" className="modal__text">Para ver tu estado de cuenta, inicia sesión.</p>
        <form onSubmit={enviar} noValidate>
          <label className="field">
            <span>Usuario</span>
            <input ref={primero} id="login-usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)}
              autoComplete="username" autoCapitalize="characters" spellCheck="false" placeholder="Ej.: 1A"
              aria-invalid={!!error} />
          </label>
          <label className="field">
            <span>Contraseña</span>
            <input id="login-clave" type="password" value={clave} onChange={(e) => setClave(e.target.value)}
              autoComplete="current-password" aria-invalid={!!error} aria-describedby={error ? 'login-err' : undefined} />
          </label>
          {error && <p id="login-err" className="form-error" role="alert"><AlertCircle size={16} aria-hidden="true" />{error}</p>}
          <button className="pill pill--solid modal__submit" type="submit" disabled={cargando}>
            {cargando ? <><Loader2 size={18} className="spin" aria-hidden="true" /> Verificando…</> : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}

export function LoginProvider({ children }) {
  const [estado, setEstado] = useState(null); // null = cerrado; { destino } = abierto
  const abrir = useCallback((destino = null) => setEstado({ destino }), []);
  const cerrar = useCallback(() => setEstado(null), []);
  return (
    <LoginCtx.Provider value={abrir}>
      {children}
      {estado && <Modal destino={estado.destino} onClose={cerrar} />}
    </LoginCtx.Provider>
  );
}
