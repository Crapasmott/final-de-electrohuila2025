'use client';

import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = login(username, password);

        if (result.success) {
            router.push('/admin/proveedores');
        } else {
            setError(result.message);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f8f9fa'
        }}>
            <div style={{
                width: '400px',
                padding: '30px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    color: '#003366',
                    marginBottom: '30px',
                    fontSize: '24px'
                }}>
                    Acceso Administrativo
                </h2>

                {error && (
                    <div style={{
                        backgroundColor: '#fee',
                        color: '#e63946',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label
                            htmlFor="username"
                            style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '500',
                                color: '#333'
                            }}
                        >
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                fontSize: '16px'
                            }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label
                            htmlFor="password"
                            style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontWeight: '500',
                                color: '#333'
                            }}
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                fontSize: '16px'
                            }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#0098d9',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                    >
                        Iniciar sesión
                    </button>
                </form>

                <div style={{
                    marginTop: '20px',
                    textAlign: 'center',
                    fontSize: '14px',
                    color: '#666'
                }}>
                    <p>Para acceder al sistema administrativo, utilice las credenciales proporcionadas por el administrador.</p>
                </div>
            </div>
        </div>
    );
}