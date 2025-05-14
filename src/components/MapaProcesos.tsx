"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MapaProcesos() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 flex flex-col gap-12">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center"
      >
        Mapa de Procesos
      </motion.h2>

      <div className="w-full flex justify-center items-center">
        <div className="relative w-full max-w-5xl h-[600px] md:h-[700px]">
          <Image 
            src="/images/mapa-procesos.png" 
            alt="Mapa de Procesos" 
            layout="fill"
            objectFit="contain"
            className="rounded-lg shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
