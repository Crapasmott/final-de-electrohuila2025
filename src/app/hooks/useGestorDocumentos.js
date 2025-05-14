import { useState, useEffect, useCallback, useReducer } from 'react';

// Estado inicial
const estadoInicial = {
    documentos: [],
    cargando: false,
    error: null,
    filtros: {},
    paginacion: {
        pagina: 1,
        limite: 10,
        total: 0
    }
};

// Acciones
const TIPOS_ACCION = {
    INICIAR_CARGA: 'INICIAR_CARGA',
    CARGAR_EXITO: 'CARGAR_EXITO',
    CARGAR_ERROR: 'CARGAR_ERROR',
    ACTUALIZAR_FILTROS: 'ACTUALIZAR_FILTROS',
    CAMBIAR_PAGINA: 'CAMBIAR_PAGINA',
    CAMBIAR_LIMITE: 'CAMBIAR_LIMITE',
    AGREGAR_DOCUMENTO: 'AGREGAR_DOCUMENTO',
    ACTUALIZAR_DOCUMENTO: 'ACTUALIZAR_DOCUMENTO',
    ELIMINAR_DOCUMENTO: 'ELIMINAR_DOCUMENTO',
    PUBLICAR_DOCUMENTO: 'PUBLICAR_DOCUMENTO'
};

// Reducer para manejar el estado
const documentosReducer = (state, action) => {
    switch (action.type) {
        case TIPOS_ACCION.INICIAR_CARGA:
            return {
                ...state,
                cargando: true,
                error: null
            };

        case TIPOS_ACCION.CARGAR_EXITO:
            return {
                ...state,
                documentos: action.payload.documentos,
                paginacion: {
                    ...state.paginacion,
                    total: action.payload.total || action.payload.documentos.length
                },
                cargando: false,
                error: null
            };

        case TIPOS_ACCION.CARGAR_ERROR:
            return {
                ...state,
                cargando: false,
                error: action.payload
            };

        case TIPOS_ACCION.ACTUALIZAR_FILTROS:
            return {
                ...state,
                filtros: {
                    ...state.filtros,
                    ...action.payload
                },
                paginacion: {
                    ...state.paginacion,
                    pagina: 1 // Resetear a primera página cuando cambian filtros
                }
            };

        case TIPOS_ACCION.CAMBIAR_PAGINA:
            return {
                ...state,
                paginacion: {
                    ...state.paginacion,
                    pagina: action.payload
                }
            };

        case TIPOS_ACCION.CAMBIAR_LIMITE:
            return {
                ...state,
                paginacion: {
                    ...state.paginacion,
                    limite: action.payload,
                    pagina: 1 // Resetear a primera página cuando cambia el límite
                }
            };

        case TIPOS_ACCION.AGREGAR_DOCUMENTO:
            return {
                ...state,
                documentos: [action.payload, ...state.documentos],
                paginacion: {
                    ...state.paginacion,
                    total: state.paginacion.total + 1
                }
            };

        case TIPOS_ACCION.ACTUALIZAR_DOCUMENTO:
            return {
                ...state,
                documentos: state.documentos.map(doc =>
                    doc.id === action.payload.id ? { ...doc, ...action.payload } : doc
                )
            };

        case TIPOS_ACCION.ELIMINAR_DOCUMENTO:
            return {
                ...state,
                documentos: state.documentos.filter(doc => doc.id !== action.payload),
                paginacion: {
                    ...state.paginacion,
                    total: state.paginacion.total - 1
                }
            };

        case TIPOS_ACCION.PUBLICAR_DOCUMENTO:
            return {
                ...state,
                documentos: state.documentos.map(doc =>
                    doc.id === action.payload.id ? { ...doc, publicado: action.payload.publicado } : doc
                )
            };

        default:
            return state;
    }
};

/**
 * Hook personalizado para la gestión de documentos
 * @param {object} opcionesIniciales - Opciones iniciales para el gestor
 * @returns {object} - Estado y métodos para gestionar documentos
 */
