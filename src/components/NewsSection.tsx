// components/NewsSection.tsx
import React, { useState, useEffect } from 'react';
import { newsAPI, WordPressPost, getCleanExcerpt, handleApiError } from '../lib/wordpress-api';

interface NewsSectionProps {
  maxPosts?: number;
  showTitle?: boolean;
  className?: string;
}

const NewsSection: React.FC<NewsSectionProps> = ({ 
  maxPosts = 6, 
  showTitle = true, 
  className = '' 
}) => {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await newsAPI.getRecentPosts(maxPosts);
        setPosts(fetchedPosts);
      } catch (err) {
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [maxPosts]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getFeaturedImage = (post: WordPressPost) => {
    if (post._embedded && post._embedded['wp:featuredmedia']) {
      return post._embedded['wp:featuredmedia'][0]?.source_url;
    }
    return '/images/default-news.jpg'; // Imagen por defecto
  };

  const getImageAlt = (post: WordPressPost) => {
    if (post._embedded && post._embedded['wp:featuredmedia']) {
      return post._embedded['wp:featuredmedia'][0]?.alt_text || post.title.rendered;
    }
    return post.title.rendered;
  };

  if (loading) {
    return (
      <div className={`py-16 ${className}`}>
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Noticias y Actualizaciones
            </h2>
            <p className="text-lg text-gray-600">
              Mantente informado sobre nuestras actividades, proyectos y novedades.
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(maxPosts)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="h-3 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-4"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`py-16 ${className}`}>
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Error al cargar las noticias
            </h3>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Intentar nuevamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-16 ${className}`}>
      {showTitle && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Noticias y Actualizaciones
          </h2>
          <p className="text-lg text-gray-600">
            Mantente informado sobre nuestras actividades, proyectos y novedades.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <img
                src={getFeaturedImage(post)}
                alt={getImageAlt(post)}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/default-news.jpg';
                }}
              />
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                {formatDate(post.date)}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                {post.title.rendered}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {getCleanExcerpt(post)}
              </p>
              
              <button
                onClick={() => {
                  // Aquí puedes implementar la navegación o modal
                  window.open(post.link, '_blank');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Leer Más
              </button>
            </div>
          </article>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hay noticias disponibles en este momento.</p>
        </div>
      )}
    </div>
  );
};

export default NewsSection;