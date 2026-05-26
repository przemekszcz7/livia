import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  BookOpen, 
  Share2, 
  ChevronRight,
  Fish,
  Facebook
} from 'lucide-react';
import { SmokeWisp, RopeDivider, AnchorIcon } from './NauticalDecorations';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: React.ReactNode;
  date: string;
  author: string;
  readTime: string;
  image: string;
  tags: string[];
}

interface BlogPageProps {
  onBackToHome: () => void;
  selectedArticleSlug?: string;
  setSelectedArticleSlug: (slug: string | undefined) => void;
}

export default function BlogPage({ onBackToHome, selectedArticleSlug, setSelectedArticleSlug }: BlogPageProps) {
  // Precompile our blog posts
  const INITIAL_POSTS: BlogPost[] = [
    {
      id: "1",
      title: "Jak wędzi się ryby? Tradycyjny proces wędzenia, który znamy od pokoleń",
      slug: "jak-wedzi-sie-ryby-tradycyjny-proces",
      excerpt: "Wędzenie ryb to jedna z najstarszych metod konserwacji i przyrządzania żywności na świecie. Nad Bałtykiem ta tradycja ma szczególne znaczenie — przez wieki była sposobem na przedłużenie trwałości połowu, dziś jest przede wszystkim sztuką kulinarną, która nadaje rybie niepowtarzalny smak i aromat.",
      date: "26 maja 2026",
      author: "Rodzina Ciszków",
      readTime: "5 min czytania",
      image: "https://i.ibb.co/TMM0Fzfk/wedzarnia.jpg",
      tags: ["Tradycja", "Wędzenie", "Ryby", "Niechorze"],
      content: (
        <article className="prose prose-stone max-w-none text-text">
          <p className="text-xl leading-relaxed text-text/90 italic border-l-4 border-amber pl-6 py-2 mb-8 font-subheading">
            Wędzenie ryb to jedna z najstarszych metod konserwacji i przyrządzania żywności na świecie. Nad Bałtykiem ta tradycja ma szczególne znaczenie — przez wieki była sposobem na przedłużenie trwałości połowu, dziś jest przede wszystkim sztuką kulinarną, która nadaje rybie niepowtarzalny smak i aromat.
          </p>

          <div className="relative my-8 rounded-lg overflow-hidden border border-brown/20 shadow-xl max-h-[450px]">
            <img 
              src="https://i.ibb.co/TMM0Fzfk/wedzarnia.jpg" 
              alt="nasza tradycyjna wędzarnia ryb niechorze - Livia u Ciszków" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-xs font-mono">
              Rzemieślnicza wędzarnia u Ciszków (Livia) - tradycyjne wędzenie na drewnie olchowym i bukowym
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4 flex items-center gap-3">
            <span className="text-amber">1.</span> Wybór ryby — wszystko zaczyna się tu
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Dobra wędzonka zaczyna się od dobrej ryby. Do wędzenia najlepiej nadają się tłuste gatunki — <strong>makrela, śledź, łosoś, węgorz i szprot</strong>. Tłuszcz w mięsie pochłania dym, co przekłada się bezpośrednio na głębię smaku i odpowiednią soczystość po wędzeniu. Chuda ryba, choć też można ją wędzić, łatwo wysycha i traci na jakości.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4 flex items-center gap-3">
            <span className="text-amber">2.</span> Solenie — etap, którego nie można pominąć
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Zanim ryba trafi do wędzarni, musi przejść przez solenie. Sól wyciąga nadmiar wody z mięsa, konserwuje je oraz — co równie ważne — wzmacnia smak gotowego produktu.
            </p>
            <p className="leading-relaxed">
              Solenie może odbywać się na dwa sposoby:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Solenie na sucho</strong> polega na natarciu ryby solą i odstawieniu jej na kilka godzin.</li>
              <li><strong>Solanka</strong> to kąpiel w roztworze wody i soli — ryba leży w niej od kilku godzin do całej doby, zależnie od wielkości i gatunku.</li>
            </ul>
            <p className="leading-relaxed">
              Po soleniu rybę dokładnie się opłukuje i — <em>i to bardzo ważny krok</em> — <strong>pozostawia do obsuszenia</strong>. Sucha powierzchnia skóry to warunek konieczny dobrego wędzenia. Wilgotna ryba zamiast przyjąć dym, zaczyna się parzyć, co daje zupełnie inny, gorszy efekt.
            </p>
          </div>

          <div className="my-10 p-6 bg-amber-light/10 border-l-4 border-amber rounded-r-md">
            <h4 className="font-mono text-xs uppercase tracking-wider text-brown font-bold mb-1">CIEKAWOSTKA WĘDZARNICZA</h4>
            <p className="text-sm italic text-brown-light leading-relaxed">
              Doświadczony wędzarz wie, że perfekcyjnie obsuszona ryba ma w dotyku fakturę przypominającą pergamin. Dopiero taki stan gwarantuje, że złocisty dym idealnie osiądzie na skórce, nadając jej lśniącą barwę.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4 flex items-center gap-3">
            <span className="text-amber">3.</span> Drewno — serce wędzarni
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Aromat wędzonki zależy w ogromnej mierze od rodzaju użytego drewna. Do wędzenia ryb najlepiej sprawdzają się drewna liściaste — <strong>olcha, buk, jabłoń, wiśnia</strong>. Olcha jest klasycznym wyborem nad Bałtykiem: daje delikatny, lekko słodkawy dym, który nie przytłacza delikatnego smaku ryby.
            </p>
            <p className="leading-relaxed">
              Drewna iglastego — sosny, świerku — <strong>absolutnie się nie używa</strong>. Żywica, która się w nim znajduje, wytwarza podczas spalania substancje nadające rybie gorzki, nieprzyjemny smak.
            </p>
            <p className="leading-relaxed">
              Drewno powinno być suche, ale nie przesuszone. Używa się najczęściej wiórów lub małych kawałków, które tlą się powoli, wytwarzając gęsty, aromatyczny dym.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4 flex items-center gap-3">
            <span className="text-amber">4.</span> Wędzenie na zimno i na gorąco — dwie zupełnie różne metody
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              To rozróżnienie jest fundamentalne i często mylone przez osoby niezwiązane z tą tradycją:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="p-5 border-2 border-dashed border-teal/20 rounded bg-white/40">
                <h3 className="font-display font-bold text-teal text-lg mb-2">Wędzenie na zimno</h3>
                <p className="text-sm leading-relaxed">
                  Odbywa się w temperaturze nieprzekraczającej 30°C i trwa długo — od kilkunastu godzin do nawet kilku dni. Ryba zachowuje surową strukturę mięsa, jest sprężysta, intensywnie aromatyczna i ma długi termin przydatności. Klasyczny przykład to wędzony łosoś w plasterkach.
                </p>
              </div>
              <div className="p-5 border-2 border-dashed border-amber/20 rounded bg-white/40">
                <h3 className="font-display font-bold text-amber text-lg mb-2">Wędzenie na gorąco</h3>
                <p className="text-sm leading-relaxed">
                  To temperatura między 60 a 90°C i czas liczony w godzinach, czasem nawet w minutach przy małych rybach. Ryba jest po tym procesie w pełni ugotowana, soczysta, z delikatnie złocistą skórką. Tak właśnie wędzi się makrele, szproty czy śledzie, które znamy z nadmorskich wędzarni.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4 flex items-center gap-3">
            <span className="text-amber">5.</span> Czas i cierpliwość
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Nie ma jednej odpowiedzi na pytanie „jak długo wędzić rybę” — to zależy od gatunku, wielkości, metody i rodzaju drewna. Szprot na gorąco może być gotowy po 40 minutach. Węgorz wędzony na zimno potrzebuje nawet dwóch dni.
            </p>
            <p className="leading-relaxed">
              Doświadczony wędzarz rozpoznaje gotowość po <strong>kolorze skóry, zapachu dymu i sprężystości mięsa</strong>. To wiedza, której nie zastąpi żaden timer — przychodzi z latami praktyki i setkami partii ryb.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4 flex items-center gap-3">
            <span className="text-amber">6.</span> Dlaczego wędzonka z wędzarni smakuje inaczej
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Kupując wędzoną rybę w markecie, często trafia się na produkt aromatyzowany tzw. „dymem w płynie” — substancją chemiczną naśladującą zapach wędzenia. Efekt jest podobny wizualnie, ale zupełnie inny w smaku i pozbawiony tej głębi, którą daje prawdziwy dym z drewna.
            </p>
            <p className="leading-relaxed font-bold">
              W tradycyjnej wędzarni ryba przez godziny powoli przesiąka dymem — i to czuć na każdym kęsie.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t-2 border-brown/10 text-center bg-bg-section/30 p-8 rounded-lg border-2 border-brown/5">
            <p className="font-display text-xl text-brown mb-4 font-semibold">
              W Livii wędzimy ryby tak, jak robiło się to tu od zawsze — na drewnie, z cierpliwością i szacunkiem do surowca.
            </p>
            <p className="font-display text-lg text-amber font-medium">
              Zapraszamy do Niechorza, ulica Parkowa 5.
            </p>
          </div>
        </article>
      ),
    },
    {
      id: "2",
      title: "Co zwiedzić w Niechorzu? Przewodnik po najpiękniejszych miejscach",
      slug: "co-zwiedzic-w-niechorzu-przewodnik",
      excerpt: "Niechorze to niewielka miejscowość na zachodniopomorskim wybrzeżu, która każdego lata przyciąga tysiące turystów. I nic dziwnego — trudno znaleźć nad polskim morzem miejsce, które na tak małej przestrzeni oferuje tyle różnorodnych atrakcji. Oto co warto zobaczyć i zrobić podczas wizyty w Niechorzu.",
      date: "12 maja 2026",
      author: "Odkryj Niechorze",
      readTime: "4 min czytania",
      image: "https://i.ibb.co/h1WJdCbh/witryna.jpg",
      tags: ["Atrakcje", "Przewodnik", "Niechorze", "Zwiedzanie"],
      content: (
        <article className="prose prose-stone max-w-none text-text">
          <p className="text-xl leading-relaxed text-text/90 italic border-l-4 border-amber pl-6 py-2 mb-8 font-subheading">
            Niechorze to niewielka miejscowość na zachodniopomorskim wybrzeżu, która każdego lata przyciąga tysiące turystów. I nic dziwnego — trudno znaleźć nad polskim morzem miejsce, które na tak małej przestrzeni oferuje tyle różnorodnych atrakcji. Oto co warto zobaczyć i zrobić podczas wizyty w Niechorzu.
          </p>

          <div className="relative my-8 rounded-lg overflow-hidden border border-brown/20 shadow-xl max-h-[450px]">
            <img 
              src="https://i.ibb.co/h1WJdCbh/witryna.jpg" 
              alt="witryna sklepowa SMAŻALNIA LIVIA Niechorze" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-xs font-mono">
              Szeroka oferta świeżych wyrobów u Ciszków (Livia) - idealna po dniu pełnym zwiedzania
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4 flex items-center gap-3">
            <span className="text-amber">1.</span> Latarnia morska — ikona Niechorza
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Trudno wyobrazić sobie Niechorze bez latarni morskiej. Ta ceglana budowla, wzniesiona w latach 1863–1866, góruje nad okolicą na wysokości ponad 45 metrów nad poziomem morza. Jest jedną z najwyżej położonych latarni na polskim wybrzeżu i do dziś pełni swoją nawigacyjną funkcję.
            </p>
            <p className="leading-relaxed">
              Latarnia jest udostępniona dla turystów — warto wspiąć się na jej szczyt, skąd roztacza się zapierający dech widok na Bałtyk, Jezioro Liwia Łuża i okoliczne klify. W sezonie letnim przy latarni działa małe muzeum poświęcone historii nawigacji i samej budowli.
            </p>
            <p className="leading-relaxed italic">
              <strong>Ciekawostka:</strong> latarnia została poważnie uszkodzona w 1945 roku i odbudowana trzy lata później. Jej charakterystyczna sylwetka stała się symbolem całej miejscowości.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4 flex items-center gap-3">
            <span className="text-amber">2.</span> Klif i ścieżka nadmorska
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Niechorze leży na klifowym odcinku wybrzeża, co sprawia, że spacer wzdłuż brzegu to coś zupełnie innego niż typowy nadmorski deptak. Ścieżka biegnąca krawędzią klifu oferuje widoki na otwarte morze z kilkunastometrowej wysokości — szczególnie efektowne podczas silniejszego wiatru, kiedy fale rozbijają się o podnóże skarpy.
            </p>
            <p className="leading-relaxed">
              Klif jest też miejscem obserwacji przyrodniczych. Na zboczach gniazdują ptaki morskie, a przy odrobinie szczęścia można stąd wypatrzeć foki szare odpoczywające na plaży lub skałach — w ostatnich latach pojawiają się tu coraz częściej.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4 flex items-center gap-3">
            <span className="text-amber">3.</span> Jezioro Liwia Łuża — cisza po drugiej stronie
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Niechorze leży na wąskim pasie lądu między Bałtykiem a Jeziorem Liwia Łuża. To duże, płytkie jezioro przybrzeżne otoczone trzcinowiskami i lasem jest rezerwatem przyrody — żyją tu bobry, wydry, liczne gatunki kaczek i czapli.
            </p>
            <p className="leading-relaxed">
              Rowerowa lub piesza trasa wokół jeziora to świetna alternatywa dla zatłoczonej plaży. Cisza, ptaki, odbicia drzew w wodzie — zupełnie inny klimat niż po stronie morskiej, choć dzieli je zaledwie kilkasat metrów.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4 flex items-center gap-3">
            <span className="text-amber">4.</span> Plaża — szeroka i dzika
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Plaża w Niechorzu należy do najszerszych na Wybrzeżu Zachodnim. Biały, drobny piasek, stosunkowo małe zatłoczenie w porównaniu z Międzyzdrojami czy Kołobrzegem i czysta woda sprawiają, że to jedno z bardziej cenionych kąpielisk w regionie. W sezonie działa ratownik, są wyznaczone strefy dla dzieci.
            </p>
            <p className="leading-relaxed">
              Warto wybrać się na plażę o wschodzie lub zachodzie słońca — widoki są wtedy absolutnie wyjątkowe, a tłumów żadnych.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4 flex items-center gap-3">
            <span className="text-amber">5.</span> Kolejka wąskotorowa — podróż w czasie
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Przez Niechorze przebiega jedna z najstarszych linii kolejki wąskotorowej w Polsce, działająca nieprzerwanie od 1896 roku. Rewalska Kolej Wąskotorowa łączy Niechorze z Trzęsaczem, Rewałem i Pobierowym — trasa liczy kilkanaście kilometrów i wiedzie przez lasy, łąki i wioski.
            </p>
            <p className="leading-relaxed">
              Przejazd kolejką to nie tylko wygodny sposób przemieszczania się — to przede wszystkim atrakcja sama w sobie. Powolne tempo, historyczne wagony i widoki za oknem robią wrażenie zarówno na dzieciach, jak i dorosłych. W sezonie letnim kolejka bywa bardzo oblegana, warto kupić bilety wcześniej.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4 flex items-center gap-3">
            <span className="text-amber">6.</span> Ruiny kościoła w Trzęsaczu — 15 minut stąd
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              To nie jest ściśle Niechorze, ale pominąć tego miejsca nie wypada. Trzęsacz leży kilka kilometrów na zachód i można tam dojechać właśnie kolejką wąskotorową lub rowerem. Stoi tam — a raczej wisi nad klifem — ostatnia ocalała ściana gotyckiego kościoła z XIV wieku.
            </p>
            <p className="leading-relaxed">
              Morze przez stulecia zjadało klif, na którym stał kościół. Jeszcze w XIX wieku budowla była w całości na lądzie, dziś pozostał jeden fragment muru, dramatycznie pochylony nad przepaścią. To jedno z najbardziej fotografowanych miejsc na polskim wybrzeżu — i słusznie.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4 flex items-center gap-3">
            <span className="text-amber">7.</span> Muzeum Rybołówstwa Morskiego
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Dla tych, którzy chcą lepiej zrozumieć historię tego miejsca i tradycje rybackie Wybrzeża Zachodniego, obowiązkowym przystankiem jest Muzeum Rybołówstwa Morskiego. Eksponaty obejmują stare narzędzia połowów, modele kutrów, mapy i fotografie dokumentujące życie rybackich społeczności Niechorza i okolic przez ostatnie stulecia.
            </p>
            <p className="leading-relaxed">
              Muzeum jest stosunkowo kameralne, ale dobrze zrobione — zwiedzanie zajmuje godzinę, dwie, i zostaje w pamięci na dłużej niż większość większych ekspozycji.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4 flex items-center gap-3">
            <span className="text-amber">8.</span> Kiedy przyjechać
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Niechorze jest piękne przez cały rok, ale każda pora ma swój charakter. Lipiec i sierpień to pełen sezon — plaże, kolejka, otwarte wszystkie restauracje i atrakcje, ale też największe tłumy. Czerwiec i wrzesień to kompromis: pogoda wciąż dopisuje, a miejscowość oddycha spokojniej.
            </p>
            <p className="leading-relaxed">
              Poza sezonem Niechorze jest niemal wyludnione — klif, morze i latarnia dla siebie, cisza absolutna. Kto szuka odpoczynku od zgiełku, powinien rozważyć właśnie taką wizytę.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t-2 border-brown/10 text-center bg-bg-section/30 p-8 rounded-lg border-2 border-brown/5">
            <p className="font-display text-xl text-brown mb-4 font-semibold">
              Po całym dniu zwiedzania najlepiej zakończyć wieczór przy świeżo wędzonej lub smażonej rybie.
            </p>
            <p className="font-display text-lg text-amber font-medium">
              W Livii jesteśmy otwarci przez cały sezon — zapraszamy.
            </p>
          </div>
        </article>
      )
    },
    {
      id: "3",
      title: "Śledź bałtycki — król nadmorskiego stołu i jego właściwości",
      slug: "sledz-baltycki-krol-nadmorskiego-stolu-i-jego-wlasciwosci",
      excerpt: "Trudno wyobrazić sobie polskie wybrzeże bez śledzia. Ta niepozorna, srebrzysta ryba towarzyszy nadmorskim stołom od wieków — solona, wędzona, marynowana, smażona.",
      date: "04 maja 2026",
      author: "Rodzina Ciszków",
      readTime: "5 min czytania",
      image: "https://i.ibb.co/VY1D0bZj/sledz.jpg",
      tags: ["Śledzie", "Kuchnia", "Zdrowie", "Tradycja"],
      content: (
        <article className="prose prose-stone max-w-none text-text">
          <p className="text-xl leading-relaxed text-text/90 italic border-l-4 border-amber pl-6 py-2 mb-8 font-subheading">
            Trudno wyobrazić sobie polskie wybrzeże bez śledzia. Ta niepozorna, srebrzysta ryba towarzyszy nadmorskim stołom od wieków — solona, wędzona, marynowana, smażona. Jest symbolem bałtyckiej kuchni, źródłem utrzymania pokoleń rybaków i jedną z najbardziej wartościowych odżywczo ryb dostępnych w Polsce. Warto poznać ją bliżej.
          </p>

          <div className="relative my-8 rounded-lg overflow-hidden border border-brown/20 shadow-xl max-h-[450px]">
            <img 
              src="https://i.ibb.co/VY1D0bZj/sledz.jpg" 
              alt="domowe śledzie wędzarnia Niechorze" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-xs font-mono">
              Domowe marynaty i tradycyjne sposoby przygotowania śledzi w Livii
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4">
            Kim jest śledź bałtycki?
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Śledź bałtycki to podgatunek śledzia atlantyckiego, który od tysięcy lat zamieszkuje wody Morza Bałtyckiego. Jest mniejszy od swojego atlantyckiego kuzyna — zazwyczaj osiąga od 20 do 35 centymetrów długości — ale to, czego brakuje mu w rozmiarze, nadrabia intensywnością smaku i wyjątkowym składem odżywczym.
            </p>
            <p className="leading-relaxed">
              Bałtyk jest morzem o niskim zasoleniu, co wpływa bezpośrednio na charakter żyjących w nim ryb. Śledź bałtycki ma nieco delikatniejsze mięso niż atlantycki, inaczej reaguje na solenie i wędzenie, a jego smak jest bardziej subtelny. Rybacy i kucharze znający obie odmiany potrafią je rozróżnić bez wahania.
            </p>
            <p className="leading-relaxed">
              Przez stulecia śledź był rybą biedoty — tani, łatwo dostępny, możliwy do długiego przechowywania po zasoleniu. Dziś przeżywa zasłużony renesans i coraz częściej trafia do menu dobrych restauracji jako produkt regionalny o wyrazistym charakterze.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4">
            Właściwości odżywcze — dlaczego warto go jeść
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Śledź bałtycki to jedna z najbardziej wartościowych ryb pod względem składu odżywczego. Regularne spożywanie go przynosi organizmowi wymierne korzyści.
            </p>

            <div className="bg-bg-section border border-brown/10 p-6 rounded-lg space-y-4">
              <div>
                <h3 className="font-display font-bold text-lg text-brown mb-1">Kwasy omega-3</h3>
                <p className="leading-relaxed text-sm">
                  To największy skarb śledzia. Jest on jednym z najlepszych naturalnych źródeł kwasów tłuszczowych omega-3 — EPA i DHA — które mają udowodniony wpływ na zdrowie układu sercowo-naczyniowego. Obniżają poziom trójglicerydów, zmniejszają ryzyko miażdżycy i wspierają pracę serca. Porcja śledzia dostarcza często więcej omega-3 niż popularne suplementy diety.
                </p>
                <p className="leading-relaxed text-sm mt-1 italic">
                  Co ważne, kwasy omega-3 ze śledzia są znacznie lepiej przyswajalne przez organizm niż te pochodzące z roślin — np. z siemienia lnianego czy orzechów włoskich.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-brown mb-1">Witamina D</h3>
                <p className="leading-relaxed text-sm">
                  Polska należy do krajów z chronicznym niedoborem witaminy D w populacji — słońca po prostu jest za mało przez większą część roku. Śledź bałtycki jest jednym z nielicznych produktów spożywczych, który dostarcza jej w znaczących ilościach. Regularne jedzenie śledzia — szczególnie poza sezonem letnim — może realnie poprawić poziom tej witaminy w organizmie.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-brown mb-1">Witamina B12</h3>
                <p className="leading-relaxed text-sm">
                  Śledź dostarcza witaminy B12 w ilościach, które z łatwością pokrywają dzienne zapotrzebowanie. Ta witamina jest kluczowa dla prawidłowego funkcjonowania układu nerwowego, produkcji czerwonych krwinek i metabolizmu energii. Jej niedobór objawia się zmęczeniem, problemami z koncentracją i anemią.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-brown mb-1">Białko i minerały</h3>
                <p className="leading-relaxed text-sm">
                  Mięso śledzia jest bogate w pełnowartościowe białko — zawiera wszystkie niezbędne aminokwasy egzogenne. Dostarcza też selenu, jodu, fosforu i potasu. Jod jest szczególnie ważny dla prawidłowej pracy tarczycy, a jego naturalne źródła w diecie Polaków są ograniczone.
                </p>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-brown mb-1">Stosunkowo mało kalorii</h3>
                <p className="leading-relaxed text-sm">
                  Pomimo wysokiej zawartości tłuszczu śledź jest rybą o umiarkowanej kaloryczności — około 160–200 kcal na 100 gramów w zależności od sposobu przyrządzenia. Tłuszcz śledzia to jednak tłuszcz, który odżywia, a nie obciąża.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4">
            Śledź a ekologia Bałtyku
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Nie sopsób pisać o śledziu bałtyckim bez wspomnienia o tym, co dzieje się z nim w Bałtyku. Populacja śledzia w Morzu Bałtyckim zmniejszyła się w ostatnich dekadach znacząco — naukowcy wskazują na przegrzewanie wód, eutrofizację i nadmierne połowy jako główne przyczyny.
            </p>
            <p className="leading-relaxed">
              Unia Europejska wprowadza kwoty połowów, a rybacy z Wybrzeża Zachodniego odczuwają ograniczenia coraz bardziej. To sprawia, że śledź bałtycki staje się produktem coraz bardziej sezonowym i regionalnym — czymś, co warto doceniać, kiedy jest dostępny, i zamawiać świadomie.
            </p>
            <p className="leading-relaxed">
              Kupując śledzia u lokalnych rybaków lub w tradycyjnych smażalniach zaopatrujących się bezpośrednio z kutrów, wspieramy zarówno lokalne rybołówstwo, jak i zrównoważone podejście do zasobów morskich.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4">
            Jak się go przyrządza — tradycja i różnorodność
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Śledź bałtycki jest wdzięcznym surowcem kulinarnym — znosi wiele metod obróbki i w każdej z nich smakuje inaczej.
            </p>
            
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Solony</strong> to klasyka klas. Śledź w beczce, zalewany solanką, dojrzewający przez tygodnie — to produkt o intensywnym, wyrazistym smaku, który stanowi bazę do dziesiątek polskich potraw. Śledź w oleju, w śmietanie, z cebulą, z jabłkiem, po grecku, rollmops — wszystkie zaczynają się od solenia.
              </li>
              <li>
                <strong>Wędzony</strong> to zupełnie inna odsłona tej samej ryby. Dym z olchy lub buku nadaje mu głębię i aromat nie do podrobienia. Wędzony śledź je się na ciepło, zaraz po wyjęciu z wędzarni, albo na zimno jako przekąskę. W obu przypadkach smakuje inaczej niż cokolwiek kupionego w markecie.
              </li>
              <li>
                <strong>Smażony</strong> to opcja dla tych, którzy preferują prostotę. Obtoczony w mące i usmażony na złoto, podany z cytryną i pieczywem — trudno o prostszy i smaczniejszy nadmorski posiłek.
              </li>
              <li>
                <strong>Marynowany</strong> w occie z cebulą i przyprawami to wariant, który polskie stoły wigilijne znają doskonale. Kwaśny, odświeżający, idealny jako przystawka lub dodatek.
              </li>
            </ul>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4">
            Śledź w polskiej kulturze i tradycji
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Śledź zajmuje wyjątkowe miejsce w polskiej kulturze kulinarnej — szczególnie tej związanej z morzem i postem. Przez stulecia, w piątki i dni postne, był rybą, na którą mogły sobie pozwolić nawet najuboższe rodziny. Stąd w polszczyźnie tyle powiedzeń i idiomów z jego udziałem.
            </p>
            <p className="leading-relaxed">
              Na Wybrzeżu Zachodnim śledź to nie tylko jedzenie — to część tożsamości miejsca. Kutry wychodzące na połów przed świtem, skrzynie wyładowywane w porcie, wędzarnie pracujące od rana — to obrazy, które dla mieszkańców tych okolic są czymś codziennym i oczywistym. Dla turystów przyjeżdżających znad Wisły — niezmiennie fascynujące.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-brown mt-10 mb-4">
            Jak wybrać dobrego śledzia
          </h2>
          <div className="space-y-4 mb-8">
            <p className="leading-relaxed">
              Kupując świeżego śledzia — czy to na targu rybnym, z kutra, czy w smażalni — warto wiedzieć, na co zwrócić uwagę. Świeża ryba ma błyszczące, wypukłe oczy, jasnoczerwoną krew pod skrzelami, sprężyste mięso, które wraca do kształtu po naciśnięciu palcem, i zapach morza — nie ryby. Matowe oczy, szare skrzela i ostry zapach to sygnały, że ryba nie jest już pierwszej świeżości.
            </p>
            <p className="leading-relaxed">
              Dobry śledź wędzony ma złocistobrązową, lśniącą skórkę i intensywny, ale nie przytłaczający aromat dymu. Mięso po rozerwaniu jest soczyste, nie suche i nie papkowate.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t-2 border-brown/10 text-center bg-bg-section/30 p-8 rounded-lg border-2 border-brown/5">
            <p className="font-display text-xl text-brown mb-4 font-semibold">
              W Livii śledź bałtycki to jeden z filarów naszego menu.
            </p>
            <p className="font-display text-lg text-amber font-medium">
              Zapraszamy do Niechorza, żeby spróbować go w najlepszym możliwym wydaniu.
            </p>
          </div>
        </article>
      )
    }
  ];

  const activeArticle = INITIAL_POSTS.find(post => post.slug === selectedArticleSlug);

  // Smooth scroll to top on change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedArticleSlug]);

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      alert('Skopiowano link do schowka!');
    }
  };

  return (
    <div className="min-h-screen bg-bg/95 md:pt-28 pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* --- Top breadcrumb/nav bar --- */}
        <div className="flex items-center justify-between border-b border-brown/10 pb-6 mb-8">
          <button 
            onClick={activeArticle ? () => setSelectedArticleSlug(undefined) : onBackToHome}
            className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-brown hover:text-amber transition-colors outline-none focus:ring-2 focus:ring-amber/50 rounded px-2 py-1"
          >
            <ArrowLeft size={16} />
            <span>{activeArticle ? "Powrót do bloga" : "Powrót na stronę główną"}</span>
          </button>
          
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <span className="uppercase tracking-widest font-bold">KRONIKA RYBACKA</span>
            <span className="w-1.5 h-1.5 bg-amber rounded-full" />
            <span className="uppercase">LIVIA NIECHORZE</span>
          </div>
        </div>

        {/* --- ARTICLE READER VIEW --- */}
        {activeArticle ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 border border-brown-light/10 p-6 md:p-12 rounded-sm shadow-sm relative overflow-hidden"
          >
            {/* Wisp of smoke illustration strictly in context of smoking topic */}
            <div className="absolute right-8 top-12 opacity-5 pointer-events-none">
              <SmokeWisp />
            </div>

            {/* Article Header Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-text-muted uppercase tracking-wider mb-6">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-amber" />
                <span>{activeArticle.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-amber" />
                <span>{activeArticle.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-amber" />
                <span>{activeArticle.readTime}</span>
              </div>
            </div>

            {/* Article title */}
            <h1 className="text-3xl md:text-5xl font-display font-black leading-tight text-text mb-8">
              {activeArticle.title}
            </h1>

            {/* Aesthetic nautical separator */}
            <div className="flex justify-center items-center gap-4 my-8">
              <span className="h-[2px] w-12 bg-brown/20" />
              <Fish className="text-amber" size={20} />
              <span className="h-[2px] w-12 bg-brown/20" />
            </div>

            {/* Main content */}
            {activeArticle.content}

            {/* Article Footer & Tags */}
            <div className="mt-12 pt-8 border-t border-brown/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex flex-wrap gap-2">
                {activeArticle.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 bg-brown/5 text-brown text-xs font-mono rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share actions */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-text-muted uppercase tracking-wider">Poleć ten wpis:</span>
                <button 
                  onClick={() => handleShare(activeArticle)}
                  className="p-2 border border-brown/20 hover:border-amber hover:text-amber rounded-full transition-colors"
                  title="Skopiuj odnośnik"
                  aria-label="Udostępnij artykuł"
                >
                  <Share2 size={16} />
                </button>
                <a 
                  href="https://www.facebook.com/profile.php?id=61576152080532" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 border border-brown/20 hover:border-blue-600 hover:text-blue-600 rounded-full transition-colors"
                  title="Udostępnij na Facebooku"
                  aria-label="Przejdź do naszego profilu"
                >
                  <Facebook size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          /* --- BLOG LIST VIEW --- */
          <div>
            <div className="text-center mb-16">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-block p-2 bg-amber-light/10 text-amber rounded-full mb-4"
              >
                <BookOpen size={28} />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-bg-dark mb-4">
                Rybacka Kronika u Ciszków
              </h2>
              <p className="max-w-xl mx-auto text-text-muted font-subheading leading-relaxed">
                Tradycja, tajemnice wędzenia ryb nad Bałtykiem, rodzinne przepisy i morska codzienność Niechorza. Zapraszamy do czytania.
              </p>
            </div>

            {/* Featured Post (First one) */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-brown-light/10 rounded-sm shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-12 mb-12 hover:shadow-lg transition-shadow group"
            >
              <div className="md:col-span-5 h-64 md:h-auto relative overflow-hidden">
                <img 
                  src={INITIAL_POSTS[0].image} 
                  alt={INITIAL_POSTS[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-amber text-white font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-sm shadow-md">
                  Wyróżnione
                </span>
              </div>
              <div className="md:col-span-7 p-6 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-mono text-text-muted uppercase mb-4">
                    <span>{INITIAL_POSTS[0].date}</span>
                    <span className="w-1.5 h-1.5 bg-amber rounded-full" />
                    <span>{INITIAL_POSTS[0].readTime}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold leading-tight group-hover:text-amber transition-colors mb-4">
                    <button 
                      onClick={() => setSelectedArticleSlug(INITIAL_POSTS[0].slug)}
                      className="text-left font-bold"
                    >
                      {INITIAL_POSTS[0].title}
                    </button>
                  </h3>
                  <p className="text-sm line-clamp-3 text-text-muted leading-relaxed mb-6 font-body">
                    {INITIAL_POSTS[0].excerpt}
                  </p>
                </div>
                <div>
                  <button 
                    onClick={() => setSelectedArticleSlug(INITIAL_POSTS[0].slug)}
                    className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-brown group-hover:text-amber transition-colors font-bold"
                  >
                    <span>Czytaj cały artykuł</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Grid of other posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {INITIAL_POSTS.slice(1).map((post, idx) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (idx + 2) }}
                  className="bg-white border border-brown-light/10 rounded-sm shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
                >
                  <div>
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs font-mono text-text-muted uppercase mb-3">
                        <span>{post.date}</span>
                        <span className="w-1.5 h-1.5 bg-amber rounded-full" />
                        <span>{post.readTime}</span>
                      </div>
                      <h4 className="text-xl font-display font-bold leading-tight group-hover:text-amber transition-colors mb-3">
                        <button 
                          onClick={() => setSelectedArticleSlug(post.slug)}
                          className="text-left font-bold"
                        >
                          {post.title}
                        </button>
                      </h4>
                      <p className="text-sm line-clamp-3 text-text-muted leading-relaxed font-body">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2">
                    <button 
                      onClick={() => setSelectedArticleSlug(post.slug)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-brown group-hover:text-amber transition-colors font-bold"
                    >
                      <span>Czytaj więcej</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Traditional Stamp Footer Decoration */}
            <div className="flex justify-center mt-16 pointer-events-none select-none">
              <div className="stamp font-bold opacity-80">
                Pielęgnowane od pokoleń
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
