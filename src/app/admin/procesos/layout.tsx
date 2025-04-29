'use client';

import { AuthProvider } from '../context/auth-context';
import { ProcesosProvider } from '../context/procesos-context';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <AuthProvider>
        <ProcesosProvider>
          {children}
        </ProcesosProvider>
      </AuthProvider>
    </div>
  );
}