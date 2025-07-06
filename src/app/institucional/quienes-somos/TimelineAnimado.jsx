'use client';

import { useState, useEffect } from 'react';

// Componente de línea de tiempo animada y de alto impacto visual
export function TimelineAnimado() {
    const [currentPage, setCurrentPage] = useState(0);
    const [currentTimelineIndex, setCurrentTimelineIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState('');

    // Todas las épocas históricas de la empresa
    const timelineEpocas = [
        { id: 0, nombre: "Fundación y primeros años", periodo: "1947-1960", color: "#2389da" },
        { id: 1, nombre: "Expansión inicial", periodo: "1962-1971", color: "#1abc9c" },
        { id: 2, nombre: "Consolidación regional", periodo: "1972-1984", color: "#e67e22" },
        { id: 3, nombre: "Modernización y tecnología", periodo: "1985-1998", color: "#9b59b6" },
        { id: 4, nombre: "Era digital", periodo: "2001-2020", color: "#e74c3c" }
    ];
    // Todos los eventos históricos de la empresa, organizados por páginas
    const timelinePages = [
        // Página 1: 1947-1960
        [
            {
                year: '1947',
                title: 'Creación de Centrales Eléctricas del Huila',
                description: '05/Jun/1946 se firma contrato de creación de Centrales Eléctricas del Huila S.A. firmado entre: Gobernación del Huila, Empresa Figueroa Saravia, Municipios de Neiva, Garzón, Baraya, Rivera, Tello, Ministerios de Hacienda y Obras Públicas.',
                additionalInfo: [
                    'El 19 de abril de 1947, según escritura pública No. 487 se constituyó la Sociedad Comercial Anónima "Centrales Eléctricas del Huila S.A."',
                    'Se crea el Instituto de Aprovechamiento de Aguas y Fomento Eléctrico ELECTRAGUAS (Ley 80 del 26 dic 1946). Inicia operación en 1947'
                ],
                icon: '⚡',
                imageUrl: '/images/historia/firma.jpg'
            },
            {
                year: '1951',
                title: 'Entra en operación La Plata - Iquira 1',
                description: 'Centrales Eléctricas del Huila S.A. Gerencia Miguel M. Rivera Dussán.',
                additionalInfo: [
                    'En 1950 se adquieren pequeñas plantas hidroeléctricas y la Vicosa (Paicol)',
                    'En 1951 entra en operación la Plata Iquira 1 (Capacidad 3.900 Kw)'
                ],
                icon: '🏗️',
                imageUrl: '/images/historia/miguel-.jpg'
            },
            {
                year: '1955',
                title: 'Se adquiere Planta La Pita se interconecta Garzón - Neiva y se da servicio al municipio Hobo',
                description: 'Gerencia Miguel M. Rivera Dussán.',
                additionalInfo: [
                    'En 1955 se Adquiere Planta La Pita (Garzón)',
                    'Se interconecta Garzón - Neiva y se da servicio al municipio de Hobo en el año 1955',
                    'Sale de operación Planta Palermo (Fuerte creciente quebrada la Guagua en el año 1953)'
                ],
                icon: '🔌',
                imageUrl: '/images/historia/la-pita.jpg'
            },
            {
                year: '1958',
                title: 'Inicia la generación térmica para reforzar planta diesel',
                description: 'En 1958 entra en funcionamiento para reforzar planta Diesel Neiva tres nuevos motores MAN para reforzar Planta Diesel Barrio Calixto Leyva (Operaron hasta 1972)',
                icon: '🔋',
                imageUrl: '/images/historia/1958.jpg'
            },
            {
                year: '1959',
                title: 'Primera convención colectiva',
                description: 'Centrales Eléctricas del Huila S.A. Gerencia Miguel M. Rivera Dussán.',
                additionalInfo: [
                    '10 de mayo de 1961 se firma primera convención colectiva de trabajo - CCT19'
                ],
                icon: '📝',
                imageUrl: '/images/historia/miguel-.jpg'
            }
        ],
        // Página 2: 1962-1971
        [
            {
                year: '1962-1964',
                title: 'Cambio de gerencia',
                description: 'Centrales Eléctricas del Huila S.A. Gerencia Idelfonso Polania Pérez.',
                additionalInfo: [
                    'En octubre de 1963, es nombrado como Gerente General el Ing. Civil Idelfonso Polania Pérez'
                ],
                icon: '👨‍💼',
                imageUrl: '/images/historia/idenlfonso.jpg'
            },
            {
                year: '1965',
                title: 'Se inaugura Plata - Iquira II se reconstruye línea Garzón - La Pita se da servicio a línea Yaguara - Altamira',
                description: 'Centrales Eléctricas del Huila S.A. Gerencia Idelfonso Polania Pérez.',
                additionalInfo: [
                    '28 febrero se inaugura Plata Iquira II',
                    'Se instalan motores S.I.L-ZEH en Planta Diesel-Neiva (Unidades 1 y 2)',
                    'Se reconstruye línea de transmisión Garzón - La Pita',
                    'En mayo se da servicio a línea Yaguara-Altamira (33.000 voltios) y se construye subestación (1000 Kva)',
                    'A finales de mayo se hace la interconexión del Sistema de Generación, que une zona norte con las del centro y sur',
                    'Se programa e inicia labores para contrato, diseño y financiación de interconexión Girardot-Prado-Neiva (115.000 voltios) a cargo de la multinacional SAP, electrificadora de Río Prado y ELECTRAGUAS',
                    'Se suspende operación de planta térmica en Palermo por emergencias'
                ],
                icon: '🔌',
                imageUrl: '/images/historia/la-pita.jpg'
            },
            {
                year: '1966',
                title: 'Expansión de servicios rurales',
                description: 'Se contrata con el Ing. Javier González Franco el trazado y diseño de las líneas de subtransmisión y distribución rural del sistema "Río Prado" en las zonas norte y centro del departamento.',
                additionalInfo: [
                    'En junio entra nuevamente en operación Plata Fortalecillas, mejorando oficialmente el 8 de diciembre',
                    'Entran en servicio nuevas líneas de transmisión La Pita-Garzón y Altamira-Pitalito',
                    '8 diciembre entra en operación Plata La Pita (Segundo Grupo)',
                    '14 diciembre queda por fuera de servicio la Iquira II por deslizamiento que destruyó obras hidráulicas de la entrada del túnel a presión'
                ],
                icon: '🚜',
                imageUrl: '/images/historia/javier.png'
            },
            {
                year: '1968',
                title: 'Gerencia Alvaro Ramírez Sierra',
                description: 'Centrales Eléctricas del Huila S.A. Gerencia Alvaro Ramírez Sierra.',
                additionalInfo: [
                    'Es nombrado como Gerente General el Ing. Electricista Alvaro Ramírez Sierra'
                ],
                icon: '👨‍💼',
                imageUrl: '/images/historia/Alvaro.jpg'
            },
            {
                year: '1969',
                title: 'Expansión de infraestructura',
                description: 'Se construye S/E Campoalegre de 1500 KVA-23.',
                additionalInfo: [
                    'Entra en operación definitivamente Plata La Vicosa (Guadalupe)'
                ],
                icon: '🏗️',
                imageUrl: '/images/historia/constru.png'
            },
            {
                year: '1971',
                title: 'Cambio razón social a Electrificadora del Huila S.A.',
                description: 'Electrificadora del Huila S.A. Gerencia David Rojas Castro.',
                additionalInfo: [
                    'En febrero con escritura Pública 98 con capital $170.000.000.oo y con ello cambio de razón social a "Electrificadora del Huila S.A."',
                    'Es nombrado como Gerente General el Ing. Industrial David Rojas Castro',
                    'Se crea el CLUB ELECTROHUILA con ánimo de fomentar el deporte en todas sus ramas',
                    '17 diciembre entra en construcción de la S/E Betania',
                    'Se terminó construcción de línea de transmisión Neiva-Prado-Neiva',
                    'En mayo del 58 se pone en marcha el Plan de Subtransmisión y Distribución para aumentar la potencia en el departamento',
                    'Se da inicio al Plan de Electrificación Rural, financiado por Caja de Crédito Agrario, Fondo de Inversiones del INAGRARIO, Fondo Nacional de Electrificación Rural, Electrificadora del Huila y programa ICEL-BIDSOA'
                ],
                icon: '📇',
                imageUrl: '/images/historia/placeholder.jpg'
            }
        ],
        // Más épocas aquí...
        // El resto de épocas se pueden añadir después (1972-1984, 1985-1998, 2001-2020)
    ];

    // Obtener los eventos actuales según la página seleccionada
    const currentEvents = timelinePages[currentPage] || timelinePages[0];
    const currentEpoca = timelineEpocas[currentPage];

    // Evento actual que se muestra
    const currentEvent = currentEvents[currentTimelineIndex];

    // Efecto para manejar la animación
    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 500); // Duración de la animación
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    // Función para navegar entre eventos con animación
    const navigateTimelineWithAnimation = (dir) => {
        setIsAnimating(true);
        setDirection(dir);

        setTimeout(() => {
            if (dir === 'next' && currentTimelineIndex < currentEvents.length - 1) {
                setCurrentTimelineIndex(currentTimelineIndex + 1);
            } else if (dir === 'prev' && currentTimelineIndex > 0) {
                setCurrentTimelineIndex(currentTimelineIndex - 1);
            }
        }, 250); // Tiempo a mitad de la animación para cambiar el evento
    };

    // Función para cambiar de época con animación
    const changePageWithAnimation = (dir) => {
        setIsAnimating(true);
        setDirection(dir);

        setTimeout(() => {
            if (dir === 'next' && currentPage < timelineEpocas.length - 1) {
                setCurrentPage(currentPage + 1);
                setCurrentTimelineIndex(0);
            } else if (dir === 'prev' && currentPage > 0) {
                setCurrentPage(currentPage - 1);
                setCurrentTimelineIndex(0);
            }
        }, 250);
    };

    // Función para seleccionar directamente una época
    const selectEpoca = (epochIndex) => {
        if (epochIndex !== currentPage) {
            setIsAnimating(true);
            setDirection(epochIndex > currentPage ? 'next' : 'prev');

            setTimeout(() => {
                setCurrentPage(epochIndex);
                setCurrentTimelineIndex(0);
            }, 250);
        }
    };

    // Clases para animaciones
    const getEventCardClass = () => {
        let baseClass = "event-card";
        if (isAnimating) {
            baseClass += ` slide-${direction}`;
        }
        return baseClass;
    };
    return (
        <div className="timeline-animated-container">
            {/* Selector de épocas */}
            <div className="epoca-selector" style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '0 auto 30px',
                maxWidth: '90%',
                overflowX: 'auto',
                padding: '10px 0',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    height: '3px',
                    backgroundColor: '#e0e0e0',
                    zIndex: 1
                }}></div>

                {timelineEpocas.map((epoca, index) => (
                    <div
                        key={epoca.id}
                        onClick={() => selectEpoca(index)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: '0 20px',
                            position: 'relative',
                            zIndex: 2,
                            transition: 'transform 0.3s ease'
                        }}
                    >
                        <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: index === currentPage ? epoca.color : '#bbb',
                            marginBottom: '10px',
                            transition: 'all 0.3s ease',
                            boxShadow: index === currentPage ? `0 0 0 5px ${epoca.color}30` : 'none'
                        }}></div>
                        <span style={{
                            fontWeight: index === currentPage ? 'bold' : 'normal',
                            fontSize: '14px',
                            color: index === currentPage ? epoca.color : '#666',
                            transition: 'all 0.3s ease'
                        }}>
                            {epoca.periodo}
                        </span>
                        <span style={{
                            fontSize: '12px',
                            color: '#777',
                            textAlign: 'center',
                            maxWidth: '120px',
                            opacity: index === currentPage ? 1 : 0.7,
                            transition: 'all 0.3s ease'
                        }}>
                            {epoca.nombre}
                        </span>
                    </div>
                ))}
            </div>
            {/* Contenedor de eventos */}
            <div className="event-container" style={{
                position: 'relative',
                minHeight: '500px',
                overflow: 'hidden',
                marginBottom: '30px'
            }}>
                {/* Tarjeta de evento actual */}
                <div
                    className={getEventCardClass()}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '0',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                        overflow: 'hidden',
                        maxWidth: '900px',
                        margin: '0 auto',
                        transition: 'transform 0.5s ease, opacity 0.5s ease',
                        borderTop: `5px solid ${currentEpoca.color}`,
                    }}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>
                        {/* Imagen del evento - lado izquierdo en escritorio, arriba en móvil */}
                        <div style={{
                            flex: '1 1 300px',
                            minHeight: '300px',
                            backgroundColor: '#f0f0f0',
                            backgroundImage: `url(${currentEvent.imageUrl || '/images/historia/placeholder.jpg'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'relative'
                        }}>
                            {/* Año destacado sobre la imagen */}
                            <div style={{
                                position: 'absolute',
                                top: '20px',
                                left: '20px',
                                backgroundColor: currentEpoca.color,
                                color: 'white',
                                padding: '12px 25px',
                                borderRadius: '30px',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                            }}>
                                {currentEvent.year}
                            </div>

                            {/* Ícono representativo del evento */}
                            {currentEvent.icon && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '20px',
                                    right: '20px',
                                    backgroundColor: 'rgba(255,255,255,0.9)',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '30px',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                                }}>
                                    {currentEvent.icon}
                                </div>
                            )}
                        </div>
                        {/* Contenido del evento - lado derecho en escritorio, abajo en móvil */}
                        <div style={{
                            flex: '1 1 400px',
                            padding: '30px',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <h3 style={{
                                fontSize: '24px',
                                marginBottom: '20px',
                                color: '#333',
                                borderBottom: `2px solid ${currentEpoca.color}30`,
                                paddingBottom: '10px'
                            }}>
                                {currentEvent.title}
                            </h3>

                            <p style={{
                                fontSize: '16px',
                                lineHeight: '1.6',
                                color: '#444',
                                marginBottom: '20px'
                            }}>
                                {currentEvent.description}
                            </p>

                            {currentEvent.additionalInfo && currentEvent.additionalInfo.length > 0 && (
                                <div style={{
                                    backgroundColor: '#f9f9f9',
                                    padding: '15px',
                                    borderRadius: '8px',
                                    marginTop: 'auto'
                                }}>
                                    <h4 style={{
                                        fontSize: '16px',
                                        marginBottom: '10px',
                                        color: '#555'
                                    }}>
                                        Datos destacados:
                                    </h4>
                                    <ul style={{
                                        margin: '0',
                                        paddingLeft: '20px'
                                    }}>
                                        {currentEvent.additionalInfo.map((info, index) => (
                                            <li key={index} style={{
                                                fontSize: '14px',
                                                marginBottom: '8px',
                                                color: '#666'
                                            }}>
                                                {info}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Navegación de eventos */}
            <div className="event-navigation" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '50px'
            }}>
                {/* Botón época anterior */}
                <button
                    onClick={() => changePageWithAnimation('prev')}
                    disabled={currentPage === 0}
                    className="nav-button"
                    style={{
                        backgroundColor: currentPage === 0 ? '#ddd' : '#0098d9',
                        color: 'white',
                        border: 'none',
                        borderRadius: '30px',
                        padding: '12px 25px',
                        fontWeight: 'bold',
                        cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                        boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                >
                    <span style={{ fontSize: '18px' }}>←</span>
                    <span>Época anterior</span>
                </button>

                {/* Navegación entre eventos de la época actual */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <button
                        onClick={() => navigateTimelineWithAnimation('prev')}
                        disabled={currentTimelineIndex === 0}
                        style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '50%',
                            backgroundColor: currentTimelineIndex === 0 ? '#eee' : currentEpoca.color,
                            color: 'white',
                            border: 'none',
                            cursor: currentTimelineIndex === 0 ? 'not-allowed' : 'pointer',
                            boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        ←
                    </button>

                    <div style={{
                        display: 'flex',
                        gap: '8px'
                    }}>
                        {currentEvents.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => setCurrentTimelineIndex(index)}
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    backgroundColor: index === currentTimelineIndex ? currentEpoca.color : '#ddd',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    transform: index === currentTimelineIndex ? 'scale(1.2)' : 'scale(1)'
                                }}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => navigateTimelineWithAnimation('next')}
                        disabled={currentTimelineIndex === currentEvents.length - 1}
                        style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '50%',
                            backgroundColor: currentTimelineIndex === currentEvents.length - 1 ? '#eee' : currentEpoca.color,
                            color: 'white',
                            border: 'none',
                            cursor: currentTimelineIndex === currentEvents.length - 1 ? 'not-allowed' : 'pointer',
                            boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        →
                    </button>
                </div>

                {/* Botón época siguiente */}
                <button
                    onClick={() => changePageWithAnimation('next')}
                    disabled={currentPage === timelineEpocas.length - 1}
                    className="nav-button"
                    style={{
                        backgroundColor: currentPage === timelineEpocas.length - 1 ? '#ddd' : '#0098d9',
                        color: 'white',
                        border: 'none',
                        borderRadius: '30px',
                        padding: '12px 25px',
                        fontWeight: 'bold',
                        cursor: currentPage === timelineEpocas.length - 1 ? 'not-allowed' : 'pointer',
                        boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                >
                    <span>Época siguiente</span>
                    <span style={{ fontSize: '18px' }}>→</span>
                </button>
            </div>
        </div>
    );
}