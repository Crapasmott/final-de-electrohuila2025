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
                <Link href="/institucional/proteccion-datos-personales" style={{ color: 'white', textDecoration: 'none' }}>
                  Política de protección de datos
                </Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link href="https://login.microsoftonline.com/bff55112-201c-40fb-ae69-a53c8ab06449/oauth2/authorize?client%5Fid=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&response%5Fmode=form%5Fpost&response%5Ftype=code%20id%5Ftoken&resource=00000003%2D0000%2D0ff1%2Dce00%2D000000000000&scope=openid&nonce=56DBD7A69FE44FDE805F6C187CD04C2443EF7163146DD5AF%2DB1E08AF15E5D7E70D23A3517722700808E31BAB9A8CEFD8DB11EA27C12011C69&redirect%5Furi=https%3A%2F%2Felectrohuilaco%2Dmy%2Esharepoint%2Ecom%2F%5Fforms%2Fdefault%2Easpx&state=OD0w&claims=%7B%22id%5Ftoken%22%3A%7B%22xms%5Fcc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&wsucxt=1&cobrandid=11bd8083%2D87e0%2D41b5%2Dbb78%2D0bc43c8a8e8a&client%2Drequest%2Did=79af98a1%2D5032%2D8000%2D95a0%2D6f4e81a4cb0e&sso_reload=true" style={{ color: 'white', textDecoration: 'none' }}>
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
            <a href='https://creg.gov.co/' target='_blank'><img src="/images/logo_creg.png" alt="CREG" style={{ height: '40px', width: 'auto' }} /></a>
            
            {/* Logo UPME */}
            <a href='https://www1.upme.gov.co/' target='_blank'><img src="/images/logo-upme.png" alt="UPME" style={{ height: '40px', width: 'auto' }} /></a>
            
            {/* Logo Superservicios */}
            <a href='https://www.superservicios.gov.co/' target='_blank'><img src="/images/superservicios.png" alt="Superservicios" style={{ height: '40px', width: 'auto' }} /></a>            
            {/* Logo circular (quizás MinEnergia o alguna certificación) */}
            <a href='https://unglobalcompact.org/' target='_blank'><img src="/images/global.png.webp" alt="Ministerio de Energía" style={{ height: '40px', width: 'auto' }} /></a>
            
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