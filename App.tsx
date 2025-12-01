import React, { useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Mandat from './components/Mandat';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import News from './components/News';
import Footer from './components/Footer';

export type Language = 'ID' | 'EN';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ID');

  return (
    <div className="w-full min-h-screen bg-white">
      <Hero lang={lang} setLang={setLang} />
      <About lang={lang} />
      <Mandat lang={lang} />
      <Portfolio lang={lang} />
      <Team lang={lang} />
      <News lang={lang} />
      <Footer lang={lang} />
    </div>
  );
};

export default App;