import React from 'react';
import { ArrowRight } from 'lucide-react';

interface NavbarProps {
  lang: 'ID' | 'EN';
  setLang: (lang: 'ID' | 'EN') => void;
}

const NAV_ITEMS = {
  ID: [
    { name: 'Tentang Kami', id: 'about' },
    { name: 'Mandat', id: 'mandat' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Leadership', id: 'team' },
    { name: 'Berita', id: 'news' }
  ],
  EN: [
    { name: 'About Us', id: 'about' },
    { name: 'Mandate', id: 'mandat' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Leadership', id: 'team' },
    { name: 'News', id: 'news' }
  ]
};

const CTA_TEXT = {
  ID: 'Hubungan Investor',
  EN: 'Investor Relations'
};

const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const items = NAV_ITEMS[lang];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav 
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-8 max-w-[1920px] mx-auto w-full opacity-0 animate-fade-in-down"
        style={{ animationFillMode: 'forwards' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
          <img 
            src="https://ik.imagekit.io/gambarid/Danantara/logodanantara%20putih.png?updatedAt=1764512597241" 
            alt="Danantara Indonesia" 
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Center Nav Links */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Switch */}
          <div className="text-sm font-medium text-white/90 mr-4 tracking-wide select-none">
            <span 
              onClick={() => setLang('ID')}
              className={`cursor-pointer transition-colors ${lang === 'ID' ? 'text-white font-bold' : 'text-white/60 hover:text-white'}`}
            >
              INA
            </span>
            <span className="mx-2 opacity-50">|</span>
            <span 
              onClick={() => setLang('EN')}
              className={`cursor-pointer transition-colors ${lang === 'EN' ? 'text-white font-bold' : 'text-white/60 hover:text-white'}`}
            >
              ENG
            </span>
          </div>

          {/* Nav Pills */}
          {items.map((item) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm font-medium text-white hover:bg-white/20 transition-all duration-300 whitespace-nowrap active:scale-95"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <button className="hidden sm:flex items-center pl-6 pr-2 py-2 bg-white rounded-full transition-all duration-300 ease-out group hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:shadow-none active:translate-y-0">
          <span className="text-sm font-bold text-gray-900 mr-3 tracking-wide">{CTA_TEXT[lang]}</span>
          <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </button>

        {/* Mobile Menu Icon (Placeholder) */}
        <button className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;