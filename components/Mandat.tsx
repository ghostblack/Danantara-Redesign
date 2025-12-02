
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language } from '../App';

interface MandatProps {
  lang: Language;
}

const TRANSLATIONS = {
  ID: {
    pill: "Mandat Negara",
    headline: "Perjalanan Menggapai Kemakmuran Indonesia",
    button: "Visi dan Misi",
    description: "Setiap aset dan sumber daya negara harus dikelola secara efektif dan tepat sasaran agar manfaatnya dapat langsung dirasakan oleh seluruh rakyat Indonesia, sesuai dengan upaya mengoptimalkan pengamalan mandat Pasal 33 Ayat 3 Undang Undang Dasar 1945 serta Misi Asta Cita terkait pengelolaan kekayaan negara."
  },
  EN: {
    pill: "State Mandate",
    headline: "The Journey to Achieving Indonesia's Prosperity",
    button: "Vision and Mission",
    description: "Every state asset and resource must be managed effectively and targeted accurately so that the benefits can be directly felt by all Indonesian people, in accordance with efforts to optimize the implementation of the mandate of Article 33 Paragraph 3 of the 1945 Constitution and the Asta Cita Mission regarding the management of state wealth."
  }
};

const Mandat: React.FC<MandatProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.4 // Wait until 40% of the section is visible
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
  }, []);

  // Standardized transition: duration-1000 for smoother feel
  const transitionClass = "transition-all duration-1000 ease-out transform";
  const visibleClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16';

  return (
    <section id="mandat" ref={sectionRef} className="relative w-full h-screen min-h-[800px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://ik.imagekit.io/gambarid/Danantara/danantara.png")',
          transform: 'scale(1.05)'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16 flex flex-col justify-between">
        
        {/* Top Content: Pill & Headline */}
        <div className="flex flex-col items-start gap-8 md:gap-12">
          
          {/* Mandat Negara Pill - No delay */}
          <div 
            className={`flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full pl-2 pr-6 py-2 ${transitionClass} ${visibleClass}`}
          >
            <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center">
                <img src="https://ik.imagekit.io/gambarid/Danantara/logomerah.png" alt="Logo" className="w-6 h-auto" />
            </div>
            <span className="text-white font-medium tracking-wide text-sm md:text-base">{t.pill}</span>
          </div>

          {/* Headline - Delay 150ms */}
          <h2 
            className={`font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] text-white max-w-5xl delay-150 ${transitionClass} ${visibleClass}`}
          >
            {t.headline}
          </h2>

          {/* Visi Misi Button - Delay 300ms */}
          <div className={`mt-4 delay-300 ${transitionClass} ${visibleClass}`}>
            <button className="group flex items-center gap-4 bg-white rounded-full pl-8 pr-2 py-2 hover:bg-gray-100 transition-all duration-300 active:scale-95 shadow-lg">
                <span className="text-gray-900 font-bold text-lg tracking-wide">{t.button}</span>
                <div className="w-12 h-12 rounded-full bg-[#D9232D] flex items-center justify-center relative overflow-hidden">
                    <ArrowRight className="absolute w-5 h-5 text-white stroke-[2.5] transition-transform duration-300 ease-out -translate-x-8 group-hover:translate-x-0" />
                    <ArrowRight className="absolute w-5 h-5 text-white stroke-[2.5] transition-transform duration-300 ease-out translate-x-0 group-hover:translate-x-8" />
                </div>
            </button>
          </div>
        </div>

        {/* Bottom Content: Description - Delay 450ms */}
        <div 
            className={`w-full max-w-3xl border-l-2 border-[#D9232D] pl-6 md:pl-8 py-2 delay-[450ms] ${transitionClass} ${visibleClass}`}
        >
            <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed">
                {t.description}
            </p>
        </div>

      </div>
    </section>
  );
};

export default Mandat;
