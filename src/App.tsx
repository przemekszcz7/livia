/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BlogPage from './components/BlogPage';
import MenuPage from './components/MenuPage';
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
  Quote,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { 
  FishIcon, 
  AnchorIcon, 
  HookIcon, 
  SmokeWisp, 
  Seagull, 
  RopeDivider 
} from './components/NauticalDecorations';

export interface ReviewItem {
  author_name: string;
  rating: number;
  relative_time_description: string;
  profile_photo_url: string;
  text: string;
  source: string;
}

// --- Data ---
const PRODUCTS = [
  {
    id: 1,
    title: "Paprykarz",
    desc: "Wyrób własny wg tradycyjnej receptury",
    image: "https://i.ibb.co/RkDdvXF6/paprykarz.webp",
    alt: "domowy paprykarz rybny - smażalnia niechorze, wędzarnia niechorze, ryby niechorze"
  },
  {
    id: 2,
    title: "Łosoś z pieca",
    desc: "W aksamitnym sosie szpinakowym",
    image: "https://i.ibb.co/tTYR6Vgb/lososzpieca.webp",
    alt: "łosoś z pieca w sosie szpinakowym - smażalnia niechorze, ryby niechorze"
  },
  {
    id: 3,
    title: "Gołąbki rybne",
    desc: "W tradycyjnym sosie pomidorowym",
    image: "https://i.ibb.co/MkKQ159R/golabkirybne.webp",
    alt: "gołąbki rybne w sosie pomidorowym - smażalnia niechorze, ryby niechorze"
  },
  {
    id: 4,
    title: "Halibut",
    desc: "W szlachetnym sosie kurkowym",
    image: "https://i.ibb.co/1fhJWFsB/halibut.webp",
    alt: "pieczony halibut w sosie kurkowym - smażalnia niechorze, ryby niechorze"
  },
  {
    id: 5,
    title: "Dorsz",
    desc: "W aromatycznym sosie Livorno",
    image: "https://i.ibb.co/M5QWjsj7/dorszlivorno.webp",
    alt: "świeży dorsz w sosie livorno - smażalnia niechorze, ryby niechorze"
  },
  {
    id: 6,
    title: "Fishburger",
    desc: "Soczysty kawałek ryby w chrupiącej bułce z naszymi autorskimi dodatkami",
    image: "https://i.ibb.co/Rp55cPxT/burger.webp",
    alt: "soczysty fishburger u Ciszków - smażalnia niechorze, ryby niechorze"
  },
  {
    id: 7,
    title: "Krem z pomidorów",
    desc: "Aromatyczna i rozgrzewająca, przygotowana według tradycyjnej receptury",
    image: "https://i.ibb.co/7tPypt11/krempomidor.jpg",
    alt: "rozgrzewający krem z pomidorów z rybą - wędzarnia niechorze, ryby niechorze"
  },
  {
    id: 8,
    title: "Witryna sklepowa",
    desc: "Szeroki wybór ryb i przetworów dostępnych na miejscu",
    image: "https://i.ibb.co/h1WJdCbh/witryna.jpg",
    alt: "świeże i wędzone ryby w gablocie - wędzarnia niechorze, smażalnia niechorze, ryby niechorze"
  },
  {
    id: 9,
    title: "Nasza Wędzarnia",
    desc: "Tradycyjne wędzenie na drewnie olchowym i bukowym dla unikalnego aromatu",
    image: "https://i.ibb.co/TMM0Fzfk/wedzarnia.jpg",
    alt: "tradycyjna rzemieślnicza wędzarnia u Ciszków - wędzarnia niechorze, ryby niechorze"
  },
  {
    id: 10,
    title: "Śledzie w różnych smakach",
    desc: "Domowe marynaty i unikalne kompozycje smakowe prosto z naszej kuchni",
    image: "https://i.ibb.co/VY1D0bZj/sledz.jpg",
    alt: "domowe marynowane śledzie - wędzarnia niechorze, ryby niechorze"
  },
  {
    id: 11,
    title: "Smażone ryby",
    desc: "Chrupiące, smażone na złocisty kolor według tradycyjnej receptury",
    image: "https://i.ibb.co/xKTDzW3c/smazone.jpg",
    alt: "chrupiąca smażona flądra u Ciszków - smażalnia niechorze, ryby niechorze"
  },
  {
    id: 12,
    title: "Smażone ryby",
    desc: "Najlepszej jakości ryby, podawane prosto z naszej smażalni",
    image: "https://i.ibb.co/1GxHwCmF/smazone2.jpg",
    alt: "złocisty smażony dorsz filet - smażalnia niechorze, ryby niechorze"
  }
];

