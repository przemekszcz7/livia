import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Fish, MapPin, Phone, Clock, Sparkles } from 'lucide-react';
import { SmokeWisp, RopeDivider, AnchorIcon, FishIcon } from './NauticalDecorations';

// We duplicate the FULL_MENU and PRODUCTS data here or reuse to keep it contained, clean, and modular.
export const PRODUCTS_SHOWCASE = [
  {
    id: 1,
    title: "Paprykarz",
    desc: "Wyrób własny wg tradycyjnej receptury, z najlepszych gatunków ryb z dodatkiem ryżu i aromatycznych przypraw.",
    image: "https://i.ibb.co/Q3kM5CSs/paprykarz.jpg",
    alt: "domowy paprykarz rybny - smażalnia niechorze, wędzarnia niechorze, ryby niechorze"
  },
  {
    id: 2,
    title: "Łosoś z pieca",
    desc: "W aksamitnym sosie szpinakowym, pieczony do idealnej soczystości.",
    image: "https://i.ibb.co/ksQ03Jzv/lososzpieca.jpg",
    alt: "łosoś z pieca w sosie szpinakowym - smażalnia niechorze, ryby niechorze"
  },
  {
    id: 3,
    title: "Gołąbki rybne",
    desc: "W tradycyjnym sosie pomidorowym, lekka i wyborna alternatywa dla mięsa.",
    image: "https://i.ibb.co/5WjSnT21/golabki.jpg",
    alt: "gołąbki rybne w sosie pomidorowym - smażalnia niechorze, ryby niechorze"
  },
  {
    id: 4,
    title: "Halibut",
    desc: "W szlachetnym sosie kurkowym, podawany prosto z pieca.",
    image: "https://i.ibb.co/k21V53FP/halibut.jpg",
    alt: "pieczony halibut w sosie kurkowym - smażalnia niechorze, ryby niechorze"
  }
];

export const FULL_MENU_DATA = [
  {
    category: "RYBY SMAŻONE",
    description: "Chrupiące ryby klasycznie smażone na złocisty kolor wg naszej tradycyjnej receptury",
    items: [
      { name: "Dorsz filet", suffix: "delikatne, białe mięso" },
      { name: "Sandacz filet", suffix: "szlachetna ryba słodkowodna" },
      { name: "Miruna filet", suffix: "delikatny i soczysty smak" },
      { name: "Flądra tusza", suffix: "bałtycka klasyka, ryba maślana w smaku" },
      { name: "Turbot tusza", suffix: "król Bałtyku o wykwintnym smaku" }
    ]
  },
  {
    category: "RYBY Z PIECA",
    description: "Lżejsza i niezwykle soczysta alternatywa dla dań smażonych, podawana z wykwintnymi sosami własnego wyrobu",
    items: [
      { name: "Filet z łososia na maśle czoskowym lub w sosie szpinakowym", suffix: "bogaty w kwasy Omega-3" },
      { name: "Dorsz polędwica z czarniaka w sosie kurkowym, livorno lub szpinakowym", suffix: "grube, jędrne płaty ryby" },
      { name: "Filet z halibuta w sosie kurkowym, livorno lub szpinakowym", suffix: "delikatność rozpływająca się w ustach" }
    ]
  },
  {
    category: "SPECJALNOŚCI LIVII",
    description: "Nasze autorskie wyroby własne przygotowywane codziennie na miejscu według sekretnych receptur",
    items: [
      { name: "Gołąbki rybne w sosie pomidorowym", suffix: "delikatny farsz rybny w liściach kapusty" },
      { name: "Fishburger u Ciszków", suffix: "soczysty kawałek ryby w chrupiącej bułce z autorskimi dodatkami" },
      { name: "Bułka ze śledziem", suffix: "klasyk znad morza z cebulką i ogórkiem" },
      { name: "Sałatki Śledziowe w różnych smakach", suffix: "marynowane wg tradycyjnych receptur" },
      { name: "Paprykarz (wyrób własny)", suffix: "prawdopodobnie najlepszy na polskim wybrzeżu" }
    ]
  },
  {
    category: "ZUPY ROZGRZEWAJĄCE",
    description: "Gęste, aromatyczne zupy idealnie pasujące do morskiego klimatu",
    items: [
      { name: "Zupa rybna tradycyjna", suffix: "esencjonalna i bogata w kawałki ryb" },
      { name: "Flaczki z kalmarów", suffix: "pikantne i wyraziste" },
      { name: "Krem z pomidorów", suffix: "aksamitny i rozgrzewający" }
    ]
  },
  {
    category: "RYBY WĘDZONE NA ZIMNO & GORĄCO",
    description: "Codzienny świeży uchył z naszej rzemieślniczej wędzarni opalanej drewnem olchowym i bukowym",
    items: [
      { name: "Węgorz wędzony", suffix: "absolutny rarytas i duma wędzarni" },
      { name: "Łosoś wędzony na zimno / gorąco", suffix: "delikatny, rozpływający się w ustach" },
      { name: "Halibut wędzony", suffix: "bardzo soczysty o białym mięsie" },
      { name: "Antar wędzony", suffix: "tłusta, wyrazista ryba" },
      { name: "Dorsz wędzony", suffix: "chude i delikatne mięso o niesamowitym aromacie" },
      { name: "Śledź wędzony (pikling)", suffix: "tradycyjny bałtycki przysmak" },
      { name: "Makrela wędzona", suffix: "klasyka polskiego stołu wędzalniczego" },
      { name: "Karmazyn / Pstrąg / Trewal / Gładzica / Morszczuk", suffix: "szeroki asortyment wędzarniczy u Ciszków" }
    ]
  }
];

