import React from 'react';
import { WEDDING_DATA } from '../constants';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GiftModal: React.FC<GiftModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copiado al portapapeles");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wedding-primary/40 backdrop-blur-md animate-fade-in">
      <div className="bg-wedding-white rounded-[3rem] p-10 md:p-14 max-w-md w-full shadow-2xl relative border border-wedding-neutral">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-wedding-neutral hover:text-wedding-primary transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-wedding-bg rounded-full flex items-center justify-center mx-auto mb-8 text-wedding-accent border border-wedding-neutral">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20 12V8a2 2 0 00-2-2H6a2 2 0 00-2 2v4m16 0v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8m16 0H4m8-6v16">
              </path>
              <path d="M12 6a2 2 0 002-2 2 2 0 00-2-2 2 2 0 00-2 2 2 2 0 002 2z"></path>
            </svg>          
          </div>
          <h3 className="text-4xl font-serif text-wedding-primary mb-4 italic">Regalos</h3>
          <p className="text-wedding-text font-light text-lg">Tu presencia es nuestro mejor regalo, pero si deseás hacernos un obsequio:</p>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-wedding-bg rounded-[2rem] border border-wedding-neutral group">
            <p className="text-[10px] text-wedding-secondary uppercase tracking-[0.3em] font-bold mb-2">CBU</p>
            <div className="flex justify-between items-center">
              <span className="font-mono text-sm text-wedding-text break-all mr-4">{WEDDING_DATA.giftInfo.cbu}</span>
              <button onClick={() => handleCopy(WEDDING_DATA.giftInfo.cbu)} className="text-wedding-neutral hover:text-wedding-accent flex-shrink-0 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>

          <div className="p-6 bg-wedding-bg rounded-[2rem] border border-wedding-neutral group">
            <p className="text-[10px] text-wedding-secondary uppercase tracking-[0.3em] font-bold mb-2">Alias</p>
            <div className="flex justify-between items-center">
              <span className="font-serif italic text-xl text-wedding-primary">{WEDDING_DATA.giftInfo.alias}</span>
              <button onClick={() => handleCopy(WEDDING_DATA.giftInfo.alias)} className="text-wedding-neutral hover:text-wedding-accent transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>

          <div className="text-xs text-wedding-secondary/60 text-center pt-4 space-y-1 font-sans tracking-widest uppercase">
            <p>Titular: {WEDDING_DATA.giftInfo.titular}</p>
            <p>Banco: {WEDDING_DATA.giftInfo.bank}</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-10 py-5 bg-wedding-primary text-wedding-white rounded-2xl text-[11px] font-bold tracking-[0.5em] uppercase hover:bg-wedding-secondary transition-all shadow-xl active:scale-95"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};