// components/ContratosList.js
import { useState } from 'react';
import { useContratos } from '../lib/wordpress-client';

export default function ContratosList() {
    const [showModal, setShowModal] = useState(false);
    const [selectedContrato, setSelectedContrato] = useState(null);
    const [filters, setFilters] = useState({
        estado: '',
        search: ''
    });

    const { contratos, loading, error, updateFilters } = useContratos(filters);

    const handleFilterChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        updateFilters(newFilters);
    };

    const openModal = (contrato) => {
        setSelectedContrato(contrato);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedContrato(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2">Cargando contratos...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong>Error:</strong> {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            {/* Filtros */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estado:
                    </label>
                    <select
                        value={filters.estado}
                        onChange={(e) => handleFilterChange('estado', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">--SELECCIONE--</option>
                        <option value="ABIERTA">ABIERTA</option>
                        <option value="CERRADA">CERRADA</option>
                        <option value="DESIERTA">DESIERTA</option>
                        <option value="ANULADA">ANULADA</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buscar:
                    </label>
                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        placeholder="Código o descripción..."
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Código
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Objeto
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fecha Apertura
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {contratos.map((contrato) => (
                            <tr key={contrato.ID} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {contrato.CODIGO}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                                    {contrato.OBJETO}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${contrato.ESTADO_CONTRATO === 'ABIERTA' ? 'bg-green-100 text-green-800' :
                                            contrato.ESTADO_CONTRATO === 'CERRADA' ? 'bg-blue-100 text-blue-800' :
                                                contrato.ESTADO_CONTRATO === 'DESIERTA' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                        }`}>
                                        {contrato.ESTADO_CONTRATO}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {contrato.FECHA_APERTURA ?
                                        new Date(contrato.FECHA_APERTURA).toLocaleDateString('es-ES') : '-'
                                    }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => openModal(contrato)}
                                        className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-md transition-colors"
                                    >
                                        Ver detalle
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {contratos.length === 0 && !loading && (
                    <div className="text-center py-8 text-gray-500">
                        No se encontraron contratos
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && selectedContrato && (
                <ContratoModal contrato={selectedContrato} onClose={closeModal} />
            )}
        </div>
    );
}

// Componente Modal
function ContratoModal({ contrato, onClose }) {
    const documentos = [];

    // Extraer documentos
    for (let i = 1; i <= 30; i++) {
        const desc = contrato[`DOCUMENTODESC${i}`];
        const codigo = contrato[`DOCUMENTO${i}`];
        const ruta = contrato[`DOCUMENTORUTA${i}`];
        const fecha = contrato[`DATEDOC${i}`];

        if (desc && codigo && ruta) {
            documentos.push({ id: i, descripcion: desc, codigo, ruta, fecha });
        }
    }

    const handleDownload = (doc) => {
        if (doc.ruta) {
            window.open(doc.ruta, '_blank');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold">
                        Detalle del contrato ID: {contrato.ID}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
                        ×
                    </button>
                </div>

                <div className="p-6">
                    {/* Información básica */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div><strong>Empresa:</strong> {contrato.EMPRESA}</div>
                        <div><strong>Cuantía:</strong> {contrato.CUANTIA}</div>
                        <div><strong>Etapa:</strong> {contrato.ETAPA}</div>
                        <div><strong>Código:</strong> {contrato.CODIGO}</div>
                        <div><strong>Estado:</strong> {contrato.ESTADO_CONTRATO}</div>
                        <div><strong>Responsable:</strong> {contrato.RESPONSABLE}</div>
                    </div>

                    <div className="mb-6">
                        <strong>Objeto:</strong>
                        <p className="mt-2">{contrato.OBJETO}</p>
                    </div>

                    {/* Documentos */}
                    {documentos.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Documentos</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                Documento
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                Código
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                Fecha
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                Descarga
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {documentos.map((doc) => (
                                            <tr key={doc.id}>
                                                <td className="px-4 py-2 text-sm">{doc.descripcion}</td>
                                                <td className="px-4 py-2 text-sm">{doc.codigo}</td>
                                                <td className="px-4 py-2 text-sm">
                                                    {doc.fecha ? new Date(doc.fecha).toLocaleDateString('es-ES') : '-'}
                                                </td>
                                                <td className="px-4 py-2 text-sm">
                                                    <button
                                                        onClick={() => handleDownload(doc)}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        Descargar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end p-6 border-t">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}