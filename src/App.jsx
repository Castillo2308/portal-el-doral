import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Header, { Logo, NAV } from './components/Header.jsx';
import Inicio from './components/Inicio.jsx';
import { Condominio, Lineamientos, Proyectos, Legal, Gestion, Contacto } from './components/Secciones.jsx';
import { condominio, actualizacion } from './data.js';

// Los gráficos pesan; solo se descargan al abrir Finanzas
const Finanzas = lazy(() => import('./components/Finanzas.jsx'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById('contenido')?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}

function NoEncontrada() {
  useEffect(() => { document.title = 'Página no encontrada — El Doral'; }, []);
  return (
    <section className="section">
      <div className="wrap">
        <h1 className="section__title">Esta página no existe</h1>
        <p className="section__intro">Puede que el enlace esté incompleto. Vuelva al inicio para encontrar lo que busca.</p>
        <p style={{ marginTop: 24 }}><Link className="btn btn--line" to="/">Ir al inicio</Link></p>
      </div>
    </section>
  );
}

function Cargando() {
  return <div className="loading" role="status"><span className="sr-only">Cargando…</span></div>;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <ScrollToTop />
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Suspense fallback={<Cargando />}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/condominio" element={<Condominio />} />
            <Route path="/finanzas" element={<Finanzas />} />
            <Route path="/lineamientos" element={<Lineamientos />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/administracion" element={<Gestion />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<NoEncontrada />} />
          </Routes>
        </Suspense>
      </main>
      <footer className="footer">
        <div className="wrap footer__inner">
          <div className="footer__brand">
            <Logo />
            <img src={`${import.meta.env.BASE_URL}img/logo-cmd.png`} alt="CMD: Consultorías, Manejo Contable y Desarrollo Empresarial" className="footer__cmd" width="120" height="76" loading="lazy" />
          </div>
          <nav aria-label="Páginas del portal" className="footer__nav">
            <ul>{NAV.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}</ul>
          </nav>
          <div className="footer__text">
            <p>{condominio.nombre}. {condominio.ubicacion}.</p>
            <p>Administrado por {condominio.empresa}. <a href={`mailto:${condominio.correo}`}>{condominio.correo}</a>, {condominio.whatsapp}.</p>
            <p className="footer__upd">Este portal se actualiza cada mes. Última actualización: {actualizacion.mes}.</p>
          </div>
        </div>
      </footer>
    </BrowserRouter>
  );
}
