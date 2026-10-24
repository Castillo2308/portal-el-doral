/*
 * Genera los estados de cuenta CIFRADOS de cada filial en public/cuentas/<FILIAL>.json
 *
 * Cada archivo se cifra con AES-256-GCM usando una clave derivada de la contraseña de esa
 * filial (PBKDF2-SHA256, sal aleatoria por filial). Sin la contraseña correcta el archivo
 * no se puede leer, aunque se descargue directamente. Las contraseñas no se guardan en
 * ningún archivo publicado: el inicio de sesión se verifica al lograr descifrar.
 *
 * Uso:  node scripts/cuentas.mjs
 *
 * Archivos privados opcionales (carpeta cuentas-privadas/, NO se sube a GitHub):
 *   - claves.csv    filial,contraseña   (una por línea). Si falta una filial, se usa la
 *                   contraseña de demostración igual al usuario (1A / 1A).
 *   - estados.json  { "1A": { ...estado de cuenta... }, ... }. Si falta, todo va en 0.
 */
import { webcrypto as crypto } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';

const ITER = 310000;
const FILIALES = [];
for (let n = 1; n <= 30; n++) for (const l of ['A', 'B']) FILIALES.push(`${n}${l}`);

const priv = new URL('../cuentas-privadas/', import.meta.url);
const out = new URL('../public/cuentas/', import.meta.url);
mkdirSync(out, { recursive: true });

const claves = {};
const csv = new URL('claves.csv', priv);
if (existsSync(csv)) {
  for (const line of readFileSync(csv, 'utf8').split(/\r?\n/)) {
    const [id, ...rest] = line.split(',');
    if (id && rest.length) claves[id.trim().toUpperCase()] = rest.join(',').trim();
  }
}
const estadosFile = new URL('estados.json', priv);
const estados = existsSync(estadosFile) ? JSON.parse(readFileSync(estadosFile, 'utf8')) : {};

const plantilla = (id) => ({
  filial: id,
  corte: null,
  estado: 'Al día',
  saldo: 0,
  cuotaMensual: 0,
  ultimoPago: null,
  pendientes: [],
  movimientos: [],
  demo: true,
});

const b64 = (buf) => Buffer.from(buf).toString('base64');
let demo = 0;

for (const id of FILIALES) {
  const clave = claves[id] ?? id;
  if (!claves[id]) demo++;
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(clave), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITER },
    base, { name: 'AES-GCM', length: 256 }, false, ['encrypt'],
  );
  const datos = { ...plantilla(id), ...(estados[id] || {}), filial: id };
  // El identificador va como dato autenticado: un archivo no puede hacerse pasar por otra filial
  const cifrado = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv, additionalData: new TextEncoder().encode(id) },
    key, new TextEncoder().encode(JSON.stringify(datos)),
  );
  writeFileSync(new URL(`${id}.json`, out), JSON.stringify({ v: 1, kdf: 'PBKDF2-SHA256', iter: ITER, salt: b64(salt), iv: b64(iv), data: b64(cifrado) }));
}

console.log(`Listo: ${FILIALES.length} filiales cifradas en public/cuentas/.`);
if (demo) console.log(`Atención: ${demo} filiales usan la contraseña de demostración (igual al usuario).`);
