// lib/wordpress-api.ts
const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://electrohuila.com.co';
const API_BASE = `${WORDPRESS_URL}/wp-json/wp/v2`;

// Tipos de datos
export interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  modified: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  slug: string;
  link: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text: string;
  caption: {
    rendered: string;
  };
  title: {
    rendered: string;
  };
}

// Funciones para Noticias
export const newsAPI = {
  // Obtener todas las noticias
  async getPosts(params?: {
    per_page?: number;
    page?: number;
    categories?: number[];
    search?: string;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.categories) queryParams.append('categories', params.categories.join(','));
    if (params?.search) queryParams.append('search', params.search);
    
    // Incluir featured media
    queryParams.append('_embed', 'wp:featuredmedia');
    
    const response = await fetch(`${API_BASE}/posts?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.status}`);
    }
    
    return response.json() as Promise<WordPressPost[]>;
  },

  // Obtener una noticia específica
  async getPost(id: number) {
    const response = await fetch(`${API_BASE}/posts/${id}?_embed=wp:featuredmedia`);
    
    if (!response.ok) {
      throw new Error(`Error fetching post: ${response.status}`);
    }
    
    return response.json() as Promise<WordPressPost>;
  },

  // Obtener noticias por categoría
  async getPostsByCategory(categorySlug: string, limit = 10) {
    // Primero obtener el ID de la categoría
    const categoryResponse = await fetch(`${API_BASE}/categories?slug=${categorySlug}`);
    const categories = await categoryResponse.json();
    
    if (categories.length === 0) {
      throw new Error(`Category not found: ${categorySlug}`);
    }
    
    const categoryId = categories[0].id;
    
    return this.getPosts({
      categories: [categoryId],
      per_page: limit
    });
  },

  // Obtener noticias recientes para el home
  async getRecentPosts(limit = 6) {
    return this.getPosts({
      per_page: limit,
      page: 1
    });
  }
};

// Funciones para Archivos y Documentos
export const filesAPI = {
  // Obtener archivos por custom post type
  async getFilesByType(postType: string, params?: {
    per_page?: number;
    meta_key?: string;
    meta_value?: string;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.meta_key) queryParams.append('meta_key', params.meta_key);
    if (params?.meta_value) queryParams.append('meta_value', params.meta_value);
    
    const response = await fetch(`${API_BASE}/${postType}?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching ${postType}: ${response.status}`);
    }
    
    return response.json();
  },

  // Obtener metadatos de un post
  async getPostMeta(postId: number) {
    const response = await fetch(`${API_BASE}/posts/${postId}/meta`);
    
    if (!response.ok) {
      throw new Error(`Error fetching post meta: ${response.status}`);
    }
    
    return response.json();
  }
};

// Funciones para Contrataciones
export const contractsAPI = {
  // Obtener contrataciones con filtros
  async getContracts(params?: {
    per_page?: number;
    page?: number;
    search?: string;
    status?: string;
    date_from?: string;
    date_to?: string;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.status) queryParams.append('meta_key', 'status');
    if (params?.status) queryParams.append('meta_value', params.status);
    
    const response = await fetch(`${API_BASE}/contratos?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching contracts: ${response.status}`);
    }
    
    return response.json();
  },

  // Obtener detalles de una contratación
  async getContract(id: number) {
    const response = await fetch(`${API_BASE}/contratos/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching contract: ${response.status}`);
    }
    
    return response.json();
  }
};

// Función utilitaria para manejar errores
export const handleApiError = (error: any) => {
  console.error('WordPress API Error:', error);
  
  if (error.message.includes('fetch')) {
    return 'Error de conexión. Verifique su conexión a internet.';
  }
  
  if (error.message.includes('404')) {
    return 'Contenido no encontrado.';
  }
  
  if (error.message.includes('500')) {
    return 'Error interno del servidor.';
  }
  
  return 'Error al cargar el contenido.';
};

// Función para limpiar HTML de WordPress
export const cleanWordPressContent = (content: string) => {
  // Remover tags HTML básicos pero mantener estructura
  return content
    .replace(/<p>/g, '')
    .replace(/<\/p>/g, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .trim();
};

// Función para extraer excerpt limpio
export const getCleanExcerpt = (post: WordPressPost, maxLength = 150) => {
  let excerpt = post.excerpt.rendered;
  
  // Limpiar HTML
  excerpt = cleanWordPressContent(excerpt);
  
  // Truncar si es muy largo
  if (excerpt.length > maxLength) {
    excerpt = excerpt.substring(0, maxLength) + '...';
  }
  
  return excerpt;
};
