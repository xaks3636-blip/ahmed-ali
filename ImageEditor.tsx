import React, { useState, useRef, useEffect } from 'react';
import { FILTERS } from '../constants';
import { gemini } from '../services/geminiService';
import { GeneratedImage, Language } from '../types';

interface ImageEditorProps {
  lang: Language;
  t: any;
  onGenerated: (img: GeneratedImage) => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ lang, t, onGenerated }) => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);
  const [customInstruction, setCustomInstruction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => (prev < 95 ? prev + Math.random() * 3 : prev));
      }, 300);
    } else {
      setProgress(100);
      const timer = setTimeout(() => setProgress(0), 1000);
      return () => clearTimeout(timer);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string);
        setProcessedImage(null);
        setCustomInstruction('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyFilter = async (isUltraHD: boolean = false) => {
    if (!originalImage) return;
    setIsLoading(true);
    try {
      let instruction = "";
      if (isUltraHD) {
        instruction = "Act as a high-end AI super-resolution engine (Real-ESRGAN/SwinIR). Perform a 4x upscale on this image. 1. Increase pixel density and sharpness by 400%. 2. Deep-learning denoising to remove JPEG compression artifacts and ISO noise. 3. GFPGAN-style face restoration: detect any human faces and enhance their skin texture, eyes, and hair details for professional portrait quality. 4. Intelligent edge sharpening without halo artifacts. Output a crystal clear, high-definition result suitable for large-format printing.";
      } else {
        instruction = `${selectedFilter.promptSuffix} ${customInstruction ? `. Additionally: ${customInstruction}` : ''}`;
      }

      const result = await gemini.editImage(originalImage, instruction);
      setProcessedImage(result);
      setSliderPos(50);
      onGenerated({
        id: Date.now().toString(),
        url: result,
        prompt: isUltraHD ? "Ultra-HD 4x Super-Resolution Enhance" : `Filter: ${selectedFilter.labelEn}`,
        style: isUltraHD ? 'ultra-hd' : 'filter',
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
      {/* Sidebar Panel */}
      <aside className="w-full lg:w-[420px] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col bg-black/40 backdrop-blur-md">
        <div className="p-8 space-y-10 h-full overflow-y-auto custom-scrollbar">
          
          <div className="space-y-4">
            <label className="block text-[11px] font-black text-accent uppercase tracking-[0.3em] flex items-center gap-3">
              <i className="fa-solid fa-cloud-arrow-up"></i>
              {t.uploadImage}
            </label>
            {!originalImage ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="bg-black/40 border-2 border-dashed border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-all group"
              >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden accept="image/*" />
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-image text-3xl"></i>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 text-center">{t.dropZone}</p>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 bg-black group">
                <img src={originalImage} className="w-full h-full object-cover opacity-60" alt="Thumbnail" />
                <button 
                  onClick={() => setOriginalImage(null)}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity font-black text-[10px] uppercase tracking-[0.3em] text-red-500"
                >
                  Replace Image
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <label className="block text-[11px] font-black text-accent uppercase tracking-[0.3em] flex items-center gap-3">
              <i className="fa-solid fa-gem"></i>
              Super-Resolution
            </label>
            <button 
              onClick={() => handleApplyFilter(true)}
              disabled={isLoading || !originalImage}
              className="w-full bg-[#2E8B57] hover:bg-[#3CB371] disabled:bg-white/10 disabled:text-white/20 text-white font-black py-6 rounded-2xl shadow-xl hover:shadow-[0_15px_30px_rgba(46,139,87,0.4)] transition-all flex flex-col items-center justify-center gap-1 uppercase tracking-widest group"
            >
              <div className="flex items-center gap-3 text-sm">
                {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-sparkles"></i>}
                <span>{t.ultraHD}</span>
              </div>
              <span className="text-[8px] font-bold opacity-60">Deep AI Super-Resolution</span>
            </button>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* SIDEBAR AD SLOT */}
          <div className="ad-container border-accent/10 min-h-[250px]">
             <span className="ad-label">{t.adLabel}</span>
             {/* PLACEHOLDER: Paste your Vertical Sidebar Ad code here */}
             <div className="flex flex-col items-center justify-center text-white/5 text-center p-4">
                <i className="fa-solid fa-rectangle-ad text-4xl mb-2 opacity-10"></i>
                <span className="text-[9px] font-black uppercase tracking-widest">Premium Ad Placement</span>
             </div>
          </div>

          <div className="space-y-4">
            <label className="block text-[11px] font-black text-accent uppercase tracking-[0.3em] flex items-center gap-3">
              <i className="fa-solid fa-sliders"></i>
              {t.filters}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {FILTERS.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter)}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-300 ${
                    selectedFilter.id === filter.id 
                      ? 'border-accent bg-accent/20 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                      : 'border-white/5 bg-black/30 hover:border-white/10 text-white/30'
                  }`}
                >
                  <i className={`fa-solid ${filter.icon} text-xs ${selectedFilter.id === filter.id ? 'text-accent' : ''}`}></i>
                  <span className="font-black text-[9px] uppercase tracking-widest truncate">{lang === 'en' ? filter.labelEn : filter.labelAr}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-[11px] font-black text-accent uppercase tracking-[0.3em] flex items-center gap-3">
              <i className="fa-solid fa-feather-pointed"></i>
              {t.customInstruction}
            </label>
            <textarea
              value={customInstruction}
              onChange={(e) => setCustomInstruction(e.target.value)}
              placeholder={t.editPlaceholder}
              className="w-full h-24 bg-black/50 border border-white/5 rounded-2xl p-4 focus:border-accent/50 outline-none transition-all resize-none text-[11px] font-medium text-white placeholder:opacity-20"
            />
            <button 
              onClick={() => handleApplyFilter(false)}
              disabled={isLoading || !originalImage}
              className="w-full bg-white/5 border border-white/10 hover:border-accent text-white hover:text-accent font-black py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-4 text-xs uppercase tracking-widest"
            >
              {t.applyFilter}
            </button>
          </div>
        </div>
      </aside>

      {/* Workspace Panel */}
      <main className="flex-1 p-8 lg:p-16 flex flex-col items-center justify-start bg-black/20">
        <div className="w-full max-w-4xl aspect-square lg:aspect-video rounded-[3rem] overflow-hidden relative shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-[12px] border-white/5 bg-black transition-all mb-10">
          {isLoading && (
            <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl z-50 flex flex-col items-center justify-center text-accent p-12 text-center">
              <div className="w-24 h-24 border-8 border-accent border-t-transparent rounded-full animate-spin mb-10 shadow-[0_0_40px_rgba(16,185,129,0.3)]"></div>
              <p className="font-black text-3xl animate-pulse tracking-tighter uppercase">
                 {progress > 50 ? t.restoring : t.upscaling}
              </p>
              <div className="w-64 h-1.5 bg-white/10 rounded-full mt-10 overflow-hidden">
                <div className="h-full bg-accent" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          {!originalImage && !processedImage && (
            <div className="w-full h-full flex flex-col items-center justify-center opacity-[0.03]">
              <i className="fa-solid fa-magic-wand-sparkles text-[15rem]"></i>
            </div>
          )}

          {originalImage && !processedImage && !isLoading && (
            <div className="w-full h-full p-12">
               <img src={originalImage} className="w-full h-full object-contain animate-fadeIn" alt="Original Large" />
            </div>
          )}

          {processedImage && (
            <div className="relative w-full h-full cursor-col-resize select-none overflow-hidden"
                 onMouseMove={(e) => {
                   if (e.buttons === 1) {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const x = e.clientX - rect.left;
                     setSliderPos(Math.max(0, Math.min(100, (x / rect.width) * 100)));
                   }
                 }}
                 onTouchMove={(e) => {
                   const rect = e.currentTarget.getBoundingClientRect();
                   const x = e.touches[0].clientX - rect.left;
                   setSliderPos(Math.max(0, Math.min(100, (x / rect.width) * 100)));
                 }}
            >
              <img src={processedImage} className="absolute inset-0 w-full h-full object-contain" alt="After" />
              <div className="absolute inset-0 w-full h-full pointer-events-none"
                   style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
                <img src={originalImage!} className="w-full h-full object-contain bg-black" alt="Before" />
              </div>

              <div className="absolute top-0 bottom-0 w-1 bg-white z-30 pointer-events-none shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                   style={{ left: `${sliderPos}%` }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-[6px] border-black flex items-center justify-center text-black shadow-2xl">
                  <i className="fa-solid fa-arrows-left-right text-xs"></i>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 z-40 bg-black/80 backdrop-blur-md px-5 py-2 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] pointer-events-none text-white/60">
                 {t.original}
              </div>
              <div className="absolute bottom-8 right-8 z-40 bg-accent text-black px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] pointer-events-none shadow-xl">
                 {t.processed}
              </div>
            </div>
          )}
        </div>

        {/* BELOW RESULT AD SLOT */}
        <div className="w-full max-w-4xl ad-container border-accent/10 min-h-[100px]">
           <span className="ad-label">{t.adLabel}</span>
           {/* PLACEHOLDER: Paste your Horizontal Content Ad code here */}
           <div className="w-full h-[80px] flex items-center justify-center text-white/5 italic text-[10px] font-bold uppercase tracking-[0.4em]">
             Horizontal Ad Placement
           </div>
        </div>

        {processedImage && !isLoading && (
          <div className="absolute bottom-12 right-12 flex gap-4 animate-fadeIn">
            <a 
              href={processedImage} 
              download="ahmed-ali-enhanced.png"
              className="bg-accent text-black px-10 py-5 rounded-3xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
            >
              <i className="fa-solid fa-download text-xl"></i>
              <span className="uppercase tracking-widest text-xs">{t.download} (4K)</span>
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default ImageEditor;