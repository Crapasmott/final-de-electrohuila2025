// Este es el contenido para la sección de Guía de Trámites
// Se puede usar como un componente separado o incluir en el componente principal

const SeccionGuiaTramites = ({ guiaTramites }) => {
    return (
        <div id="guia-tramites" style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#333', borderBottom: '2px solid #0098d9', paddingBottom: '10px' }}>
                Guía de Trámites
            </h2>
            
            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', marginBottom: '30px' }}>
                Esta guía proporciona información detallada sobre los trámites que deben realizar los proveedores 
                y contratistas para establecer y mantener relaciones comerciales con ElectroHuila. 
                Aquí encontrará los pasos, requisitos y tiempos de respuesta para cada trámite.
            </p>
            
            {/* Lista de trámites */}
            <div className="tramites-container">
                {guiaTramites.map((tramite) => (
                    <div key={tramite.id} style={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        padding: '30px',
                        boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
                        marginBottom: '30px',
                        border: '1px solid #eee'
                    }}>
                        <h3 style={{ fontSize: '22px', marginBottom: '20px', color: '#0098d9' }}>
                            {tramite.title}
                        </h3>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{ fontSize: '18px', marginBottom: '10px', color: '#333' }}>
                                Pasos a seguir
                            </h4>
                            <ol style={{ paddingLeft: '20px', color: '#555', lineHeight: '1.6' }}>
                                {tramite.pasos.map((paso, index) => (
                                    <li key={index} style={{ marginBottom: '8px' }}>{paso}</li>
                                ))}
                            </ol>
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{ fontSize: '18px', marginBottom: '10px', color: '#333' }}>
                                Documentos requeridos
                            </h4>
                            <ul style={{ paddingLeft: '20px', color: '#555', lineHeight: '1.6' }}>
                                {tramite.documentos.map((doc, index) => (
                                    <li key={index} style={{ marginBottom: '8px' }}>{doc}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '20px',
                            backgroundColor: '#f8f9fa',
                            padding: '15px 20px',
                            borderRadius: '5px'
                        }}>
                            <div>
                                <h4 style={{ fontSize: '16px', marginBottom: '5px', color: '#333' }}>
                                    Tiempo estimado
                                </h4>
                                <p style={{ color: '#0098d9', fontWeight: 'bold', margin: 0 }}>
                                    {tramite.tiempo}
                                </p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '16px', marginBottom: '5px', color: '#333' }}>
                                    Costo del trámite
                                </h4>
                                <p style={{ color: '#0098d9', fontWeight: 'bold', margin: 0 }}>
                                    {tramite.costo}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Información de contacto */}
            <div style={{
                backgroundColor: '#e9f7fe',
                padding: '30px',
                borderRadius: '8px',
                marginBottom: '30px'
            }}>
                <h3 style={{ fontSize: '22px', marginBottom: '15px', color: '#0098d9' }}>
                    Información de Contacto
                </h3>
                <p style={{ marginBottom: '15px', color: '#555' }}>
                    Para mayor información sobre los trámites y procesos de contratación, puede contactarnos a través de:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <p style={{ fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Departamento de Contratación:</p>
                        <p style={{ margin: 0, color: '#555' }}>contratacion@electrohuila.com.co</p>
                        <p style={{ margin: 0, color: '#555' }}>Tel: (608) 8719003 Ext. 1200</p>
                    </div>
                    <div>
                        <p style={{ fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Registro de Proveedores:</p>
                        <p style={{ margin: 0, color: '#555' }}>proveedores@electrohuila.com.co</p>
                        <p style={{ margin: 0, color: '#555' }}>Tel: (608) 8719003 Ext. 1205</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeccionGuiaTramites;