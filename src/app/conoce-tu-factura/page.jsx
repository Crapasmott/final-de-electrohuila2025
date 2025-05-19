'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ConoceTuFactura() {
  const [activeTooltip, setActiveTooltip] = useState(null);
  
  // Información de los tooltips para cada punto
  const tooltips = {
    facturaVenta: {
      title: "Factura de venta",
      content: "Es el consecutivo de la factura"
    },
    fechaEmision: {
      title: "Fecha de emisión",
      content: "Es la fecha en que se emitió la factura"
    },
    cuentaNIU: {
      title: "Cuenta NIU",
      content: "Número de identificación único de usuario"
    },
    cufe: {
      title: "Código Único de Factura Electrónica - CUFE",
      content: "Código que permite verificar la autenticidad de la factura electrónica"
    },
    fechaVencimiento: {
      title: "Fecha de Vencimiento",
      content: "Fecha límite para realizar el pago"
    },
    totalPagar: {
      title: "Total a Pagar",
      content: "Valor total que debe pagar en esta factura"
    },
    financiacion: {
      title: "Financiación Electrohuila",
      content: "Aquí se detallan los valores que tienes financiados, como el número y valor de las cuotas y el saldo que falta por pagar."
    },
    puntosPago: {
      title: "Puntos de Pago",
      content: "Entidades y canales donde puede realizar el pago de su factura"
    }
  };
  // Función para crear un punto verde clicable
  const GreenDot = ({ id, top, left, right, bottom }) => {
    const style = {
      position: 'absolute',
      width: '32px',
      height: '32px',
      background: 'radial-gradient(circle, #8BC34A 0%, #8BC34A 60%, rgba(139, 195, 74, 0.5) 100%)',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 0 4px rgba(139, 195, 74, 0.3)',
      zIndex: 10
    };
    
    if (top !== undefined) style.top = top;
    if (left !== undefined) style.left = left;
    if (right !== undefined) style.right = right;
    if (bottom !== undefined) style.bottom = bottom;
    
    return (
      <div 
        style={style}
        onClick={() => setActiveTooltip(id)}
      ></div>
    );
  };
  
  // Función para crear un tooltip
  const Tooltip = ({ id, position = 'right' }) => {
    if (!activeTooltip || activeTooltip !== id) return null;
    
    const tooltip = tooltips[id];
    if (!tooltip) return null;
    
    const positionStyles = {
      right: { top: '0', right: '60px' },
      left: { top: '0', left: '60px' },
      top: { bottom: '60px', left: '50%', transform: 'translateX(-50%)' },
      bottom: { top: '60px', left: '50%', transform: 'translateX(-50%)' }
    };
    
    const style = {
      position: 'absolute',
      backgroundColor: '#0EA5E9',
      color: 'white',
      padding: '16px',
      borderRadius: '4px',
      zIndex: 100,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '300px',
      ...positionStyles[position]
    };
    
    return (
      <div style={style}>
        <button 
          style={{ 
            position: 'absolute', 
            top: '8px', 
            right: '8px',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer'
          }}
          onClick={() => setActiveTooltip(null)}
        >
          ✕
        </button>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{tooltip.title}</h3>
        <p style={{ fontSize: '14px' }}>{tooltip.content}</p>
        {id === 'puntosPago' && (
          <Link href="/puntos-de-pago" style={{ color: 'white', textDecoration: 'underline', display: 'block', marginTop: '8px' }}>
            Ver todos los puntos de pago
          </Link>
        )}
      </div>
    );
  };
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Encabezado */}
      <div style={{ 
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: 'white',
        padding: '16px 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
            Conoce tu <span style={{ color: '#F97316' }}>Factura</span>
          </h1>
          <div>
            <Link href="/" style={{ color: '#F97316', marginRight: '12px', textDecoration: 'none' }}>Inicio</Link>
            <span style={{ color: '#6B7280' }}>| Conoce tu factura</span>
          </div>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Instrucciones */}
        <div style={{ 
          backgroundColor: '#F97316', 
          color: 'white', 
          padding: '16px', 
          textAlign: 'center',
          borderRadius: '6px',
          marginBottom: '24px',
          fontSize: '18px'
        }}>
          Haz click sobre los puntos verdes para conocer todos los detalles de tu factura
        </div>
        {/* Factura interactiva */}
        <div style={{ position: 'relative', backgroundColor: 'white', padding: '24px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
          {/* Sección 1 - Encabezado Factura */}
          <div style={{ position: 'relative', border: '1px dashed #e5e7eb', borderRadius: '6px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ position: 'relative', width: '50%' }}>
                <div style={{ backgroundColor: '#FFECE8', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold', color: '#4B5563' }}>FACTURA DE VENTA No.</span>
                </div>
                
                <GreenDot id="facturaVenta" top="8px" right="24px" />
                {activeTooltip === 'facturaVenta' && <Tooltip id="facturaVenta" position="right" />}
                
                <div style={{ backgroundColor: '#FFECE8', padding: '8px', borderRadius: '4px' }}>
                  <span style={{ fontWeight: 'bold', color: '#4B5563' }}>FECHA DE EMISIÓN</span>
                </div>
                
                <GreenDot id="fechaEmision" top="60px" right="24px" />
                {activeTooltip === 'fechaEmision' && <Tooltip id="fechaEmision" position="right" />}
              </div>
              
              <div style={{ width: '48%', position: 'relative' }}>
                <div style={{ backgroundColor: '#FFECE8', padding: '8px', borderRadius: '4px', textAlign: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: '#4B5563' }}>N° CUENTA NIU</span>
                </div>
                
                <GreenDot id="cuentaNIU" top="8px" right="24px" />
                {activeTooltip === 'cuentaNIU' && <Tooltip id="cuentaNIU" position="left" />}
                
                <div style={{ marginTop: '16px', position: 'relative' }}>
                  <div style={{ border: '2px solid #F97316', borderRadius: '50%', width: '120px', height: '120px', position: 'absolute', top: '-20px', right: '0', zIndex: '1', borderStyle: 'dashed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontWeight: 'bold', color: '#F97316', fontSize: '12px', textAlign: 'center', padding: '8px', lineHeight: '1.2' }}>PARA CUALQUIER CONSULTA Y PAGO ELECTRÓNICO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sección 2 - Contenido Principal */}
          <div style={{ position: 'relative', border: '1px dashed #AED581', borderRadius: '6px', padding: '16px', marginBottom: '16px', minHeight: '150px' }}>
            <GreenDot id="cufe" top="50%" left="50%" />
            {activeTooltip === 'cufe' && <Tooltip id="cufe" position="top" />}
          </div>
          
          {/* Sección 3 - Logo e Imagen */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ backgroundColor: '#F97316', padding: '24px', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ width: '200px', marginRight: '16px' }}>
                  <svg width="180" height="50" viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 10H155V40H25V10Z" fill="white"/>
                    <text x="35" y="30" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="#F97316">ElectroHuila</text>
                    <text x="35" y="45" fontFamily="Arial" fontSize="8" fill="white">Transformamos Buena Energía</text>
                  </svg>
                </div>
                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '24px', lineHeight: '1.2', textAlign: 'center', flex: '1' }}>
                  LA MISMA ENERGÍA<br/>
                  QUE NOS CONECTA<br/>
                  CON LA GENTE
                </div>
              </div>
              
              <div style={{ height: '100px', backgroundColor: '#FFF', borderRadius: '4px', marginTop: '16px' }}>
                {/* Aquí se puede poner una imagen de la familia o simplemente dejar un espacio */}
              </div>
            </div>
          </div>
          {/* Sección 4 - CUFE */}
          <div style={{ position: 'relative', border: '1px dashed #AED581', borderRadius: '6px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ backgroundColor: '#AED581', padding: '8px', borderRadius: '4px', display: 'inline-block', marginBottom: '8px' }}>
              <span style={{ fontWeight: 'bold', color: 'white' }}>Código Único de Factura Electrónica - CUFE</span>
            </div>
            
            <GreenDot id="cufeDetalle" top="16px" right="16px" />
            {activeTooltip === 'cufeDetalle' && <Tooltip id="cufeDetalle" position="left" />}
          </div>
          
          {/* Sección 5 - Fechas y Total */}
          <div style={{ display: 'flex', marginBottom: '16px' }}>
            <div style={{ width: '30%', backgroundColor: '#F3F4F6', borderRadius: '4px', padding: '16px', textAlign: 'center' }}>
              <span style={{ fontWeight: 'bold', color: '#4B5563' }}>FIRMA AUTORIZADA</span>
            </div>
            
            <div style={{ width: '70%', display: 'flex', position: 'relative' }}>
              <div style={{ flex: '1', backgroundColor: '#F97316', padding: '8px', color: 'white', fontWeight: 'bold', marginLeft: '8px', borderRadius: '4px 0 0 4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Fecha de Vencimiento
              </div>
              <div style={{ flex: '1', backgroundColor: '#F97316', padding: '8px', color: 'white', fontWeight: 'bold', marginLeft: '1px', borderRadius: '0 4px 4px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Total a Pagar
              </div>
              
              <GreenDot id="fechaVencimiento" top="50%" left="30%" />
              {activeTooltip === 'fechaVencimiento' && <Tooltip id="fechaVencimiento" position="bottom" />}
              
              <GreenDot id="totalPagar" top="50%" right="20%" />
              {activeTooltip === 'totalPagar' && <Tooltip id="totalPagar" position="bottom" />}
            </div>
          </div>
          {/* Sección 6 - Financiación */}
          <div style={{ position: 'relative', border: '1px dashed #F97316', borderRadius: '6px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ backgroundColor: '#F97316', padding: '8px', borderRadius: '4px', display: 'inline-block', marginBottom: '8px' }}>
              <span style={{ fontWeight: 'bold', color: 'white' }}>Financiación ElectroHuila</span>
            </div>
            
            <GreenDot id="financiacion" top="16px" left="50%" />
            {activeTooltip === 'financiacion' && <Tooltip id="financiacion" position="right" />}
          </div>
          
          {/* Sección Final - Puntos de Pago */}
          <div style={{ position: 'relative', border: '1px dashed #AED581', borderRadius: '6px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ backgroundColor: '#AED581', padding: '8px', borderRadius: '4px', display: 'inline-block', marginBottom: '8px' }}>
              <span style={{ fontWeight: 'bold', color: 'white' }}>Puntos de Pago</span>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', padding: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#4B5563', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{ marginLeft: '4px' }}>Página Web www.electrohuila.com.co</span>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
                  {/* Logos de bancos y recaudadores */}
                  {['Suchance', 'Banco Occidente', 'BBVA', 'Davivienda', 'Credifuturo'].map((banco, index) => (
                    <div key={index} style={{ 
                      height: '30px', 
                      padding: '0 10px', 
                      borderRadius: '4px', 
                      backgroundColor: '#F3F4F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      color: '#4B5563'
                    }}>
                      {banco}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <GreenDot id="puntosPago" top="16px" right="16px" />
            {activeTooltip === 'puntosPago' && <Tooltip id="puntosPago" position="left" />}
          </div>
          {/* Footer con línea de atención */}
          <div style={{ 
            backgroundColor: '#F97316', 
            color: 'white', 
            padding: '16px', 
            borderRadius: '4px', 
            textAlign: 'center',
            marginBottom: '16px',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            Línea gratuita de atención
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', backgroundColor: '#F3F4F6', padding: '16px', borderRadius: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                backgroundColor: '#FDB813', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginRight: '16px'
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4B5563' }}>01 8000952 115</div>
                <div style={{ color: '#6B7280' }}>www.electrohuila.com.co</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}