'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Breadcrumb from '@/components/Breadcrumb';

export default function InformesPage() {
    // Añade estos estados al inicio del componente junto con los demás estados
    const [addDocPosition, setAddDocPosition] = useState('start'); // 'start' o 'end'
    const [addDocAuthor, setAddDocAuthor] = useState('');
    const [addDocCategory, setAddDocCategory] = useState('');
    const [newDocAuthor, setNewDocAuthor] = useState('');
    const [newDocCategory, setNewDocCategory] = useState('');
    const { data: session, status } = useSession();
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeTab, setActiveTab] = useState('plan-inversion');
    const [expandedReport, setExpandedReport] = useState(null);
    const [editingDoc, setEditingDoc] = useState(null);
    const [newDocTitle, setNewDocTitle] = useState('');
    const [newDocFile, setNewDocFile] = useState(null);
    const [newDocDescription, setNewDocDescription] = useState('');
    const [newDocPublished, setNewDocPublished] = useState(true);
    
    // AÑADE ESTA LÍNEA AQUÍ - Esta es la solución al problema
    const [documentsData, setDocumentsData] = useState({
        'reporte-integrado': { title: "Reporte Integrado", reports: [] },
        'plan-inversion': { title: "Plan de Inversión", reports: [] },
        'informes-gestion': { title: "Informes", reports: [] }
    });
    
    // Estado para controlar la visibilidad del modal de agregar documento
    const [showAddModal, setShowAddModal] = useState(false);
    
    // Nuevos estados para el formulario de agregar documento
    const [addDocTitle, setAddDocTitle] = useState('');
    const [addDocFile, setAddDocFile] = useState(null);
    const [addDocDescription, setAddDocDescription] = useState('');
    const [addDocPublished, setAddDocPublished] = useState(true);
    const [addDocType, setAddDocType] = useState('');
    
    // Estado para controlar el modo administrativo
    const [adminMode, setAdminMode] = useState(true);

    // Define las rutas para la miga de pan
    const breadcrumbItems = [
        { label: 'Informes', url: '/institucional/informes' }
    ];
     // Datos iniciales para los informes (ahora como función para evitar problemas de inicialización)
     const getInitialInformesData = () => ({
        'reporte-integrado': {
            title: "Reporte Integrado",
            reports: [
                // ... tus datos existentes
            ]
        },
        'plan-inversion': {
            title: "Plan de Inversión",
            reports: [
                // ... tus datos existentes
            ]
        },
        'informes-gestion': {
            title: "Informes",
            reports: [
                // ... tus datos existentes
            ]
        }
    });
    // Verificar si el usuario es administrador
    useEffect(() => {
        const checkAdminStatus = async () => {
            if (status === 'authenticated') {
                try {
                    const response = await fetch('/api/check-admin');
                    const data = await response.json();
                    setIsAdmin(data.isAdmin);
                    // Inicializar el modo admin basado en permisos
                    setAdminMode(data.isAdmin);
                } catch (error) {
                    console.error('Error verificando estado de administrador:', error);
                    setIsAdmin(false);
                    setAdminMode(false);
                }
            } else {
                setIsAdmin(false);
                setAdminMode(false);
            }
        };
        
        checkAdminStatus();
    }, [status]);
    
    // Estructura de datos para los informes
    const informesData = {
        
        'reporte-integrado': {
            title: "Reporte Integrado",
            reports: [
              {
                id: "informe-empalme",
                title: "Informe de Empalme 2022",
                url: "/documentos/INFORME-DE-GESTION-2021-2022.pdf",
                description: "Informe de empalme 2022",
                fileSize: "2.5 MB",
                date: "15/03/2024",
                author: "Departamento de Planeación", // Nueva columna
                category: "Empalme", // Nueva columna
                published: true
              },
                {
                    id: "reporte-2024",
                    title: "Reporte Integrado 2024",
                    url: "/documentos/Reporte-integrado-EH-2023.pdf",
                    description: "Reporte Integrado 2024",
                    fileSize: "25,0 MB",
                    date: "10/01/2024",
                    published: true
                },
                {
                    id: "reporte-2023",
                    title: "Reporte Integrado 2023 (Borrador)",
                    url: "/documentos/reporte-integrado-2023.pdf",
                    description: "Versión preliminar del informe anual",
                    fileSize: "3.8 MB",
                    date: "15/01/2023",
                    published: true
                },
                {
                    id: "reporte-2023",
                    title: "Reporte Integrado 2023 (Borrador)",
                    url: "/documentos/reporte-integrado-2023.pdf",
                    description: "Versión preliminar del informe anual",
                    fileSize: "3.8 MB",
                    date: "15/01/2023",
                    published: true
                },
                
            ]
        },
        'plan-inversion': {
            title: "Plan de Inversión",
            reports: [
                {
                    id: "Informe de Empalme",
            title: "Informe de Empalme 2022",
            url: "./documentos/INFORME-DE-GESTION-2021-2022.pdf",
            description: "Informe de Empalme 2022",
            fileSize: "3.3 MB",
            date: "15/01/2025",
            published: true
                },
                {
                    id: "plan-inversion-2024",
                    title: "Plan de Inversión 2024",
                    url: "/documentos/plan-inversion-2024.pdf",
                    description: "Plan anual de inversiones y proyectos",
                    fileSize: "3.1 MB",
                    date: "20/01/2024",
                    published: true
                },
                {
                    id: "plan-inversion-2023",
                    title: "Plan de Inversión 2023",
                    url: "/documentos/plan-inversion-2023.pdf",
                    description: "Plan anual de inversiones y proyectos",
                    fileSize: "2.9 MB",
                    date: "18/01/2023",
                    published: true
                },
                {
                    id: "plan-inversion-2022",
                    title: "Plan de Inversión 2022",
                    url: "/documentos/plan-inversion-2022.pdf",
                    description: "Plan anual de inversiones y proyectos",
                    fileSize: "2.7 MB",
                    date: "15/01/2022",
                    published: true
                },
                {
                    id: "plan-inversion-2021",
                    title: "Plan de Inversión 2021",
                    url: "/documentos/plan-inversion-2021.pdf",
                    description: "Plan anual de inversiones y proyectos",
                    fileSize: "2.5 MB",
                    date: "12/01/2021",
                    published: true
                }
            ]
        },
        'informes-gestion': {
            title: "Informes",
            reports: [
                {
                    id: "informe-gestion-2024",
                    title: "Informe de Gestión 2024",
                    url: "/documentos/informe-gestion-2024.pdf",
                    description: "Informe anual de gestión corporativa",
                    fileSize: "5.2 MB",
                    date: "28/02/2024",
                    published: true
                },
                {
                    id: "informe-gestion-2023",
                    title: "Informe de Gestión 2023",
                    url: "/documentos/informe-gestion-2023.pdf",
                    description: "Informe anual de gestión corporativa",
                    fileSize: "4.8 MB",
                    date: "25/02/2023",
                    published: true
                }
            ]
        }
    };
    // Función para manejar el cambio de pestañas
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setExpandedReport(null);
        setEditingDoc(null);
    };
    
    // Función para expandir/contraer informes
    const toggleReport = (reportId) => {
        if (expandedReport === reportId) {
            setExpandedReport(null);
            setEditingDoc(null);
        } else {
            setExpandedReport(reportId);
            setEditingDoc(null);
        }
    };
    
    // Filtrar informes según el modo (administrador ve todo, usuario solo ve publicados)
    const getFilteredReports = () => {
        // Validar que documentsData exista
        if (documentsData && 
            documentsData[activeTab] && 
            documentsData[activeTab].reports && 
            Array.isArray(documentsData[activeTab].reports)) {
            
            // Filtrar según el modo
            if (adminMode) {
                return documentsData[activeTab].reports;
            } else {
                return documentsData[activeTab].reports.filter(report => report.published);
            }
        }
        
        // Si documentsData no funciona, intentar usar informesData como respaldo
        if (informesData && 
            informesData[activeTab] && 
            informesData[activeTab].reports && 
            Array.isArray(informesData[activeTab].reports)) {
            
            // Filtrar según el modo
            if (adminMode) {
                return informesData[activeTab].reports;
            } else {
                return informesData[activeTab].reports.filter(report => report.published);
            }
        }
        
        // Si nada funciona, devolver array vacío
        return [];
    };
    

    // Función para alternar el modo administrativo
    const toggleAdminMode = () => {
        if (isAdmin) {
            setAdminMode(!adminMode);
        }
    };
    
    // Funciones para editar documentos existentes
    const startEditingDoc = (report) => {
        setEditingDoc(report.id);
        setNewDocTitle(report.title);
        setNewDocDescription(report.description);
        setNewDocPublished(report.published);
        setNewDocAuthor(report.author || ''); // Añadido
        setNewDocCategory(report.category || ''); // Añadido
    };
    const saveDocChanges = async () => {
        try {
            // Validaciones básicas
            if (!newDocTitle.trim()) {
                alert('Por favor, ingrese un título para el documento.');
                return;
            }
            
            const formData = new FormData();
            formData.append('id', editingDoc);
            formData.append('title', newDocTitle);
            formData.append('description', newDocDescription);
            formData.append('published', newDocPublished);
            formData.append('author', newDocAuthor); // Añadido
            formData.append('category', newDocCategory); // Añadido
            
            if (newDocFile) {
                formData.append('file', newDocFile);
            }
            
            const response = await fetch('/api/documents/update', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                alert('Cambios guardados correctamente');
                setEditingDoc(null);
                // Aquí podrías recargar los datos
                window.location.reload(); // Solución temporal para recargar los datos
            } else {
                alert('Error al guardar los cambios');
            }
        } catch (error) {
            console.error('Error guardando cambios:', error);
            alert('Error al guardar los cambios');
        }
    };
    
    // Función para cambiar el estado de publicación
    const togglePublishState = async (report) => {
        try {
            const response = await fetch('/api/documents/toggle-publish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: report.id,
                    published: !report.published
                })
            });
            
            if (response.ok) {
                alert(`Documento ${report.published ? 'despublicado' : 'publicado'}: ${report.title}`);
                // Aquí podrías recargar los datos
                window.location.reload(); // Solución temporal para recargar los datos
            } else {
                alert('Error al cambiar el estado de publicación');
            }
        } catch (error) {
            console.error('Error cambiando estado:', error);
            alert('Error al cambiar el estado de publicación');
        }
    };
    // Añade esta función para cargar documentos
    const loadDocuments = async () => {
        try {
            console.log("Cargando documentos desde la API...");
            const response = await fetch('/api/documents/list');
            if (response.ok) {
                const data = await response.json();
                console.log("Datos recibidos de la API:", data);
                
                if (data.success && data.documents) {
                    // Validar que la estructura sea correcta
                    if (typeof data.documents === 'object') {
                        // Esta es la estructura que esperamos
                        const processedData = {
                            'reporte-integrado': { 
                                title: "Reporte Integrado", 
                                reports: data.documents['reporte-integrado']?.reports || informesData['reporte-integrado'].reports || []
                            },
                            'plan-inversion': { 
                                title: "Plan de Inversión", 
                                reports: data.documents['plan-inversion']?.reports || informesData['plan-inversion'].reports || []
                            },
                            'informes-gestion': { 
                                title: "Informes", 
                                reports: data.documents['informes-gestion']?.reports || informesData['informes-gestion'].reports || []
                            }
                        };
                        
                        console.log("Datos procesados que se establecerán en el estado:", processedData);
                        setDocumentsData(processedData);
                    } else if (Array.isArray(data.documents)) {
                        // Si la API devuelve un array plano de documentos, necesitamos organizarlos por tipo
                        console.log("API devolvió un array de documentos, organizando por tipo...");
                        
                        const organizedData = {
                            'reporte-integrado': { title: "Reporte Integrado", reports: [] },
                            'plan-inversion': { title: "Plan de Inversión", reports: [] },
                            'informes-gestion': { title: "Informes", reports: [] }
                        };
                        
                        // Organizar documentos por tipo
                        data.documents.forEach(doc => {
                            const type = doc.type || 'reporte-integrado'; // Tipo por defecto
                            if (organizedData[type]) {
                                organizedData[type].reports.push(doc);
                            }
                        });
                        
                        console.log("Datos organizados:", organizedData);
                        setDocumentsData(organizedData);
                    } else {
                        console.error('Formato inesperado de documentos:', data.documents);
                        // Usar datos estáticos como fallback
                        setDocumentsData(informesData);
                    }
                } else {
                    console.error('Formato de respuesta incorrecto:', data);
                    // Usar datos estáticos como fallback
                    setDocumentsData(informesData);
                }
            } else {
                console.error('Error en la respuesta de la API:', response.status);
                // Usar datos estáticos como fallback
                setDocumentsData(informesData);
            }
        } catch (error) {
            console.error('Error al cargar documentos:', error);
            // Usar datos estáticos como fallback
            setDocumentsData(informesData);
        }
    };
