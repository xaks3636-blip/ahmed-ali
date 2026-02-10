import React from 'react';
import { Language } from '../types';

interface PrivacyPolicyProps {
  lang: Language;
  t: any;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ t }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 lg:p-16 animate-fadeIn shadow-2xl max-w-4xl mx-auto mb-12">
      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
          <i className="fa-solid fa-shield-halved text-3xl"></i>
        </div>
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
          {t.privacyPolicy}
        </h2>
      </div>

      <p className="text-white/60 text-lg mb-12 font-medium leading-relaxed italic border-l-4 border-accent pl-6">
        {t.privacyIntro}
      </p>

      <div className="grid gap-12">
        <PolicySection 
          icon="fa-database" 
          title={t.dataSection} 
          description={t.dataDesc} 
        />
        <PolicySection 
          icon="fa-rectangle-ad" 
          title={t.adsSection} 
          description={t.adsDesc} 
        />
        <PolicySection 
          icon="fa-cookie-bite" 
          title={t.cookiesSection} 
          description={t.cookiesDesc} 
        />
        <PolicySection 
          icon="fa-envelope" 
          title={t.contactSection} 
          description={t.contactDesc} 
        />
      </div>

      <div className="mt-16 pt-12 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent/30">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

const PolicySection: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="group space-y-4">
    <div className="flex items-center gap-4">
      <i className={`fa-solid ${icon} text-accent opacity-50 group-hover:opacity-100 transition-opacity`}></i>
      <h3 className="text-xl font-black text-white uppercase tracking-widest">{title}</h3>
    </div>
    <p className="text-white/40 leading-loose text-sm group-hover:text-white/60 transition-colors">
      {description}
    </p>
  </div>
);

export default PrivacyPolicy;