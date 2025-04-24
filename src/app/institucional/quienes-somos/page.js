// app/quienes-somos/page.js
import './quienes-somos.css';

export const metadata = {
    title: 'Quiénes Somos | Electrificadora del Huila',
    description: 'Conoce la historia, misión, visión y valores de la Electrificadora del Huila',
};

export default function QuienesSomos() {
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
                            <h2>Nuestra Historia</h2>
                            <p>
                                La Electrificadora del Huila S.A. E.S.P. es una empresa de servicios públicos mixta, constituida como sociedad por acciones, del tipo de las anónimas, sometida al régimen general de los servicios públicos domiciliarios.
                            </p>
                            <p>
                                Desde 1947, hemos evolucionado junto con las necesidades energéticas de nuestra región, transformándonos de una pequeña empresa local a una compañía de servicios públicos integral que hoy atiende a más de 400.000 usuarios en todo el departamento del Huila.
                            </p>
                        </div>
                        <div className="about-image">
                            <img src="/images/historia.jpg" alt="Historia de Electrohuila" />
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
                            <p>Contribuir al desarrollo socioeconómico de nuestra región, prestando servicios de energía eléctrica con calidad, continuidad y cobertura; generando valor para todos nuestros grupos de interés con responsabilidad social y ambiental.</p>
                        </div>
                        <div className="mv-card">
                            <h3>Visión</h3>
                            <p>En 2026 seremos una empresa con crecimiento sostenible, reconocida a nivel nacional por su excelencia operacional, innovación y responsabilidad social empresarial, diversificando nuestro portafolio de servicios e incursionando en energías renovables.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Valores Corporativos */}
            <section className="values">
                <div className="container">
                    <div className="section-title">
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

            {/* Equipo Directivo */}
            <section className="team">
                <div className="container">
                    <div className="section-title">
                        <h2>Nuestro Equipo Directivo</h2>
                        <p>Profesionales comprometidos con el desarrollo energético del Huila</p>
                    </div>
                    <div className="team-grid">
                        <div className="team-card">
                            <img src="/images/gerente.jpg" alt="Gerente General" />
                            <div className="team-info">
                                <h3>Nombre del Gerente</h3>
                                <p className="position">Gerente General</p>
                                <p className="bio">Profesional con amplia experiencia en el sector energético y gestión empresarial.</p>
                            </div>
                        </div>
                        <div className="team-card">
                            <img src="/images/directivo1.jpg" alt="Directivo" />
                            <div className="team-info">
                                <h3>Nombre del Directivo</h3>
                                <p className="position">Director Técnico</p>
                                <p className="bio">Especialista en infraestructura eléctrica y proyectos de expansión.</p>
                            </div>
                        </div>
                        <div className="team-card">
                            <img src="/images/directivo2.jpg" alt="Directivo" />
                            <div className="team-info">
                                <h3>Nombre del Directivo</h3>
                                <p className="position">Director Administrativo</p>
                                <p className="bio">Experto en gestión financiera y desarrollo organizacional.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de certificaciones */}
            <section className="certifications">
                <div className="container">
                    <div className="section-title">
                        <h2>Certificaciones y Reconocimientos</h2>
                    </div>
                    <div className="certification-logos">
                        <img src="/images/iso9001.png" alt="ISO 9001" />
                        <img src="/images/iso14001.png" alt="ISO 14001" />
                        <img src="/images/iso45001.png" alt="ISO 45001" />
                        <img src="/images/premio-calidad.png" alt="Premio a la Calidad" />
                    </div>
                    <p className="certification-text">
                        Nuestro compromiso con la excelencia nos ha permitido obtener importantes certificaciones que respaldan la calidad de nuestros procesos y servicios, garantizando los más altos estándares operativos, ambientales y de seguridad.
                    </p>
                </div>
            </section>
        </>
    );
}