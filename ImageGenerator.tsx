import React, { useState } from 'react';
import { STYLES } from '../constants';
import { gemini } from '../services/geminiService';
import { GeneratedImage, Language } from '../types';

interface ImageGeneratorProps {
  lang: Language;
  t: any;
  onGenerated: (img: GeneratedImage) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ lang, t, onGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    try {
      const imageUrl = await gemini.generateImage(prompt, selectedStyle.promptSuffix, aspectRatio);
      setPreviewUrl(imageUrl);
      onGenerated({
        id: Date.now().toString(),
        url: imageUrl,
        prompt,
        style: selectedStyle.id,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error(error);
      alert(t.errorGeneral);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-[3rem] lg:rounded-[4rem] overflow-hidden animate-fadeIn flex flex-col lg:flex-row min-h-[750px] shadow-2xl">
      {/* Sidebar: Creative Controls */}
      <aside className="w-full lg:w-[420px] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col bg-black/40 backdrop-blur-md">
        <div className="p-8 space-y-8 h-full overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            <label className="block text-[11px] font-black text-accent uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              {t.promptPlaceholder}
            </label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-36 bg-black/50 border border-white/5 rounded-2xl p-6 focus:border-accent/50 focus:ring-4 focus:ring-accent/5 outline-none transition-all resize-none text-base font-medium placeholder:opacity-20 text-white"
              placeholder={t.promptPlaceholder}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">{t.aspectRatio}</label>
            <div className="grid grid-cols-4 gap-2">
              {['1:1', '16:9', '9:16', '4:3'].map(ratio => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`py-3 rounded-xl border font-black text-[10px] transition-all ${
                    aspectRatio === ratio 
                      ? 'border-accent bg-accent/20 text-accent shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                      : 'border-white/5 bg-white/5 hover:border-white/20 text-white/40'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-[11px] font-black text-accent uppercase tracking-[0.3em] flex items-center gap-3">
              <i className="fa-solid fa-palette"></i>
              {t.styles}
            </label>
            <div className="grid grid-cols-2 gap-4">
              {STYLES.map(style => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style)}
                  className={`relative group overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                    selectedStyle.id === style.id ? 'border-accent scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-transparent opacity-40 hover:opacity-100'
                  }`}
                >
                  <div className="aspect-[4/3] relative">
                    <img src={style.image} alt={style.labelEn} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${selectedStyle.id === style.id ? 'from-accent/90' : 'from-black/90'} via-transparent to-transparent flex items-end justify-center p-3`}>
                      <span className={`text-[9px] font-black uppercase tracking-widest text-center ${selectedStyle.id === style.id ? 'text-black' : 'text-white'}`}>
                        {lang === 'en' ? style.labelEn : style.labelAr}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* SIDEBAR AD SLOT */}
          <div className="ad-container border-accent/10 min-h-[250px]">
             <span className="ad-label">{t.adLabel}</span>
             {/* PLACEHOLDER: Paste your Vertical Sidebar Ad code here */}
             <div className="flex flex-col items-center justify-center text-white/5 text-center p-4">
                <i className="fa-solid fa-rectangle-ad text-4xl mb-2 opacity-10"></i>
                <span className="text-[9px] font-black uppercase tracking-widest">Premium Vertical Slot</span>
             </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={handleGenerate}
              disabled={isLoading || !prompt}
              className="w-full bg-accent hover:bg-accent-light disabled:bg-white/10 disabled:text-white/20 text-black font-black py-5 rounded-2xl shadow-xl hover:shadow-accent/30 active:scale-[0.98] transition-all flex items-center justify-center gap-4 text-lg group uppercase tracking-widest"
            >
              {isLoading ? (
                <i className="fa-solid fa-circle-notch fa-spin"></i>
              ) : (
                <i className="fa-solid fa-bolt group-hover:scale-125 transition-transform"></i>
              )}
              <span>{isLoading ? t.generating : t.generateBtn}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Workspace: Live Preview / Result */}
      <main className="flex-1 p-8 lg:p-16 flex flex-col items-center justify-start bg-black/20 relative">
        <div className="w-full max-w-2xl aspect-square lg:aspect-video rounded-[3rem] overflow-hidden relative shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-[12px] border-white/5 bg-black transition-all mb-10">
          {isLoading && (
            <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl z-20 flex flex-col items-center justify-center text-accent p-12 text-center">
              <div className="w-24 h-24 border-8 border-accent border-t-transparent rounded-full animate-spin mb-10 shadow-[0_0_40px_rgba(16,185,129,0.3)]"></div>
              <p className="font-black text-3xl animate-pulse tracking-tighter uppercase">{t.generating}</p>
              <p className="mt-4 text-accent/40 text-[10px] font-black tracking-[0.5em] uppercase">Manifesting Artifact...</p>
            </div>
          )}
          
          {previewUrl ? (
            <img src={previewUrl} alt="Generated" className="w-full h-full object-contain animate-fadeIn" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center opacity-[0.03]">
               <span className="text-[20rem] font-black select-none pointer-events-none">A</span>
            </div>
          )}

          {previewUrl && !isLoading && (
            <div className="absolute bottom-10 right-10 flex gap-4 animate-fadeIn">
              <a 
                href={previewUrl} 
                download="ahmed-ali-studio.png"
                className="bg-accent text-black px-10 py-5 rounded-3xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 border border-accent/20"
              >
                <i className="fa-solid fa-download text-xl"></i>
                <span className="uppercase tracking-widest text-xs">{t.download}</span>
              </a>
            </div>
          )}
        </div>

        {/* BELOW RESULT AD SLOT */}
        <div className="w-full max-w-2xl ad-container border-accent/10 min-h-[100px]">
           <span className="ad-label">{t.adLabel}</span>
           {/* PLACEHOLDER: Paste your Horizontal In-Article Ad code here */}
           <div className="w-full h-[80px] flex items-center justify-center text-white/5 italic text-[9px] font-bold uppercase tracking-[0.4em]">
             Horizontal Ad Slot
           </div>
        </div>

        {/* Floating Context Info */}
        {!isLoading && !previewUrl && (
          <div className="mt-12 text-center opacity-20 max-w-sm pointer-events-none">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] leading-relaxed">
              Define your prompt on the left sidebar to generate high-fidelity AI imagery.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ImageGenerator;