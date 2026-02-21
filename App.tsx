
import React, { useState, useEffect, useRef } from 'react';
import { Section } from './components/Section';
import { Countdown } from './components/Countdown';
import { RSVPForm } from './components/RSVPForm';
import { GiftModal } from './components/GiftModal';
import { Timeline } from './components/Timeline';
import { WEDDING_DATA } from './constants';
import { GoogleGenAI } from '@google/genai';

// Usando la imagen local de la carpeta ./img
const HERO_IMAGE_URL = './img/img-background.jpeg';

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
    if (isOpening) return;
    setIsOpening(true);
    
    if (audioRef.current) {
      audioRef.current.currentTime = WEDDING_DATA.musicStartTime; 
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
    
    // Secuencia de animación optimizada:
    // 0s: Abre solapa
    // 0.5s: Sube tarjeta (tarda 2.4s) -> llega a destino en 2.9s
    // 4.5s: Inicia fundido (da ~1.6s de lectura estática total)
    // 5.5s: Entra a la web
    setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setHasEntered(true);
        window.scrollTo(0, 0);
      }, 1000);
    }, 4500); 
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

  const SectionIcon = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`w-16 h-16 md:w-24 md:h-24 bg-wedding-white rounded-full flex items-center justify-center mb-8 md:mb-10 mx-auto text-wedding-accent border border-wedding-neutral shadow-sm transition-transform hover:scale-110 duration-500 ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-wedding-bg text-wedding-text selection:bg-wedding-primary/20 selection:text-wedding-white">
      <audio ref={audioRef} loop preload="auto">
        <source src={WEDDING_DATA.musicUrl} type="audio/mpeg" />
      </audio>

      {!hasEntered ? (
        <div
          className={`fixed inset-0 z-[500] flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ${isFading ? "bg-white" : "bg-wedding-bg"}`}
        >
          {/* Capa de fundido blanco */}
          <div
            className={`absolute inset-0 z-[100] bg-white transition-opacity duration-1000 pointer-events-none ${isFading ? "opacity-100" : "opacity-0"}`}
          ></div>

          <div
            className={`absolute top-[8vh] text-center w-full px-6 transition-all duration-1000 ${isOpening ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0"}`}
          >
            <p className="text-wedding-primary/30 font-serif italic text-xl md:text-3xl tracking-[0.4em] uppercase">
              Rocio 
              <span style={{ fontFamily: "Courier, cursive" }}>&</span>
              Lucho
            </p>
          </div>

          <div
            className={`relative w-full h-[50vh] md:h-[40vh] flex items-center justify-center perspective-2000 transition-all duration-1000 ${isOpening && isFading ? "scale-110 blur-sm" : "scale-100"}`}
          >
            <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
              {/* Parte Trasera */}
              <div className="absolute inset-0 bg-wedding-primary shadow-2xl z-0 rounded-sm overflow-hidden">
                <div className="absolute inset-0 paper-texture opacity-30 mix-blend-overlay"></div>
              </div>

              {/* Tarjeta de Invitación */}
              <div
                className={`absolute w-[88%] md:w-[85%] h-[85%] bg-wedding-white shadow-lg z-10 flex flex-col items-center justify-center p-4 md:p-12 border border-wedding-neutral/10 transition-all duration-[2.4s] ease-out ${isOpening ? "card-slide-out" : "translate-y-4 opacity-0"}`}
              >
                <div className="border border-wedding-accent/20 w-full h-full p-4 md:p-8 flex flex-col items-center justify-center relative bg-wedding-white">
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 w-4 h-4 md:w-8 md:h-8 border-t border-l border-wedding-accent/30"></div>
                  <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-4 h-4 md:w-8 md:h-8 border-b border-r border-wedding-accent/30"></div>

                  <p className="text-wedding-accent text-[8px] md:text-[10px] uppercase tracking-[0.6em] mb-4 font-bold">
                    ¡NOS CASAMOS!
                  </p>
                  <h2 className="text-wedding-primary font-serif text-2xl md:text-5xl tracking-tighter mb-4 text-center leading-none">
                    {WEDDING_DATA.names.bride} <br />{" "}
                    <span className="italic opacity-30 text-xl md:text-4xl">
                      &
                    </span>
                    <br /> {WEDDING_DATA.names.groom}
                  </h2>
                  <div className="w-10 h-px bg-wedding-accent/40 my-3"></div>
                  <p className="text-wedding-primary/60 font-serif italic text-xs md:text-lg">
                    {WEDDING_DATA.displayDate}
                  </p>
                </div>
              </div>

              {/* Bolsillo Frontal */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-wedding-primary z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.15)] rounded-b-sm overflow-hidden">
                <div className="absolute inset-0 paper-texture opacity-30 mix-blend-overlay"></div>
                <div
                  className="absolute top-0 left-0 w-full h-full bg-wedding-primary"
                  style={{
                    clipPath:
                      "polygon(0 0, 50% 20%, 100% 0, 100% 100%, 0 100%)",
                  }}
                ></div>
              </div>

              {/* Solapa Superior */}
              <div
                className={`absolute top-0 left-0 w-full h-1/2 bg-wedding-primary z-30 transition-all duration-[1.2s] ease-in-out origin-top shadow-md ${isOpening ? "envelope-flap-single-open" : ""}`}
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
              >
                <div className="absolute inset-0 paper-texture opacity-30 mix-blend-overlay"></div>
              </div>

              {/* Sello */}
              <div
                onClick={handleOpenEnvelope}
                className={`wax-seal-container z-40 transition-all duration-[1.2s] ${isOpening ? "wax-seal-open" : ""}`}
                style={{ top: "50%" }}
              >
                <div className="wax-seal-body shadow-gold">
                  <span className="wax-seal-text">
                    {WEDDING_DATA.names.bride[0]}
                    <span className="text-sm md:text-xl italic opacity-50 mx-1">
                      &
                    </span>
                    {WEDDING_DATA.names.groom[0]}
                  </span>
                  <div className="wax-seal-border-gold"></div>
                </div>
                <div
                  className={`absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap transition-opacity duration-500 ${isOpening ? "opacity-0" : "opacity-100"}`}
                >
                  <p className="text-wedding-accent font-sans font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs animate-pulse">
                    Tocar para abrir
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`absolute bottom-[8vh] text-center w-full transition-all duration-1000 ${isOpening ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}
          >
            <p className="text-wedding-primary/50 font-serif italic text-lg md:text-2xl tracking-[0.1em]">
              Ésta invitación es especial y sólo para ti
            </p>
          </div>
        </div>
      ) : (
        <>
          <button
            onClick={toggleMute}
            className="fixed top-4 right-4 md:top-6 md:right-6 z-[60] w-10 h-10 md:w-12 md:h-12 bg-wedding-white/90 backdrop-blur-xl rounded-full flex items-center justify-center text-wedding-primary shadow-lg border border-wedding-neutral hover:scale-110 transition-all active:scale-95 group"
          >
            {isMuted ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
              </svg>
            )}
          </button>

          <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-[60] w-10 h-10 md:w-12 md:h-12 bg-wedding-accent text-wedding-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform hover:-translate-y-2 active:scale-90 ${showScrollTop ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-50 pointer-events-none"}`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>

          <div className="animate-reveal-app">
            {/* Hero Section */}
            <section className="h-screen relative flex items-center justify-center overflow-hidden bg-wedding-black">
              {/* backgroundPosition: '70% center' desplaza el enfoque de la imagen a la derecha */}
              <div
                className="absolute inset-0 z-0 bg-cover"
                style={{
                  backgroundImage: `url('${HERO_IMAGE_URL}')`,
                  backgroundPosition: "60% center",
                }}
              >
                <div className="absolute inset-0 bg-wedding-primary/40 backdrop-blur-[1px]"></div>
              </div>
              <div className="relative z-10 text-center text-wedding-white p-4 animate-fade-up w-full">
                <p className="text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] uppercase mb-6 md:mb-8 opacity-90 font-sans font-bold">
                  ¡Nos Casamos!
                </p>
                <h1 className="text-[28px] xs:text-3xl sm:text-5xl md:text-[8rem] font-serif mb-6 md:mb-8 leading-tight drop-shadow-2xl px-2 whitespace-nowrap overflow-visible">
                  {WEDDING_DATA.names.bride}{" "}
                  <span className="font-light italic opacity-60 text-xl md:text-7xl">
                    &
                  </span>{" "}
                  {WEDDING_DATA.names.groom}
                </h1>
                <div className="w-12 md:w-16 h-0.5 bg-wedding-accent mx-auto md:mb-8 shadow-sm mb-20"></div>
                <p className="text-[14px] sm:text-lg md:text-2xl font-light tracking-[0.2em] md:tracking-[0.4em] italic opacity-100 drop-shadow-lg whitespace-nowrap pt-40">
                  {WEDDING_DATA.displayDate}
                </p>
              </div>
            </section>

            {/* Bienvenida AI */}
            <Section className="text-center max-w-4xl mx-auto pt-24 md:pt-40 pb-20 px-6">
              <SectionIcon className="heart-pulse overflow-hidden p-2">
                <svg
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    className="heart-drawing-path"
                    strokeWidth="20"
                    fill="none"
                    d="M287.984 114.16c31.376 0 88.094 15.008 180.094 105.616l45.616 44.912 44.928-45.632c63.872-64.896 131.84-105.2 177.376-105.2 61.408 0 109.809 21.008 157.009 68.096 44.464 44.368 68.992 103.36 68.992 166.112.032 62.784-24.448 121.824-69.408 166.672-3.664 3.712-196.992 212.304-358.96 387.104-7.632 7.248-16.352 8.32-20.991 8.32-4.576 0-13.2-1.024-20.8-8.096-39.472-43.905-325.552-362-358.815-395.232C88.497 462.416 64 403.376 64 340.608c.015-62.752 24.511-121.728 69.04-166.144 43.295-43.264 93.984-60.304 154.944-60.304zm-.002-64c-76.528 0-144 22.895-200.176 79.008-117.072 116.768-117.072 306.128 0 422.96 33.424 33.44 357.855 394.337 357.855 394.337 18.48 18.496 42.753 27.68 66.96 27.68 24.225 0 48.4-9.184 66.912-27.68 0 0 354.88-383.024 358.656-386.85 117.04-116.88 117.04-306.24 0-423.007-58.112-58-123.024-86.784-202.208-86.784-75.648 0-160 60.32-223.008 124.32C447.981 110.159 366.237 50.16 287.981 50.16z"
                  />
                </svg>
              </SectionIcon>
              <div className="text-xl md:text-6xl font-serif italic text-wedding-primary mb-8 md:mb-12 leading-tight">
                "{aiGreeting || "Nos une el amor y el deseo de compartirlo."}"
              </div>
              <div className="w-16 md:w-20 h-0.5 bg-wedding-accent mx-auto mb-8 md:mb-12"></div>
              <p className="text-wedding-text text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto px-4">
                Nada tendría sentido sin ustedes. <br></br> Por eso queremos que nos
                acompañen en este día tan especial.
              </p>
            </Section>

            {/* Countdown */}
            <Section className="bg-wedding-white/50 my-16 py-24 border-y border-wedding-neutral text-center overflow-hidden">
              <SectionIcon>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </SectionIcon>
              <h4 className="text-wedding-secondary tracking-[0.5em] uppercase text-[11px] mb-12 font-sans font-bold">
                Solo Faltan
              </h4>
              <Countdown targetDate={WEDDING_DATA.date} />
            </Section>

            {/* Ubicación */}
            <Section
              id="location"
              className="max-w-4xl mx-auto py-15 px-6 text-center"
            >
              <SectionIcon>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </SectionIcon>
              <h2 className="text-[26px] xs:text-3xl sm:text-5xl md:text-7xl font-serif mb-8 text-wedding-primary italic whitespace-nowrap overflow-visible px-2">
                Dónde
              </h2>
              <div className="space-y-4 mb-12">
                <p className="text-2xl font-medium text-wedding-text">
                  {WEDDING_DATA.venue.name}
                </p>
                <p className="text-[11px] text-wedding-secondary uppercase tracking-[0.4em] opacity-70 font-bold">
                  {WEDDING_DATA.venue.address}
                </p>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.961594261629!2d-58.42018272356997!3d-34.680918761580536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccc62742a28e7%3A0xa96d666c074a0763!2sCentro%20Cristiano%20Tiempos%20de%20Fe!5e0!3m2!1ses-419!2sar!4v1771696218115!5m2!1ses-419!2sar"
                className='map-frame'
                style={{ border: "0" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <a
                href={WEDDING_DATA.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-12 py-5 mt-2 md:px-16 md:py-6 bg-wedding-primary text-wedding-white rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] hover:bg-wedding-secondary transition-all shadow-xl active:scale-95 font-black"
              >
                Cómo llegar
              </a>
            </Section>

            {/* Cronograma */}
            <Section
              id="schedule"
              className="py-32 px-6 bg-wedding-white/30 text-center"
            >
              <Timeline items={WEDDING_DATA.schedule} />
            </Section>

            {/* Dress Code */}
            <Section className="text-center bg-wedding-primary text-wedding-white py-40 px-6">
              <SectionIcon>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                </svg>
              </SectionIcon>
              <p className="text-wedding-accent tracking-[0.6em] uppercase text-[11px] mb-8 font-sans font-bold">
                Dress Code
              </p>
              <h3 className="text-[26px] xs:text-3xl sm:text-5xl md:text-7xl font-serif mb-10 italic whitespace-nowrap overflow-visible px-2">
                Elegante Sport
              </h3>

              <div className="max-w-2xl mx-auto space-y-12">
                <div className="py-10 px-8 bg-wedding-secondary/30 rounded-[2.5rem] border border-wedding-accent/30 relative overflow-hidden">
                  <p className="text-wedding-accent text-xs uppercase tracking-[0.4em] font-black mb-4">
                    Aviso Importante
                  </p>
                  <p className="text-lg md:text-xl text-wedding-bg/95 italic font-serif leading-relaxed">
                    "Agradecemos que eviten los colores blancos, marfil, crema y
                    tonos claros, para que la novia sea la única protagonista."
                  </p>
                </div>
                <div className="pt-4">
                  <a
                    href="https://pin.it/5WgBnBbNv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 px-12 py-6 bg-wedding-white text-wedding-primary rounded-full text-[11px] uppercase tracking-[0.4em] hover:bg-wedding-accent hover:text-wedding-white transition-all shadow-2xl font-black group active:scale-95"
                  >
                    Inspiración en Pinterest
                  </a>
                </div>
              </div>
            </Section>

            {/* Regalos */}
            <Section className="text-center py-40 bg-wedding-white px-6">
              <h3 className="text-[26px] xs:text-3xl sm:text-5xl md:text-7xl font-serif text-wedding-primary italic mb-10 whitespace-nowrap overflow-visible px-2">
                Regalos
              </h3>
              <p className="text-wedding-text mb-16 max-w-xl mx-auto font-light text-xl">
                Tu presencia es nuestro mejor regalo, pero si deseás hacernos uno,
                aquí están nuestros datos.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-14 py-6 border-2 border-wedding-primary text-wedding-primary rounded-full text-[11px] uppercase tracking-[0.5em] hover:bg-wedding-primary hover:text-wedding-white transition-all duration-500 font-black active:scale-95 shadow-lg"
              >
                Ver CBU / Alias
              </button>
            </Section>

            {/* RSVP */}
            <Section
              id="rsvp"
              className="bg-wedding-bg/50 py-40 px-6 text-center"
            >
              <h3 className="text-3xl sm:text-5xl md:text-7xl font-serif mb-6 text-wedding-primary italic whitespace-nowrap overflow-visible px-2">
                Confirmar Asistencia
              </h3>
              <div className="max-w-xl mx-auto">
                <RSVPForm />
              </div>
            </Section>

            {/* Footer */}
            <footer className="py-40 md:py-60 text-center bg-wedding-white border-t border-wedding-neutral">
              <h2 className="text-7xl md:text-[12rem] font-script text-wedding-bg mb-12 select-none leading-none">
                R & L
              </h2>
              <p className="text-[10px] md:text-[12px] tracking-[0.4em] md:tracking-[0.6em] text-wedding-neutral uppercase font-bold">
                Hecho con amor • {WEDDING_DATA.instagramHashtag}
              </p>
            </footer>
          </div>

          <GiftModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default App;
