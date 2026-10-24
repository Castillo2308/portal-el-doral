/*
 * DATOS DEL PORTAL — Condominio Residencial El Doral
 * ---------------------------------------------------
 * Para la actualización mensual solo hace falta editar este archivo.
 * Los totales de las tablas mensuales se calculan solos a partir de `meses`.
 * Los montos van en colones, como números enteros (sin puntos ni símbolo).
 */

export const actualizacion = {
  mes: 'Julio 2026',
  corte: '31 de julio 2026',
  periodo: 'Setiembre 2025 – Julio 2026',
};

/*
 * Privacidad: el portal es público. Las cuentas por cobrar se publican solo por
 * número de filial, sin nombres de propietarios (Ley 8968).
 */

/*
 * Fotos del condominio. Guardar cada imagen en public/img/ y poner aquí su nombre,
 * por ejemplo: portada: img('portada.jpg'). Mientras sea null se muestra un espacio de diseño.
 */
const img = (f) => import.meta.env.BASE_URL + 'img/' + f;
export const fotos = {
  portada: null, // p. ej. img('portada.jpg'): foto horizontal grande para la portada (fachada, entrada o vista general)
  galeria: [
    { src: null, titulo: 'Entrada y portería' },
    { src: null, titulo: 'Áreas verdes' },
    { src: null, titulo: 'Kiosco comunal' },
    { src: null, titulo: 'Parqueos' },
    { src: null, titulo: 'Bloques de filiales' },
  ],
};


export const condominio = {
  nombre: 'Condominio Residencial El Doral',
  ubicacion: 'Zapote, San José, Costa Rica',
  filiales: 62,
  bloques: 3,
  empresa: 'CMD S.A.',
  correo: 'condominioeldoral@ciemedcr.com',
  whatsapp: '+506 8684-4010',
  whatsappLink: 'https://wa.me/50686844010',
  formularioQuejas: 'https://docs.google.com/forms/d/18Lw_Ir3dWv-zU1p-qdQfaYjYyfTQ7v2VIbJ_F5LyCq4/viewform',
};

export const instalaciones = [
  { icon: 'Building2', titulo: '62 filiales residenciales', texto: 'Distribuidas en tres bloques (A y B por nivel), numeradas de 1A a 31B, de uso habitacional según la escritura constitutiva.' },
  { icon: 'ShieldCheck', titulo: 'Portería 24/7', texto: 'Control de acceso permanente con Seguridad Río Térraba. Registro de visitas, repartidores y proveedores con identificación.' },
  { icon: 'Cctv', titulo: 'Sistema de cámaras', texto: 'Hikvision IP Bullet 2MP, visión nocturna de 30 m, monitoreo desde la caseta y desde la app móvil de la Administración.' },
  { icon: 'Trees', titulo: 'Áreas verdes y jardines', texto: 'Mantenimiento mensual: corte, poda, fumigación y siembra de zacate, con programa de riego y limpieza.' },
  { icon: 'TentTree', titulo: 'Kiosco comunal', texto: 'Espacio de uso común con columpios, aceras restauradas y mejoras de soldadura.' },
  { icon: 'Car', titulo: '62 parqueos individuales', texto: 'Uno por filial, demarcados, numerados y con topes de concreto en amarillo tráfico.' },
  { icon: 'ParkingSquare', titulo: 'Parqueo de visitantes', texto: 'Espacios para visitas demarcados y señalizados.' },
  { icon: 'Bike', titulo: 'Parqueo de motocicletas', texto: 'Creado en el proyecto de asfaltado 2025.' },
  { icon: 'Accessibility', titulo: 'Parqueo para personas con discapacidad', texto: 'Espacio exclusivo y accesible, señalizado y demarcado, creado con el asfaltado 2025.' },
  { icon: 'Recycle', titulo: 'Reciclaje', texto: '4 basureros para plástico y latas junto a portería, para la recolección municipal.' },
];

/* ---------- FINANZAS ---------- */

