// /pages/tarifas/[year].js

import { useState, useEffect } from 'react';
// ... tus otros imports

// AGREGAR ESTA FUNCIÓN - Generar rutas estáticas
export async function getStaticPaths() {
  // Años que quieres generar estáticamente
  const years = [
    '2025', '2024', '2023', '2022', '2021', '2020', 
    '2019', '2018', '2017', '2016', '2015', '2014', 
    '2013', '2012', '2011', '2010', '2009', '2008'
  ];

  // Generar paths para cada año
  const paths = years.map((year) => ({
    params: { year }
  }));

  return {
    paths,
    fallback: false // O 'blocking' si quieres generar dinámicamente
  };
}

// AGREGAR ESTA FUNCIÓN - Obtener datos estáticos
export async function getStaticProps({ params }) {
  const { year } = params;
  
  // Opcional: Aquí puedes pre-cargar datos si quieres
  // Por ejemplo, hacer fetch a tu API de tarifas
  
  return {
    props: {
      year,
      // Otros props que necesites
    },
    revalidate: 3600, // Regenerar cada hora (opcional)
  };
}

// Tu componente existente (NO CAMBIAR)
export default function TarifaYear({ year }) {
  // Tu código existente aquí
  const [tarifas, setTarifas] = useState({});
  const [loading, setLoading] = useState(true);
  
  // ... resto de tu código actual
  
  return (
    <div>
      {/* Tu JSX existente */}
    </div>
  );
}