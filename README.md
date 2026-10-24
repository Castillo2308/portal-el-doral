# El Doral — Condominio Residencial

Sitio de una página en React + Vite. Todo el contenido se edita en **`src/data.js`**.

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
