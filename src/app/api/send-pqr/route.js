// src/app/api/send-pqr/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const formData = await request.json();

        // Configurar el transportador de correo
        const transporter = nodemailer.createTransport({
            host: 'smtp.tudominio.com', // Por ejemplo: smtp.gmail.com, smtp.office365.com
            port: 587, // Puerto común para SMTP con TLS
            secure: false, // true para 465, false para otros puertos
            auth: {
                user: 'tucorreo@electrohuila.com', // Tu correo corporativo
                pass: process.env.EMAIL_PASSWORD // La contraseña debe estar en variables de entorno
            }
        });

        // Formatear los datos del formulario para el correo
        const serviciosSeleccionados = Object.entries(formData.servicios || {})
            .filter(([key, value]) => value === true)
            .map(([key]) => {
                if (key === 'otro' && formData.servicios.otroEspecificacion) {
                    return `Otro: ${formData.servicios.otroEspecificacion}`;
                }
                return key.charAt(0).toUpperCase() + key.slice(1);
            })
            .join(', ');

        // Preparar el contenido del correo
        const mailOptions = {
            from: 'sistema-pqr@electrohuila.com', // Dirección de origen
            to: 'pqr@electrohuila.com', // Correo corporativo de destino
            subject: `Nueva PQR Anónima - ${formData.tipoSolicitud}`,
            html: `
        <h2>Nueva Solicitud PQR Anónima</h2>
        <p><strong>Tipo de solicitud:</strong> ${formData.tipoSolicitud}</p>
        <p><strong>Descripción:</strong> ${formData.descripcion}</p>
        <p><strong>Ubicación:</strong> ${formData.municipio}, ${formData.ubicacion || 'No especificada'}</p>
        <p><strong>Fecha del hecho:</strong> ${formData.fecha || 'No especificada'}</p>
        <p><strong>Servicios relacionados:</strong> ${serviciosSeleccionados || 'No especificados'}</p>
        <p><strong>Medio por el cual se enteró:</strong> ${formData.medioDifusion || 'No especificado'}</p>
        ${formData.deseaContacto === 'si' ? `
          <h3>Información de contacto:</h3>
          <p><strong>Teléfono:</strong> ${formData.telefono}</p>
          <p><strong>Correo electrónico:</strong> ${formData.correo || 'No proporcionado'}</p>
        ` : '<p><strong>El usuario prefiere mantener el anonimato.</strong></p>'}
        <p><strong>Código de seguimiento generado:</strong> ${formData.trackingCode}</p>
        <hr>
        <p>Este es un correo automático generado por el sistema de PQR de Electrohuila.</p>
      `
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);

        // Responder con éxito
        return NextResponse.json({
            success: true,
            message: 'PQR enviada correctamente'
        });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        return NextResponse.json(
            { success: false, message: 'Error al procesar la solicitud' },
            { status: 500 }
        );
    }
}