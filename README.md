# El Doral — Condominio Residencial

Sitio en React + Vite con varias páginas: Inicio, El condominio, Convivencia, Mejoras, Finanzas y Contacto.
Todo el contenido se edita en **`src/data.js`**.

## Finanzas

En `src/data.js`, dentro de `finanzas`, cada rubro (electricidad, agua, seguridad, administración, jardinería,
mantenimiento, limpieza, internet y teléfono, otros) y cada ingreso tiene 12 montos, de enero a diciembre.
Hoy están todos en 0. Al cerrar un mes se reemplaza el 0 de ese mes; los gráficos y totales se calculan solos.

Sitio en vivo: https://castillo2308.github.io/portal-el-doral/
Cada `git push` a `main` lo vuelve a publicar solo (`.github/workflows/deploy.yml`).

## Filiales y estados de cuenta

- `/filiales` muestra las 60 filiales (1A a 30B). Cada cuenta solo puede abrir su propia filial.
- Cada estado de cuenta se publica **cifrado** (AES-256-GCM, clave derivada de la contraseña con PBKDF2-SHA256
  y sal única) en `public/cuentas/<FILIAL>.json`. Sin la contraseña de esa filial el archivo no se puede leer,
  aunque se descargue directamente. Las contraseñas no se guardan en ningún archivo.
- **Contraseñas de demostración:** hoy cada contraseña es igual al usuario (1A / 1A). Así cualquiera puede abrir
  cualquier filial: no cargue datos reales hasta cambiarlas.

### Cambiar contraseñas y cargar estados reales

1. Cree la carpeta `cuentas-privadas/` (está en `.gitignore`, nunca se sube a GitHub).
2. `cuentas-privadas/claves.csv`: una línea por filial, `1A,UnaClaveLargaYUnica`.
3. `cuentas-privadas/estados.json` (opcional): `{ "1A": { "saldo": 45000, "estado": "Pendiente", "cuotaMensual": 45000,
   "ultimoPago": "15/07/2026", "corte": "31 de julio 2026", "movimientos": [{ "fecha": "15/07", "concepto": "Cuota julio", "pago": 45000 }], "demo": false } }`
4. Ejecute `node scripts/cuentas.mjs`, luego haga commit y push de `public/cuentas/`.
5. Entregue cada contraseña a su propietario por un canal privado.

## Sus datos en el pie de página

En `src/data.js`, completar `autor` (nombre, cargo, teléfono, correo y una nota opcional).
Los campos vacíos no se muestran.

## Fotos

1. Guardar las imágenes en `public/img/` (JPG horizontal, unos 2000 px de ancho).
2. En `src/data.js`, dentro de `fotos`, cambiar `null` por `img('archivo.jpg')`:
   - `portada`: la foto grande de la portada.
   - `administracion`, `residentes` y `areasComunes`: las tres fotos de la sección «Menos trámites».

## Comandos

```bash
npm install
npm run dev
npm run build
```