export const metodologia = [
  {
    termino: 'Ingresos operativos',
    formula: ['Cuota de mantenimiento', 'Cuotas extraordinarias', 'Mora', 'Intereses'],
    nota: 'El cobro de agua a las filiales no se cuenta como ingreso: es dinero de paso. Entra porque el condominio es el intermediario del macromedidor del AyA y sale para pagar esa misma factura.',
  },
  {
    termino: 'Egresos operativos',
    formula: ['Gastos fijos', 'Gastos variables', 'Agua de áreas comunes'],
    nota: 'Gastos fijos: portería, administración y riego. El agua de áreas comunes es la parte de la factura del AyA que no cubren las filiales y que sale del fondo de mantenimiento.',
  },
  {
    termino: 'Resultado del mes',
    formula: ['Ingresos operativos', '− Egresos operativos'],
    nota: 'Responde a la pregunta clave: ¿la cuota de mantenimiento alcanza para sostener la operación del condominio?',
  },
];

export const gastosFijos = [
  { concepto: 'Portería', proveedor: 'Seguridad Río Térraba', monto: 1518720 },
  { concepto: 'Administración', proveedor: 'CMD S.A.', monto: 450000 },
  { concepto: 'Riego y limpieza', proveedor: 'Servicio contratado', monto: 50000 },
];

export const PRESUPUESTO_MANTENIMIENTO = 2790000; // 62 × ₡45.000

// Mes a mes, enero a julio 2026
export const meses = [
  {
    id: 'ene', corto: 'Ene', nombre: 'Enero 2026',
    mantenimiento: 3135000, extraordinaria: 221500, mora: 9000, intereses: 13,
    variables: 242437, aguaComunes: 269128,
    detalle: [
      ['Comisiones bancarias — BAC', 9624], ['Recarga celular — ICE', 1000], ['Reintegro FF.31B', 45000],
      ['Desconexión de medidores', 40000], ['Reconexión de medidores', 10000], ['Electricidad — CNFL', 25290],
      ['Lectura de medidores', 5000], ['Limpieza de ceniceros', 60000], ['Mantenimiento y reparación', 25000],
      ['Mantenimiento de medidores', 5000], ['Retiro de adornos', 10000], ['Teléfono — ICE', 6523],
    ],
  },
  {
    id: 'feb', corto: 'Feb', nombre: 'Febrero 2026',
    mantenimiento: 2655000, extraordinaria: 86468, mora: 0, intereses: 2,
    variables: 60183, aguaComunes: 299983,
    detalle: [
      ['Comisiones bancarias — BAC', 11760], ['Electricidad — CNFL', 22320],
      ['Limpieza de ceniceros', 20000], ['Teléfono — ICE', 6103],
    ],
  },
  {
    id: 'mar', corto: 'Mar', nombre: 'Marzo 2026',
    mantenimiento: 2845000, extraordinaria: 0, mora: 0, intereses: 0,
    variables: 114007, aguaComunes: 217335,
    detalle: [
      ['Comisiones bancarias — BAC', 15981], ['Recarga celular — ICE', 1000], ['Electricidad — CNFL', 18610],
      ['Lectura de medidores', 10000], ['Limpieza de ceniceros', 60000], ['Teléfono — ICE', 8416],
    ],
  },
  {
    id: 'abr', corto: 'Abr', nombre: 'Abril 2026',
    mantenimiento: 2630000, extraordinaria: 0, mora: 0, intereses: 0,
    variables: 61838, aguaComunes: 330629,
    detalle: [
      ['Comisiones bancarias — BAC', 13382], ['Electricidad — CNFL', 17370], ['Lectura de medidores', 5000],
      ['Mantenimiento y reparación', 18000], ['Teléfono — ICE', 8086],
    ],
  },
  {
    id: 'may', corto: 'May', nombre: 'Mayo 2026',
    mantenimiento: 2385000, extraordinaria: 0, mora: 0, intereses: 0,
    variables: 95472, aguaComunes: 181149,
    detalle: [
      ['Comisiones bancarias — BAC', 13686], ['Electricidad — CNFL', 45020], ['Lectura de medidores', 5000],
      ['Limpieza de ceniceros', 20000], ['Teléfono — ICE', 11766],
    ],
  },
  {
    id: 'jun', corto: 'Jun', nombre: 'Junio 2026',
    mantenimiento: 2610000, extraordinaria: 0, mora: 0, intereses: 0,
    variables: 1232458, aguaComunes: 406528,
    nota: 'Mes de inversión: pintura de techos',
    detalle: [
      ['Comisiones bancarias — BAC', 18896],
      ['Proyecto pintura de techos (materiales El Lagar + mano de obra contratada)', 797845, true],
      ['Reparación de portones y batería', 41000], ['Cable e internet — Claro', 56836], ['Electricidad — CNFL', 18065],
      ['Teléfono y recarga — ICE', 7519], ['Lectura de medidores', 5000], ['Limpieza de ceniceros', 80000],
      ['Fumigación de áreas verdes', 15000], ['Jardinería', 120000], ['Mantenimiento de cámaras', 55000],
      ['Agua de la caseta — AyA', 17297],
    ],
  },
  {
    id: 'jul', corto: 'Jul', nombre: 'Julio 2026',
    mantenimiento: 2655000, extraordinaria: 0, mora: 0, intereses: 0,
    variables: 270417, aguaComunes: 96796,
    detalle: [
      ['Insumos de limpieza — Alpemusa', 17050], ['Comisiones bancarias — BAC', 14615], ['Internet y telefonía — Claro', 23356],
      ['Electricidad — CNFL (2 cuentas)', 27100], ['Reparación y mantenimiento — El Lagar', 3500], ['Jardinería', 120000],
      ['Teléfono — ICE', 7155], ['Lectura de medidores', 5000], ['Recarga celular — Kolbi', 1000],
      ['Limpieza y reparación de ceniceros', 35000], ['Agua de la caseta — AyA', 16641],
    ],
  },
];

