// utils/wordpress-api.ts
export interface WordPressCaso {
  id: number;
  title: string;
  slug: string;
  edad: string;
  descripcion: string;
  procedimiento: string;
  imagenes: {
    antes: string;
    despues: string;
    vista: string;
  }[];
  categoria: string; // 'facial', 'senos', 'corporal'
  subcategoria?: string; // 'rinoplastia', 'mamoplastia', etc.
}

// Función para obtener casos desde WordPress
export async function getCasosFromWordPress(categoria?: string, procedimiento?: string): Promise<WordPressCaso[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://tu-wordpress.com';
    let url = `${baseUrl}/wp-json/wp/v2/casos?_embed&per_page=100`;
    
    // Filtrar por categoría si se especifica
    if (categoria) {
      url += `&categoria=${categoria}`;
    }
    
    // Filtrar por procedimiento si se especifica  
    if (procedimiento) {
      url += `&procedimiento=${procedimiento}`;
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // Revalidar cada hora
    });

    if (!response.ok) {
      throw new Error('Error al obtener casos de WordPress');
    }

    const casos = await response.json();
    
    // Transformar datos de WordPress a nuestro formato
    return casos.map((caso: any) => ({
      id: caso.id,
      title: caso.title.rendered,
      slug: caso.slug,
      edad: caso.acf?.edad || '30 años',
      descripcion: caso.content.rendered.replace(/<[^>]*>/g, '').substring(0, 200),
      procedimiento: caso.acf?.procedimiento || '',
      imagenes: caso.acf?.imagenes || [
        {
          antes: caso.acf?.imagen_antes || '/images/placeholder-antes.jpg',
          despues: caso.acf?.imagen_despues || '/images/placeholder-despues.jpg',
          vista: 'Vista Frontal'
        }
      ],
      categoria: caso.acf?.categoria || 'facial',
      subcategoria: caso.acf?.subcategoria || ''
    }));

  } catch (error) {
    console.error('Error al cargar casos de WordPress:', error);
    
    // Fallback: retornar casos por defecto si WordPress falla
    return getCasosFallback(categoria, procedimiento);
  }
}

// Casos de respaldo si WordPress no está disponible
function getCasosFallback(categoria?: string, procedimiento?: string): WordPressCaso[] {
  const casosFallback: WordPressCaso[] = [
    {
      id: 1,
      title: "Mamoplastia de Aumento",
      slug: "mamoplastia-aumento-caso-1",
      edad: "28 años",
      descripcion: "Aumento mamario con implantes de silicona para mejorar volumen y forma.",
      procedimiento: "mamoplastia-aumento",
      imagenes: [
        { antes: "/images/mamoplastia/caso1/frontal-antes.jpg", despues: "/images/mamoplastia/caso1/frontal-despues.jpg", vista: "Vista Frontal" },
        { antes: "/images/mamoplastia/caso1/perfil-antes.jpg", despues: "/images/mamoplastia/caso1/perfil-despues.jpg", vista: "Vista Perfil" }
      ],
      categoria: "senos",
      subcategoria: "mamoplastia-aumento"
    },
    // ... más casos
  ];

  // Filtrar según parámetros
  return casosFallback.filter(caso => {
    if (categoria && caso.categoria !== categoria) return false;
    if (procedimiento && caso.subcategoria !== procedimiento) return false;
    return true;
  });
}