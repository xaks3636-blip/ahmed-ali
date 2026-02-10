
export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';
export type AppView = 'generator' | 'editor' | 'gallery' | 'privacy';

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: string;
  timestamp: number;
}

export interface FilterOption {
  id: string;
  labelEn: string;
  labelAr: string;
  promptSuffix: string;
  icon: string;
}

export interface StyleOption {
  id: string;
  labelEn: string;
  labelAr: string;
  promptSuffix: string;
  image: string;
}
