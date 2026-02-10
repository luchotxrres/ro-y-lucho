import React, { useState } from 'react';

export const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'confirm',
    diet: 'standard',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("RSVP Submitted:", formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-16 animate-fade-in bg-wedding-white rounded-[3rem] shadow-sm border border-wedding-neutral">
        <h3 className="text-4xl font-serif mb-6 text-wedding-primary italic">¡Muchas gracias!</h3>
        <p className="text-wedding-text text-lg">Tu confirmación ha sido recibida con éxito.</p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="mt-10 text-xs font-bold uppercase tracking-[0.3em] text-wedding-accent hover:text-wedding-primary transition-colors underline"
        >
          Enviar otra respuesta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-wedding-white p-10 md:p-14 rounded-[3rem] shadow-sm border border-wedding-neutral space-y-8">
      <div>
        <label className="block text-xs font-bold text-wedding-secondary uppercase tracking-[0.3em] mb-3">Nombre Completo</label>
        <input
          required
          type="text"
          className="w-full px-6 py-4 bg-wedding-bg border border-wedding-neutral rounded-2xl focus:outline-none focus:ring-2 focus:ring-wedding-accent/20 focus:border-wedding-accent transition text-wedding-text"
          placeholder="Tu nombre y apellido"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <button
          type="button"
          onClick={() => setFormData({...formData, attendance: 'confirm'})}
          className={`py-5 rounded-2xl border-2 transition-all font-bold text-[11px] uppercase tracking-[0.2em] shadow-sm ${
            formData.attendance === 'confirm' 
            ? 'bg-wedding-primary text-wedding-white border-wedding-primary scale-[1.02]' 
            : 'bg-wedding-white text-wedding-secondary border-wedding-neutral hover:border-wedding-accent'
          }`}
        >
          Asistiré
        </button>
        <button
          type="button"
          onClick={() => setFormData({...formData, attendance: 'reject'})}
          className={`py-5 rounded-2xl border-2 transition-all font-bold text-[11px] uppercase tracking-[0.2em] shadow-sm ${
            formData.attendance === 'reject' 
            ? 'bg-wedding-primary text-wedding-white border-wedding-primary scale-[1.02]' 
            : 'bg-wedding-white text-wedding-secondary border-wedding-neutral hover:border-wedding-accent'
          }`}
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
              className="w-full px-6 py-4 bg-wedding-bg border border-wedding-neutral rounded-2xl focus:outline-none focus:ring-2 focus:ring-wedding-accent/20 focus:border-wedding-accent transition text-wedding-text appearance-none cursor-pointer"
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
              className="w-full px-6 py-4 bg-wedding-bg border border-wedding-neutral rounded-2xl focus:outline-none focus:ring-2 focus:ring-wedding-accent/20 focus:border-wedding-accent transition h-32 text-wedding-text resize-none"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="¿Querés decirnos algo especial?"
            ></textarea>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full py-5 bg-wedding-secondary text-wedding-white rounded-2xl font-bold tracking-[0.4em] uppercase text-[11px] hover:bg-wedding-primary transition-all shadow-xl active:scale-95 mt-4"
      >
        Confirmar Asistencia
      </button>
    </form>
  );
};