import { createContext, useCallback, useContext, useMemo, useState } from 'react';

/*
 * Sesión por filial.
 * Cada estado de cuenta está cifrado (AES-256-GCM) con una clave derivada de la contraseña
 * de su filial (PBKDF2-SHA256). Iniciar sesión = lograr descifrar el archivo de esa filial;
 * con la clave de 1A no se puede descifrar 1B, aunque se salte la interfaz.
 * La clave derivada vive solo en esta pestaña (sessionStorage) y se borra al cerrar sesión.
 */

export const FILIALES = [];
for (let n = 1; n <= 31; n++) for (const l of ['A', 'B']) FILIALES.push(`${n}${l}`);

const KEY = 'eldoral.sesion';
const enc = new TextEncoder();
const fromB64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const toB64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));

export const normalizar = (u) => u.trim().toUpperCase().replace(/\s+/g, '');

async function cargarArchivo(id) {
  const r = await fetch(`${import.meta.env.BASE_URL}cuentas/${id}.json`, { cache: 'no-store' });
  if (!r.ok) throw new Error('archivo');
  return r.json();
}

async function derivar(clave, archivo) {
  const base = await crypto.subtle.importKey('raw', enc.encode(clave), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt: fromB64(archivo.salt), iterations: archivo.iter },
    base, { name: 'AES-GCM', length: 256 }, true, ['decrypt'],
  );
}

async function descifrar(key, archivo, id) {
  const plano = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: fromB64(archivo.iv), additionalData: enc.encode(id) },
    key, fromB64(archivo.data),
  );
  return JSON.parse(new TextDecoder().decode(plano));
}

function leerSesion() {
  try { return JSON.parse(sessionStorage.getItem(KEY)) || null; } catch { return null; }
}

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(leerSesion);

  const login = useCallback(async (usuario, clave) => {
    const id = normalizar(usuario);
    if (!FILIALES.includes(id) || !clave) return { ok: false };
    try {
      const archivo = await cargarArchivo(id);
      const key = await derivar(clave, archivo);
      await descifrar(key, archivo, id); // si la contraseña no es la correcta, esto falla
      const s = { usuario: id, key: toB64(await crypto.subtle.exportKey('raw', key)) };
      try { sessionStorage.setItem(KEY, JSON.stringify(s)); } catch { /* sin almacenamiento: la sesión dura hasta recargar */ }
      setSesion(s);
      return { ok: true, usuario: id };
    } catch {
      return { ok: false };
    }
  }, []);

  const logout = useCallback(() => {
    try { sessionStorage.removeItem(KEY); } catch { /* nada que borrar */ }
    setSesion(null);
  }, []);

  /* Solo devuelve datos si la sesión es de esa misma filial y la clave logra descifrarlos */
  const estadoDe = useCallback(async (id) => {
    if (!sesion || sesion.usuario !== id) throw new Error('permiso');
    const archivo = await cargarArchivo(id);
    const key = await crypto.subtle.importKey('raw', fromB64(sesion.key), 'AES-GCM', false, ['decrypt']);
    return descifrar(key, archivo, id);
  }, [sesion]);

  const value = useMemo(() => ({ usuario: sesion?.usuario || null, login, logout, estadoDe }), [sesion, login, logout, estadoDe]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