const FULL_MENU = [
  {
    category: "RYBY SMAŻONE",
    items: ["Dorsz filet", "Sandacz filet", "Miruna filet", "Flądra tusza", "Turbot tusza"]
  },
  {
    category: "RYBY Z PIECA",
    items: [
      "Filet z łososia na maśle czoskowym lub w sosie szpinakowym",
      "Dorsz polędwica z czarniaka w sosie kurkowym, livorno lub szpinakowym",
      "Filet z halibuta w sosie kurkowym, livorno lub szpinakowym"
    ]
  },
  {
    category: "ZUPY",
    items: [
      "Zupa rybna",
      "Flaczki z kalmarów",
      "Krem z pomidorów"
    ]
  },
  {
    category: "SPECJALNOŚCI",
    items: [
      "Gołąbki rybne w sosie pomidorowym",
      "Fishburger",
      "Bułka ze śledziem",
      "Sałatki Śledziowe",
      "Paprykarz (wyrób własny)"
    ]
  },
  {
    category: "RYBY WĘDZONE",
    items: [
      "Węgorz", "Antar", "Łosoś filet", "Łosoś dzwonko", "Halibut", "Maślana", 
      "Dorsz", "Trewal", "Karmazyn", "Pstrąg", "Gładzica (flądra)", "Morszczuk", 
      "Makrela", "Śledź", "Łosoś wędzony na zimno"
    ]
  }
];

const FAQ_ITEMS = [
  {
    question: "Czym różni się wędzenie na zimno od wędzenia na gorąco?",
    answer: "Wędzenie na gorąco odbywa się w temperaturze 60–90°C — ryba jest po nim w pełni ugotowana, soczysta i gotowa do jedzenia od razu. Wędzenie na zimno to proces w temperaturze poniżej 30°C, trwający znacznie dłużej — efektem jest sprężysta, intensywnie aromatyczna ryba o dłuższym terminie przydatności. Oba rodzaje wędzonek znajdziesz w naszej ofercie."
  },
  {
    question: "Jak długo można przechowywać wędzoną rybę kupioną na wynos?",
    answer: "Wędzona ryba kupiona na wynos powinna być przechowywana w lodówce i spożyta w ciągu 2–3 dni. Najlepiej smakuje w dniu zakupu — wtedy aromat dymu jest najbardziej intensywny."
  },
  {
    question: "Jak dojechać do Niechorza samochodem?",
    answer: "Niechorze leży w województwie zachodniopomorskim, w gminie Rewal. Jadąc od strony Szczecina, należy kierować się na Rewal i dalej drogą wojewódzką wzdłuż wybrzeża. Od Kołobrzegu trasa prowadzi przez Trzęsacz i Rewal. W sezonie letnim warto przyjechać rano — parkowanie w centrum miejscowości bywa trudne w godzinach popołudniowych."
  },
  {
    question: "Czy oferujecie zupy rybne?",
    answer: "Tak, zupy rybne to stały element naszego menu. Gorąca zupa rybna to jeden z obowiązkowych punktów każdej wizyty nad morzem — szczególnie w chłodniejsze dni wczesnej wiosny i późnego lata."
  },
  {
    question: "Czy wędzona ryba jest zdrowa?",
    answer: "Tak, spożywana z umiarem wędzona ryba jest wartościowym elementem diety. Dostarcza kwasów omega-3, witaminy D, witaminy B12 i pełnowartościowego białka. Warto jednak pamiętać, że wędzenie wiąże się z pewną ilością soli oraz substancji powstających podczas spalania drewna — jak każdy produkt, najlepiej jeść ją jako część zróżnicowanej diety."
  },
  {
    question: "Gdzie mogę zostawić opinię o Waszej smażalni?",
    answer: "Najcenniejsze dla nas są opinie w Google oraz na Facebooku. Jeśli byłeś u nas i dobrze się bawiłeś — zostaw gwiazdki i krótki komentarz. To dla nas ogromne wsparcie i pomoc dla innych turystów planujących wizytę w Niechorzu."
  },
  {
    question: "Co zrobić, jeśli mam zastrzeżenia do jakości lub obsługi?",
    answer: "Zależy nam na każdym gościu. Jeśli coś nie spełniło Twoich oczekiwań, powiedz nam o tym bezpośrednio na miejscu lub napisz do nas na Facebooku. Traktujemy każdą uwagę poważnie."
  }
];

