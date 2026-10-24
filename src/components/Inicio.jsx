import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, ScrollText, Hammer, Scale, Building2, ClipboardCheck, Phone } from 'lucide-react';
import Hero from './Hero.jsx';
import { consolidado, mesesCalc, aguaCalc } from '../calc.js';
import { actualizacion, lineamientos, proyectos, gestion, cuentasPorCobrar, condominio } from '../data.js';
import { colones, pct } from './ui.jsx';

const cuenta = (estado) => proyectos.filter((p) => p.estado === estado).length;

const PAGINAS = [
  { to: '/finanzas', I: BarChart3, titulo: 'Finanzas', dato: colones(consolidado.utilidad), datoNota: 'de utilidad en el período',
    texto: 'Resultados mes a mes, agua, cuentas por cobrar, fondo de reserva y estados contables.' },
  { to: '/lineamientos', I: ScrollText, titulo: 'Lineamientos', dato: String(lineamientos.length), datoNota: 'normas vigentes',
    texto: 'Basura, ruido, mascotas, visitas, alquiler, repartidores y comunicaciones. Con buscador.' },
  { to: '/proyectos', I: Hammer, titulo: 'Proyectos', dato: `${cuenta('curso')} + ${cuenta('proximo')}`, datoNota: 'en ejecución y próximos',
    texto: 'Pintura de techos con fotos y costos, y el registro de las obras realizadas.' },
  { to: '/legal', I: Scale, titulo: 'Gestión legal', dato: 'Activo', datoNota: 'expediente ante la Sala IV',
    texto: 'Seguimiento del taller clandestino colindante y casos atendidos.' },
  { to: '/condominio', I: Building2, titulo: 'Condominio', dato: String(condominio.filiales), datoNota: 'filiales en 3 bloques',
    texto: 'Instalaciones, portería, cámaras, parqueos y áreas comunes.' },
  { to: '/administracion', I: ClipboardCheck, titulo: 'Administración', dato: String(gestion.length), datoNota: 'tareas de cada mes',
    texto: 'Lo que hace CMD S.A. por los propietarios mes a mes.' },
];

export default function Inicio() {
  useEffect(() => {
    document.title = 'Portal de Propietarios — Condominio Residencial El Doral';
  }, []);
  const jul = mesesCalc[mesesCalc.length - 1];
  const aguaJul = aguaCalc[aguaCalc.length - 1];
  const novedades = [
    { t: 'Vuelve el superávit', d: `${actualizacion.mes} cerró con ${colones(jul.resultado)} a favor (margen ${pct(jul.margen)}), después del mes de inversión en techos.` },
    { t: 'El agua de áreas comunes, en su nivel más bajo', d: `El fondo de mantenimiento cubrió solo ${colones(aguaJul.subsidio)} de la factura del AyA, el ${pct(aguaJul.pct)}.` },
    { t: `${pct(cuentasPorCobrar.recaudacionMes)} de lo facturado, cobrado`, d: `${cuentasPorCobrar.alDia} de 62 filiales están al día; solo una no ha hecho ningún pago.` },
    { t: 'Techos sin cuota extraordinaria', d: `Los ${colones(797845)} de junio salieron del excedente de caja. El fondo de reserva sigue intacto.` },
  ];

  return (
    <>
      <Hero />

      <section className="section" aria-labelledby="explorar-t">
        <div className="wrap">
          <p className="eyebrow">El portal</p>
          <h2 id="explorar-t" className="section__title">¿Qué quiere <em>consultar?</em></h2>
          <ul className="pages">
            {PAGINAS.map(({ to, I, titulo, dato, datoNota, texto }) => (
              <li key={to}>
                <Link to={to} className="pagecard">
                  <span className="pagecard__top">
                    <I size={22} aria-hidden="true" />
                    <ArrowRight size={18} aria-hidden="true" className="pagecard__arrow" />
                  </span>
                  <span className="pagecard__title">{titulo}</span>
                  <span className="pagecard__dato"><strong>{dato}</strong> {datoNota}</span>
                  <span className="pagecard__text">{texto}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="nov-t">
        <div className="wrap news">
          <div>
            <p className="eyebrow">Novedades</p>
            <h2 id="nov-t" className="section__title">Lo nuevo <em>en {actualizacion.mes.toLowerCase()}.</em></h2>
            <p className="section__intro">El portal se actualiza cada mes con el cierre contable.</p>
            <Link to="/finanzas" className="btn btn--line news__btn">Ver el informe completo <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
          <ol className="news__list">
            {novedades.map((n) => (
              <li key={n.t}><p className="news__t">{n.t}</p><p>{n.d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="ct-t">
        <div className="wrap cta">
          <div>
            <p className="eyebrow eyebrow--light">Canales oficiales</p>
            <h2 id="ct-t" className="section__title">¿Tiene una consulta <em>o una queja?</em></h2>
            <p className="section__intro">Escriba por los canales oficiales para que quede registrada y tenga seguimiento.</p>
          </div>
          <div className="cta__actions">
            <a className="btn btn--gold" href={`mailto:${condominio.correo}`}>Escribir un correo</a>
            <a className="btn btn--ghost" href={condominio.whatsappLink} target="_blank" rel="noopener noreferrer">WhatsApp {condominio.whatsapp}</a>
            <Link className="btn btn--ghost" to="/contacto"><Phone size={18} aria-hidden="true" /> Todos los canales</Link>
          </div>
        </div>
      </section>
    </>
  );
}
