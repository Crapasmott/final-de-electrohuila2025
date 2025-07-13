// pages/test-electrohuila.tsx
import React from 'react';

const TestElectroHuila = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2563eb', marginBottom: '20px' }}>
        🔌 ElectroHuila - Sistema de Prueba
      </h1>
      
      <div style={{ 
        backgroundColor: '#f0f9ff', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>✅ Página funcionando correctamente</h2>
        <p>Si ves este mensaje, el sistema básico está funcionando.</p>
      </div>

      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '20px', 
        border: '1px solid #e5e7eb',
        borderRadius: '8px'
      }}>
        <h3>🧪 Pruebas del Sistema:</h3>
        <ul>
          <li>✅ Next.js funcionando</li>
          <li>✅ Routing funcionando</li>
          <li>⏳ Dashboard completo (siguiente paso)</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#6b7280' }}>
        <p>Ruta actual: /test-electrohuila</p>
        <p>Si ves esto, ya puedes continuar con el dashboard completo.</p>
      </div>
    </div>
  );
};

export default TestElectroHuila;