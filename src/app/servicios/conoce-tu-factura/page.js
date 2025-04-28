'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ConoceTuFactura() {
    const [activeTooltip, setActiveTooltip] = useState(null);

    // Información de los tooltips
    const tooltips = {
        facturaVenta: {
            title: 'Factura de venta',
            description: 'Es el consecutivo de la factura'
        },
        fechaEmision: {
            title: 'Fecha de Emisión',
            description: 'Fecha en la que fue generada tu factura'
        },
        cuentaNic: {
            title: 'Número de Cuenta NIC',
            description: 'Número de identificación de tu cuenta con Electrohuila'
        },
        cufe: {
            title: 'Código Único de Factura Electrónica - CUFE',
            description: 'Identificador único de tu factura electrónica'
        },
        fechaVencimiento: {
            title: 'Fecha de Vencimiento',
            description: 'Último día para realizar el pago de tu factura'
        },
        totalPagar: {
            title: 'Total a Pagar',
            description: 'Valor total a pagar en esta factura'
        },
        financiacion: {
            title: 'Financiación Electrohuila',
            description: 'Aquí se detallan los valores que tienes financiados, como el número y valor de las cuotas y el saldo que falta por pagar'
        },
        credivalores: {
            title: 'Credivalores',
            description: 'Información sobre créditos con Credivalores'
        },
        electrodomesticos: {
            title: 'Electrodomésticos',
            description: 'Detalle de electrodomésticos financiados'
        },
        otrosCobros: {
            title: 'Otros Cobros',
            description: 'Otros servicios incluidos en tu factura'
        },
        factAseo: {
            title: 'Facturación Conjunta del Servicio Público de Aseo',
            description: 'Detalles del servicio de aseo incluido en tu factura'
        },
        periodoFacturado: {
            title: 'Periodo Facturado',
            description: 'Periodo de tiempo que cubre esta factura'
        },
        datosPersonales: {
            title: 'Datos Personales',
            description: 'Tus datos registrados en Electrohuila'
        },
        calculoConsumo: {
            title: 'Cálculo del Consumo',
            description: 'Detalle de cómo se calcula tu consumo de energía'
        },
        liquidacionConsumo: {
            title: 'Liquidación del Consumo',
            description: 'Detalle de la liquidación de tu consumo'
        },
        ultimosConsumos: {
            title: 'Últimos Consumos',
            description: 'Histórico de tus consumos recientes'
        },
        costoUnitario: {
            title: 'Costo Unitario de Prestación del Servicio',
            description: 'Detalles del costo por unidad de energía consumida'
        },
        conceptosElectrohuila: {
            title: 'Conceptos Electrohuila',
            description: 'Desglose de los conceptos facturados por Electrohuila'
        },
        resumenCuenta: {
            title: 'Resumen Cuenta',
            description: 'Resumen de tu cuenta y valores a pagar'
        },
        indicadoresCalidad: {
            title: 'Indicadores de Calidad Individual',
            description: 'Métricas de calidad del servicio prestado'
        },
        foes: {
            title: 'FOES',
            description: 'Fondo de Energía Social'
        },
        ultimoPago: {
            title: 'Último Pago',
            description: 'Información sobre tu último pago realizado'
        }
    };

    const handleClickPoint = (key) => {
        setActiveTooltip(activeTooltip === key ? null : key);
    };

    return (
        <div className="conoce-factura-container">
            <div className="factura-header">
                <h1>Conoce tu <span>Factura</span></h1>
                <div className="breadcrumb">
                    <Link href="/">Inicio</Link> | Conoce tu factura
                </div>
            </div>

            <div className="factura-instrucciones">
                <p>Haz click sobre los puntos verdes para conocer todos los detalles de tu factura</p>
            </div>

            <div className="factura-interactive">
                {/* Sección 1: Encabezado de la factura */}
                <div className="factura-section section-header">
                    <div className="factura-item">
                        <div className="factura-label">FACTURA DE VENTA No.</div>
                        <div className="clickable-point" onClick={() => handleClickPoint('facturaVenta')}>
                            <div className="green-point"></div>
                        </div>
                        {activeTooltip === 'facturaVenta' && (
                            <div className="tooltip-box">
                                <h3>{tooltips.facturaVenta.title}</h3>
                                <p>{tooltips.facturaVenta.description}</p>
                            </div>
                        )}
                    </div>

                    <div className="factura-item">
                        <div className="factura-label">FECHA DE EMISIÓN</div>
                        <div className="clickable-point" onClick={() => handleClickPoint('fechaEmision')}>
                            <div className="green-point"></div>
                        </div>
                        {activeTooltip === 'fechaEmision' && (
                            <div className="tooltip-box">
                                <h3>{tooltips.fechaEmision.title}</h3>
                                <p>{tooltips.fechaEmision.description}</p>
                            </div>
                        )}
                    </div>

                    <div className="factura-item">
                        <div className="factura-label">No. DE CUENTA NIC</div>
                        <div className="clickable-point" onClick={() => handleClickPoint('cuentaNic')}>
                            <div className="green-point"></div>
                        </div>
                        {activeTooltip === 'cuentaNic' && (
                            <div className="tooltip-box">
                                <h3>{tooltips.cuentaNic.title}</h3>
                                <p>{tooltips.cuentaNic.description}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sección 2: CUFE */}
                <div className="factura-section section-cufe">
                    <div className="factura-item">
                        <div className="factura-label">Código Único de Factura Electrónica - CUFE</div>
                        <div className="clickable-point" onClick={() => handleClickPoint('cufe')}>
                            <div className="green-point"></div>
                        </div>
                        {activeTooltip === 'cufe' && (
                            <div className="tooltip-box">
                                <h3>{tooltips.cufe.title}</h3>
                                <p>{tooltips.cufe.description}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sección 3: Fechas y Valores */}
                <div className="factura-section section-payment">
                    <div className="payment-header">
                        <div className="payment-label">Fecha de Vencimiento</div>
                        <div className="payment-label">Total a Pagar</div>
                    </div>
                    <div className="payment-content">
                        <div className="clickable-point" onClick={() => handleClickPoint('fechaVencimiento')}>
                            <div className="green-point"></div>
                        </div>
                        <div className="clickable-point" onClick={() => handleClickPoint('totalPagar')}>
                            <div className="green-point"></div>
                        </div>
                    </div>
                    {activeTooltip === 'fechaVencimiento' && (
                        <div className="tooltip-box">
                            <h3>{tooltips.fechaVencimiento.title}</h3>
                            <p>{tooltips.fechaVencimiento.description}</p>
                        </div>
                    )}
                    {activeTooltip === 'totalPagar' && (
                        <div className="tooltip-box">
                            <h3>{tooltips.totalPagar.title}</h3>
                            <p>{tooltips.totalPagar.description}</p>
                        </div>
                    )}
                </div>

                {/* Sección 4: Financiación */}
                <div className="factura-section section-financing">
                    <div className="financing-header">
                        <div className="financing-label">Financiación ElectroHuila</div>
                    </div>
                    <div className="financing-content">
                        <div className="clickable-point" onClick={() => handleClickPoint('financiacion')}>
                            <div className="green-point"></div>
                        </div>
                        {activeTooltip === 'financiacion' && (
                            <div className="tooltip-box">
                                <h3>{tooltips.financiacion.title}</h3>
                                <p>{tooltips.financiacion.description}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sección 5: Credivalores y Electrodomésticos */}
                <div className="factura-section section-creditos">
                    <div className="creditos-item">
                        <div className="creditos-label">Credivalores</div>
                        <div className="clickable-point" onClick={() => handleClickPoint('credivalores')}>
                            <div className="green-point"></div>
                        </div>
                        {activeTooltip === 'credivalores' && (
                            <div className="tooltip-box">
                                <h3>{tooltips.credivalores.title}</h3>
                                <p>{tooltips.credivalores.description}</p>
                            </div>
                        )}
                    </div>
                    <div className="creditos-item">
                        <div className="creditos-label">Electrodomésticos</div>
                        <div className="clickable-point" onClick={() => handleClickPoint('electrodomesticos')}>
                            <div className="green-point"></div>
                        </div>
                        {activeTooltip === 'electrodomesticos' && (
                            <div className="tooltip-box">
                                <h3>{tooltips.electrodomesticos.title}</h3>
                                <p>{tooltips.electrodomesticos.description}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sección 6: Otros Cobros */}
                <div className="factura-section section-otroscobros">
                    <div className="otroscobros-header">
                        <div className="otroscobros-label">Otros Cobros</div>
                    </div>
                    <div className="otroscobros-content">
                        <div className="clickable-point" onClick={() => handleClickPoint('otrosCobros')}>
                            <div className="green-point"></div>
                        </div>
                        {activeTooltip === 'otrosCobros' && (
                            <div className="tooltip-box">
                                <h3>{tooltips.otrosCobros.title}</h3>
                                <p>{tooltips.otrosCobros.description}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sección 7: Facturación Conjunta Aseo */}
                <div className="factura-section section-aseo">
                    <div className="aseo-header">
                        <div className="aseo-label">Facturación Conjunta del Servicio Público de Aseo</div>
                    </div>
                    <div className="aseo-content">
                        <div className="clickable-point" onClick={() => handleClickPoint('factAseo')}>
                            <div className="green-point"></div>
                        </div>
                        {activeTooltip === 'factAseo' && (
                            <div className="tooltip-box">
                                <h3>{tooltips.factAseo.title}</h3>
                                <p>{tooltips.factAseo.description}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sección 8: Datos del Periodo */}
                <div className="factura-section section-periodo">
                    <div className="periodo-items">
                        <div className="periodo-row">
                            <div className="periodo-label">Periodo Facturado:</div>
                            <div className="clickable-point" onClick={() => handleClickPoint('periodoFacturado')}>
                                <div className="green-point"></div>
                            </div>
                        </div>
                        <div className="periodo-row">
                            <div className="periodo-label">Fecha de Vencimiento:</div>
                            <div className="clickable-point">
                                <div className="green-point"></div>
                            </div>
                        </div>
                        <div className="periodo-row">
                            <div className="periodo-label">Suspensión a Partir del:</div>
                            <div className="clickable-point">
                                <div className="green-point"></div>
                            </div>
                        </div>
                        <div className="periodo-row">
                            <div className="periodo-label">Pago Total:</div>
                            <div className="clickable-point">
                                <div className="green-point"></div>
                            </div>
                        </div>
                        <div className="periodo-row">
                            <div className="periodo-label">Pago Mínimo:</div>
                            <div className="clickable-point">
                                <div className="green-point"></div>
                            </div>
                        </div>
                        <div className="periodo-row">
                            <div className="periodo-label">Periodos Vencidos:</div>
                            <div className="clickable-point">
                                <div className="green-point"></div>
                            </div>
                        </div>
                    </div>
                    {activeTooltip === 'periodoFacturado' && (
                        <div className="tooltip-box">
                            <h3>{tooltips.periodoFacturado.title}</h3>
                            <p>{tooltips.periodoFacturado.description}</p>
                        </div>
                    )}
                </div>

                {/* Sección 9: Datos Personales */}
                <div className="factura-section section-datospersonales">
                    <div className="datospersonales-header">
                        <div className="datospersonales-label">Datos Personales</div>
                    </div>
                    <div className="datospersonales-content">
                        <div className="clickable-point" onClick={() => handleClickPoint('datosPersonales')}>
                            <div className="green-point"></div>
                        </div>
                        {activeTooltip === 'datosPersonales' && (
                            <div className="tooltip-box">
                                <h3>{tooltips.datosPersonales.title}</h3>
                                <p>{tooltips.datosPersonales.description}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sección 10: Cálculo del Consumo */}
                <div className="factura-section section-calculoconsumo">
                    <div className="calculoconsumo-header">
                        <div className="calculoconsumo-label">Cálculo del Consumo</div>
                    </div>
                    <div className="calculoconsumo-content">
                        <div className="clickable-point" onClick={() => handleClickPoint('calculoConsumo')}>
                            <div className="green-point"></div>
                        </div>
                        {activeTooltip === 'calculoConsumo' && (
                            <div className="tooltip-box">
                                <h3>{tooltips.calculoConsumo.title}</h3>
                                <p>{tooltips.calculoConsumo.description}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Imagen del logo de Electrohuila */}
                <div className="electrohuila-logo">
                    <img src="/images/electrohuila-logo.png" alt="Electrohuila" />
                </div>
            </div>

            {/* Línea gratuita de atención */}
            <div className="linea-atencion">
                <h3>Línea gratuita de atención</h3>
                <p>Reporta cualquier evento relacionado con la prestación del servicio</p>
                
                <div className="atencion-info">
                    <div className="atencion-icon">
                        <img src="/images/headset-icon.png" alt="Atención 24/7" />
                    </div>
                    <div className="atencion-text">
                        <div className="atencion-247">24/7</div>
                        <div className="atencion-numero">01 8000952 115</div>
                        <div className="atencion-web">www.electrohuila.com.co</div>
                    </div>
                    <div className="atencion-social">
                        <div className="social-icons">
                            <span>@ElectrohuliaSAESP</span>
                            <span>@Electrohuila</span>
                            <span>Electrohuila SA ESP</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Consejos de seguridad */}
            <div className="consejos-seguridad">
                <h3>Consejos para prevenir accidentes eléctricos</h3>
                <div className="consejos-items">
                    <div className="consejo-item">
                        <img src="/images/consejo1.png" alt="Herramientas adecuadas" />
                        <p>Emplea herramientas adecuadas en casa para evitar accidentes</p>
                    </div>
                    <div className="consejo-item">
                        <img src="/images/consejo2.png" alt="Limpieza de electrodomésticos" />
                        <p>Al realizar limpieza de un electrodoméstico desconéctalo</p>
                    </div>
                    <div className="consejo-item">
                        <img src="/images/consejo3.png" alt="Desconectar aparatos" />
                        <p>Al salir de casa o la oficina desconecta todos los aparatos</p>
                    </div>
                </div>
            </div>
        </div>
    );
}