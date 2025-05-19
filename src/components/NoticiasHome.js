'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NoticiasHome() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeVideo, setActiveVideo] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // ID del canal de YouTube de Electrohuila (reemplaza con el ID real)
    const channelId = 'UCwMQQwcB8xrpSXQSS3yGpUQ'; // Reemplaza con tu ID real

    // Cantidad de videos a mostrar
    const maxResults = 3;

    useEffect(() => {
        // Función para cargar videos
        const fetchVideos = async () => {
            try {
                setLoading(true);

                // API Key de YouTube (debes crear una en Google Developer Console)
                const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
                const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${apiKey}`;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error al cargar videos de YouTube');
                }

                const data = await response.json();

                // Formateamos los videos
                const formattedVideos = data.items.map(item => ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnail: item.snippet.thumbnails.high.url,
                    publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    })
                }));

                setVideos(formattedVideos);
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar videos:', err);
                setError(err.message);
                setLoading(false);

                // Datos de prueba en caso de error
                setVideos([
                    {
                        id: 'E6mVVQHnKhY',
                        title: 'ElectroHuila - Energía que Transforma',
                        description: 'Conoce nuestros servicios y compromiso con la región',
                        thumbnail: 'https://i.ytimg.com/vi/E6mVVQHnKhY/hqdefault.jpg',
                        publishedAt: '15 de febrero, 2025'
                    },
                    {
                        id: 'LXb3EKWsInQ',
                        title: 'Programa de Eficiencia Energética',
                        description: 'Aprende cómo ahorrar energía en tu hogar',
                        thumbnail: 'https://i.ytimg.com/vi/LXb3EKWsInQ/hqdefault.jpg',
                        publishedAt: '10 de febrero, 2025'
                    },
                    {
                        id: '9bZkp7q19f0',
                        title: 'Mejoras en la Red Eléctrica del Huila',
                        description: 'Avances en infraestructura para un mejor servicio',
                        thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg',
                        publishedAt: '1 de febrero, 2025'
                    }
                ]);
            }
        };

        fetchVideos();

        // Actualizar los videos cada hora
        const interval = setInterval(fetchVideos, 60 * 60 * 1000);

        return () => clearInterval(interval);
    }, [channelId]);

    // Función para abrir el modal con el video
    const openVideoModal = (videoId) => {
        setActiveVideo(videoId);
        setShowModal(true);
        document.body.style.overflow = 'hidden'; // Evitar scroll
    };

    // Función para cerrar el modal
    const closeVideoModal = () => {
        setShowModal(false);
        setActiveVideo(null);
        document.body.style.overflow = 'auto'; // Restaurar scroll
    };

    return (
        <section className="py-10 relative overflow-hidden">
            {/* Barra de color rojo estilo YouTube */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-500"></div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-blue-600 mb-3 relative inline-block">
                        <span className="flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                            Canal de ElectroHuila
                        </span>
                        <span className="block w-24 h-1 bg-red-500 mx-auto mt-2 rounded-full"></span>
                    </h2>
                    <p className="text-gray-500">Mantente informado con nuestros últimos videos sobre servicios y consejos.</p>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {error && !videos.length && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center">
                        No se pudieron cargar los videos. Por favor, intenta más tarde.
                    </div>
                )}

                {videos.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {videos.map(video => (
                            <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                                <div
                                    className="relative cursor-pointer overflow-hidden"
                                    onClick={() => openVideoModal(video.id)}
                                >
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-red-500 font-medium">{video.publishedAt}</p>
                                    <h3 className="font-bold text-blue-700 text-lg mb-2 line-clamp-2">
                                        {video.title}
                                    </h3>
                                    <p className="text-gray-600 mb-3 line-clamp-2">
                                        {video.description}
                                    </p>
                                    <button
                                        onClick={() => openVideoModal(video.id)}
                                        className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors"
                                    >
                                        <span>Ver video</span>
                                        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-8">
                    <a
                        href={`https://www.youtube.com/channel/${channelId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow font-medium"
                    >
                        <span>Ver más videos</span>
                        <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </a>
                </div>
            </div>

            {/* Modal para reproducir video */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90">
                    <div className="relative w-full max-w-4xl">
                        <button
                            onClick={closeVideoModal}
                            className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>

                        <div className="relative pb-[56.25%] h-0">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}