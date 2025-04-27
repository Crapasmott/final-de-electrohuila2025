export const metadata = {
    title: 'Sistema de Notificaciones | Electrificadora del Huila',
    description: 'Sistema de notificaciones web oficial de la Electrificadora del Huila según los Artículos 68 y 69 de la Ley 1437 de 2011.',
};

export default async function NotificacionWebPage() {
    // Importar el componente cliente de forma dinámica
    const NotificacionWebUI = (await import('./NotificacionWebUI')).default;

    return <NotificacionWebUI />;
}