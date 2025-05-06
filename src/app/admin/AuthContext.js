'use client';

import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verificar si hay un usuario en localStorage al cargar la página
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Función para iniciar sesión
    const login = (username, password) => {
        // En una aplicación real, esto debería validar contra un backend
        // Aquí simulamos un inicio de sesión con credenciales hardcoded
        if (username === 'admin' && password === 'admin123') {
            const userData = { username, role: 'admin' };
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return { success: true };
        }
        return { success: false, message: 'Credenciales incorrectas' };
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    // Función para comprobar si el usuario está autenticado
    const isAuthenticated = () => {
        return !!user;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
    return useContext(AuthContext);
}