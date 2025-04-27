"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const resumenAccionistas = [
  { entidad: "Ministerio de Hacienda", acciones: "36.566.229", porcentaje: "83,05%" },
  { entidad: "Departamento del Huila", acciones: "3.628.415", porcentaje: "8,24%" },
  { entidad: "Infihuila", acciones: "2.747.486", porcentaje: "6,24%" },
];

const accionistas = [
  { nombre: "Municipio de Aipe", acciones: "173.169", participacion: "0,39%" },
  { nombre: "Municipio de Neiva", acciones: "167.657", participacion: "0,38%" },
  { nombre: "Municipio de Pitalito", acciones: "147.869", participacion: "0,34%" },
  { nombre: "Empresas Públicas de Neiva", acciones: "99.094", participacion: "0,23%" },
  // (Agrega el resto igual)
];

export default function ComposicionAccionaria() {
  const [open, setOpen] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col gap-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center text-blue-900"
      >
        Composición Accionaria
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {resumenAccionistas.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-8 shadow-xl text-center transition"
          >
            <p className="text-2xl font-bold text-blue-700">{item.acciones}</p>
            <p className="text-5xl font-extrabold text-blue-800 my-2">{item.porcentaje}</p>
            <p className="text-gray-600">{item.entidad}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setOpen(!open)}
          className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white font-semibold py-3 px-8 rounded-full text-lg transition"
        >
          {open ? "Ocultar accionistas" : "Ver todos los accionistas"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden mt-8"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="py-3 px-6 text-left">Accionista</th>
                    <th className="py-3 px-6 text-right">Acciones</th>
                    <th className="py-3 px-6 text-right">Participación</th>
                  </tr>
                </thead>
                <tbody>
                  {accionistas.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="py-3 px-6">{item.nombre}</td>
                      <td className="py-3 px-6 text-right">{item.acciones}</td>
                      <td className="py-3 px-6 text-right">{item.participacion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
