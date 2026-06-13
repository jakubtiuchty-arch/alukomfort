// Dane produktów — dokładnie wg referencji (polski tekst, tabelki, kolory RAL, warianty)

const COLORS_BASE = [
  { name: 'RAL 7016', sub: 'Struktura', hex: '#2c3033' },
  { name: 'RAL 9005', sub: 'Struktura', hex: '#0c0c0c' },
  { name: 'RAL 9010', sub: 'Mat',       hex: '#f2f0ea' },
  { name: 'RAL 7039', sub: 'Mat',       hex: '#6d6a63' },
];

const COLORS_PREMIUM = [
  { name: 'Czarna wiśnia', sub: 'Drewnopodobny', img: 'uploads/czarna_wiśnia.png' },
  { name: 'Sosna',         sub: 'Drewnopodobny', img: 'uploads/sosna.png' },
  { name: 'Srebrny dąb',   sub: 'Drewnopodobny', img: 'uploads/srebrny_dąb.png' },
  { name: 'Złoty dąb',     sub: 'Drewnopodobny', img: 'uploads/złoty_dąb.png' },
];

// Linea
const LINEA = {
  id: 'linea',
  name: 'LINEA',
  tagline: 'Praktyczna wszechstronność i niezawodność — aluminiowy system zadaszeń przyściennych i samonośnych.',
  description: 'Solidne i ekonomiczne rozwiązanie o uniwersalnym designie — dla domu, carportu, restauracji lub kawiarni.',
  heroImg: 'assets/wiz-13.jpg',
  intro: 'System ALUKOMFORT LINEA daje pełną elastyczność montażu — jako konstrukcja przyścienna zintegrowana z budynkiem lub wolnostojąca samonośna. Sprawdza się zarówno jako zadaszenie przydomowego tarasu i carportu, jak i w ogródkach letnich restauracji i kawiarni — gdzie chroni meble i gości przed kaprysami pogody.',
  usecases: [
    { img: 'uploads/icons/uc-taras.png',       label: 'Zadaszenie tarasu i balkonu' },
    { img: 'uploads/icons/uc-wejscie.png',     label: 'Zadaszenie wejścia do domu' },
    { img: 'uploads/icons/uc-carport.png',     label: 'Wiata samochodowa' },
    { img: 'uploads/icons/uc-gospodarcza.png', label: 'Przestrzeń gospodarcza' },
    { img: 'uploads/icons/uc-komercyjna.png',  label: 'Strefa komercyjna – plaże przy restauracji, hotelu lub kawiarni' },
  ],
  features: [
    { label: 'Aluminium ekstrudowane z własnych doświadczeń projektowych' },
    { label: 'Wysoka odporność na wiatr i obciążenia śniegiem' },
    { label: 'Przepuszczalność światła dobierana indywidualnie' },
    { label: 'Zabudowa ścian bocznych — pełna prywatność' },
    { label: 'Ukryty system odprowadzania wody, odwodnienie w słupie' },
    { label: 'Opcjonalne liniowe oświetlenie LED' },
  ],
  specs: [
    { label: 'Maksymalna długość całkowita',            value: '10 060 mm' },
    { label: 'Maksymalny wysięg (krokiew standardowa)', value: 'do 4 000 mm' },
    { label: 'Maksymalny wysięg (krokiew wzmocniona)',  value: 'powyżej 4 000 mm' },
    { label: 'Maksymalny rozstaw słupów',               value: '5 000 mm' },
    { label: 'Słup nośny — przekrój',                   value: '150 × 100 × 4 mm' },
    { label: 'Wysokość słupów przednich (zalecana)',    value: '2 300 mm' },
    { label: 'Kąt nachylenia dachu (standard)',         value: '8°' },
    { label: 'Grubość szkła bezpiecznego',              value: '44.2 – 55.4 mm' },
    { label: 'Grubość poliwęglanu komorowego',          value: '16 mm' },
  ],
  roofs: [
    {
      id: 'poli',
      name: 'Poliwęglan komorowy 16 mm',
      desc: 'Lekki, wytrzymały i dobrze przepuszczający światło. Trzy warianty do wyboru — od maksymalnej jasności po chłodny efekt wizualny.',
      note: 'Technologia Solar Control łączy wysoką transmisję światła widzialnego z pełną ochroną przed promieniowaniem UV — wnętrze zadaszenia pozostaje jasne, a temperatura pod dachem wyraźnie niższa.',
      options: [
        { name: 'Strong Opal',                sub: 'Maksymalna jasność',          hex: '#f0f1eb' },
        { name: 'Solar Control Strong Opal',  sub: 'Redukcja UV i temperatury',   hex: '#d7d8d1' },
        { name: 'BOX Grey',                   sub: 'Stylowe chłodzenie',          hex: '#8790a0' },
      ],
    },
    {
      id: 'szklo',
      name: 'Szkło bezpieczne ESG / VSG',
      desc: 'Grubość 44.2–55.4. Szkło hartowane (ESG) odporne na uderzenia lub laminowane (VSG) z folią PVB — utrzymuje kształt nawet przy pęknięciu.',
      options: [
        { name: 'ESG',      sub: 'Szkło hartowane',    hex: '#eaf3f6' },
        { name: 'VSG',      sub: 'Szkło laminowane',   hex: '#dfe7ea' },
        { name: 'VSG/ESG',  sub: 'Kombinacja warstw',  hex: '#d3dfe3' },
      ],
    },
  ],
  addons: [
    { img: 'uploads/icons/add-drzwi.png',   title: 'Szklane drzwi przesuwne',          desc: 'Tory o długości do 500 cm, maksymalnie 5 tafli szkła w układzie.' },
    { img: 'uploads/icons/add-screen.png',  title: 'Rolety zewnętrzne screen',         desc: 'Skuteczna ochrona przeciwsłoneczna i większa prywatność strefy.' },
    { img: 'uploads/icons/add-zaluzje.png', title: 'Żaluzje pionowe i poziome',        desc: 'Precyzyjna kontrola światła dzięki obrotowym lamelom.' },
    { img: 'uploads/icons/add-panele.png',  title: 'Nieprzezierne panele dekoracyjne', desc: 'Nadają charakter zabudowie i zapewniają dyskrecję.' },
    { img: 'uploads/icons/add-fix.png',     title: 'System Fix',                       desc: 'Kliny boczne z poliwęglanu w standardowej wersji.' },
    { img: 'uploads/icons/add-led.png',     title: 'Liniowe oświetlenie LED',          desc: 'Ukryte w profilu, nastrojowe światło ręczne lub zdalne.' },
  ],
  scenarios: [
    { key: 'silownia', title: 'Domowa siłownia',      desc: 'Zamknięty moduł do treningu na świeżym powietrzu — z pełną zabudową ścian, oświetleniem LED i wentylacją.' },
    { key: 'carport',  title: 'Carport',              desc: 'Zadaszenie dla jednego lub dwóch samochodów. Odwodnienie zintegrowane w słupie, długość do 10 060 mm.' },
    { key: 'skladzik', title: 'Składzik ogrodowy',    desc: 'Zamknięta strefa gospodarcza 506 × 606 cm — na narzędzia, rowery i sprzęt sezonowy.' },
  ],
  examples: [
    {
      img: 'uploads/linea-przyklady/skladzik-drewutnia.jpg',
      title: 'Strefa gospodarcza z drewutnią',
      desc: 'Zamknięty składzik z panelami poziomymi i miejscem na drewno kominkowe, połączony z otwartą wiatą. Liniowe LED w krawędzi dachu.',
    },
    {
      img: 'uploads/linea-przyklady/modul-wypoczynkowy.jpg',
      title: 'Zamknięty moduł wypoczynkowy',
      desc: 'Salon ogrodowy za szklanymi drzwiami przesuwnymi — żaluzje pionowe od strony sąsiada, pełna zabudowa ścian i oświetlenie LED.',
    },
    {
      img: 'uploads/linea-przyklady/domowa-silownia.jpg',
      title: 'Domowa siłownia pod zadaszeniem',
      desc: 'Strefa treningowa z roletami screen chroniącymi przed słońcem i wzrokiem z zewnątrz. Część otwarta pozostaje miejscem wypoczynku.',
    },
    {
      img: 'uploads/linea-przyklady/carport-zabudowa.jpg',
      title: 'Carport z modułem zamkniętym',
      desc: 'Długie zadaszenie samonośne — miejsce postojowe dla auta i przeszklony moduł gospodarczy w jednej konstrukcji do 10 060 mm.',
    },
    {
      img: 'uploads/linea-przyklady/ogrod-zimowy.jpg',
      title: 'Ogród zimowy przy domu',
      desc: 'Zadaszenie przyścienne z pełną zabudową szkłem ESG/VSG — taras dostępny przez cały rok, niezależnie od pogody.',
    },
    {
      img: 'uploads/linea-przyklady/zaluzje-screen.jpg',
      title: 'Moduł z żaluzjami pionowymi',
      desc: 'Kompaktowa zabudowa z lamelami pionowymi i roletą screen — precyzyjna kontrola światła i prywatności w ciągu dnia.',
    },
  ],
};

