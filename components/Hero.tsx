import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { ArrowRight } from 'lucide-react';
import { Language } from '../App';

const IMAGES = [
  "https://ik.imagekit.io/gambarid/Danantara/sawa.jpeg",
  "https://ik.imagekit.io/gambarid/Danantara/robert-collins-lP_FbBkMn1c-unsplash.jpg",
  "https://ik.imagekit.io/gambarid/Danantara/muhammad-syafi-al-adam-xbaaMKy99xk-unsplash%20(1).jpg"
];

const TRANSLATIONS = {
  ID: {
    headline: <>Membangun Kedaulatan <br /> Ekonomi Indonesia</>,
    mandate: "Pelajari Mandat Kami",
    report: "Lihat Laporan Kinerja 2025",
    description: "Danantara adalah lembaga investasi strategis Indonesia. Tujuan kami adalah mengubah potensi sumber daya menjadi kemakmuran bangsa yang berkelanjutan."
  },
  EN: {
    headline: <>Building Indonesia's <br /> Economic Sovereignty</>,
    mandate: "Learn Our Mandate",
    report: "View 2025 Performance Report",
    description: "Danantara is Indonesia's strategic investment institution. Our goal is to transform resource potential into sustainable national prosperity."
  }
};

interface HeroProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const Hero: React.FC<HeroProps> = ({ lang, setLang }) => {
  // Parallax effect state
  const [offset, setOffset] = useState(0);
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % IMAGES.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden text-white bg-gray-900">
      {/* Background Images Carousel with Crossfade */}
      {IMAGES.map((img, index) => (
        <div 
          key={img}
          className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url("${img}")`,
            transform: `translateY(${offset * 0.5}px) scale(1.05)`, // Parallax
          }}
        />
      ))}

      {/* Dark gradient overlay for readability - Static on top of images */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-black/10 pointer-events-none"></div>

      {/* Navigation Bar */}
      <Navbar lang={lang} setLang={setLang} />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col justify-between h-full px-8 md:px-16 pt-32 pb-12 max-w-[1920px] mx-auto">
        
        {/* Center Content: Headline */}
        <div className="flex-1 flex flex-col justify-center max-w-5xl">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-semibold tracking-wide drop-shadow-lg opacity-0 animate-fade-in-up" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
            {t.headline}
          </h1>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col gap-12">
          
          {/* Middle Row: Links (Mandate & Report) */}
          <div 
            className="flex flex-col md:flex-row justify-between items-start md:items-end w-full border-b border-white/0 pb-4 opacity-0 animate-fade-in-up"
            style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}
          >
            <a href="#" className="group relative inline-block text-lg font-normal tracking-wide text-white transition-all duration-300 ease-out hover:text-white/80 active:scale-95 origin-left">
              <span className="border-b border-white pb-1 group-hover:border-white/80 transition-colors">{t.mandate}</span>
            </a>

            <a href="#" className="group flex items-center gap-3 text-lg font-normal tracking-wide text-white transition-all duration-300 ease-out hover:text-white/80 active:scale-95 origin-left mt-6 md:mt-0">
              <span className="border-b border-white pb-1 group-hover:border-white/80 transition-colors">{t.report}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </a>
          </div>

          {/* Bottom Row: Description & Indicators */}
          <div 
            className="flex flex-col md:flex-row justify-between items-end gap-8 opacity-0 animate-fade-in-up"
            style={{animationDelay: '1.0s', animationFillMode: 'forwards'}}
          >
            <p className="max-w-xl text-lg md:text-xl font-light leading-relaxed text-gray-100 opacity-90">
              {t.description}
            </p>

            {/* Dynamic Carousel Indicators */}
            <div className="flex items-center gap-3 pb-2 z-20">
              {IMAGES.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/50 ${
                    currentSlide === index 
                      ? 'bg-white scale-110' 
                      : 'bg-transparent hover:bg-white/30'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default Hero;