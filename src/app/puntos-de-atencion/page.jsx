'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';

export default function PuntosDeAtencionPage() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showSedes, setShowSedes] = useState(true);
  
  // Datos de ejemplo para las sedes
  const sedesData = [
    { 
      id: 1, 
      nombre: "Sede Principal Neiva", 
      direccion: "Calle 8 No. 4-52", 
      telefono: "608 8664600", 
      horario: "Lunes a viernes: 7:00 am - 4:00 pm", 
      lat: 2.9273, 
      lng: -75.2882 
    },
    { 
      id: 2, 
      nombre: "Sede Pitalito", 
      direccion: "Carrera 3 No. 4-15", 
      telefono: "608 8360022", 
      horario: "Lunes a viernes: 7:30 am - 12:00 m y 2:00 pm - 5:30 pm", 
      lat: 1.8532, 
      lng: -76.0529 
    },
    { 
      id: 3, 
      nombre: "Sede Garzón", 
      direccion: "Carrera 9 No. 5-44", 
      telefono: "608 8332533", 
      horario: "Lunes a viernes: 7:30 am - 12:00 m y 2:00 pm - 5:30 pm", 
      lat: 2.1978, 
      lng: -75.6276 
    },
    { 
      id: 4, 
      nombre: "Sede La Plata", 
      direccion: "Carrera 5 No. 5-37", 
      telefono: "608 8370017", 
      horario: "Lunes a viernes: 7:30 am - 12:00 m y 2:00 pm - 5:30 pm", 
      lat: 2.3929, 
      lng: -75.8917 
    },
    { 
      id: 5, 
      nombre: "Sede Campoalegre", 
      direccion: "Carrera 8 No. 8-71", 
      telefono: "608 8380315", 
      horario: "Lunes a viernes: 7:30 am - 12:00 m y 2:00 pm - 5:30 pm", 
      lat: 2.6926, 
      lng: -75.3265 
    }
  ];
  
  // Inicializar el mapa cuando el script de Leaflet se carga
  const initializeMap = () => {
    if (!mapRef.current || mapInstanceRef.current) return;
    
    // Crear instancia del mapa
    const map = L.map(mapRef.current).setView([2.9273, -75.2882], 8);
    
    // Añadir capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Añadir controles de zoom
    L.control.zoom({
      position: 'topleft'
    }).addTo(map);
    
    // Guardar referencia al mapa
    mapInstanceRef.current = map;
    
    // Añadir marcadores para las sedes
    addMarkers();
  };
  
  // Función para añadir marcadores al mapa
  const addMarkers = () => {
    if (!mapInstanceRef.current) return;
    
    // Limpiar marcadores existentes
    mapInstanceRef.current.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });
    
    // Si las sedes están ocultas, no añadir marcadores
    if (!showSedes) return;
    
    // Añadir marcadores para cada sede
    sedesData.forEach(sede => {
      const marker = L.marker([sede.lat, sede.lng]).addTo(mapInstanceRef.current);
      
      // Añadir popup con información
      marker.bindPopup(`
        <div style="min-width: 200px;">
          <h3 style="font-size: 16px; margin-bottom: 8px; color: #1797D5;">${sede.nombre}</h3>
          <p style="margin: 4px 0;"><strong>Dirección:</strong> ${sede.direccion}</p>
          <p style="margin: 4px 0;"><strong>Teléfono:</strong> ${sede.telefono}</p>
          <p style="margin: 4px 0;"><strong>Horario:</strong> ${sede.horario}</p>
        </div>
      `);
    });
  };
  
  // Escuchar cambios en el estado de showSedes
  useEffect(() => {
    if (mapLoaded) {
      addMarkers();
    }
  }, [showSedes, mapLoaded]);
  
  // Manejar carga de script de Leaflet
  const handleMapLoaded = () => {
    setMapLoaded(true);
    initializeMap();
  };
  
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      {/* Scripts para Leaflet */}
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        onLoad={handleMapLoaded}
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      
      {/* Encabezado */}
      <div style={{ 
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: 'white',
        padding: '16px 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
            Puntos de <span style={{ color: '#1797D5' }}>Atención</span>
          </h1>
          <div>
            <Link href="/" style={{ color: '#1797D5', marginRight: '12px', textDecoration: 'none' }}>Inicio</Link>
            <span style={{ color: '#6B7280' }}>| Puntos de Atención</span>
          </div>
        </div>
      </div>
      
      {/* Contenido principal - Mapa */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Contenedor del mapa */}
        <div style={{ position: 'relative', height: '500px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          {/* Mapa */}
          <div 
            ref={mapRef} 
            style={{ width: '100%', height: '100%' }}
          ></div>
          
          {/* Control panel */}
          <div style={{ 
            position: 'absolute', 
            top: '10px', 
            right: '10px',
            zIndex: 1000
          }}>
            <div style={{ 
              backgroundColor: 'white',
              boxShadow: '0 1px 5px rgba(0,0,0,0.2)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                backgroundColor: '#3B82F6',
                color: 'white',
                padding: '8px 16px',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                Puntos de Atención
              </div>
              
              <div style={{ 
                padding: '16px', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <span style={{ fontWeight: 'bold', color: '#4B5563' }}>Sedes ({sedesData.length})</span>
                <button
                  onClick={() => setShowSedes(!showSedes)}
                  style={{ 
                    backgroundColor: showSedes ? '#1F2937' : '#E5E7EB',
                    color: showSedes ? 'white' : '#4B5563',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  {showSedes ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Lista de sedes */}
        <div style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '16px' }}>Nuestras Sedes</h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '24px'
          }}>
            {sedesData.map(sede => (
              <div 
                key={sede.id}
                style={{ 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  backgroundColor: 'white'
                }}
              >
                <div style={{ 
                  padding: '16px', 
                  borderBottom: '1px solid #e5e7eb',
                  backgroundColor: '#1A6192',
                  color: 'white'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0' }}>{sede.nombre}</h3>
                </div>
                
                <div style={{ padding: '16px' }}>
                  <p style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    marginBottom: '8px'
                  }}>
                    <svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg" 
                      style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0 }}
                    >
                      <path 
                        d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z" 
                        stroke="#1A6192"
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                      <path 
                        d="M12 21C16 17 20 13.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 13.4183 8 17 12 21Z" 
                        stroke="#1797D5"
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span><strong>Dirección:</strong> {sede.direccion}</span>
                  </p>
                  
                  <p style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    marginBottom: '8px'
                  }}>
                    <svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg" 
                      style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0 }}
                    >
                      <path 
                        d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12Z" 
                        stroke="#1797D5"
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                      <path 
                        d="M16.5 15.5C16.5 15.5 15 17.5 12 17.5C9 17.5 7.5 15.5 7.5 15.5" 
                        stroke="#1797D5"
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                      <path 
                        d="M8.5 9C8.5 9 8 9.1 8 9.5C8 9.9 8.5 10 8.5 10C8.5 10 9 9.9 9 9.5C9 9.1 8.5 9 8.5 9Z" 
                        fill="#1797D5"
                      />
                      <path 
                        d="M15.5 9C15.5 9 15 9.1 15 9.5C15 9.9 15.5 10 15.5 10C15.5 10 16 9.9 16 9.5C16 9.1 15.5 9 15.5 9Z" 
                        fill="#1797D5"
                      />
                    </svg>
                    <span><strong>Teléfono:</strong> {sede.telefono}</span>
                  </p>
                  
                  <p style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    marginBottom: '8px'
                  }}>
                    <svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg" 
                      style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0 }}
                    >
                      <path 
                        d="M12 8V12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                        stroke="#1797D5"
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span><strong>Horario:</strong> {sede.horario}</span>
                  </p>
                  
                  <button
                    onClick={() => {
                      if (mapInstanceRef.current) {
                        mapInstanceRef.current.setView([sede.lat, sede.lng], 15);
                        setTimeout(() => {
                          mapInstanceRef.current.eachLayer(layer => {
                            if (layer instanceof L.Marker) {
                              const markerLatLng = layer.getLatLng();
                              if (markerLatLng.lat === sede.lat && markerLatLng.lng === sede.lng) {
                                layer.openPopup();
                              }
                            }
                          });
                        }, 500);
                      }
                    }}
                    style={{ 
                      backgroundColor: '#1797D5',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '8px 16px',
                      width: '100%',
                      marginTop: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" 
                        stroke="white"
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                    Ver en el mapa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Información de contacto */}
        <div style={{ 
          backgroundColor: '#f3f4f6', 
          padding: '24px', 
          borderRadius: '8px',
          marginTop: '32px',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>Líneas de atención</h3>
            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                style={{ marginRight: '8px' }}
              >
                <path 
                  d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12Z" 
                  stroke="#1797D5"
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M16.5 15.5C16.5 15.5 15 17.5 12 17.5C9 17.5 7.5 15.5 7.5 15.5" 
                  stroke="#1797D5"
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M8.5 9C8.5 9 8 9.1 8 9.5C8 9.9 8.5 10 8.5 10C8.5 10 9 9.9 9 9.5C9 9.1 8.5 9 8.5 9Z" 
                  fill="#1797D5"
                />
                <path 
                  d="M15.5 9C15.5 9 15 9.1 15 9.5C15 9.9 15.5 10 15.5 10C15.5 10 16 9.9 16 9.5C16 9.1 15.5 9 15.5 9Z" 
                  fill="#1797D5"
                />
              </svg>
              <span><strong>Línea Nacional:</strong> 018000 952 115</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                style={{ marginRight: '8px' }}
              >
                <path 
                  d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12Z" 
                  stroke="#1797D5"
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M16.5 15.5C16.5 15.5 15 17.5 12 17.5C9 17.5 7.5 15.5 7.5 15.5" 
                  stroke="#1797D5"
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M8.5 9C8.5 9 8 9.1 8 9.5C8 9.9 8.5 10 8.5 10C8.5 10 9 9.9 9 9.5C9 9.1 8.5 9 8.5 9Z" 
                  fill="#1797D5"
                />
                <path 
                  d="M15.5 9C15.5 9 15 9.1 15 9.5C15 9.9 15.5 10 15.5 10C15.5 10 16 9.9 16 9.5C16 9.1 15.5 9 15.5 9Z" 
                  fill="#1797D5"
                />
              </svg>
              <span><strong>PBX:</strong> 608 8664600 - 608 8664646</span>
            </p>
          </div>
          
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>Correo electrónico</h3>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                style={{ marginRight: '8px' }}
              >
                <path 
                  d="M21.5 18L14.8571 12M9.14286 12L2.5 18M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z" 
                  stroke="#1797D5"
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span><strong>Email:</strong> contactenos@electrohuila.com.co</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
