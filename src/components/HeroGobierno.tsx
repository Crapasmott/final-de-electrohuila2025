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
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/20" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl">
          Gobierno Corporativo
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto drop-shadow-md">
          Transparencia, compromiso y desarrollo sostenible para el Huila.
        </p>
      </motion.div>
    </section>
  );
}
