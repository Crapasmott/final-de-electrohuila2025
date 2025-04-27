// src/components/Breadcrumb.jsx
"use client";

import React from 'react';
import Link from 'next/link';

const Breadcrumb = ({ items }) => {
  return (
    <div className="breadcrumb-container">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol style={{ 
            display: 'flex', 
            listStyle: 'none', 
            margin: '0', 
            padding: '55px 0',
            flexWrap: 'wrap'
          }}>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <Link href="/" style={{ 
                color: '#ff7210', 
                textDecoration: 'none', 
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}>
                Inicio
              </Link>
              <span style={{ margin: '0 8px', color: '#999' }}>/</span>
            </li>
            
            {items.map((item, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                {index === items.length - 1 ? (
                  <span style={{ 
                    color: '#333', 
                    fontWeight: 'normal',
                    fontSize: '14px',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link href={item.url} style={{ 
                      color: '#333', 
                      textDecoration: 'none',
                      fontSize: '14px',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.label}
                    </Link>
                    <span style={{ margin: '0 8px', color: '#999' }}>/</span>
                  </>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;