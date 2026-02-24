
import React, { useState } from 'react';
import { WEDDING_DATA } from '../constants';

export const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'confirm',
    diet: 'standard',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Usamos modo 'no-cors' si el script de Google no maneja preflight correctamente,
      // pero para Apps Script lo ideal es enviar como parámetros o JSON.
      // Nota: Apps Script requiere redirecciones, fetch las maneja por defecto.
      const response = await fetch(WEDDING_DATA.googleSheetsScriptUrl as string, {
        method: 'POST',
        mode: 'no-cors', // Importante para evitar errores de CORS con Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toLocaleString(),
        }),
      });

      // Con no-cors no podemos ver la respuesta, pero si no lanza error asumimos éxito
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting RSVP:", err);
      setError("Hubo un problema al enviar tu respuesta. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted && formData.attendance === 'confirm') {
    return (
      <div className="text-center py-16 animate-fade-in bg-wedding-white rounded-[3rem] shadow-sm border border-wedding-neutral">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
           </svg>
        </div>
        <h3 className="text-4xl font-serif mb-6 text-wedding-primary italic">Gracias por ser parte!</h3>
        <p className="text-wedding-text text-lg">Nos llena el corazón saber que compartirás este día con nosotros. Celebrar el amor junto a quienes amamos es el mayor regalo.</p>
        {/* <button 
          onClick={() => setIsSubmitted(false)}
          className="mt-10 text-xs font-bold uppercase tracking-[0.3em] text-wedding-accent hover:text-wedding-primary transition-colors underline"
        >
          Enviar otra respuesta
        </button> */}
      </div>
    );
  } else if (isSubmitted && formData.attendance === 'reject') {
    return (
      <div className="text-center py-16 animate-fade-in bg-wedding-white rounded-[3rem] shadow-sm border border-wedding-neutral">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
           </svg>
        </div>
        <h3 className="text-4xl font-serif mb-6 text-wedding-primary italic">Te vamos a extrañar</h3>
        <p className="text-wedding-text text-lg">Aunque no puedas asistir, valoramos tu cariño y tus buenos deseos. Eso también forma parte de nuestra celebración.</p>
        {/* <button 
          onClick={() => setIsSubmitted(false)}
          className="mt-10 text-xs font-bold uppercase tracking-[0.3em] text-wedding-accent hover:text-wedding-primary transition-colors underline"
        >
          Enviar otra respuesta
        </button> */}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-wedding-white p-10 md:p-14 rounded-[3rem] shadow-sm border border-wedding-neutral space-y-8 relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-wedding-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-wedding-accent border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[10px] uppercase tracking-widest text-wedding-primary font-bold">Enviando respuesta...</p>
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-wedding-secondary uppercase tracking-[0.3em] mb-3">Nombre Completo</label>
        <input
          required
          disabled={isLoading}
          type="text"
          className="w-full px-6 py-4 bg-wedding-bg border border-wedding-neutral rounded-2xl focus:outline-none focus:ring-2 focus:ring-wedding-accent/20 focus:border-wedding-accent transition text-wedding-text disabled:opacity-50"
          placeholder="Tu nombre y apellido"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => setFormData({...formData, attendance: 'confirm'})}
          className={`py-5 rounded-2xl border-2 transition-all font-bold text-[11px] uppercase tracking-[0.2em] shadow-sm ${
            formData.attendance === 'confirm' 
            ? 'bg-wedding-primary text-wedding-white border-wedding-primary scale-[1.02]' 
            : 'bg-wedding-white text-wedding-secondary border-wedding-neutral hover:border-wedding-accent'
          } disabled:opacity-50`}
        >
          Asistiré
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => setFormData({...formData, attendance: 'reject'})}
          className={`py-5 rounded-2xl border-2 transition-all font-bold text-[11px] uppercase tracking-[0.2em] shadow-sm ${
            formData.attendance === 'reject' 
            ? 'bg-wedding-primary text-wedding-white border-wedding-primary scale-[1.02]' 
            : 'bg-wedding-white text-wedding-secondary border-wedding-neutral hover:border-wedding-accent'
          } disabled:opacity-50`}
        >
          No podré ir
        </button>
      </div>

      {formData.attendance === 'confirm' && (
        <div className="space-y-8 animate-fade-up">
          <div className="w-full h-px bg-wedding-neutral opacity-50"></div>
          <div>
            <label className="block text-xs font-bold text-wedding-secondary uppercase tracking-[0.3em] mb-3">Preferencias Alimenticias</label>
            <select
              disabled={isLoading}
              className="w-full px-6 py-4 bg-wedding-bg border border-wedding-neutral rounded-2xl focus:outline-none focus:ring-2 focus:ring-wedding-accent/20 focus:border-wedding-accent transition text-wedding-text appearance-none cursor-pointer disabled:opacity-50"
              value={formData.diet}
              onChange={(e) => setFormData({...formData, diet: e.target.value})}
            >
              <option value="standard">Menú Tradicional</option>
              <option value="vegetarian">Vegetariano</option>
              <option value="vegan">Vegano</option>
              <option value="celiac">Celíaco / Sin TACC</option>
              <option value="allergy">Otras Alergias</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-wedding-secondary uppercase tracking-[0.3em] mb-3">Un mensaje para nosotros</label>
            <textarea
              disabled={isLoading}
              className="w-full px-6 py-4 bg-wedding-bg border border-wedding-neutral rounded-2xl focus:outline-none focus:ring-2 focus:ring-wedding-accent/20 focus:border-wedding-accent transition h-32 text-wedding-text resize-none disabled:opacity-50"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="¿Querés decirnos algo especial?"
            ></textarea>
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-5 bg-wedding-secondary text-wedding-white rounded-2xl font-bold tracking-[0.4em] uppercase text-[11px] hover:bg-wedding-primary transition-all shadow-xl active:scale-95 mt-4 disabled:opacity-50"
      >
        {isLoading ? 'Procesando...' : 'Confirmar Asistencia'}
      </button>
    </form>
  );
};
