import React, { useState, useEffect, useMemo } from 'react';

// Iconos SVG integrados para la interfaz técnica de inspección
const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
  ),
  Building: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
  ),
  Walkthrough: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
  ),
  Wrench: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
  ),
  GoogleMaps: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
  ),
  Phone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
  ),
  DownloadPDF: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
  ),
  CheckCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
  ),
  AlertTriangle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
  ),
  MessageCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
  ),
  Folder: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  ),
  ArrowDown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
  )
};

const INITIAL_CONSORCIOS = [
  { id: 1, nombre: 'Administración San Martín', contacto: 'admin@sanmartin.com', telefono: '+5491112345678' },
  { id: 2, nombre: 'Consorcios del Centro', contacto: 'contacto@centroconsorcios.com', telefono: '+5491187654321' }
];

const INITIAL_EDIFICIOS = [
  { 
    id: 1, 
    consorcioId: 1,
    nombre: 'Torre Libertador', 
    direccion: 'Av. Libertador 1234, Buenos Aires', 
    telefonoPortero: '+5491144556677',
    nombrePortero: 'Carlos Gómez',
    horarioIngreso: '07:00 a 19:00 hs',
    pisosTotales: 8,
    unidades: 24,
    precioPorUnidad: 2500,
    tieneSubsuelo: true,
    tienePatioLuz: true,
    notasAcceso: 'La llave de sala de máquinas está con el portero.'
  },
  { 
    id: 2, 
    consorcioId: 2,
    nombre: 'Edificio Los Pinos', 
    direccion: 'San Martín 456, Buenos Aires', 
    telefonoPortero: '+5491188990011',
    nombrePortero: 'Miguel Encargado',
    horarioIngreso: '08:00 a 18:00 hs',
    pisosTotales: 5,
    unidades: 15,
    precioPorUnidad: 2500,
    tieneSubsuelo: true,
    tienePatioLuz: true,
    notasAcceso: 'Ingreso secundario por portón de cocheras.'
  }
];

const INITIAL_REPARACIONES = [
  { 
    id: 1, 
    edificioId: 1, 
    pisoArea: 'Azotea / Terraza',
    categoria: 'Ascensores',
    condicion: 'Malo',
    descripcion: 'Pérdida ligera de aceite en motor principal de ascensor 1', 
    prioridad: 'Alta',
    estado: 'Pendiente', 
    proveedorAsignado: 'Ascensores Sur',
    costoEstimado: 65000,
    fecha: '2026-10-04',
    mes: '2026-10'
  },
  { 
    id: 2, 
    edificioId: 1, 
    pisoArea: 'Piso 6 - Palier',
    categoria: 'Electricidad / Luces',
    condicion: 'Regular',
    descripcion: 'Luminaria de emergencia rota y falta luz en escalera', 
    prioridad: 'Media',
    estado: 'En Curso', 
    proveedorAsignado: 'ElectroFix',
    costoEstimado: 22000,
    fecha: '2026-10-02',
    mes: '2026-10'
  },
  { 
    id: 3, 
    edificioId: 2, 
    pisoArea: 'Subsuelo / Cocheras',
    categoria: 'Plomería / Bombas',
    condicion: 'Crítico',
    descripcion: 'Limpieza urgente de automático de bomba de achique', 
    prioridad: 'Urgente',
    estado: 'Resuelto', 
    proveedorAsignado: 'HidroServicios',
    costoEstimado: 38000,
    fecha: '2026-09-28',
    mes: '2026-09'
  }
];

