import { useState } from 'react';
import { CheckCircle2, Hammer, Clock, Loader } from 'lucide-react';
import { proyectos, fotosTechos } from './data.js';

const ESTADOS = [
  { id: 'activo', titulo: 'Activos', singular: 'Activo', desc: 'En ejecución en este momento.', I: Hammer },
  { id: 'procesando', titulo: 'Procesándose', singular: 'Procesándose', desc: 'En cotización, revisión o aprobación.', I: Loader },
  { id: 'pendiente', titulo: 'Pendientes', singular: 'Pendiente', desc: 'Planificados, todavía sin iniciar.', I: Clock },
  { id: 'completado', titulo: 'Completados', singular: 'Completado', desc: 'Obras terminadas.', I: CheckCircle2 },
];

export default function Proyectos() {
  const [filtro, setFiltro] = useState('todos');
  const visibles = filtro === 'todos' ? ESTADOS : ESTADOS.filter((e) => e.id === filtro);

  return (
    <section className="section" aria-labelledby="pro-t">
      <div className="wrap">
        <div className="split-head">
          <div>
            <p className="eyebrow">Proyectos</p>
            <h1 id="pro-t" className="title">Lo que hacemos, <em>paso a paso.</em></h1>
          </div>
          <p className="split-head__text">Cada proyecto del condominio según su estado: los que están en marcha, los que se están evaluando, los que vienen y los que ya se terminaron.</p>
        </div>

        <div className="status-tiles" role="group" aria-label="Filtrar proyectos por estado">
          <button className="status-tile status-tile--all" aria-pressed={filtro === 'todos'} onClick={() => setFiltro('todos')}>
            <span className="status-tile__n">{proyectos.length}</span>
            <span className="status-tile__l">Todos</span>
          </button>
          {ESTADOS.map(({ id, titulo, I }) => (
            <button key={id} className={`status-tile status-tile--${id}`} aria-pressed={filtro === id} onClick={() => setFiltro(id)}>
              <I size={20} strokeWidth={1.7} aria-hidden="true" />
              <span className="status-tile__n">{proyectos.filter((p) => p.estado === id).length}</span>
              <span className="status-tile__l">{titulo}</span>
            </button>
          ))}
        </div>

        {visibles.map(({ id, titulo, singular, desc }) => {
          const lista = proyectos.filter((p) => p.estado === id);
          return (
            <section key={id} className="pgroup" aria-labelledby={`g-${id}`}>
              <header className="pgroup__head">
                <h2 id={`g-${id}`}><span className={`pdot pdot--${id}`} aria-hidden="true" />{titulo}</h2>
                <p>{desc}</p>
              </header>
              {lista.length === 0 ? (
                <p className="empty-state">No hay proyectos {titulo.toLowerCase()} en este momento.</p>
              ) : (
                <ul className="pcards">
                  {lista.map((p) => (
                    <li key={p.titulo} className={`pcard${p.fotos ? ' pcard--wide' : ''}`}>
                      {p.fotos && (
                        <div className="pcard__photos">
                          {fotosTechos.map((f) => (
                            <figure key={f.etiqueta}><img src={f.src} alt={`${p.titulo}: ${f.etiqueta.toLowerCase()}`} loading="lazy" /><figcaption>{f.etiqueta}</figcaption></figure>
                          ))}
                        </div>
                      )}
                      <div className="pcard__body">
                        <span className={`tag tag--${id}`}>{singular}</span>
                        <h3>{p.titulo}</h3>
                        <p>{p.texto}</p>
                        <p className="pcard__date">{p.fecha}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
}
