import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, FileText, ChevronDown, Mail, MessageCircle, ClipboardList, UserRound, X, ZoomIn, ArrowUpRight } from 'lucide-react';
import {
  condominio, instalaciones, lineamientos, fotosTechos, gastosTechos, proyectos, casosCerrados, taller, gestion, reserva,
} from '../data.js';
import { mesesCalc } from '../calc.js';
import { Section, Callout, Stat, Icon, colones, pct } from './ui.jsx';

/* ---------- Condominio ---------- */

export function Condominio() {
  return (
    <Section id="condominio" title="Nuestro condominio"
      intro={`${condominio.filiales} fincas filiales de uso habitacional en ${condominio.bloques} bloques. ${condominio.ubicacion}.`}>
      <ul className="amenities">
        {instalaciones.map((x) => (
          <li key={x.titulo}>
            <span className="amenities__icon"><Icon name={x.icon} size={22} /></span>
            <div>
              <h3>{x.titulo}</h3>
              <p>{x.texto}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------- Lineamientos ---------- */

const normalize = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function solicitarDoc(l) {
  const subject = `Solicitud del lineamiento ${l.codigo}: ${l.titulo}`;
  const body = `Estimada Administración:\n\nSolicito el documento completo del lineamiento ${l.codigo} (${l.titulo}).\n\nFilial: \nNombre: \n\nAtentamente,`;
  return `mailto:${condominio.correo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Lineamiento({ l, open, onToggle }) {
  const id = `lin-${l.codigo}`;
  return (
    <li className={`acc${open ? ' is-open' : ''}`}>
      <h3 className="acc__h">
        <button aria-expanded={open} aria-controls={id} onClick={onToggle} className="acc__btn">
          <span className="acc__icon"><Icon name={l.icon} /></span>
          <span className="acc__title">
            <span className="acc__code">{l.codigo}</span>
            {l.titulo}
          </span>
          <ChevronDown size={20} aria-hidden="true" className="acc__chev" />
        </button>
      </h3>
      <div id={id} className="acc__panel" hidden={!open}>
        <ul className="list">{l.puntos.map((p) => <li key={p}>{p}</li>)}</ul>
        {l.sanciones && <p className="acc__sanc"><strong>Sanciones:</strong> {l.sanciones}</p>}
        {l.consulta && (
          <div className="poll">
            <p className="poll__title">{l.consulta.titulo}</p>
            <p>{l.consulta.propuesta}</p>
            <div className="poll__bar" role="img" aria-label={`${l.consulta.aFavor} a favor, ${l.consulta.respuestas - l.consulta.aFavor} en contra, ${l.consulta.consultadas - l.consulta.respuestas} sin respuesta, de ${l.consulta.consultadas} filiales`}>
              <span className="poll__seg poll__seg--yes" style={{ flexGrow: l.consulta.aFavor }} />
              <span className="poll__seg poll__seg--no" style={{ flexGrow: l.consulta.respuestas - l.consulta.aFavor }} />
              <span className="poll__seg poll__seg--none" style={{ flexGrow: l.consulta.consultadas - l.consulta.respuestas }} />
            </div>
            <ul className="poll__legend">
              <li><i className="poll__seg--yes" />{l.consulta.aFavor} a favor</li>
              <li><i className="poll__seg--no" />{l.consulta.respuestas - l.consulta.aFavor} en contra</li>
              <li><i className="poll__seg--none" />{l.consulta.consultadas - l.consulta.respuestas} sin responder</li>
            </ul>
            <p className="poll__res"><strong>Resolución:</strong> {l.consulta.resolucion}</p>
          </div>
        )}
        <div className="acc__actions">
          {l.enlace && (
            <a className="btn btn--line" href={condominio[l.enlace.href]} target="_blank" rel="noopener noreferrer">
              {l.enlace.texto} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
          <a className="btn btn--soft" href={solicitarDoc(l)}>
            <FileText size={16} aria-hidden="true" /> Solicitar el documento completo
          </a>
        </div>
        <p className="acc__ref">Referencia: {l.ref}</p>
      </div>
    </li>
  );
}

export function Lineamientos() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(null);
  const list = useMemo(() => {
    const n = normalize(q.trim());
    if (!n) return lineamientos;
    return lineamientos.filter((l) => normalize([l.codigo, l.titulo, ...l.puntos, l.sanciones || ''].join(' ')).includes(n));
  }, [q]);

  return (
    <Section id="lineamientos" title="Lineamientos"
      intro="Normas de convivencia y protocolos vigentes, elaborados por la Administración. Aquí está el resumen de cada uno; el documento completo se solicita por correo con un clic.">
      <div className="search">
        <Search size={18} aria-hidden="true" />
        <label htmlFor="buscar-lin" className="sr-only">Buscar en los lineamientos</label>
        <input id="buscar-lin" type="search" placeholder="Buscar: mascotas, ruido, visitas, basura…" value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(null); }} />
      </div>
      <p className="sr-only" aria-live="polite">{list.length} lineamientos encontrados</p>
      {list.length === 0 ? (
        <p className="empty">Ningún lineamiento menciona «{q}». Pruebe con otra palabra o escriba a la Administración.</p>
      ) : (
        <ul className="accs">
          {list.map((l) => (
            <Lineamiento key={l.codigo} l={l} open={open === l.codigo || (list.length === 1)}
              onToggle={() => setOpen((o) => (o === l.codigo ? null : l.codigo))} />
          ))}
        </ul>
      )}
    </Section>
  );
}

/* ---------- Proyectos ---------- */

const ESTADOS = {
  curso: { label: 'En ejecución', cls: 'badge--gold' },
  proximo: { label: 'Próximo', cls: 'badge--plan' },
  hecho: { label: 'Completado', cls: 'badge--ok' },
  continuo: { label: 'Continuo', cls: 'badge--teal' },
};

function Lightbox({ foto, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (foto && d && !d.open) d.showModal();
    if (!foto && d?.open) d.close();
  }, [foto]);
  return (
    <dialog ref={ref} className="lightbox" onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}>
      {foto && (
        <figure>
          <img src={foto.src} alt={`${foto.etiqueta}: ${foto.texto}`} />
          <figcaption><strong>{foto.etiqueta}.</strong> {foto.texto}</figcaption>
          <button className="lightbox__close" onClick={onClose} autoFocus><X size={22} aria-hidden="true" /><span className="sr-only">Cerrar foto</span></button>
        </figure>
      )}
    </dialog>
  );
}

export function Proyectos() {
  const [foto, setFoto] = useState(null);
  const [filtro, setFiltro] = useState('todos');
  const [verGastos, setVerGastos] = useState(false);
  const total = gastosTechos.reduce((s, g) => s + g[3], 0);
  const materiales = gastosTechos.filter((g) => g[4] === 'material').reduce((s, g) => s + g[3], 0);
  const obra = total - materiales;
  const egresosJun = mesesCalc.find((m) => m.id === 'jun').egresos;
  const filtros = [
    ['todos', 'Todos'], ['curso', 'En ejecución'], ['proximo', 'Próximos'], ['hecho', 'Completados'], ['continuo', 'Continuos'],
  ];
  const lista = filtro === 'todos' ? proyectos : proyectos.filter((p) => p.estado === filtro);

  return (
    <Section id="proyectos" tone="paper" title="Proyectos"
      intro="Obras ejecutadas por la Administración en infraestructura, seguridad y bienestar del condominio.">
      <article className="feature">
        <div className="feature__head">
          <span className="badge badge--gold">En ejecución</span>
          <h3 className="feature__title">Pintura y reparación de techos</h3>
          <p>Reparación y pintado progresivo de los techos de todo el condominio: láminas nuevas, cambio de tornillos, reparación de fugas y pintura anticorrosiva. Se paga con los fondos ordinarios de mantenimiento, <strong>sin cuota extraordinaria</strong>.</p>
        </div>

        <ul className="photos">
          {fotosTechos.map((f) => (
            <li key={f.src}>
              <button className="photo" onClick={() => setFoto(f)}>
                <img src={f.src} alt="" loading="lazy" width="1000" height="750" />
                <span className={`photo__tag photo__tag--${f.etiqueta.toLowerCase()}`}>{f.etiqueta}</span>
                <span className="photo__zoom"><ZoomIn size={18} aria-hidden="true" /></span>
                <span className="sr-only">Ampliar foto: {f.etiqueta}</span>
              </button>
              <p className="photo__cap">{f.texto}</p>
            </li>
          ))}
        </ul>

        <div className="cost">
          <div className="cost__total">
            <span>Invertido en junio 2026</span>
            <strong>{colones(total)}</strong>
            <small>{pct((total / egresosJun) * 100)} de los egresos de junio</small>
          </div>
          <div className="cost__split">
            <div className="stackbar stackbar--lg" role="img" aria-label={`Materiales ${colones(materiales)}, mano de obra ${colones(obra)}`}>
              <span className="stackbar__seg stackbar__seg--0" style={{ flexGrow: materiales }} />
              <span className="stackbar__seg stackbar__seg--1" style={{ flexGrow: obra }} />
            </div>
            <ul className="fixed-costs__list">
              <li><i className="swatch stackbar__seg--0" /><span>Materiales <small>pintura, cubetas, felpas y diluyente</small></span><strong>{colones(materiales)}</strong><small>{pct((materiales / total) * 100, 0)}</small></li>
              <li><i className="swatch stackbar__seg--1" /><span>Mano de obra <small>contratada</small></span><strong>{colones(obra)}</strong><small>{pct((obra / total) * 100, 0)}</small></li>
            </ul>
          </div>
        </div>

        <button className="disclose" aria-expanded={verGastos} aria-controls="gastos-techos" onClick={() => setVerGastos((v) => !v)}>
          <ChevronDown size={18} aria-hidden="true" /> {verGastos ? 'Ocultar' : 'Ver'} las {gastosTechos.length} compras y pagos de junio
        </button>
        <div id="gastos-techos" hidden={!verGastos} className="table-scroll" tabIndex={0} role="region" aria-label="Compras y pagos del proyecto de techos">
          <table className="table">
            <thead><tr><th scope="col">Fecha</th><th scope="col">Concepto</th><th scope="col">Proveedor</th><th scope="col" className="num">Monto</th></tr></thead>
            <tbody>
              {gastosTechos.map((g, i) => (
                <tr key={i}><th scope="row">{g[0]}</th><td>{g[1]}</td><td>{g[2]}</td><td className="num">{colones(g[3])}</td></tr>
              ))}
            </tbody>
            <tfoot><tr><th scope="row" colSpan={3}>Total del proyecto en junio 2026</th><td className="num">{colones(total)}</td></tr></tfoot>
          </table>
        </div>

        <Callout tone="ok" title="Sin cuota extraordinaria y con el fondo de reserva intacto">
          Los {colones(total)} salieron del excedente de caja que dejaron los meses de superávit. El fondo de reserva ({colones(reserva.total)}) es aparte y no se tocó.
          En julio no hubo más desembolsos para el proyecto y el condominio volvió al superávit. La Administración sigue la ejecución y el presupuesto restante.
        </Callout>
      </article>

      <div className="filters" role="group" aria-label="Filtrar proyectos por estado">
        {filtros.map(([k, l]) => (
          <button key={k} className="chip" aria-pressed={filtro === k} onClick={() => setFiltro(k)}>
            {l}<span className="chip__n">{k === 'todos' ? proyectos.length : proyectos.filter((p) => p.estado === k).length}</span>
          </button>
        ))}
      </div>
      <ul className="projects">
        {lista.map((p) => (
          <li key={p.titulo} className={`project project--${p.estado}`}>
            <div className="project__top">
              <span className="project__icon"><Icon name={p.icon} /></span>
              <span className={`badge ${ESTADOS[p.estado].cls}`}>{ESTADOS[p.estado].label}</span>
            </div>
            <h3>{p.titulo}</h3>
            <p>{p.texto}</p>
            <p className="project__meta">{p.fecha}{p.fondos ? `. ${p.fondos}` : ''}</p>
          </li>
        ))}
      </ul>
      <Lightbox foto={foto} onClose={() => setFoto(null)} />
    </Section>
  );
}

/* ---------- Legal ---------- */

export function Legal() {
  const [abierto, setAbierto] = useState(null);
  return (
    <Section id="legal" title="Gestión legal"
      intro={`Asesorías y gestiones en defensa de los derechos del condominio, con asesoría legal profesional.`}>
      <div className="case">
        <div className="case__head">
          <span className="badge badge--neg">Expediente activo</span>
          <h3 className="feature__title">Taller clandestino colindante</h3>
          <p>{taller.resumen}</p>
          <dl className="case__facts">
            <div><dt>Expediente Sala Constitucional</dt><dd>{taller.expediente}</dd></div>
            <div><dt>Estado actual</dt><dd>{taller.estado}</dd></div>
          </dl>
        </div>
        <ol className="timeline">
          {taller.eventos.map((e, i) => (
            <li key={i} className={`timeline__item timeline__item--${e.tipo}`}>
              <time className="timeline__date">{e.fecha}</time>
              <div className="timeline__body">
                <p className="timeline__title">{e.titulo}</p>
                <p>{e.texto}</p>
              </div>
            </li>
          ))}
          <li className="timeline__item timeline__item--now">
            <time className="timeline__date">Hoy</time>
            <div className="timeline__body"><p className="timeline__title">Pendiente de resolución en la Sala IV</p></div>
          </li>
        </ol>
      </div>

      <h3 className="h3 h3--spaced">Casos atendidos</h3>
      <ul className="accs">
        {casosCerrados.map((c, i) => (
          <li key={c.titulo} className={`acc${abierto === i ? ' is-open' : ''}`}>
            <h4 className="acc__h">
              <button className="acc__btn" aria-expanded={abierto === i} aria-controls={`caso-${i}`} onClick={() => setAbierto((a) => (a === i ? null : i))}>
                <span className="acc__title"><span className="acc__code">{c.fecha}</span>{c.titulo}</span>
                <ChevronDown size={20} aria-hidden="true" className="acc__chev" />
              </button>
            </h4>
            <div id={`caso-${i}`} className="acc__panel" hidden={abierto !== i}><p>{c.texto}</p></div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------- Gestión administrativa ---------- */

export function Gestion() {
  return (
    <Section id="gestion" tone="paper" title="Qué hace la Administración cada mes"
      intro="Tareas que CMD S.A. ejecuta de forma continua para todos los propietarios y residentes.">
      <ul className="duties">
        {gestion.map((g) => (
          <li key={g.titulo}>
            <Icon name={g.icon} size={22} />
            <div><h3>{g.titulo}</h3><p>{g.texto}</p></div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------- Contacto ---------- */

export function Contacto() {
  return (
    <Section id="contacto" tone="paper" title="Contacto y canales oficiales"
      intro="Use solo estos canales: así cada solicitud queda registrada y con seguimiento.">
      <ul className="channels">
        <li>
          <a className="channel" href={`mailto:${condominio.correo}`}>
            <Mail size={26} aria-hidden="true" />
            <span className="channel__label">Correo electrónico</span>
            <span className="channel__value">{condominio.correo}</span>
          </a>
        </li>
        <li>
          <a className="channel" href={condominio.whatsappLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={26} aria-hidden="true" />
            <span className="channel__label">WhatsApp</span>
            <span className="channel__value">{condominio.whatsapp}</span>
          </a>
        </li>
        <li>
          <a className="channel" href={condominio.formularioQuejas} target="_blank" rel="noopener noreferrer">
            <ClipboardList size={26} aria-hidden="true" />
            <span className="channel__label">Formulario de quejas</span>
            <span className="channel__value">Ruido y convivencia</span>
          </a>
        </li>
        <li>
          <div className="channel channel--static">
            <UserRound size={26} aria-hidden="true" />
            <span className="channel__label">Administración</span>
            <span className="channel__value">{condominio.empresa}<br /><small>Consultorías, Manejo Contable y Desarrollo Empresarial</small></span>
          </div>
        </li>
      </ul>
      <p className="contact-note">
        Los grupos de WhatsApp que no administra CMD S.A., los mensajes personales y las conversaciones informales
        no son gestión administrativa formal. Toda solicitud debe hacerse por los canales oficiales.
      </p>
    </Section>
  );
}
