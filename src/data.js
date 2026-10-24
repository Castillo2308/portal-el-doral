/*
 * CONTENIDO DEL SITIO — Condominio Residencial El Doral
 * Todo el texto y las fotos del sitio se editan aquí.
 */

const img = (f) => import.meta.env.BASE_URL + 'img/' + f;

/*
 * Sus datos para el pie de página. Mientras un campo esté vacío ('') no se muestra.
 */
export const autor = {
  nombre: 'Ronny Castillo Mora',
  cargo: '',
  telefono: '+506 8851-3444',
  correo: 'roncama7@gmail.com',
  nota: 'Diseñé y desarrollé este sitio para que cada vecino de El Doral tenga la información del condominio a un clic.',
};

/*
 * Fotos. Guardar la imagen en public/img/ y poner aquí img('archivo.jpg').
 * Mientras sea null se muestra un espacio de diseño con el nombre de la foto.
 */
export const fotos = {
  portada: img('entrada.webp'), // entrada y portería
  administracion: img('vista.webp'), // vista de las áreas comunes
  residentes: img('bloque.webp'), // fachada de un bloque
  areasComunes: img('kiosco.webp'), // kiosco y juegos
};

export const condominio = {
  nombre: 'Condominio Residencial El Doral',
  ubicacion: 'Zapote, San José, Costa Rica',
  filiales: 62,
  bloques: 3,
  correo: 'roncama7@gmail.com',
  whatsapp: '+506 8851-3444',
  whatsappLink: 'https://wa.me/50688513444',
};

export const pilares = [
  { icon: 'ClipboardList', titulo: 'Administración', bajada: 'Todo en orden, con reglas claras.', texto: 'Portería, mantenimiento, lectura de medidores y comunicados oficiales, coordinados cada mes.', foto: 'administracion' },
  { icon: 'Users', titulo: 'Residentes', bajada: 'Una comunidad que se respeta.', texto: 'Normas de convivencia conocidas por todos: visitas, entregas, mascotas, ruido y uso de las áreas comunes.', foto: 'residentes' },
  { icon: 'Trees', titulo: 'Áreas comunes', bajada: 'Espacios cuidados para disfrutar.', texto: 'Jardines con mantenimiento mensual, kiosco con columpios, parqueos demarcados y reciclaje junto a portería.', foto: 'areasComunes' },
];

export const instalaciones = [
  { icon: 'ShieldCheck', titulo: 'Portería 24/7', texto: 'Control de acceso permanente y registro de visitas, repartidores y proveedores.' },
  { icon: 'Cctv', titulo: 'Cámaras de seguridad', texto: 'Cámaras con visión nocturna, monitoreadas desde la caseta.' },
  { icon: 'Building2', titulo: '62 filiales', texto: 'Tres bloques de uso habitacional, numerados de 1A a 31B.' },
  { icon: 'Trees', titulo: 'Áreas verdes', texto: 'Corte, poda, fumigación y siembra cada mes, con programa de riego.' },
  { icon: 'TentTree', titulo: 'Kiosco comunal', texto: 'Espacio de uso común con columpios y aceras restauradas.' },
  { icon: 'Car', titulo: 'Parqueos', texto: 'Uno por filial, numerado y con tope, más espacios para visitas.' },
  { icon: 'Bike', titulo: 'Motocicletas', texto: 'Zona de parqueo propia, creada con el asfaltado de 2025.' },
  { icon: 'Accessibility', titulo: 'Accesibilidad', texto: 'Parqueo exclusivo para personas con discapacidad, señalizado.' },
  { icon: 'Recycle', titulo: 'Reciclaje', texto: 'Cuatro basureros para plástico y latas junto a portería.' },
];

export const normas = [
  { icon: 'Trash2', titulo: 'Basura y reciclaje', resumen: 'El basurero abre lunes 8:00 a.m. y viernes 12:00 m.d. Bolsas siempre cerradas; nada de escombros ni muebles.', puntos: ['Prohibido dejar bolsas en zonas comunes, gradas o la zona de medidores.', 'Plástico y latas van a los basureros de reciclaje junto a portería.'] },
  { icon: 'VolumeX', titulo: 'Ruido', resumen: 'Máximo 65 dB de día (6 a.m. a 10 p.m.) y 45 dB de noche.', puntos: ['Las quejas se reciben solo por los canales oficiales.', 'La Administración verifica con sonómetro.'] },
  { icon: 'PawPrint', titulo: 'Mascotas', resumen: 'Siempre con correa en las áreas comunes y recogiendo sus desechos de inmediato.', puntos: ['Portería anota los incidentes con hora y filial.'] },
  { icon: 'DoorOpen', titulo: 'Visitas', resumen: 'Toda visita necesita autorización previa a portería. Sin autorización no se permite el ingreso.', puntos: ['Visitas frecuentes: registro con nombre, cédula y relación, válido por 6 meses.', 'Cada residente responde por sus visitantes.'] },
  { icon: 'Bike', titulo: 'Repartidores', resumen: 'Avise a portería antes de que llegue su pedido. El repartidor se quita el casco al entrar.', puntos: ['Los repartidores no pueden ingresar libremente.'] },
  { icon: 'House', titulo: 'Alquiler', resumen: 'Se puede alquilar si el uso sigue siendo habitacional y el inquilino cumple el Reglamento.', puntos: ['Prohibido fumar o consumir sustancias en áreas comunes (Ley 9028).'] },
  { icon: 'Megaphone', titulo: 'Comunicación oficial', resumen: 'Los canales oficiales son el correo y el WhatsApp de la Administración.', puntos: ['Un comunicado por correo se considera notificado.', 'Mantenga su correo actualizado.'] },
];

