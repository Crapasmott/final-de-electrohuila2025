"use client";

import { motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function ModalPDF({ isOpen, onClose, pdfUrl }: { isOpen: boolean, onClose: () => void, pdfUrl: string }) {
  const [numPages, setNumPages] = useState<number>();

  if (!isOpen) return null;

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative bg-white rounded-lg p-4 w-[90%] h-[90%] overflow-y-auto shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
          aria-label="Cerrar visor de PDF"
        >
          ✖
        </button>

        <div className="flex justify-center mt-8">
          <Document file={pdfUrl} onLoadSuccess={handleLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </div>
    </motion.div>
  );
}
