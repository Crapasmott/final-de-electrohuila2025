// api/tarifas/año/route.js
// ALTERNATIVA SIN RUTAS DINÁMICAS

import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year') || new Date().getFullYear().toString();
    
    console.log(`🔍 Buscando tarifas para el año: ${year}`);
    
    // Datos de ejemplo por año
    const tarifasData = {
      '2025': {
        enero: [{ id: '2025-01', nombre: 'Tarifa Enero 2025.pdf', tamaño: '2.3 MB', fecha: '2025-01-15' }],
        febrero: [{ id: '2025-02', nombre: 'Tarifa Febrero 2025.pdf', tamaño: '2.1 MB', fecha: '2025-02-15' }]
      },
      '2024': {
        enero: [{ id: '2024-01', nombre: 'Tarifa Enero 2024.pdf', tamaño: '2.3 MB', fecha: '2024-01-15' }],
        febrero: [{ id: '2024-02', nombre: 'Tarifa Febrero 2024.pdf', tamaño: '2.1 MB', fecha: '2024-02-15' }],
        marzo: [{ id: '2024-03', nombre: 'Tarifa Marzo 2024.pdf', tamaño: '2.4 MB', fecha: '2024-03-15' }],
        abril: [{ id: '2024-04', nombre: 'Tarifa Abril 2024.pdf', tamaño: '2.2 MB', fecha: '2024-04-15' }],
        mayo: [{ id: '2024-05', nombre: 'Tarifa Mayo 2024.pdf', tamaño: '2.5 MB', fecha: '2024-05-15' }],
        junio: [{ id: '2024-06', nombre: 'Tarifa Junio 2024.pdf', tamaño: '2.3 MB', fecha: '2024-06-15' }],
        julio: [{ id: '2024-07', nombre: 'Tarifa Julio 2024.pdf', tamaño: '2.4 MB', fecha: '2024-07-15' }],
        agosto: [{ id: '2024-08', nombre: 'Tarifa Agosto 2024.pdf', tamaño: '2.2 MB', fecha: '2024-08-15' }],
        septiembre: [{ id: '2024-09', nombre: 'Tarifa Septiembre 2024.pdf', tamaño: '2.6 MB', fecha: '2024-09-15' }],
        octubre: [{ id: '2024-10', nombre: 'Tarifa Octubre 2024.pdf', tamaño: '2.3 MB', fecha: '2024-10-15' }],
        noviembre: [{ id: '2024-11', nombre: 'Tarifa Noviembre 2024.pdf', tamaño: '2.4 MB', fecha: '2024-11-15' }],
        diciembre: [{ id: '2024-12', nombre: 'Tarifa Diciembre 2024.pdf', tamaño: '2.5 MB', fecha: '2024-12-15' }]
      }
    };

    // Agregar años vacíos para el rango completo
    for (let año = 2008; año <= 2025; año++) {
      if (!tarifasData[año.toString()]) {
        tarifasData[año.toString()] = {
          enero: [], febrero: [], marzo: [], abril: [], mayo: [], junio: [],
          julio: [], agosto: [], septiembre: [], octubre: [], noviembre: [], diciembre: []
        };
      }
    }

    const tarifasDelAño = tarifasData[year] || {
      enero: [], febrero: [], marzo: [], abril: [], mayo: [], junio: [],
      julio: [], agosto: [], septiembre: [], octubre: [], noviembre: [], diciembre: []
    };

    return NextResponse.json({
      success: true,
      year: year,
      tarifas: tarifasDelAño,
      message: `Tarifas del año ${year}`,
      añosDisponibles: Object.keys(tarifasData).sort((a, b) => b - a)
    });

  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
