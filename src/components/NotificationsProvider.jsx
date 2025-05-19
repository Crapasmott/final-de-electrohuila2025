// app/components/NotificationsProvider.jsx
'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

export default function NotificationsProvider() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    
    const channel = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      authEndpoint: '/api/pusher/auth'
    });

    const tramitesChannel = channel.subscribe(`private-user-${session.user.id}`);
    
    tramitesChannel.bind('estado-actualizado', (data) => {
      toast.success(`Tu trámite ${data.tramiteId} cambió a ${data.estado}`);
    });

    return () => channel.unsubscribe(`private-user-${session.user.id}`);
  }, [session]);

  return null;
}