// Resumen por subperíodo del ejercicio (incluye Sep–Dic 2025, que no tiene detalle mensual)
export const periodos = [
  { periodo: 'Sep–Dic 2025', ingresos: 11553858, egresos: 10994956, reserva: 55890 },
  { periodo: 'Ene–May 2026', ingresos: 13966983, egresos: 11965761, reserva: 200122 },
  { periodo: 'Junio 2026', ingresos: 2610000, egresos: 3657706, reserva: 0 },
  { periodo: 'Julio 2026', ingresos: 2655000, egresos: 2385933, reserva: 26907 },
];

export const reserva = {
  saldoInicial: 1192903, // al inicio del período, setiembre 2025
  generado: 282919,
  total: 1475822,
};

export const agua = [
  { periodo: 'Sep–Dic 2025', cobrado: 3300428, pagado: 4824639 },
  { periodo: 'Ene–May 2026', cobrado: 4291068, pagado: 5589292 },
  { periodo: 'Junio 2026', cobrado: 704013, pagado: 1110541 },
  { periodo: 'Julio 2026', cobrado: 1011855, pagado: 1108651 },
];

export const cuentasPorCobrar = {
  alDia: 51,
  parcial: 10,
  pendienteTotal: 1,
  recaudacionMes: 99.7,
  mantenimientoAgua: [
    { filial: '3A', concepto: 'Mantenimiento + agua', saldo: 54965 },
    { filial: '09B', concepto: 'Mantenimiento', saldo: 45000 },
    { filial: '25A', concepto: 'Mantenimiento', saldo: 45000 },
    { filial: '28A', concepto: 'Mantenimiento', saldo: 45000 },
    { filial: '09A', concepto: 'Agua', saldo: 20595 },
    { filial: '23A', concepto: 'Agua', saldo: 19105 },
    { filial: '06B', concepto: 'Agua', saldo: 17875 },
    { filial: '18A', concepto: 'Agua', saldo: 17875 },
    { filial: '06A', concepto: 'Agua', saldo: 17075 },
    { filial: '26B', concepto: 'Agua', saldo: 10965 },
    { filial: '04A', concepto: 'Agua', saldo: 5975 },
  ],
  extraordinaria: [
    { filial: '08A', concepto: 'Proyecto asfaltado 2025', saldo: 171468 },
  ],
};

