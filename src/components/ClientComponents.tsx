"use client";

import React from 'react';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';
import FloatingContactButton from './FloatingContactButton';
import AccessibilityPanel from './AccessibilityPanel';

// Importamos el componente AutogeneradoresCard solo si existe y es necesario
let AutogeneradoresCard;
try {
  AutogeneradoresCard = require('./AutogeneradoresCard').default;
} catch (error) {
  // El componente no existe o hay algún error, lo manejamos silenciosamente
  AutogeneradoresCard = null;
}

export default function ClientComponents() {
  return (
    <>
      {/* Componentes flotantes de la interfaz */}
      <FloatingWhatsAppButton />
      <FloatingContactButton />
      <AccessibilityPanel />
      
      {/* Renderizamos condicionalmente AutogeneradoresCard si está disponible */}
      {AutogeneradoresCard && (
        <div className="autogeneradores-floating-container" style={{ display: 'none' }}>
          <AutogeneradoresCard />
        </div>
      )}
    </>
  );
}