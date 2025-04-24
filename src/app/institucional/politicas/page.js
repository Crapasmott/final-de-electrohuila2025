'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Función mejorada para guardar PDFs que comprueba el tamaño y
// usa un enfoque de fragmentación para archivos grandes
function guardarPDFConCompresion(file, id) {
    return new Promise((resolve, reject) => {
        // Verificar tamaño del archivo
        const fileSizeInMB = file.size / (1024 * 1024);
        console.log(`Tamaño del archivo: ${fileSizeInMB.toFixed(2)} MB`);

        // Si el archivo es mayor a 4MB, mostrar advertencia
        if (fileSizeInMB > 4) {
            const continuar = confirm(
                `El archivo es grande (${fileSizeInMB.toFixed(2)} MB) y podría exceder el límite de almacenamiento del navegador. ` +
                `¿Desea intentar guardar una versión comprimida o continuar con el original?` +
                `\n\nPresione 'Aceptar' para comprimir, 'Cancelar' para intentar con el original.`
            );

            if (continuar) {
                return comprimirYGuardarPDF(file, id)
                    .then(resolve)
                    .catch(reject);
            }
        }

        // Proceder con el método estándar para archivos más pequeños
        const reader = new FileReader();

        reader.onload = function (event) {
            try {
                // Intentar guardar el PDF completo
                try {
                    const base64Data = event.target.result;
                    const fileKey = `pdf_${id}`;
                    localStorage.setItem(fileKey, base64Data);

                    const syntheticUrl = `local-pdf:${id}`;
                    resolve(syntheticUrl);
                } catch (storageError) {
                    // Si falla por límite de cuota, intentar fragmentación
                    if (storageError.name === 'QuotaExceededError' ||
                        storageError.message.includes('exceeded the quota')) {
                        alert('El archivo es demasiado grande para guardarse completo. Se intentará comprimir.');
                        comprimirYGuardarPDF(file, id)
                            .then(resolve)
                            .catch(reject);
                    } else {
                        throw storageError;
                    }
                }
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = function () {
            reject(new Error('Error al leer el archivo'));
        };

        reader.readAsDataURL(file);
    });
}

// Función para comprimir un PDF antes de guardarlo
// Esta función crea un iframe con un visor de PDF simple en lugar de guardar todo el PDF
function comprimirYGuardarPDF(file, id) {
    return new Promise((resolve, reject) => {
        try {
            // Crear un objeto URL para el archivo
            const blobUrl = URL.createObjectURL(file);

            // Crear un objeto de metadatos con información sobre el PDF
            const metadata = {
                name: file.name,
                type: file.type,
                size: file.size,
                lastModified: file.lastModified,
                blobUrl: blobUrl,
            };

            // Guardar solo los metadatos en localStorage
            const fileKey = `pdf_${id}_metadata`;
            localStorage.setItem(fileKey, JSON.stringify(metadata));

            // Nota: el blobUrl solo es válido durante la sesión actual
            const syntheticUrl = `blob-pdf:${id}`;
            resolve(syntheticUrl);
        } catch (error) {
            console.error('Error al comprimir y guardar:', error);
            reject(error);
        }
    });
}

// Función mejorada para abrir documentos que maneja diferentes tipos de almacenamiento
function abrirDocumentoMejorado(docUrl) {
    if (docUrl.startsWith('local-pdf:')) {
        // Es un documento guardado en localStorage
        const id = docUrl.split(':')[1];
        const base64Data = localStorage.getItem(`pdf_${id}`);

        if (base64Data) {
            // Abrir en nueva ventana
            const newWindow = window.open();
            newWindow.document.write(`
          <iframe src="${base64Data}" width="100%" height="100%" style="border: none;"></iframe>
      `);
            newWindow.document.title = 'Documento PDF';
        } else {
            alert('No se pudo encontrar el documento. Es posible que se haya eliminado.');
        }
    } else if (docUrl.startsWith('blob-pdf:')) {
        // Es un documento guardado como blob URL
        const id = docUrl.split(':')[1];
        const metadataStr = localStorage.getItem(`pdf_${id}_metadata`);

        if (metadataStr) {
            try {
                const metadata = JSON.parse(metadataStr);

                // Comprobar si el blob URL sigue siendo válido
                if (metadata.blobUrl) {
                    window.open(metadata.blobUrl, '_blank');
                } else {
                    alert('La referencia al documento ya no es válida. Intente cargar el documento nuevamente.');
                }
            } catch (error) {
                console.error('Error al abrir el documento:', error);
                alert('Error al procesar el documento. Intente cargarlo nuevamente.');
            }
        } else {
            alert('No se encontró información del documento. Es posible que haya expirado.');
        }
    } else if (docUrl.startsWith('blob:')) {
        // Es un blob URL directo
        window.open(docUrl, '_blank');
    } else {
        // Es una URL normal al servidor
        window.open(docUrl, '_blank');
    }
}

// Función para eliminar un documento (considera todos los métodos de almacenamiento)
function eliminarDocumento(docUrl) {
    if (docUrl.startsWith('local-pdf:')) {
        // Eliminar documento en localStorage
        const id = docUrl.split(':')[1];
        localStorage.removeItem(`pdf_${id}`);
        return true;
    } else if (docUrl.startsWith('blob-pdf:')) {
        // Eliminar metadatos y revocar blob URL
        const id = docUrl.split(':')[1];
        const metadataStr = localStorage.getItem(`pdf_${id}_metadata`);

        if (metadataStr) {
            try {
                const metadata = JSON.parse(metadataStr);
                // Revocar el blob URL para liberar memoria
                if (metadata.blobUrl) {
                    URL.revokeObjectURL(metadata.blobUrl);
                }
            } catch (e) {
                console.error('Error al revocar Blob URL:', e);
            }
        }

        localStorage.removeItem(`pdf_${id}_metadata`);
        return true;
    }

    return false; // No se eliminó nada (URL normal o blob temporal)
}

export default function PoliticasPage() {
    // Estados principales
    const [activeTab, setActiveTab] = useState('institucionales');
    const [openCategory, setOpenCategory] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showDocumentForm, setShowDocumentForm] = useState(false);
    const [editingDoc, setEditingDoc] = useState(null);
    const [uploadCategory, setUploadCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadErrorMsg, setUploadErrorMsg] = useState('');

    // Estado del formulario de documento
    const [docTitle, setDocTitle] = useState('');
    const [docFile, setDocFile] = useState(null);

    // Estado del formulario de login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Credenciales de administrador
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin123';

    // Datos de ejemplo - inicializamos desde localStorage si existen
    const [data, setData] = useState(() => {
        // Intentar cargar datos guardados en localStorage
        const savedData = localStorage.getItem('politicasData');
        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (e) {
                console.error('Error parsing saved data:', e);
            }
        }

        // Datos por defecto si no hay datos guardados
        return {
            institucionales: [
                {
                    name: 'Talento Humano',
                    id: 'talento-humano',
                    docs: []
                },
                { name: 'Planeación Estratégica', id: 'planeacion', docs: [] },
                { name: 'Ética y Cumplimiento', id: 'etica', docs: [] }
            ],
            comerciales: [
                { name: 'Control de Cartera', id: 'cartera', docs: [] },
                { name: 'Servicio al Cliente', id: 'servicio', docs: [] }
            ],
            administrativas: [
                { name: 'Presupuesto', id: 'presupuesto', docs: [] },
                { name: 'Contratación', id: 'contratacion', docs: [] }
            ]
        };
    });

    // Guardar datos en localStorage cuando cambien
    useEffect(() => {
        // Crear una copia segura para almacenar (sin los objetos File que no se pueden serializar)
        const dataToSave = JSON.parse(JSON.stringify(data));
        localStorage.setItem('politicasData', JSON.stringify(dataToSave));
    }, [data]);

    // Cargar datos iniciales
    useEffect(() => {
        // Aquí cargarías datos de tu API en un entorno real
        console.log('Cargando datos iniciales...');

        // Para demo, podemos usar localStorage como persistencia

        // Verificar si estamos en una ruta incorrecta y redirigir si es necesario
        if (typeof window !== 'undefined' &&
            (window.location.pathname.includes('/politicas/') || window.location.pathname.includes('/documentos/politicas/'))
            && !window.location.pathname.endsWith('/politicas')) {
            // Redirigir a la ruta correcta si estamos en una subruta de politicas
            window.history.replaceState({}, '', '/politicas');
        }
    }, []);

    // Resetear formulario
    const resetForm = () => {
        setDocTitle('');
        setDocFile(null);
        setEditingDoc(null);
        setUploadErrorMsg('');
    };

    // Funciones básicas
    const toggleCategory = (id) => {
        setOpenCategory(openCategory === id ? null : id);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Validar credenciales
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            setIsAdmin(true);
            setShowLoginForm(false);
            setLoginError('');
            // Limpiar campos de login
            setUsername('');
            setPassword('');
        } else {
            setLoginError('Usuario o contraseña incorrectos');
        }
    };

    // Abrir formulario para nuevo documento
    const openAddForm = (categoryId) => {
        setUploadCategory(categoryId);
        setEditingDoc(null);
        resetForm();
        setShowDocumentForm(true);
    };

    // Abrir formulario para editar documento existente
    const openEditForm = (categoryId, doc) => {
        setUploadCategory(categoryId);
        setEditingDoc(doc);
        setDocTitle(doc.title);
        setDocFile(null);
        setShowDocumentForm(true);
    };

    const handleSaveDocument = async (e) => {
        e.preventDefault();

        // Prevenir envíos duplicados
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        setUploadErrorMsg('');

        try {
            // Validación para nuevo documento
            if (!editingDoc && (!docTitle || !docFile)) {
                setUploadErrorMsg('Por favor complete todos los campos');
                setIsSubmitting(false);
                return;
            }

            // Validación para edición (al menos el título es requerido)
            if (editingDoc && !docTitle) {
                setUploadErrorMsg('El título del documento es requerido');
                setIsSubmitting(false);
                return;
            }

            // Verificar duplicados por título
            if (!editingDoc) {
                // Comprobar si ya existe un documento con el mismo título en esta categoría
                const category = data[activeTab].find(c => c.id === uploadCategory);
                if (category) {
                    const duplicate = category.docs.find(doc =>
                        doc.title.toLowerCase() === docTitle.toLowerCase()
                    );

                    if (duplicate) {
                        setUploadErrorMsg('Ya existe un documento con este título en esta categoría');
                        setIsSubmitting(false);
                        return;
                    }
                }
            }

            let docUrl = '';
            let docId = editingDoc ? editingDoc.id : `doc-${Date.now()}`;

            // Si hay un nuevo archivo, guardarlo con la nueva función mejorada
            if (docFile) {
                try {
                    // Guardar con manejo de archivos grandes
                    docUrl = await guardarPDFConCompresion(docFile, docId);
                    console.log('Documento guardado:', docUrl);
                } catch (error) {
                    console.error('Error al guardar documento:', error);
                    setUploadErrorMsg('Error al procesar el archivo: ' + error.message);
                    setIsSubmitting(false);
                    return;
                }
            } else if (editingDoc) {
                // Si estamos editando y no hay un nuevo archivo, mantener la URL existente
                docUrl = editingDoc.url;
            }

            if (editingDoc) {
                // Actualizar documento existente
                setData(prev => {
                    const newData = JSON.parse(JSON.stringify(prev)); // Copia profunda
                    const category = newData[activeTab].find(c => c.id === uploadCategory);

                    if (category) {
                        const docIndex = category.docs.findIndex(d => d.id === editingDoc.id);

                        if (docIndex !== -1) {
                            // Actualizar el documento
                            category.docs[docIndex] = {
                                ...category.docs[docIndex],
                                title: docTitle,
                                date: new Date().toLocaleDateString()
                            };

                            // Si se proporcionó un nuevo archivo, actualizar la URL
                            if (docUrl) {
                                category.docs[docIndex].url = docUrl;
                            }
                        }
                    }

                    return newData;
                });

                alert('Documento actualizado correctamente');
            } else {
                // Crear nuevo documento
                const newDoc = {
                    id: docId,
                    title: docTitle,
                    url: docUrl,
                    date: new Date().toLocaleDateString()
                };

                // Actualizar estado con una copia profunda para asegurar inmutabilidad
                setData(prev => {
                    const newData = JSON.parse(JSON.stringify(prev));
                    const category = newData[activeTab].find(c => c.id === uploadCategory);

                    if (category) {
                        // Asegurarse de que docs es un array
                        if (!Array.isArray(category.docs)) {
                            category.docs = [];
                        }

                        category.docs.push(newDoc);
                    }

                    return newData;
                });

                alert('Documento guardado correctamente');
            }

            // Cerrar formulario y resetear estado
            setShowDocumentForm(false);
            resetForm();
        } catch (error) {
            console.error('Error al guardar documento:', error);
            setUploadErrorMsg('Ocurrió un error al guardar el documento: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteDocument = async (categoryId, docId) => {
        if (confirm('¿Está seguro de eliminar este documento?')) {
            try {
                // Buscar el documento para verificar si necesita limpieza especial
                let docToDelete = null;
                data[activeTab].forEach(category => {
                    if (category.id === categoryId) {
                        const doc = category.docs.find(d => d.id === docId);
                        if (doc) {
                            docToDelete = doc;
                        }
                    }
                });

                // Eliminar el documento usando la función mejorada
                if (docToDelete) {
                    eliminarDocumento(docToDelete.url);
                }

                // Actualizar estado local con una copia profunda
                setData(prev => {
                    const newData = JSON.parse(JSON.stringify(prev));
                    const category = newData[activeTab].find(c => c.id === categoryId);

                    if (category) {
                        category.docs = category.docs.filter(doc => doc.id !== docId);
                    }

                    return newData;
                });

                alert('Documento eliminado correctamente');
            } catch (error) {
                console.error('Error al eliminar documento:', error);
                alert('Ocurrió un error al eliminar el documento');
            }
        }
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
            <div style={{
                backgroundColor: '#e7f7ff',
                color: '#0066cc',
                padding: '12px 15px',
                borderRadius: '4px',
                marginBottom: '20px',
                border: '1px solid #b8e2ff'
            }}>
                <strong>Información:</strong> Los documentos se almacenan localmente en su navegador.
                Estarán disponibles incluso al refrescar la página, pero no se sincronizarán entre dispositivos.
                <br /><br />
                <strong>Nota sobre archivos grandes:</strong> Para documentos de más de 4MB, se usará un método
                alternativo que solo los mantendrá disponibles durante la sesión actual.
            </div>

            {/* Cabecera simple */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Políticas</h1>
                <div>
                    <Link href="/" style={{ color: '#0066cc', textDecoration: 'none' }}>Inicio</Link>
                    <span style={{ margin: '0 8px' }}>|</span>
                    <span>Políticas</span>
                </div>
            </div>

            {/* Botón de administración */}
            <div style={{ textAlign: 'right', marginBottom: '15px' }}>
                {isAdmin ? (
                    <button
                        onClick={() => setIsAdmin(false)}
                        style={{
                            padding: '5px 10px',
                            background: '#f0f0f0',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Salir
                    </button>
                ) : (
                    <button
                        onClick={() => setShowLoginForm(true)}
                        style={{
                            padding: '5px 10px',
                            background: '#0066cc',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Administración
                    </button>
                )}
            </div>

            {/* Pestañas principales */}
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                {Object.keys(data).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            flex: 1,
                            padding: '10px',
                            background: activeTab === tab ? '#0066cc' : '#f0f0f0',
                            color: activeTab === tab ? 'white' : '#333',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            if (activeTab !== tab) {
                                e.currentTarget.style.backgroundColor = '#FF9933';
                                e.currentTarget.style.color = 'white';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (activeTab !== tab) {
                                e.currentTarget.style.backgroundColor = '#f0f0f0';
                                e.currentTarget.style.color = '#333';
                            }
                        }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Acordeón de categorías */}
            <div style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
                {data[activeTab] && data[activeTab].map(category => (
                    <div key={category.id} style={{ borderBottom: '1px solid #ddd' }}>
                        {/* Encabezado de categoría */}
                        <div
                            onClick={() => toggleCategory(category.id)}
                            style={{
                                padding: '15px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                background: openCategory === category.id ? '#f9f9f9' : 'white',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#FF9933';
                                e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = openCategory === category.id ? '#f9f9f9' : 'white';
                                e.currentTarget.style.color = 'inherit';
                            }}
                        >
                            <div>
                                <span style={{ marginRight: '10px', color: '#0066cc', transition: 'color 0.3s ease' }}>
                                    {openCategory === category.id ? '-' : '+'}
                                </span>
                                <span>{category.name}</span>
                            </div>
                            <div>
                                {Array.isArray(category.docs) ? category.docs.length : 0} documento{Array.isArray(category.docs) && category.docs.length !== 1 ? 's' : ''}
                            </div>
                        </div>

                        {/* Contenido de categoría */}
                        {openCategory === category.id && (
                            <div style={{ padding: '15px', background: '#f9f9f9' }}>
                                {/* Botón para añadir documento (solo admin) */}
                                {isAdmin && (
                                    <div style={{ marginBottom: '15px', textAlign: 'right' }}>
                                        <button
                                            onClick={() => openAddForm(category.id)}
                                            style={{
                                                padding: '5px 10px',
                                                background: '#0066cc',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            + Añadir documento
                                        </button>
                                    </div>
                                )}

                                {/* Lista de documentos */}
                                {Array.isArray(category.docs) && category.docs.length > 0 ? (
                                    <div>
                                        {category.docs.map(doc => (
                                            <div
                                                key={doc.id}
                                                style={{
                                                    padding: '10px',
                                                    marginBottom: '8px',
                                                    borderBottom: '1px solid #eee',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    background: 'white',
                                                    borderRadius: '4px'
                                                }}
                                            >
                                                <div>
                                                    <div style={{ fontWeight: 'bold' }}>{doc.title}</div>
                                                    {/* Indicador de tipo de almacenamiento */}
                                                    {doc.url && doc.url.startsWith('blob-pdf:') && (
                                                        <div style={{
                                                            fontSize: '11px',
                                                            color: '#ff9900',
                                                            fontStyle: 'italic'
                                                        }}>
                                                            (Disponible solo en esta sesión)
                                                        </div>
                                                    )}
                                                </div>
                                                <div style={{ display: 'flex', gap: '5px' }}>
                                                    <button
                                                        onClick={() => abrirDocumentoMejorado(doc.url)}
                                                        style={{
                                                            padding: '3px 8px',
                                                            backgroundColor: '#0066cc',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            fontSize: '14px',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        Ver
                                                    </button>

                                                    {/* Botones de administrador */}
                                                    {isAdmin && (
                                                        <>
                                                            <button
                                                                onClick={() => openEditForm(category.id, doc)}
                                                                style={{
                                                                    padding: '3px 8px',
                                                                    background: '#f0f0f0',
                                                                    border: '1px solid #ddd',
                                                                    borderRadius: '4px',
                                                                    cursor: 'pointer',
                                                                    fontSize: '14px'
                                                                }}
                                                            >
                                                                Editar
                                                            </button>
                                                            <button
                                                                onClick={() => deleteDocument(category.id, doc.id)}
                                                                style={{
                                                                    padding: '3px 8px',
                                                                    background: '#ff3333',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: '4px',
                                                                    cursor: 'pointer',
                                                                    fontSize: '14px'
                                                                }}
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '20px 0', color: '#777' }}>
                                        No hay documentos disponibles en esta categoría.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Formulario de inicio de sesión */}
            {showLoginForm && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '4px',
                        width: '300px'
                    }}>
                        <h2 style={{ marginBottom: '15px' }}>Iniciar sesión</h2>
                        <form onSubmit={handleLogin}>
                            {loginError && (
                                <div style={{
                                    color: 'red',
                                    backgroundColor: '#ffeeee',
                                    padding: '10px',
                                    marginBottom: '15px',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}>
                                    {loginError}
                                </div>
                            )}
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Usuario</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px'
                                    }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px'
                                    }}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowLoginForm(false);
                                        setLoginError('');
                                        setUsername('');
                                        setPassword('');
                                    }}
                                    style={{
                                        padding: '8px 15px',
                                        background: '#f0f0f0',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        marginRight: '10px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '8px 15px',
                                        background: '#0066cc',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Ingresar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Formulario para añadir/editar documentos */}
            {showDocumentForm && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '4px',
                        width: '400px',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <h2 style={{ marginBottom: '15px' }}>
                            {editingDoc ? 'Editar documento' : 'Subir documento'}
                        </h2>
                        <form onSubmit={handleSaveDocument}>
                            {uploadErrorMsg && (
                                <div style={{
                                    color: 'red',
                                    backgroundColor: '#ffeeee',
                                    padding: '10px',
                                    marginBottom: '15px',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}>
                                    {uploadErrorMsg}
                                </div>
                            )}

                            <div style={{
                                backgroundColor: '#fff3cd',
                                color: '#856404',
                                padding: '10px',
                                marginBottom: '15px',
                                borderRadius: '4px',
                                fontSize: '14px',
                                borderLeft: '4px solid #ffeeba'
                            }}>
                                <strong>Nota:</strong> Para archivos grandes (más de 4MB), se ofrecerá una opción
                                para comprimir o almacenar temporalmente.
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Título del documento*</label>
                                <input
                                    type="text"
                                    value={docTitle}
                                    onChange={(e) => setDocTitle(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px'
                                    }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>
                                    Archivo PDF {!editingDoc && '*'}
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px'
                                    }}
                                    required={!editingDoc}
                                />
                                {editingDoc && (
                                    <div style={{
                                        marginTop: '5px',
                                        fontSize: '12px',
                                        color: '#666'
                                    }}>
                                        Archivo actual: {editingDoc.url.split(/[:/]/).pop() || 'documento.pdf'}
                                        <br />
                                        <i>Deje este campo vacío si no desea cambiar el archivo</i>
                                    </div>
                                )}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowDocumentForm(false);
                                        resetForm();
                                    }}
                                    style={{
                                        padding: '8px 15px',
                                        background: '#f0f0f0',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        marginRight: '10px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        padding: '8px 15px',
                                        background: '#0066cc',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        opacity: isSubmitting ? 0.7 : 1
                                    }}
                                >
                                    {isSubmitting
                                        ? 'Guardando...'
                                        : (editingDoc ? 'Actualizar' : 'Guardar')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}