export default function AppConsorcios() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Consorcio Seleccionado en Menú Izquierdo ('Todos' o ID de consorcio)
  // Nota: Si es null, mostramos la pantalla inicial con la imagen del edificio.
  const [selectedConsorcioId, setSelectedConsorcioId] = useState(null);

  // Persistencia Local
  const [consorcios, setConsorcios] = useState(() => {
    const saved = localStorage.getItem('consorcios_lista_v2');
    return saved ? JSON.parse(saved) : INITIAL_CONSORCIOS;
  });

  const [edificios, setEdificios] = useState(() => {
    const saved = localStorage.getItem('consorcios_edificios_v2');
    return saved ? JSON.parse(saved) : INITIAL_EDIFICIOS;
  });

  const [reparaciones, setReparaciones] = useState(() => {
    const saved = localStorage.getItem('consorcios_reparaciones_v2');
    return saved ? JSON.parse(saved) : INITIAL_REPARACIONES;
  });

  // Carga dinámica de jsPDF para descarga de reportes en PDF sin errores
  useEffect(() => {
    if (!window.jspdf) {
      const script1 = document.createElement('script');
      script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script1.async = true;
      document.body.appendChild(script1);

      const script2 = document.createElement('script');
      script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js';
      script2.async = true;
      document.body.appendChild(script2);
    }
  }, []);

  // Persistencia en LocalStorage
  useEffect(() => {
    localStorage.setItem('consorcios_lista_v2', JSON.stringify(consorcios));
  }, [consorcios]);

  useEffect(() => {
    localStorage.setItem('consorcios_edificios_v2', JSON.stringify(edificios));
  }, [edificios]);

  useEffect(() => {
    localStorage.setItem('consorcios_reparaciones_v2', JSON.stringify(reparaciones));
  }, [reparaciones]);

  // Selección de Mes Actual
  const currentMonthStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }, []);

  const [selectedMonth, setSelectedMonth] = useState(currentMonthStr);
  const [selectedEdificioFilter, setSelectedEdificioFilter] = useState('Todos');

  // Modales
  const [showModal, setShowModal] = useState(null);

  // Formulario Consorcio
  const [formConsorcio, setFormConsorcio] = useState({ nombre: '', contacto: '', telefono: '' });

  // Formulario Edificio
  const [formEdificio, setFormEdificio] = useState({
    consorcioId: '',
    nombre: '',
    direccion: '',
    telefonoPortero: '',
    nombrePortero: '',
    horarioIngreso: '',
    pisosTotales: 6,
    unidades: 20,
    precioPorUnidad: 2500,
    tieneSubsuelo: true,
    tienePatioLuz: true,
    notasAcceso: ''
  });

  // Formulario Incidencia / Reparación Manual
  const [formReparacion, setFormReparacion] = useState({
    edificioId: '',
    pisoArea: 'Azotea / Terraza',
    categoria: 'General',
    condicion: 'Regular',
    descripcion: '',
    prioridad: 'Media',
    estado: 'Pendiente',
    proveedorAsignado: '',
    costoEstimado: ''
  });

  // ESTADO DE INSPECCIÓN EN CURSO
  const [activeWalkthrough, setActiveWalkthrough] = useState(null);
  const [walkthroughStepIndex, setWalkthroughStepIndex] = useState(0);
  const [walkthroughSteps, setWalkthroughSteps] = useState([]);
  const [walkthroughIncidentsCount, setWalkthroughIncidentsCount] = useState(0);

  // Filtrado de edificios según el consorcio activo en la franja izquierda
  const edificiosFiltrados = useMemo(() => {
    if (selectedConsorcioId === 'Todos' || selectedConsorcioId === null) return edificios;
    return edificios.filter(e => e.consorcioId === Number(selectedConsorcioId));
  }, [edificios, selectedConsorcioId]);

  // Iniciar recorrido guiado incorporando Vereda y Patios
  const startWalkthrough = (edificio) => {
    const steps = [];

    // 1. Vereda y Accesos exteriores
    steps.push({
      type: 'Vereda',
      title: '1. Vereda, Frente y Accesos',
      subtitle: 'Inspección de baldosas, rampas, caja de gas, tapas de inspección de calzada.',
      items: ['Baldosas y vereda en buen estado', 'Tapas de inspección en vereda / gas', 'Rampa de acceso y limpiezas de frente']
    });

    // 2. Hall de Ingreso
    steps.push({
      type: 'Hall',
      title: '2. Hall de Ingreso y Entrada Principal',
      subtitle: 'Control de cerradura, portero eléctrico, buzones y vidrios.',
      items: ['Cerradura electroimán / Cierra-puerta', 'Frente de portero eléctrico', 'Pisos y vidrios del hall']
    });

    // 3. Patios y Patios de Luz
    if (edificio.tienePatioLuz) {
      steps.push({
        type: 'Patio',
        title: '3. Patios y Patios de Luz',
        subtitle: 'Revisión de rejillas de desagüe, paredes internas y ventilaciones.',
        items: ['Rejillas de desagüe pluvial libres', 'Estado de paredes y pintura de aire luz', 'Iluminación de patios internos']
      });
    }

    // 4. Azotea / Terraza
    steps.push({
      type: 'Azotea',
      title: '4. Azotea / Terraza y Sala de Máquinas',
      subtitle: 'Inspección de tanques, membranas, motores de ascensor y bocas de inspección.',
      items: ['Tanques de agua y membranado', 'Cuarto de motores de ascensores', 'Bocas de inspección y conductos']
    });

    // 5. Pisos descendentes
    const totalPisos = Number(edificio.pisosTotales) || 5;
    for (let p = totalPisos; p >= 1; p--) {
      steps.push({
        type: 'Piso',
        title: `Piso ${p} — Palier y Escalera`,
        subtitle: `Verificación de luces de emergencia, extintores y tableros eléctricos.`,
        items: ['Luces de palier y emergencia', 'Mangueras / Extintores', 'Estado de tableros eléctricos de piso']
      });
    }

    // 6. Subsuelo
    if (edificio.tieneSubsuelo) {
      steps.push({
        type: 'Subsuelo',
        title: 'Subsuelo, Cocheras y Tableros Principales',
        subtitle: 'Revisión de bombas de achique, tableros eléctricos y portón.',
        items: ['Bombas de achique y tableros principales', 'Portón automatizado', 'Inexistencia de filtraciones']
      });
    }

    setActiveWalkthrough(edificio);
    setWalkthroughSteps(steps);
    setWalkthroughStepIndex(0);
    setWalkthroughIncidentsCount(0);
  };

  const handleNextStep = () => {
    if (walkthroughStepIndex < walkthroughSteps.length - 1) {
      setWalkthroughStepIndex(prev => prev + 1);
    } else {
      setActiveWalkthrough(null);
    }
  };

  const handleReportIncidentInWalkthrough = () => {
    const currentStep = walkthroughSteps[walkthroughStepIndex];
    setFormReparacion({
      edificioId: activeWalkthrough.id,
      pisoArea: currentStep.title,
      categoria: currentStep.type === 'Azotea' ? 'Ascensores' : currentStep.type === 'Subsuelo' ? 'Plomería / Bombas' : 'Pisos',
      condicion: 'Malo',
      descripcion: '',
      prioridad: 'Alta',
      estado: 'Pendiente',
      proveedorAsignado: '',
      costoEstimado: ''
    });
    setShowModal('reparacion_walkthrough');
  };

  const handleAddConsorcio = (e) => {
    e.preventDefault();
    if (!formConsorcio.nombre) return;
    const newC = { id: Date.now(), ...formConsorcio };
    setConsorcios([...consorcios, newC]);
    setFormConsorcio({ nombre: '', contacto: '', telefono: '' });
    setShowModal(null);
  };

  const handleAddEdificio = (e) => {
    e.preventDefault();
    if (!formEdificio.nombre || !formEdificio.direccion || !formEdificio.consorcioId) return;
    const newEd = {
      ...formEdificio,
      id: Date.now(),
      consorcioId: Number(formEdificio.consorcioId),
      pisosTotales: Number(formEdificio.pisosTotales) || 1,
      unidades: Number(formEdificio.unidades) || 1,
      precioPorUnidad: Number(formEdificio.precioPorUnidad) || 2500
    };
    setEdificios([...edificios, newEd]);
    setFormEdificio({
      consorcioId: '', nombre: '', direccion: '', telefonoPortero: '', nombrePortero: '',
      horarioIngreso: '', pisosTotales: 6, unidades: 20, precioPorUnidad: 2500, tieneSubsuelo: true, tienePatioLuz: true, notasAcceso: ''
    });
    setShowModal(null);
  };

  const handleAddReparacion = (e) => {
    e.preventDefault();
    if (!formReparacion.edificioId || !formReparacion.descripcion) return;
    const today = new Date().toISOString().split('T')[0];
    const newRep = {
      ...formReparacion,
      id: Date.now(),
      edificioId: Number(formReparacion.edificioId),
      costoEstimado: Number(formReparacion.costoEstimado) || 0,
      fecha: today,
      mes: today.substring(0, 7)
    };
    setReparaciones([newRep, ...reparaciones]);

    if (showModal === 'reparacion_walkthrough') {
      setWalkthroughIncidentsCount(prev => prev + 1);
    }

    setFormReparacion({
      edificioId: '', pisoArea: 'Azotea / Terraza', categoria: 'General', condicion: 'Regular',
      descripcion: '', prioridad: 'Media', estado: 'Pendiente', proveedorAsignado: '', costoEstimado: ''
    });
    setShowModal(null);
  };

  const handleStatusChange = (id, newStatus) => {
    setReparaciones(reparaciones.map(r => r.id === id ? { ...r, estado: newStatus } : r));
  };

  const handleDeleteItem = (type, id) => {
    if (type === 'edificio') {
      setEdificios(edificios.filter(e => e.id !== id));
      setReparaciones(reparaciones.filter(r => r.edificioId !== id));
    } else if (type === 'reparacion') {
      setReparaciones(reparaciones.filter(r => r.id !== id));
    } else if (type === 'consorcio') {
      setConsorcios(consorcios.filter(c => c.id !== id));
      setEdificios(edificios.filter(e => e.consorcioId !== id));
      if (selectedConsorcioId === id) setSelectedConsorcioId(null);
    }
  };

  // DESCARGA DE PDF EXCLUSIVO POR EDIFICIO
  const handleDownloadPDFForEdificio = (edificioId) => {
    const ed = edificios.find(e => e.id === Number(edificioId));
    if (!ed) return;

    const consorcioEd = consorcios.find(c => c.id === ed.consorcioId);
    const targetReparaciones = reparaciones.filter(r => r.edificioId === ed.id && r.mes === selectedMonth);

    if (window.jspdf) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      // Encabezado
      doc.setFontSize(16);
      doc.setTextColor(30, 41, 59);
      doc.text(`Informe Técnico de Inspección - ${ed.nombre}`, 14, 20);

      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(`Consorcio / Admin: ${consorcioEd?.nombre || 'General'} | Mes: ${selectedMonth} | Fecha: ${new Date().toLocaleDateString()}`, 14, 26);

      // Ficha Técnica Edificio
      doc.setFillColor(248, 250, 252);
      doc.rect(14, 30, 182, 28, 'F');

      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      doc.text(`Dirección: ${ed.direccion}`, 18, 37);
      doc.text(`Portero: ${ed.nombrePortero || 'N/A'} (${ed.telefonoPortero || 'Sin Tel'})`, 18, 43);
      doc.text(`Estructura: ${ed.pisosTotales} Pisos | Unidades: ${ed.unidades} UF | Costo Relevamiento: $${(ed.unidades * ed.precioPorUnidad).toLocaleString()}`, 18, 49);

      let currentY = 65;

      doc.setFontSize(12);
      doc.setTextColor(79, 70, 229);
      doc.text(`Hallazgos e Incidencias Registradas (${targetReparaciones.length})`, 14, currentY);
      currentY += 6;

      if (targetReparaciones.length === 0) {
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text("Sin novedades ni anomalías registradas durante la inspección de este mes.", 14, currentY + 5);
      } else {
        const tableData = targetReparaciones.map(r => [
          r.fecha,
          r.pisoArea,
          r.categoria,
          r.condicion || 'N/A',
          r.descripcion,
          r.estado,
          `$${Number(r.costoEstimado).toLocaleString()}`
        ]);

        if (doc.autoTable) {
          doc.autoTable({
            startY: currentY,
            head: [['Fecha', 'Sector / Área', 'Categoría', 'Estado Obs.', 'Descripción', 'Estado', 'Costo Est.']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [79, 70, 229], fontSize: 8 },
            bodyStyles: { fontSize: 8 },
            margin: { left: 14, right: 14 }
          });
        }
      }

      doc.save(`Reporte_${ed.nombre.replace(/\s+/g, '_')}_${selectedMonth}.pdf`);
    } else {
      window.print();
    }
  };

  const renderDashboard = () => {
    const reparacionesMesActual = reparaciones.filter(r => r.mes === selectedMonth);
    const pendientesCount = reparacionesMesActual.filter(r => r.estado === 'Pendiente').length;
    const costoTotalMes = reparacionesMesActual.reduce((acc, r) => acc + (Number(r.costoEstimado) || 0), 0);
    const consorcioActivoObj = consorcios.find(c => c.id === Number(selectedConsorcioId));

    return (
      <div className="space-y-6">
        {/* Banner Superior */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-indigo-500/30 text-indigo-300 font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {consorcioActivoObj ? `Administración: ${consorcioActivoObj.nombre}` : 'Vista General Consorcios'}
              </span>
              {selectedConsorcioId && (
                <button 
                  onClick={() => setSelectedConsorcioId(null)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  ← Volver a inicio
                </button>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">Recorrido Técnico y Mantenimiento</h1>
            <p className="text-sm text-slate-300 mt-1">Inspección piso por piso: desde Azotea hasta Subsuelo</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setShowModal('edificio')}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md"
            >
              <Icons.Plus /> Nuevo Edificio
            </button>
          </div>
        </div>

        {/* Métricas del Mes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Icons.Building />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Edificios a Cargo</p>
              <p className="text-2xl font-bold text-slate-800">{edificiosFiltrados.length}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
              <Icons.AlertTriangle />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Incidencias Mes ({selectedMonth})</p>
              <p className="text-2xl font-bold text-rose-600">{pendientesCount} Pendientes</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <span className="text-lg font-bold">$</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Presupuesto Estimado Arreglos</p>
              <p className="text-2xl font-bold text-slate-800">${costoTotalMes.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Tarjetas de Edificios con Botón PDF individual y Google Maps */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Icons.Walkthrough /> Iniciar Recorrido de Inspección Visual
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {edificiosFiltrados.map(ed => {
              const costoRelevamiento = (ed.unidades || 0) * (ed.precioPorUnidad || 2500);
              const consorcioEd = consorcios.find(c => c.id === ed.consorcioId);

              return (
                <div key={ed.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-all">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded uppercase">
                          {consorcioEd?.nombre || 'Consorcio'}
                        </span>
                        <h3 className="font-bold text-slate-800 text-lg mt-0.5">{ed.nombre}</h3>
                      </div>
                      <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                        {ed.pisosTotales} Pisos {ed.tieneSubsuelo && '+ Subsuelo'}
                      </span>
                    </div>

                    {/* Dirección con Link directo a Google Maps */}
                    <div className="mb-3 flex items-center gap-2">
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ed.direccion)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold px-2.5 py-1 rounded-lg transition-colors"
                        title="Abrir en Google Maps"
                      >
                        <Icons.GoogleMaps />
                        <span className="underline">{ed.direccion}</span>
                      </a>
                    </div>
                    
                    {/* Ficha de datos y Costo de Relevamiento */}
                    <div className="bg-slate-50 p-3 rounded-xl space-y-2 text-xs text-slate-700 mb-4 border border-slate-100">
                      <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                        <span className="font-bold text-slate-500">Costo Relevamiento:</span>
                        <span className="font-extrabold text-indigo-700 text-sm">
                          ${costoRelevamiento.toLocaleString()} 
                          <span className="text-[10px] text-slate-500 font-normal ml-1">({ed.unidades || 0} UF)</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-500 flex items-center gap-1"><Icons.Phone /> Portero:</span> 
                        <span>{ed.nombrePortero || 'Sin asignar'} ({ed.telefonoPortero})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-500 flex items-center gap-1"><Icons.Clock /> Horario:</span> 
                        <span className="text-slate-600">{ed.horarioIngreso}</span>
                      </div>
                    </div>
                  </div>

                  {/* Acciones del Edificio */}
                  <div className="space-y-2">
                    <button
                      onClick={() => startWalkthrough(ed)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <Icons.Walkthrough /> Iniciar Recorrido desde Vereda →
                    </button>

                    <button
                      onClick={() => handleDownloadPDFForEdificio(ed.id)}
                      className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <Icons.DownloadPDF /> Descargar Reporte PDF de {ed.nombre} ({selectedMonth})
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderEdificios = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Directorio de Edificios y Fichas Técnicas</h1>
          <p className="text-sm text-slate-500">Cálculo de costo de relevamiento por unidad y ubicaciones</p>
        </div>
        <button 
          onClick={() => setShowModal('edificio')}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
        >
          <Icons.Plus /> Agregar Edificio
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {edificiosFiltrados.map(edificio => {
          const consorcioEd = consorcios.find(c => c.id === edificio.consorcioId);
          const costoTotalRelevamiento = (edificio.unidades || 0) * (edificio.precioPorUnidad || 2500);

          return (
            <div key={edificio.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative">
              <button 
                onClick={() => handleDeleteItem('edificio', edificio.id)}
                className="absolute top-6 right-6 text-slate-300 hover:text-rose-500 transition-colors"
                title="Eliminar edificio"
              >
                <Icons.Trash />
              </button>

              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-md">
                {consorcioEd?.nombre || 'Sin Consorcio'}
              </span>

              <h3 className="text-xl font-bold text-slate-800 mt-2">{edificio.nombre}</h3>
              
              {/* Botón Google Maps Directo */}
              <div className="mt-1 mb-4">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(edificio.direccion)}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-rose-600 font-semibold text-xs bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors"
                >
                  <Icons.GoogleMaps />
                  <span>{edificio.direccion}</span>
                </a>
              </div>

              {/* Ficha de Costo por Unidad */}
              <div className="space-y-3">
                <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Costo Relevamiento Térmico/Técnico</p>
                    <p className="text-lg font-extrabold text-indigo-700 mt-0.5">
                      ${costoTotalRelevamiento.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right text-xs text-indigo-900">
                    <p className="font-bold">{edificio.unidades || 0} Unidades</p>
                    <p className="text-indigo-600">${(edificio.precioPorUnidad || 2500).toLocaleString()} / UF</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Portero / Encargado</p>
                    <p className="text-sm font-semibold text-slate-800">{edificio.nombrePortero || 'Sin Registrar'}</p>
                    <p className="text-xs text-slate-500">{edificio.telefonoPortero}</p>
                  </div>
                  {edificio.telefonoPortero && (
                    <a 
                      href={`https://wa.me/${edificio.telefonoPortero.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <Icons.MessageCircle /> WhatsApp
                    </a>
                  )}
                </div>

                {edificio.notasAcceso && (
                  <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-600 italic">
                    <strong>Notas de Acceso:</strong> {edificio.notasAcceso}
                  </div>
                )}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => startWalkthrough(edificio)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Icons.Walkthrough /> Iniciar Recorrido
                </button>

                <button
                  onClick={() => handleDownloadPDFForEdificio(edificio.id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Icons.DownloadPDF /> PDF Edificio
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderReparaciones = () => {
    const filteredReparaciones = reparaciones.filter(r => {
      const matchMonth = r.mes === selectedMonth;
      const matchEdificio = selectedEdificioFilter === 'Todos' || r.edificioId === Number(selectedEdificioFilter);
      return matchMonth && matchEdificio;
    });

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Registro de Arreglos e Incidencias</h1>
            <p className="text-sm text-slate-500">Filtro mensual con niveles de conservación e inspección de sectores</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                setFormReparacion({
                  edificioId: edificios[0]?.id || '',
                  pisoArea: 'Azotea / Terraza', categoria: 'General', condicion: 'Regular',
                  descripcion: '', prioridad: 'Media', estado: 'Pendiente', proveedorAsignado: '', costoEstimado: ''
                });
                setShowModal('reparacion');
              }}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all"
            >
              <Icons.Plus /> Nueva Incidencia
            </button>
          </div>
        </div>

        {/* Barra de Filtro de Mes en Curso y Consorcio */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mes en Curso:</label>
              <input 
                type="month" 
                value={selectedMonth}
                onChange={e => setSelectedMonth(e.target.value)}
                className="text-sm bg-slate-50 border border-slate-200 rounded-lg p-2 font-bold text-slate-800 outline-none focus:border-indigo-600"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Edificio:</label>
              <select 
                value={selectedEdificioFilter} 
                onChange={e => setSelectedEdificioFilter(e.target.value)}
                className="text-sm bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium text-slate-700 outline-none"
              >
                <option value="Todos">Todos los consorcios</option>
                {edificiosFiltrados.map(ed => (
                  <option key={ed.id} value={ed.id}>{ed.nombre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabla de Incidencias */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="p-4">Fecha / Edificio</th>
                  <th className="p-4">Piso / Sector / Categoría</th>
                  <th className="p-4">Condición</th>
                  <th className="p-4">Detalle del Arreglo</th>
                  <th className="p-4">Proveedor / Costo</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredReparaciones.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-400 italic">No hay arreglos o hallazgos registrados para el mes seleccionado ({selectedMonth}).</td>
                  </tr>
                ) : (
                  filteredReparaciones.map(rep => {
                    const ed = edificios.find(e => e.id === rep.edificioId);
                    return (
                      <tr key={rep.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-slate-800">{ed?.nombre || 'Edificio'}</p>
                          <p className="text-xs text-slate-400">{rep.fecha}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-semibold text-slate-800 text-xs">{rep.pisoArea}</p>
                          <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded inline-block mt-0.5">{rep.categoria}</span>
                        </td>
                        <td className="p-4">
                          <span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg ${
                            rep.condicion === 'Bueno' ? 'bg-emerald-100 text-emerald-800' :
                            rep.condicion === 'Regular' ? 'bg-amber-100 text-amber-800' :
                            rep.condicion === 'Malo' ? 'bg-orange-100 text-orange-800' :
                            'bg-rose-100 text-rose-800'
                          }`}>
                            {rep.condicion || 'Regular'}
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="text-slate-700 text-xs leading-relaxed">{rep.descripcion}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-slate-800 font-medium text-xs">{rep.proveedorAsignado || 'Sin asignar'}</p>
                          <p className="text-xs font-bold text-slate-600">${Number(rep.costoEstimado).toLocaleString()}</p>
                        </td>
                        <td className="p-4">
                          <select 
                            value={rep.estado} 
                            onChange={(e) => handleStatusChange(rep.id, e.target.value)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-full border outline-none cursor-pointer ${
                              rep.estado === 'Pendiente' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                              rep.estado === 'En Curso' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}
                          >
                            <option value="Pendiente">🔴 Pendiente</option>
                            <option value="En Curso">🔵 En Curso</option>
                            <option value="Resuelto">🟢 Resuelto</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => handleDeleteItem('reparacion', rep.id)}
                            className="text-slate-300 hover:text-rose-500 p-1.5 transition-colors"
                          >
                            <Icons.Trash />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // PANTALLA INICIAL SI NO HAY NINGUNA ADMINISTRACIÓN SELECCIONADA
  const renderInitialLanding = () => {
    return (
      <div className="space-y-8 py-4">
        {/* Banner de Bienvenida */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs bg-indigo-500/30 text-indigo-300 font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Inspector App • Panel Central</span>
            <h1 className="text-3xl font-extrabold tracking-tight">Gestión Integral de Consorcios</h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Seleccione una <strong>Administración o Consorcio</strong> en el panel izquierdo para desplegar la información completa de edificios, costos por unidad, recorridos técnicos y reportes de mantenimiento.
            </p>
          </div>
          <button 
            onClick={() => setShowModal('consorcio')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Icons.Plus /> Registrar Nueva Administración
          </button>
        </div>

        {/* Sección Destacada con Imagen de Edificio y Tarjetas de Acceso */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Icons.Building /> Administraciones Registradas (Seleccione una para comenzar)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {consorcios.map(c => {
              const edificiosAdmin = edificios.filter(e => e.consorcioId === c.id);
              const totalUnidades = edificiosAdmin.reduce((acc, ed) => acc + (ed.unidades || 0), 0);
              
              return (
                <div 
                  key={c.id} 
                  onClick={() => { setSelectedConsorcioId(c.id); setActiveTab('dashboard'); }}
                  className="bg-white border-2 border-slate-200 hover:border-indigo-600 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative h-48 bg-slate-900 overflow-hidden">
                    <img 
                      src={`https://placehold.co/600x300/1e293b/cbd5e1?text=${encodeURIComponent(c.nombre)}`} 
                      alt={c.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div>
                        <span className="text-[10px] bg-indigo-600 text-white font-bold px-2.5 py-1 rounded-full uppercase">
                          {edificiosAdmin.length} Edificios
                        </span>
                        <h3 className="text-xl font-bold text-white mt-1 group-hover:text-indigo-300 transition-colors">{c.nombre}</h3>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:bg-indigo-500">
                        <Icons.ChevronRight />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 bg-white">
                    <div className="flex justify-between items-center text-xs text-slate-500 border-b border-slate-100 pb-2">
                      <span>Contacto: <strong className="text-slate-700">{c.contacto || 'Sin correo'}</strong></span>
                      <span>Total UF: <strong className="text-indigo-600">{totalUnidades} Unidades</strong></span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                        Ver panel de edificios e inspecciones →
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">Clic para abrir</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row">
      {/* Header Móvil */}
      <header className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-30">
        <h1 className="font-bold flex items-center gap-2 text-sm">
          <span className="text-indigo-400"><Icons.Building /></span> Inspector App
        </h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1">
          {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </header>

      {/* Sidebar de Navegación + JERARQUÍA DE CONSORCIOS */}
      <aside className={`fixed md:static inset-0 bg-slate-900 text-white w-full md:w-80 flex flex-col z-20 transition-transform ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-xl shadow-md">
              <Icons.Walkthrough />
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">Inspector App</h1>
              <p className="text-xs text-slate-400">Azotea a Subsuelo</p>
            </div>
          </div>
        </div>

        {/* SECCIÓN JERARQUIZADA DE CONSORCIOS / ADMINISTRACIONES */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Administraciones y Consorcios</span>
            <button 
              onClick={() => setShowModal('consorcio')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 bg-indigo-500/10 px-2 py-1 rounded-lg border border-indigo-500/20"
            >
              <Icons.Plus /> Nueva Admin
            </button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            <button
              onClick={() => { setSelectedConsorcioId(null); setActiveTab('dashboard'); }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex justify-between items-center transition-all ${
                selectedConsorcioId === null ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-2"><Icons.Folder /> Vista General Inicio</span>
              <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-full">{edificios.length}</span>
            </button>

            {consorcios.map(c => {
              const edificiosAdmin = edificios.filter(e => e.consorcioId === c.id);
              const isSel = selectedConsorcioId === c.id;
              return (
                <div key={c.id} className="space-y-1">
                  <div className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-all ${
                    isSel ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-bold' : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800'
                  }`}>
                    <button
                      onClick={() => { setSelectedConsorcioId(c.id); setActiveTab('dashboard'); }}
                      className="flex-1 text-left flex items-center gap-2 truncate text-xs font-semibold"
                    >
                      <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                      <span className="truncate">{c.nombre}</span>
                    </button>
                    <div className="flex items-center gap-2 pl-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isSel ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-indigo-300'}`}>
                        {edificiosAdmin.length} Edif.
                      </span>
                    </div>
                  </div>

                  {/* Sub-lista jerárquica de edificios dentro de esta administración */}
                  {isSel && edificiosAdmin.length > 0 && (
                    <div className="pl-6 space-y-1 py-1">
                      {edificiosAdmin.map(ed => (
                        <div key={ed.id} className="text-[11px] text-slate-400 hover:text-indigo-300 py-1 flex items-center justify-between pr-2">
                          <span className="truncate">• {ed.nombre}</span>
                          <span className="text-[10px] text-slate-500 font-mono">({ed.pisosTotales}p)</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* NAVEGACIÓN PRINCIPAL */}
        <nav className="p-4 flex-1 space-y-1.5 overflow-y-auto">
          {[
            { id: 'dashboard', label: 'Inicio / Recorridos', icon: Icons.Dashboard },
            { id: 'edificios', label: 'Fichas y Relevamiento', icon: Icons.Building },
            { id: 'reparaciones', label: 'Arreglos y Mensual', icon: Icons.Wrench }
          ].map(tab => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                  isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <IconComponent />
                <span className="flex-1">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
          Inspector App v3.4 • Cobro por UF
        </div>
      </aside>

      {/* Área Principal */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {selectedConsorcioId === null && activeTab === 'dashboard' ? (
          renderInitialLanding()
        ) : (
          <>
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'edificios' && renderEdificios()}
            {activeTab === 'reparaciones' && renderReparaciones()}
          </>
        )}
      </main>

      {/* MODAL DE RECORRIDO DE INSPECCIÓN EN CURSO */}
      {activeWalkthrough && walkthroughSteps.length > 0 && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[95vh] overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Inspeccionando: {activeWalkthrough.nombre}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Paso {walkthroughStepIndex + 1} de {walkthroughSteps.length}
                </span>
              </div>

              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-6">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{ width: `${((walkthroughStepIndex + 1) / walkthroughSteps.length) * 100}%` }}
                ></div>
              </div>

              <div className="bg-slate-900 text-white p-5 rounded-2xl mb-6">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase mb-1">
                  <Icons.ArrowDown /> Recorrido en marcha
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold">{walkthroughSteps[walkthroughStepIndex].title}</h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">{walkthroughSteps[walkthroughStepIndex].subtitle}</p>
              </div>

              <div className="space-y-2 mb-6">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Puntos a verificar visualmente:</p>
                {walkthroughSteps[walkthroughStepIndex].items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-semibold text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleNextStep}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Icons.CheckCircle /> Sin Novedad (Siguiente)
                </button>

                <button
                  onClick={handleReportIncidentInWalkthrough}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Icons.AlertTriangle /> Registrar Observación / Defecto
                </button>
              </div>

              <button
                onClick={() => setActiveWalkthrough(null)}
                className="w-full text-xs text-slate-400 hover:text-slate-600 font-semibold text-center pt-2"
              >
                Cancelar Recorrido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALES DE CREACIÓN */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowModal(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <Icons.X />
            </button>

            {/* Modal Crear Consorcio */}
            {showModal === 'consorcio' && (
              <form onSubmit={handleAddConsorcio} className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Nueva Administración / Consorcio</h2>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre de la Administración</label>
                  <input type="text" placeholder="Ej: Administración San Martín" value={formConsorcio.nombre} onChange={e => setFormConsorcio({...formConsorcio, nombre: e.target.value})} className="w-full p-2.5 border rounded-xl text-sm outline-none focus:border-indigo-600" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Email de Contacto</label>
                  <input type="text" placeholder="Ej: admin@sanmartin.com" value={formConsorcio.contacto} onChange={e => setFormConsorcio({...formConsorcio, contacto: e.target.value})} className="w-full p-2.5 border rounded-xl text-sm outline-none focus:border-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Teléfono</label>
                  <input type="text" placeholder="+54911..." value={formConsorcio.telefono} onChange={e => setFormConsorcio({...formConsorcio, telefono: e.target.value})} className="w-full p-2.5 border rounded-xl text-sm outline-none focus:border-indigo-600" />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors">Guardar Administración</button>
              </form>
            )}

            {/* Modal Agregar Edificio */}
            {showModal === 'edificio' && (
              <form onSubmit={handleAddEdificio} className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Nuevo Edificio / Ficha Técnica</h2>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Consorcio Perteneciente</label>
                  <select value={formEdificio.consorcioId} onChange={e => setFormEdificio({...formEdificio, consorcioId: e.target.value})} className="w-full p-2.5 border rounded-xl text-sm outline-none bg-white" required>
                    <option value="">Seleccionar Administración...</option>
                    {consorcios.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre del Edificio</label>
                  <input type="text" placeholder="Ej: Torre Los Ceibos" value={formEdificio.nombre} onChange={e => setFormEdificio({...formEdificio, nombre: e.target.value})} className="w-full p-2.5 border rounded-xl text-sm outline-none focus:border-indigo-600" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Dirección (Google Maps)</label>
                  <input type="text" placeholder="Ej: Belgrano 742, Córdoba" value={formEdificio.direccion} onChange={e => setFormEdificio({...formEdificio, direccion: e.target.value})} className="w-full p-2.5 border rounded-xl text-sm outline-none focus:border-indigo-600" required />
                </div>

                <div className="grid grid-cols-2 gap-3 bg-indigo-50/60 p-3 rounded-xl border border-indigo-100">
                  <div>
                    <label className="block text-xs font-bold text-indigo-900 mb-1">Cant. Unidades (UF)</label>
                    <input type="number" placeholder="20" value={formEdificio.unidades} onChange={e => setFormEdificio({...formEdificio, unidades: e.target.value})} className="w-full p-2 border rounded-xl text-sm outline-none font-bold" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-indigo-900 mb-1">Precio por UF ($)</label>
                    <input type="number" placeholder="2500" value={formEdificio.precioPorUnidad} onChange={e => setFormEdificio({...formEdificio, precioPorUnidad: e.target.value})} className="w-full p-2 border rounded-xl text-sm outline-none font-bold" required />
                  </div>
                  <div className="col-span-2 text-right text-xs font-extrabold text-indigo-700 pt-1">
                    Total Relevamiento: ${((Number(formEdificio.unidades) || 0) * (Number(formEdificio.precioPorUnidad) || 0)).toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre Portero</label>
                    <input type="text" placeholder="Ej: Juan" value={formEdificio.nombrePortero} onChange={e => setFormEdificio({...formEdificio, nombrePortero: e.target.value})} className="w-full p-2.5 border rounded-xl text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Tel. Portero</label>
                    <input type="text" placeholder="+54911..." value={formEdificio.telefonoPortero} onChange={e => setFormEdificio({...formEdificio, telefonoPortero: e.target.value})} className="w-full p-2.5 border rounded-xl text-sm outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Cantidad de Pisos</label>
                    <input type="number" value={formEdificio.pisosTotales} onChange={e => setFormEdificio({...formEdificio, pisosTotales: e.target.value})} className="w-full p-2.5 border rounded-xl text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Horario Ingreso</label>
                    <input type="text" placeholder="Ej: 08:00 a 18:00" value={formEdificio.horarioIngreso} onChange={e => setFormEdificio({...formEdificio, horarioIngreso: e.target.value})} className="w-full p-2.5 border rounded-xl text-sm outline-none" />
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <input type="checkbox" checked={formEdificio.tieneSubsuelo} onChange={e => setFormEdificio({...formEdificio, tieneSubsuelo: e.target.checked})} className="w-4 h-4 text-indigo-600" />
                    Subsuelo
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <input type="checkbox" checked={formEdificio.tienePatioLuz} onChange={e => setFormEdificio({...formEdificio, tienePatioLuz: e.target.checked})} className="w-4 h-4 text-indigo-600" />
                    Patios / Patio Luz
                  </label>
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors">Guardar Ficha de Edificio</button>
              </form>
            )}

            {/* Modal Registrar Incidencia con Opciones de Condición */}
            {(showModal === 'reparacion' || showModal === 'reparacion_walkthrough') && (
              <form onSubmit={handleAddReparacion} className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Registrar Arreglo / Novedad</h2>
                {showModal === 'reparacion' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Edificio</label>
                    <select value={formReparacion.edificioId} onChange={e => setFormReparacion({...formReparacion, edificioId: e.target.value})} className="w-full p-2.5 border rounded-xl text-sm outline-none bg-white" required>
                      <option value="">Seleccionar edificio...</option>
                      {edificiosFiltrados.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Sector / Área</label>
                    <select value={formReparacion.pisoArea} onChange={e => setFormReparacion({...formReparacion, pisoArea: e.target.value})} className="w-full p-2.5 border rounded-xl text-sm outline-none bg-white">
                      <option value="Vereda">Vereda / Frente</option>
                      <option value="Hall de Ingreso">Hall de Ingreso</option>
                      <option value="Patios / Patios de luz">Patios / Patios de luz</option>
                      <option value="Azotea / Terraza">Azotea / Terraza</option>
                      <option value="Pisos / Palieres">Pisos / Palieres</option>
                      <option value="Subsuelo / Cocheras">Subsuelo / Cocheras</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-indigo-900 mb-1">Condición / Estado Obs.</label>
                    <select value={formReparacion.condicion} onChange={e => setFormReparacion({...formReparacion, condicion: e.target.value})} className="w-full p-2.5 border rounded-xl text-sm font-bold outline-none bg-white">
                      <option value="Bueno">🟢 Bueno</option>
                      <option value="Regular">🟡 Regular</option>
                      <option value="Malo">🟠 Malo</option>
                      <option value="Crítico">🔴 Crítico</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Categoría del Arreglo</label>
                  <select value={formReparacion.categoria} onChange={e => setFormReparacion({...formReparacion, categoria: e.target.value})} className="w-full p-2.5 border rounded-xl text-sm outline-none bg-white">
                    <option value="Ascensores">Ascensores</option>
                    <option value="Electricidad / Luces">Electricidad / Luces</option>
                    <option value="Tablero Eléctrico">Tablero Eléctrico</option>
                    <option value="Plomería / Bombas">Plomería / Bombas</option>
                    <option value="Bocas de inspección">Bocas de inspección</option>
                    <option value="Caja de Escalera / Puertas">Caja de Escalera / Puertas</option>
                    <option value="Pintura / Filtraciones">Pintura / Filtraciones</option>
                    <option value="Cerraduras / Hall">Cerraduras / Hall</option>
                    <option value="Pisos">Pisos</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Descripción del Problema</label>
                  <textarea placeholder="Detalle de lo hallado..." value={formReparacion.descripcion} onChange={e => setFormReparacion({...formReparacion, descripcion: e.target.value})} className="w-full p-2.5 border rounded-xl text-sm outline-none h-20" required />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Proveedor / Gremio</label>
                    <input type="text" placeholder="Ej: ElectroFix" value={formReparacion.proveedorAsignado} onChange={e => setFormReparacion({...formReparacion, proveedorAsignado: e.target.value})} className="w-full p-2.5 border rounded-xl text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Costo Estimado ($)</label>
                    <input type="number" placeholder="0" value={formReparacion.costoEstimado} onChange={e => setFormReparacion({...formReparacion, costoEstimado: e.target.value})} className="w-full p-2.5 border rounded-xl text-sm outline-none" />
                  </div>
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors">Guardar Arreglo</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}