import React, { useState, useEffect, useMemo } from 'react';
import { Language, Theme, AppView, GeneratedImage } from './types';
import { translations } from './translations';
import Navbar from './components/Navbar';
import ImageGenerator from './components/ImageGenerator';
import ImageEditor from './components/ImageEditor';
import Gallery from './components/Gallery';
import PrivacyPolicy from './components/PrivacyPolicy';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  // Theme is locked to dark/black as per instructions
  const [theme] = useState<Theme>('dark');
  const [view, setView] = useState<AppView>('generator');
  const [gallery, setGallery] = useState<GeneratedImage[]>([]);

  const t = useMemo(() => translations[lang], [lang]);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.body.className = `bg-brandBlack text-white ${lang === 'ar' ? 'font-ar' : 'font-en'}`;
    document.documentElement.classList.add('dark');
  }, [lang]);

  const toggleLang = () => setLang(prev => (prev === 'en' ? 'ar' : 'en'));

  const addToGallery = (img: GeneratedImage) => {
    setGallery(prev => [img, ...prev]);
  };

  const removeFromGallery = (id: string) => {
    setGallery(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-brandBlack text-white pb-32">
      <Navbar 
        lang={lang} 
        theme={theme} 
        view={view} 
        setView={setView} 
        toggleLang={toggleLang} 
        toggleTheme={() => {}} // Disabled as theme is locked
        t={t}
      />

      {/* TOP AD BANNER */}
      <div className="container mx-auto px-4 mt-6">
        <div className="max-w-6xl mx-auto ad-container border-accent/20 min-h-[90px]">
          <span className="ad-label">{t.adLabel}</span>
          {/* PLACEHOLDER: Paste your Horizontal Ad Banner code here */}
          <div className="w-full h-[90px] flex items-center justify-center text-white/10 italic text-[10px] font-bold uppercase tracking-[0.3em]">
            Premium Ad Slot (728x90)
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 pt-8">
        <div className="max-w-6xl mx-auto">
          {view === 'generator' && (
            <ImageGenerator lang={lang} t={t} onGenerated={addToGallery} />
          )}
          {view === 'editor' && (
            <ImageEditor lang={lang} t={t} onGenerated={addToGallery} />
          )}
          {view === 'gallery' && (
            <Gallery lang={lang} t={t} images={gallery} onDelete={removeFromGallery} />
          )}
          {view === 'privacy' && (
            <PrivacyPolicy lang={lang} t={t} />
          )}
        </div>
      </main>

      <footer className="fixed bottom-0 w-full bg-black/90 backdrop-blur-xl border-t border-accent-dark/30 py-6 px-8 z-40">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-black text-black text-lg">A</div>
            <p className="text-sm font-bold tracking-tight opacity-80 italic">© {new Date().getFullYear()} {t.brand}</p>
          </div>
          <div className="flex gap-6 items-center">
            <button 
              onClick={() => setView('privacy')}
              className={`text-[10px] uppercase tracking-[0.2em] font-black transition-colors ${view === 'privacy' ? 'text-accent' : 'text-white/40 hover:text-white'}`}
            >
              {t.privacyPolicy}
            </button>
            <span className="w-1.5 h-1.5 rounded-full bg-accent/30"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-accent opacity-50">Innovation in Every Pixel</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent/30"></span>
            <span className="text-[11px] font-medium opacity-40">Powered by Gemini 2.5</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;