// hooks/useNews.ts
import { useState, useEffect, useCallback } from 'react';
import { newsAPI, WordPressPost, handleApiError } from '../lib/wordpress-api';

interface UseNewsOptions {
  initialLoad?: boolean;
  perPage?: number;
  category?: string;
}

interface UseNewsReturn {
  posts: WordPressPost[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
  fetchPosts: () => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  searchPosts: (query: string) => Promise<void>;
  filterByCategory: (categorySlug: string) => Promise<void>;
}

export const useNews = (options: UseNewsOptions = {}): UseNewsReturn => {
  const { initialLoad = true, perPage = 10, category } = options;
  
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState(category || '');

  const fetchPosts = useCallback(async (page = 1, append = false) => {
    try {
      setLoading(true);
      setError(null);
      
      let fetchedPosts: WordPressPost[];
      
      if (currentCategory) {
        fetchedPosts = await newsAPI.getPostsByCategory(currentCategory, perPage);
      } else if (searchQuery) {
        fetchedPosts = await newsAPI.getPosts({
          per_page: perPage,
          page,
          search: searchQuery
        });
      } else {
        fetchedPosts = await newsAPI.getPosts({
          per_page: perPage,
          page
        });
      }
      
      if (append && page > 1) {
        setPosts(prev => [...prev, ...fetchedPosts]);
      } else {
        setPosts(fetchedPosts);
      }
      
      setCurrentPage(page);
      
      // Verificar si hay más páginas (esto dependerá de tu API de WordPress)
      setHasMore(fetchedPosts.length === perPage);
      
    } catch (err) {
      setError(handleApiError(err));
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  }, [perPage, searchQuery, currentCategory]);

  const loadMore = useCallback(async () => {
    if (!loading && hasMore) {
      await fetchPosts(currentPage + 1, true);
    }
  }, [loading, hasMore, currentPage, fetchPosts]);

  const refresh = useCallback(async () => {
    setCurrentPage(1);
    setSearchQuery('');
    setCurrentCategory(category || '');
    await fetchPosts(1, false);
  }, [fetchPosts, category]);

  const searchPosts = useCallback(async (query: string) => {
    setSearchQuery(query);
    setCurrentCategory('');
    setCurrentPage(1);
    await fetchPosts(1, false);
  }, [fetchPosts]);

  const filterByCategory = useCallback(async (categorySlug: string) => {
    setCurrentCategory(categorySlug);
    setSearchQuery('');
    setCurrentPage(1);
    await fetchPosts(1, false);
  }, [fetchPosts]);

  // Cargar posts iniciales
  useEffect(() => {
    if (initialLoad) {
      fetchPosts(1, false);
    }
  }, [fetchPosts, initialLoad]);

  return {
    posts,
    loading,
    error,
    hasMore,
    currentPage,
    totalPages,
    fetchPosts: () => fetchPosts(1, false),
    loadMore,
    refresh,
    searchPosts,
    filterByCategory
  };
};

// Hook específico para noticias del home
export const useHomeNews = (limit = 6) => {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomeNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedPosts = await newsAPI.getRecentPosts(limit);
        setPosts(fetchedPosts);
      } catch (err) {
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchHomeNews();
  }, [limit]);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPosts = await newsAPI.getRecentPosts(limit);
      setPosts(fetchedPosts);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  }, [limit]);

  return {
    posts,
    loading,
    error,
    refresh
  };
};