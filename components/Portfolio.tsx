import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language } from '../App';

interface PortfolioProps {
  lang: Language;
}

const SECTOR_DATA = [
  {
    id: 'finance',
    label: { ID: 'Financial Service', EN: 'Financial Services' },
    image: 'https://ik.imagekit.io/gambarid/Danantara/Gedung-Bank-Mandiri.jpeg',
    desc: { ID: 'Layanan Keuangan', EN: 'Financial Services' }
  },
  {
    id: 'energy',
    label: { ID: 'Energy & Power', EN: 'Energy & Power' },
    image: 'https://ik.imagekit.io/gambarid/Danantara/Sarulla_plant_NorthSumatra_Indonesia_small-1024x768.jpg',
    desc: { ID: 'Energi & Kelistrikan', EN: 'Energy & Power' }
  },
  {
    id: 'mineral',
    label: { ID: 'Mineral & Resources', EN: 'Mineral & Resources' },
    image: 'https://ik.imagekit.io/gambarid/Danantara/humas-indonesia-implementasi-prinsip-berkelanjutan-mind-id-jaga-stabilitas-sektor-pertambangan-21%20(1).jpeg',
    desc: { ID: 'Mineral & Sumber Daya', EN: 'Mineral & Resources' }
  },
  {
    id: 'digital',
    label: { ID: 'Digital Transformation', EN: 'Digital Transformation' },
    image: 'https://ik.imagekit.io/gambarid/Danantara/76016.jpg',
    desc: { ID: 'Transformasi Digital', EN: 'Digital Transformation' }
  }
];

const TRANSLATIONS = {
  ID: {
    sectionTitle: "Portfolio Aset",
    headline: "Aset Strategis Terkonsolidasi",
    description: "Menyatukan ekosistem aset negara melalui sinergi entitas prioritas sebagai mesin pertumbuhan baru (New Growth Engine) demi mewujudkan visi Indonesia Emas 2045",
    detailLink: "Detail Portfolio"
  },
  EN: {
    sectionTitle: "Asset Portfolio",
    headline: "Consolidated Strategic Assets",
    description: "Uniting the state asset ecosystem through the synergy of priority entities as a New Growth Engine to realize the vision of Golden Indonesia 2045",
    detailLink: "Portfolio Details"
  }
};

const INITIAL_STOCKS = [
  { symbol: 'IHSG', name: 'Index Saham Gabungan', price: 8508.71, change: -1.60 },
  { symbol: 'BBRI', name: 'Bank Rakyat Indonesia', price: 3680.00, change: -1.20 },
  { symbol: 'BMRI', name: 'Bank Mandiri', price: 7200.00, change: -0.80 },
  { symbol: 'BBNI', name: 'Bank Negara Indonesia', price: 5400.00, change: -1.10 },
  { symbol: 'TLKM', name: 'Telkom Indonesia', price: 2830.00, change: +0.50 },
  { symbol: 'ANTM', name: 'Aneka Tambang', price: 1540.00, change: -2.30 }, 
  { symbol: 'PGAS', name: 'Perusahaan Gas Negara', price: 1120.00, change: -0.50 },
  { symbol: 'PTBA', name: 'Bukit Asam', price: 2450.00, change: +1.20 },
  { symbol: 'TINS', name: 'Timah Tbk', price: 890.00, change: -1.00 },
  { symbol: 'SMGR', name: 'Semen Indonesia', price: 3400.00, change: -1.50 },
];

