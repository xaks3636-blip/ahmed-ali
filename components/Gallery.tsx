import React from 'react';
import { GeneratedImage, Language } from '../types';

interface GalleryProps {
  lang: Language;
  t: any;
  images: GeneratedImage[];
  onDelete: (id: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ lang, t, images, onDelete }) => {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-10 animate-fadeIn">
        <div className="w-40 h-40 rounded-[3.5rem] bg-white/5 border-4 border-dashed border-accent-dark/20 flex items-center justify-center">
          <i className="fa-solid fa-layer-group text-6xl text-accent/10"></i>
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-white/10 uppercase tracking-tighter">{t.noImages}</h2>
          <p className="text-accent/20 max-w-xs mx-auto text-[10px] font-black uppercase tracking-[0.4em]">Start your artistic engine</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10 animate-fadeIn">
      {images.map(image => (
        <div key={image.id} className="group bg-white/5 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 hover:border-accent/40 hover:-translate-y-3 transition-all duration-700">
          <div className="aspect-square relative overflow-hidden bg-black">
            <img src={image.url} alt={image.prompt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 group-hover:opacity-50" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 translate-y-6 group-hover:translate-y-0">
              <div className="flex flex-col gap-4">
                <a 
                  href={image.url} 
                  download={`ahmed-ali-${image.id}.png`}
                  className="w-full bg-accent text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-accent-light transition-all transform active:scale-95 shadow-xl text-xs uppercase tracking-widest"
                >
                  <i className="fa-solid fa-download"></i>
                  {t.download}
                </a>
                <button 
                  onClick={() => onDelete(image.id)}
                  className="w-full bg-red-500/10 backdrop-blur-xl text-red-500 border border-red-500/20 py-4 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all active:scale-95 text-xs uppercase tracking-widest font-black"
                  title={t.delete}
                >
                  <i className="fa-solid fa-trash-can mr-2"></i>
                  {t.delete}
                </button>
              </div>
            </div>
          </div>
          <div className="p-8 space-y-5">
            <div className="flex justify-between items-center">
              <span className="bg-accent/10 text-accent text-[9px] px-4 py-2 rounded-xl font-black uppercase tracking-widest border border-accent/20">
                {image.style}
              </span>
              <span className="text-[9px] text-white/30 font-black uppercase tracking-[0.2em]">
                {new Date(image.timestamp).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
            <p className="text-sm font-medium leading-relaxed text-white/80 line-clamp-2 italic group-hover:text-accent transition-colors">
              "{image.prompt}"
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;