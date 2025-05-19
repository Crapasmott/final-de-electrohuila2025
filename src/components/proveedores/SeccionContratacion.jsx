// Este es el contenido para la sección de Contratación
// Se puede usar como un componente separado o incluir en el componente principal

const SeccionContratacion = ({ procesosContratacion, documentosContratacion, preguntasFrecuentes, isSectionExpanded, toggleSection }) => {
    return (
        <div id="contratacion" style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#333', borderBottom: '2px solid #0098d9', paddingBottom: '10px' }}>
                Contratación
            </h2>
            
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', marginBottom: '30px' }}>
                ElectroHuila cuenta con procesos de contratación transparentes y eficientes para la adquisición de bienes y servicios. 
                A continuación encontrará la información necesaria para participar en nuestros procesos de contratación, 
                así como los documentos y requisitos para registrarse como proveedor.
            </p>
            
            {/* Procesos de contratación en curso */}
            <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#0098d9' }}>
                Procesos de Contratación en Curso
            </h3>
            
            <div className="table-responsive" style={{ overflowX: 'auto', marginBottom: '40px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e0e0e0' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f8f9fa' }}>
                            <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '2px solid #0098d9' }}>Referencia</th>
                            <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '2px solid #0098d9' }}>Objeto</th>
                            <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '2px solid #0098d9' }}>Publicación</th>
                            <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '2px solid #0098d9' }}>Cierre</th>
                            <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '2px solid #0098d9' }}>Estado</th>
                            <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '2px solid #0098d9' }}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {procesosContratacion.map((proceso, index) => (
                            <tr key={proceso.id} style={{ 
                                backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa',
                                borderBottom: '1px solid #e0e0e0'
                            }}>
                                <td style={{ padding: '12px 15px' }}>{proceso.id}</td>
                                <td style={{ padding: '12px 15px' }}>{proceso.title}</td>
                                <td style={{ padding: '12px 15px' }}>{proceso.fecha_publicacion}</td>
                                <td style={{ padding: '12px 15px' }}>{proceso.fecha_cierre}</td>
                                <td style={{ padding: '12px 15px' }}>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '5px 10px',
                                        borderRadius: '20px',
                                        backgroundColor: proceso.estado === 'Abierto' ? '#e1f5e8' : '#e9f7fe',
                                        color: proceso.estado === 'Abierto' ? '#28a745' : '#0098d9',
                                        fontSize: '14px',
                                        fontWeight: 'bold'
                                    }}>
                                        {proceso.estado}
                                    </span>
                                </td>
                                <td style={{ padding: '12px 15px' }}>
                                    <a 
                                        href={proceso.url}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            color: '#0098d9',
                                            textDecoration: 'none',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        <span style={{ marginRight: '5px' }}>🔍</span>
                                        Ver detalles
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Documentos de contratación */}
            <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#0098d9' }}>
                Documentos de Contratación
            </h3>
            
            <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
            }}>
                {documentosContratacion.map((doc) => (
                    <div key={doc.id} style={{
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        padding: '20px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        border: '1px solid #eee'
                    }}>
                        <div style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '15px'
                        }}>
                            <div style={{
                                backgroundColor: '#e9f7fe',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '15px'
                            }}>
                                <span style={{ fontSize: '20px' }}>📄</span>
                            </div>
                            <h4 style={{ margin: 0, fontSize: '18px', color: '#333' }}>
                                {doc.title}
                            </h4>
                        </div>
                        <p style={{ color: '#555', marginBottom: '15px', fontSize: '14px' }}>
                            {doc.description}
                        </p>
                        <a 
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                color: '#0098d9',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                fontSize: '14px'
                            }}
                        >
                            <span style={{ marginRight: '5px' }}>⬇️</span>
                            Descargar documento
                        </a>
                    </div>
                ))}
            </div>
            
            {/* Preguntas frecuentes */}
            <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#0098d9' }}>
                Preguntas Frecuentes
            </h3>
            
            <div className="accordion" style={{ marginBottom: '40px' }}>
                {preguntasFrecuentes.map((pregunta) => (
                    <div key={pregunta.id} style={{
                        marginBottom: '10px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '5px',
                        overflow: 'hidden'
                    }}>
                        <div 
                            onClick={() => toggleSection(pregunta.id)}
                            style={{
                                padding: '15px 20px',
                                backgroundColor: isSectionExpanded(pregunta.id) ? '#f8f9fa' : '#fff',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#333' }}>
                                {pregunta.pregunta}
                            </h4>
                            {isSectionExpanded(pregunta.id) ? 
                                <span>🔽</span> : 
                                <span>▶️</span>
                            }
                        </div>
                        
                        {isSectionExpanded(pregunta.id) && (
                            <div style={{ padding: '15px 20px', backgroundColor: '#f8f9fa', borderTop: '1px solid #e0e0e0' }}>
                                <p style={{ margin: 0, lineHeight: '1.6', color: '#555' }}>
                                    {pregunta.respuesta}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeccionContratacion;