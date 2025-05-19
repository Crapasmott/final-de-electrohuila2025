'use client';

import ProtectedRoute from '../ProtectedRoute';
import AdminDashboard from '../AdminDashboard';

export default function ProveedoresAdminPage() {
    return (
        <ProtectedRoute>
            <AdminDashboard />
        </ProtectedRoute>
    );
}