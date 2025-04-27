'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  // Año actual para el copyright
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{ 
      backgroundColor: '#008dcc', 
      color: 'white',
      padding: '50px 0 20px'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 15px'
      }}>
        {/* Sección principal del footer */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {/* Columna 1: Contacto */}
          <div>
            <h3 style={{ 
              fontSize: '18px', 
              marginBottom: '20px',
              borderBottom: '2px solid #0a3d62',
              paddingBottom: '10px'
            }}>
              Contacto
            </h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              <li style={{ 
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Phone size={16} style={{ marginRight: '10px' }} />
                (608) 8664600
              </li>
              <li style={{ 
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Phone size={16} style={{ marginRight: '10px' }} />
                (608) 8664646
              </li>
              <li style={{ 
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Phone size={16} style={{ marginRight: '10px' }} />
                Línea Gratuita 018000952115
              </li>
              <li style={{ 
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Phone size={16} style={{ marginRight: '10px' }} />
                Línea Transparencia 018000117766
              </li>
              <li style={{ 
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Phone size={16} style={{ marginRight: '10px' }} />
                Línea Transparencia MinMinas 018000128522
              </li>
            </ul>
          </div>

          {/* Columna 2: Ubicación */}
          <div>
            <h3 style={{ 
              fontSize: '18px', 
              marginBottom: '20px',
              borderBottom: '2px solid #0a3d62',
              paddingBottom: '10px'
            }}>
              Ubicación
            </h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              <li style={{ 
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'flex-start'
              }}>
                <MapPin size={16} style={{ marginRight: '10px', marginTop: '3px' }} />
                <span>Oficina Principal Km 1 vía a Palermo</span>
              </li>
              <li style={{ 
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'flex-start'
              }}>
                <MapPin size={16} style={{ marginRight: '10px', marginTop: '3px' }} />
                <span>Oficina Saire: Carrera 18 Calle 9 Neiva</span>
              </li>
              <li style={{ 
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Mail size={16} style={{ marginRight: '10px' }} />
                radicacion@electrohuila.co
              </li>
            </ul>
          </div>

          {/* Columna 3: Enlaces rápidos */}
          <div>
            <h3 style={{ 
              fontSize: '18px', 
              marginBottom: '20px',
              borderBottom: '2px solid #0a3d62',
              paddingBottom: '10px'
            }}>
              Enlaces rápidos
            </h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              <li style={{ marginBottom: '10px' }}>
                <Link href="https://enlinea.electrohuila.com.co/notificacion-web/#" style={{ color: 'white', textDecoration: 'none' }}>
                  Notificaciones Judiciales
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/institucional/junta-directiva" style={{ color: 'white', textDecoration: 'none' }}>
                  Junta Directiva
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/institucional/proteccion-datos-personales" style={{ color: 'white', textDecoration: 'none' }}>
                  Política de protección de datos
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/verificacion-inicial" style={{ color: 'white', textDecoration: 'none' }}>
                  Verificación inicial
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="http://rh.electrohuila.com.co:8080/KioscoDesignerRHN-war/?grupo=GrupoEmpresarial1" target="_blank" style={{ color: 'white', textDecoration: 'none' }}>
                  Nómina Kiosko
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/institucional/politicas" style={{ color: 'white', textDecoration: 'none' }}>
                  Políticas
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="/institucional/informes" style={{ color: 'white', textDecoration: 'none' }}>
                  Informes
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes sociales */}
          <div>
            <h3 style={{ 
              fontSize: '18px', 
              marginBottom: '20px',
              borderBottom: '2px solid #0a3d62',
              paddingBottom: '10px'
            }}>
              Síguenos
            </h3>
            <div style={{ 
              display: 'flex', 
              gap: '15px',
              marginBottom: '30px'
            }}>
              <a href="https://www.facebook.com/ElectroHuilaOficial" target="_blank" rel="noopener noreferrer" style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}>
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com/ElectroHuila" target="_blank" rel="noopener noreferrer" style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}>
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/electrohuilaoficial/" target="_blank" rel="noopener noreferrer" style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}>
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/channel/UCzxm8j7h9GRCiN9_7TCpVnA" target="_blank" rel="noopener noreferrer" style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}>
                <Youtube size={20} />
              </a>
            </div>
            
            <div>
              <img 
                src="/images/logo-electrohuila-blanco.png" 
                alt="Logo Electrohuila" 
                style={{ 
                  maxWidth: '180px', 
                  height: 'auto',
                  marginBottom: '15px'
                }} 
              />
              <p style={{ fontSize: '14px', margin: '0' }}>
                Transmitiendo Buena Energía.
              </p>
            </div>
          </div>
        </div>
        
        {/* Certificaciones y Aliados - NUEVA SECCIÓN */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            {/* Logo CREG */}
            <img src="/images/logo_creg.png" alt="CREG" style={{ height: '40px', width: 'auto' }} />
            
            {/* Logo UPME */}
            <img src="/images/logo-upme.png" alt="UPME" style={{ height: '40px', width: 'auto' }} />
            
            {/* Logo Superservicios */}
            <img src="/images/superservicios.png" alt="Superservicios" style={{ height: '40px', width: 'auto' }} />
            
            {/* Logo circular (quizás MinEnergia o alguna certificación) */}
            <img src="/images/global.png.webp" alt="Ministerio de Energía" style={{ height: '40px', width: 'auto' }} />
            
            {/* Copyright texto en negro o gris */}
            <div style={{ color: '#333' }}>
              © {currentYear} Derechos reservados Electrohuila
            </div>
            
            {/* Logos de certificaciones ISO */}
            <img src="/images/logo_Icontec-ISO-9001.png" alt="ISO 9001" style={{ height: '40px', width: 'auto' }} />
            <img src="/images/images.png" alt="ISO 14001" style={{ height: '40px', width: 'auto' }} />
          </div>
        </div>
        
        {/* Línea divisoria */}
        <div style={{ 
          height: '1px', 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          margin: '0 0 20px' 
        }}></div>
        
        {/* Copyright - se movió a la sección blanca con los logos */}
        <div style={{ 
          textAlign: 'center',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.7)'
        }}>
         
          Electrificadora del Huila S.A. E.S.P
        </div>
      </div>
    </footer>
  );
}