// Función auxiliar para validar y procesar documentos
const validateAndProcessDocuments = (documents) => {
    // Asegurarnos que cada categoría tenga una propiedad reports
    const processedData = { ...documents };
    
    // Verificar cada categoría (tab)
    ['reporte-integrado', 'plan-inversion', 'informes-gestion'].forEach(tab => {
        // Si la categoría no existe, crearla
        if (!processedData[tab]) {
            processedData[tab] = { title: getTabTitle(tab), reports: [] };
        }
        
        // Si existe pero no tiene reports, añadirlo
        if (!processedData[tab].reports) {
            processedData[tab].reports = [];
        }
        
        // Si reports no es un array, convertirlo en uno
        if (!Array.isArray(processedData[tab].reports)) {
            processedData[tab].reports = [];
        }
    });
    
    return processedData;
};
// Función auxiliar para obtener el título según la pestaña
const getTabTitle = (tab) => {
    switch (tab) {
        case 'reporte-integrado':
            return "Reporte Integrado";
        case 'plan-inversion':
            return "Plan de Inversión";
        case 'informes-gestion':
            return "Informes";
        default:
            return tab.charAt(0).toUpperCase() + tab.slice(1).replace(/-/g, ' ');
    }
};
// Funciones para agregar nuevo documento
    const openAddDocumentModal = () => {
        // Prepara el modal con el tipo de documento actual
        setAddDocType(activeTab);
        setShowAddModal(true);
    };
    useEffect(() => {
        setDocumentsData(informesData);
        // Luego intentar cargar desde API
        loadDocuments();
    }, []);
    function closeAddDocumentModal() {
        setShowAddModal(false);
        // Limpia el formulario
        setAddDocTitle('');
        setAddDocFile(null);
        setAddDocDescription('');
        setAddDocPublished(true);
        setAddDocAuthor(''); // Añadido
        setAddDocCategory(''); // Añadido
    }
    
    const saveNewDocument = async () => {
        // Validaciones básicas
        if (!addDocTitle.trim()) {
            alert('Por favor, ingrese un título para el documento.');
            return;
        }
        
        if (!addDocFile) {
            alert('Por favor, seleccione un archivo PDF.');
            return;
        }
        
        try {
          // Preparar datos del formulario
         const formData = new FormData();
         formData.append('title', addDocTitle);
         formData.append('file', addDocFile);
         formData.append('description', addDocDescription);
         formData.append('published', addDocPublished);
         formData.append('type', addDocType);
         formData.append('author', addDocAuthor);
         formData.append('category', addDocCategory);
         formData.append('position', addDocPosition);
         formData.append('fileName', uniqueFileName);
         formData.append('folder', 'informes');
         
         // Enviar datos al servidor
         const response = await fetch('/api/documents/create', {
             method: 'POST',
             body: formData
         });
            
            if (response.ok) {
                alert('Documento agregado correctamente');
                closeAddDocumentModal();
                 // Crear copia del estado actual
            const newDocumentsData = JSON.parse(JSON.stringify(documentsData));
            // Asegurarnos que la categoría existe
            if (!newDocumentsData[addDocType]) {
                newDocumentsData[addDocType] = {
                    title: addDocType === 'reporte-integrado' ? 'Reporte Integrado' : 
                           addDocType === 'plan-inversion' ? 'Plan de Inversión' : 'Informes',
                    reports: []
                };
            }
                // Recargar los documentos en lugar de recargar la página
            
            window.location.reload();
        } else {
            alert('Error al agregar el documento');
        }
    
        } catch (error) {
            console.error('Error agregando documento:', error);
            alert('Error al agregar el documento');
        }
         // Crear un objeto con la estructura del nuevo documento
         const newDoc = {
            id: `doc-${Date.now()}`,
            title: addDocTitle,
            url: `/documentos/informes/${addDocType}-${addDocTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}.pdf`,
            description: addDocDescription,
            fileSize: `${Math.round(addDocFile.size / 1024)} KB`,
            date: new Date().toLocaleDateString('es-ES'),
            author: addDocAuthor,
            category: addDocCategory,
            published: addDocPublished
        };
        setDocumentsData(prevData => {
            const newData = JSON.parse(JSON.stringify(prevData));
            if (!newData[addDocType]) {
                newData[addDocType] = {
                    title: getCategoryTitle(addDocType),
                    reports: []
                };
            }
            // Crear una copia profunda para no mutar el estado directamente
            
            const newDoc = {
                id: `doc-${Date.now()}`,
                title: addDocTitle,
                url: `/documentos/informes/${addDocType}-${addDocTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}.pdf`,
                description: addDocDescription,
                fileSize: `${Math.round(addDocFile.size / 1024)} KB`,
                date: new Date().toLocaleDateString('es-ES'),
                author: addDocAuthor,
                category: addDocCategory,
                published: addDocPublished
            };

            if (!newData[addDocType]) {
                // Si la categoría no existe, la creamos
                newData[addDocType] = {
                    title: addDocType === 'reporte-integrado' ? 'Reporte Integrado' : 
                    addDocType === 'plan-inversion' ? 'Plan de Inversión' : 'Informes',
             reports: []
                };
            }
           const newDocument = {
    id: `doc-${Date.now()}`, // Generamos un ID único usando Date.now() directamente
    title: addDocTitle,
    url: `/documentos/informes/${addDocType}-${addDocTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}.pdf`,
    description: addDocDescription,
                fileSize: `${Math.round(addDocFile.size / 1024)} KB`,
                date: new Date().toLocaleDateString('es-ES'),
                author: addDocAuthor,
                category: addDocCategory,
                published: addDocPublished
            };
            
            for (const tab in newData) {
                const reportIndex = newData[tab].reports.findIndex(r => r.id === report.id);
                if (reportIndex !== -1) {
                    // Actualizar el estado de publicación
                    newData[tab].reports[reportIndex].published = !report.published;
                    break;
                }
            }
            if (addDocPosition === 'start') {
                // Añadir al principio del array
                newDocumentsData[addDocType].reports.unshift(newDocument);
            } else {
                // Añadir al final del array
                newDocumentsData[addDocType].reports.push(newDocument);
            }
            setDocumentsData(newDocumentsData);
            return newData;
            for (const tab in newData) {
                const reportIndex = newData[tab].reports.findIndex(r => r.id === editingDoc);
                if (reportIndex !== -1) {
                    // Actualizar el documento encontrado
                    newData[tab].reports[reportIndex] = {
                        ...newData[tab].reports[reportIndex],
                        title: newDocTitle,
                        description: newDocDescription,
                        published: newDocPublished,
                        author: newDocAuthor,
                        category: newDocCategory
                    };
                    break;
                }
            }
            
            return newData;
        
        });
        
    };
    
    useEffect(() => {
           setDocumentsData(informesData);
        loadDocuments();
    }, []);
    
    useEffect(() => {
        const checkAdminStatus = async () => {
            if (status === 'authenticated') {
                try {
                    const response = await fetch('/api/check-admin');
                    const data = await response.json();
                    setIsAdmin(data.isAdmin);
                    setAdminMode(data.isAdmin);
                } catch (error) {
                    console.error('Error verificando estado de administrador:', error);
                    setIsAdmin(false);
                    setAdminMode(false);
                }
            } else {
                setIsAdmin(false);
                setAdminMode(false);
            }
        };
        
        checkAdminStatus();
    }, [status]);
    return (
        <div>
            {/* Miga de pan */}
            <Breadcrumb items={breadcrumbItems} />
            
            {/* Título de página y estado de autenticación */}
            <div className="container" style={{ 
                marginTop: '30px', 
                marginBottom: '30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1 style={{ 
                    fontSize: '32px', 
                    color: '#333', 
                    margin: '0',
                    fontWeight: '700'
                }}>
                    Informes
                </h1>
                
                {status === 'authenticated' ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '15px' }}>
                            Bienvenido, {session.user.name} 
                            {isAdmin && <span style={{ color: '#4caf50', marginLeft: '5px' }}>(Admin)</span>}
                        </div>
                        
                        {/* Botón para cambiar modo administrativo */}
                        {isAdmin && (
                            <button
                                onClick={toggleAdminMode}
                                style={{
                                    padding: '8px 15px',
                                    backgroundColor: adminMode ? '#ff9800' : '#4caf50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    marginLeft: '10px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                {adminMode ? 'Salir modo admin' : 'Entrar modo admin'}
                            </button>
                        )}
                    </div>
                ) : status === 'loading' ? (
                    <div>Cargando...</div>
                ) : (
                    <Link 
                        href="/login"
                        style={{
                            padding: '8px 15px',
                            backgroundColor: '#0099e0',
                            color: 'white',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontSize: '14px'
                        }}
                    >
                        Iniciar Sesión
                    </Link>
                )}
            </div>
            {/* Contenedor principal */}
            <div className="container" style={{ marginBottom: '60px' }}>
                {/* Pestañas principales */}
                <div className="tabs-container" style={{ 
                    display: 'flex', 
                    borderRadius: '5px', 
                    overflow: 'hidden',
                    marginBottom: '30px'
                }}>
                    <div 
                        className={`tab ${activeTab === 'reporte-integrado' ? 'active' : ''}`}
                        style={{
                            flex: 1,
                            padding: '15px 20px',
                            textAlign: 'center',
                            backgroundColor: activeTab === 'reporte-integrado' ? '#0099e0' : '#eceff1',
                            color: activeTab === 'reporte-integrado' ? 'white' : '#555',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onClick={() => handleTabChange('reporte-integrado')}
                    >
                        <div style={{ 
                            width: '24px', 
                            height: '24px', 
                            backgroundColor: 'white', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            marginRight: '10px',
                            color: activeTab === 'reporte-integrado' ? '#0099e0' : '#8a9198'
                        }}>
                            ✓
                        </div>
                        Reporte Integrado
                    </div>
                    <div 
                        className={`tab ${activeTab === 'plan-inversion' ? 'active' : ''}`}
                        style={{
                            flex: 1,
                            padding: '15px 20px',
                            textAlign: 'center',
                            backgroundColor: activeTab === 'plan-inversion' ? '#0099e0' : '#eceff1',
                            color: activeTab === 'plan-inversion' ? 'white' : '#555',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onClick={() => handleTabChange('plan-inversion')}
                    >
                        <div style={{ 
                            width: '24px', 
                            height: '24px', 
                            backgroundColor: 'white', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            marginRight: '10px',
                            color: activeTab === 'plan-inversion' ? '#0099e0' : '#8a9198'
                        }}>
                            ✓
                        </div>
                        Plan de Inversión
                    </div>
                    <div 
                        className={`tab ${activeTab === 'informes-gestion' ? 'active' : ''}`}
                        style={{
                            flex: 1,
                            padding: '15px 20px',
                            textAlign: 'center',
                            backgroundColor: activeTab === 'informes-gestion' ? '#0099e0' : '#eceff1',
                            color: activeTab === 'informes-gestion' ? 'white' : '#555',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onClick={() => handleTabChange('informes-gestion')}
                    >
                        <div style={{ 
                            width: '24px', 
                            height: '24px', 
                            backgroundColor: 'white', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            marginRight: '10px',
                            color: activeTab === 'informes-gestion' ? '#0099e0' : '#8a9198'
                        }}>
                            ✓
                        </div>
                        Informes
                    </div>
                </div>
                {/* Lista de informes */}
                <div className="reports-container" style={{
                    border: '1px solid #e0e0e0',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    backgroundColor: '#f9f9f9'
                }}>
                    {getFilteredReports().map((report) => (
                        <div 
                            key={report.id} 
                            className="report-item"
                            style={{
                                borderBottom: '1px solid #e0e0e0',
                                backgroundColor: adminMode && !report.published ? '#fff9e6' : 'white'
                            }}
                        >
                            <div 
                                className="report-header" 
                                style={{
                                    padding: '15px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer'
                                }}
                                onClick={() => toggleReport(report.id)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ 
                                        color: '#0099e0', 
                                        marginRight: '10px', 
                                        fontSize: '20px'
                                    }}>
                                        {expandedReport === report.id ? '−' : '+'}
                                    </span>
                                    <h3 style={{ 
                                        margin: 0, 
                                        fontSize: '16px', 
                                        fontWeight: 'normal',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        {report.title}
                                        {adminMode && !report.published && (
                                            <span style={{ 
                                                fontSize: '12px', 
                                                backgroundColor: '#ff9800',
                                                color: 'white',
                                                padding: '2px 6px',
                                                borderRadius: '10px',
                                                marginLeft: '10px'
                                            }}>
                                                No publicado
                                            </span>
                                        )}
                                    </h3>
                                </div>
                                <span style={{ 
                                    color: '#0099e0',
                                    transform: expandedReport === report.id ? 'rotate(90deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease'
                                }}>❯</span>
                            </div>
                            {/* Contenido expandible del informe */}
                            {expandedReport === report.id && (
                                <div className="report-content" style={{ padding: '0 20px 20px 50px' }}>
                                    {editingDoc === report.id ? (
                                        
                                        // Formulario de edición (solo para administradores)
                                        <div style={{ marginBottom: '20px' }}>
                                            <div style={{ marginBottom: '15px' }}>
                                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                                                    Título del documento:
                                                </label>
                                                <input
                                                    type="text"
                                                    value={newDocTitle}
                                                    onChange={(e) => setNewDocTitle(e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px 10px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '4px'
                                                    }}
                                                />
                                            </div>
                                            <div style={{ marginBottom: '15px' }}>
                                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                                                    Archivo PDF:
                                                </label>
                                                <input
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={(e) => setNewDocFile(e.target.files[0])}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px 10px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '4px',
                                                        backgroundColor: 'white'
                                                    }}
                                                />
                                                <div style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>
                                                    Archivo actual: {report.url.split('/').pop()}
                                                </div>
                                            </div>
                                            <div style={{ marginBottom: '15px' }}>
                                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                                                    Descripción:
                                                </label>
                                                <textarea
                                                    rows="3"
                                                    value={newDocDescription}
                                                    onChange={(e) => setNewDocDescription(e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px 10px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '4px',
                                                        resize: 'vertical'
                                                    }}
                                                />
                                            </div>
                                            <div style={{ marginBottom: '15px' }}>
                                                <label style={{ display: 'flex', alignItems: 'center', fontWeight: '500', marginBottom: '10px' }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={newDocPublished}
                                                        onChange={(e) => setNewDocPublished(e.target.checked)}
                                                        style={{ marginRight: '8px' }}
                                                    />
                                                    Publicar documento
                                                </label>
                                                <div style={{ fontSize: '12px', color: '#666' }}>
                                                    Si esta opción está marcada, el documento será visible para todos los usuarios.
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button
                                                    onClick={saveDocChanges}
                                                    style={{
                                                        padding: '8px 20px',
                                                        backgroundColor: '#4caf50',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Guardar cambios
                                                </button>
                                                <button
                                                    onClick={() => setEditingDoc(null)}
                                                    style={{
                                                        padding: '8px 20px',
                                                        backgroundColor: '#f1f1f1',
                                                        color: '#333',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                        <div style={{ marginBottom: '15px' }}>
                                          <p style={{ margin: '0 0 10px 0', color: '#666' }}>{report.description}</p>
                                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', fontSize: '14px', color: '#888' }}>
                                            <span>
                                              <strong>Tamaño:</strong> {report.fileSize}
                                            </span>
                                            <span>
                                              <strong>Fecha:</strong> {report.date}
                                            </span>
                                            <span>
                                              <strong>Autor:</strong> {report.author || 'No especificado'}
                                            </span>
                                            <span>
                                              <strong>Categoría:</strong> {report.category || 'General'}
                                            </span>
                                          </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                          <a 
                                            href={report.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            style={{
                                              display: 'inline-flex',
                                              alignItems: 'center',
                                              padding: '8px 15px',
                                              backgroundColor: '#0099e0',
                                              color: 'white',
                                              borderRadius: '4px',
                                              textDecoration: 'none',
                                              fontSize: '14px'
                                            }}
                                          >
                                            <span style={{ marginRight: '5px' }}>📥</span> Descargar PDF
                                          </a>
                                          <button
                                            style={{
                                              display: 'inline-flex',
                                              alignItems: 'center',
                                              padding: '8px 15px',
                                              backgroundColor: '#f1f1f1',
                                              color: '#333',
                                              border: 'none',
                                              borderRadius: '4px',
                                              fontSize: '14px',
                                              cursor: 'pointer'
                                            }}
                                            onClick={() => {
                                              window.open(report.url, '_blank');
                                            }}
                                          >
                                            <span style={{ marginRight: '5px' }}>👁️</span> Ver documento
                                          </button>
                                                
                                               {/* Botones para administradores */}
    {adminMode && (
      <>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 15px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
          onClick={() => startEditingDoc(report)}
        >
          <span style={{ marginRight: '5px' }}>✏️</span> Editar
        </button>
        
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 15px',
            backgroundColor: report.published ? '#ff9800' : '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
          onClick={() => togglePublishState(report)}
        >
          <span style={{ marginRight: '5px' }}>
            {report.published ? '🔒' : '🔓'}
          </span>
          {report.published ? 'Despublicar' : 'Publicar'}
        </button>
      </>
    )}
  </div>
</>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {/* Botón para agregar nuevo informe (solo para administradores) */}
                {adminMode && (
                    <div style={{ marginTop: '20px', textAlign: 'right' }}>
                        <button
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '10px 20px',
                                backgroundColor: '#4caf50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                            onClick={openAddDocumentModal}
                        >
                            <span style={{ marginRight: '5px', fontSize: '18px' }}>+</span> Agregar nuevo documento
                        </button>
                    </div>
                )}
            </div>
            {/* Fixed Payment Button */}
            <a href="/servicios/pagar-factura" className="fixed-pay-btn" style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                backgroundColor: '#4caf50',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '30px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold',
                zIndex: 1000
            }}>
                <i style={{ marginRight: '8px', fontSize: '18px' }}>💳</i> Pagar Factura
            </a>

          {/* Modal para agregar nuevo documento */}
{showAddModal && (
    <div className="modal-backdrop" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1001
    }} onClick={closeAddDocumentModal}>
        <div className="modal-content" style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh', // Limitar altura máxima
            overflowY: 'auto', // Permitir scroll si el contenido es muy largo
            padding: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }} onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                borderBottom: '1px solid #e0e0e0',
                paddingBottom: '10px'
            }}>
                <h2 style={{ margin: 0, fontSize: '24px', color: '#333' }}>
                    Agregar nuevo documento
                </h2>
                <button 
                    style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: '#666'
                    }}
                    onClick={closeAddDocumentModal}
                >
                    ×
                </button>
            </div>
            {/* Botones de acción */}
<div style={{ 
    display: 'flex', 
    justifyContent: 'flex-end', 
    gap: '10px', 
    marginTop: '20px',
    borderTop: '1px solid #eee',
    paddingTop: '15px'
}}>
    <button
        style={{
            padding: '10px 20px',
            backgroundColor: '#f1f1f1',
            color: '#333',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer'
        }}
        onClick={closeAddDocumentModal}
    >
        Cancelar
    </button>
    <button
        style={{
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer'
        }}
        onClick={saveNewDocument}
    >
        Guardar documento
    </button>
</div>
            <div className="modal-body">
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                        Título del documento: *
                    </label>
                    <input
                        type="text"
                        value={addDocTitle}
                        onChange={(e) => setAddDocTitle(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                        placeholder="Ej: Plan de Inversión 2025"
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                        Archivo PDF: *
                    </label>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setAddDocFile(e.target.files[0])}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            backgroundColor: 'white'
                        }}
                    />
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                        Solo se aceptan archivos PDF
                    </div>
                </div>
                
                {/* Nuevos campos */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                        Autor/Departamento:
                    </label>
                    <input
                        type="text"
                        value={addDocAuthor}
                        onChange={(e) => setAddDocAuthor(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                        placeholder="Ej: Departamento de Planeación"
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                        Categoría:
                    </label>
                    <input
                        type="text"
                        value={addDocCategory}
                        onChange={(e) => setAddDocCategory(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                        placeholder="Ej: Planificación, Presupuesto, General"
                    />
                </div>
                {/* Tipo de documento (pestaña) */}
<div style={{ marginBottom: '15px' }}>
    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
        Sección donde agregar: *
    </label>
    <select
        value={addDocType}
        onChange={(e) => setAddDocType(e.target.value)}
        style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
        }}
    >
        <option value="reporte-integrado">Reporte Integrado</option>
        <option value="plan-inversion">Plan de Inversión</option>
        <option value="informes-gestion">Informes</option>
    </select>
</div>

{/* Posición en la lista */}
<div style={{ marginBottom: '15px' }}>
    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
        Posición:
    </label>
    <select
        value={addDocPosition}
        onChange={(e) => setAddDocPosition(e.target.value)}
        style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
        }}
    >
        <option value="start">Al inicio de la lista</option>
        <option value="end">Al final de la lista</option>
    </select>
</div>
                {/* El resto del modal continúa igual... */}
            </div>
        </div>
    </div>
)}
        </div>
    );
}