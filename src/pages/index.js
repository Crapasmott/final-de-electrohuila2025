// pages/index.js
import React from 'react';

const Home = () => {
  return (
    <div style={{ 
      padding: '20px',
      minHeight: '100vh',
      background: 'white'
    }}>
      <h1>⚡ ElectroHuila Dashboard</h1>
      <p>Sistema integrado funcionando</p>
      
      <a href="/contratos" style={{
        background: '#3b82f6',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        textDecoration: 'none'
      }}>
        Ver Contratos
      </a>
    </div>
  );
};

export default Home;