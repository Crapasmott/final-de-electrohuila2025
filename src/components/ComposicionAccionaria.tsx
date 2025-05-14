// src/components/ClientComponents.tsx
"use client";

import FloatingPaymentButton from '@/components/FloatingPaymentButton';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import FloatingContactButton from '@/components/FloatingContactButton';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import AutogeneradoresCard from '@/components/AutogeneradoresCard'; // Añadir importación
import React from 'react';

export default function ClientComponents() {
  return (
    <>
      <FloatingPaymentButton />
      <FloatingWhatsAppButton />
      <FloatingContactButton />
      <AccessibilityPanel />
      
      {/* Añadir la tarjeta en una posición apropiada */}
      <div className="fixed bottom-32 right-32 z-40">
        <AutogeneradoresCard />
      </div>
    </>
  );
}