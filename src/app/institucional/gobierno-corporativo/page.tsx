import React from "react";
import HeroGobierno from "@/components/HeroGobierno";
import ComposicionAccionaria from "@/components/ComposicionAccionaria";
import JuntaDirectiva from "@/components/JuntaDirectiva";
import Organigrama from "@/components/Organigrama";
import MapaProcesos from "@/components/MapaProcesos";
import DocumentGallery from "@/components/DocumentGallery";

export default function GobiernoCorporativoPage() {
  return (
    <main className="flex flex-col gap-24">
      <HeroGobierno />
      <ComposicionAccionaria />
      <JuntaDirectiva />
      <Organigrama />
      <MapaProcesos />
      <DocumentGallery />
    </main>
  );
}
