
import React, { useState, useEffect, useRef } from 'react';
import { Section } from './components/Section';
import { Countdown } from './components/Countdown';
import { RSVPForm } from './components/RSVPForm';
import { GiftModal } from './components/GiftModal';
import { Timeline } from './components/Timeline';
import { WEDDING_DATA } from './constants';
import { GoogleGenAI } from '@google/genai';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [aiGreeting, setAiGreeting] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) return;
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Escribe una frase corta (máximo 12 palabras) muy elegante para la boda de ${WEDDING_DATA.names.groom} y ${WEDDING_DATA.names.bride}.`,
        });
        setAiGreeting(response.text?.trim() || "Unidos por el amor, hoy y siempre.");
      } catch (err) {
        setAiGreeting("Nuestro amor es la mayor aventura. ¡Acompáñanos!");
      }
    };
    if (hasEntered) fetchGreeting();
  }, [hasEntered]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenEnvelope = () => {
    setIsOpening(true);
    
    if (audioRef.current) {
      // Inicia en la estrofa "I found a love..."
      audioRef.current.currentTime = 13.5; 
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
    
    setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setHasEntered(true);
        window.scrollTo(0, 0);
      }, 800);
    }, 1400); 
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !audioRef.current.muted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const SectionIcon = ({ children }: { children: React.ReactNode }) => (
    <div className="w-20 h-20 md:w-24 md:h-24 bg-wedding-white rounded-full flex items-center justify-center mb-10 mx-auto text-wedding-accent border border-wedding-neutral shadow-sm transition-transform hover:scale-110 duration-500">
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-wedding-bg text-wedding-text selection:bg-wedding-primary/20 selection:text-wedding-white">
      {/* AUDIO PERSISTENTE */}
      <audio ref={audioRef} loop preload="auto">
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
        {/* Reemplazar por link directo de Perfect - Ed Sheeran */}
      </audio>

      {!hasEntered ? (
        <div className={`fixed inset-0 z-[100] bg-wedding-bg paper-texture flex flex-col items-center justify-center p-6 transition-all duration-1000 ${isFading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
          <div className="text-center animate-fade-up">
            <p className="text-wedding-primary tracking-[0.5em] uppercase text-[10px] mb-12 font-sans font-bold">Nuestra Invitación</p>
            <div className={`envelope-wrapper ${isOpening ? 'is-open' : ''}`}>
              <div onClick={handleOpenEnvelope} className="wax-seal flex items-center justify-center group">
                <span className="text-wedding-white text-3xl md:text-4xl font-serif select-none drop-shadow-md transition-transform group-hover:scale-110">
                  {WEDDING_DATA.names.bride[0]}<span className="text-xs italic opacity-40">&</span>{WEDDING_DATA.names.groom[0]}
                </span>
                <div className="absolute inset-2 border border-wedding-white/10 rounded-full scale-90"></div>
              </div>
              <div className="envelope">
                <div className="envelope-flap"></div>
                <div className="envelope-pocket"></div>
                <div className="letter">
                  <div className="absolute inset-1 border border-wedding-accent/20 pointer-events-none"></div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-wedding-accent mb-4 font-bold">Save the Date</p>
                  <div className="text-3xl md:text-5xl font-serif text-wedding-primary leading-tight">
                    {WEDDING_DATA.names.bride} <br/> 
                    <span className="text-xl italic text-wedding-accent opacity-60">&</span> <br/> 
                    {WEDDING_DATA.names.groom}
                  </div>
                  <div className="w-12 h-0.5 bg-wedding-accent/30 mt-6"></div>
                  <p className="mt-6 text-[11px] text-wedding-secondary/60 tracking-[0.2em] font-sans italic">11.04.2026</p>
                </div>
              </div>
            </div>
            <div className={`mt-20 space-y-3 transition-opacity duration-500 ${isOpening ? 'opacity-0' : 'opacity-100'}`}>
              <p className="text-wedding-secondary font-serif italic text-xl">Tocá el sello para abrir</p>
              <div className="w-12 h-0.5 bg-wedding-accent mx-auto"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* BOTÓN MUTE */}
          <button 
            onClick={toggleMute}
            className="fixed top-6 right-6 z-[60] w-12 h-12 bg-wedding-white/90 backdrop-blur-xl rounded-full flex items-center justify-center text-wedding-primary shadow-lg border border-wedding-neutral hover:scale-110 transition-all active:scale-95 group"
          >
            {isMuted ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>
            )}
            {!isMuted && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wedding-accent opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-wedding-accent"></span></span>}
          </button>

          {/* BOTÓN VOLVER ARRIBA */}
          <button 
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-[60] w-12 h-12 bg-wedding-accent text-wedding-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform hover:-translate-y-2 active:scale-90 ${showScrollTop ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50 pointer-events-none'}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
          </button>

          {/* HERO */}
          <section className="h-screen relative flex items-center justify-center overflow-hidden bg-wedding-neutral">
            <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2340&auto=format&fit=crop')` }}>
              <div className="absolute inset-0 bg-wedding-primary/40 backdrop-blur-[1px]"></div>
            </div>
            <div className="relative z-10 text-center text-wedding-white p-6 animate-fade-up">
              <p className="text-xs tracking-[0.6em] uppercase mb-8 opacity-90 font-sans font-bold">¡Nos Casamos!</p>
              <h1 className="text-6xl md:text-[8rem] font-serif mb-8 leading-tight drop-shadow-2xl">
                {WEDDING_DATA.names.bride} <span className="font-light italic opacity-60 text-4xl md:text-7xl">&</span> {WEDDING_DATA.names.groom}
              </h1>
              <div className="w-16 h-0.5 bg-wedding-accent mx-auto mb-8 shadow-sm"></div>
              <p className="text-lg md:text-2xl font-light tracking-[0.4em] italic opacity-100 drop-shadow-lg">{WEDDING_DATA.displayDate}</p>
            </div>
          </section>

          {/* GREETING */}
          <Section className="text-center max-w-4xl mx-auto pt-40 pb-20 px-6">
            <SectionIcon>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
              </svg>
            </SectionIcon>
            <div className="text-3xl md:text-6xl font-serif italic text-wedding-primary mb-12 leading-tight">
              "{aiGreeting || "Nos une el amor y el deseo de compartirlo."}"
            </div>
            <div className="w-20 h-0.5 bg-wedding-accent mx-auto mb-12"></div>
            <p className="text-wedding-text text-xl leading-relaxed font-light max-w-2xl mx-auto">
              Nada tendría sentido sin ustedes. Por eso queremos que nos acompañen en este día tan especial.
            </p>
          </Section>

          {/* COUNTDOWN */}
          <Section className="bg-wedding-white/50 my-16 py-24 border-y border-wedding-neutral text-center">
            <SectionIcon>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </SectionIcon>
            <h4 className="text-wedding-secondary tracking-[0.5em] uppercase text-[11px] mb-12 font-sans font-bold">Solo Faltan</h4>
            <Countdown targetDate={WEDDING_DATA.date} />
          </Section>

          {/* LOCATION */}
          <Section id="location" className="max-w-4xl mx-auto py-32 px-6 text-center">
            <SectionIcon>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </SectionIcon>
            <h2 className="text-5xl md:text-7xl font-serif mb-8 text-wedding-primary italic">Dónde & Cuándo</h2>
            <div className="space-y-4 mb-12">
              <p className="text-2xl font-medium text-wedding-text">{WEDDING_DATA.venue.name}</p>
              <p className="text-[11px] text-wedding-secondary uppercase tracking-[0.4em] opacity-70 font-bold">{WEDDING_DATA.venue.address}</p>
            </div>
            <a href={WEDDING_DATA.venue.googleMapsUrl} target="_blank" rel="noopener noreferrer" 
               className="inline-block px-16 py-6 bg-wedding-primary text-wedding-white rounded-full text-[11px] uppercase tracking-[0.5em] hover:bg-wedding-secondary transition-all shadow-xl active:scale-95 font-black">
              Cómo llegar
            </a>
          </Section>

          {/* SCHEDULE */}
          <Section id="schedule" className="py-32 px-6 bg-wedding-white/30 text-center">
            <SectionIcon>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </SectionIcon>
            <h2 className="text-5xl md:text-7xl font-serif mb-6 text-wedding-primary italic">Cronograma</h2>
            <Timeline items={WEDDING_DATA.schedule} />
          </Section>

          {/* DRESS CODE */}
          <Section className="text-center bg-wedding-primary text-wedding-white py-40 px-6">
            <SectionIcon>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zM12 22V12m0 0l-8-5m8 5l8-5" />
              </svg>
            </SectionIcon>
            <p className="text-wedding-accent tracking-[0.6em] uppercase text-[11px] mb-8 font-sans font-bold">Dress Code</p>
            <h3 className="text-5xl md:text-7xl font-serif mb-10 italic">Elegante Sport</h3>
            
            <div className="max-w-2xl mx-auto space-y-12">
              <div className="py-10 px-8 bg-wedding-secondary/30 rounded-[2.5rem] border border-wedding-accent/30 relative overflow-hidden">
                <p className="text-wedding-accent text-xs uppercase tracking-[0.4em] font-black mb-4">Aviso Importante</p>
                <p className="text-lg md:text-xl text-wedding-bg/95 italic font-serif leading-relaxed">
                  "Agradecemos que eviten los colores blancos, marfil, crema y tonos claros, para que la novia sea la única protagonista."
                </p>
              </div>

              <div className="pt-4">
                <a 
                  href="https://pinterest.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 px-12 py-6 bg-wedding-white text-wedding-primary rounded-full text-[11px] uppercase tracking-[0.4em] hover:bg-wedding-accent hover:text-wedding-white transition-all shadow-2xl font-black group active:scale-95"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.41 7.63 11.17-.1-.95-.19-2.41.04-3.45.21-.94 1.35-5.71 1.35-5.71s-.34-.68-.34-1.69c0-1.58.92-2.76 2.06-2.76 0.97 0 1.44.73 1.44 1.61 0 0.98-.62 2.44-.94 3.79-.27 1.13.57 2.05 1.68 2.05 2.02 0 3.57-2.13 3.57-5.21 0-2.72-1.96-4.63-4.75-4.63-3.24 0-5.14 2.43-5.14 4.94 0 .98.38 2.03.85 2.6.09.11.1.21.07.33-.08.33-.26 1.05-.3 1.19-.05.21-.16.26-.37.16-1.38-.64-2.24-2.65-2.24-4.26 0-3.47 2.52-6.66 7.27-6.66 3.81 0 6.78 2.72 6.78 6.35 0 3.79-2.39 6.84-5.7 6.84-1.11 0-2.16-.58-2.52-1.26 0 0-.55 2.1-.68 2.62-.25.95-.91 2.14-1.36 2.87 1.12.35 2.3.54 3.53.54 6.63 0 12-5.37 12-12S18.63 0 12 0z"/></svg>
                  Inspiración en Pinterest
                </a>
              </div>
            </div>
          </Section>

          {/* GIFTS */}
          <Section className="text-center py-40 bg-wedding-white px-6">
            <SectionIcon>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 12V8a2 2 0 00-2-2H6a2 2 0 00-2 2v4m16 0v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8m16 0H4m8-6v16" />
                <path d="M12 6a2 2 0 002-2 2 2 0 00-2-2 2 2 0 00-2 2 2 2 0 002 2z" />
              </svg>
            </SectionIcon>
            <h3 className="text-5xl font-serif mb-10 text-wedding-primary italic">Mesa de Regalos</h3>
            <p className="text-wedding-text mb-16 max-w-xl mx-auto font-light text-xl">Tu presencia es nuestro mejor regalo, pero si deseás hacernos uno, aquí están nuestros datos.</p>
            <button onClick={() => setIsModalOpen(true)} className="px-14 py-6 border-2 border-wedding-primary text-wedding-primary rounded-full text-[11px] uppercase tracking-[0.5em] hover:bg-wedding-primary hover:text-wedding-white transition-all duration-500 font-black active:scale-95 shadow-lg">
              Ver CBU / Alias
            </button>
          </Section>

          {/* RSVP */}
          <Section id="rsvp" className="bg-wedding-bg/50 py-40 px-6 text-center">
            <SectionIcon>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </SectionIcon>
            <h3 className="text-6xl md:text-8xl font-serif mb-6 text-wedding-primary italic">R.S.V.P</h3>
            <div className="max-w-xl mx-auto">
              <RSVPForm />
            </div>
          </Section>

          {/* FOOTER */}
          <footer className="py-60 text-center bg-wedding-white border-t border-wedding-neutral">
            <h2 className="text-9xl md:text-[12rem] font-script text-wedding-bg mb-12 select-none leading-none">R & L</h2>
            <p className="text-[12px] tracking-[0.6em] text-wedding-neutral uppercase font-bold">
              Hecho con amor • {WEDDING_DATA.instagramHashtag}
            </p>
          </footer>

          <GiftModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
      )}
    </div>
  );
};

export default App;
