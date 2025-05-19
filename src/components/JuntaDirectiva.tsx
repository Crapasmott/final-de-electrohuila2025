"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const equipoDirectivo = [
  {
    nombre: "Nika Duniezhka Cuellar Cuenca",
    cargo: "Gerente General (E)",
    imagen: "/images/equipo/nika.jpg", // pon aquí la imagen correspondiente
  },
  {
    nombre: "Luis Alfredo Carballo Gutiérrez",
    cargo: "Secretario General (E) y Asesor Legal",
    imagen: "/images/equipo/luis.jpg",
  },
  {
    nombre: "Sebastián Andrés Repiso Ramón",
    cargo: "Subgerente Administrativo y Financiero (E)",
    imagen: "/images/equipo/sebastian.jpg",
  },
  {
    nombre: "Jhonatan Torres Cleves",
    cargo: "Subgerente Comercial",
    imagen: "/images/equipo/jhonatan.jpg",
  },
  {
    nombre: "Alberto Bladimir Solis Perdomo",
    cargo: "Subgerente de Distribución (E)",
    imagen: "/images/equipo/alberto.jpg",
  },
];

const comites = [
  "Gobierno Corporativo Talento Humano y Sostenibilidad",
  "Comité de Estrategia y Finanzas",
  "Comité de Auditoría y Riesgos",
];

export default function JuntaDirectiva() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 flex flex-col gap-24">
      
      {/* Equipo Directivo */}
      <div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Equipo Directivo
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {equipoDirectivo.map((miembro, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center bg-white rounded-lg p-4 shadow-lg"
            >
             <div className="w-32 h-32 relative mb-4 overflow-hidden rounded-full bg-gray-200">
  <Image
    src={miembro.imagen}
    alt={miembro.nombre}
    layout="fill"
    objectFit="cover"
    className="rounded-full"
    placeholder="blur"
    blurDataURL="/images/placeholder.png" // crea un pequeño placeholder
  />
</div>

              <h3 className="text-lg font-bold">{miembro.nombre}</h3>
              <p className="text-sm text-gray-600 mt-2">{miembro.cargo}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comités */}
      <div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center"
        >
          Comités
        </motion.h2>

        <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-6">
          {comites.map((comite, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex items-center bg-white shadow-md rounded-lg px-6 py-4 gap-4 w-full md:w-auto"
            >
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">✓</span>
              <p className="text-gray-700">{comite}</p>
            </motion.div>
          ))}
        </div>

        {/* Botón Código de Buen Gobierno */}
        <div className="flex justify-center mt-12">
          <a
            href="/pdfs/codigo-buen-gobierno.pdf" // cambia la ruta al PDF real
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Código de Buen Gobierno
          </a>
        </div>
      </div>
      
    </section>
  );
}
