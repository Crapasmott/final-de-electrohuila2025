// components/NoticiasHome.js
import Image from 'next/image';
import Link from 'next/link';

export default function NoticiasHome({ posts }) {
    return (
        <section className="py-10">
            <h2 className="text-3xl font-bold text-center text-blue-600">Noticias y Actualizaciones</h2>
            <p className="text-center text-gray-500 mb-10">Mantente informado sobre nuestras actividades, proyectos y novedades.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                {posts.map(post => {
                    const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                    const date = new Date(post.date).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    });
                    return (
                        <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                            {image && <img src={image} alt={post.title.rendered} className="w-full h-48 object-cover" />}
                            <div className="p-4">
                                <p className="text-sm text-gray-500">{date}</p>
                                <h3 className="font-bold text-blue-700 text-lg" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                <div className="text-gray-600 my-2" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                                <Link href={`/noticias/${post.slug}`}>
                                    <span className="inline-block mt-3 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">Leer Más</span>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
