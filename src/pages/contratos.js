// pages/contratos.js
import React from 'react';

const Contratos = () => {
  return (
    <div style={{ 
      padding: '20px',
      minHeight: '100vh',
      background: 'white'
    }}>
      <h1>📋 Contratos ElectroHuila</h1>
      <p>Sistema de contrataciones funcionando</p>
      
      <div style={{ 
        background: '#f0f9ff',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <h3>✅ Página de contratos cargada</h3>
        <p>Si ves este mensaje, el routing está funcionando.</p>
      </div>
    </div>
  );
};

export default Contratos;