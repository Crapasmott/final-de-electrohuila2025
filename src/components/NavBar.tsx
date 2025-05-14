// Ejemplo de cómo actualizar el NavBar para incluir el enlace a Puntos de Pago
// Este código debería ajustarse a tu estructura de componentes específica

// Si tienes un componente NavBar.tsx, puedes agregar el enlace así:
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();
  
  // Añade esta entrada a tu array de enlaces de navegación
  const navLinks = [
    // Otros enlaces existentes...
    {
      name: 'Puntos de Pago',
      href: '/puntos-de-pago',
      // Si tienes un sistema de iconos, puedes agregar un icono
      icon: 'MapPinIcon' // Ejemplo con Heroicons
    },
    // Resto de enlaces...
  ];
  
  return (
    <nav className="bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold">
                {/* Logo */}
                Electrohuila
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === link.href
                        ? 'bg-blue-700 text-white'
                        : 'text-gray-100 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Código del menú móvil, si lo tienes */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;