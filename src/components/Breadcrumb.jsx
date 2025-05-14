import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex py-3 px-1 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRight size={16} className="mx-1 text-gray-400" />
            )}
            {index === items.length - 1 ? (
              <span className="text-gray-600 font-medium">{item.label}</span>
            ) : (
              <Link 
                href={item.url}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}