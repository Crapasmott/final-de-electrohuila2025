'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import emailjs from '@emailjs/browser'; // Comentado mientras se simula el envío

const PQRAnonimoPage = () => {
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
        'Neiva', 'Acevedo', 'Agrado', 'Aipe', 'Algeciras', 'Altamira', 'Baraya',
        'Campoalegre', 'Colombia', 'Elías', 'Garzón', 'Gigante', 'Guadalupe',
        'Hobo', 'Íquira', 'Isnos', 'La Argentina', 'La Plata', 'Nátaga', 'Oporapa',
        'Paicol', 'Palermo', 'Palestina', 'Pital', 'Pitalito', 'Rivera',
        'Saladoblanco', 'San Agustín', 'Santa María', 'Suaza', 'Tarqui', 'Tello',
        'Teruel', 'Tesalia', 'Timaná', 'Villavieja', 'Yaguará'
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
            // Generar código de seguimiento
            const randomCode = 'PQR-' + Math.random().toString(36).substring(2, 10).toUpperCase();

            // Crear un objeto con los datos del formulario para fines de logging
            const formData = {
                // Información para el correo (cuando se active EmailJS)
                from_name: "Sistema PQR Electrohuila",
                to_email: "reclamos@electrohuila.co",
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

            // Registrar los datos en la consola (para debug)
            console.log('Datos del formulario:', formData);

            // SIMULACIÓN: Simular un envío exitoso
            // En producción, descomentar el código EmailJS y comentar esta simulación
            await new Promise(resolve => setTimeout(resolve, 1000));

            // ===== CÓDIGO EMAILJS (COMENTADO POR AHORA) =====
            // Cuando tengas EmailJS configurado, descomenta este bloque y comenta la simulación de arriba
            /*
            const response = await emailjs.send(
              'TU_SERVICE_ID',  // Reemplaza con tu Service ID de EmailJS
              'TU_TEMPLATE_ID', // Reemplaza con tu Template ID de EmailJS
              formData,
              'TU_PUBLIC_KEY'   // Reemplaza con tu Public Key de EmailJS
            );
            
            if (response.status !== 200) {
              throw new Error(`Error al enviar el correo: ${response.text}`);
            }
            */
            // ===== FIN CÓDIGO EMAILJS =====

            // Si llegamos aquí, el envío fue exitoso
            setTrackingCode(randomCode);
            setSubmitSuccess(true);
            reset(); // Limpiar formulario
        } catch (error) {
            console.error('Error detallado:', error);
            alert(`Error al enviar la solicitud: ${error.message || 'Hubo un problema con el envío.'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Si se ha enviado con éxito, mostrar mensaje de confirmación
    if (submitSuccess) {
        return (
            <div className="container mx-auto py-10 px-4 mb-10">
                <div className="bg-blue-50 p-6 rounded-lg mb-10">
                    <h1 className="text-2xl font-bold text-blue-800 mb-4">
                        Sistema de Peticiones, Quejas y Reclamos Anónimos
                    </h1>
                    <p className="text-gray-700 mb-4">
                        ¡Gracias por utilizar nuestro sistema de PQR!
                    </p>
                </div>

                <div className="max-w-md mx-auto bg-green-100 p-8 rounded-lg text-center">
                    <h2 className="text-xl font-bold text-green-800 mb-4">¡Gracias por tu solicitud!</h2>
                    <p className="mb-3">Hemos recibido tu PQR de forma anónima.</p>
                    <p className="mb-4">Tu código de seguimiento es: <strong className="text-green-700 text-lg">{trackingCode}</strong></p>
                    <p className="mb-6 text-sm">Guarda este código para consultar el estado de tu solicitud posteriormente.</p>
                    <button
                        className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors"
                        onClick={() => {
                            setSubmitSuccess(false);
                            setCaptchaValue(generateCaptcha());
                        }}
                    >
                        Enviar otra solicitud
                    </button>
                </div>

                <div className="mt-10 bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        ¿Qué sigue?
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Tu solicitud será revisada por nuestro equipo de atención al cliente.
                        Puedes consultar el estado de tu solicitud en cualquier momento utilizando el código de seguimiento.
                    </p>
                    <p className="text-gray-700">
                        <a href="/consulta-pqr" className="text-blue-600 hover:underline">
                            Consultar estado de mi solicitud
                        </a>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-4 mb-10">
            <div className="bg-blue-50 p-6 rounded-lg mb-10">
                <h1 className="text-2xl font-bold text-blue-800 mb-4">
                    Sistema de Peticiones, Quejas y Reclamos Anónimos
                </h1>
                <p className="text-gray-700 mb-4">
                    En Electrohuila valoramos tu opinión. Puedes presentar tus peticiones, quejas, reclamos o sugerencias
                    de manera anónima a través de este formulario.
                </p>
                <p className="text-gray-700 mb-4">
                    Si deseas realizar un seguimiento a tu solicitud, tienes la opción de proporcionar tus datos de contacto
                    o simplemente conservar el código de radicado que se generará al enviar el formulario.
                </p>
                <div className="flex items-start p-5 bg-blue-100 rounded-lg">
                    <div className="mr-4 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-blue-800 mb-2">
                            Importante:
                        </h3>
                        <p className="text-gray-700">
                            Utilizamos tus comentarios para mejorar continuamente nuestros servicios.
                            Toda la información proporcionada es tratada con confidencialidad según la
                            legislación vigente.
                        </p>
                    </div>
                </div>
            </div>

            {/* Formulario PQR */}
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-3 text-center">Formulario PQR Anónimo</h1>
                <p className="text-gray-600 text-center mb-6">
                    Puedes presentar tu Petición, Queja, Reclamo o Sugerencia de forma anónima.
                    No es obligatorio proporcionar tus datos personales.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Tipo de solicitud */}
                    <div className="mb-4">
                        <label htmlFor="tipoSolicitud" className="block text-gray-700 font-medium mb-2">
                            Tipo de solicitud <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="tipoSolicitud"
                            className={`w-full p-2 border ${errors.tipoSolicitud ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            {...register('tipoSolicitud', { required: true })}
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="peticion">Petición</option>
                            <option value="queja">Queja</option>
                            <option value="reclamo">Reclamo</option>
                            <option value="sugerencia">Sugerencia</option>
                            <option value="felicitacion">Felicitación</option>
                        </select>
                        {errors.tipoSolicitud && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>}
                    </div>

                    {/* Descripción del caso */}
                    <div className="mb-4">
                        <label htmlFor="descripcion" className="block text-gray-700 font-medium mb-2">
                            Descripción detallada del caso <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="descripcion"
                            rows={6}
                            className={`w-full p-2 border ${errors.descripcion ? 'border-red-500' : 'border-gray-300'} rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
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
                            <span className="text-red-500 text-sm mt-1">
                                {errors.descripcion.message || 'Este campo es obligatorio'}
                            </span>
                        )}
                    </div>

                    {/* Ubicación del hecho */}
                    <fieldset className="border border-gray-300 rounded p-4 mb-4">
                        <legend className="px-2 font-medium text-gray-700">Ubicación del hecho <span className="text-red-500">*</span></legend>

                        <div className="mb-4">
                            <label htmlFor="departamento" className="block text-gray-700 font-medium mb-2">Departamento</label>
                            <select
                                id="departamento"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                {...register('departamento')}
                                defaultValue="Huila"
                                disabled // Solo es Huila, deshabilitamos la selección
                            >
                                <option value="Huila">Huila</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="municipio" className="block text-gray-700 font-medium mb-2">Municipio</label>
                            <select
                                id="municipio"
                                className={`w-full p-2 border ${errors.municipio ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                {...register('municipio', { required: true })}
                            >
                                <option value="">Seleccione un municipio</option>
                                {municipiosHuila.map((municipio) => (
                                    <option key={municipio} value={municipio}>{municipio}</option>
                                ))}
                            </select>
                            {errors.municipio && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="ubicacion" className="block text-gray-700 font-medium mb-2">Dirección o ubicación aproximada</label>
                            <input
                                type="text"
                                id="ubicacion"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Lugar aproximado (opcional)"
                                {...register('ubicacion')}
                            />
                        </div>
                    </fieldset>

                    {/* Fecha del hecho */}
                    <div className="mb-4">
                        <label htmlFor="fecha" className="block text-gray-700 font-medium mb-2">Fecha del hecho (opcional)</label>
                        <input
                            type="date"
                            id="fecha"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            max={new Date().toISOString().split('T')[0]}
                            {...register('fecha')}
                        />
                    </div>

                    {/* Servicio relacionado */}
                    <fieldset className="border border-gray-300 rounded p-4 mb-4">
                        <legend className="px-2 font-medium text-gray-700">Servicio relacionado <span className="text-red-500">*</span></legend>

                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="servicioEnergia"
                                    {...register('servicios.energia')}
                                />
                                <label htmlFor="servicioEnergia">Energía</label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="servicioMedidor"
                                    {...register('servicios.medidor')}
                                />
                                <label htmlFor="servicioMedidor">Medidor</label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="servicioFacturacion"
                                    {...register('servicios.facturacion')}
                                />
                                <label htmlFor="servicioFacturacion">Facturación</label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="servicioAtencion"
                                    {...register('servicios.atencion')}
                                />
                                <label htmlFor="servicioAtencion">Atención al usuario</label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="servicioInstalaciones"
                                    {...register('servicios.instalaciones')}
                                />
                                <label htmlFor="servicioInstalaciones">Instalaciones técnicas</label>
                            </div>

                            <div className="flex items-center gap-2 col-span-2 md:col-span-3">
                                <input
                                    type="checkbox"
                                    id="servicioOtro"
                                    {...register('servicios.otro')}
                                />
                                <label htmlFor="servicioOtro">Otro:</label>
                                <input
                                    type="text"
                                    className="flex-1 p-1 ml-2 border border-gray-300 rounded"
                                    placeholder="Especifique"
                                    {...register('servicios.otroEspecificacion')}
                                    aria-label="Otro servicio relacionado"
                                />
                            </div>
                        </div>

                        {errors.servicios && <span className="text-red-500 text-sm mt-1">Seleccione al menos un servicio</span>}
                    </fieldset>

                    {/* Medio por el cual se enteró */}
                    <div className="mb-4">
                        <label htmlFor="medioDifusion" className="block text-gray-700 font-medium mb-2">¿Cómo se enteró de este canal? (opcional)</label>
                        <select
                            id="medioDifusion"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">¿Desea ser contactado para seguimiento?</label>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    id="contactoSi"
                                    value="si"
                                    {...register('deseaContacto')}
                                />
                                <label htmlFor="contactoSi">Sí</label>
                            </div>
                            <div className="flex items-center gap-2">
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
                        <div className="bg-gray-50 p-4 rounded-lg mt-3">
                            <h3 className="text-lg font-medium text-gray-800 mb-3">Información de contacto</h3>

                            <div className="mb-4">
                                <label htmlFor="telefono" className="block text-gray-700 font-medium mb-2">
                                    Teléfono o celular <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="telefono"
                                    className={`w-full p-2 border ${errors.telefono ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    placeholder="Ingrese su número de teléfono o celular"
                                    {...register('telefono', {
                                        required: deseaContacto,
                                        pattern: {
                                            value: /^[0-9]{7,10}$/,
                                            message: 'Ingrese un número válido (7-10 dígitos)'
                                        }
                                    })}
                                />
                                {errors.telefono && <span className="text-red-500 text-sm mt-1">{errors.telefono.message || 'Este campo es obligatorio'}</span>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="correo" className="block text-gray-700 font-medium mb-2">Correo electrónico (opcional)</label>
                                <input
                                    type="email"
                                    id="correo"
                                    className={`w-full p-2 border ${errors.correo ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    placeholder="Ingrese su correo electrónico"
                                    {...register('correo', {
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Ingrese un correo electrónico válido'
                                        }
                                    })}
                                />
                                {errors.correo && <span className="text-red-500 text-sm mt-1">{errors.correo.message}</span>}
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="aceptaPolitica"
                                        className={errors.aceptaPolitica ? 'border-red-500' : ''}
                                        {...register('aceptaPolitica', { required: deseaContacto })}
                                    />
                                    <label htmlFor="aceptaPolitica">
                                        Acepto la <a href="/politica-datos" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">política de tratamiento de datos personales</a> según Ley 1581 de 2012.
                                    </label>
                                </div>
                                {errors.aceptaPolitica && <span className="text-red-500 text-sm mt-1">Debe aceptar la política de tratamiento de datos</span>}
                            </div>
                        </div>
                    )}

                    {/* CAPTCHA */}
                    <div className="mb-4">
                        <label htmlFor="captcha" className="block text-gray-700 font-medium mb-2">
                            {captchaValue} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="captcha"
                            className={`w-full p-2 border ${captchaError ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            placeholder="Ingrese la respuesta"
                            {...register('captcha', { required: true })}
                        />
                        {captchaError && <span className="text-red-500 text-sm mt-1">Respuesta incorrecta, intente nuevamente</span>}
                    </div>

                    {/* Botón de envío */}
                    <div className="text-center mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
                        </button>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 text-gray-600 rounded-lg text-sm">
                        <p>
                            <strong>Nota:</strong> Esta información será tratada con confidencialidad según lo establecido
                            en la Ley 1755 de 2015 (Derecho de petición) y la Ley 142 de 1994 (Régimen de servicios
                            públicos domiciliarios).
                        </p>
                    </div>
                </form>
            </div>

            <div className="mt-10 bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Marco Normativo
                </h2>
                <ul className="list-disc pl-8 space-y-2 text-gray-700">
                    <li><strong>Ley 1755 de 2015</strong> – Derecho de petición</li>
                    <li><strong>Ley 142 de 1994</strong> – Régimen de servicios públicos domiciliarios</li>
                    <li><strong>Ley 1581 de 2012</strong> – Protección de datos personales</li>
                    <li><strong>Decreto 1077 de 2015</strong> – Reglamentario del sector vivienda, ciudad y territorio</li>
                </ul>

                <div className="mt-6">
                    <h3 className="font-semibold text-gray-800 mb-2">
                        ¿Ya radicaste una solicitud?
                    </h3>
                    <p className="text-gray-700">
                        Si ya has enviado una solicitud y deseas consultar su estado, puedes hacerlo
                        a través de nuestro <a href="/consulta-pqr" className="text-blue-600 hover:underline">
                            sistema de consulta de PQR</a> utilizando el código de radicado que recibiste.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PQRAnonimoPage;