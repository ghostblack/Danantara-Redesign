
import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);
  const items = NAV_ITEMS[lang];

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setIsOpen(false); // Close first
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 300); // Small delay to allow menu to close
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      <nav 
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 md:py-8 max-w-[1920px] mx-auto w-full opacity-0 animate-fade-in-down"
        style={{ animationFillMode: 'forwards' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer z-50" onClick={scrollToTop}>
          <img 
            src="https://ik.imagekit.io/gambarid/Danantara/logodanantara%20putih.png?updatedAt=1764512597241" 
            alt="Danantara Indonesia" 
            className="h-8 md:h-12 w-auto object-contain"
          />
        </div>

        {/* Desktop Navigation */}
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

        {/* Desktop CTA Button */}
        <button className="hidden sm:flex items-center pl-6 pr-2 py-2 bg-white rounded-full transition-all duration-300 ease-out group hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:shadow-none active:translate-y-0">
          <span className="text-sm font-bold text-gray-900 mr-3 tracking-wide">{CTA_TEXT[lang]}</span>
          <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </button>

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={() => setIsOpen(true)}
          className="lg:hidden z-50 text-white p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none"
          aria-label="Open menu"
        >
          <Menu className="w-8 h-8" />
        </button>
      </nav>

      {/* Mobile Menu Fullscreen Overlay */}
      <div 
        className={`fixed inset-0 bg-[#0F0F0F] z-[100] flex flex-col transition-all duration-500 ease-in-out lg:hidden ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-full invisible'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
           <img 
            src="https://ik.imagekit.io/gambarid/Danantara/logodanantara%20putih.png?updatedAt=1764512597241" 
            alt="Danantara Indonesia" 
            className="h-8 w-auto object-contain"
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Mobile Links */}
        <div className="flex-1 flex flex-col justify-center px-8 gap-6 overflow-y-auto">
          {items.map((item) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className="text-3xl font-serif text-white hover:text-brand-red transition-colors block border-b border-white/5 pb-4"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Footer (Lang & CTA) */}
        <div className="p-8 border-t border-white/10 flex flex-col gap-6 bg-[#0A0A0A]">
          {/* Language Switch */}
          <div className="flex items-center justify-center gap-2 p-1 bg-white/5 rounded-xl w-full">
            <button 
              onClick={() => setLang('ID')}
              className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${lang === 'ID' ? 'bg-white text-black shadow-md' : 'text-white/60'}`}
            >
              INDONESIA
            </button>
            <button 
              onClick={() => setLang('EN')}
              className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${lang === 'EN' ? 'bg-white text-black shadow-md' : 'text-white/60'}`}
            >
              ENGLISH
            </button>
          </div>

          {/* CTA Button */}
          <button className="w-full flex items-center justify-between pl-6 pr-2 py-3 bg-[#D9232D] rounded-full active:scale-95 transition-transform">
            <span className="text-white font-bold tracking-wide">{CTA_TEXT[lang]}</span>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </button>
        </div>
      </div>

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