export const sepDic2025 = {
  ingresos: [
    ['400-001', 'Cuotas condominales (mantenimiento)', 11457855],
    ['400-002', 'Cuotas de agua', 3300428],
    ['400-003', 'Cuotas extraordinarias', 51000],
    ['400-006', 'Morosidad', 45000],
    ['400-005', 'Intereses ganados', 3],
  ],
  egresos: [
    ['500-001-001', 'Administración — CMD S.A.', 1795000],
    ['500-001-002', 'Agua condóminos — macromedidor AyA', 4746366],
    ['500-001-003', 'Agua de la caseta', 78273],
    ['500-001-004', 'Artículos de decoración y efemérides', 199372],
    ['500-001-005', 'Artículos de limpieza', 40488],
    ['500-001-008', 'Fondo de reserva', 89054],
    ['500-001-010', 'Mantenimiento y limpieza de ceniceros / fontanería', 260000],
    ['500-001-012', 'Recarga celular #8684-4010', 4000],
    ['500-001-015', 'Reparación y mantenimiento de instalaciones', 298215],
    ['500-001-016', 'Reparación y mantenimiento de portones', 62500],
    ['500-001-017', 'Electricidad — CNFL', 85790],
    ['500-001-018', 'Internet y fibra óptica 120 Mbps', 114048],
    ['500-001-019', 'Jardinería', 700360],
    ['500-001-020', 'Portería — Seguridad Río Térraba', 5728490],
    ['500-001-021', 'Teléfono 2253-5197 — ICE', 26760],
    ['500-001-024', 'Mantenimiento de cámaras de vigilancia', 25000],
    ['500-002-001', 'Comisiones bancarias — BAC', 41668],
  ],
  margen: 3.76,
  balance: {
    activoCorriente: [
      ['Bancos', 2778972],
      ['Cuentas por cobrar — agua', 409271],
      ['Cuentas por cobrar — mantenimiento', 855500],
      ['Cuentas por cobrar — multas', 40550],
      ['Cuentas por cobrar — extraordinarias', 600872],
    ],
    activoFijo: [
      ['Equipo de cámaras de seguridad (neto de depreciación)', 1400599],
      ['Sonómetro (neto de depreciación)', 54132],
    ],
    pasivos: [['Adelantos recibidos', 275000]],
    patrimonio: [
      ['Fondo de reserva', 1192903],
      ['Resultados acumulados de períodos anteriores', 4113091],
      ['Resultado del período Sep–Dic 2025', 558902],
    ],
  },
};

/* ---------- LINEAMIENTOS ---------- */

export const lineamientos = [
  {
    codigo: 'LIN-001', ref: 'CRED-LIN-001', icon: 'Trash2', titulo: 'Residuos, basurero y reciclaje',
    puntos: [
      'Horario: abre lunes 8:00 a.m. (cierra miércoles) y viernes 12:00 m.d. (cierra sábado).',
      'Basura en bolsas plásticas cerradas. No se aceptan escombros, muebles ni materiales peligrosos.',
      'Prohibido dejar bolsas en zonas comunes, gradas o la zona de medidores.',
      'Reciclaje: 4 basureros para plástico y latas junto a portería.',
    ],
    sanciones: '1ª vez: llamada de atención formal. Reincidencia: multa según el Reglamento.',
  },
  {
    codigo: 'LIN-002', ref: 'CRED-LIN-002', icon: 'VolumeX', titulo: 'Control de ruido',
    puntos: [
      'De día (6 a.m. a 10 p.m.): máximo 65 dB. De noche (10 p.m. a 6 a.m.): máximo 45 dB.',
      'Las quejas se reciben solo por los canales oficiales. La Administración verifica con el sonómetro Extech 407730.',
    ],
    sanciones: '1ª vez: advertencia escrita. 2ª: llamada de atención formal. Reincidencia: multa.',
    enlace: { texto: 'Presentar una queja de ruido', href: 'formularioQuejas' },
  },
  {
    codigo: 'LIN-003', ref: 'CRED-LIN-003', icon: 'PawPrint', titulo: 'Manejo responsable de mascotas',
    puntos: [
      'Siempre con correa en las áreas comunes. No pueden transitar sueltas.',
      'Los desechos se recogen de inmediato. Portería anota los incidentes en bitácora con hora y filial.',
    ],
    sanciones: '1ª vez: advertencia escrita. 2ª: multa económica. Casos graves: Asamblea General.',
  },
  {
    codigo: 'LIN-004', ref: 'CRED-LIN-004', icon: 'DoorOpen', titulo: 'Ingreso de visitas',
    puntos: [
      'Visitas recurrentes: registro previo con nombre, cédula y relación con el residente. Vigencia de 6 meses.',
      'Visitas no recurrentes y proveedores: autorización previa por teléfono a portería con nombre, cédula, filial y hora.',
      'Sin autorización no se permite el ingreso. Cada residente responde por sus visitantes.',
    ],
  },
  {
    codigo: 'LIN-005', ref: 'CRED-LIN-005', icon: 'House', titulo: 'Alquiler y consumo de sustancias',
    puntos: [
      'Se permite alquilar habitaciones si el uso sigue siendo habitacional y el inquilino cumple el Reglamento Interno.',
      'Alquilar no exime al propietario de sus obligaciones condominales.',
      'Prohibido fumar o consumir sustancias en áreas comunes e instalaciones de uso colectivo (Ley 9028).',
    ],
  },
  {
    codigo: 'LIN-006', ref: 'Abril 2026', icon: 'Bike', titulo: 'Repartidores y entregas',
    puntos: [
      'Los repartidores no pueden ingresar libremente bajo ninguna circunstancia.',
      'El residente avisa antes a portería. El repartidor se quita el casco al ingresar.',
      'Si no se cumple el protocolo, se niega el acceso hasta cumplirlo.',
    ],
    consulta: {
      titulo: 'Consulta a propietarios, mayo 2026',
      propuesta: 'Se votó si los propietarios interesados podían dejar nombre y teléfono en la caseta para que portería los llamara al llegar una visita o pedido, en lugar del aviso previo actual.',
      consultadas: 62, respuestas: 12, aFavor: 9,
      resolucion: 'Con 12 respuestas de 62 filiales (19,4 % de participación) y 9 votos a favor, no se alcanzó el respaldo necesario. El procedimiento se mantiene: aviso previo a portería o registro en la bitácora de visitas recurrentes.',
    },
  },
  {
    codigo: 'LIN-007', ref: 'Marzo 2026', icon: 'Megaphone', titulo: 'Comunicaciones oficiales',
    puntos: [
      'Canales oficiales: condominioeldoral@ciemedcr.com, WhatsApp +506 8684-4010 y comunicados formales de la Administración.',
      'Un comunicado enviado por correo electrónico se considera debidamente notificado.',
      'Los grupos informales y los mensajes personales no son canales oficiales.',
      'Cada propietario mantiene su correo actualizado y facilita los datos de sus inquilinos cuando corresponda.',
    ],
  },
];

