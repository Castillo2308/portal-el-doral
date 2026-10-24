import { meses, gastosFijos, periodos, agua } from './data.js';

export const FIJOS = gastosFijos.reduce((s, g) => s + g.monto, 0);

export const mesesCalc = meses.map((m) => {
  const ingresos = m.mantenimiento + m.extraordinaria + m.mora + m.intereses;
  const egresos = FIJOS + m.variables + m.aguaComunes;
  const resultado = ingresos - egresos;
  return { ...m, ingresos, fijos: FIJOS, egresos, resultado, margen: (resultado / ingresos) * 100, pctEgresos: (egresos / ingresos) * 100 };
});

const sum = (arr, k) => arr.reduce((s, x) => s + x[k], 0);

export const totalMeses = (() => {
  const t = {};
  ['mantenimiento', 'extraordinaria', 'mora', 'intereses', 'ingresos', 'fijos', 'variables', 'aguaComunes', 'egresos', 'resultado'].forEach((k) => (t[k] = sum(mesesCalc, k)));
  t.margen = (t.resultado / t.ingresos) * 100;
  t.pctEgresos = (t.egresos / t.ingresos) * 100;
  return t;
})();

export const periodosCalc = periodos.map((p) => {
  const utilidad = p.ingresos - p.egresos;
  return { ...p, utilidad, margen: (utilidad / p.ingresos) * 100, disponible: utilidad - p.reserva };
});

export const consolidado = (() => {
  const ingresos = sum(periodos, 'ingresos');
  const egresos = sum(periodos, 'egresos');
  const reserva = sum(periodos, 'reserva');
  const utilidad = ingresos - egresos;
  return { periodo: 'Consolidado Sep 2025 – Jul 2026', ingresos, egresos, reserva, utilidad, margen: (utilidad / ingresos) * 100, disponible: utilidad - reserva };
})();

export const aguaCalc = agua.map((a) => ({ ...a, subsidio: a.pagado - a.cobrado, pct: ((a.pagado - a.cobrado) / a.pagado) * 100 }));
export const aguaTotal = (() => {
  const cobrado = sum(agua, 'cobrado');
  const pagado = sum(agua, 'pagado');
  return { periodo: 'Consolidado', cobrado, pagado, subsidio: pagado - cobrado, pct: ((pagado - cobrado) / pagado) * 100 };
})();
