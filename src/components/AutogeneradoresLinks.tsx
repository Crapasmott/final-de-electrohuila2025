// src/components/AutogeneradoresLinks.tsx
"use client";

import React from 'react';

export default function AutogeneradoresLinks() {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 max-w-sm mx-auto">
      <h3 className="text-xl font-semibold text-blue-900 mb-3 text-center">Autogeneradores</h3>
      <p className="text-gray-600 mb-4 text-center">
        Permiten al usuario gestionar de una manera eficiente los objetivos.
      </p>
      
      <div className="space-y-3">
        <a 
          href="http://200.21.4.66:8070/ehfact2/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full text-center bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Sistema EHFACT2
        </a>
        
        <a 
          href="http://35.184.36.98/solicitante/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition-colors"
        >
          Sistema Solicitante
        </a>
      </div>
    </div>
  );
}