
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language } from '../App';

interface AboutProps {
  lang: Language;
}

const AVATAR_CONTENT = {
  ID: [
    {
      quote: "“Semua kekayaan kita harus sebesar-besarnya untuk kepentingan dan kemakmuran rakyat kita (rakyat Indonesia)”",
      img: "https://ik.imagekit.io/gambarid/Danantara/prabowo_sq.jpg?updatedAt=1764516768239" 
    },
    {
      quote: "“Mengalokasikan 80% modal untuk proyek domestik, khususnya di sektor prioritas seperti hilirisasi mineral, perkebunan, kelautan, dan energi baru terbarukan (EBT).”",
      img: "https://ik.imagekit.io/gambarid/Danantara/p2.png"
    },
    {
      quote: "“Fokus pada investasi strategis seperti sektor peternakan ayam, energi terbarukan, dan digital untuk memperkuat perekonomian nasional, sambil memprioritaskan manajemen risiko yang terukur.”",
      img: "https://ik.imagekit.io/gambarid/Danantara/p3.png"
    }
  ],
  EN: [
    {
      quote: "“All of our wealth must be maximized for the interest and prosperity of our people (the people of Indonesia)”",
      img: "https://ik.imagekit.io/gambarid/Danantara/prabowo_sq.jpg?updatedAt=1764516768239"
    },
    {
      quote: "“Allocating 80% of capital for domestic projects, specifically in priority sectors such as mineral downstreaming, plantations, maritime, and renewable energy (EBT).”",
      img: "https://ik.imagekit.io/gambarid/Danantara/p2.png"
    },
    {
      quote: "“Focusing on strategic investments such as poultry, renewable energy, and digital sectors to strengthen the national economy, while prioritizing measurable risk management.”",
      img: "https://ik.imagekit.io/gambarid/Danantara/p3.png"
    }
  ]
};

const TRANSLATIONS = {
  ID: {
    sectionTitle: "Tentang Kami",
    mainTextBlack: "Danantara Indonesia adalah badan pengelola investasi strategis yang",
    mainTextGray: "mengonsolidasikan dan mengoptimalkan investasi pemerintah untuk mendukung pertumbuhan ekonomi nasional. Nama ini diberikan oleh Presiden Prabowo Subianto, yang mana \"Daya\" berarti energi, \"Anagata\" berarti masa depan, dan \"Nusantara\" merujuk pada Indonesia. Nama ini mencerminkan kekuatan dan potensi masa depan Indonesia.",
    readMore: "Baca Lebih Lanjut",
    stats: [
      { id: "01", value: "9.400 T", label: "Aset Kelolaan" },
      { id: "02", value: "7 BUMN", label: "Entitas Terkonsolidasi" },
      { id: "03", value: "4 Terbesar", label: "Posisi Global" }
    ]
  },
  EN: {
    sectionTitle: "About Us",
    mainTextBlack: "Danantara Indonesia is a strategic investment management agency that",
    mainTextGray: "consolidates and optimizes government investments to support national economic growth. This name was given by President Prabowo Subianto, where \"Daya\" means energy, \"Anagata\" means future, and \"Nusantara\" refers to Indonesia. This name reflects the strength and future potential of Indonesia.",
    readMore: "Read More",
    stats: [
      { id: "01", value: "9.400 T", label: "Assets Under Management" },
      { id: "02", value: "7 SOEs", label: "Consolidated Entities" },
      { id: "03", value: "4th Largest", label: "Global Position" }
    ]
  }
};

// Hook for counting animation
const useCounter = (end: number, duration: number = 2000, start: boolean = false, startValue: number = 0) => {
  const [count, setCount] = useState(startValue);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Ease out expo
      const ease = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
      
      // Calculate current value based on startValue and end difference
      const range = end - startValue;
      const currentCount = Math.floor(startValue + (ease(percentage) * range));
      
      setCount(currentCount);

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, start, startValue]);

  return count;
};

// Component to handle number extraction and animation
const AnimatedStat = ({ value, start }: { value: string, start: boolean }) => {
  const numericPart = parseInt(value.replace(/\D/g, '')) || 0;
  const suffixMatch = value.match(/^[\d.,]+(.*)$/);
  const suffix = suffixMatch ? suffixMatch[1] : '';
  
  // Logic: If the number is large (like 9400), start from ~85% of the value (approx 8000)
  // This makes the animation quicker visually and less jarring
  // Small numbers (like 7 or 4) start from 0
  const initialValue = numericPart > 100 ? Math.floor(numericPart * 0.85) : 0;
  
  // Reduced duration to 2500ms so it finishes comfortably (not too long)
  const count = useCounter(numericPart, 2500, start, initialValue);
  const formattedCount = count.toLocaleString('id-ID');

  return (
    <>
      {formattedCount}{suffix}
    </>
  );
};