// Horizon
const HORIZON = {
  id: 'horizon',
  name: 'HORIZON',
  tagline: 'Ekskluzywna przestrzeń i technologiczna perfekcja — pergola aluminiowa o minimalistycznej, płaskiej linii dachu.',
  description: 'Konstrukcja wolnostojąca lub przyścienna, dostępna w wersji lamelowej, szklanej i hybrydowej.',
  heroImg: 'assets/wiz-d.png',
  intro: 'ALUKOMFORT HORIZON to propozycja dla najbardziej wymagających klientów — luksusowa forma z pełną kontrolą nad otoczeniem. Znakiem rozpoznawczym jest smukły wieniec konstrukcyjny o wysokości 280 mm, w którym ukryta jest cała technologia — odprowadzanie wody, oświetlenie i automatyka.',
  variants: [
    {
      id: 'L',
      name: 'HORIZON L',
      desc: 'Dach lamelowy bioklimatyczny',
      img: 'uploads/horizon-modele/wariant-l.jpg',
      description: 'Bioklimatyczna pergola z dachem ze stabilnych, ruchomych profili aluminiowych. Swobodna regulacja ilości światła i cyrkulacji powietrza. Precyzyjne mechanizmy obrotu lameli zapewniają bezpieczne, całoroczne użytkowanie. Odporna na obciążenia śniegiem i wiatrem zgodnie z normami EN 1991-1-3 i EN 1991-1-4. Sterowanie elektryczne silnikami SOMFY — ręcznie, pilotem lub aplikacją.',
      specs: [
        { label: 'Dach',                            value: 'Ruchome lamele aluminiowe' },
        { label: 'Wysokość wieńca dachu',           value: '280 mm (profil 280 × 60, 3-komorowy)' },
        { label: 'Maksymalna wysokość zadaszenia',  value: '2 800 mm' },
        { label: 'Standardowe warianty wymiarowe',  value: '4×3, 4×4, 6×3, 6×4, 8×3, 8×4 m' },
        { label: 'Sterowanie',                      value: 'SOMFY (ręczne / pilot / aplikacja)' },
        { label: 'Systemy zabudowy',                value: 'CORE L 44, CORE L-S 64, CORE L-S 84' },
        { label: 'Normy projektowe',                value: 'EN 1991-1-1 / 1-3 / 1-4' },
      ],
    },
    {
      id: 'S',
      name: 'HORIZON S',
      desc: 'Dach szklany',
      img: 'uploads/horizon-modele/wariant-s.jpg',
      description: 'Zadaszenie z dachem z wysokiej klasy szkła bezpiecznego ESG + EVG laminowany 44.2 lub 55.2 (grubość 44.2–55.4 mm). Maksymalna szerokość tafli 750 mm. Realizowane pod indywidualny wymiar — nieprzesłonięte niebo przy pełnej ochronie przed deszczem.',
      specs: [
        { label: 'Dach',                            value: 'Szkło bezpieczne ESG / VSG, transparentne lub przyciemniane' },
        { label: 'Wysokość wieńca dachu',           value: '280 mm (profil 280 × 60, 3-komorowy)' },
        { label: 'Maksymalna wysokość zadaszenia',  value: '2 800 mm' },
        { label: 'Maksymalny wysięg konstrukcji',   value: 'powyżej 4 000 mm' },
        { label: 'Grubość szkła bezpiecznego',      value: '44.2 – 55.4 mm' },
        { label: 'Maksymalna szerokość tafli',      value: '750 mm' },
        { label: 'Wymiary',                         value: 'pod indywidualny wymiar' },
        { label: 'Systemy zabudowy',                value: 'CORE S 44, CORE S 64, CORE S 84' },
        { label: 'Normy projektowe',                value: 'EN 1991-1-1 / 1-3 / 1-4' },
      ],
    },
    {
      id: 'LS',
      name: 'HORIZON L-S',
      desc: 'Dach hybrydowy: lamele + szkło',
      img: 'uploads/horizon-modele/wariant-ls.jpg',
      description: 'Wersja hybrydowa łącząca ruchome lamele oraz szklany przeszklony segment w jednej bryle. Łączy regulację światła i cyrkulacji powietrza z panoramicznym widokiem nieba nad częścią szklaną.',
      specs: [
        { label: 'Dach',                            value: 'Lamele + segment szklany w jednej bryle' },
        { label: 'Wysokość wieńca dachu',           value: '280 mm (profil 280 × 60, 3-komorowy)' },
        { label: 'Maksymalna wysokość zadaszenia',  value: '2 800 mm' },
        { label: 'Sterowanie lameli',               value: 'SOMFY (ręczne / pilot / aplikacja)' },
        { label: 'Grubość szkła segmentu',          value: '44.2 – 55.4 mm' },
        { label: 'Systemy zabudowy',                value: 'CORE L-S 64, CORE L-S 84' },
        { label: 'Normy projektowe',                value: 'EN 1991-1-1 / 1-3 / 1-4' },
      ],
    },
  ],
  features: [
    { icon: 'Frame',   label: 'Smukły wieniec konstrukcyjny 280 mm — ukrywa technologię' },
    { icon: 'Roof',    label: 'Minimalistyczna, płaska linia dachu' },
    { icon: 'Rain',    label: 'Ukryty system odprowadzania wody w słupach' },
    { icon: 'Auto',    label: 'Automatyka pogodowa z czujnikami i sterowaniem SOMFY' },
    { icon: 'Led',     label: 'Liniowe oświetlenie LED ukryte w wieńcu' },
    { icon: 'Wall',    label: 'Ściany: szyby przesuwne, aluminiowe shuttersy, screen' },
    { icon: 'Profile', label: 'Profile ze stopu aluminium 6063 — odporność na korozję' },
    { icon: 'Shield',  label: 'Zgodność z EN 1991-1-1/3/4 (obciążenia, śnieg, wiatr)' },
  ],
  uses: [
    { icon: 'Terrace',   label: 'Zadaszenie tarasu i balkonu' },
    { icon: 'Garden',    label: 'Letnia kuchnia z grillem' },
    { icon: 'Pool',      label: 'Plenerowa siłownia, basen lub prywatne SPA' },
    { icon: 'Commercial',label: 'Luksusowe beach bary, restauracje i strefy VIP w hotelach' },
    { icon: 'Entrance',  label: 'Reprezentacyjne zadaszenia wejść biur i hoteli' },
    { icon: 'Carport',   label: 'Carport i strefa gospodarcza' },
  ],
  models: [
    { id: 'stdL', name: 'HORIZON L 43',  desc: 'Lamelowa 4×3 m — najmniejszy moduł standardowy.',   img: 'uploads/horizon-modele/horizon-l-43.jpg' },
    { id: 'stdS', name: 'HORIZON S 44',  desc: 'Szklana 4×4 m — dach przezroczysty pod indywidualny wymiar.', img: 'uploads/horizon-modele/horizon-s-44.jpg' },
    { id: 'lux',  name: 'HORIZON L 64',  desc: 'Lamelowa 6×4 m — popularny rozmiar tarasu.',         img: 'uploads/horizon-modele/horizon-l-64.jpg' },
    { id: 'dlux', name: 'HORIZON L-S 84', desc: 'Hybrydowa 8×4 m — lamele + szkło w jednej bryle.',  img: 'uploads/horizon-modele/horizon-ls-84.jpg' },
  ],
  coreNote: 'Zamknięte moduły zabudowy oferujemy jako gotowe systemy CORE — dla dachu szklanego: CORE S 44, CORE S 64 i CORE S 84, a dla dachu lamelowego i hybrydowego: CORE L 44, CORE L-S 64 i CORE L-S 84. Zabudowa ścian nie wpływa na statykę konstrukcji.',
  addons: [
    { icon: 'Led',    title: 'Liniowe oświetlenie LED',     desc: 'Ukryte w wieńcu 280 mm — światło nastrojowe ręcznie lub zdalnie.' },
    { icon: 'Auto',   title: 'Automatyka pogodowa',         desc: 'Czujniki deszczu, wiatru i nasłonecznienia. Lamele reagują same.' },
    { icon: 'Glass',  title: 'Szklane ściany przesuwne',    desc: 'Przesuwne lub stałe — do 5 tafli szkła na torach do 500 cm.' },
    { icon: 'Lamel',  title: 'Aluminiowe shuttersy',        desc: 'Żaluzje poziome i pionowe — cień, prywatność, ochrona od wiatru.' },
    { icon: 'Fabric', title: 'Rolety zewnętrzne screen',    desc: 'Filtracja światła i widoku z zachowaniem przewiewu.' },
  ],
  dluxSpecs: [
    'Smukły wieniec konstrukcyjny 280 mm ukrywa technologię',
    'Odwodnienie zintegrowane w słupach — brak zewnętrznych rur',
    'Sterowanie SOMFY zgodne z systemem inteligentnego domu',
    'Ściany do wyboru: szyby przesuwne, shuttersy, screen',
  ],
  examples: [
    {
      img: 'uploads/horizon-przyklady/przyscienna-lounge.jpg',
      title: 'Pergola przyścienna ze strefą lounge',
      desc: 'HORIZON L zintegrowany z bryłą domu — lamele dawkują światło nad wypoczynkiem, a wieczorem strefę oświetla liniowe LED w wieńcu.',
    },
    {
      img: 'uploads/horizon-przyklady/pergola-lamelowa-szklo.jpg',
      title: 'Wolnostojąca pergola z szybami przesuwnymi',
      desc: 'HORIZON L na środku ogrodu — szklane ściany przesuwne chronią przed wiatrem, nie odcinając widoku na zieleń.',
    },
    {
      img: 'uploads/horizon-przyklady/jadalnia-grill.jpg',
      title: 'Podwójny moduł z jadalnią i grillem',
      desc: 'Dwa segmenty HORIZON L w jednej linii — osobna strefa wypoczynku i ogrodowa jadalnia z miejscem na grill.',
    },
    {
      img: 'uploads/horizon-przyklady/lounge-palenisko.jpg',
      title: 'Salon ogrodowy z paleniskiem',
      desc: 'Otwarte lamele nad paleniskiem odprowadzają ciepło i dym, a zabudowane ściany osłaniają strefę po zmroku.',
    },
    {
      img: 'uploads/horizon-przyklady/ogrod-zimowy-szklo.jpg',
      title: 'Ogród zimowy przy domu',
      desc: 'HORIZON S z dachem ze szkła bezpiecznego — narożna zabudowa tarasu dostępna przez cały rok, z nieprzesłoniętym niebem.',
    },
    {
      img: 'uploads/horizon-przyklady/letnia-kuchnia-basen.jpg',
      title: 'Letnia kuchnia przy basenie',
      desc: 'Zamknięty moduł CORE S z pełnym aneksem kuchennym — zaplecze strefy basenowej niezależne od pogody.',
    },
  ],
};

