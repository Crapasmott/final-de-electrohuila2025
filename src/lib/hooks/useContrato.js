import { useState, useEffect, useCallback } from 'react';
import wpClient from '../wordpress-client';

export default function useContrato(id) {
  const [contrato, setContrato] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContrato = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await wpClient.getContrato(id);
      setContrato(response);
      
    } catch (err) {
      setError(err.message);
      setContrato(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchContrato();
  }, [fetchContrato]);

  return {
    contrato,
    loading,
    error,
    refetch: fetchContrato
  };
}