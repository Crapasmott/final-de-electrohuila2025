// Datos para la página de Proveedores y Contratistas
// Incluir este archivo como un archivo separado o dentro del componente principal

// Datos de los procesos de contratación en curso
export const procesosContratacion = [
    {
        id: 'PC-2025-001',
        title: 'Suministro de material eléctrico para redes de distribución',
        fecha_publicacion: '05/04/2025',
        fecha_cierre: '25/04/2025',
        estado: 'Abierto',
        modalidad: 'Licitación pública',
        url: '/contratos/PC-2025-001'
    },
    {
        id: 'PC-2025-002',
        title: 'Servicios de mantenimiento de instalaciones',
        fecha_publicacion: '08/04/2025',
        fecha_cierre: '20/04/2025',
        estado: 'Abierto',
        modalidad: 'Invitación directa',
        url: '/contratos/PC-2025-002'
    },
    {
        id: 'PC-2025-003',
        title: 'Desarrollo e implementación de software de gestión',
        fecha_publicacion: '01/04/2025',
        fecha_cierre: '18/04/2025',
        estado: 'Abierto',
        modalidad: 'Concurso de méritos',
        url: '/contratos/PC-2025-003'
    },
    {
        id: 'PC-2025-004',
        title: 'Servicio de transporte para personal técnico',
        fecha_publicacion: '22/03/2025',
        fecha_cierre: '15/04/2025',
        estado: 'Evaluación',
        modalidad: 'Solicitud de ofertas',
        url: '/contratos/PC-2025-004'
    }
];

// Datos de los documentos de contratación
export const documentosContratacion = [
    {
        id: 'doc-1',
        title: 'Manual de Contratación',
        description: 'Documento que establece las directrices y procedimientos para la contratación de bienes y servicios.',
        url: '/documentos/contratacion/manual-contratacion.pdf',
        icon: 'FileText'
    },
    {
        id: 'doc-2',
        title: 'Términos y Condiciones Generales',
        description: 'Condiciones generales aplicables a todos los contratos con proveedores.',
        url: '/documentos/contratacion/terminos-condiciones.pdf',
        icon: 'FileText'
    },
    {
        id: 'doc-3',
        title: 'Formulario de Registro de Proveedores',
        description: 'Formato para el registro e inscripción de nuevos proveedores.',
        url: '/documentos/contratacion/formulario-registro.docx',
        icon: 'FileText'
    },
    {
        id: 'doc-4',
        title: 'Código de Ética para Proveedores',
        description: 'Lineamientos éticos que deben cumplir los proveedores y contratistas.',
        url: '/documentos/contratacion/codigo-etica-proveedores.pdf',
        icon: 'FileText'
    },
    {
        id: 'doc-5',
        title: 'Plan Anual de Adquisiciones 2025',
        description: 'Proyección de las necesidades de contratación para el año en curso.',
        url: '/documentos/contratacion/plan-adquisiciones-2025.pdf',
        icon: 'Calendar'
    }
];

// Preguntas frecuentes sobre contratación
export const preguntasFrecuentes = [
    {
        id: 'faq-1',
        pregunta: '¿Cómo puedo registrarme como proveedor?',
        respuesta: 'Para registrarse como proveedor, debe descargar y diligenciar el Formulario de Registro de Proveedores disponible en la sección de documentos. Una vez completado, debe enviarlo al correo proveedores@electrohuila.com.co junto con los documentos requeridos indicados en el formulario.'
    },
    {
        id: 'faq-2',
        pregunta: '¿Cuál es el proceso para participar en una licitación?',
        respuesta: 'Para participar en una licitación, debe estar registrado como proveedor, consultar regularmente la sección de procesos de contratación, descargar los pliegos de condiciones del proceso que le interese y presentar su oferta siguiendo las instrucciones específicas de cada proceso antes de la fecha de cierre.'
    },
    {
        id: 'faq-3',
        pregunta: '¿Cómo puedo conocer el estado de un proceso de contratación?',
        respuesta: 'El estado de los procesos de contratación se publica y actualiza regularmente en nuestra página web en la sección de Procesos de Contratación. También puede consultar directamente enviando un correo a contratacion@electrohuila.com.co indicando el número del proceso.'
    },
    {
        id: 'faq-4',
        pregunta: '¿Qué documentos debo presentar para participar en un proceso?',
        respuesta: 'Los documentos requeridos varían según el tipo de proceso. Generalmente se solicita: certificado de existencia y representación legal, RUT, certificaciones de experiencia, estados financieros y documentos específicos indicados en los pliegos de condiciones de cada proceso.'
    }
];

// Guía de trámites para proveedores
export const guiaTramites = [
    {
        id: 'tramite-1',
        title: 'Registro de Proveedores',
        pasos: [
            'Descargar el formulario de registro de proveedores.',
            'Diligenciar completamente el formulario y reunir la documentación requerida.',
            'Enviar el formulario y documentos al correo proveedores@electrohuila.com.co.',
            'Esperar la confirmación de recepción y validación (2-3 días hábiles).',
            'Una vez aprobado, recibirá un código de proveedor que deberá utilizar en futuras interacciones.'
        ],
        documentos: [
            'Certificado de existencia y representación legal (no mayor a 30 días)',
            'RUT actualizado',
            'Estados financieros del último año',
            'Certificaciones de experiencia',
            'Certificaciones de calidad (si aplica)'
        ],
        tiempo: '5 días hábiles',
        costo: 'Gratuito'
    },
    {
        id: 'tramite-2',
        title: 'Actualización de Información',
        pasos: [
            'Descargar el formulario de actualización de información.',
            'Diligenciar los campos que requieren actualización.',
            'Adjuntar documentos de soporte de la nueva información.',
            'Enviar al correo actualizacion.proveedores@electrohuila.com.co.',
            'Esperar confirmación de la actualización (1-2 días hábiles).'
        ],
        documentos: [
            'Formulario de actualización',
            'Documentos soporte de la información a actualizar'
        ],
        tiempo: '3 días hábiles',
        costo: 'Gratuito'
    },
    {
        id: 'tramite-3',
        title: 'Facturación Electrónica',
        pasos: [
            'Enviar factura electrónica al correo facturacion@electrohuila.com.co.',
            'En el asunto indicar: Número de contrato o orden + Nombre del proveedor.',
            'Adjuntar documentos de soporte según el tipo de contrato.',
            'Verificar recepción mediante el acuse de recibo automático.',
            'Consultar el estado de pago en el portal de proveedores.'
        ],
        documentos: [
            'Factura electrónica que cumpla requisitos DIAN',
            'Certificación de cumplimiento firmada por el supervisor',
            'Informe de actividades (para contratos de servicios)',
            'Planillas de seguridad social (cuando aplique)'
        ],
        tiempo: 'Pago a 30 días después de radicada correctamente',
        costo: 'No aplica'
    }
];