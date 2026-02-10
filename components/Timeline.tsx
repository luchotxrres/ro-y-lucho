
import React from 'react';
import { TimelineItem } from '../types';

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative max-w-4xl mx-auto px-4 md:px-0">
      {/* Línea vertical central */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-wedding-accent/30 -translate-x-1/2 hidden md:block"></div>
      
      <div className="space-y-16 relative">
        {items.map((item, index) => (
          <div key={index} className={`flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            
            {/* Contenido */}
            <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'}`}>
              <div className="bg-wedding-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-wedding-neutral transition-transform hover:scale-[1.02] duration-300">
                <span className="inline-block text-wedding-accent font-serif text-2xl mb-2 italic">
                  {item.time} hs
                </span>
                <h3 className="text-xl font-serif text-wedding-primary mb-3 uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-wedding-text/70 text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Icono Central */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-16 h-16 bg-wedding-bg border-2 border-wedding-accent rounded-full z-10 shadow-md">
              <svg className="w-7 h-7 text-wedding-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
            </div>

            {/* Espaciador para el otro lado en Desktop */}
            <div className="hidden md:block md:w-1/2"></div>
          </div>
        ))}
      </div>

      {/* Punto final de la línea */}
      <div className="absolute left-8 md:left-1/2 bottom-0 w-3 h-3 bg-wedding-accent rounded-full -translate-x-1/2 hidden md:block"></div>
    </div>
  );
};
