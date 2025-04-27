"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HeroGobierno() {
  return (
    <section
      className="relative w-full h-[80vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/gobierno-corporativo.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
          Gobierno Corporativo
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto drop-shadow">
          Transparencia, compromiso y sostenibilidad para el desarrollo del Huila.
        </p>
      </motion.div>
    </section>
  );
}