const Portfolio: React.FC<PortfolioProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [activeSectorIndex, setActiveSectorIndex] = useState(0);
  const [stocks, setStocks] = useState(INITIAL_STOCKS);
  const [hasViewed, setHasViewed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasViewed) {
          setHasViewed(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, [hasViewed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(currentStocks => 
        currentStocks.map(stock => {
          const fluctuation = (Math.random() * 0.1) - 0.05;
          const newPrice = stock.price * (1 + (fluctuation / 100));
          return {
            ...stock,
            price: newPrice,
          };
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getAnimationClass = (delayClass: string) => {
    // Reduced duration to 800ms
    return `transition-all duration-800 ease-out transform ${hasViewed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${delayClass}`;
  };

  return (
    <section id="portfolio" ref={sectionRef} className="w-full bg-white px-6 md:px-12 lg:px-20 py-16 md:py-24 max-w-[1920px] mx-auto overflow-hidden">
      
      {/* Main Grid: Image and Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-32 mb-8">
        
        {/* Left Column: Image Only - Delay 0 */}
        <div className={`lg:col-span-5 flex flex-col ${getAnimationClass('delay-0')}`}>
          <div className="relative w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-lg shadow-gray-200/40 group">
             {SECTOR_DATA.map((sector, index) => (
                <div 
                  key={sector.id}
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out ${index === activeSectorIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                  style={{ backgroundImage: `url("${sector.image}")` }}
                >
                   {/* Gradient overlay specifically for image depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
                </div>
             ))}
          </div>
        </div>

        {/* Right Column: Content & Selector */}
        <div className="lg:col-span-7 flex flex-col justify-between pt-2">
          
          {/* Top Content Container */}
          <div>
            {/* Section Header - Delay 100ms */}
            <div className={`flex items-center gap-3 mb-8 ${getAnimationClass('delay-100')}`}>
              <img src="https://ik.imagekit.io/gambarid/Danantara/logomerah.png" alt="Logo" className="h-5 w-auto object-contain" />
              <span className="text-sm font-semibold tracking-wide text-gray-900">{t.sectionTitle}</span>
            </div>

            {/* Headline - Delay 200ms */}
            <h2 className={`font-serif text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.1] text-gray-900 mb-10 max-w-3xl text-left ${getAnimationClass('delay-200')}`}>
              {t.headline}
            </h2>

            {/* Description - Delay 300ms */}
            <p className={`text-xl text-gray-500 font-light leading-relaxed mb-12 w-full text-left ${getAnimationClass('delay-300')}`}>
              {t.description}
            </p>
          </div>

          {/* Interactive Sector List */}
          <div className="flex flex-col w-full relative">
            {/* Animated Divider Line - Delay 350ms */}
            <div className={`absolute top-0 left-0 h-[1px] bg-gray-200 transition-all duration-1000 ease-out delay-[350ms] ${hasViewed ? 'w-full' : 'w-0'}`} />
            
            {SECTOR_DATA.map((sector, index) => (
              <div 
                key={sector.id}
                onClick={() => setActiveSectorIndex(index)}
                className={`
                  group flex items-center justify-between py-6 border-b cursor-pointer 
                  ${index === activeSectorIndex ? 'border-gray-900' : 'border-gray-200 hover:border-gray-300'}
                  transition-all duration-500 ease-out
                  transform ${hasViewed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                // Staggered list starts at 400ms with 100ms gaps
                style={{ transitionDelay: `${400 + (index * 100)}ms` }}
              >
                <span className={`text-xl md:text-2xl text-left transition-colors duration-300 ${index === activeSectorIndex ? 'text-gray-900 font-medium' : 'text-gray-400 font-light group-hover:text-gray-600'}`}>
                  {sector.label[lang]}
                </span>
                
                <ArrowRight 
                  className={`w-6 h-6 transition-all duration-300 ${index === activeSectorIndex ? 'opacity-100 translate-x-0 text-gray-900' : 'opacity-0 -translate-x-4 text-gray-400'}`} 
                />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Secondary Grid Row for the Link - Delay 500ms */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-32 mb-20 md:mb-32 ${getAnimationClass('delay-500')}`}>
         <div className="lg:col-span-5 flex flex-col pl-2">
            {/* Detail Link */}
            <a href="#" className="group inline-flex items-center gap-3 text-lg font-medium text-gray-900 w-fit">
                <span className="border-b border-gray-900 pb-0.5">{t.detailLink}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            </a>
         </div>
      </div>

      {/* Stock Ticker Footer - Delay 600ms */}
      <div className={`mt-8 pt-0 w-full overflow-hidden ${getAnimationClass('delay-600')}`}>
        <div className="w-full flex">
           {/* Marquee Wrapper */}
           <div className="flex animate-marquee hover:pause whitespace-nowrap">
              {stocks.map((stock, index) => (
                <div 
                  key={`${stock.symbol}-orig`} 
                  className="flex justify-between items-start gap-12 min-w-[300px] px-8 border-r border-gray-100/50"
                >
                  <div className="flex flex-col gap-1 text-left">
                    <h4 className="text-3xl font-normal text-gray-900 font-sans tracking-tight">{stock.symbol}</h4>
                    <span className="text-[10px] sm:text-xs text-gray-400 font-light truncate max-w-[150px]">{stock.name}</span>
                  </div>
                  <div className="flex flex-col gap-1 items-end text-right">
                    <span className="text-xl sm:text-2xl font-medium text-gray-900 font-sans tracking-tight">
                      {stock.price.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className={`text-[10px] sm:text-xs font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-[#D9232D]'}`}>
                      {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2).replace('.', ',')}%today
                    </span>
                  </div>
                </div>
              ))}
              {stocks.map((stock, index) => (
                <div 
                  key={`${stock.symbol}-dup`} 
                  className="flex justify-between items-start gap-12 min-w-[300px] px-8 border-r border-gray-100/50"
                >
                  <div className="flex flex-col gap-1 text-left">
                    <h4 className="text-3xl font-normal text-gray-900 font-sans tracking-tight">{stock.symbol}</h4>
                    <span className="text-[10px] sm:text-xs text-gray-400 font-light truncate max-w-[150px]">{stock.name}</span>
                  </div>
                  <div className="flex flex-col gap-1 items-end text-right">
                    <span className="text-xl sm:text-2xl font-medium text-gray-900 font-sans tracking-tight">
                      {stock.price.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className={`text-[10px] sm:text-xs font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-[#D9232D]'}`}>
                      {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2).replace('.', ',')}%today
                    </span>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>

    </section>
  );
};

export default Portfolio;