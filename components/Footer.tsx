import React from 'react';
import { Mail, Instagram, Linkedin } from 'lucide-react';
import { Language } from '../App';

interface FooterProps {
  lang: Language;
}

const TRANSLATIONS = {
  ID: {
    address_title: "Danantara Indonesia Sentra Mandiri",
    address_street: "Jl. R.P. Soeroso No.2-4 Jakarta Pusat, 10330, Indonesia",
    company: "Perusahaan",
    company_links: [
      "Tentang kami",
      "Mandat & Visi",
      "Dewan Pengawas",
      "Karir (We are Hiring)"
    ],
    governance: "Tata Kelola (GCG)",
    governance_links: [
      "Laporan Keuangan",
      "Laporan Keberlanjutan (ESG)",
      "Kebijakan Privasi",
      "Whistleblowing System (WBS)"
    ],
    connect: "Tetap terhubung",
    copyright: "© 2025 Badan Pengelola Investasi Danantara. Hak Cipta Dilindungi Undang-Undang",
    managed: "Managed by The Republic of Indonesia"
  },
  EN: {
    address_title: "Danantara Indonesia Sentra Mandiri",
    address_street: "Jl. R.P. Soeroso No.2-4 Central Jakarta, 10330, Indonesia",
    company: "Company",
    company_links: [
      "About Us",
      "Mandate & Vision",
      "Supervisory Board",
      "Careers (We are Hiring)"
    ],
    governance: "Governance (GCG)",
    governance_links: [
      "Financial Reports",
      "Sustainability Report (ESG)",
      "Privacy Policy",
      "Whistleblowing System (WBS)"
    ],
    connect: "Stay Connected",
    copyright: "© 2025 Danantara Investment Management Agency. All Rights Reserved",
    managed: "Managed by The Republic of Indonesia"
  }
};

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="w-full bg-[#F5F5F5] pt-24 md:pt-32 flex flex-col justify-between overflow-hidden border-t border-gray-200/50">
      
      {/* Main Content */}
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand & Address Column */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Logo Text */}
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 leading-[0.9]">
              Danantara<br/>Indonesia
            </h2>

            {/* Address */}
            <div className="flex flex-col gap-1 text-lg text-gray-900 font-normal max-w-sm">
              <p>{t.address_title}</p>
              <p>{t.address_street}</p>
            </div>

            {/* Email */}
            <a href="mailto:investor.relations@danantara.go.id" className="flex items-center gap-3 text-lg text-gray-900 hover:text-brand-red transition-colors group w-fit">
              <Mail className="w-6 h-6 stroke-[1.5]" />
              <span className="font-normal underline underline-offset-4 decoration-gray-300 group-hover:decoration-brand-red transition-all">
                investor.relations@danantara.go.id
              </span>
            </a>
          </div>

          {/* Links Columns Container */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-8 lg:pl-12">
            
            {/* Company Links */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-bold text-gray-900">{t.company}</h3>
              <ul className="flex flex-col gap-4">
                {t.company_links.map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors font-light text-[17px]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Governance Links */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-bold text-gray-900">{t.governance}</h3>
              <ul className="flex flex-col gap-4">
                {t.governance_links.map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors font-light text-[17px]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Social Media Column */}
          <div className="lg:col-span-3 flex flex-col gap-6 lg:items-start lg:pl-12">
            <h3 className="text-xl font-bold text-gray-900">{t.connect}</h3>
            <div className="flex items-center gap-4">
              {/* X (Twitter) */}
              <a href="#" className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 bg-white">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 bg-white">
                <Instagram className="w-6 h-6 stroke-[1.5]" />
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 bg-white">
                <Linkedin className="w-6 h-6 stroke-[1.5] fill-current text-transparent stroke-current" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-300/80 mb-8 max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20"></div>

      {/* Bottom Copyright & Branding */}
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-gray-500 font-light text-base md:text-lg">
            {t.copyright}
          </p>
          
          <div className="flex items-center gap-3">
             {/* Garuda Pancasila */}
            <img 
              src="https://ik.imagekit.io/gambarid/Danantara/image%2017.png" 
              alt="Garuda Pancasila" 
              className="h-10 w-auto"
            />
            <span className="text-gray-900 text-lg font-light tracking-wide">{t.managed}</span>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Bar */}
      <div className="w-full h-3 flex">
        <div className="w-[30%] bg-[#0A0A0A]"></div>
        <div className="w-[70%] bg-[#D9232D]"></div>
      </div>

    </footer>
  );
};

export default Footer;