/* ---------- PROYECTOS ---------- */

export const fotosTechos = [
  { src: import.meta.env.BASE_URL + 'img/techo-antes.jpg', etiqueta: 'Antes', texto: 'Oxidación generalizada, parches disparejos, láminas y tornillos deteriorados.' },
  { src: import.meta.env.BASE_URL + 'img/techo-despues.jpg', etiqueta: 'Después', texto: 'Pintura anticorrosiva uniforme y sellado completo.' },
  { src: import.meta.env.BASE_URL + 'img/techo-detalle.jpg', etiqueta: 'Detalle', texto: 'Sección lateral con láminas nuevas instaladas, trabajo en proceso.' },
];

export const gastosTechos = [
  ['01/06', 'Cubetas de pintura', 'El Lagar', 49450, 'material'],
  ['02/06', 'Materiales', 'El Lagar', 97900, 'material'],
  ['03/06', 'Mano de obra, días 1 y 2', 'Contratista', 30000, 'obra'],
  ['04/06', 'Materiales', 'El Lagar', 97900, 'material'],
  ['04/06', 'Felpas', 'El Lagar', 20875, 'material'],
  ['05/06', 'Mano de obra, 3 días', 'Contratista', 90000, 'obra'],
  ['10/06', 'Felpas', 'Almacenes Unidos', 20875, 'material'],
  ['10/06', 'Pintura', 'El Lagar', 49450, 'material'],
  ['10/06', 'Materiales', 'El Lagar', 49450, 'material'],
  ['10/06', 'Adelanto de mano de obra', 'Contratista', 5000, 'obra'],
  ['11/06', 'Adelanto de mano de obra', 'Contratista', 5000, 'obra'],
  ['11/06', 'Adelanto de mano de obra', 'Contratista', 5000, 'obra'],
  ['12/06', 'Cubetas', 'El Lagar', 49450, 'material'],
  ['12/06', 'Pago de pintura (adelanto)', 'Contratista', 15000, 'obra'],
  ['13/06', 'Pago de pintura (adelanto)', 'Contratista', 45000, 'obra'],
  ['18/06', 'Cubetas', 'El Lagar', 49450, 'material'],
  ['18/06', 'Diluyente', 'El Lagar', 3595, 'material'],
  ['19/06', 'Cubetas', 'El Lagar', 49450, 'material'],
  ['19/06', 'Mano de obra de la semana', 'Contratista', 65000, 'obra'],
];