export function useGestorDocumentos(opcionesIniciales = {}) {
    const [state, dispatch] = useReducer(documentosReducer, {
        ...estadoInicial,
        filtros: opcionesIniciales.filtrosIniciales || {},
        paginacion: {
            ...estadoInicial.paginacion,
            limite: opcionesIniciales.limite || 10
        }
    });

    const { documentos, cargando, error, filtros, paginacion } = state;

    // Obtener documentos desde la API
    const obtenerDocumentos = useCallback(async (filtrosAdicionales = {}) => {
        dispatch({ type: TIPOS_ACCION.INICIAR_CARGA });

        try {
            const params = new URLSearchParams();

            // Agregar filtros actuales
            Object.entries({ ...filtros, ...filtrosAdicionales }).forEach(([clave, valor]) => {
                if (valor !== undefined && valor !== null && valor !== '') {
                    params.append(clave, valor);
                }
            });

            // Agregar paginación
            params.append('pagina', paginacion.pagina);
            params.append('limite', paginacion.limite);

            const respuesta = await fetch(`/api/documentos?${params}`);

            if (!respuesta.ok) {
                throw new Error(`Error al obtener documentos: ${respuesta.status}`);
            }

            const datos = await respuesta.json();

            dispatch({
                type: TIPOS_ACCION.CARGAR_EXITO,
                payload: {
                    documentos: datos.items || datos,
                    total: datos.total
                }
            });

            return datos;
        } catch (err) {
            dispatch({ type: TIPOS_ACCION.CARGAR_ERROR, payload: err.message });
            throw err;
        }
    }, [filtros, paginacion.pagina, paginacion.limite]);

    // Actualizar filtros
    const actualizarFiltros = useCallback((nuevosFiltros) => {
        dispatch({ type: TIPOS_ACCION.ACTUALIZAR_FILTROS, payload: nuevosFiltros });
    }, []);

    // Cambiar página
    const cambiarPagina = useCallback((nuevaPagina) => {
        dispatch({ type: TIPOS_ACCION.CAMBIAR_PAGINA, payload: nuevaPagina });
    }, []);

    // Cambiar límite de elementos por página
    const cambiarLimite = useCallback((nuevoLimite) => {
        dispatch({ type: TIPOS_ACCION.CAMBIAR_LIMITE, payload: nuevoLimite });
    }, []);

    // Crear un nuevo documento
    const crearDocumento = useCallback(async (nuevoDocumento) => {
        try {
            const respuesta = await fetch('/api/documentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoDocumento)
            });

            if (!respuesta.ok) {
                throw new Error(`Error al crear documento: ${respuesta.status}`);
            }

            const documentoCreado = await respuesta.json();

            dispatch({ type: TIPOS_ACCION.AGREGAR_DOCUMENTO, payload: documentoCreado });

            return documentoCreado;
        } catch (err) {
            console.error('Error al crear documento:', err);
            throw err;
        }
    }, []);

    // Actualizar un documento
    const actualizarDocumento = useCallback(async (id, cambios) => {
        try {
            const respuesta = await fetch(`/api/documentos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cambios)
            });

            if (!respuesta.ok) {
                throw new Error(`Error al actualizar documento: ${respuesta.status}`);
            }

            const documentoActualizado = await respuesta.json();

            dispatch({
                type: TIPOS_ACCION.ACTUALIZAR_DOCUMENTO,
                payload: documentoActualizado
            });

            return documentoActualizado;
        } catch (err) {
            console.error('Error al actualizar documento:', err);
            throw err;
        }
    }, []);

    // Eliminar un documento
    const eliminarDocumento = useCallback(async (id) => {
        try {
            const respuesta = await fetch(`/api/documentos/${id}`, {
                method: 'DELETE'
            });

            if (!respuesta.ok) {
                throw new Error(`Error al eliminar documento: ${respuesta.status}`);
            }

            dispatch({ type: TIPOS_ACCION.ELIMINAR_DOCUMENTO, payload: id });

            return true;
        } catch (err) {
            console.error('Error al eliminar documento:', err);
            throw err;
        }
    }, []);

    // Publicar o despublicar un documento
    const cambiarEstadoPublicacion = useCallback(async (id, publicado) => {
        try {
            const respuesta = await fetch(`/api/documentos/${id}/publicar`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ publicado })
            });

            if (!respuesta.ok) {
                throw new Error(`Error al cambiar estado de publicación: ${respuesta.status}`);
            }

            dispatch({
                type: TIPOS_ACCION.PUBLICAR_DOCUMENTO,
                payload: { id, publicado }
            });

            return true;
        } catch (err) {
            console.error('Error al cambiar estado de publicación:', err);
            throw err;
        }
    }, []);

    // Cargar documentos al cambiar la página, límite o filtros
    useEffect(() => {
        if (opcionesIniciales.cargarAutomaticamente !== false) {
            obtenerDocumentos();
        }
    }, [paginacion.pagina, paginacion.limite, filtros, obtenerDocumentos, opcionesIniciales.cargarAutomaticamente]);

    return {
        documentos,
        cargando,
        error,
        filtros,
        paginacion,
        obtenerDocumentos,
        actualizarFiltros,
        cambiarPagina,
        cambiarLimite,
        crearDocumento,
        actualizarDocumento,
        eliminarDocumento,
        cambiarEstadoPublicacion
    };
}