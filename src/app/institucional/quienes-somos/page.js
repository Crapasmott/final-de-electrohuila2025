'use client';

import { useState } from 'react';
import './quienes-somos.css';
import { TimelineAnimado } from './TimelineAnimado'; // Asegúrate de crear este archivo

export default function QuienesSomos() {
    // Objetivos institucionales
    const objetivosInstitucionales = [
        {
            id: 1,
            title: 'Generación Sostenible',
            icon: '/images/iconos/ambiente.png'
        },
        {
            id: 2,
            title: 'Expansión de infraestructura y mejoramiento de la calidad del servicio',
            icon: '/images/iconos/ciudad.png'
        },
        {
            id: 3,
            title: 'Mejoramiento de la gestión comercial',
            icon: '/images/iconos/roles.png'
        },
        {
            id: 4,
            title: 'Atención integral al cliente',
            icon: '/images/iconos/servicio-al-cliente.png'
        },
        {
            id: 5,
            title: 'Gestión eficiente de los servicios',
            icon: '/images/iconos/relaciones-publicas.png'
        },
        {
            id: 6,
            title: 'Tecnología de la información y las telecomunicaciones',
            icon: '/images/iconos/examen-de-la-unidad.png'
        },
        {
            id: 7,
            title: 'Crecimiento organizacional',
            icon: '/images/iconos/metas-organizacionales.png'
        },
        {
            id: 8,
            title: 'Calidad y eficiencia empresarial',
            icon: '/images/iconos/alta-calidad.png'
        },
        {
            id: 9,
            title: 'Relacionamiento con los grupos de interés',
            icon: '/images/iconos/public-service.png'
        },
        {
            id: 9,
            title: 'Innovación en energías renovables',
            icon: '/images/iconos/solar.png'
        },
        {
            id: 9,
            title: 'Sostenibilidad y responsabilidad social',
            icon: '/images/iconos/sostenibilidad.png'
        },
        {
            id: 9,
            title: 'Optimización de la eficiencia energética',
            icon: '/images/iconos/fuentes-de-energia.png'
        }
    ];

    return (
        <>
            {/* Banner principal */}
            <section className="hero-about">
                <div className="container">
                    <h1>Quiénes Somos</h1>
                    <p>Conoce más sobre la Electrificadora del Huila</p>
                </div>
            </section>

            {/* Sección de historia y misión */}
            <section className="about-us">
                <div className="container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2>Objeto Social</h2>
                            <p>
                                La empresa tiene como propósito principal la prestación del servicio público domiciliario de energía eléctrica, abarcando todas sus actividades complementarias: generación, transmisión, distribución y comercialización. Asimismo, podrá ofrecer servicios conexos y relacionados con el sector de servicios públicos, en estricto cumplimiento del marco legal y regulatorio vigente. sometida al régimen general de los servicios públicos domiciliarios.
                            </p>
                            <p>
                                Para alcanzar sus objetivos y asegurar su adecuada operación, la sociedad está facultada para celebrar y ejecutar todo tipo de actos y contratos, incluyendo —entre otros—: servicios de asesoría, consultoría, interventoría e intermediación; importación, exportación, comercialización y venta de bienes o servicios; gestión de recaudo, facturación, toma de lecturas y distribución de facturas; construcción de infraestructura; así como la prestación de servicios técnicos, administrativos, operativos y de mantenimiento. También podrá participar en contratos de leasing, acuerdos financieros, contratos de riesgo compartido y cualquier otra figura contractual que resulte necesaria o conveniente para el desarrollo de su objeto social, en conformidad con la normativa vigente.
                            </p>
                        </div>
                        <div className="about-image">
                            <img src="/images/quienes-somos-768x512.jpg.webp" alt="Historia de Electrohuila" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Misión y Visión */}
            <section className="mission-vision">
                <div className="container">
                    <div className="mission-vision-cards">
                        <div className="mv-card">
                            <h3>Misión</h3>
                            <p>Transmitimos buena energía, generamos confianza y distribuimos bienestar.
                                Trabajamos cada día para llevar energía a los hogares, empresas e instituciones con responsabilidad y compromiso, convencidos de que un servicio de calidad es clave para el bienestar de las comunidades y el progreso de nuestra región.</p>
                        </div>
                        <div className="mv-card">
                            <h3>Visión</h3>
                            <p>En 2034, ELECTRIFICADORA DEL HUILA S.A. E.S.P. será referente regional en innovación energética, promoviendo una generación limpia, una distribución inteligente y una comercialización digital de energía. A través de soluciones de valor agregado, acelerará la electrificación de sectores clave, contribuyendo al crecimiento sostenible y al bienestar colectivo.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* NUEVA SECCIÓN: Objetivos Institucionales */}
            <section className="objetivos-institucionales" style={{
                padding: '60px 0',
                marginBottom: '40px'
            }}>
                <div className="container">
                    <div className="section-title-animated">
                        <h2>Objetivos Institucionales</h2>
                    </div>
                    <div className="objetivos-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px',
                        background: 'linear-gradient(rgba(0, 20, 40, 0.9), rgba(0, 20, 40, 0.9)), url("/images/torres-electricas.jpg")',
                        backgroundSize: 'cover',
                        padding: '30px',
                        borderRadius: '8px',
                        color: 'white',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.25)'
                    }}>
                        {objetivosInstitucionales.map((objetivo) => (
                            <div key={objetivo.id} style={{
                                textAlign: 'center',
                                padding: '20px',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                borderRadius: '8px',
                                cursor: 'default',
                                ':hover': {
                                    transform: 'translateY(-10px)',
                                    boxShadow: '0 10px 15px rgba(0,0,0,0.2)'
                                }
                            }}
                                className="objetivo-card"
                            >
                                <img
                                    src={objetivo.icon}
                                    alt={objetivo.title}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        marginBottom: '15px',
                                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                                    }}
                                    className="objetivo-icon"
                                />
                                <p style={{
                                    fontSize: '16px',
                                    lineHeight: '1.5',
                                    fontWeight: '500'
                                }}>
                                    {objetivo.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NUEVA SECCIÓN: Reseña Histórica - Animada */}
            <section className="resena-historica">
                <div className="container">
                    <div className="section-title-animated">
                        <h2>Nuestra Historia</h2>
                    </div>

                    <p className="intro-text" style={{
                        textAlign: 'center',
                        maxWidth: '800px',
                        margin: '0 auto 40px',
                        fontSize: '18px',
                        lineHeight: '1.6',
                        color: '#555'
                    }}>
                        Descubre el fascinante recorrido histórico de ElectroHuila a través de los momentos más importantes de nuestra evolución, desde nuestra fundación en 1947 hasta el presente.
                    </p>

                    {/* Componente de línea de tiempo animada */}
                    <TimelineAnimado />
                </div>
            </section>

            {/* Valores Corporativos */}
            <section className="values">
                <div className="container">
                    <div className="section-title-animated">
                        <h2>Valores Corporativos</h2>
                        <p>Estos son los principios que guían nuestra gestión diaria</p>
                    </div>
                    <div className="values-grid">
                        <div className="value-card">
                            <i className="fas fa-handshake"></i>
                            <h3>Integridad</h3>
                            <p>Actuamos con ética, honestidad y transparencia en todas nuestras operaciones.</p>
                        </div>
                        <div className="value-card">
                            <i className="fas fa-users"></i>
                            <h3>Compromiso Social</h3>
                            <p>Trabajamos por el bienestar de nuestras comunidades y el desarrollo regional.</p>
                        </div>
                        <div className="value-card">
                            <i className="fas fa-leaf"></i>
                            <h3>Responsabilidad Ambiental</h3>
                            <p>Implementamos prácticas sostenibles que minimicen nuestro impacto en el medio ambiente.</p>
                        </div>
                        <div className="value-card">
                            <i className="fas fa-lightbulb"></i>
                            <h3>Innovación</h3>
                            <p>Buscamos constantemente soluciones creativas y tecnológicas para mejorar nuestros servicios.</p>
                        </div>
                        <div className="value-card">
                            <i className="fas fa-chart-line"></i>
                            <h3>Eficiencia</h3>
                            <p>Optimizamos nuestros recursos para garantizar la sostenibilidad empresarial.</p>
                        </div>
                        <div className="value-card">
                            <i className="fas fa-user-tie"></i>
                            <h3>Servicio</h3>
                            <p>Nos enfocamos en brindar experiencias positivas y soluciones efectivas a nuestros usuarios.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de certificaciones */}
            <section className="certifications">
                <div className="container">
                    <div className="section-title-animated">
                        <h2>Certificaciones y Reconocimientos</h2>
                    </div>
                    <div className="certification-logos">
                        <img src="/images/logo_Icontec-ISO-9001.png" alt="ISO 9001" />
                        <img src="/images/icontec-iso-45001.png" alt="ISO 14001" />
                        <img src="/images/ISO-14001.png" alt="ISO 45001" />
                        <img src="/images/IQNET.png" alt="Premio a la Calidad" />
                    </div>
                    <p className="certification-text">
                        Nuestro compromiso con la excelencia nos ha permitido obtener importantes certificaciones que respaldan la calidad de nuestros procesos y servicios, garantizando los más altos estándares operativos, ambientales y de seguridad.
                    </p>
                </div>
            </section>
        </>
    );
}