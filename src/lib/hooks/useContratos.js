import { useState, useEffect, useCallback } from 'react';
import wpClient from '../wordpress-client';

export default function useContratos(initialFilters = {}) {
  const [contratos, setContratos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchContratos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await wpClient.getContratos(filters);
      setContratos(Array.isArray(response) ? response : response.data || []);
      
    } catch (err) {
      setError(err.message);
      setContratos([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchContratos();
  }, [fetchContratos]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const refetch = useCallback(() => {
    fetchContratos();
  }, [fetchContratos]);

  return {
    contratos,
    loading,
    error,
    filters,
    updateFilters,
    refetch
  };
}