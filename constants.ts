
import { WeddingConfig } from './types';

export const WEDDING_DATA: WeddingConfig = {
  names: {
    groom: "Lucho",
    bride: "Rocio"
  },
  date: "2026-04-11T11:30:00",
  displayDate: "Sábado 11 de Abril de 2026",
  venue: {
    name: "Tiempos de Fe",
    address: "J.I Rucci 1845, Valentín Alsina",
    googleMapsUrl: "https://maps.app.goo.gl/fWwRnXRNifo35hzm6"
  },
  party: {
    name: "Tiempos de Fe",
    address: "J.I Rucci 1845, Valentín Alsina",
    googleMapsUrl: "https://maps.app.goo.gl/YourLinkHere",
    time: "13:00 hs"
  },
  giftInfo: {
    cbu: "0140119203505051320376",
    alias: "RO.LUCHO.BODA",
    titular: "Rocio Fernandez",
    bank: "Cuenta DNI"
  },
  colors: {
    primary: "#6B1F2B",
    secondary: "#8C2F3C",
    accent: "#C9A24D",
    background: "#F6F3EE"
  },
  schedule: [
    {
      time: "11:30",
      title: "Llegada de invitados",
      description: "Recepción con música suave y barra abierta de bebidas sin alcohol.",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
      time: "12:00",
      title: "Ceremonia",
      description: "Celebramos nuestra unión en una ceremonia especial, llena de significado y fe.",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    },
    {
      time: "12:40",
      title: "Salida y Felicitaciones",
      description: "Momento de fotos, abrazos y encuentros espontáneos mientras continúa la barra.",
      icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z"
    },
    {
      time: "13:00",
      title: "Apertura de islas saladas",
      description: "Picadas, fiambres, sandwiches y opciones frías para disfrutar sin apuro.",
      icon: "M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21v-4a3 3 0 016 0v4"
    },
    {
      time: "14:00",
      title: "Momento social",
      description: "Tiempo para compartir, conversar y disfrutar de la reposición constante de islas.",
      icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 7a4 4 0 110-8 4 4 0 010 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75"
    },
    {
      time: "15:30",
      title: "Juegos y sorpresas",
      description: "Momentos especiales y el tradicional lanzamiento del ramo.",
      icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    },
    {
      time: "16:00",
      title: "Mesa dulce y café",
      description: "Algo dulce para acompañar la tarde, con selección de cafés y tés.",
      icon: "M12 21a9 9 0 100-18 9 9 0 000 18z M8 11h8 M8 15h8"
    },
    {
      time: "17:00",
      title: "Cierre progresivo",
      description: "Últimos brindis, charlas y despedidas pausadas.",
      icon: "M4.828 17.586L6.242 19M19.172 17.586L17.758 19M12 3v2M12 19v2M5 12H3m18 0h-2m-1.243-6.757l-1.414 1.414M6.657 6.657l1.414 1.414"
    }
  ],
  instagramHashtag: "#RoYLucho2026",
  googleSheetsScriptUrl: "https://script.google.com/macros/s/AKfycbyRZJ8nxRbf6YYPa4GvnPjw1ow1aZhRLsx1cffhi7dSw1ZnoQIdFGdfpG1VoEoq4b7EZA/exec",
  // CAMBIA ESTE LINK POR TU MP3
  // Tip Google Drive: https://docs.google.com/uc?export=download&id=TU_ID_AQUI
  // Tip Dropbox: cambia el final del link de 'dl=0' a 'raw=1'
  musicUrl: "https://www.dropbox.com/scl/fi/5953qhvnmore1slvg2fp8/Edd_Sheeran_-_Perfect_-mp3.pm.mp3?rlkey=aixwf3zobzqj06eqqdo9hj0o8&st=v8cn64xq&raw=1",
  musicStartTime: 2 // Segundos iniciales
};
