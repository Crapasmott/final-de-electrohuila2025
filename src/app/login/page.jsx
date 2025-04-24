'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Complete todos los campos');
      return;
    }
    
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      });

      if (result?.error) {
        setError('Credenciales inválidas');
        setIsLoading(false);
        return;
      }

      router.push('/institucional/informes');
    } catch (error) {
      setError('Error de conexión');
      setIsLoading(false);
    }
  };

  // Estilos directos para evitar problemas con Tailwind
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    },
    formContainer: {
      width: '100%',
      maxWidth: '400px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    },
    header: {
      backgroundColor: '#0066cc',
      padding: '24px',
      textAlign: 'center',
      color: 'white'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '0 0 8px 0'
    },
    subtitle: {
      fontSize: '14px',
      opacity: '0.9',
      margin: 0
    },
    formBody: {
      padding: '24px'
    },
    error: {
      backgroundColor: '#fee2e2',
      color: '#b91c1c',
      padding: '12px',
      borderRadius: '4px',
      fontSize: '14px',
      marginBottom: '16px'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#2563eb',
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#0066cc',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease-in-out'
    },
    buttonHover: {
      backgroundColor: '#0052a3'
    },
    buttonDisabled: {
      backgroundColor: '#93c5fd',
      cursor: 'not-allowed'
    },
    footer: {
      padding: '16px 24px',
      borderTop: '1px solid #e5e7eb',
      textAlign: 'center',
      fontSize: '12px',
      color: '#6b7280',
      backgroundColor: '#f9fafb'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>Iniciar sesión</h1>
          <p style={styles.subtitle}>Ingrese sus credenciales para acceder al sistema</p>
        </div>
        
        <div style={styles.formBody}>
          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                placeholder="usuario@electrohuila.com"
                autoComplete="email"
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.button,
                ...(isLoading ? styles.buttonDisabled : {})
              }}
            >
              {isLoading ? 'Procesando...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
        
        <div style={styles.footer}>
          © 2025 Electrohuila. Todos los derechos reservados.
        </div>
      </div>
    </div>
  );
}