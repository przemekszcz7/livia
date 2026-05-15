/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Facebook, 
  MapPin, 
  Phone, 
  Star, 
  Menu as MenuIcon, 
  X, 
  Clock, 
  Fish, 
  Waves,
  Navigation,
  Quote
} from 'lucide-react';
import { 
  FishIcon, 
  AnchorIcon, 
  HookIcon, 
  SmokeWisp, 
  Seagull, 
  RopeDivider 
} from './components/NauticalDecorations';

// --- Data ---
const PRODUCTS = [
  {
    id: 1,
    title: "Paprykarz",
    desc: "Wyrób własny wg tradycyjnej receptury",
    image: "https://i.postimg.cc/7Lr9RYFC/682442135-122173731224871736-6776368048048448645-n.jpg"
  },
  {
    id: 2,
    title: "Łosoś z pieca",
    desc: "W aksamitnym sosie szpinakowym",
    image: "https://i.postimg.cc/ZnQFxT8M/679530491-122173546988871736-6257842709918702111-n.jpg"
  },
  {
    id: 3,
    title: "Gołąbki rybne",
    desc: "W tradycyjnym sosie pomidorowym",
    image: "https://i.postimg.cc/3JDgHQCG/682022159-122173546814871736-3683840955976017963-n.jpg"
  },
  {
    id: 4,
    title: "Halibut",
    desc: "W szlachetnym sosie kurkowym",
    image: "https://i.postimg.cc/RZLdjz4W/505921880-122115717314871736-7770390269341459292-n.jpg"
  },
  {
    id: 5,
    title: "Dorsz",
    desc: "W aromatycznym sosie Livorno",
    image: "https://i.postimg.cc/fRDj7gmb/505584261-122115716918871736-8185831084064450162-n.jpg"
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-amber/30 selection:text-brown">
      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-bg/90 backdrop-blur-md border-b-2 border-brown-light/10">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Fish className="text-amber" size={28} />
            <span className="font-display text-2xl font-bold tracking-tight text-brown">Livia</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-widest text-text-muted">
            <a href="#hero" className="hover:text-amber transition-colors">Start</a>
            <a href="#menu" className="hover:text-amber transition-colors">Nasze Ryby</a>
            <a href="#lokalizacja" className="hover:text-amber transition-colors">Dojazd</a>
            <a href="#opinie" className="hover:text-amber transition-colors">Goście</a>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://www.facebook.com/profile.php?id=61576152080532" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-soft"
              id="fb-nav-link"
            >
              <Facebook size={20} />
            </a>
            <button 
              className="md:hidden p-2 text-brown"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-bg-dark text-text-light flex flex-col items-center justify-center p-8"
          >
            <button 
              className="absolute top-8 right-8 p-2 text-text-light"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8 font-display text-4xl">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)}>Start</a>
              <a href="#menu" onClick={() => setMobileMenuOpen(false)}>Nasze Ryby</a>
              <a href="#lokalizacja" onClick={() => setMobileMenuOpen(false)}>Lokalizacja</a>
              <a href="#opinie" onClick={() => setMobileMenuOpen(false)}>Opinie</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Background Textures */}
        <div className="absolute inset-0 bg-bg-section texture-net pointer-events-none" />
        
        {/* Seagulls Decoration */}
        <Seagull delay={0} />
        <Seagull delay={10} />
        <Seagull delay={15} />

        <div className="relative z-10 text-center max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-amber uppercase tracking-[0.3em] mb-6"
          >
            — SMAŻALNIA & WĘDZARNIA RYB —
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-[clamp(2.5rem,8vw,7rem)] leading-none font-display mb-8 text-bg-dark"
          >
            Livia
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12"
          >
            <div className="flex items-center gap-2 font-mono text-text-muted">
              <MapPin size={18} className="text-amber" />
              <span>Ul. Parkowa 5, Niechorze</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-amber rounded-full" />
            <div className="flex items-center gap-2 font-mono text-text-muted">
              <Phone size={18} className="text-amber" />
              <span>663 854 283</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href="#menu" className="px-8 py-4 bg-brown text-text-light font-display text-lg rounded-sm hover:bg-brown-light transition-soft shadow-xl">
              Zobacz naszą kartę
            </a>
            <a 
              href="https://www.google.com/maps/dir//Parkowa+5,+72-350+Niechorze" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-brown text-brown font-display text-lg rounded-sm hover:bg-brown hover:text-text-light transition-soft"
            >
              Wyznacz trasę
            </a>
          </motion.div>
        </div>

        {/* Smoke Stack Effect (Abstract) */}
        <div className="absolute right-[10%] bottom-[10%] hidden lg:block">
          <div className="relative">
            <SmokeWisp delay={0} />
            <SmokeWisp delay={1} />
            <SmokeWisp delay={2} />
          </div>
        </div>

        {/* Seal Badge */}
        <motion.div 
          initial={{ opacity: 0, rotate: 15, scale: 0 }}
          animate={{ opacity: 1, rotate: -8, scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="absolute top-1/4 right-[5%] md:right-[15%] stamp"
        >
          ŚWIEŻO WĘDZONE
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <div className="w-1 h-12 bg-brown rounded-full" />
        </div>
      </section>

      {/* --- Menu / Products --- */}
      <section id="menu" className="relative py-24 bg-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <header className="mb-20 text-center">
            <p className="font-mono text-amber uppercase tracking-widest mb-4">— Z NASZEJ KUCHNI</p>
            <h2 className="text-5xl md:text-6xl mb-6">Tradycja na Talerzu</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-text-muted text-lg italic">
                Każdego dnia podajemy to, co morskie fale przyniosły do portu. 
                Nasze ryby wędzimy tradycyjną metodą na drewnie olchowym.
              </p>
            </div>
            <div className="mt-8 flex justify-center opacity-30">
              <FishIcon />
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {PRODUCTS.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col bg-white rounded-[10px] overflow-hidden shadow-2xl transition-transform hover:-translate-y-2 border-t-[3px] border-amber"
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 bg-amber text-xs font-mono px-3 py-1 text-white tracking-widest uppercase">
                    Polecamy
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between bg-[#FDF4E7]">
                  <div>
                    <h3 className="text-2xl mb-2 text-brown">{item.title}</h3>
                    <p className="text-text-muted leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-brown/10 flex items-center justify-between">
                    <span className="font-mono text-sm text-amber font-bold">LIVIA NIECHORZE</span>
                    <Fish size={18} className="text-teal opacity-30" />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Special Callout Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-bg-dark text-text-light p-10 rounded-[10px] flex flex-col justify-center items-center text-center relative overflow-hidden h-full min-h-[400px]"
            >
              <div className="absolute inset-0 texture-wood opacity-50" />
              <div className="relative z-10">
                <AnchorIcon />
                <h3 className="text-3xl mt-6 mb-4 font-display">Świeża Ryba</h3>
                <p className="font-mono text-sm text-amber-light mb-8 opacity-80 uppercase tracking-widest">Dostępna codziennie</p>
                <p className="text-text-light/80 italic mb-8 px-4">
                  "Ryba u nas nie czeka. To my na nią czekamy, by podać ją Państwu najświeższą, jak to możliwe."
                </p>
                <div className="w-12 h-[2px] bg-amber mx-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Location --- */}
      <section id="lokalizacja" className="relative py-24 bg-bg-dark text-text-light overflow-hidden">
        <div className="absolute inset-0 texture-wood opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 p-20 lantern-glow pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-mono text-amber-light uppercase tracking-widest mb-4">— GDZIE NAS ZNALEŹĆ</p>
              <h2 className="text-5xl mb-8 text-white">W samym sercu Niechorza</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brown rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-amber" />
                  </div>
                  <div>
                    <h4 className="font-display text-xl mb-1">Adres:</h4>
                    <p className="text-text-light/70">Ul. Parkowa 5, 72-350 Niechorze</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brown rounded-full flex items-center justify-center shrink-0">
                    <Phone className="text-amber" />
                  </div>
                  <div>
                    <h4 className="font-display text-xl mb-1">Telefon:</h4>
                    <p className="text-text-light/70">663 854 283</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brown rounded-full flex items-center justify-center shrink-0">
                    <Clock className="text-amber" />
                  </div>
                  <div>
                    <h4 className="font-display text-xl mb-1">Godziny otwarcia:</h4>
                    <p className="text-text-light/70">Zapraszamy codziennie</p>
                    <p className="text-xs font-mono text-amber-light/60 mt-1 uppercase">Sezon letni: 10:00 - do ostatniego gościa</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61576152080532" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-blue-600 rounded-sm hover:bg-blue-700 transition-colors font-mono text-sm uppercase tracking-wider"
                >
                  <Facebook size={20} />
                  Facebook
                </a>
                <a 
                  href="https://www.google.com/maps/dir//Parkowa+5,+72-350+Niechorze" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 border border-white/20 rounded-sm hover:bg-white/10 transition-colors font-mono text-sm uppercase tracking-wider"
                >
                  <Navigation size={20} />
                  Nawiguj
                </a>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-brown h-[500px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2339.7402997563454!2d15.074166177188982!3d54.096079718362574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47007680aa52d90d%3A0xfb7a20d991d775c0!2sParkowa%205%2C%2072-350%20Niechorze!5e0!3m2!1spl!2spl!4v1778834824750!5m2!1spl!2spl" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Livia Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* --- Reviews --- */}
      <section id="opinie" className="py-24 bg-bg-section relative overflow-hidden">
        <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-10">
          <HookIcon />
        </div>
        
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="font-mono text-amber uppercase tracking-widest mb-4">— WASZYM ZDANIEM</p>
            <h2 className="text-5xl mb-6">Wracacie do nas nie bez powodu</h2>
            <div className="flex justify-center gap-1 mb-8">
              {[1, 2, 3, 4, 5].map(s => <Star key={s} className="fill-amber text-amber" size={24} />)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[10px] shadow-lg border-t-4 border-teal relative"
            >
              <Quote className="absolute top-6 right-6 text-teal opacity-10" size={64} />
              <p className="text-lg italic mb-6 text-text relative z-10">
                "Pyszne rybki, wszystko świeżo uwędzone na miejscu. Klimat prawdziwego morsiego portu. 
                Paprykarz - poezja smaku!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-light/20 rounded-full flex items-center justify-center font-display text-teal text-xl">M</div>
                <div>
                  <h5 className="font-bold">Marek</h5>
                  <p className="text-xs font-mono text-text-muted">Opinia z Facebook</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[10px] shadow-lg border-t-4 border-amber relative"
            >
              <Quote className="absolute top-6 right-6 text-amber opacity-10" size={64} />
              <p className="text-lg italic mb-6 text-text relative z-10">
                "Gołąbki rybne to absolutny hit! Nigdy nie jadłam czegoś tak dobrego. 
                Bardzo miła obsługa i wspaniała lokalizacja blisko plaży."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-light/20 rounded-full flex items-center justify-center font-display text-amber text-xl">A</div>
                <div>
                  <h5 className="font-bold">Anna Z.</h5>
                  <p className="text-xs font-mono text-text-muted">Opinia z Facebook</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-16">
            <a 
              href="https://www.facebook.com/profile.php?id=61576152080532&sk=reviews" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-brown text-brown font-display hover:bg-brown hover:text-white transition-soft"
            >
              Przeczytaj więcej opinii na Facebooku
            </a>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-bg-darker text-text-light pt-20 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 texture-wood opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Fish className="text-amber" size={28} />
                <span className="font-display text-3xl font-bold tracking-tight text-white uppercase">Livia</span>
              </div>
              <p className="text-text-light/50 max-w-sm mb-8 leading-relaxed">
                Tradycyjna smażalnia i wędzarnia ryb w Niechorzu. 
                Pielęgnujemy smaki Bałtyku i dostarczamy to, co najlepsze 
                prosto z morza na Państwa stoły.
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/profile.php?id=61576152080532" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-amber-light uppercase tracking-widest text-sm mb-6">Nawigacja</h4>
              <ul className="space-y-3 text-text-light/60">
                <li><a href="#hero" className="hover:text-amber transition-colors">Strona Główna</a></li>
                <li><a href="#menu" className="hover:text-amber transition-colors">Nasza Oferta</a></li>
                <li><a href="#lokalizacja" className="hover:text-amber transition-colors">Jak dojechać</a></li>
                <li><a href="#opinie" className="hover:text-amber transition-colors">Wasze Opinie</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-amber-light uppercase tracking-widest text-sm mb-6">Kontakt</h4>
              <p className="text-text-light/60 mb-2">Ul. Parkowa 5</p>
              <p className="text-text-light/60 mb-2">72-350 Niechorze</p>
              <p className="text-white font-bold mt-4">663 854 283</p>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs text-text-light/30 font-mono">
              © {new Date().getFullYear()} LIVIA NIECHORZE. WSZYSTKIE PRAWA ZASTRZEŻONE.
            </p>
            <div className="flex items-center gap-4 opacity-30">
              <AnchorIcon />
              <span className="w-10 h-[10px] bg-amber/50 rounded-full" />
              <Waves size={20} />
            </div>
          </div>
        </div>

        {/* Waves Animation (Abstract) */}
        <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden opacity-20">
          <motion.div 
            animate={{ x: [-100, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="flex gap-1"
          >
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-20 h-full border-t border-amber" />
            ))}
          </motion.div>
        </div>
      </footer>

      {/* Floating CTA Mobile */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <a 
          href="tel:663854283"
          className="w-16 h-16 bg-amber text-white rounded-full shadow-2xl flex items-center justify-center animate-pulse"
        >
          <Phone />
        </a>
      </div>
    </div>
  );
}
