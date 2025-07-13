// lib/wordpress-client.js
class WordPressClient {
    constructor() {
        this.baseURL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://electrohuila.com.co';
        this.apiBase = `${this.baseURL}/wp-json`;
        this.timeout = 10000; // 10 segundos
    }

    // Método base para peticiones HTTP
    async request(endpoint, options = {}) {
        const url = `${this.apiBase}${endpoint}`;

        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers,
            },
            timeout: this.timeout,
            ...options,
        };

        // Para FormData, no incluir Content-Type
        if (options.body instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(url, {
                ...config,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            console.error('WordPress API Error:', error);
            throw error;
        }
    }

    // CONTRATOS - Obtener lista
    async getContratos(params = {}) {
        const queryParams = new URLSearchParams(params).toString();
        const endpoint = `/contratos/v1/list${queryParams ? `?${queryParams}` : ''}`;
        return this.request(endpoint);
    }

    // CONTRATOS - Obtener uno específico
    async getContrato(id) {
        return this.request(`/contratos/v1/${id}`);
    }

    // CONTRATOS - Crear nuevo
    async createContrato(data, files = {}) {
        const formData = new FormData();

        // Agregar datos del formulario
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        // Agregar archivos
        Object.entries(files).forEach(([key, file]) => {
            if (file) {
                formData.append(key, file);
            }
        });

        return this.request('/contratos/v1/create', {
            method: 'POST',
            body: formData
        });
    }

    // CONTRATOS - Actualizar
    async updateContrato(id, data, files = {}) {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        Object.entries(files).forEach(([key, file]) => {
            if (file) {
                formData.append(key, file);
            }
        });

        return this.request(`/contratos/v1/update/${id}`, {
            method: 'PUT',
            body: formData
        });
    }

    // CONTRATOS - Eliminar
    async deleteContrato(id) {
        return this.request(`/contratos/v1/delete/${id}`, {
            method: 'DELETE'
        });
    }

    // UTILIDADES - Construir URL de descarga
    getDownloadUrl(filePath) {
        if (!filePath) return null;

        // Si ya es una URL completa
        if (filePath.startsWith('http')) {
            return filePath;
        }

        // Si es un path relativo
        return `${this.baseURL}/wp-content/uploads/contratos/${filePath}`;
    }

    // ESTADÍSTICAS
    async getEstadisticas() {
        return this.request('/contratos/v1/estadisticas');
    }

    // FILTROS DISPONIBLES
    async getFiltros() {
        return this.request('/contratos/v1/filtros');
    }
}

// Instancia singleton
const wpClient = new WordPressClient();

export default wpClient;

// Hooks React para usar en componentes
export { default as useContratos } from './hooks/useContratos';
export { default as useContrato } from './hooks/useContrato';