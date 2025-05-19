"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

const MobileMenu = ({ isOpen, onClose, menuItems }) => {
  const menuRef = useRef(null);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Manejar clic fuera del menú para cerrarlo (opcional)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Si no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="mobile-menu-overlay">
      <div className="mobile-menu-container" ref={menuRef}>
        {/* Botón para cerrar el menú */}
        <div className="mobile-menu-header">
          <button 
            onClick={onClose}
            className="close-button"
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Lista de enlaces del menú */}
        <nav className="mobile-menu-nav">
          <ul className="mobile-menu-items">
            {menuItems.map((item, index) => (
              <li key={index} className="mobile-menu-item">
                <Link 
                  href={item.path} 
                  onClick={onClose}
                  className="mobile-menu-link"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <style jsx>{`
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          justify-content: center;
        }

        .mobile-menu-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 85%;
          max-width: 320px;
          height: 100%;
          background-color: white;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .mobile-menu-header {
          display: flex;
          justify-content: flex-end;
          padding: 15px;
          border-bottom: 1px solid #eee;
        }

        .close-button {
          background: none;
          border: none;
          cursor: pointer;
          color: #333;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-menu-nav {
          flex: 1;
          overflow-y: auto;
        }

        .mobile-menu-items {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .mobile-menu-item {
          border-bottom: 1px solid #eee;
        }

        .mobile-menu-link {
          display: block;
          padding: 15px;
          color: #333;
          text-decoration: none;
          font-size: 16px;
          transition: background-color 0.2s;
        }

        .mobile-menu-link:hover, .mobile-menu-link:active {
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
};

export default MobileMenu;