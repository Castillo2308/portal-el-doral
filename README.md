# El Doral — Condominio Residencial

Sitio en React + Vite con varias páginas: Inicio, El condominio, Convivencia, Mejoras, Finanzas y Contacto.
Todo el contenido se edita en **`src/data.js`**.

## Finanzas

En `src/data.js`, dentro de `finanzas`, cada rubro (electricidad, agua, seguridad, administración, jardinería,
mantenimiento, limpieza, internet y teléfono, otros) y cada ingreso tiene 12 montos, de enero a diciembre.
Hoy están todos en 0. Al cerrar un mes se reemplaza el 0 de ese mes; los gráficos y totales se calculan solos.

Sitio en vivo: https://castillo2308.github.io/portal-el-doral/
Cada `git push` a `main` lo vuelve a publicar solo (`.github/workflows/deploy.yml`).

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
