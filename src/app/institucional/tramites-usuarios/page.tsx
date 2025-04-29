// src/app/institucional/tramites-usuarios/page.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function TramitesUsuarios() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Cabecera */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
          <span style={{ color: '#333' }}>Trámites </span>
          <span style={{ color: '#f97316' }}>Usuarios</span>
        </h1>
        <div style={{ fontSize: '14px' }}>
          <Link href="/" style={{ color: '#f97316', textDecoration: 'none' }}>Inicio</Link>
          <span style={{ margin: '0 5px', color: '#6b7280' }}>|</span>
          <span style={{ color: '#6b7280' }}>Trámites Usuarios</span>
        </div>
      </div>

      {/* Lista de trámites */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '5px', overflow: 'hidden' }}>
        {/* Trámite 1: Reclamación de fallas */}
        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer',
              backgroundColor: openIndex === 0 ? '#f9fafb' : 'white'
            }}
            onClick={() => toggleItem(0)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Trámite para la reclamación de fallas en la prestación del servicio</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          
          {openIndex === 0 && (
            <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#333', marginBottom: '15px', fontWeight: 'bold', fontSize: '18px' }}>Trámite para la reclamación de fallas en la prestación del servicio</h3>
              
              <p style={{ marginBottom: '15px' }}>
                Para atender las solicitudes de indemnización a usuarios por fallas en la prestación del servicio, es importante cumplir con las siguientes indicaciones:
              </p>
              
              <ol style={{ marginLeft: '20px', marginBottom: '15px' }}>
                <li style={{ marginBottom: '10px' }}>
                  Diligenciar el formato código FT-AGFM-05-001 versión No. 05 <strong>"Solicitud indemnización por fallas en la prestación del servicio"</strong> debidamente soportados con los requisitos mencionados en dicho formato, por las siguientes causales:
                </li>
              </ol>
              
              <p style={{ marginBottom: '10px' }}><strong>Causales:</strong></p>
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'none' }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Reconocimiento económico por lesión o muerte de semovientes.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Reconocimiento económico de lucro cesante.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Reconocimiento económico de bienes muebles (electrodomésticos, maquinas, muebles y enseres, entre otros).
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Reconocimiento económico de cultivos y árboles frutales.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Reconocimiento económico de bienes inmuebles.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Reconocimiento económico por lesión o muerte de personas.
                </li>
              </ul>
              
              <p style={{ marginBottom: '15px' }}>
                <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Descargar formato FT-AGFM-05-001</a>
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                2. Cuando la causal es <strong>"Reconocimiento económico de electrodomésticos de bienes muebles (electrodomésticos, maquinas, muebles y enseres, entre otros)"</strong>, se deberá diligenciar el formato FT-AGFM-05-002 versión No. 3 "Acreditación de Propiedad".
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Descargar formato FT-AGFM-05-002</a>
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                3. La solicitud podrá radicarse físicamente en los puntos de radicación autorizados (Neiva, Garzón, Pitalito y la Plata) según horarios establecidos:
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                <strong>De 08:00 a. m a 12:00 pm y de 12:30 p. m a 04:00 p. m, días hábiles de la semana lunes a viernes.</strong>
              </p>
              
              <p style={{ marginBottom: '10px' }}><strong>Neiva</strong></p>
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'disc' }}>
                <li style={{ marginBottom: '5px' }}>
                  Servicio de atención Integral y Recaudo Empresarial
                </li>
                <li style={{ marginBottom: '5px' }}>
                  Sede El Saire.
                </li>
                <li style={{ marginBottom: '5px' }}>
                  Carrera 18 Calle 9 Esquina /B. Calixto
                </li>
              </ul>
              
              <p style={{ marginBottom: '10px' }}><strong>Garzón</strong></p>
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'disc' }}>
                <li style={{ marginBottom: '5px' }}>
                  Sede Zona Centro
                </li>
                <li style={{ marginBottom: '5px' }}>
                  Calle 8 No. 7-54/B. Centro
                </li>
                <li style={{ marginBottom: '5px' }}>
                  La Plata
                </li>
              </ul>
              
              <p style={{ marginBottom: '10px' }}><strong>Pitalito</strong></p>
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'disc' }}>
                <li style={{ marginBottom: '5px' }}>
                  Sede Zona Sur
                </li>
                <li style={{ marginBottom: '5px' }}>
                  Calle 19 No. 3-05/B. San Solarte
                </li>
              </ul>
              
              <p style={{ marginBottom: '15px' }}>
                4. La solicitud como segunda opción, podrá ser radicada por el <strong>canal virtual</strong> (ventanilla <a href="mailto:radiacion@electrohuila.co" style={{ color: '#3b82f6', textDecoration: 'none' }}>radiacion@electrohuila.co</a>), según horario establecido:
              </p>
              
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'disc' }}>
                <li style={{ marginBottom: '5px' }}>
                  De 08:00 a. m. a 04:30 p. m, jornada continua en días hábiles.
                </li>
              </ul>
              
              <p style={{ marginBottom: '10px' }}>Es importante mencionar las siguientes condiciones para radicar por el canal virtual:</p>
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'none' }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Solo se aceptan archivos en formato PDF o PDF/A legible (No fotos de celular)
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  El nombre del archivo no debe ser muy extenso
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Escala blanco y negro en 200 DPI, en escala de grises entre 200 y 240 DPI ( si el documento contiene fotos o gráficas)
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Si el documento fué elaborado en ofimática (word, excel, power point etc) solo deben convertirlo a PDF o PDF/A (sin clave)
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  En todo caso los archivos por cada trámite no deben superar los 30 Mb (requisito técnico del gestor documental)
                </li>
              </ul>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: 'white', 
                    color: '#3b82f6', 
                    border: '1px solid #3b82f6', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Ver detalles</a>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#3b82f6', 
                    color: 'white', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Realizar trámite</a>
              </div>
            </div>
          )}
        </div>
        {/* Trámite 2: Legalización proyectos */}
        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer',
              backgroundColor: openIndex === 1 ? '#f9fafb' : 'white'
            }}
            onClick={() => toggleItem(1)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Trámite legalización proyectos y cuentas nuevas</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          
          {openIndex === 1 && (
            <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#333', marginBottom: '15px', fontWeight: 'bold', fontSize: '18px' }}>Trámite legalización proyectos y cuentas nuevas</h3>
              
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'none' }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Guía de conexión cuentas nuevas y nuevos proyectos
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Formatos
                  <ul style={{ marginLeft: '30px', marginTop: '8px', listStyle: 'none' }}>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                      Formato plan de trabajo
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                      FT-CCP-06-002 Solicitud del servicio de energía (E1)
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                      FT-CCP-06-011
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                      FT-CCP-02-012
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                      FT-CCP-06-016
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                      FT-CCP-06-019 Factibilidad del servicio (E2)
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                      FT-CCP-06-020 Rechazo solicitud de factibilidad del servicio (E3)
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                      FT-CCP-06-021 Solicitud de revisión de estudios o diseños (E4)
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                      FT-CCP-06-022 Solicitud de recibo técnico (E5)
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                      FT-DMT-04-003
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                      FT-DMT-04-004
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                      FT-DMT-04-005
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                      FT-DMT-04-006 Transformadores instalados y retirados
                    </li>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                      Lista de Chequeo para Verificación de Diseños MT y BT
                    </li>
                  </ul>
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Lista de verificación de acometida en BT
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Notas generales de diseño de redes
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Rótulos para diseños de redes
                </li>
              </ul>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: 'white', 
                    color: '#3b82f6', 
                    border: '1px solid #3b82f6', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Ver detalles</a>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#3b82f6', 
                    color: 'white', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Realizar trámite</a>
              </div>
            </div>
          )}
        </div>

        {/* Trámite 3: Recurso de reposición */}
        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer',
              backgroundColor: openIndex === 2 ? '#f9fafb' : 'white'
            }}
            onClick={() => toggleItem(2)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Trámite de recurso de reposición - apelación</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          
          {openIndex === 2 && (
            <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#333', marginBottom: '15px', fontWeight: 'bold', fontSize: '18px' }}>Trámite de recurso de reposición - apelación</h3>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Descripción</h4>
              <p style={{ marginBottom: '15px' }}>
                La persona natural y/o jurídica que haya presentado una petición o reclamo ante la Electrificadora del Huila S.A. E.S.P. puede presentar recurso de reposición o reposición y en subsidio apelación ante la Superintendencia de Servicios públicos domiciliarios, cuando considere que el resultado del trámite no satisface su requerimiento.
              </p>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Requisitos</h4>
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'none' }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Haber sido notificado de la respuesta en conformidad a las reglas de la materia, acerca de su reclamación o petición, en los cinco días siguientes a la notificación de la respuesta.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Presentar documento de recurso de reposición o reposición y en subsidio apelación ante la Superintendencia de Servicios Públicos.
                </li>
              </ul>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Tener en cuenta</h4>
              <p style={{ marginBottom: '15px' }}>
                Presentar el recurso en cualquiera de las Sedes de atención al cliente dispuestas por Electrohuila, correo electrónico <a href="mailto:radiacion@electrohuila.co" style={{ color: '#3b82f6' }}>radiacion@electrohuila.co</a> o dentro de la página web www.electrohuila.co sección "<a href="#" style={{ color: '#3b82f6' }}>Electrohuila en Línea</a>" y deberá acreditar el pago de las sumas que no son objeto de reclamación, como pre- requisito para el trámite de recurso de reposición.
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                El seguimiento al trámite se podrá realizar de manera presencial con el número de cuenta o código NIU.
              </p>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: 'white', 
                    color: '#3b82f6', 
                    border: '1px solid #3b82f6', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Ver detalles</a>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#3b82f6', 
                    color: 'white', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Realizar trámite</a>
              </div>
            </div>
          )}
        </div>
        {/* Trámite 4: Denuncia de arrendamiento */}
        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer',
              backgroundColor: openIndex === 3 ? '#f9fafb' : 'white'
            }}
            onClick={() => toggleItem(3)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Trámite para la denuncia de arrendamiento</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          
          {openIndex === 3 && (
            <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#333', marginBottom: '15px', fontWeight: 'bold', fontSize: '18px' }}>Trámite para la denuncia de arrendamiento</h3>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Descripción</h4>
              <p style={{ marginBottom: '15px' }}>
                Las personas naturales y/o jurídicas que pacten un contrato de arrendamiento en el cual está inmerso el pago del servicio de energía eléctrica por parte del arrendatario, pueden denunciar la existencia del contrato ante la Electrificadora del Huila S.A. E.S.P. remitiendo los depósitos o garantías constituidas, con el fin de que el inmueble entregado a título de arrendamiento no quede afecto al pago del servicio de energía eléctrica.
              </p>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Requisitos</h4>
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'none' }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Diligenciar el formato FT-CSC-03-001 Denuncia del contrato de arrendamiento.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Existencia de contrato de arrendamiento de bien inmueble.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Fotocopia de la factura del servicio de energía.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Fotocopia de la cédula de ciudadanía del arrendador y del arrendatario.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Garantías (Art. 15 Ley 820 de 2003).
                </li>
              </ul>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Tener en cuenta</h4>
              <p style={{ marginBottom: '15px' }}>
                El trámite se puede hacer en las Sedes de atención al cliente de Electrohuila S.A. E.S.P.
              </p>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: 'white', 
                    color: '#3b82f6', 
                    border: '1px solid #3b82f6', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Ver detalles</a>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#3b82f6', 
                    color: 'white', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Realizar trámite</a>
              </div>
            </div>
          )}
        </div>

        {/* Trámite 5: Reclamación de facturación */}
        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer',
              backgroundColor: openIndex === 4 ? '#f9fafb' : 'white'
            }}
            onClick={() => toggleItem(4)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Trámite para la reclamación de facturación</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          
          {openIndex === 4 && (
            <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#333', marginBottom: '15px', fontWeight: 'bold', fontSize: '18px' }}>Trámite para la reclamación de facturación</h3>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Descripción</h4>
              <p style={{ marginBottom: '15px' }}>
                Las personas naturales y/o jurídicas que consideren que la factura del servicio de energía prestado contiene conceptos que no corresponden, puede acercarse a cualquiera de las oficinas dispuestas por la empresa para la atención del cliente y solicitar la revisión y ajustes pertinentes.
              </p>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Requisitos</h4>
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'none' }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Presentarse antes de la fecha de vencimiento de pago.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Presentar la factura actualizada del medidor de energía.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Solicitar revisión y ajustes a la facturación.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Retirar nueva factura de haber accedido la reclamación.
                </li>
              </ul>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Tener en cuenta</h4>
              <p style={{ marginBottom: '15px' }}>
                Tener en cuenta que este trámite puede hacerlo través del correo <a href="mailto:radiacion@electrohuila.co" style={{ color: '#3b82f6' }}>radiacion@electrohuila.co</a> o las Sedes de atención al cliente de Electrohuila S.A. E.S.P.
              </p>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: 'white', 
                    color: '#3b82f6', 
                    border: '1px solid #3b82f6', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Ver detalles</a>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#3b82f6', 
                    color: 'white', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Realizar trámite</a>
              </div>
            </div>
          )}
        </div>
        {/* Trámite 6: Cambio de información */}
        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer',
              backgroundColor: openIndex === 5 ? '#f9fafb' : 'white'
            }}
            onClick={() => toggleItem(5)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Trámite para solicitud de cambio de información del cliente</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          
          {openIndex === 5 && (
            <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#333', marginBottom: '15px', fontWeight: 'bold', fontSize: '18px' }}>Trámite para solicitud de cambio de información del cliente</h3>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Descripción</h4>
              <p style={{ marginBottom: '15px' }}>
                Las personas naturales y/o jurídicas pueden actualizar la información propia del cliente en la base de datos de la Electrificadora del Huila SA. E.S.P cómo es: Dirección postal, nombre del cliente, número de identificación, dirección, estrato socioeconómico.
              </p>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Requisitos</h4>
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'none' }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Ser propietario del inmueble o disponer de autorización de este.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Dirección y/o postal - Autorización del suscriptor – Certificación catastral.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Nombre del suscriptor – Certificado de libertad y tradición no mayor a treinta (30) días.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Identificación – Fotocopia de la cédula de ciudadanía.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Estrato socioeconómico – Certificación de la autoridad Municipal no mayor a treinta (30) días.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Otros – (Documento pertinente)
                </li>
              </ul>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Tener en cuenta</h4>
              <p style={{ marginBottom: '15px' }}>
                Tener en cuenta que este trámite puede hacerlo través del correo <a href="mailto:radiacion@electrohuila.co" style={{ color: '#3b82f6' }}>radiacion@electrohuila.co</a> o las Sedes de atención al cliente de Electrohuila S.A. E.S.P.
              </p>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: 'white', 
                    color: '#3b82f6', 
                    border: '1px solid #3b82f6', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Ver detalles</a>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#3b82f6', 
                    color: 'white', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Realizar trámite</a>
              </div>
            </div>
          )}
        </div>

        {/* Trámite 7: Pago no ingresado */}
        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer',
              backgroundColor: openIndex === 6 ? '#f9fafb' : 'white'
            }}
            onClick={() => toggleItem(6)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Trámite de pago no ingresado</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          
          {openIndex === 6 && (
            <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#333', marginBottom: '15px', fontWeight: 'bold', fontSize: '18px' }}>Trámite de pago no ingresado</h3>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Descripción</h4>
              <p style={{ marginBottom: '15px' }}>
                Es el trámite que se realiza cuando el cliente ha realizado el pago y éste no se evidencia en el sistema de Electrohuila S.A. E.S.P.
              </p>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Requisitos</h4>
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'none' }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Si el pago se realizó con factura, adjuntar el soporte original de pago.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Si el pago se realizó por datafono, cajeros o cualquier medio electrónico, se debe anexar certificación bancaria o voucher original emitido por la terminal de pago.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Si el pago se realizó por Internet, la impresión de la pantalla de transacción exitosa.
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Para domiciliación, banca móvil y/o pago programado, copia del extracto de la cuenta donde se evidencia el débito.
                </li>
              </ul>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Tener en cuenta</h4>
              <p style={{ marginBottom: '15px' }}>
                que este trámite puede hacerlo través del correo <a href="mailto:radiacion@electrohuila.co" style={{ color: '#3b82f6' }}>radiacion@electrohuila.co</a> o las Sedes de atención al cliente de Electrohuila S.A. E.S.P.
              </p>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: 'white', 
                    color: '#3b82f6', 
                    border: '1px solid #3b82f6', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Ver detalles</a>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#3b82f6', 
                    color: 'white', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Realizar trámite</a>
              </div>
            </div>
          )}
        </div>
        {/* Trámite 8: Reposición de medidor */}
        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer',
              backgroundColor: openIndex === 7 ? '#f9fafb' : 'white'
            }}
            onClick={() => toggleItem(7)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Trámite para la reposición del medidor de energía</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          
          {openIndex === 7 && (
            <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#333', marginBottom: '15px', fontWeight: 'bold', fontSize: '18px' }}>Trámite para la reposición del medidor de energía</h3>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>En que consiste?</h4>
              <p style={{ marginBottom: '15px' }}>
                La persona natural y/o jurídica que requiera cambiar o reponer el medidor para el servicio de energía eléctrica, puede adquirirlo en la Electrificadora del Huila S.A. E.S.P. debidamente certificado y sellado para su instalación con cargo a la cuenta del suscriptor y financiado hasta 36 meses de plazo.
              </p>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Lugares</h4>
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'none' }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Oficina de Atención al Cliente - SAIRE - Tel. (8) 8701952 - (8) 8706784 Neiva
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Zona Centro - Tel. (8) 8330224 - (8) 8332265 Garzón
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Zona Occidente - Tel (8) 8370372 La plata
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Zona Sur - Tel (8) 8360242 Pitalito
                </li>
              </ul>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Fechas</h4>
              <p style={{ marginBottom: '15px' }}>
                En cualquier momento
              </p>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Requisitos para la realización del trámite</h4>
              <p style={{ marginBottom: '15px' }}>
                Disponer una cuenta con la Electrificadora del Huila S.A. E.S.P.
              </p>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Documentos necesarios</h4>
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'none' }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Fotocopia de la factura del servicio de energía
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Solicitud firmada por el propietario del inmueble
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Fotocopia de la cédula de ciudadanía del propietario
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Factura de compra del medidor
                </li>
              </ul>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Pasos que debe seguir el usuario desde el inicio del trámite hasta su finalización</h4>
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'none' }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Presentar solicitud escrita firmada por el propietario del inmueble
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Autorizar el cargo a la factura
                </li>
              </ul>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Tipo de pago</h4>
              <p style={{ marginBottom: '15px' }}>
                Pago Variable: Depende del tipo de medidor que requiera.
              </p>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Respuesta al Trámite</h4>
              <p style={{ marginBottom: '15px' }}>
                Plazo para dar respuesta: Quince (15) días hábiles luego de presentada la solicitud
              </p>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Seguimiento del ciudadano</h4>
              <p style={{ marginBottom: '15px' }}>
                El cliente puede hacer seguimiento a su recurso así:
              </p>
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'none' }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Dirigiéndose personalmente a la oficina donde le recibieron la solicitud
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Comunicándose vía telefónica con la Oficina de atención al cliente de la Sede donde fue atendido.
                </li>
              </ul>
              
              <h4 style={{ color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>Normatividad que regula el trámite</h4>
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'none' }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Ley 142 : Servicios Públicos Domiciliarios
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Documento de Gerencia Electrohuila No. 012 del 2 de Enero de 2007
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Contrato de condiciones uniformes entre la Empresa y el usuario
                </li>
              </ul>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: 'white', 
                    color: '#3b82f6', 
                    border: '1px solid #3b82f6', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Ver detalles</a>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#3b82f6', 
                    color: 'white', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Realizar trámite</a>
              </div>
            </div>
          )}
        </div>
        {/* Trámite 9: Terminación del contrato */}
        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer',
              backgroundColor: openIndex === 8 ? '#f9fafb' : 'white'
            }}
            onClick={() => toggleItem(8)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Terminación del contrato por orden del suscriptor</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          
          {openIndex === 8 && (
            <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#333', marginBottom: '15px', fontWeight: 'bold', fontSize: '18px' }}>Terminación del contrato por orden del suscriptor</h3>
              
              <p style={{ marginBottom: '15px' }}>
                Es la solicitud que realiza el cliente y usuario para que se retire definitivamente el servicio público domiciliario de determinado inmueble.
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                Podrá solicitarlo Propietario del inmueble o quien solicitó el servicio público domiciliario.
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                Para solicitar terminación del contrato por orden del suscriptor debes contar con lo siguiente: *Nombre completo y número de documento de identidad del solicitante.
              </p>
              
              <p style={{ marginBottom: '15px' }}><strong>Extranjeros:</strong> Cédula de Extranjería o pasaporte o permiso de permanencia en Colombia o la cédula de su país. Si el propietario o el suscriptor (quien solicitó el servicio) fallecieron, un tercero puede presentar la solicitud de retiro adjuntando el certificado de defunción e informando el vínculo con el inmueble.</p>
              
              <p style={{ marginBottom: '15px' }}><strong>Propietario:</strong> Fotocopia del impuesto predial vigente (documento físico o lo puedes consultar y descargar en la página de impuesto predial de la Alcaldía, en caso de que el municipio cuente con esta opción) o consultar el Certificado de Libertad y tradición en la Ventanilla Única de Registro -VUR- si el cliente no presenta el documento físico (si lo presenta físico con fecha de expedición inferior a 90 días).</p>
              
              <p style={{ marginBottom: '15px' }}><strong>Quien solicitó el servicio:</strong> última factura</p>
              
              <p style={{ marginBottom: '15px' }}>
                Cuando el retiro del servicio sea por orden de autoridad competente, solo es necesaria la comunicación de la entidad oficial con la solicitud (entidades: municipio o quien haga sus veces, inspecciones de policía)
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                Excepcionalmente se podrán recibir los siguientes documentos para acreditar propiedad del inmueble: Promesa de Compraventa, Documento de Posesión del Inmueble, Sentencia judicial de Adjudicación del predio, Resolución administrativa de adjudicación del predio, Escritura Pública, Índice de Propiedad, documento expedido por la inspección de policía donde conste la vigencia y Posesión del inmueble. Cuando el solicitante habite en un resguardo indígena, certificación de ocupación del inmueble firmado por el Gobernador Indígena.
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                Si la persona que realiza la solicitud actúa en representación de un tercero, deberá presentar, adicional a los documentos anteriores, el poder debidamente otorgado o la autorización que lo faculte para actuar en su nombre, la cual no requiere autenticación.
              </p>
              
              <p style={{ marginBottom: '15px' }}>
                Los canales que podrá realizar la solicitud se tienen a disposición radiacion@electrohuila.co, de manera presencial en nuestras sedes de Neiva, Pitalito, Garzón y la Plata, contando con la información requerida para el trámite durante la atención.
              </p>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: 'white', 
                    color: '#3b82f6', 
                    border: '1px solid #3b82f6', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Ver detalles</a>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#3b82f6', 
                    color: 'white', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Realizar trámite</a>
              </div>
            </div>
          )}
        </div>

        {/* Trámite 10: Plan de mantenimiento */}
        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer',
              backgroundColor: openIndex === 9 ? '#f9fafb' : 'white'
            }}
            onClick={() => toggleItem(9)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Plan de mantenimiento de pérdidas</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          
          {openIndex === 9 && (
            <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
              <h3 style={{ color: '#333', marginBottom: '15px', fontWeight: 'bold', fontSize: '18px' }}>Plan de mantenimiento de pérdidas</h3>
              
              <ul style={{ marginLeft: '20px', marginBottom: '15px', listStyle: 'none' }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#f97316', marginRight: '10px', fontSize: '16px' }}>●</span>
                  Avance Plan de Mantenimiento de Pérdidas
                </li>
              </ul>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: 'white', 
                    color: '#3b82f6', 
                    border: '1px solid #3b82f6', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Ver detalles</a>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#3b82f6', 
                    color: 'white', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Realizar trámite</a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Botones inferiores */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <a 
          href="#" 
          style={{ 
            backgroundColor: '#0099cc', 
            color: 'white', 
            padding: '15px', 
            borderRadius: '5px', 
            textDecoration: 'none', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span style={{ marginRight: '10px' }}>↓</span>
          Medidores soportados para Telegestión
        </a>
        <a 
          href="#" 
          style={{ 
            backgroundColor: '#0099cc', 
            color: 'white', 
            padding: '15px', 
            borderRadius: '5px', 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span style={{ marginRight: '10px' }}>↓</span>
          Formatos solicitud de parametrización
        </a>
      </div>
    </div>
  );
}