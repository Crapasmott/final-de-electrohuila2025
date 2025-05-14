'use client';

import React from 'react';
import Link from 'next/link';

export default function BreadcrumbSimple() {
    return (
        <div className="breadcrumb-container">
            <div className="container">
                <nav aria-label="Migas de pan">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link href="/">Inicio</Link>
                            <span className="breadcrumb-separator"> / </span>
                        </li>
                        <li className="breadcrumb-item">
                            <Link href="/institucional">Institucional</Link>
                            <span className="breadcrumb-separator"> / </span>
                        </li>
                        <li className="breadcrumb-item active">
                            <span>Quiénes Somos</span>
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
    );
}