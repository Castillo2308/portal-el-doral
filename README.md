# El Doral — Condominio Residencial

Sitio en React + Vite con varias páginas: Inicio, El condominio, Convivencia, Proyectos, Finanzas, Filiales y Contacto.
Todo el contenido se edita en **`src/data.js`**.

## Finanzas

En `src/data.js`, dentro de `finanzas`, cada rubro (electricidad, agua, seguridad, administración, jardinería,
mantenimiento, limpieza, internet y teléfono, otros) y cada ingreso tiene 12 montos, de enero a diciembre.
Hoy están todos en 0. Al cerrar un mes se reemplaza el 0 de ese mes; los gráficos y totales se calculan solos.

Sitio en vivo: https://castillo2308.github.io/portal-el-doral/
Cada `git push` a `main` lo vuelve a publicar solo (`.github/workflows/deploy.yml`).

## Filiales y estados de cuenta

- `/filiales` muestra las 62 filiales (1A a 31B). Cada cuenta solo puede abrir su propia filial.
- El estado de cuenta incluye cuota de condominio, agua (lecturas, consumo y monto), cuotas extraordinarias,
  multas y mora, consumo de agua mes a mes, historial del año y movimientos.
- Cada estado de cuenta se publica **cifrado** (AES-256-GCM, clave derivada de la contraseña con PBKDF2-SHA256
  y sal única) en `public/cuentas/<FILIAL>.json`. Sin la contraseña de esa filial el archivo no se puede leer,
  aunque se descargue directamente. Las contraseñas no se guardan en ningún archivo.
- **Contraseñas de demostración:** hoy cada contraseña es igual al usuario (1A / 1A). Así cualquiera puede abrir
  cualquier filial: no cargue datos reales hasta cambiarlas.

### Cambiar contraseñas y cargar estados reales

1. Cree la carpeta `cuentas-privadas/` (está en `.gitignore`, nunca se sube a GitHub).
2. `cuentas-privadas/claves.csv`: una línea por filial, `1A,UnaClaveLargaYUnica`.
3. `cuentas-privadas/estados.json` (opcional), por filial:
   ```json
   { "1A": {
       "estado": "Pendiente", "corte": "31 de julio 2026", "ultimoPago": "15/07/2026", "demo": false,
       "cuota": { "mensual": 45000, "pendiente": 45000, "mesesPendientes": 1 },
       "agua": { "lecturaAnterior": 120, "lecturaActual": 132, "consumoM3": 12, "monto": 17875, "pendiente": 0 },
       "extraordinarias": { "monto": 0, "pendiente": 0, "detalle": "" },
       "multas": { "monto": 0, "pendiente": 0, "detalle": "" },
       "historial": [{ "mes": "Ene", "cuota": 45000, "agua": 15000, "consumoM3": 10, "otros": 0, "pagado": 60000 }],
       "movimientos": [{ "fecha": "15/07", "concepto": "Pago cuota julio", "pago": 45000 }]
   } }
   ```
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

## Proyectos

En `src/data.js`, `proyectos` tiene cada proyecto con `estado`: `completado`, `activo`, `pendiente` o `procesando`
(en cotización, revisión o aprobación). La página `/proyectos` los agrupa y filtra por estado.