// estado: 'curso' | 'proximo' | 'hecho' | 'continuo'
export const proyectos = [
  { icon: 'PaintRoller', titulo: 'Pintura y reparación de techos', estado: 'curso', fecha: '2025–2026', fondos: 'Fondos ordinarios de mantenimiento', texto: 'Reparación integral y progresiva: sustitución de láminas y tornillos, reparación de fugas y pintado. Sin cuota extraordinaria.' },
  { icon: 'House', titulo: 'Finalización de la pintura de techos', estado: 'proximo', fecha: '2026', fondos: 'Fondos ordinarios', texto: 'Terminar el pintado en los tres bloques con revisión final del sellado anticorrosivo.' },
  { icon: 'Hammer', titulo: 'Pintura y arreglo de aleros', estado: 'proximo', fecha: '2026', fondos: 'Planificado', texto: 'Reparación y pintado de los aleros de todo el condominio para corregir el deterioro y mejorar la fachada.' },
  { icon: 'Footprints', titulo: 'Pintura de aceras', estado: 'proximo', fecha: '2026', fondos: 'Planificado', texto: 'Pintado de todas las aceras para mejorar seguridad, visibilidad y aspecto de las áreas comunes.' },
  { icon: 'Construction', titulo: 'Asfaltado', estado: 'hecho', fecha: 'Enero 2025', fondos: 'Cuota extraordinaria aprobada en Asamblea', texto: 'Asfalto nuevo, demarcación completa, 27 topes de concreto, espacios para motos y para personas con discapacidad. Control de calidad con núcleos.' },
  { icon: 'Cctv', titulo: 'Mejoras de seguridad: cámaras', estado: 'hecho', fecha: 'Mayo 2025', texto: 'Hikvision IP Bullet 2MP, visión nocturna de 30 m, cableado Cat6, monitoreo desde portería y app móvil.' },
  { icon: 'Paintbrush', titulo: 'Obras de pintura y embellecimiento', estado: 'hecho', fecha: 'Abril–junio 2025', texto: 'Muro divisor, entradas de las 31 filiales del piso 1, rejillas en negro brillante, borde de caño en amarillo tráfico y demarcación de parqueos.' },
  { icon: 'Fence', titulo: 'Verjas y estructuras metálicas', estado: 'hecho', fecha: 'Febrero–abril 2025', texto: 'Soldadura y pintura anticorrosiva en verjas divisorias, baranda de la caseta y portones de acceso y áreas comunes.' },
  { icon: 'Gauge', titulo: 'Sonómetro Extech 407730', estado: 'hecho', fecha: 'Marzo 2025', texto: 'Herramienta para verificar de forma objetiva las quejas de ruido (LIN-002).' },
  { icon: 'Wrench', titulo: 'Reparación y mantenimiento de instalaciones', estado: 'continuo', fecha: 'Oct 2024 – jun 2025', texto: 'Canoas, filtraciones en varias filiales, gradas metálicas, pintura anticorrosiva en barandas y portones, brazo del portón peatonal.' },
  { icon: 'Droplets', titulo: 'Medidores de agua', estado: 'continuo', fecha: 'Oct 2024 – feb 2025', texto: 'Reparación de fugas, conexión en más de 25 filiales, regulación de presión en el medidor principal y preparación para la individualización.' },
  { icon: 'Sprout', titulo: 'Jardinería y fumigación', estado: 'continuo', fecha: 'Oct 2024 – hoy', texto: 'Corte, poda, fumigación y siembra cada mes. Contrato de ₡120.000 por mes desde mayo 2025. Coordinación con el Ministerio de Salud.' },
];

/* ---------- LEGAL ---------- */