interface MenuPageProps {
  onBackToHome: () => void;
}

export default function MenuPage({ onBackToHome }: MenuPageProps) {
  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-bg-section/5 pb-24 pt-28 px-4 relative">
      {/* Background Decor */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brown/10 to-transparent pointer-events-none" />
      <div className="absolute top-28 right-8 hidden xl:block opacity-20 pointer-events-none hover:rotate-12 transition-transform duration-500">
        <AnchorIcon />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Navigation / Back Button */}
        <div className="mb-12">
          <button 
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-3 text-brown hover:text-amber font-mono text-xs uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-amber/45 rounded-md px-3 py-1.5 border border-brown/10 hover:border-amber bg-white/50 backdrop-blur-sm shadow-sm"
          >
            <ArrowLeft size={16} />
            Powrót do strony głównej
          </button>
        </div>

        {/* Header Block */}
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-amber uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
              <Fish className="w-4 h-4 animate-pulse" />
              <span>SMAŻALNIA & WĘDZARNIA LIVIA</span>
              <Fish className="w-4 h-4 animate-pulse" />
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-brown mb-6">
              Pełne Menu Restauracji
            </h1>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <RopeDivider />
            <p className="text-text-muted text-lg mt-6 italic leading-relaxed">
              Wszystkie nasze potrawy przygotowujemy na bieżąco ze starannie wyselekcjonowanej ryby. Wędzimy u Ciszków wyłącznie tradycyjną rzemieślniczą metodą przy użyciu drewna bukowego i olchowego.
            </p>
          </div>
        </header>

        {/* Featured Items Highlights */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-[2px] w-8 bg-amber" />
            <h2 className="font-display text-2xl md:text-3xl text-brown font-semibold flex items-center gap-2">
              <Sparkles className="text-amber" size={20} /> Specjały Polecane przez Szefa Kuchni
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS_SHOWCASE.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden border border-brown/10 hover:border-amber/45 transition-all shadow-md hover:shadow-xl flex flex-col group h-full"
              >
                <div className="relative h-48 overflow-hidden bg-bg-section/10">
                  <img 
                    src={item.image} 
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    width={380}
                    height={192}
                  />
                  <div className="absolute top-3 left-3 bg-amber text-brown font-mono font-bold text-[10px] px-2 py-1 rounded-sm uppercase tracking-wider">
                    Polecane
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg text-brown font-bold mb-2 group-hover:text-amber transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-text-muted text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-brown/5 flex items-center justify-between text-[10px] text-amber font-mono font-bold">
                    <span>WYRÓB WŁASNY</span>
                    <Fish size={12} className="opacity-40 text-brown" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Printable Karta Dań Design */}
        <main className="bg-[#FCF9F5] border-2 border-brown/20 rounded-2xl p-6 sm:p-10 md:p-16 shadow-2xl relative overflow-visible">
          {/* Internal Border Trim for vintage catalog style */}
          <div className="absolute inset-4 border border-brown/10 rounded-xl pointer-events-none" />
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg px-8 py-2 border-2 border-amber rounded-full z-10">
            <span className="font-mono text-sm tracking-[0.3em] text-brown uppercase font-bold whitespace-nowrap">KARTA DAŃ LIVIA</span>
          </div>

          <div className="absolute right-[-10px] top-10 opacity-5 hidden lg:block transform rotate-12">
            <FishIcon />
          </div>

          {/* Grid of Categories */}
          <div className="space-y-16 relative z-10">
            {FULL_MENU_DATA.map((section, sIdx) => (
              <motion.section 
                key={sIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sIdx * 0.1, duration: 0.6 }}
                className="space-y-6"
              >
                {/* Category Header */}
                <div className="text-center max-w-xl mx-auto">
                  <h3 className="font-display text-2xl md:text-3xl text-brown uppercase tracking-wide font-bold">
                    {section.category}
                  </h3>
                  {section.description && (
                    <p className="text-text-muted text-xs sm:text-sm italic mt-2">
                      {section.description}
                    </p>
                  )}
                  <div className="flex justify-center items-center gap-2 mt-3">
                    <div className="h-[1px] w-12 bg-amber/30" />
                    <div className="w-1.5 h-1.5 bg-amber rounded-full" />
                    <div className="h-[1px] w-12 bg-amber/30" />
                  </div>
                </div>

                {/* Items List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-8">
                  {section.items.map((item, iIdx) => (
                    <div 
                      key={iIdx} 
                      className="group flex flex-col p-3 rounded-lg hover:bg-white/40 transition-all border border-transparent hover:border-brown/5"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-brown font-display font-semibold group-hover:text-amber transition-colors text-base sm:text-lg">
                          {item.name}
                        </span>
                      </div>
                      {item.suffix && (
                        <span className="text-text-muted text-xs font-body mt-1 pl-1">
                          {item.suffix}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          {/* Footer note inside Menu */}
          <footer className="mt-16 pt-8 border-t border-brown/15 text-center text-xs text-text-muted max-w-lg mx-auto space-y-2">
            <p className="italic">
              * Wszystkie ceny dań rybnych zależą od gramatury surowca. Informacje o alergenach oraz pełny cennik dostępne są u obsługi lokalu.
            </p>
            <p className="font-mono text-[10px] tracking-widest text-[#B39374] uppercase">
              RECEPTURY RODZINNE CISZKÓW — GWARANCJA TRADYCJI I JAKOŚCI OD LAT
            </p>
          </footer>
        </main>

        {/* Visual Call To Action */}
        <section className="mt-16 text-center bg-bg-dark text-text-light p-8 rounded-2xl border border-brown/20 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 texture-wood opacity-40 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-white">Chcesz zamówić na wynos lub zapytać o rybę dnia?</h3>
            <p className="text-text-light/80 text-sm">
              Skontaktuj się z nami bezpośrednio. Codziennie o <span className="text-amber font-mono font-semibold">14:00</span> z naszej komory wędzarniczej uwalnia się gorący dym pełen świeżych aromatów.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <a 
                href="tel:663854283"
                className="flex items-center gap-2 px-6 py-3 bg-amber hover:bg-amber-light text-brown text-sm font-mono font-bold uppercase tracking-wider rounded-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber/45"
              >
                <Phone size={16} />
                Zadzwoń: 663 854 283
              </a>
              <button 
                type="button"
                onClick={onBackToHome}
                className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:bg-white/10 text-text-light text-sm font-mono uppercase tracking-wider rounded-sm transition-all"
              >
                <MapPin size={16} />
                Sprawdź dojazd
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