// Statically declared, authentic customer reviews for immediate, highly performant rendering
const STATIC_REVIEWS_DATA = {
  rating: 4.8,
  user_ratings_total: "190+",
  reviews: [
    {
      author_name: "Wiktor Blizniuk",
      rating: 5,
      relative_time_description: "",
      profile_photo_url: "",
      text: "Bardzo smaczna i świeża ryba, wszystko dobrze przygotowane. Duży wybór ryb — wędzonych oraz z pieca, każdy znajdzie coś dla siebie. Ceny zarówno za ryby, jak i piwo bardzo przystępne. Obsługa uprzejma i miła, atmosfera spokojna i przyjemna.",
      source: "Facebook"
    },
    {
      author_name: "Beata Kulińska",
      rating: 5,
      relative_time_description: "",
      profile_photo_url: "",
      text: "Ryby wędzone,smażone pyszne ,jakość i świeżość bardzo dobra ,starannie przygotowane z pasją i zaangażowaniem .\nMiła i przyjazna gościnna atmosfera ,warto tu zajrzeć a potem z przyjemnością wracać ,bo zostaje smaczne miłe wspomnienie .\nBrawo dla właścicieli za prawdziwą ,szczerą kuchnię. Beata Kulinska",
      source: "Google"
    },
    {
      author_name: "Joanna Przybylska",
      rating: 5,
      relative_time_description: "",
      profile_photo_url: "",
      text: "Rodzinna atmosfera, widać i czuć, że smażalnia jest od pokoleń! Właśrecele bardzo pomocni, doradza pomogą! Widać, że znają się na rzeczy. Obsługa przemiła i slużaca pomocą znająca się na rzeczy. Polecam smażalnia na każda kieszeń i na każdego smakosza ryb! Paprykarz przepyszny, gołabki z ryby w sosie pomidorowym pycha, i burger rybny pikabello, polecam z czystym sumieniem! Brak zdjęć bo zniknęło wszystko z talerzy. Czas oczekiwania jest naprawdę szybki, szybszy niż w nie jednym fast foodzie! Warto czekać!",
      source: "Google"
    },
    {
      author_name: "Anita Staszewska",
      rating: 5,
      relative_time_description: "",
      profile_photo_url: "",
      text: "Bardzo polecam “Livia” Smażalnia i wędzarnia ryb,szaszłyk “ryby u Ciszków” TRADYCJĄ OD POKOLEŃ… — świeże ryby, świetnie doprawione i bardzo smaczne. Fishburger naprawdę rewelacyjny, soczysty i dobrze skomponowany, a gołąbki rybne to coś wyjątkowego i wartego spróbowania. Wędzone ryby pachną i smakują jak prawdziwe domowe wyroby. Do tego miła obsługa i fajny nadmorski klimat. Zdecydowanie jedno z tych miejsc, do których chce się wracać podczas pobytu w Niechorzu.",
      source: "Google"
    }
  ]
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const [reviewsData] = useState(STATIC_REVIEWS_DATA);
  const loadingReviews = false;


  // Derive page and slug states based on pathname
  let currentPage: 'home' | 'blog' | 'menu' = 'home';
  let selectedArticleSlug: string | undefined = undefined;

  const decodedPath = decodeURIComponent(currentPath);
  if (decodedPath.startsWith('/blog/')) {
    currentPage = 'blog';
    selectedArticleSlug = decodedPath.substring('/blog/'.length);
  } else if (decodedPath === '/blog' || decodedPath === '/blog/') {
    currentPage = 'blog';
  } else if (decodedPath === '/menu' || decodedPath === '/menu/') {
    currentPage = 'menu';
  } else {
    currentPage = 'home';
  }

  // Unified navigation helper
  const navigateTo = (path: string, hash: string = '') => {
    window.history.pushState(null, '', path + hash);
    setCurrentPath(path);
    setCurrentHash(hash);
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const setSelectedArticleSlugLocal = (slug: string | undefined) => {
    if (slug) {
      navigateTo(`/blog/${slug}`);
    } else {
      navigateTo('/blog');
    }
  };

  const goBackToHome = () => {
    navigateTo('/');
  };

  // Sync back/forward clicks on URL path
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('popstate', handlePopState);

    // If initial load has a hash anchor on home route, scroll to it automatically
    if (currentPage === 'home' && currentHash) {
      setTimeout(() => {
        const element = document.querySelector(currentHash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen selection:bg-amber/30 selection:text-brown bg-bg">
      {/* --- Navigation --- */}
      <header className="fixed top-0 left-0 w-full z-50 bg-bg/90 backdrop-blur-md border-b-2 border-brown-light/10">
        <nav className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between" aria-label="Nawigacja główna">
          <button 
            type="button"
            onClick={() => navigateTo('/')} 
            className="flex items-center gap-3 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-amber/45 rounded-md px-2 py-1"
          >
            <Fish className="text-amber animate-pulse" size={28} />
            <span className="font-display text-2xl font-bold tracking-tight text-brown">Livia</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-widest text-text-muted">
            <button 
              type="button"
              onClick={() => navigateTo('/', '#nasze-ryby')} 
              className={`hover:text-amber transition-colors font-mono text-sm uppercase tracking-widest ${currentHash === '#nasze-ryby' ? 'text-amber' : 'text-text-muted'}`}
            >
              Nasze Ryby
            </button>
            <button 
              type="button"
              onClick={() => navigateTo('/menu')} 
              className={`hover:text-amber transition-colors font-mono text-sm uppercase tracking-widest ${currentPage === 'menu' ? 'text-amber font-extrabold border-b-2 border-amber' : 'text-text-muted'}`}
            >
              Pełne Menu
            </button>
            <button 
              type="button"
              onClick={() => navigateTo('/', '#lokalizacja')} 
              className={`hover:text-amber transition-colors font-mono text-sm uppercase tracking-widest ${currentHash === '#lokalizacja' ? 'text-amber' : 'text-text-muted'}`}
            >
              Dojazd
            </button>
            <button 
              type="button"
              onClick={() => navigateTo('/', '#opinie')} 
              className={`hover:text-amber transition-colors font-mono text-sm uppercase tracking-widest ${currentHash === '#opinie' ? 'text-amber' : 'text-text-muted'}`}
            >
              Goście
            </button>
            <button 
              type="button"
              onClick={() => navigateTo('/blog')} 
              className={`hover:text-amber transition-colors font-mono text-sm uppercase tracking-widest ${currentPage === 'blog' ? 'text-amber font-extrabold border-b-2 border-amber' : 'text-text-muted'}`}
            >
              Blog
            </button>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://www.facebook.com/profile.php?id=61576152080532" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-soft shadow-sm"
              id="fb-nav-link"
              title="Odwiedź Livia Niechorze na Facebooku"
              aria-label="Profil Livia Smażalnia i Wędzarnia Ryb na Facebooku"
            >
              <Facebook size={20} />
            </a>
            <button 
              id="open-menu-btn"
              type="button"
              className="md:hidden p-2 text-brown"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Otwórz menu nawigacji"
            >
              <MenuIcon />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-bg-dark text-text-light flex flex-col items-center justify-center p-8 will-change-transform"
          >
            <button 
              id="close-menu-btn"
              type="button"
              className="absolute top-8 right-8 p-2 text-text-light"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Zamknij menu nawigacji"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8 font-display text-4xl">
              <button 
                type="button"
                onClick={() => { 
                  navigateTo('/', '#nasze-ryby');
                  setMobileMenuOpen(false); 
                }}
                className={`font-display hover:text-amber transition-colors ${currentHash === '#nasze-ryby' ? 'text-amber' : 'text-text-light'}`}
              >
                Nasze Ryby
              </button>
              <button 
                type="button"
                onClick={() => { 
                  navigateTo('/menu');
                  setMobileMenuOpen(false); 
                }}
                className={`font-display hover:text-amber transition-colors ${currentPage === 'menu' ? 'text-amber' : 'text-text-light'}`}
              >
                Pełne Menu
              </button>
              <button 
                type="button"
                onClick={() => { 
                  navigateTo('/', '#lokalizacja');
                  setMobileMenuOpen(false); 
                }}
                className={`font-display hover:text-amber transition-colors ${currentHash === '#lokalizacja' ? 'text-amber' : 'text-text-light'}`}
              >
                Lokalizacja
              </button>
              <button 
                type="button"
                onClick={() => { 
                  navigateTo('/', '#opinie');
                  setMobileMenuOpen(false); 
                }}
                className={`font-display hover:text-amber transition-colors ${currentHash === '#opinie' ? 'text-amber' : 'text-text-light'}`}
              >
                Opinie
              </button>
              <button 
                type="button"
                onClick={() => { 
                  navigateTo('/blog');
                  setMobileMenuOpen(false); 
                }}
                className={`font-display hover:text-amber transition-colors ${currentPage === 'blog' ? 'text-amber' : 'text-text-light'}`}
              >
                Blog
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content" role="main">
        <h1 className="sr-only">Livia - Smażalnia Niechorze | Wędzarnia Niechorze | Ryby Niechorze</h1>
        
        {currentPage === 'blog' ? (
          <BlogPage 
            onBackToHome={goBackToHome} 
            selectedArticleSlug={selectedArticleSlug}
            setSelectedArticleSlug={setSelectedArticleSlugLocal}
          />
        ) : currentPage === 'menu' ? (
          <MenuPage 
            onBackToHome={goBackToHome}
          />
        ) : (
          <>
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
            className="font-mono text-amber tracking-[0.15em] mb-6 will-change-[transform,opacity]"
          >
            <span className="uppercase font-bold tracking-[0.3em] block mb-2">SMAŻALNIA I WĘDZARNIA RYB</span>
            <span className="text-brown italic normal-case tracking-normal opacity-80">Ryby u Ciszków tradycją od pokoleń...</span>
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="text-[clamp(2.5rem,8vw,7rem)] leading-none font-display mb-8 text-bg-dark will-change-[transform,opacity] font-bold"
          >
            Livia
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 will-change-opacity"
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
            className="flex flex-wrap justify-center gap-4 will-change-[transform,opacity]"
          >
            <a href="#/menu" title="Menu smażalni ryb Niechorze - karta dań" className="px-8 py-4 bg-brown text-text-light font-display text-lg rounded-sm hover:bg-brown-light transition-soft shadow-xl">
              Zobacz menu smażalni
            </a>
            <a 
              href="https://www.google.com/maps/dir//Parkowa+5,+72-350+Niechorze" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Znajdź nas w Niechorzu - nawigacja Google Maps"
              className="px-8 py-4 border-2 border-brown text-brown font-display text-lg rounded-sm hover:bg-brown hover:text-text-light transition-soft"
            >
              Znajdź nas w Niechorzu
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
          className="absolute top-24 right-4 md:top-1/4 md:right-[15%] stamp scale-[0.65] md:scale-100 origin-top-right z-10 will-change-[transform,opacity]"
        >
          ŚWIEŻO WĘDZONE
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <div className="w-1 h-12 bg-brown rounded-full" />
        </div>
      </section>

      {/* --- Section: Nasze Ryby --- */}
      <section id="nasze-ryby" className="relative py-24 bg-bg overflow-hidden section-visible-optimize">
        <div className="max-w-7xl mx-auto px-4">
          <header className="mb-20 text-center">
            <p className="font-mono text-amber uppercase tracking-widest mb-4">— Z NASZEJ KUCHNI</p>
            <h2 className="text-5xl md:text-6xl mb-6">Tradycja na Talerzu</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-text-muted text-lg italic">
                Nasze ryby wędzimy tradycyjną metodą na drewnie olchowym i bukowym. Poznaj nasze wyśmienite, rzemieślnicze wyroby własne.
              </p>
            </div>
            <div className="mt-8 flex justify-center opacity-30">
              <FishIcon />
            </div>
          </header>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {PRODUCTS.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] max-w-[380px] flex will-change-[transform,opacity]"
              >
                <div className="group flex flex-col bg-white rounded-[10px] overflow-hidden shadow-xl border-t-[3px] border-amber w-full transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-2xl will-change-transform">
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.alt} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      width={380}
                      height={288}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-[#FDF4E7]">
                    <div>
                      <h3 className="text-2xl mb-3 text-brown font-display">{item.title}</h3>
                      <p className="text-text-muted leading-relaxed font-body text-sm">{item.desc}</p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-brown/10 flex items-center justify-between">
                      <span className="font-mono text-[10px] text-amber font-bold tracking-tighter">SMAŻALNIA LIVIA</span>
                      <Fish size={16} className="text-teal opacity-30" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* --- Button: view full menu --- */}
          <div className="mt-20 text-center relative z-10">
            <button
              type="button"
              onClick={() => {
                navigateTo('/menu');
              }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-brown text-text-light font-display text-xl rounded-sm hover:bg-brown-light transition-soft shadow-2xl hover:scale-105 active:scale-95 cursor-pointer border-2 border-amber/40 hover:border-amber focus:outline-none focus:ring-4 focus:ring-amber/40 font-semibold"
              title="Wyświetl pełną kartę dań restauracji Livia"
            >
              <Fish size={24} className="text-amber animate-pulse" />
              Zobacz pełne menu
            </button>
            <p className="text-text-muted text-xs font-mono tracking-wider uppercase mt-4 opacity-75">
              Pełny asortyment: ryby smażone, z pieca, zupy i ryby wędzone
            </p>
          </div>
        </div>
      </section>

      {/* --- Location --- */}
      <section id="lokalizacja" className="relative py-24 bg-bg-dark text-text-light overflow-hidden section-visible-optimize">
        <div className="absolute inset-0 texture-wood opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 p-20 lantern-glow pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-mono text-amber-light uppercase tracking-widest mb-4">— GDZIE NAS ZNALEŹĆ</p>
              <h2 className="text-5xl mb-8 text-white">W samym sercu Niechorza</h2>
              
              <address className="not-italic space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brown rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-amber" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl mb-1">Adres:</h3>
                    <p className="text-text-light/70">Ul. Parkowa 5, 72-350 Niechorze</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brown rounded-full flex items-center justify-center shrink-0">
                    <Phone className="text-amber" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl mb-1">Telefon:</h3>
                    <p className="text-text-light/70">
                      <a href="tel:663854283" title="Zadzwoń do wędzarni ryb i smażalni" className="hover:text-amber transition-colors font-bold">663 854 283</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brown rounded-full flex items-center justify-center shrink-0">
                    <Clock className="text-amber" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl mb-1">Czynne:</h3>
                    <p className="text-text-light/70 text-lg">Codziennie od <time dateTime="09:00">9:00</time></p>
                    <div className="mt-4 p-4 bg-amber/10 border-l-2 border-amber rounded-r-md">
                      <p className="text-amber-light font-display text-lg mb-1">Gorąca ryba:</p>
                      <p className="text-text-light/80 text-sm font-mono uppercase tracking-wider">Codziennie: <time dateTime="14:00">14:00</time></p>
                      <p className="text-text-light/80 text-sm font-mono uppercase tracking-wider mt-1">W ścisłym sezonie: <time dateTime="14:00">14:00</time> i <time dateTime="17:00">17:00</time></p>
                    </div>
                  </div>
                </div>
              </address>

              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61576152080532" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-blue-600 rounded-sm hover:bg-blue-700 transition-colors font-mono text-sm uppercase tracking-wider"
                  title="Zobacz profil wędzarni i smażalni ryb Livia Niechorze na Facebooku"
                >
                  <Facebook size={20} />
                  Facebook
                </a>
                <a 
                  href="https://www.google.com/maps/dir//Parkowa+5,+72-350+Niechorze" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 border border-white/20 rounded-sm hover:bg-white/10 transition-colors font-mono text-sm uppercase tracking-wider"
                  title="Wyznacz trasę do naszej smażalni i wędzarni ryb w Niechorzu"
                >
                  <Navigation size={20} />
                  Wyznacz trasę
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
      <section id="opinie" className="py-24 bg-bg-section relative overflow-hidden section-visible-optimize">
        <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-10">
          <HookIcon />
        </div>
        
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12 border-b border-brown/10 pb-12">
            <p className="font-mono text-amber uppercase tracking-widest mb-4">— WASZYM ZDANIEM</p>
            <h2 className="text-5xl mb-6 text-brown">Wracacie do nas nie bez powodu</h2>
            
            {/* Google Rating Summary Banner */}
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 bg-white/65 backdrop-blur-md px-6 py-4 rounded-xl border border-brown/10 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="font-display text-4xl font-bold text-brown">{reviewsData?.rating || '4.8'}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className="fill-amber text-amber" size={18} />
                    ))}
                  </div>
                </div>
                <div className="h-px w-10 sm:h-8 sm:w-px bg-brown/15"></div>
                <p className="text-sm font-mono text-text-muted text-center sm:text-left">
                  Średnia ocena z Google i Facebook na podstawie <strong className="text-brown">{reviewsData?.user_ratings_total || '190+'} opinii</strong>
                </p>
              </div>


            </div>
          </div>

          {loadingReviews ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-10 h-10 border-4 border-amber border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-mono text-text-muted">Ładowanie opinii klientów...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {(reviewsData?.reviews || []).map((rev, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(index * 0.1, 0.4), duration: 0.5 }}
                  className="bg-white p-8 rounded-xl shadow-md border-t-4 relative flex flex-col justify-between"
                  style={{ borderColor: rev.source === 'Google' ? '#D4892A' : '#2E6B6B' }}
                >
                  <Quote className="absolute top-6 right-6 opacity-5 text-brown" size={56} />
                  
                  <div>
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="fill-amber text-amber" size={16} />
                      ))}
                    </div>
                    <p className="text-base italic mb-6 text-text relative z-10 font-serif leading-relaxed">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-brown/5 pt-4 mt-auto">
                    <div className="flex items-center gap-3">
                      {rev.profile_photo_url ? (
                        <img 
                          src={rev.profile_photo_url} 
                          alt={rev.author_name} 
                          className="w-10 h-10 rounded-full object-cover border border-brown/10" 
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-white text-base shadow-sm"
                          style={{ backgroundColor: rev.source === 'Google' ? '#D4892A' : '#2E6B6B' }}
                        >
                          {rev.author_name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-sm text-brown">{rev.author_name}</h3>
                        {rev.relative_time_description && (
                          <p className="text-[11px] font-mono text-text-muted">{rev.relative_time_description}</p>
                        )}
                      </div>
                    </div>
                    
                    <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded font-bold ${
                      rev.source === 'Google' 
                        ? 'bg-amber/10 text-brown' 
                        : 'bg-teal/10 text-teal'
                    }`}>
                      {rev.source === 'Google' ? 'Google' : 'Facebook'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Call to Action: Encourage Reviews with Target Keyword Prompting */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/40 border-2 border-dashed border-brown/25 rounded-2xl p-8 max-w-3xl mx-auto shadow-sm text-center relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brown text-white px-5 py-2 text-xs font-mono uppercase tracking-widest rounded-full shadow-md">
              Zostaw swoją opinię! ⭐
            </div>
            
            <h3 className="text-2xl mb-4 font-display font-bold text-brown mt-4">
              Byliście już naszymi gośćmi w Niechorzu?
            </h3>
            
            <p className="text-base text-text-muted mb-6 leading-relaxed max-w-xl mx-auto font-serif">
              Wrzucając recenzję, pomagasz innym turystom odkryć <strong className="text-brown">najlepszą smażalnię w Niechorzu</strong>! Napisz koniecznie, jak smakowały Ci nasze <strong className="text-brown">ryby</strong> smażone na miejscu, rzemieślnicza <strong className="text-brown">wędzarnia u Ciszków</strong> czy domowej roboty przetwory. Każdy komentarz ma dla nas wielkie znaczenie!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://maps.app.goo.gl/NZwZnNpTYM9v8EEc7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber text-white hover:bg-brown hover:text-white font-display font-medium transition-soft shadow-md rounded-lg text-sm uppercase tracking-wider"
              >
                <span>Napisz opinię na Google</span>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-6.887 4.114-4.694 0-8.503-3.809-8.503-8.503s3.809-8.503 8.503-8.503c2.28 0 4.213.82 5.717 2.275l3.22-3.219C19.14 1.86 16.035 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c6.887 0 12.24-5.48 12.24-12.24 0-.82-.082-1.639-.246-2.455H12.24z"/>
                </svg>
              </a>
              
              <a 
                href="https://www.facebook.com/profile.php?id=61576152080532&sk=reviews" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-brown text-brown hover:bg-brown hover:text-white font-display font-semibold transition-soft shadow-sm rounded-lg text-sm uppercase tracking-wider"
              >
                Opinie na Facebooku
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section id="faq" className="py-24 bg-bg relative overflow-hidden section-visible-optimize">
        <div className="absolute right-10 top-10 opacity-5 hidden lg:block transform -rotate-12 pointer-events-none">
          <FishIcon />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <header className="mb-16 text-center">
            <p className="font-mono text-amber uppercase tracking-widest mb-4">
              — MASZ PYTANIA?
            </p>
            <h2 className="text-4xl sm:text-5xl font-display font-medium text-brown mb-6">
              Często Zadawane Pytania (FAQ)
            </h2>
            <div className="max-w-xl mx-auto">
              <RopeDivider />
              <p className="text-text-muted text-base mt-6 italic">
                Przygotowaliśmy odpowiedzi na najczęściej zadawane pytania dotyczące naszej restauracji, wędzarni oraz dojazdu do Niechorza.
              </p>
            </div>
          </header>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className={`bg-white rounded-xl border border-brown/10 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md ${isOpen ? 'ring-2 ring-amber/40 border-amber/40' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-bg-section/10 transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-brown text-lg sm:text-xl pr-2 leading-snug">
                      {item.question}
                    </span>
                    <span className="shrink-0 w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center border border-brown/5 text-brown/70 group-hover:text-amber transition-all">
                      <ChevronDown 
                        size={18} 
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber' : ''}`} 
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-text/85 text-base leading-relaxed border-t border-brown/5 pt-4 bg-[#FCF9F5]/40">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Contact Box at Footer */}
          <div className="mt-16 text-center bg-[#FCF9F5] border border-brown/10 p-8 rounded-xl max-w-2xl mx-auto shadow-sm">
            <div className="flex items-center justify-center gap-2 text-amber mb-3">
              <HelpCircle size={24} />
              <p className="font-display text-lg text-brown font-semibold">Nie znalazłeś odpowiedzi na swoje pytanie?</p>
            </div>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              Napisz do nas — chętnie udzielimy wszelkich dodatkowych informacji tak szybko, jak to możliwe.
            </p>
            <a
              href="https://www.facebook.com/profile.php?id=61576152080532"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brown text-text-light hover:bg-brown-light text-xs font-mono font-bold uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-amber/40 rounded-sm shadow-md"
            >
              Napisz na Facebooku
            </a>
          </div>
        </div>
      </section>

            {/* Visually hidden SEO content */}
            <div className="sr-only">
              <h2>Smażalnia Niechorze - Najlepsze ryby nad morzem</h2>
              <p>Szukasz najlepszej smażalni w Niechorzu? Livia to miejsce, gdzie tradycja spotyka się ze smakiem. Nasza wędzarnia Niechorze oferuje świeżo wędzone ryby na drewnie olchowym i bukowym. Ryby u Ciszków to gwarancja jakości i tradycji od pokoleń. W ofercie: wędzone ryby Niechorze, dorsz, halibut, łosoś, sandacz oraz nasze słynne wyroby własne jak paprykarz i sałatki śledziowe. Zapraszamy do Niechorza na ulicę Parkową 5.</p>
            </div>
          </>
        )}
      </main>

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
                Pielęgnujemy tradycyjne smaki i dostarczamy to, co najlepsze 
                na Państwa stoły.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61576152080532" 
                  className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                  title="Odwiedź fanpage Livia Smażalnia i Wędzarnia Ryb na Facebooku"
                  aria-label="Profil Livia Smażalnia i Wędzarnia Ryb na Facebooku"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-amber-light uppercase tracking-widest text-sm mb-6">Nawigacja</h3>
              <ul className="space-y-3 text-text-light/60">
                <li>
                  <button 
                    type="button"
                    onClick={() => navigateTo('/')} 
                    className="hover:text-amber transition-colors text-left"
                  >
                    Strona Główna
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => navigateTo('/menu')} 
                    className="hover:text-amber transition-colors text-left"
                  >
                    Pelna Oferta (Menu)
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => navigateTo('/', '#lokalizacja')} 
                    className="hover:text-amber transition-colors text-left"
                  >
                    Jak dojechać
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => navigateTo('/', '#opinie')} 
                    className="hover:text-amber transition-colors text-left"
                  >
                    Wasze Opinie
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => navigateTo('/', '#faq')} 
                    className="hover:text-amber transition-colors text-left"
                  >
                    FAQ (Pytania i odpowiedzi)
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => navigateTo('/blog')} 
                    className={`hover:text-amber transition-colors text-left ${currentPage === 'blog' ? 'text-amber font-bold border-b border-amber pb-0.5' : ''}`}
                  >
                    Rybacka Kronika (Blog)
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-amber-light uppercase tracking-widest text-sm mb-6">Kontakt</h3>
              <address className="not-italic text-text-light/60 space-y-2">
                <p>Ul. Parkowa 5</p>
                <p>72-350 Niechorze</p>
                <p className="text-white font-bold pt-4">
                  <a href="tel:663854283" title="Zadzwoń do wędzarni ryb i smażalni" className="hover:text-amber transition-colors font-bold">663 854 283</a>
                </p>
              </address>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs text-text-light/30 font-mono">
              © {new Date().getFullYear()} Livia — Smażalnia i Wędzarnia Ryb Niechorze, ul. Parkowa 5, zachodniopomorskie. Wszystkie prawa zastrzeżone.
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
          <div className="flex gap-1 animate-waves will-change-transform">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-20 h-full border-t border-amber" />
            ))}
          </div>
        </div>
      </footer>

      {/* Floating CTA Mobile */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <a 
          href="tel:663854283"
          className="w-16 h-16 bg-amber text-white rounded-full shadow-2xl flex items-center justify-center animate-pulse"
          aria-label="Połączenie telefoniczne ze Smażalnią Livia - zadzwoń pod numer 663 854 283"
        >
          <Phone />
        </a>
      </div>
    </div>
  );
}
