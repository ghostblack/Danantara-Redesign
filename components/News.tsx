import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language } from '../App';

interface NewsProps {
  lang: Language;
}

const NEWS_DATA = [
  {
    id: 1,
    date: { ID: "18 November 2025", EN: "18 November 2025" },
    category: { ID: "Investment", EN: "Investment" },
    title: { 
      ID: "Danantara & BlackRock Finalisasi Pendanaan Transisi Energi Hijau Rp 15 Triliun", 
      EN: "Danantara & BlackRock Finalize IDR 15 Trillion Green Energy Transition Funding" 
    },
    image: "https://ik.imagekit.io/gambarid/Danantara/office-glass.jpg?updatedAt=1764519000001"
  },
  {
    id: 2,
    date: { ID: "5 November 2025", EN: "5 November 2025" },
    category: { ID: "Investment", EN: "Investment" },
    title: { 
      ID: "Danantara Danai Proyek 'Waste-to-Energy' Pertama di 5 Kota", 
      EN: "Danantara Funds First 'Waste-to-Energy' Project in 5 Cities" 
    },
    image: "https://ik.imagekit.io/gambarid/Danantara/trucks-waste.jpg?updatedAt=1764519000002"
  },
  {
    id: 3,
    date: { ID: "4 November 2025", EN: "4 November 2025" },
    category: { ID: "Investment", EN: "Investment" },
    title: { 
      ID: "Perkuat Likuiditas, Danantara Bidik Penerbitan 'Global Bond' USD & Yuan", 
      EN: "Strengthening Liquidity, Danantara Targets USD & Yuan 'Global Bond' Issuance" 
    },
    image: "https://ik.imagekit.io/gambarid/Danantara/building-wisma.jpg?updatedAt=1764519000003"
  },
  {
    id: 4,
    date: { ID: "1 November 2025", EN: "1 November 2025" },
    category: { ID: "Investment", EN: "Investment" },
    title: { 
      ID: "Konsolidasi Aset 7 BUMN Tuntas, Kelolaan Tembus Rp 14.600 Triliun", 
      EN: "Consolidation of 7 SOE Assets Complete, AUM Surpasses IDR 14,600 Trillion" 
    },
    image: "https://ik.imagekit.io/gambarid/Danantara/rupiah-stacks.jpg?updatedAt=1764519000004"
  }
];

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=2070&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=2070&auto=format&fit=crop"  
];

const TRANSLATIONS = {
  ID: {
    label: "News",
    headline: "Kabar Danantara",
    description: "Memastikan transparansi dan akuntabilitas dalam setiap langkah pengelolaan aset negara",
    button: "Update Berita"
  },
  EN: {
    label: "News",
    headline: "Danantara News",
    description: "Ensuring transparency and accountability in every step of state asset management",
    button: "News Updates"
  }
};

const News: React.FC<NewsProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasViewed) {
          setHasViewed(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, [hasViewed]);

  const getAnimationClass = (delay: number) => {
    // Reduced duration to 800ms
    return `transition-all duration-800 ease-out transform ${hasViewed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`;
  };

  return (
    <section id="news" ref={sectionRef} className="w-full bg-white px-6 md:px-12 lg:px-20 pt-24 pb-48 md:pb-64 max-w-[1920px] mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
        
        {/* Left Column: Sticky Header Content */}
        <div className="lg:col-span-4 flex flex-col gap-8 h-fit lg:sticky lg:top-32">
          {/* Label - 0ms */}
          <div 
            className={`flex items-center gap-3 ${getAnimationClass(0)}`}
            style={{ transitionDelay: '0ms' }}
          >
            <img src="https://ik.imagekit.io/gambarid/Danantara/logomerah.png" alt="Logo" className="h-5 w-auto object-contain" />
            <span className="text-sm font-semibold tracking-wide text-gray-900">{t.label}</span>
          </div>

          {/* Title - 100ms */}
          <h2 
            className={`font-serif text-5xl md:text-6xl leading-[1.1] text-gray-900 ${getAnimationClass(0)}`}
            style={{ transitionDelay: '100ms' }}
          >
            {t.headline}
          </h2>

          {/* Description - 200ms */}
          <p 
            className={`text-xl text-gray-600 font-light leading-relaxed max-w-sm ${getAnimationClass(0)}`}
            style={{ transitionDelay: '200ms' }}
          >
            {t.description}
          </p>

          {/* Button - 300ms */}
          <div 
            className={`${getAnimationClass(0)}`}
            style={{ transitionDelay: '300ms' }}
          >
            <button className="group flex items-center gap-4 bg-[#2D2D2D] rounded-full pl-8 pr-2 py-2 hover:bg-black transition-all duration-300 active:scale-95 shadow-lg w-fit">
              <span className="text-white font-medium text-lg tracking-wide">{t.button}</span>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center relative overflow-hidden">
                <ArrowRight className="absolute w-5 h-5 text-black stroke-[2.5] transition-transform duration-300 ease-out -translate-x-8 group-hover:translate-x-0" />
                <ArrowRight className="absolute w-5 h-5 text-black stroke-[2.5] transition-transform duration-300 ease-out translate-x-0 group-hover:translate-x-8" />
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: News Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {NEWS_DATA.map((news, index) => (
            <div 
              key={news.id}
              className={`flex flex-col gap-4 group cursor-pointer ${getAnimationClass(0)}`}
              // Started grid earlier at 400ms with shorter gaps (150ms)
              style={{ transitionDelay: `${400 + (index * 150)}ms` }}
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-gray-100">
                <img 
                  src={FALLBACK_IMAGES[index]} 
                  alt={news.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>

              {/* Meta Data */}
              <div className="flex items-center justify-between text-xs md:text-sm text-gray-500 font-medium tracking-wide mt-2 border-b border-gray-200 pb-4">
                <span>{news.date[lang]}</span>
                <span>{news.category[lang]}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-medium text-gray-900 leading-snug group-hover:underline decoration-1 underline-offset-4 decoration-gray-400">
                {news.title[lang]}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default News;