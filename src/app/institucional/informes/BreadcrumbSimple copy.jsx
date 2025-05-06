'use client';

import React from 'react';
import Link from 'next/link';

export default function BreadcrumbSimple({ items }) {
    return (
        <div className="breadcrumb-container">
            <nav aria-label="Migas de pan">
                <ol className="breadcrumb">
                    {items.map((item, index) => (
                        <li 
                            key={item.path} 
                            className={`breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`}
                        >
                            {index === items.length - 1 ? (
                                <span>{item.label}</span>
                            ) : (
                                <Link href={item.path}>
                                    {item.label}
                                </Link>
                            )}
                            {index < items.length - 1 && (
                                <span className="breadcrumb-separator"> / </span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
}