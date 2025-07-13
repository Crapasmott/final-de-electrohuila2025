// pages/api/wordpress-news.ts
// CREAR ESTE ARCHIVO EXACTAMENTE EN ESTA RUTA
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Headers CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Parámetros de la query
    const { limit = 3 } = req.query;
    const maxPosts = parseInt(limit as string, 10);

    // DATOS ESTÁTICOS QUE SÍ FUNCIONAN
    const staticPosts = [
      {
        id: 1,
        title: {
          rendered: "Rendición de Cuentas de la vigencia 2024"
        },
        excerpt: {
          rendered: "La Gerente de ElectroHuila Dra. Nika D. Cuellar invita a la comunidad a participar en la Rendición de Cuentas correspondiente a la vigencia 2024."
        },
        date: "2024-05-15T10:00:00",
        slug: "rendicion-cuentas-2024",
        link: "/noticias/rendicion-cuentas-2024",
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "/images/mantenimiento.jpg",
            alt_text: "Rendición de Cuentas 2024"
          }]
        }
      },
      {
        id: 2,
        title: {
          rendered: "Mantenimiento Programado de Subestaciones"
        },
        excerpt: {
          rendered: "ElectroHuila informa sobre el mantenimiento programado que se realizará en las subestaciones de la región para mejorar la calidad del servicio eléctrico."
        },
        date: "2024-05-10T08:30:00",
        slug: "mantenimiento-subestaciones",
        link: "/noticias/mantenimiento-subestaciones",
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "/images/mantenimiento.jpg",
            alt_text: "Mantenimiento de Subestaciones"
          }]
        }
      },
      {
        id: 3,
        title: {
          rendered: "Nuevas Tarifas Eléctricas 2024"
        },
        excerpt: {
          rendered: "Se han establecido las nuevas tarifas eléctricas para el año 2024. Conoce los cambios en las tarifas residenciales, comerciales e industriales."
        },
        date: "2024-05-05T14:20:00",
        slug: "nuevas-tarifas-2024",
        link: "/noticias/nuevas-tarifas-2024",
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "/images/mantenimiento.jpg",
            alt_text: "Nuevas Tarifas 2024"
          }]
        }
      },
      {
        id: 4,
        title: {
          rendered: "Programa de Eficiencia Energética"
        },
        excerpt: {
          rendered: "ElectroHuila lanza un innovador programa de eficiencia energética dirigido a hogares y empresas del departamento del Huila."
        },
        date: "2024-04-28T09:15:00",
        slug: "eficiencia-energetica",
        link: "/noticias/eficiencia-energetica",
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "/images/mantenimiento.jpg",
            alt_text: "Eficiencia Energética"
          }]
        }
      },
      {
        id: 5,
        title: {
          rendered: "Modernización de la Red Eléctrica"
        },
        excerpt: {
          rendered: "Importante inversión en la modernización de la red eléctrica para garantizar un servicio más confiable y eficiente en toda la región."
        },
        date: "2024-04-22T11:45:00",
        slug: "modernizacion-red-electrica",
        link: "/noticias/modernizacion-red-electrica",
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "/images/mantenimiento.jpg",
            alt_text: "Modernización Red Eléctrica"
          }]
        }
      },
      {
        id: 6,
        title: {
          rendered: "Atención al Cliente Digital"
        },
        excerpt: {
          rendered: "Conoce los nuevos canales digitales de atención al cliente de ElectroHuila para mayor comodidad, rapidez y eficiencia en nuestros servicios."
        },
        date: "2024-04-18T16:30:00",
        slug: "atencion-cliente-digital",
        link: "/noticias/atencion-cliente-digital",
        _embedded: {
          'wp:featuredmedia': [{
            source_url: "/images/mantenimiento.jpg",
            alt_text: "Atención al Cliente Digital"
          }]
        }
      }
    ];

    // Limitar el número de posts según el parámetro
    const limitedPosts = staticPosts.slice(0, maxPosts);

    // Respuesta en formato que espera tu frontend
    return res.status(200).json({
      success: true,
      posts: limitedPosts,
      total: staticPosts.length,
      limit: maxPosts,
      message: 'Noticias cargadas correctamente'
    });

  } catch (error) {
    console.error('Error en API de noticias:', error);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      posts: [],
      total: 0,
      limit: 0,
      message: 'Error al cargar las noticias'
    });
  }
}