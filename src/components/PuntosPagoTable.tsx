// src/components/PuntosPagoTable.tsx
import React from 'react';

interface PuntoPago {
  municipio: string;
  recaudador: string;
  sitioVenta: string;
  direccion: string;
}

interface PuntosPagoTableProps {
  data: PuntoPago[];
}

const PuntosPagoTable: React.FC<PuntosPagoTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-3 px-4 text-left uppercase font-semibold text-sm">MUNICIPIO</th>
            <th className="py-3 px-4 text-left uppercase font-semibold text-sm">RECAUDADOR</th>
            <th className="py-3 px-4 text-left uppercase font-semibold text-sm">SITIO DE VENTA</th>
            <th className="py-3 px-4 text-left uppercase font-semibold text-sm">DIRECCIÓN</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((punto, index) => (
              <tr 
                key={index} 
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="py-3 px-4 border-b border-gray-200">{punto.municipio}</td>
                <td className="py-3 px-4 border-b border-gray-200">{punto.recaudador}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {punto.sitioVenta.includes('OFICINA PRINCIPAL') ? (
                    <span className="font-medium text-blue-600">{punto.sitioVenta}</span>
                  ) : (
                    punto.sitioVenta
                  )}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">{punto.direccion}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-6 text-center text-gray-500">
                No se encontraron resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PuntosPagoTable;