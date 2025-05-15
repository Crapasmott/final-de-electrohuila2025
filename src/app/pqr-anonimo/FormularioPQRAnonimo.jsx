// Manejar envío del formulario
const onSubmit = async (data) => {
  // Verificar CAPTCHA antes de enviar
  if (!verifyCaptcha(data.captcha)) {
    setCaptchaError(true);
    setCaptchaValue(generateCaptcha());
    return;
  }
  
  setCaptchaError(false);
  setIsSubmitting(true);
  
  try {
    // Generar código de seguimiento
    const randomCode = 'PQR-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    
    // Preparar los datos para la solicitud
    const formData = {
      // Estos son solo los datos que quieres enviar por correo
      from_name: "Sistema PQR Electrohuila",
      to_email: "crapas76@gmail.com", // Correo donde quieres recibir las notificaciones
      subject: `Nueva PQR Anónima - ${data.tipoSolicitud || 'No especificado'}`,
      
      // Detalles principales
      tipo_solicitud: data.tipoSolicitud || 'No especificado',
      descripcion: data.descripcion || 'No especificada',
      tracking_code: randomCode,
      
      // Información de ubicación
      departamento: data.departamento || 'Huila',
      municipio: data.municipio || 'No especificado',
      ubicacion: data.ubicacion || 'No especificada',
      fecha: data.fecha || 'No especificada',
      
      // Información de servicios
      servicios_energia: data.servicios?.energia ? 'Sí' : 'No',
      servicios_medidor: data.servicios?.medidor ? 'Sí' : 'No',
      servicios_facturacion: data.servicios?.facturacion ? 'Sí' : 'No',
      servicios_atencion: data.servicios?.atencion ? 'Sí' : 'No',
      servicios_instalaciones: data.servicios?.instalaciones ? 'Sí' : 'No',
      servicios_otro: data.servicios?.otro ? (data.servicios.otroEspecificacion || 'Sí') : 'No',
      
      // Información de contacto
      desea_contacto: data.deseaContacto === 'si' ? 'Sí' : 'No (anónimo)',
      telefono: data.telefono || 'No proporcionado',
      correo: data.correo || 'No proporcionado',
      
      // Información adicional
      medio_difusion: data.medioDifusion || 'No especificado',
      fecha_envio: new Date().toLocaleString()
    };
    
    // Enviar correo usando EmailJS
    // REEMPLAZA ESTOS VALORES con tus propios IDs de EmailJS
    const response = await emailjs.send(
      'service_id',  // Reemplaza con tu Service ID de EmailJS
      'template_id', // Reemplaza con tu Template ID de EmailJS (puede ser la plantilla predeterminada)
      formData,
      'public_key'   // Reemplaza con tu Public Key de EmailJS
    );
    
    if (response.status !== 200) {
      throw new Error('Error al enviar el correo electrónico');
    }
    
    setTrackingCode(randomCode);
    setSubmitSuccess(true);
    reset(); // Limpiar formulario
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    alert('Hubo un error al enviar tu solicitud. Por favor, intenta nuevamente.');
  } finally {
    setIsSubmitting(false);
  }
};