
export interface TimelineItem {
  time: string;
  title: string;
  description: string;
  icon: string; // Path de SVG o identificador
}

export interface WeddingConfig {
  names: {
    groom: string;
    bride: string;
  };
  date: string; 
  displayDate: string;
  venue: {
    name: string;
    address: string;
    googleMapsUrl: string;
  };
  party: {
    name: string;
    address: string;
    googleMapsUrl: string;
    time: string;
  };
  giftInfo: {
    cbu: string;
    alias: string;
    titular: string;
    bank: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  schedule: TimelineItem[];
  instagramHashtag?: string;
}

export interface RSVPData {
  name: string;
  attendance: 'confirm' | 'reject';
  diet: string;
  message: string;
}