/*
 * PROYECTOS — estado: 'completado' | 'activo' | 'pendiente' | 'procesando'
 *   completado  terminado
 *   activo      en ejecución
 *   pendiente   aprobado o planificado, todavía sin iniciar
 *   procesando  en cotización, revisión o aprobación
 */
export const proyectos = [
  { estado: 'activo', titulo: 'Pintura y reparación de techos', fecha: '2025 – 2026', texto: 'Láminas nuevas, tornillos, reparación de fugas y pintura anticorrosiva en todo el condominio.', fotos: true },
  { estado: 'activo', titulo: 'Jardinería y fumigación', fecha: 'Desde oct. 2024', texto: 'Corte, poda, fumigación y siembra cada mes en todas las áreas verdes.' },
  { estado: 'activo', titulo: 'Mantenimiento de instalaciones', fecha: 'Continuo', texto: 'Canoas, filtraciones, gradas metálicas, barandas y portones.' },
  { estado: 'procesando', titulo: 'Individualización de medidores de agua', fecha: 'En revisión', texto: 'Preparación para que cada filial tenga su propio medidor; se repararon fugas y se reguló la presión del medidor principal.' },
  { estado: 'pendiente', titulo: 'Finalización de la pintura de techos', fecha: '2026', texto: 'Terminar el pintado en los tres bloques con revisión final del sellado anticorrosivo.' },
  { estado: 'pendiente', titulo: 'Pintura y arreglo de aleros', fecha: '2026', texto: 'Reparación y pintura de los aleros de todo el condominio.' },
  { estado: 'pendiente', titulo: 'Pintura de aceras', fecha: '2026', texto: 'Pintura de todas las aceras para más seguridad y visibilidad.' },
  { estado: 'completado', titulo: 'Asfaltado', fecha: 'Enero 2025', texto: 'Asfalto nuevo, demarcación completa, 27 topes y espacios para motos y personas con discapacidad.' },
  { estado: 'completado', titulo: 'Cámaras de seguridad', fecha: 'Mayo 2025', texto: 'Cámaras IP con visión nocturna, monitoreo desde portería y desde la app de la Administración.' },
  { estado: 'completado', titulo: 'Pintura y embellecimiento', fecha: 'Abril – junio 2025', texto: 'Muro divisor, entradas del primer piso, rejillas, bordes de caño y parqueos demarcados.' },
  { estado: 'completado', titulo: 'Verjas y portones', fecha: 'Febrero – abril 2025', texto: 'Soldadura y pintura anticorrosiva en verjas, baranda de la caseta y portones de acceso.' },
  { estado: 'completado', titulo: 'Sonómetro para quejas de ruido', fecha: 'Marzo 2025', texto: 'Equipo para medir de forma objetiva las quejas de ruido.' },
];

export const fotosTechos = [
  { src: img('techo-antes.jpg'), etiqueta: 'Antes' },
  { src: img('techo-despues.jpg'), etiqueta: 'Después' },
];

/*
 * FINANZAS — por ahora todo en 0.
 * Cada lista tiene 12 montos en colones (enero a diciembre), sin puntos ni símbolo.
 * Al cerrar un mes, reemplace el 0 de ese mes por el monto real.
 */
export const finanzas = {
  anio: 2026,
  meses: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
  fondoReserva: 0,
  ingresos: [
    { id: 'cuotas', nombre: 'Cuotas de mantenimiento', montos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: 'otros', nombre: 'Otros ingresos', montos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  ],
  gastos: [
    { id: 'luz', nombre: 'Electricidad', icon: 'Zap', color: '#e0a03a', montos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: 'agua', nombre: 'Agua', icon: 'Droplets', color: '#3b82a6', montos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: 'seguridad', nombre: 'Seguridad y portería', icon: 'ShieldCheck', color: '#5b4b8a', montos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: 'administracion', nombre: 'Administración', icon: 'ClipboardList', color: '#c24a35', montos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: 'jardineria', nombre: 'Jardinería', icon: 'Trees', color: '#4f8a5b', montos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: 'mantenimiento', nombre: 'Mantenimiento y reparaciones', icon: 'Wrench', color: '#8c6a4f', montos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: 'limpieza', nombre: 'Limpieza', icon: 'Sparkles', color: '#2f8f8a', montos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: 'comunicaciones', nombre: 'Internet y teléfono', icon: 'Wifi', color: '#9a6fb0', montos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: 'otros', nombre: 'Otros gastos', icon: 'Package', color: '#a39b94', montos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  ],
};
