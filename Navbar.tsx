import React from 'react';
import { AppView, Language, Theme } from '../types';

interface NavbarProps {
  lang: Language;
  theme: Theme;
  view: AppView;
  setView: (v: AppView) => void;
  toggleLang: () => void;
  toggleTheme: () => void;
  t: any;
}

const Navbar: React.FC<NavbarProps> = ({ lang, view, setView, toggleLang, t }) => {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-accent-dark/20 px-6 py-5">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-5 cursor-pointer group" onClick={() => setView('generator')}>
          <div className="w-14 h-14 bg-black border-2 border-accent rounded-2xl flex items-center justify-center text-accent shadow-[0_0_20px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] group-hover:bg-accent group-hover:text-black transition-all duration-500">
            <span className="text-3xl font-black">A</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter leading-none text-white group-hover:text-accent transition-colors">
              {t.brand}
            </h1>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-accent/60">{t.subtitle}</span>
              <span className="text-[11px] font-ar opacity-40">{lang === 'en' ? 'أحمد علي' : 'Ahmed Ali'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center bg-white/5 backdrop-blur-md rounded-2xl p-1.5 border border-white/10">
          <NavButton active={view === 'generator'} onClick={() => setView('generator')} icon="fa-wand-magic-sparkles" label={t.navGenerator} />
          <NavButton active={view === 'editor'} onClick={() => setView('editor')} icon="fa-sliders" label={t.navEditor} />
          <NavButton active={view === 'gallery'} onClick={() => setView('gallery')} icon="fa-shapes" label={t.navGallery} />
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLang}
            className="px-6 h-12 rounded-2xl bg-white/5 border border-white/10 hover:border-accent hover:bg-accent/10 transition-all font-bold text-sm flex items-center gap-3 group"
          >
            <i className="fa-solid fa-language text-lg text-accent group-hover:scale-110 transition-transform"></i>
            <span className="text-white/80">{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: string; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-black transition-all duration-300 ${
      active 
        ? 'bg-accent shadow-[0_10px_20px_rgba(16,185,129,0.2)] text-black' 
        : 'text-white/50 hover:text-white hover:bg-white/5'
    }`}
  >
    <i className={`fa-solid ${icon} ${active ? 'scale-110' : ''}`}></i>
    <span>{label}</span>
  </button>
);

export default Navbar;