'use client';

import React, { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';

// Componente de página de Servicios
export default function Page() {
    // Estado para navegación
    const [activeCategory, setActiveCategory] = useState('');
    const [activeTab, setActiveTab] = useState('servicios'); // 'servicios' o 'tramites'
    
    // Define las rutas para la miga de pan
    const breadcrumbItems = [
        { label: 'Trámites y Servicios', url: '/servicios' }
    ];

    // Lista de servicios
    const servicios = [
        {
            id: 1,
            title: "Paga tu Factura",
            description: "Realiza el pago de tu factura de energía de forma rápida y segura mediante nuestros canales digitales.",
            icon: "💳",
            link: "/servicios/pagar-factura",
            category: "pagos"
        },
        {
            id: 2,
            title: "ElectroHuila en Línea",
            description: "Gestiona tus servicios, consulta facturas y realiza solicitudes desde nuestra plataforma digital.",
            icon: "⚡",
            link: "/servicios/electrohuila-en-linea",
            category: "gestion"
        },
        {
            id: 3,
            title: "Contrato de Condiciones Uniformes",
            description: "Consulta el contrato que regula la prestación del servicio público domiciliario de energía eléctrica.",
            icon: "📄",
            link: "/servicios/contrato-condiciones",
            category: "documentos"
        },
        {
            id: 4,
            title: "Puntos de Pago",
            description: "Encuentra todos los puntos físicos donde puedes realizar el pago de tu factura de energía.",
            icon: "📍",
            link: "/servicios/puntos-pago",
            category: "pagos"
        },
        {
            id: 5,
            title: "Puntos de Atención",
            description: "Conoce nuestras oficinas y centros de atención al cliente en todo el departamento del Huila.",
            icon: "👥",
            link: "/servicios/puntos-atencion",
            category: "atencion"
        },
        {
            id: 6,
            title: "Tarifas",
            description: "Consulta las tarifas vigentes para el servicio de energía eléctrica según tu tipo de usuario.",
            icon: "💲",
            link: "/servicios/tarifas",
            category: "pagos"
        },
        {
            id: 7,
            title: "Suspensiones Programadas",
            description: "Infórmate sobre los mantenimientos y suspensiones programadas del servicio en tu zona.",
            icon: "📅",
            link: "/servicios/suspensiones",
            category: "mantenimiento"
        },
        {
            id: 8,
            title: "Uso Confiable de Energía Eléctrica",
            description: "Conoce las prácticas recomendadas para el uso eficiente y confiable de la energía eléctrica.",
            icon: "⚡",
            link: "/servicios/uso-confiable",
            category: "educacion"
        },
        {
            id: 9,
            title: "Uso Seguro de Energía Eléctrica",
            description: "Aprende sobre medidas de seguridad para prevenir accidentes relacionados con la energía eléctrica.",
            icon: "🛡️",
            link: "/servicios/uso-seguro",
            category: "educacion"
        },
        {
            id: 10,
            title: "Usuarios Contribución por Solidaridad",
            description: "Información sobre el programa de contribución solidaria y cómo beneficia a usuarios de menores recursos.",
            icon: "❤️",
            link: "/servicios/contribucion-solidaridad",
            category: "ayudas"
        }
    ];

    // Lista de trámites
    const tramites = [
        {
            id: 1,
            title: "Solicitud de Conexión Nueva",
            description: "Solicita una nueva conexión al servicio de energía eléctrica para tu vivienda o negocio.",
            icon: "🔌",
            link: "/tramites/nueva-conexion",
            category: "instalacion"
        },
        {
            id: 2,
            title: "Reclamos por Facturación",
            description: "Presenta un reclamo relacionado con la facturación de tu servicio.",
            icon: "📝",
            link: "/tramites/reclamos-facturacion",
            category: "facturacion"
        },
        {
            id: 3,
            title: "Cambio de Titular",
            description: "Solicita el cambio de titular del servicio de energía eléctrica.",
            icon: "👤",
            link: "/tramites/cambio-titular",
            category: "usuarios"
        },
        {
            id: 4,
            title: "Reporte de Daños",
            description: "Reporta daños en el servicio o infraestructura de energía eléctrica.",
            icon: "🔧",
            link: "/tramites/reporte-danos",
            category: "mantenimiento"
        },
        {
            id: 5,
            title: "Solicitud de Reconexión",
            description: "Solicita la reconexión del servicio después de una suspensión.",
            icon: "🔄",
            link: "/tramites/reconexion",
            category: "instalacion"
        },
        {
            id: 6,
            title: "Acuerdos de Pago",
            description: "Solicita facilidades de pago para tu deuda con ElectroHuila.",
            icon: "📊",
            link: "/tramites/acuerdo-pago",
            category: "facturacion"
        },
        {
            id: 7,
            title: "Actualización de Datos",
            description: "Actualiza tus datos personales y de contacto en nuestro sistema.",
            icon: "📋",
            link: "/tramites/actualizacion-datos",
            category: "usuarios"
        },
        {
            id: 8,
            title: "Solicitud de Independización",
            description: "Solicita la independización de tu servicio de energía.",
            icon: "🏠",
            link: "/tramites/independizacion",
            category: "instalacion"
        }
    ];

    // Seleccionar lista activa según la pestaña
    const listaActiva = activeTab === 'servicios' ? servicios : tramites;

    // Categorías para filtros rápidos (servicios)
    const categoriesServicios = [
        { name: "Todos", value: "" },
        { name: "Pagos", value: "pagos" },
        { name: "Atención", value: "atencion" },
        { name: "Documentos", value: "documentos" },
        { name: "Educación", value: "educacion" }
    ];

    // Categorías para filtros rápidos (trámites)
    const categoriesTramites = [
        { name: "Todos", value: "" },
        { name: "Facturación", value: "facturacion" },
        { name: "Instalación", value: "instalacion" },
        { name: "Usuarios", value: "usuarios" },
        { name: "Mantenimiento", value: "mantenimiento" }
    ];

    // Seleccionar categorías según la pestaña activa
    const categoriesActivas = activeTab === 'servicios' ? categoriesServicios : categoriesTramites;

    // Filtrar por categoría
    const itemsFiltrados = activeCategory
        ? listaActiva.filter(item => item.category === activeCategory)
        : listaActiva;

    return (
        <div>
            {/* Hero Section con banner personalizado */}
            <div className="hero" style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/servicios.jpg') no-repeat center center",
                backgroundSize: "cover"
            }}>
                <div className="container">
                    <h1>Trámites y Servicios</h1>
                    <p>Encuentra toda la información sobre nuestros servicios y realiza tus trámites de manera rápida y sencilla.</p>
                </div>
            </div>

            {/* Breadcrumb - Colocado DESPUÉS del hero */}
            <Breadcrumb items={breadcrumbItems} />

            {/* Quick Access Section */}
            <div className="container quick-access">
                <div className="quick-access-cards">
                    <div className="quick-card">
                        <i className="fas fa-file-invoice-dollar">{servicios[0].icon}</i>
                        <h3>Pagar Factura</h3>
                        <p>Paga tu factura en línea de manera rápida y segura.</p>
                        <a href="/servicios/pagar-factura" className="btn btn-primary">Pagar ahora</a>
                    </div>

                    <div className="quick-card">
                        <i className="fas fa-bolt">{servicios[1].icon}</i>
                        <h3>ElectroHuila en Línea</h3>
                        <p>Accede a tu cuenta para gestionar tus servicios.</p>
                        <a href="/servicios/electrohuila-en-linea" className="btn btn-secondary">Acceder</a>
                    </div>

                    <div className="quick-card">
                        <i className="fas fa-exclamation-triangle">{tramites[0].icon}</i>
                        <h3>Trámites de Usuario</h3>
                        <p>Accede a todos los trámites disponibles para nuestros usuarios.</p>
                        <button
                            className="btn btn-warning"
                            onClick={() => {
                                setActiveTab('tramites');
                                setActiveCategory('');
                                window.scrollTo({
                                    top: document.querySelector('.main-content').offsetTop - 50,
                                    behavior: 'smooth'
                                });
                            }}
                        >
                            Ver trámites
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="container">
                    <div className="section-title">
                        <h2>Nuestros {activeTab === 'servicios' ? 'Servicios' : 'Trámites'}</h2>
                        <p>
                            {activeTab === 'servicios'
                                ? 'Encuentra todos los servicios que ElectroHuila tiene disponibles para ti.'
                                : 'Realiza todos tus trámites con ElectroHuila de manera rápida y sencilla.'}
                        </p>
                    </div>

                    {/* Tabs de navegación */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '30px',
                        borderBottom: '1px solid #ddd'
                    }}>
                        <button
                            style={{
                                padding: '10px 20px',
                                margin: '0 10px',
                                background: 'transparent',
                                border: 'none',
                                borderBottom: activeTab === 'servicios' ? '3px solid var(--primary)' : '3px solid transparent',
                                color: activeTab === 'servicios' ? 'var(--primary)' : '#666',
                                fontWeight: activeTab === 'servicios' ? 'bold' : 'normal',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                            onClick={() => {
                                setActiveTab('servicios');
                                setActiveCategory('');
                            }}
                        >
                            Servicios
                        </button>
                        <button
                            style={{
                                padding: '10px 20px',
                                margin: '0 10px',
                                background: 'transparent',
                                border: 'none',
                                borderBottom: activeTab === 'tramites' ? '3px solid var(--primary)' : '3px solid transparent',
                                color: activeTab === 'tramites' ? 'var(--primary)' : '#666',
                                fontWeight: activeTab === 'tramites' ? 'bold' : 'normal',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                            onClick={() => {
                                setActiveTab('tramites');
                                setActiveCategory('');
                            }}
                        >
                            Trámites de Usuario
                        </button>
                    </div>

                    {/* Filtros por categoría */}
                    <div style={{ marginBottom: "30px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                            {categoriesActivas.map((category) => (
                                <button
                                    key={category.value}
                                    style={{
                                        padding: "8px 15px",
                                        borderRadius: "20px",
                                        border: "none",
                                        backgroundColor: activeCategory === category.value ? "var(--primary)" : "#f0f0f0",
                                        color: activeCategory === category.value ? "white" : "#333",
                                        cursor: "pointer",
                                        fontWeight: "500",
                                        transition: "all 0.3s"
                                    }}
                                    onClick={() => setActiveCategory(category.value)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Services/Trámites Grid */}
                    <div className="services">
                        {itemsFiltrados.map((item) => (
                            <div key={item.id} className="service-card">
                                <div className="service-content">
                                    <div style={{ fontSize: "30px", marginBottom: "15px" }}>{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <a href={item.link} className="btn btn-primary">Acceder</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="cta">
                <div className="container">
                    <h2>¿Necesitas ayuda con algún trámite?</h2>
                    <p>Nuestro equipo de atención al cliente está disponible para asistirte con cualquier consulta o solicitud que tengas.</p>
                    <a href="/contacto" className="btn btn-secondary">Contáctanos</a>
                </div>
            </div>

            {/* Fixed Payment Button */}
            <a href="/servicios/pagar-factura" className="fixed-pay-btn">
                <i className="fas fa-credit-card">💳</i> Pagar Factura
            </a>
        </div>
    );
}