export const casosCerrados = [
  { titulo: 'Daños por fuga de agua, filiales 11A y 12B', fecha: 'Noviembre 2023', texto: 'Una fuga del desagüe de la lavadora en la filial 12B dañó pared y techo de la 11A, con riesgo de cortocircuito. La Administración guió la investigación formal con debido proceso (Arts. 15 y 19, Ley 7933). Todo propietario debe reparar a su costo los daños que cause a filiales vecinas.' },
  { titulo: 'Alquiler de cuartos y consumo de sustancias', fecha: 'Diciembre 2023', texto: 'Se permite alquilar habitaciones si el uso sigue siendo habitacional y el inquilino cumple el Reglamento Interno. El tabaco y otras sustancias están prohibidos en todas las áreas comunes (Ley 9028). Detalle completo en el lineamiento LIN-005.' },
];

export const taller = {
  resumen: 'Taller mecánico clandestino en un inmueble colindante, identificado en Google Maps como "Taller Automotriz Quesada", a 24 m del condominio. No tiene patente municipal ni permisos sanitarios ni del Cuerpo de Bomberos. Genera ruido constante (51,7 dB medidos dentro de una filial colindante), olores tóxicos y riesgo de incendio por el manejo de materiales inflamables.',
  expediente: '26-003367-0007-CO',
  estado: 'Solicitud de Aclaración y Adición ante la Sala IV, pendiente de resolución',
  // Orden cronológico
  eventos: [
    { fecha: 'Jul 2024', tipo: 'gestion', titulo: '1ª denuncia ante el Ministerio de Salud', texto: 'Consecutivo No. 226-2024. La inspección no constató actividad en el momento de la visita.' },
    { fecha: 'May 2025', tipo: 'gestion', titulo: 'Denuncia ante la Municipalidad de San José', texto: 'Denuncia #118 / SIAP-23427-2025. El oficio SP-798-2025 indica que la inspección solo observó una casa de habitación sin actividad comercial visible.' },
    { fecha: 'Ene 2026', tipo: 'gestion', titulo: 'Recurso de amparo ante la Sala Constitucional', texto: 'Expediente 26-003367-0007-CO. Más de 28 filiales firmaron una declaración de afectación directa.' },
    { fecha: 'Feb 2026', tipo: 'resolucion', titulo: 'Resolución Sala IV N° 2026006439: sin lugar', texto: 'Se basó en que las inspecciones no constataron actividad irregular. El 25 de febrero la Administración presentó una Solicitud de Aclaración y Adición: las inspecciones se hicieron en horarios en que el taller no operaba.' },
    { fecha: 'Mar 2026', tipo: 'evidencia', titulo: 'Nueva evidencia acústica', texto: '51,7 dB medidos con el sonómetro Extech 407730 dentro de una filial colindante. El taller aparece en Google Maps como negocio activo con teléfono de contacto, lo que contradice el informe SP-798-2025.' },
    { fecha: 'May 2026', tipo: 'gestion', titulo: '3 denuncias nuevas a la vez', texto: 'Ante el Cuerpo de Bomberos, el Ministerio de Salud y la Municipalidad de San José, con la evidencia actualizada.' },
  ],
};

/* ---------- GESTIÓN ---------- */

export const gestion = [
  { icon: 'Mail', titulo: 'Cobro y estados de cuenta', texto: 'Envío individual a cada filial del 15 al 17 de cada mes, con seguimiento personalizado de la mora.' },
  { icon: 'Droplet', titulo: 'Lectura de medidores', texto: '62 medidores leídos cada mes. Facturación por consumo individual según la tarifa de ARESEP.' },
  { icon: 'CreditCard', titulo: 'Pago de obligaciones', texto: 'AyA, CNFL, ICE, Seguridad Río Térraba, jardinería y demás proveedores, a tiempo.' },
  { icon: 'BarChart3', titulo: 'Reportes financieros', texto: 'Estado de resultados, balance y flujo de caja cada mes, publicados en este portal.' },
  { icon: 'Lock', titulo: 'Control de acceso', texto: 'Supervisión de portería y cámaras, bitácora de incidentes y gestión de visitas.' },
  { icon: 'Wrench', titulo: 'Coordinación de mantenimiento', texto: 'Contratación y supervisión de proveedores para mantenimiento correctivo y preventivo.' },
  { icon: 'Scale', titulo: 'Gestión legal', texto: 'Seguimiento de expedientes, asesoría condominal y trámites ante instituciones públicas.' },
  { icon: 'Megaphone', titulo: 'Comunicaciones oficiales', texto: 'Comunicados, lineamientos y actualizaciones mensuales por los canales oficiales.' },
];
