import { useState } from 'react';
import {
  ResponsiveContainer, ComposedChart, BarChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  ReferenceLine, Cell, PieChart, Pie, Legend,
} from 'recharts';
import { Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  actualizacion, metodologia, gastosFijos, PRESUPUESTO_MANTENIMIENTO, reserva, cuentasPorCobrar,
  sepDic2025,
} from '../data.js';
import { mesesCalc, totalMeses, periodosCalc, consolidado, aguaCalc, aguaTotal, FIJOS } from '../calc.js';
import { Section, Callout, Stat, Tabs, DataTable, Money, colones, colonesCorto, pct } from './ui.jsx';

const C = {
  ink: '#162638', gold: '#B09A6B', teal: '#2F5F6B', pos: '#3B6A4C', neg: '#9A3D2A', water: '#3D6A85', muted: '#8A7D73', grid: '#D6CEC0',
};

function ChartTip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tip">
      <p className="chart-tip__label">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey}><i style={{ background: p.color }} />{p.name}: <strong>{colones(p.value)}</strong></p>
      ))}
    </div>
  );
}

const axis = { tick: { fill: '#5F544D', fontSize: 12 }, axisLine: false, tickLine: false };

/* ---------- Pestañas ---------- */

function Resultados() {
  const data = mesesCalc.map((m) => ({ mes: m.corto, Ingresos: m.ingresos, Egresos: m.egresos, Resultado: m.resultado }));
  return (
    <>
      <p className="lede">Cada mes se compara lo que entra por cuotas con todo lo que cuesta operar el condominio, incluida la parte del agua de áreas comunes que no pagan las filiales.</p>
      <div className="chart-box" aria-hidden="true">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke={C.grid} />
            <XAxis dataKey="mes" {...axis} />
            <YAxis tickFormatter={colonesCorto} width={70} {...axis} />
            <Tooltip content={<ChartTip />} cursor={{ fill: 'rgba(22,38,56,.05)' }} />
            <Legend wrapperStyle={{ fontSize: 13 }} />
            <ReferenceLine y={0} stroke={C.ink} />
            <Bar isAnimationActive={false} dataKey="Ingresos" fill={C.ink} radius={[3, 3, 0, 0]} maxBarSize={28} />
            <Bar isAnimationActive={false} dataKey="Egresos" fill={C.gold} radius={[3, 3, 0, 0]} maxBarSize={28} />
            <Line isAnimationActive={false} dataKey="Resultado" stroke={C.pos} strokeWidth={2.5} dot={{ r: 4, fill: C.pos }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <DataTable
        caption="Estado de resultados operativo, enero a julio 2026"
        columns={[
          { key: 'nombre', label: 'Mes' },
          { key: 'ingresos', label: 'Ingresos', num: true, render: (r) => colones(r.ingresos) },
          { key: 'fijos', label: 'Gastos fijos', num: true, render: (r) => colones(r.fijos) },
          { key: 'variables', label: 'Variables', num: true, render: (r) => colones(r.variables) },
          { key: 'aguaComunes', label: 'Agua áreas comunes', num: true, render: (r) => <span className="t-water">{colones(r.aguaComunes)}</span> },
          { key: 'egresos', label: 'Total egresos', num: true, render: (r) => colones(r.egresos) },
          { key: 'resultado', label: 'Resultado', num: true, render: (r) => <Money value={r.resultado} signed /> },
          { key: 'margen', label: 'Margen', num: true, render: (r) => pct(r.margen) },
        ]}
        rows={mesesCalc}
        total={{ ...totalMeses, nombre: 'Total ene–jul' }}
      />
      <Callout tone="info" title="Conclusión">
        Hubo superávit en seis de los siete meses y el acumulado de enero a julio es positivo: <strong>{colones(totalMeses.resultado)}</strong>.
        El déficit de junio ({colones(mesesCalc[5].resultado)}) se explica por la pintura de techos ({colones(797845)} en un solo mes).
        Julio recuperó el ritmo habitual con {colones(mesesCalc[6].resultado)} de superávit, y el agua de áreas comunes bajó a su nivel más bajo del año.
      </Callout>
    </>
  );
}

function Ingresos() {
  const data = mesesCalc.map((m) => ({ mes: m.corto, Mantenimiento: m.mantenimiento, Otros: m.extraordinaria + m.mora + m.intereses }));
  return (
    <>
      <Callout tone="info" title="¿Por qué no aparece el cobro de agua?">
        El condominio solo es intermediario del macromedidor del AyA: el dinero del agua entra y sale para pagar esa factura.
        Contarlo como ingreso inflaría las cifras y daría una imagen falsa de rentabilidad. El detalle está en la pestaña Agua.
      </Callout>
      <dl className="stats stats--4">
        <Stat label="Cuota de mantenimiento cobrada, ene–jul" value={colones(totalMeses.mantenimiento)} />
        <Stat label="Cuotas extraordinarias (ene y feb)" value={colones(totalMeses.extraordinaria)} />
        <Stat label="Mora cobrada (enero)" value={colones(totalMeses.mora)} />
        <Stat label="Total de ingresos operativos" value={colones(totalMeses.ingresos)} tone="ink" />
      </dl>
      <div className="chart-box" aria-hidden="true">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke={C.grid} />
            <XAxis dataKey="mes" {...axis} />
            <YAxis tickFormatter={colonesCorto} width={70} domain={[0, 3500000]} {...axis} />
            <Tooltip content={<ChartTip />} cursor={{ fill: 'rgba(22,38,56,.05)' }} />
            <ReferenceLine y={PRESUPUESTO_MANTENIMIENTO} stroke={C.neg} strokeDasharray="5 4"
              label={{ value: 'Presupuesto ₡2,79 M', position: 'insideTopRight', fill: C.neg, fontSize: 12 }} />
            <Bar isAnimationActive={false} dataKey="Mantenimiento" stackId="a" fill={C.ink} maxBarSize={34} />
            <Bar isAnimationActive={false} dataKey="Otros" name="Extraordinarias, mora e intereses" stackId="a" fill={C.gold} radius={[3, 3, 0, 0]} maxBarSize={34} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <DataTable
        caption="Ingresos operativos por mes"
        columns={[
          { key: 'nombre', label: 'Mes' },
          { key: 'mantenimiento', label: 'Mantenimiento', num: true, render: (r) => colones(r.mantenimiento) },
          { key: 'extraordinaria', label: 'Extraordinaria', num: true, render: (r) => (r.extraordinaria ? colones(r.extraordinaria) : '—') },
          { key: 'mora', label: 'Mora', num: true, render: (r) => (r.mora ? colones(r.mora) : '—') },
          { key: 'intereses', label: 'Intereses', num: true, render: (r) => (r.intereses ? colones(r.intereses) : '—') },
          { key: 'ingresos', label: 'Total', num: true, render: (r) => <strong>{colones(r.ingresos)}</strong> },
        ]}
        rows={mesesCalc}
        total={{ ...totalMeses, nombre: 'Total' }}
      />
      <Callout tone="warn" title="Presupuesto mensual: ₡2.790.000 (62 filiales × ₡45.000)">
        Lo que falta cada mes para llegar al presupuesto es la mora de quienes no pagan a tiempo.
        En julio se recaudó {colones(mesesCalc[6].mantenimiento)}, el {pct((mesesCalc[6].mantenimiento / PRESUPUESTO_MANTENIMIENTO) * 100)} del presupuesto,
        con solo 4 filiales pendientes al cierre: una mejora frente a junio.
      </Callout>
    </>
  );
}

function Egresos() {
  const [mes, setMes] = useState(mesesCalc.length - 1);
  const m = mesesCalc[mes];
  return (
    <>
      <p className="lede">Los egresos suman los <strong>gastos fijos</strong> de cada mes, los <strong>gastos variables</strong> según la operación y la <strong>diferencia de agua de áreas comunes</strong>, que cubre el fondo de mantenimiento.</p>

      <div className="fixed-costs">
        <p className="fixed-costs__head">
          <span>Gastos fijos por mes</span>
          <strong>{colones(FIJOS)}</strong>
        </p>
        <div className="stackbar" role="img" aria-label={gastosFijos.map((g) => `${g.concepto}: ${colones(g.monto)}`).join(', ')}>
          {gastosFijos.map((g, i) => (
            <span key={g.concepto} style={{ flexGrow: g.monto }} className={`stackbar__seg stackbar__seg--${i}`} />
          ))}
        </div>
        <ul className="fixed-costs__list">
          {gastosFijos.map((g, i) => (
            <li key={g.concepto}>
              <i className={`swatch stackbar__seg--${i}`} />
              <span>{g.concepto} <small>{g.proveedor}</small></span>
              <strong>{colones(g.monto)}</strong>
              <small>{pct((g.monto / FIJOS) * 100, 0)}</small>
            </li>
          ))}
        </ul>
      </div>

      <DataTable
        caption="Egresos operativos por mes"
        columns={[
          { key: 'nombre', label: 'Mes' },
          { key: 'fijos', label: 'Fijos', num: true, render: (r) => colones(r.fijos) },
          { key: 'variables', label: 'Variables', num: true, render: (r) => colones(r.variables) },
          { key: 'aguaComunes', label: 'Agua áreas comunes', num: true, render: (r) => <span className="t-water">{colones(r.aguaComunes)}</span> },
          { key: 'egresos', label: 'Total', num: true, render: (r) => <strong>{colones(r.egresos)}</strong> },
          { key: 'pctEgresos', label: '% de los ingresos', num: true, render: (r) => <span className={r.pctEgresos > 100 ? 't-neg' : undefined}>{pct(r.pctEgresos)}</span> },
        ]}
        rows={mesesCalc}
        total={{ ...totalMeses, nombre: 'Total' }}
      />

      <h3 className="h3">Gastos variables, mes por mes</h3>
      <div className="month-picker" role="group" aria-label="Elegir mes">
        {mesesCalc.map((x, i) => (
          <button key={x.id} className="chip" aria-pressed={mes === i} onClick={() => setMes(i)}>{x.corto}</button>
        ))}
      </div>
      <div className="ledger">
        <p className="ledger__title">{m.nombre}{m.nota && <span className="badge badge--gold">{m.nota}</span>}</p>
        <ul>
          {m.detalle.map(([c, v, destacado]) => (
            <li key={c} className={destacado ? 'is-highlight' : undefined}><span>{c}</span><span className="num">{colones(v)}</span></li>
          ))}
          <li className="ledger__sub"><span>Subtotal de gastos variables</span><span className="num">{colones(m.variables)}</span></li>
          <li className="is-water"><span>Diferencia de agua de áreas comunes</span><span className="num">{colones(m.aguaComunes)}</span></li>
          <li className="ledger__muted"><span>Portería, administración y riego</span><span className="num">{colones(m.fijos)}</span></li>
          <li className={`ledger__total ${m.resultado < 0 ? 'is-neg' : 'is-pos'}`}><span>Total de egresos del mes</span><span className="num">{colones(m.egresos)}</span></li>
        </ul>
      </div>
      <p className="small">El desglose completo de la pintura de techos está en <Link to="/proyectos">Proyectos</Link>.</p>
    </>
  );
}

function Agua() {
  const data = aguaCalc.map((a) => ({ periodo: a.periodo, 'Cobrado a filiales': a.cobrado, 'Cubierto por el fondo': a.subsidio }));
  return (
    <>
      <div className="explain">
        <h3 className="h3">Cómo funciona el agua en El Doral</h3>
        <ol className="steps">
          <li>El AyA cobra un solo <strong>macromedidor</strong> que incluye las 62 filiales y las áreas comunes (jardines, lavado y caseta).</li>
          <li>La Administración cobra a cada filial <strong>solo su consumo medido</strong>.</li>
          <li>La diferencia es el consumo de las áreas comunes y la cubre el <strong>fondo de mantenimiento</strong>. Si una filial no paga su agua, ese monto también sale del fondo.</li>
          <li><strong>Política del 80 %:</strong> el pago al AyA se libera cuando se ha recaudado al menos el 80 % de lo facturado a las filiales.</li>
        </ol>
      </div>
      <dl className="stats stats--3">
        <Stat label="Cobrado a filiales, todo el período" value={colones(aguaTotal.cobrado)} tone="water" />
        <Stat label="Pagado al AyA, todo el período" value={colones(aguaTotal.pagado)} tone="ink" />
        <Stat label="Cubierto por el fondo de mantenimiento" value={colones(aguaTotal.subsidio)} note={`${pct(aguaTotal.pct)} de la factura`} tone="neg" />
      </dl>
      <div className="chart-box" aria-hidden="true">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke={C.grid} />
            <XAxis dataKey="periodo" {...axis} interval={0} />
            <YAxis tickFormatter={colonesCorto} width={70} {...axis} />
            <Tooltip content={<ChartTip />} cursor={{ fill: 'rgba(22,38,56,.05)' }} />
            <Legend wrapperStyle={{ fontSize: 13 }} />
            <Bar isAnimationActive={false} dataKey="Cobrado a filiales" stackId="a" fill={C.water} maxBarSize={56} />
            <Bar isAnimationActive={false} dataKey="Cubierto por el fondo" stackId="a" fill={C.neg} radius={[3, 3, 0, 0]} maxBarSize={56} />
          </BarChart>
        </ResponsiveContainer>
        <p className="chart-box__note">La barra completa es lo pagado al AyA en cada período.</p>
      </div>
      <DataTable
        caption="Agua: cobrado a filiales frente a pagado al AyA"
        columns={[
          { key: 'periodo', label: 'Período' },
          { key: 'cobrado', label: 'Cobrado a filiales', num: true, render: (r) => colones(r.cobrado) },
          { key: 'pagado', label: 'Pagado al AyA', num: true, render: (r) => colones(r.pagado) },
          { key: 'subsidio', label: 'Áreas comunes', num: true, render: (r) => <span className="t-water">{colones(r.subsidio)}</span> },
          { key: 'pct', label: '% cubierto por el fondo', num: true, render: (r) => pct(r.pct) },
        ]}
        rows={aguaCalc}
        total={aguaTotal}
      />
      <Callout tone="ok" title="Julio: el agua de áreas comunes bajó a ₡96.796">
        Es el monto más bajo del ejercicio (8,7 % de la factura, frente al 36,6 % de junio), gracias a una mejor cobranza de la cuota de agua.
        En los 11 meses el fondo ha cubierto {colones(aguaTotal.subsidio)}. Las dos causas principales:
        <ul className="list">
          <li>Una denuncia anónima ante el AyA cerró el tubo externo de riego. Desde entonces el riego de áreas verdes se hace por los tubos internos, y ese consumo lo mide el macromedidor.</li>
          <li>La morosidad histórica de algunas filiales en la cuota de agua.</li>
        </ul>
      </Callout>
    </>
  );
}

function PorCobrar() {
  const c = cuentasPorCobrar;
  const totalMA = c.mantenimientoAgua.reduce((s, r) => s + r.saldo, 0);
  const totalEx = c.extraordinaria.reduce((s, r) => s + r.saldo, 0);
  const pie = [
    { name: 'Al día', value: c.alDia, color: C.pos },
    { name: 'Pago parcial', value: c.parcial, color: C.gold },
    { name: 'Sin pago', value: c.pendienteTotal, color: C.neg },
  ];
  const cols = [
    { key: 'filial', label: 'Filial' },
    { key: 'concepto', label: 'Concepto' },
    { key: 'saldo', label: 'Saldo pendiente', num: true, render: (r) => <span className="t-neg">{colones(r.saldo)}</span> },
  ];
  return (
    <>
      <div className="cxc">
        <div className="cxc__donut">
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie isAnimationActive={false} data={pie} dataKey="value" innerRadius={62} outerRadius={92} paddingAngle={2} startAngle={90} endAngle={-270} stroke="none">
                {pie.map((p) => <Cell key={p.name} fill={p.color} />)}
              </Pie>
              <Tooltip formatter={(v, n) => [`${v} filiales`, n]} />
            </PieChart>
          </ResponsiveContainer>
          <p className="cxc__center"><strong>{c.alDia}</strong><span>de 62 al día</span></p>
        </div>
        <dl className="stats stats--2">
          <Stat label="Filiales al día" value={c.alDia} tone="pos" />
          <Stat label="Con pago parcial" value={c.parcial} tone="gold" />
          <Stat label="Sin ningún pago" value={c.pendienteTotal} tone="neg" />
          <Stat label="Cobrado de lo facturado en julio" value={pct(c.recaudacionMes)} tone="teal" />
          <Stat label="Mantenimiento y agua pendientes" value={colones(totalMA)} note={`${c.mantenimientoAgua.length} filiales`} />
          <Stat label="Total por cobrar" value={colones(totalMA + totalEx)} tone="ink" />
        </dl>
      </div>

      <h3 className="h3">Mantenimiento y agua pendientes al {actualizacion.corte}</h3>
      <DataTable caption="Saldos pendientes de mantenimiento y agua" columns={cols} rows={c.mantenimientoAgua}
        total={{ filial: `Total (${c.mantenimientoAgua.length} filiales)`, concepto: '', saldo: totalMA }} />

      <h3 className="h3">Cuota extraordinaria del asfaltado</h3>
      <DataTable caption="Saldo pendiente de cuota extraordinaria" columns={cols} rows={c.extraordinaria} />

      <Callout tone="ok" title="Mejora en la recaudación">
        Julio cerró con 11 filiales pendientes, una menos que junio, y solo una sin ningún pago.
        La Administración da seguimiento cada mes con estados de cuenta individuales.
      </Callout>
    </>
  );
}

function SepDic() {
  const s = sepDic2025;
  const ti = s.ingresos.reduce((a, r) => a + r[2], 0);
  const te = s.egresos.reduce((a, r) => a + r[2], 0);
  const ac = s.balance.activoCorriente.reduce((a, r) => a + r[1], 0);
  const af = s.balance.activoFijo.reduce((a, r) => a + r[1], 0);
  const tp = s.balance.pasivos.reduce((a, r) => a + r[1], 0);
  const pa = s.balance.patrimonio.reduce((a, r) => a + r[1], 0);
  const Row = ({ c, n, v }) => <li><span>{c && <code>{c}</code>}{n}</span><span className="num">{colones(v)}</span></li>;
  return (
    <>
      <p className="lede">Este es el estado contable tradicional del período, que sí incluye el agua como ingreso y gasto. Por eso sus totales son mayores que los ingresos y egresos operativos del resumen.</p>
      <dl className="stats stats--4">
        <Stat label="Ingresos totales" value={colones(ti)} tone="ink" />
        <Stat label="Egresos totales" value={colones(te)} />
        <Stat label="Utilidad del período" value={colones(ti - te)} tone="pos" />
        <Stat label="Margen" value={pct(s.margen, 2)} tone="gold" />
      </dl>
      <div className="two-col">
        <div className="ledger">
          <p className="ledger__title">Estado de resultados, setiembre a diciembre 2025</p>
          <p className="ledger__group">Ingresos ordinarios</p>
          <ul>{s.ingresos.map(([c, n, v]) => <Row key={c} c={c} n={n} v={v} />)}
            <li className="ledger__sub"><span>Total de ingresos</span><span className="num">{colones(ti)}</span></li></ul>
          <p className="ledger__group">Egresos ordinarios</p>
          <ul>{s.egresos.map(([c, n, v]) => <Row key={c} c={c} n={n} v={v} />)}
            <li className="ledger__sub"><span>Total de egresos</span><span className="num">{colones(te)}</span></li>
            <li className="ledger__total is-pos"><span>Utilidad del período</span><span className="num">{colones(ti - te)}</span></li></ul>
        </div>
        <div className="ledger">
          <p className="ledger__title">Balance general al 31 de diciembre 2025</p>
          <p className="ledger__group">Activos</p>
          <ul>{s.balance.activoCorriente.map(([n, v]) => <Row key={n} n={n} v={v} />)}
            <li className="ledger__sub"><span>Activo corriente</span><span className="num">{colones(ac)}</span></li>
            {s.balance.activoFijo.map(([n, v]) => <Row key={n} n={n} v={v} />)}
            <li className="ledger__total"><span>Total de activos</span><span className="num">{colones(ac + af)}</span></li></ul>
          <p className="ledger__group">Pasivo y patrimonio</p>
          <ul>{s.balance.pasivos.map(([n, v]) => <Row key={n} n={n} v={v} />)}
            <li className="ledger__sub"><span>Total de pasivos</span><span className="num">{colones(tp)}</span></li>
            {s.balance.patrimonio.map(([n, v]) => <Row key={n} n={n} v={v} />)}
            <li className="ledger__sub"><span>Total de patrimonio</span><span className="num">{colones(pa)}</span></li>
            <li className="ledger__total"><span>Total pasivo + patrimonio</span><span className="num">{colones(tp + pa)}</span></li></ul>
        </div>
      </div>
    </>
  );
}

/* ---------- Sección ---------- */

export default function Finanzas() {
  return (
    <Section id="finanzas" tone="paper" title="Finanzas *del condominio*"
      intro={`Período ${actualizacion.periodo}, con corte al ${actualizacion.corte}. Elaborado por CMD S.A.`}>
      <div className="fin-top">
        <details className="method">
          <summary>¿Cómo se calcula el resultado real?</summary>
          <div className="method__body">
            {metodologia.map((m) => (
              <div key={m.termino} className="method__row">
                <p className="method__eq">
                  <strong>{m.termino}</strong> <span aria-hidden="true">=</span>
                  {m.formula.map((f, i) => (
                    <span key={f} className="eq-chip">{i > 0 && !f.startsWith('−') && <b aria-hidden="true">+</b>}{f}</span>
                  ))}
                </p>
                <p className="method__note">{m.nota}</p>
              </div>
            ))}
            <p className="method__note">Se presentan los subperíodos del ejercicio (Sep–Dic 2025, Ene–May 2026, junio y julio 2026) y el consolidado. El agua se analiza aparte, en su propia pestaña.</p>
          </div>
        </details>
        <button className="btn btn--line print-hide" onClick={() => window.print()}>
          <Printer size={18} aria-hidden="true" /> Imprimir o guardar en PDF
        </button>
      </div>

      <h3 className="h3">Indicadores del período completo</h3>
      <dl className="stats stats--4">
        <Stat label="Ingresos operativos" value={colones(consolidado.ingresos)} tone="ink" />
        <Stat label="Egresos operativos" value={colones(consolidado.egresos)} />
        <Stat label="Utilidad operativa" value={colones(consolidado.utilidad)} tone="pos" />
        <Stat label="Margen operativo" value={pct(consolidado.margen)} tone="gold" />
      </dl>

      <h3 className="h3">Utilidad neta y fondo de reserva</h3>
      <p className="lede">Según el Reglamento Interno, de la utilidad de cada mes se aparta un <strong>10 % para el fondo de reserva</strong>. En los meses con déficit no se aparta nada.</p>
      <DataTable
        caption="Resumen por período: utilidad neta y fondo de reserva"
        columns={[
          { key: 'periodo', label: 'Período' },
          { key: 'ingresos', label: 'Ingresos', num: true, render: (r) => colones(r.ingresos) },
          { key: 'egresos', label: 'Egresos', num: true, render: (r) => colones(r.egresos) },
          { key: 'utilidad', label: 'Utilidad neta', num: true, render: (r) => <Money value={r.utilidad} signed /> },
          { key: 'margen', label: 'Margen', num: true, render: (r) => pct(r.margen) },
          { key: 'reserva', label: 'Reserva 10 %', num: true, render: (r) => <span className="t-teal">{colones(r.reserva)}</span> },
          { key: 'disponible', label: 'Disponible', num: true, render: (r) => <Money value={r.disponible} signed={r.disponible < 0} /> },
        ]}
        rows={periodosCalc}
        total={consolidado}
      />

      <div className="reserve" aria-label="Cálculo del fondo de reserva">
        <div className="reserve__item">
          <span>Saldo en setiembre 2025</span>
          <strong>{colones(reserva.saldoInicial)}</strong>
        </div>
        <span className="reserve__op" aria-hidden="true">+</span>
        <div className="reserve__item">
          <span>Apartado en este período</span>
          <strong>{colones(reserva.generado)}</strong>
        </div>
        <span className="reserve__op" aria-hidden="true">=</span>
        <div className="reserve__item reserve__item--total">
          <span>Fondo de reserva a julio 2026</span>
          <strong>{colones(reserva.total)}</strong>
        </div>
      </div>
      <p className="small">El fondo de reserva protege al condominio ante imprevistos y proyectos futuros sin necesidad de cuotas extraordinarias. No se usa para financiar proyectos ni gastos operativos.</p>

      <Callout tone="ok" title="Julio 2026: vuelve el superávit">
        Resultado de {colones(mesesCalc[6].resultado)} (margen {pct(mesesCalc[6].margen)}): junio fue un mes puntual de inversión, no una tendencia.
        Se recaudó el 95,2 % del presupuesto de mantenimiento y se apartaron {colones(26907)} más para el fondo de reserva.
      </Callout>

      <h3 className="h3 h3--spaced">Detalle</h3>
      <Tabs
        label="Detalle financiero"
        tabs={[
          { id: 'res', label: 'Resultados', content: <Resultados /> },
          { id: 'ing', label: 'Ingresos', content: <Ingresos /> },
          { id: 'egr', label: 'Egresos', content: <Egresos /> },
          { id: 'agua', label: 'Agua', content: <Agua /> },
          { id: 'cxc', label: 'Por cobrar', content: <PorCobrar /> },
          { id: 'sd', label: 'Sep–Dic 2025', content: <SepDic /> },
        ]}
      />
    </Section>
  );
}
