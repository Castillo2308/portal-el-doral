# Portal de Propietarios — Condominio Residencial El Doral

Sitio en React + Vite + React Router. Todo el contenido vive en **`src/data.js`**.

## Páginas

| Dirección | Contenido |
|---|---|
| `/` | Inicio: resultado de cada mes, accesos a cada sección y novedades |
| `/finanzas` | Resultados, ingresos, egresos, agua, cuentas por cobrar y Sep–Dic 2025 |
| `/lineamientos` | Normas vigentes con buscador |
| `/proyectos` | Techos (fotos y costos) y registro de obras |
| `/legal` | Expediente del taller y casos atendidos |
| `/condominio` | Instalaciones |
| `/administracion` | Tareas mensuales de CMD S.A. |
| `/contacto` | Canales oficiales |

`netlify.toml` y `public/_redirects` hacen que cada dirección funcione al abrirla directamente o al recargar.

## Actualización mensual

1. Abrir `src/data.js`.
2. Cambiar `actualizacion` (mes y fecha de corte).
3. Agregar el mes nuevo al final de `meses` (mantenimiento, extraordinaria, mora, intereses, variables, aguaComunes y el `detalle` de gastos variables).
   Los totales, márgenes y porcentajes de las tablas se calculan solos.
4. Actualizar `periodos`, `reserva`, `agua` y `cuentasPorCobrar` con las cifras del cierre.
5. Compilar y publicar (abajo).

## Fotos

1. Guardar las imágenes en `public/img/` (JPG horizontal, idealmente 2000 px de ancho).
2. En `src/data.js`, dentro de `fotos`, cambiar `null` por `img('nombre-del-archivo.jpg')`:
   `portada` es la foto grande de la portada y `galeria` son las cinco de la página Condominio.

## Comandos

```bash
npm install
npm run dev      # vista previa local en http://localhost:5173
npm run build    # genera la carpeta dist/ lista para publicar
```

## Publicación actual: GitHub Pages

Sitio en vivo: https://castillo2308.github.io/portal-el-doral/

Cada `git push` a `main` vuelve a publicar el sitio solo (`.github/workflows/deploy.yml`).
Para la actualización mensual basta con editar `src/data.js`, hacer commit y push.

## Publicar en Netlify (opcional)

- **Arrastrar y soltar:** ejecutar `npm run build` y arrastrar la carpeta `dist/` al panel *Deploys* del sitio en Netlify.
- **Con Git:** conectar el repositorio; `netlify.toml` ya indica `npm run build` y la carpeta `dist`.

## Privacidad

El portal es público: las cuentas por cobrar se publican solo por número de filial, sin nombres de propietarios (Ley 8968).
