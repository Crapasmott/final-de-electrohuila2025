'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './FormularioPQRAnonimo.module.css';

const FormularioPQRAnonimo = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  
  // Observar si el usuario desea ser contactado
  const deseaContacto = watch('deseaContacto') === 'si';

  // Lista de municipios del Huila
  const municipiosHuila = [
    'Neiva',
    'Acevedo',
    'Agrado',
    'Aipe',
    'Algeciras',
    'Altamira',
    'Baraya',
    'Campoalegre',
    'Colombia',
    'Elías',
    'Garzón',
    'Gigante',
    'Guadalupe',
    'Hobo',
    'Íquira',
    'Isnos',
    'La Argentina',
    'La Plata',
    'Nátaga',
    'Oporapa',
    'Paicol',
    'Palermo',
    'Palestina',
    'Pital',
    'Pitalito',
    'Rivera',
    'Saladoblanco',
    'San Agustín',
    'Santa María',
    'Suaza',
    'Tarqui',
    'Tello',
    'Teruel',
    'Tesalia',
    'Timaná',
    'Villavieja',
    'Yaguará'
  ];

  // Generar un CAPTCHA simple
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptchaAnswer(String(num1 + num2));
    return `¿Cuánto es ${num1} + ${num2}?`;
  };

  // Inicializar CAPTCHA cuando se carga el componente
  React.useEffect(() => {
    setCaptchaValue(generateCaptcha());
  }, []);

  // Verificar CAPTCHA
  const verifyCaptcha = (userAnswer) => {
    return userAnswer === captchaAnswer;
  };

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
      // Aquí implementarías la lógica de envío a tu API
      // const response = await fetch('/api/pqr-anonimo', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // Simulación de respuesta exitosa
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generar código de seguimiento - en producción esto vendría del backend
      const randomCode = 'PQR-' + Math.random().toString(36).substring(2, 10).toUpperCase();
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

  // Si se ha enviado con éxito, mostrar mensaje de confirmación
  if (submitSuccess) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successMessage}>
          <h2>¡Gracias por tu solicitud!</h2>
          <p>Hemos recibido tu PQR de forma anónima.</p>
          <p>Tu código de seguimiento es: <strong>{trackingCode}</strong></p>
          <p>Guarda este código para consultar el estado de tu solicitud posteriormente.</p>
          <button 
            className={styles.button}
            onClick={() => {
              setSubmitSuccess(false);
              setCaptchaValue(generateCaptcha());
            }}
          >
            Enviar otra solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Formulario PQR Anónimo</h1>
      <p className={styles.subtitle}>
        Puedes presentar tu Petición, Queja, Reclamo o Sugerencia de forma anónima. 
        No es obligatorio proporcionar tus datos personales.
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Tipo de solicitud */}
        <div className={styles.formGroup}>
          <label htmlFor="tipoSolicitud" className={styles.label}>
            Tipo de solicitud <span className={styles.required}>*</span>
          </label>
          <select 
            id="tipoSolicitud"
            className={`${styles.select} ${errors.tipoSolicitud ? styles.error : ''}`}
            {...register('tipoSolicitud', { required: true })}
          >
            <option value="">Seleccione una opción</option>
            <option value="peticion">Petición</option>
            <option value="queja">Queja</option>
            <option value="reclamo">Reclamo</option>
            <option value="sugerencia">Sugerencia</option>
            <option value="felicitacion">Felicitación</option>
          </select>
          {errors.tipoSolicitud && <span className={styles.errorMessage}>Este campo es obligatorio</span>}
        </div>

        {/* Descripción del caso */}
        <div className={styles.formGroup}>
          <label htmlFor="descripcion" className={styles.label}>
            Descripción detallada del caso <span className={styles.required}>*</span>
          </label>
          <textarea
            id="descripcion"
            rows={6}
            className={`${styles.textarea} ${errors.descripcion ? styles.error : ''}`}
            placeholder="Describe claramente tu solicitud, incidente o inconformidad..."
            {...register('descripcion', { 
              required: true,
              minLength: {
                value: 20,
                message: 'La descripción debe tener al menos 20 caracteres'
              }
            })}
          ></textarea>
          {errors.descripcion && (
            <span className={styles.errorMessage}>
              {errors.descripcion.message || 'Este campo es obligatorio'}
            </span>
          )}
        </div>

        {/* Ubicación del hecho */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Ubicación del hecho <span className={styles.required}>*</span></legend>
          
          <div className={styles.formGroup}>
            <label htmlFor="departamento" className={styles.label}>Departamento</label>
            <select 
              id="departamento"
              className={styles.select}
              {...register('departamento')}
              defaultValue="Huila"
              disabled // Solo es Huila, deshabilitamos la selección
            >
              <option value="Huila">Huila</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="municipio" className={styles.label}>Municipio</label>
            <select
              id="municipio"
              className={`${styles.select} ${errors.municipio ? styles.error : ''}`}
              {...register('municipio', { required: true })}
            >
              <option value="">Seleccione un municipio</option>
              {municipiosHuila.map((municipio) => (
                <option key={municipio} value={municipio}>{municipio}</option>
              ))}
            </select>
            {errors.municipio && <span className={styles.errorMessage}>Este campo es obligatorio</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="ubicacion" className={styles.label}>Dirección o ubicación aproximada</label>
            <input
              type="text"
              id="ubicacion"
              className={styles.input}
              placeholder="Lugar aproximado (opcional)"
              {...register('ubicacion')}
            />
          </div>
        </fieldset>

        {/* Fecha del hecho */}
        <div className={styles.formGroup}>
          <label htmlFor="fecha" className={styles.label}>Fecha del hecho (opcional)</label>
          <input
            type="date"
            id="fecha"
            className={styles.input}
            max={new Date().toISOString().split('T')[0]}
            {...register('fecha')}
          />
        </div>

        {/* Servicio relacionado */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Servicio relacionado <span className={styles.required}>*</span></legend>
          
          <div className={styles.checkboxGroup}>
            <div className={styles.checkbox}>
              <input 
                type="checkbox" 
                id="servicioEnergia" 
                {...register('servicios.energia')} 
              />
              <label htmlFor="servicioEnergia">Energía</label>
            </div>
            
            <div className={styles.checkbox}>
              <input 
                type="checkbox" 
                id="servicioMedidor" 
                {...register('servicios.medidor')} 
              />
              <label htmlFor="servicioMedidor">Medidor</label>
            </div>
            
            <div className={styles.checkbox}>
              <input 
                type="checkbox" 
                id="servicioFacturacion" 
                {...register('servicios.facturacion')} 
              />
              <label htmlFor="servicioFacturacion">Facturación</label>
            </div>
            
            <div className={styles.checkbox}>
              <input 
                type="checkbox" 
                id="servicioAtencion" 
                {...register('servicios.atencion')} 
              />
              <label htmlFor="servicioAtencion">Atención al usuario</label>
            </div>
            
            <div className={styles.checkbox}>
              <input 
                type="checkbox" 
                id="servicioInstalaciones" 
                {...register('servicios.instalaciones')} 
              />
              <label htmlFor="servicioInstalaciones">Instalaciones técnicas</label>
            </div>
            
            <div className={styles.checkboxOtro}>
              <input 
                type="checkbox" 
                id="servicioOtro" 
                {...register('servicios.otro')} 
              />
              <label htmlFor="servicioOtro">Otro:</label>
              <input
                type="text"
                className={styles.inputInline}
                placeholder="Especifique"
                {...register('servicios.otroEspecificacion')}
                aria-label="Otro servicio relacionado"
              />
            </div>
          </div>
          
          {errors.servicios && <span className={styles.errorMessage}>Seleccione al menos un servicio</span>}
        </fieldset>

        {/* Medio por el cual se enteró */}
        <div className={styles.formGroup}>
          <label htmlFor="medioDifusion" className={styles.label}>¿Cómo se enteró de este canal? (opcional)</label>
          <select 
            id="medioDifusion"
            className={styles.select}
            {...register('medioDifusion')}
          >
            <option value="">Seleccione una opción</option>
            <option value="pagina_web">Página web</option>
            <option value="redes_sociales">Redes sociales</option>
            <option value="oficina">Oficina de atención</option>
            <option value="factura">Factura del servicio</option>
            <option value="familiar_amigo">Familiar o amigo</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        {/* ¿Desea ser contactado? */}
        <div className={styles.formGroup}>
          <label className={styles.label}>¿Desea ser contactado para seguimiento?</label>
          <div className={styles.radioGroup}>
            <div className={styles.radio}>
              <input 
                type="radio" 
                id="contactoSi" 
                value="si" 
                {...register('deseaContacto')} 
              />
              <label htmlFor="contactoSi">Sí</label>
            </div>
            <div className={styles.radio}>
              <input 
                type="radio" 
                id="contactoNo" 
                value="no"
                defaultChecked
                {...register('deseaContacto')} 
              />
              <label htmlFor="contactoNo">No (anónimo)</label>
            </div>
          </div>
        </div>

        {/* Mostrar campos de contacto solo si el usuario desea ser contactado */}
        {deseaContacto && (
          <div className={styles.contactFields}>
            <h3 className={styles.contactTitle}>Información de contacto</h3>
            
            <div className={styles.formGroup}>
              <label htmlFor="telefono" className={styles.label}>
                Teléfono o celular <span className={styles.required}>*</span>
              </label>
              <input
                type="tel"
                id="telefono"
                className={`${styles.input} ${errors.telefono ? styles.error : ''}`}
                placeholder="Ingrese su número de teléfono o celular"
                {...register('telefono', { 
                  required: deseaContacto,
                  pattern: {
                    value: /^[0-9]{7,10}$/,
                    message: 'Ingrese un número válido (7-10 dígitos)'
                  }
                })}
              />
              {errors.telefono && <span className={styles.errorMessage}>{errors.telefono.message || 'Este campo es obligatorio'}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="correo" className={styles.label}>Correo electrónico (opcional)</label>
              <input
                type="email"
                id="correo"
                className={`${styles.input} ${errors.correo ? styles.error : ''}`}
                placeholder="Ingrese su correo electrónico"
                {...register('correo', {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Ingrese un correo electrónico válido'
                  }
                })}
              />
              {errors.correo && <span className={styles.errorMessage}>{errors.correo.message}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <div className={styles.checkbox}>
                <input 
                  type="checkbox" 
                  id="aceptaPolitica" 
                  className={errors.aceptaPolitica ? styles.error : ''}
                  {...register('aceptaPolitica', { required: deseaContacto })} 
                />
                <label htmlFor="aceptaPolitica">
                  Acepto la <a href="/politica-datos" target="_blank" rel="noopener noreferrer">política de tratamiento de datos personales</a> según Ley 1581 de 2012.
                </label>
              </div>
              {errors.aceptaPolitica && <span className={styles.errorMessage}>Debe aceptar la política de tratamiento de datos</span>}
            </div>
          </div>
        )}

        {/* CAPTCHA */}
        <div className={styles.formGroup}>
          <label htmlFor="captcha" className={styles.label}>
            {captchaValue} <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="captcha"
            className={`${styles.input} ${captchaError ? styles.error : ''}`}
            placeholder="Ingrese la respuesta"
            {...register('captcha', { required: true })}
          />
          {captchaError && <span className={styles.errorMessage}>Respuesta incorrecta, intente nuevamente</span>}
        </div>

        {/* Botón de envío */}
        <div className={styles.submitContainer}>
          <button 
            type="submit" 
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </div>
        
        <div className={styles.disclaimer}>
          <p>
            <strong>Nota:</strong> Esta información será tratada con confidencialidad según lo establecido 
            en la Ley 1755 de 2015 (Derecho de petición) y la Ley 142 de 1994 (Régimen de servicios 
            públicos domiciliarios).
          </p>
        </div>
      </form>
    </div>
  );
};

export default FormularioPQRAnonimo;