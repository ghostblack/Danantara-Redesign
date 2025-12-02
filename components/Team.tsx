
import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../App';

interface TeamProps {
  lang: Language;
}

const TEAM_DATA = [
  {
    name: "Rosan Roeslani",
    role: { ID: "Chairman & CEO", EN: "Chairman & CEO" },
    image: "https://ik.imagekit.io/gambarid/Danantara/rosan.png"
  },
  {
    name: "Pandu Sjahrir",
    role: { ID: "Chief Investment Officer (CIO)", EN: "Chief Investment Officer (CIO)" },
    image: "https://ik.imagekit.io/gambarid/Danantara/pandu.png?updatedAt=1764516768000"
  },
  {
    name: "Dony Oskaria",
    role: { ID: "Chief Operating Officer (COO)", EN: "Chief Operating Officer (COO)" },
    image: "https://ik.imagekit.io/gambarid/Danantara/donny.png"
  }
];

const TRANSLATIONS = {
  ID: {
    label: "Leadership Spotlight",
    headline: "Leadership Team",
    description: "Dipimpin oleh sinergi teknokrat dan praktisi investasi berkaliber global yang berdedikasi mewujudkan kedaulatan ekonomi Indonesia"
  },
  EN: {
    label: "Leadership Spotlight",
    headline: "Leadership Team",
    description: "Led by a synergy of technocrats and global-caliber investment practitioners dedicated to realizing Indonesia's economic sovereignty"
  }
};

const Team: React.FC<TeamProps> = ({ lang }) => {
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
      { 
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
      }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, [hasViewed]);

  const getBaseAnimationClass = () => {
    // Smoother duration 1000ms
    return `transition-all duration-1000 ease-out transform ${hasViewed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`;
  };

  return (
    <section id="team" ref={sectionRef} className="w-full bg-white px-6 md:px-12 lg:px-20 py-24 md:py-32 max-w-[1920px] mx-auto overflow-hidden">
      
      {/* Header Section */}
      <div className="flex flex-col mb-16 md:mb-24">
        {/* Label - No Delay */}
        <div 
          className={`flex items-center gap-3 mb-6 ${getBaseAnimationClass()}`}
          style={{ transitionDelay: '0ms' }}
        >
          <img src="https://ik.imagekit.io/gambarid/Danantara/logomerah.png" alt="Logo" className="h-5 w-auto object-contain" />
          <span className="text-sm font-semibold tracking-wide text-gray-900">{t.label}</span>
        </div>

        {/* Title and Description Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <h2 
            className={`font-serif text-5xl md:text-6xl lg:text-[5rem] leading-[1] text-gray-900 ${getBaseAnimationClass()}`}
            style={{ transitionDelay: '100ms' }}
          >
            {t.headline}
          </h2>
          <p 
            className={`text-lg md:text-xl text-gray-900 leading-relaxed max-w-2xl lg:justify-self-end pb-2 ${getBaseAnimationClass()}`}
            style={{ transitionDelay: '200ms' }}
          >
            {t.description}
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
        {TEAM_DATA.map((member, index) => (
          <div 
            key={index} 
            className={`flex flex-col gap-6 group cursor-default ${getBaseAnimationClass()}`}
            // Started delays earlier at 300ms with shorter gaps (150ms)
            style={{ transitionDelay: `${300 + (index * 150)}ms` }}
          >
            {/* Image Container */}
            <div className="relative w-full aspect-[432/500] rounded-[2rem] overflow-hidden bg-gray-100">
              
              <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                  {/* Default Image */}
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-top" 
                  />
                  
                  {/* Simple Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-1 px-2">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
                {member.name}
              </h3>
              <span className="text-base md:text-lg text-gray-500 font-normal">
                {member.role[lang]}
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Team;
