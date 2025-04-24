import Link from 'next/link';
import Image from 'next/image';
import ChatOption from '../components/ChatOption';

export default function Home() {
  return (
    <>
      {/* Sección Hero con mensaje principal */}
      <section className="hero">
        <div className="container">
          <h1>Electrificadora del Huila</h1>
          <p>Brindamos energía para el desarrollo de nuestra región con calidad, sostenibilidad y compromiso social.</p>
          <Link href="https://enlinea.electrohuila.com.co/generate-invoice/" className="btn btn-primary">Consultar Factura</Link>
        </div>
      </section>

      {/* Sección de acceso rápido */}
      <section className="quick-access">
        <div className="container">
          <div className="quick-access-cards">
            <div className="quick-card">
              <div className="icon-container">
                <Image 
                  src="/images/iconos/factura.png" 
                  alt="Pago de facturas" 
                  width={48} 
                  height={48} 
                  className="card-icon animated-icon"
                />
              </div>
              <h3>Pago de Facturas</h3>
              <p>Paga tu factura de energía de forma rápida y segura por diferentes medios.</p>
              <Link href="https://pagos.electrohuila.com.co/" className="btn-green">Pagar Ahora</Link>
            </div>
            <div className="quick-card">
              <div className="icon-container">
                <Image 
                  src="/images/iconos/consulta.png" 
                  alt="Consulta de facturas" 
                  width={48} 
                  height={48}
                  className="card-icon animated-icon"
                />
              </div>
              <h3>Consulta de Facturas</h3>
              <p>Consulta y descarga tus facturas de los últimos meses.</p>
              <Link href="https://enlinea.electrohuila.com.co/generate-invoice/" className="btn-green">Consultar</Link>
            </div>
            <div className="quick-card">
              <div className="icon-container">
                <Image 
                  src="/images/iconos/solicitud-de-cotizacion.png" 
                  alt="Solicitudes AGPE" 
                  width={48} 
                  height={48}
                  className="card-icon animated-icon"
                />
              </div>
              <h3>Solicitudes de Generación</h3>
              <p>La resolución CREG 174 publica en el diario oficio el 23 de noviembre del 2021.</p>
              <Link href="http://35.184.36.98/solicitante/" className="btn-green">Solicitudes AGPE</Link>
            </div>
            <div className="quick-card">
              <div className="icon-container">
                <Image 
                  src="/images/iconos/electro.png" 
                  alt="Electrohuila en línea" 
                  width={48} 
                  height={48}
                  className="card-icon animated-icon"
                />
              </div>
              <h3>Electrohuila en Línea</h3>
              <p>Accede a todos nuestros servicios digitales desde cualquier lugar.</p>
              <Link href="https://enlinea.electrohuila.com.co/" className="btn-green">Ingresar</Link>
            </div>
            <div className="quick-card">
              <div className="icon-container">
                <Image 
                  src="/images/iconos/conversacion.png" 
                  alt="Línea de transparencia" 
                  width={48} 
                  height={48}
                  className="card-icon animated-icon"
                />
              </div>
              <h3>Línea de Transparencia</h3>
              <p>Canal confidencial para reportar casos de corrupción o conductas indebidas.</p>
              <Link href="#" className="btn-green">Reporte AQUÍ</Link>
            </div>
            <div className="quick-card">
              <div className="icon-container">
                <Image 
                  src="/images/iconos/identificacion.png" 
                  alt="Autogeneradores" 
                  width={48} 
                  height={48}
                  className="card-icon animated-icon"
                />
              </div>
              <h3>Autogeneradores</h3>
              <p>Permiten al usuario gestionar de una manera eficiente los objetivos.</p>
              <Link href="http://200.21.4.66:8070/ehfact2/" className="btn-green">Autogeneradores</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="main-content">
        <div className="container">
          <div className="section-title">
            <h2>Nuestros Servicios</h2>
            <p>Conoce todos los servicios que ofrecemos para nuestros usuarios y clientes.</p>
          </div>
          <div className="services">
            <div className="service-card">
              <img src="/images/imgelectrica.jpg" alt="Servicios Residenciales" />
              <div className="service-content">
                <h3>Servicios Residenciales</h3>
                <p>Ofrecemos servicios confiables de energía eléctrica para todos los hogares del Huila.</p>
                <Link href="#" className="btn btn-primary">Ver Más</Link>
              </div>
            </div>
            <div className="service-card">
              <img src="/images/imgelectrica.jpg" alt="Servicios Comerciales" />
              <div className="service-content">
                <h3>Servicios Comerciales</h3>
                <p>Soluciones energéticas para negocios, oficinas y establecimientos comerciales.</p>
                <Link href="#" className="btn btn-primary">Ver Más</Link>
              </div>
            </div>
            <div className="service-card">
              <img src="/images/imgelectrica.jpg" alt="Servicios Industriales" />
              <div className="service-content">
                <h3>Servicios Industriales</h3>
                <p>Energía de alta calidad para el sector industrial con planes especializados.</p>
                <Link href="#" className="btn btn-primary">Ver Más</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de noticias y actualizaciones */}
      <section className="updates">
        <div className="container">
          <div className="section-title">
            <h2>Noticias y Actualizaciones</h2>
            <p>Mantente informado sobre nuestras actividades, proyectos y novedades.</p>
          </div>
          <div className="news-grid">
            <div className="news-card">
              <img src="/images/mantenimiento.jpg" alt="Noticia 1" />
              <div className="news-content">
                <div className="news-date">20 de Febrero, 2025</div>
                <h3>Mantenimiento programado en sector norte</h3>
                <p>Se realizará mantenimiento preventivo en redes del sector norte. Conozca los horarios y zonas afectadas.</p>
                <Link href="#" className="btn btn-primary">Leer Más</Link>
              </div>
            </div>
            <div className="news-card">
              <img src="/images/factura.jpg" alt="Noticia 2" />
              <div className="news-content">
                <div className="news-date">15 de Febrero, 2025</div>
                <h3>Nuevo sistema de facturación digital</h3>
                <p>Implementamos un nuevo sistema de facturación digital para mejorar la experiencia de nuestros usuarios.</p>
                <Link href="#" className="btn btn-primary">Leer Más</Link>
              </div>
            </div>
            <div className="news-card">
              <img src="/images/energia-reno.jpg" alt="Noticia 3" />
              <div className="news-content">
                <div className="news-date">10 de Febrero, 2025</div>
                <h3>Programa de energías renovables</h3>
                <p>Conoce nuestro nuevo programa de implementación de energías renovables para el departamento.</p>
                <Link href="#" className="btn btn-primary">Leer Más</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de llamado a la acción */}
      <section className="cta">
        <div className="container">
          <h2>¿Necesitas ayuda con tu servicio?</h2>
          <p>Nuestro equipo de atención al cliente está disponible para atender tus inquietudes y solicitudes.</p>
          <Link href="#" className="btn btn-secondary">Contáctanos Ahora</Link>
        </div>
      </section>

      {/* Botón flotante de servicios con opciones desplegables */}
      <div className="floating-services">
        <div className="service-button">
          <div className="service-icon">
            <Image 
              src="/images/iconos/atencion-al-cliente.png" 
              alt="Servicios" 
              width={24} 
              height={24} 
            />
            <span>Contactanos</span>
          </div>
          
          <div className="service-options">
            <a href="mailto:contacto@electrohuila.com.co" className="service-option">
              <Image 
                src="/images/iconos/enviar-correo.png" 
                alt="Correo" 
                width={20} 
                height={20}
              />
              <span>Correo</span>
            </a>
            
            {/* Aquí reemplazamos el enlace con onClick por el componente cliente */}
            <ChatOption />
            
            <a href="https://wa.me/573134354436" className="service-option">
              <Image 
                src="/images/iconos/whatsapp.png" 
                alt="WhatsApp" 
                width={20} 
                height={20}
              />
              <span>WhatsApp</span>
            </a>
            
            <a href="/pqr" className="service-option">
              <Image 
                src="/images/iconos/quejarse.png" 
                alt="PQR" 
                width={20} 
                height={20}
              />
              <span>PQR</span>
            </a>
          </div>
        </div>
      </div>

      
<Link href="https://pagos.electrohuila.com.co/" className="fixed-pay-btn">
  <Image 
    src="/images/iconos/factura.png" 
    alt="Pagar factura" 
    width={24} 
    height={24} 
    className="mr-2"
  />
  <span className="hidden sm:inline">Pagar Factura</span>
 
</Link>
    </>
  );
}