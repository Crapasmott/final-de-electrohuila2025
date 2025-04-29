'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Definir el tipo de usuario
interface User {
  id: string;
  username: string;
  name: string;
  role: string;
}

// Definir el tipo del contexto de autenticación
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuarios de ejemplo (en un sistema real, esto estaría en una base de datos)
const MOCK_USERS = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123', // En un sistema real, esto sería un hash
    name: 'Administrador',
    role: 'admin'
  },
  {
    id: '2',
    username: 'usuario',
    password: '123456', // En un sistema real, esto sería un hash
    name: 'Usuario Normal',
    role: 'user'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Verificar si hay una sesión activa al cargar la página
  useEffect(() => {
    // En un sistema real, aquí verificaríamos tokens o sesiones
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);
  
  // Función para iniciar sesión
  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulando una solicitud de API (en un sistema real, llamaríamos a un endpoint)
    setLoading(true);
    
    // Pequeño retraso para simular la llamada a la API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verificar credenciales
    const foundUser = MOCK_USERS.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      // Usuario encontrado, extraer datos sin la contraseña
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Guardar en el estado y localStorage
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };
  
  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  // Determinar si el usuario está autenticado
  const isAuthenticated = !!user;
  
  // Valores que se pasan a través del contexto
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para usar el contexto de autenticación
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}