// Roma
const ROMA = {
  id: 'roma',
  name: 'ROMA',
  tagline: 'Śródziemnomorski luz i modułowa wygoda — innowacyjne zadaszenie aluminiowe z systemem tkaninowym dla miłośników lekkości i klimatu południowych wakacji.',
  description: '',
  heroImg: 'assets/wiz-c.png',
  intro: 'ALUKOMFORT ROMA to zadaszenie wykorzystujące roletę rzymską z akrylowego płótna jako dynamiczne poszycie dachu. System pozwala regulować ilość światła, dając komfortowy cień w upale i tworzy lekką, nowoczesną przestrzeń wypoczynkową.',
  features: [
    { icon: 'Fabric',  label: 'Poszycie z płótna 100% akryl — ochrona UV i miękki cień' },
    { icon: 'Profile', label: 'Konstrukcja z ekstrudowanego stopu aluminium 6063' },
    { icon: 'Frame',   label: 'Modułowość — gotowe moduły łączliwe dla dużych przestrzeni' },
    { icon: 'Auto',    label: 'Opcjonalna automatyka pogodowa' },
    { icon: 'Led',     label: 'Opcjonalne liniowe oświetlenie LED' },
    { icon: 'Wall',    label: 'System ścian bocznych — szkło, rolety screen, panele' },
  ],
  modules: [
    { w: 3, h: 3 }, { w: 4, h: 3 }, { w: 4, h: 4 },
    { w: 5, h: 4 }, { w: 6, h: 4 },
  ],
  uses: [
    { icon: 'Terrace',    label: 'Przydomowy taras i ogród' },
    { icon: 'Commercial', label: 'Ogródki letnie restauracji i kawiarni' },
    { icon: 'Pool',       label: 'Beach bary i obiekty nad wodą' },
    { icon: 'Entrance',   label: 'Hotelowe strefy relaksu dla gości' },
  ],
  components: [
    { icon: 'Pillar',  label: 'Słupy aluminiowe' },
    { icon: 'Roof',    label: 'Belka kalenicowa' },
    { icon: 'Fabric',  label: 'Płótno akrylowe 100%' },
    { icon: 'Motor',   label: 'Rolka prosta i kątowa z mocowaniem linki' },
    { icon: 'Frame',   label: 'Rama nośna' },
    { icon: 'Guide',   label: 'Listwy LED (opcja)' },
    { icon: 'Bolt',    label: 'Prowadnice 40 × 40 mm' },
    { icon: 'Hook',    label: 'Wieszaki 40 × 25 mm' },
    { icon: 'BoxL',    label: 'Boczki aluminiowe i zaślepki szyn' },
    { icon: 'BoxR',    label: 'Donice dekoracyjne (opcja)' },
  ],
  techSpecs: [
    { label: 'Profile konstrukcyjne',          value: 'aluminiowe, min. 80 × 60 mm' },
    { label: 'Prowadnice',                     value: '40 × 40 mm, montaż od spodu lub z boku' },
    { label: 'Wózki łożyskowane — wysokość',   value: '3h = 350 mm, 6h = 390 mm, 9h = 415 mm' },
    { label: 'Tkaniny do wyboru',              value: 'akryl 100%, PLAIN, Opatex, W96' },
    { label: 'Sterowanie',                     value: 'linka w obiegu zamkniętym lub automatyka' },
    { label: 'Konfiguracja dachu',             value: 'pozioma, bez spadku' },
    { label: 'Moduły standardowe',             value: '3×3, 4×3, 4×4, 5×4, 6×4 m' },
    { label: 'Kolory konstrukcji',             value: 'pełna gama RAL' },
  ],
  rainNote: 'Roleta rzymska chroni przed słońcem i przelotnym deszczem. Przy intensywnych opadach tkaninę należy zwinąć — fałdowanie pozostaje wtedy równomierne, a płótno zachowuje estetyczny układ na lata.',
  specs: [
    { label: 'Elementy aluminiowe',          value: '60 miesięcy' },
    { label: 'Elektryka i automatyka',       value: '24 miesiące' },
    { label: 'Pokrycie tkaninowe (akryl)',   value: '60 miesięcy' },
    { label: 'Ściany systemu ESG',           value: '8 / 10 / 12 mm' },
  ],
  examples: [
    {
      img: 'uploads/roma-przyklady/jadalnia-ogrodowa.jpg',
      title: 'Jadalnia ogrodowa pod roletą',
      desc: 'Rozłożona roleta rzymska daje miękki cień nad stołem — tkanina akrylowa filtruje światło bez efektu ciemnej plamy.',
    },
    {
      img: 'uploads/roma-przyklady/wieczorny-salon-led.jpg',
      title: 'Wieczorny salon z oświetleniem LED',
      desc: 'Liniowe LED między fałdami tkaniny tworzą nastrojowe światło — pergola pracuje także po zmroku.',
    },
    {
      img: 'uploads/roma-przyklady/strefa-wypoczynku.jpg',
      title: 'Strefa wypoczynku w ogrodzie',
      desc: 'Wolnostojący moduł z siatkami aluminiowymi pod pnącza — lekka alternatywa dla ciężkiej zabudowy tarasu.',
    },
    {
      img: 'uploads/roma-przyklady/taras-restauracji.jpg',
      title: 'Taras restauracji nad wodą',
      desc: 'Moduły ROMA połączone w jedną linię zadaszenia — ogródek restauracyjny działa niezależnie od słońca.',
    },
    {
      img: 'uploads/roma-przyklady/ogrodek-kawiarni.jpg',
      title: 'Ogródek letni kawiarni',
      desc: 'Kompaktowy moduł nad stolikami bistro — przyciąga gości i wydłuża sezon ogródka o chłodniejsze miesiące.',
    },
    {
      img: 'uploads/roma-przyklady/strefa-basen.jpg',
      title: 'Strefa relaksu przy basenie',
      desc: 'Leżaki w miękkim cieniu rolety rzymskiej — tkanina akrylowa odporna na UV i wilgoć sprawdza się tuż przy wodzie.',
    },
  ],
};

window.PRODUCTS = { LINEA, HORIZON, ROMA };
window.COLORS_BASE = COLORS_BASE;
window.COLORS_PREMIUM = COLORS_PREMIUM;
