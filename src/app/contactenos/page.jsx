'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, ChevronRight } from 'lucide-react';

export default function ContactoPage() {
    // Estado para el formulario
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: '',
        tipoPQRSD: 'peticion',
        aceptaPolitica: false
    });
    
    // Estado para controlar errores de validación
    const [errors, setErrors] = useState({});
    
    // Estado para controlar el mensaje de éxito
    const [successMessage, setSuccessMessage] = useState('');
    
    // Estado para controlar las oficinas expandidas
    const [expandedOffices, setExpandedOffices] = useState([]);
    
    // Función para manejar el cambio en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        
        // Limpiar el error del campo si existe
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };
    
    // Función para validar el formulario
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Ingrese un correo electrónico válido';
        }
        
        if (!formData.telefono.trim()) {
            newErrors.telefono = 'El teléfono es requerido';
        }
        
        if (!formData.asunto.trim()) {
            newErrors.asunto = 'El asunto es requerido';
        }
        
        if (!formData.mensaje.trim()) {
            newErrors.mensaje = 'El mensaje es requerido';
        }
        
        if (!formData.aceptaPolitica) {
            newErrors.aceptaPolitica = 'Debe aceptar la política de tratamiento de datos';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Aquí iría la lógica para enviar el formulario al backend
            console.log('Formulario enviado:', formData);
            
            // Mostrar mensaje de éxito
            setSuccessMessage('Su mensaje ha sido enviado con éxito. Pronto nos pondremos en contacto con usted.');
            
            // Limpiar el formulario
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                asunto: '',
                mensaje: '',
                tipoPQRSD: 'peticion',
                aceptaPolitica: false
            });
            
            // Limpiar el mensaje después de 5 segundos
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        } else {
            console.log('El formulario contiene errores');
        }
    };
    
    // Función para expandir/contraer oficinas
    const toggleOffice = (officeId) => {
        if (expandedOffices.includes(officeId)) {
            setExpandedOffices(expandedOffices.filter(id => id !== officeId));
        } else {
            setExpandedOffices([...expandedOffices, officeId]);
        }
    };
    
    // Verificar si una oficina está expandida
    const isOfficeExpanded = (officeId) => {
        return expandedOffices.includes(officeId);
    };
    
    // Datos de las oficinas
    const oficinas = [
        {
            id: 'neiva',
            nombre: 'Sede Principal Neiva',
            direccion: 'Carrera 8 No. 7-69, Neiva, Huila',
            telefono: '(608) 871 9020',
            horario: 'Lunes a Viernes: 7:00 am - 4:00 pm',
            email: 'info@electrohuila.com.co',
            coordenadas: {
                lat: 2.927,
                lng: -75.289
            }
        },
        {
            id: 'pitalito',
            nombre: 'Oficina Pitalito',
            direccion: 'Calle 6 No. 4-85, Pitalito, Huila',
            telefono: '(608) 836 2425',
            horario: 'Lunes a Viernes: 7:00 am - 4:00 pm',
            email: 'pitalito@electrohuila.com.co',
            coordenadas: {
                lat: 1.851,
                lng: -76.051
            }
        },
        {
            id: 'garzon',
            nombre: 'Oficina Garzón',
            direccion: 'Carrera 10 No. 8-45, Garzón, Huila',
            telefono: '(608) 833 3909',
            horario: 'Lunes a Viernes: 7:00 am - 4:00 pm',
            email: 'garzon@electrohuila.com.co',
            coordenadas: {
                lat: 2.198,
                lng: -75.627
            }
        },
        {
            id: 'labplata',
            nombre: 'Oficina La Plata',
            direccion: 'Carrera 4 No. 5-36, La Plata, Huila',
            telefono: '(608) 837 0200',
            horario: 'Lunes a Viernes: 7:00 am - 4:00 pm',
            email: 'laplata@electrohuila.com.co',
            coordenadas: {
                lat: 2.385,
                lng: -75.890
            }
        }
    ];
    
    // Canales de atención
    const canalesAtencion = [
        {
            id: 'telefono',
            titulo: 'Línea de Atención Telefónica',
            descripcion: 'Para peticiones, quejas, reclamos, solicitudes y denuncias',
            datos: [
                { valor: '(608) 871 9020', descripcion: 'Línea Principal' },
                { valor: '01 8000 918 034', descripcion: 'Línea Gratuita Nacional' },
                { valor: '115', descripcion: 'Daños y Emergencias' }
            ],
            icono: <Phone size={24} />
        },
        {
            id: 'email',
            titulo: 'Correos Electrónicos',
            descripcion: 'Escriba sus inquietudes o solicitudes',
            datos: [
                { valor: 'info@electrohuila.com.co', descripcion: 'Información General' },
                { valor: 'pqrs@electrohuila.com.co', descripcion: 'Peticiones, Quejas y Reclamos' },
                { valor: 'notificaciones@electrohuila.com.co', descripcion: 'Notificaciones Judiciales' }
            ],
            icono: <Mail size={24} />
        },
        {
            id: 'presencial',
            titulo: 'Atención Presencial',
            descripcion: 'Visite nuestras oficinas',
            datos: [
                { valor: 'Carrera 8 No. 7-69, Neiva', descripcion: 'Sede Principal' },
                { valor: 'Lunes a Viernes', descripcion: '7:00 am - 4:00 pm' }
            ],
            icono: <MapPin size={24} />
        }
    ];

    return (
        <div>
            {/* Hero Section con banner personalizado */}
            <div className="hero" style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.47), rgba(0, 0, 0, 0.42)), url('/images/contacto.jpg') no-repeat center center",
                backgroundSize: "cover",
                padding: "80px 0",
                color: "white",
                textAlign: "center"
            }}>
                <div className="container">
                    <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>Contáctenos</h1>
                    <p style={{ fontSize: "18px", maxWidth: "800px", margin: "0 auto" }}>
                        Estamos a su disposición para atender sus inquietudes, solicitudes y sugerencias.
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '60px 0' }}>
                {/* Breadcrumb */}
                <div className="breadcrumb" style={{ marginBottom: '30px' }}>
                    <Link href="/" style={{ color: '#f27b13', textDecoration: 'none' }}>Inicio</Link> / 
                    <span style={{ marginLeft: '5px' }}>Contáctenos</span>
                </div>
                
                {/* Canales de atención */}
                <div style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', marginBottom: '30px', color: '#333', borderBottom: '2px solid #0098d9', paddingBottom: '10px' }}>
                        Canales de Atención
                    </h2>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '30px'
                    }}>
                        {canalesAtencion.map((canal) => (
                            <div key={canal.id} style={{
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                padding: '30px',
                                boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
                                border: '1px solid #eee'
                            }}>
                                <div style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '20px'
                                }}>
                                    <div style={{
                                        backgroundColor: '#e9f7fe',
                                        borderRadius: '50%',
                                        width: '50px',
                                        height: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: '15px',
                                        color: '#0098d9'
                                    }}>
                                        {canal.icono}
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '20px', color: '#333' }}>
                                        {canal.titulo}
                                    </h3>
                                </div>
                                <p style={{ color: '#555', marginBottom: '20px', fontSize: '14px' }}>
                                    {canal.descripcion}
                                </p>
                                <ul style={{ 
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0
                                }}>
                                    {canal.datos.map((dato, index) => (
                                        <li key={index} style={{ 
                                            marginBottom: '10px', 
                                            paddingBottom: '10px',
                                            borderBottom: index !== canal.datos.length - 1 ? '1px solid #f0f0f0' : 'none'
                                        }}>
                                            <div style={{ fontWeight: 'bold', color: '#0098d9', marginBottom: '5px' }}>
                                                {dato.valor}
                                            </div>
                                            <div style={{ fontSize: '14px', color: '#777' }}>
                                                {dato.descripcion}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Formulario y Mapa */}
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '40px',
                    marginBottom: '60px',
                    '@media (max-width: 768px)': {
                        gridTemplateColumns: '1fr',
                    }
                }}>
                    {/* Formulario de contacto */}
                    <div>
                        <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#333' }}>
                            Formulario de Contacto
                        </h2>
                        
                        {successMessage && (
                            <div style={{
                                backgroundColor: '#e1f5e8',
                                color: '#28a745',
                                padding: '15px',
                                borderRadius: '5px',
                                marginBottom: '20px',
                                fontWeight: 'bold'
                            }}>
                                {successMessage}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '20px' }}>
                                <label 
                                    htmlFor="tipoPQRSD"
                                    style={{ 
                                        display: 'block', 
                                        marginBottom: '5px', 
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }}
                                >
                                    Tipo de Solicitud *
                                </label>
                                <select
                                    id="tipoPQRSD"
                                    name="tipoPQRSD"
                                    value={formData.tipoPQRSD}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px 15px',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                        fontSize: '16px'
                                    }}
                                >
                                    <option value="peticion">Petición</option>
                                    <option value="queja">Queja</option>
                                    <option value="reclamo">Reclamo</option>
                                    <option value="sugerencia">Sugerencia</option>
                                    <option value="denuncia">Denuncia</option>
                                </select>
                            </div>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <label 
                                    htmlFor="nombre"
                                    style={{ 
                                        display: 'block', 
                                        marginBottom: '5px', 
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }}
                                >
                                    Nombre Completo *
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px 15px',
                                        border: errors.nombre ? '1px solid #dc3545' : '1px solid #ddd',
                                        borderRadius: '5px',
                                        fontSize: '16px'
                                    }}
                                />
                                {errors.nombre && (
                                    <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                                        {errors.nombre}
                                    </div>
                                )}
                            </div>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <label 
                                    htmlFor="email"
                                    style={{ 
                                        display: 'block', 
                                        marginBottom: '5px', 
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }}
                                >
                                    Correo Electrónico *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px 15px',
                                        border: errors.email ? '1px solid #dc3545' : '1px solid #ddd',
                                        borderRadius: '5px',
                                        fontSize: '16px'
                                    }}
                                />
                                {errors.email && (
                                    <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <label 
                                    htmlFor="telefono"
                                    style={{ 
                                        display: 'block', 
                                        marginBottom: '5px', 
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }}
                                >
                                    Teléfono *
                                </label>
                                <input
                                    type="tel"
                                    id="telefono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px 15px',
                                        border: errors.telefono ? '1px solid #dc3545' : '1px solid #ddd',
                                        borderRadius: '5px',
                                        fontSize: '16px'
                                    }}
                                />
                                {errors.telefono && (
                                    <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                                        {errors.telefono}
                                    </div>
                                )}
                            </div>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <label 
                                    htmlFor="asunto"
                                    style={{ 
                                        display: 'block', 
                                        marginBottom: '5px', 
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }}
                                >
                                    Asunto *
                                </label>
                                <input
                                    type="text"
                                    id="asunto"
                                    name="asunto"
                                    value={formData.asunto}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px 15px',
                                        border: errors.asunto ? '1px solid #dc3545' : '1px solid #ddd',
                                        borderRadius: '5px',
                                        fontSize: '16px'
                                    }}
                                />
                                {errors.asunto && (
                                    <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                                        {errors.asunto}
                                    </div>
                                )}
                            </div>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <label 
                                    htmlFor="mensaje"
                                    style={{ 
                                        display: 'block', 
                                        marginBottom: '5px', 
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }}
                                >
                                    Mensaje *
                                </label>
                                <textarea
                                    id="mensaje"
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleInputChange}
                                    rows={5}
                                    style={{
                                        width: '100%',
                                        padding: '10px 15px',
                                        border: errors.mensaje ? '1px solid #dc3545' : '1px solid #ddd',
                                        borderRadius: '5px',
                                        fontSize: '16px',
                                        resize: 'vertical'
                                    }}
                                ></textarea>
                                {errors.mensaje && (
                                    <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                                        {errors.mensaje}
                                    </div>
                                )}
                            </div>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ 
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    cursor: 'pointer'
                                }}>
                                    <input
                                        type="checkbox"
                                        name="aceptaPolitica"
                                        checked={formData.aceptaPolitica}
                                        onChange={handleInputChange}
                                        style={{
                                            marginRight: '10px',
                                            marginTop: '3px'
                                        }}
                                    />
                                    <span style={{ fontSize: '14px', color: '#555' }}>
                                        Acepto la <Link href="/politicas-privacidad" style={{ color: '#0098d9' }}>Política de Tratamiento de Datos Personales</Link> *
                                    </span>
                                </label>
                                {errors.aceptaPolitica && (
                                    <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                                        {errors.aceptaPolitica}
                                    </div>
                                )}
                            </div>
                            
                            <div>
                                <button 
                                    type="submit"
                                    style={{
                                        backgroundColor: '#0098d9',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        padding: '12px 25px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Send size={16} style={{ marginRight: '8px' }} />
                                    Enviar Mensaje
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    {/* Mapa de ubicación */}
                    <div>
                        <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#333' }}>
                            Ubicación
                        </h2>
                        
                        <div style={{
  width: '100%',
  height: '400px',
  marginBottom: '20px',
  borderRadius: '8px',
  overflow: 'hidden',
  border: '1px solid #ddd'
}}>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.5632870255567!2d-75.3097839!3d2.9410099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b74930d148179%3A0x2036b3da8145fb0!2sElectrificadora%20Del%20Huila!5e0!3m2!1ses-419!2sco!4v1744641852512!5m2!1ses-419!2sco"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>

                        
                        <div>
                            <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>
                                Nuestras Sedes
                            </h3>
                            
                            {oficinas.map((oficina) => (
                                <div key={oficina.id} style={{
                                    marginBottom: '10px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '5px',
                                    overflow: 'hidden'
                                }}>
                                    <div 
                                        onClick={() => toggleOffice(oficina.id)}
                                        style={{
                                            padding: '15px',
                                            backgroundColor: isOfficeExpanded(oficina.id) ? '#f8f9fa' : '#fff',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#333' }}>
                                            {oficina.nombre}
                                        </h4>
                                        {isOfficeExpanded(oficina.id) ? 
                                            <ChevronDown size={18} color="#0098d9" /> : 
                                            <ChevronRight size={18} color="#0098d9" />
                                        }
                                    </div>
                                    
                                    {isOfficeExpanded(oficina.id) && (
                                        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderTop: '1px solid #e0e0e0' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                                <MapPin size={16} color="#0098d9" style={{ marginRight: '10px' }} />
                                                <span>{oficina.direccion}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                                <Phone size={16} color="#0098d9" style={{ marginRight: '10px' }} />
                                                <span>{oficina.telefono}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                                <Mail size={16} color="#0098d9" style={{ marginRight: '10px' }} />
                                                <span>{oficina.email}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Clock size={16} color="#0098d9" style={{ marginRight: '10px' }} />
                                                <span>{oficina.horario}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Información adicional */}
                <div style={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    padding: '30px',
                    marginBottom: '30px'
                }}>
                    <h3 style={{ fontSize: '22px', marginBottom: '15px', color: '#0098d9' }}>
                        Información Importante
                    </h3>
                    <p style={{ marginBottom: '15px', color: '#555', lineHeight: '1.6' }}>
                        ElectroHuila garantiza la protección de sus datos personales de acuerdo con la 
                        Ley 1581 de 2012 y el Decreto 1377 de 2013. La información que usted nos suministra 
                        será utilizada únicamente para los fines autorizados por usted y para dar trámite a sus
                        solicitudes, quejas, reclamos o sugerencias.
                    </p>
                    <p style={{ color: '#555', lineHeight: '1.6' }}>
                        Recuerde que para trámites relacionados con su facturación, solicitudes técnicas y 
                        reportes de daños, debe utilizar los canales específicos dispuestos para ello, 
                        indicados en nuestra sección de <Link href="/servicios" style={{ color: '#0098d9' }}>Servicios</Link>.
                    </p>
                </div>
            </div>
            
            {/* CTA Section */}
            <div className="cta" style={{
                backgroundColor: '#0a3d62',
                color: 'white',
                padding: '60px 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Estamos para servirle</h2>
                    <p style={{ fontSize: '18px', marginBottom: '30px', maxWidth: '700px', margin: '0 auto 30px' }}>
                        ElectroHuila está comprometida con brindar un servicio de calidad a todos nuestros usuarios.
                        Su opinión es muy importante para nosotros.
                    </p>
                    <Link 
                        href="/preguntas-frecuentes" 
                        style={{
                            backgroundColor: '#f27b13',
                            color: 'white',
                            padding: '14px 28px',
                            borderRadius: '5px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            display: 'inline-block',
                            fontSize: '16px'
                        }}
                    >
                        Preguntas Frecuentes
                    </Link>
                </div>
            </div>
        </div>
    );
}