'use client';

import { AuthProvider } from './AuthContext';

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}