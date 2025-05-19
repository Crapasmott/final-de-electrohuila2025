"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ModalPDF from "./ModalPDF";

const documents = [
  {
    title: "Informe Financiero 2025",
    year: 2025,
    category: "Finanzas",
    image: "/images/documento1.png",
    pdfUrl: "/pdfs/informe-2025.pdf",
  },
  {
    title: "Estados Financieros 2024",
    year: 2024,
    category: "Finanzas",
    image: "/images/documento2.png",
    pdfUrl: "/pdfs/estados-2024.pdf",
  },
  {
    title: "Presupuesto 2023",
    year: 2023,
    category: "Presupuestos",
    image: "/images/documento3.png",
    pdfUrl: "/pdfs/presupuesto-2023.pdf",
  },
  // Puedes seguir agregando aquí
];

export default function DocumentGallery() {
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const filteredDocuments = documents.filter(doc => {
    const matchesYear = selectedYear === "all" || doc.year === selectedYear;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesYear && matchesSearch;
  });

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Información Financiera</h2>
        <p className="text-center text-gray-600 mb-8">Consulta, visualiza y descarga los documentos oficiales</p>

        {/* Filtro y Búsqueda */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value === "all" ? "all" : Number(e.target.value))}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos los años</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            {/* Agrega más años si quieres */}
          </select>

          <input 
            type="text"
            placeholder="Buscar documento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/2"
          />
        </div>

        {/* Grid de documentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDocuments.map((doc, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden group"
            >
              <div className="relative w-full h-64">
                <Image src={doc.image} alt={doc.title} layout="fill" objectFit="cover" />
              </div>
              <div className="p-6 flex flex-col items-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">{doc.title}</h3>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setSelectedPdf(doc.pdfUrl)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Ver
                  </button>
                  <a 
                    href={doc.pdfUrl} 
                    download 
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Descargar
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedPdf && <ModalPDF isOpen={true} onClose={() => setSelectedPdf(null)} pdfUrl={selectedPdf} />}
      </div>
    </section>
  );
}
