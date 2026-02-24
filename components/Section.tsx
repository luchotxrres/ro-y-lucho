
import React, { ReactNode } from 'react';

// Nota: El usuario mencionó img/flores.png, pero el archivo no se encuentra en el directorio.
// Usamos un placeholder temporal para que la app compile.
const floresSeparator1 = "https://www.transparentpng.com/download/floral/floral-divider-png-transparent-images--11.png";
const floresSeparator = "./img/flores.png";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = "", id }) => {
  return (
    <section 
      id={id}
      className={`relative py-24 px-6 ${className}`}
    >
      {/* Separador Floral Centrado en la unión de secciones */}
      <div className="absolute top-0 left-0 w-full md:h-32 pointer-events-none opacity-90 -translate-y-1/2 z-50">
        <img 
          src={floresSeparator} 
          alt="Floral separator" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};