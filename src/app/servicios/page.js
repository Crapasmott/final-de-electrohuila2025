'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Componente de página de Servicios
export default function Page() {
    // Estado para navegación
    const [activeCategory, setActiveCategory] = useState('');

    // Lista de servicios
    const servicios = [
        {
            id: 1,
            title: "Paga tu Factura",
            description: "Realiza el pago de tu factura de energía de forma rápida y segura mediante nuestros canales digitales.",
            icon: "💳",
            link: "https://pagos.electrohuila.com.co/",
            category: "pagos"
        },
        {
            id: 2,
            title: "Descarga de Factura",
            description: "Descarga tu factura de energía en formato PDF ingresando tu número de cuenta o NIC.",
            icon: "📄",
            link: "https://enlinea.electrohuila.com.co/generate-invoice/",
            category: "pagos"
        },
        {
            id: 3,
            title: "Conoce tu Factura",
            description: "Descubre cada detalle de tu factura y aprende a gestionarla de manera sencilla y eficiente.",
            icon: "📄",
            link: "/conoce-tu-factura",
            category: "pagos"
        },
        {
            id: 4,
            title: "Puntos de Pago",
            description: "Encuentra todos los puntos físicos donde puedes realizar el pago de tu factura de energía.",
            icon: "📍",
            link: "/puntos-de-pago",
            category: "pagos"
        },
        {
            id: 5,
            title: "Puntos de Atención",
            description: "Conoce nuestras oficinas y centros de atención al cliente en todo el departamento del Huila.",
            icon: "👥",
            link: "/puntos-de-atencion",
            category: "atencion"
        },
        {
            id: 6,
            title: "Tarifas",
            description: "Consulta las tarifas vigentes para el servicio de energía eléctrica según tu tipo de usuario.",
            icon: "💲",
            link: "/tarifas",
            category: "pagos"
        },
        {
            id: 7,
            title: "Suspensiones Programadas",
            description: "Infórmate sobre los mantenimientos y suspensiones programadas del servicio en tu zona.",
            icon: "📅",
            link: "/suspensiones-programadas",
            category: "mantenimiento"
        },
        {
            id: 8,
            title: "Contrato de Condiciones Uniformes",
            description: "Consulta el contrato que regula la prestación del servicio público domiciliario de energía eléctrica.",
            icon: "📄",
            link: "/documentos/servicios/Contrato-Condiciones-Uniformes.pdf",
            category: "documentos"
        },
        {
            id: 9,
            title: "Uso Confiable de Energía Eléctrica",
            description: "Conoce las prácticas recomendadas para el uso eficiente y confiable de la energía eléctrica.",
            icon: "⚡",
            link: "/documentos/manuales de usuario/CARTILLA USO CONFIABLE Y SEGURO DE LA ENERGIA ELECTRICA.pdf",
            category: "educacion"
        },
        {
            id: 10,
            title: "Uso Seguro de Energía Eléctrica",
            description: "Aprende sobre medidas de seguridad para prevenir accidentes relacionados con la energía eléctrica.",
            icon: "🛡️",
            link: "/documentos/manuales de usuario/CARTILLA SEGURIDAD.pdf",
            category: "educacion"
        },
        {
            id: 11,
            title: "Usuarios Contribución por Solidaridad",
            description: "Información sobre el programa de contribución solidaria y cómo beneficia a usuarios de menores recursos.",
            icon: "❤️",
            link: "/documentos/manuales de usuario/USUARIOS-CONTRIBUCION-POR-SOLIDARIDAD-v2.pdf",
            category: "ayudas"
        },
        {
            id: 11,
            title: "Campaña Riesgo Eléctrico",
            description: "Información sobre la campaña de riesgo eléctrico y cómo prevenir accidentes en hogares con instalaciones vulnerables.",
            icon: "⚡",
            link: "/documentos/manuales de usuario/RIESGO-ELECTRICO-1.png",
            category: "ayudas"
        }
    ];

    // Categorías para filtros rápidos (servicios)
    const categoriesServicios = [
        { name: "Todos", value: "" },
        { name: "Pagos", value: "pagos" },
        { name: "Atención", value: "atencion" },
        { name: "Documentos", value: "documentos" },
        { name: "Educación", value: "educacion" }
    ];

    // Filtrar por categoría
    const serviciosFiltrados = activeCategory
        ? servicios.filter(item => item.category === activeCategory)
        : servicios;

    return (
        <div>
            {/* Hero Section con banner personalizado */}
            <div className="hero" style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/reparaciones.jpg') no-repeat center center",
                backgroundSize: "cover"
            }}>
                <div className="container">
                    <h1>Nuestros Servicios</h1>
                    <p>Encuentra toda la información sobre nuestros servicios de manera rápida y sencilla.</p>
                </div>
            </div>

            {/* Breadcrumb exactamente igual a la imagen */}
            <div style={{ background: "#f8f9fa", padding: "10px 0" }}>
                <div className="container">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Link href="/" style={{ color: "#FF5A1F", textDecoration: "none", fontWeight: 500 }}>
                            Inicio
                        </Link>
                        <span style={{ margin: "0 8px", color: "#6c757d" }}>/</span>
                        <span style={{ color: "#333", fontWeight: 400 }}>
                            Servicios
                        </span>
                    </div>
                </div>
            </div>

            {/* Espacio adicional antes de las tarjetas */}
            <div style={{ height: "30px" }}></div>

            {/* Quick Access Section */}
            <div className="container quick-access">
                <div className="quick-access-cards">
                    <div className="quick-card">
                        <i className="fas fa-file-invoice-dollar">{servicios[0].icon}</i>
                        <h3>Pagar Factura</h3>
                        <p>Paga tu factura en línea de manera rápida y segura.</p>
                        <a href="https://pagos.electrohuila.com.co/" className="btn btn-primary">Pagar ahora</a>
                    </div>

                    <div className="quick-card">
                        <i className="fas fa-bolt">{servicios[1].icon}</i>
                        <h3>ElectroHuila en Línea</h3>
                        <p>Accede a tu cuenta para gestionar tus servicios.</p>
                        <a href="https://enlinea.electrohuila.com.co/home/" className="btn btn-secondary">Acceder</a>
                    </div>

                    <div className="quick-card">
                        <i className="fas fa-exclamation-triangle">🔌</i>
                        <h3>Trámites de Usuario</h3>
                        <p>Accede a todos los trámites disponibles para nuestros usuarios.</p>
                        <a href="/institucional/tramites-usuarios" className="btn btn-warning">
                            Ver trámites
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="container">
                    <div className="section-title">
                        <h2>Nuestros Servicios</h2>
                        <p>Encuentra todos los servicios que ElectroHuila tiene disponibles para ti.</p>
                    </div>

                    {/* Filtros por categoría */}
                    <div style={{ marginBottom: "30px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                            {categoriesServicios.map((category) => (
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

                    {/* Services Grid */}
                    <div className="services">
                        {serviciosFiltrados.map((item) => (
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
                    <h2>¿Necesitas ayuda con algún servicio?</h2>
                    <p>Nuestro equipo de atención al cliente está disponible para asistirte con cualquier consulta o solicitud que tengas.</p>
                    <a href="/contacto" className="btn btn-secondary">Contáctanos</a>
                </div>
            </div>


        </div>

    );
}