const About: React.FC<AboutProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const avatars = AVATAR_CONTENT[lang];
  
  const [activeAvatar, setActiveAvatar] = useState(0);
  const [hasViewed, setHasViewed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const avatarImages = [
    "https://ik.imagekit.io/gambarid/Danantara/p1.png", 
    "https://ik.imagekit.io/gambarid/Danantara/p2.png",
    "https://ik.imagekit.io/gambarid/Danantara/p3.png"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasViewed) {
          setHasViewed(true);
        }
      },
      { 
        threshold: 0.3, // Increased threshold: 30% needs to be visible
        rootMargin: "0px 0px -100px 0px" // Triggers when element is 100px up from bottom
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasViewed]);

  const getAnimationClass = (delayClass: string) => {
    // Smoother duration (1000ms)
    return `transition-all duration-1000 ease-out transform ${hasViewed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} ${delayClass}`;
  };

  return (
    <section id="about" ref={sectionRef} className="w-full bg-white px-6 md:px-12 lg:px-20 py-24 md:py-32 max-w-[1920px] mx-auto text-gray-900 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-12">
        
        {/* Left Column: Avatars & Quote */}
        {/* Reduced delay from 200 to 100 */}
        <div className={`lg:col-span-3 flex flex-col gap-8 pt-2 ${getAnimationClass('delay-100')}`}>
          {/* Avatar Group - Interactive */}
          <div className="flex -space-x-4 pl-1 py-2">
            {[0, 1, 2].map((index) => {
              const isActive = activeAvatar === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveAvatar(index)}
                  className={`
                    relative w-16 h-16 md:w-20 md:h-20 rounded-full border-[3px] border-white overflow-hidden shadow-md transition-all duration-300 ease-out focus:outline-none
                    ${isActive ? 'z-50 scale-110 shadow-xl grayscale-0 ring-2 ring-gray-100' : 'z-0 grayscale-[0.7] hover:grayscale-0 scale-100 hover:scale-105 hover:z-40'}
                  `}
                  style={{
                    zIndex: isActive ? 50 : 30 - index * 10 
                  }}
                  aria-label={`Select person ${index + 1}`}
                >
                   <img 
                     src={avatarImages[index]} 
                     alt="Profile" 
                     className="w-full h-full object-cover"
                   />
                </button>
              );
            })}
          </div>

          <div className="w-full border-t border-gray-900/80 my-2"></div>

          <div className="min-h-[120px]">
            <p className="text-base md:text-xl font-medium leading-relaxed text-gray-900 transition-opacity duration-300 animate-fade-in">
              {avatars[activeAvatar].quote}
            </p>
          </div>
        </div>

        {/* Right Column: Main Content */}
        <div className="lg:col-span-9 flex flex-col">
          
          {/* Section Header */}
          {/* Reduced delay from 300 to 150 */}
          <div className={`flex items-center gap-3 mb-8 ${getAnimationClass('delay-150')}`}>
             <img src="https://ik.imagekit.io/gambarid/Danantara/logomerah.png" alt="Logo" className="h-6 w-auto object-contain" />
            <span className="text-sm font-bold tracking-wider text-gray-900 uppercase">{t.sectionTitle}</span>
          </div>

          {/* Main Description */}
          {/* Reduced delay from 500 to 200 */}
          <div className={`mb-12 ${getAnimationClass('delay-200')}`}>
            <h2 
              className="text-2xl md:text-3xl lg:text-[2.5rem] font-normal transition-colors duration-1000"
              style={{ lineHeight: '1.4' }}
            >
              <span className="text-gray-900 font-medium">{t.mainTextBlack} </span>
              <span 
                className={`transition-colors duration-[2000ms] delay-700 ease-out ${
                  hasViewed ? 'text-gray-900' : 'text-gray-300'
                }`}
              >
                {t.mainTextGray}
              </span>
            </h2>
          </div>

          {/* Custom Capsule Button */}
          {/* Reduced delay from 700 to 300 */}
          <div className={getAnimationClass('delay-300')}>
            <button className="group flex items-center justify-between pl-8 pr-2 py-2 bg-[#2D2D2D] text-white rounded-full transition-all duration-300 hover:bg-black hover:scale-[1.01] active:scale-95 shadow-xl hover:shadow-2xl min-w-[280px] md:min-w-[320px]">
              <span className="text-xl font-semibold tracking-wide text-white">{t.readMore}</span>
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ml-8 relative overflow-hidden">
                <ArrowRight className="absolute w-6 h-6 text-black stroke-[3] transition-transform duration-300 ease-out -translate-x-12 group-hover:translate-x-0" />
                <ArrowRight className="absolute w-6 h-6 text-black stroke-[3] transition-transform duration-300 ease-out translate-x-0 group-hover:translate-x-12" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      {/* Reduced delay from 1000 to 400 */}
      <div className={`w-full border-t border-gray-200 pt-12 ${getAnimationClass('delay-400')}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {t.stats.map((stat, index) => (
            <div key={index} className="flex flex-col gap-2 relative group cursor-default">
              <span className="text-sm text-gray-400 font-light tracking-wide mb-2 transition-colors group-hover:text-gray-600">({stat.id})</span>
              <div className="flex flex-col">
                <span className="text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-medium tracking-tight text-[#2D2D2D] mb-3 transition-transform duration-500 ease-out origin-left group-hover:scale-105">
                  <AnimatedStat value={stat.value} start={hasViewed} />
                </span>
                <span className="text-xl text-gray-600 font-normal">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
