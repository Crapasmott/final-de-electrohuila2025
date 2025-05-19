import React from "react";
import Link from "next/link";

// Obligatorio para export estático en rutas dinámicas
export async function generateStaticParams() {
    return [
        { id: "1" },
        // Agrega más IDs si tienes más comunicados
    ];
}

export default function ComunicadoDetalle({ params }) {
    const { id } = params;

    // Ejemplo de datos, puedes adaptar según tus necesidades
    const comunicado = {
        id,
        fecha: "08/04/2024",
        contenido: `
      <p>ELECTROHUILA S.A. E.S.P. informa que...</p>
      <p>Este es un comunicado de ejemplo para el ID ${id}.</p>
    `,
    };

    return (
        <div style={{ backgroundColor: '#f9f9f9', borderRadius: '6px', padding: '20px', marginBottom: '20px' }}>
            <div style={{
                background: 'linear-gradient(to right, #ff7e00, #ffb366)',
                padding: '15px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold',
                marginBottom: '20px'
            }}>
                <h2 style={{ margin: 0, fontSize: '18px' }}>COMUNICADO DE PRENSA</h2>
                <div style={{ width: '30px', height: '30px', backgroundColor: '#4CAF50', borderRadius: '50%' }}></div>
            </div>

            <div style={{ padding: '10px' }}>
                <div style={{ marginBottom: '15px', color: '#666', fontSize: '14px' }}>
                    Hoy, {comunicado.fecha}
                </div>

                <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Comunicado a la Opinión Pública</h3>

                <div style={{ lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: comunicado.contenido }}></div>

                <div style={{ textAlign: 'right', marginTop: '25px', color: '#555', fontStyle: 'italic' }}>
                    La Gerencia
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <button style={{ background: 'none', border: 'none', color: '#555', fontSize: '14px', marginRight: '15px', cursor: 'pointer' }}>
                        Compartir
                    </button>
                    <button style={{ background: 'none', border: 'none', color: '#555', fontSize: '14px', cursor: 'pointer' }}>
                        Descargar PDF
                    </button>
                </div>
                <Link
                    href="/comunicados"
                    style={{ color: '#0086d6', textDecoration: 'none', fontSize: '14px' }}
                >
                    ← Volver a la lista
                </Link>
            </div>
        </div>
    );
}