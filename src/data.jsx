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
    { icon: 'Terrace', label: 'Zadaszenie tarasu i balkonu' },
    { icon: 'Entrance', label: 'Zadaszenie wejścia do domu' },
    { icon: 'Carport', label: 'Wiata samochodowa' },
    { icon: 'Commercial', label: 'Przestrzeń gospodarcza' },
    { icon: 'Pool', label: 'Strefa komercyjna – plaże przy restauracji, hotelu lub kawiarni' },
  ],
  features: [
    { icon: 'Shield',     label: 'Przede wszystkim bezpieczne i komfortowe' },
    { icon: 'Profile',    label: 'Aluminium ekstrudowane z własnych doświadczeń projektowych' },
    { icon: 'Frame',      label: 'Optyczna lekkość konstrukcji' },
    { icon: 'Check',      label: 'Wysoka jakość i estetyka wykonania' },
    { icon: 'Wall',       label: 'Uniwersalne typy zadaszeń do różnych zastosowań' },
    { icon: 'Tools',      label: 'Niski koszt montażu' },
    { icon: 'Glass',      label: 'Przepuszczalność światła dobierana indywidualnie' },
    { icon: 'Guide',      label: 'Zabudowa ścian bocznych — pełna prywatność' },
    { icon: 'Rain',       label: 'Ukryty system odprowadzania wody' },
    { icon: 'Floor',      label: 'Rynna z podwójnym dnem, odwodnienie zintegrowane w słupie' },
    { icon: 'Snow',       label: 'Wysoka odporność na wiatr i obciążenia śniegiem' },
    { icon: 'Led',        label: 'Opcjonalne liniowe oświetlenie LED' },
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
    { icon: 'Glass',  title: 'Szklane drzwi przesuwne',         desc: 'Tory o długości do 500 cm, maksymalnie 5 tafli szkła w układzie.' },
    { icon: 'Fabric', title: 'Rolety zewnętrzne screen',        desc: 'Skuteczna ochrona przeciwsłoneczna i większa prywatność strefy.' },
    { icon: 'Lamel',  title: 'Żaluzje pionowe i poziome',       desc: 'Precyzyjna kontrola światła dzięki obrotowym lamelom.' },
    { icon: 'Wall',   title: 'Nieprzezierne panele dekoracyjne', desc: 'Nadają charakter zabudowie i zapewniają dyskrecję.' },
    { icon: 'Frame',  title: 'System Fix',                      desc: 'Kliny boczne z poliwęglanu w standardowej wersji.' },
    { icon: 'Led',    title: 'Liniowe oświetlenie LED',         desc: 'Ukryte w profilu, nastrojowe światło ręczne lub zdalne.' },
  ],
  scenarios: [
    { key: 'silownia', title: 'Domowa siłownia',      desc: 'Zamknięty moduł do treningu na świeżym powietrzu — z pełną zabudową ścian, oświetleniem LED i wentylacją.' },
    { key: 'carport',  title: 'Carport',              desc: 'Zadaszenie dla jednego lub dwóch samochodów. Odwodnienie zintegrowane w słupie, długość do 10 060 mm.' },
    { key: 'skladzik', title: 'Składzik ogrodowy',    desc: 'Zamknięta strefa gospodarcza 506 × 606 cm — na narzędzia, rowery i sprzęt sezonowy.' },
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
      img: 'assets/horizon-l-04.jpg',
      description: 'Bioklimatyczna pergola z dachem ze stabilnych, ruchomych profili aluminiowych. Swobodna regulacja ilości światła i cyrkulacji powietrza. Odporna na obciążenia śniegiem i wiatrem zgodnie z normami EN 1991-1-3 i EN 1991-1-4. Sterowanie elektryczne silnikami SOMFY — ręcznie, pilotem lub aplikacją. Standardowe warianty wymiarowe: 4×3, 4×4, 6×3, 6×4, 8×3, 8×4 m.',
    },
    {
      id: 'S',
      name: 'HORIZON S',
      desc: 'Dach szklany',
      img: 'assets/horizon-s-01.jpg',
      description: 'Zadaszenie z dachem z wysokiej klasy szkła bezpiecznego ESG + EVG laminowany 44.2 lub 55.2 (grubość 44.2–55.4 mm). Maksymalna szerokość tafli 750 mm. Realizowane pod indywidualny wymiar — nieprzesłonięte niebo przy pełnej ochronie przed deszczem.',
    },
    {
      id: 'LS',
      name: 'HORIZON L-S',
      desc: 'Dach hybrydowy: lamele + szkło',
      img: 'assets/horizon-ls-01.jpg',
      description: 'Wersja hybrydowa łącząca ruchome lamele oraz szklany przeszklony segment w jednej bryle. Łączy regulację światła z panoramicznym widokiem.',
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
    { icon: 'Pool',      label: 'Plenerowa siłownia lub SPA' },
    { icon: 'Commercial',label: 'Luksusowe beach bary i restauracje' },
    { icon: 'Entrance',  label: 'Letnia kuchnia z grillem' },
    { icon: 'Carport',   label: 'Strefy VIP w hotelach i klubach' },
  ],
  specs: [
    { label: 'Wysokość wieńca dachu',              value: '280 mm (profil 280 × 60, 3-komorowy)' },
    { label: 'Maksymalna wysokość zadaszenia',     value: '2 800 mm' },
    { label: 'Standardowe warianty wymiarowe L',   value: '4×3, 4×4, 6×3, 6×4, 8×3, 8×4 m' },
    { label: 'Grubość szkła bezpiecznego (S)',     value: '44.2 – 55.4 mm' },
    { label: 'Maksymalna szerokość tafli szkła',   value: '750 mm' },
    { label: 'Sterowanie dachu lamelowego (L)',    value: 'SOMFY (ręczne / pilot / aplikacja)' },
  ],
  models: [
    { id: 'stdL', name: 'HORIZON L 43',  desc: 'Lamelowa 4×3 m — najmniejszy moduł standardowy.',   img: 'assets/horizon-l-05.jpg' },
    { id: 'stdS', name: 'HORIZON S 44',  desc: 'Szklana 4×4 m — dach przezroczysty pod indywidualny wymiar.', img: 'assets/horizon-s-02.jpg' },
    { id: 'lux',  name: 'HORIZON L 64',  desc: 'Lamelowa 6×4 m — popularny rozmiar tarasu.',         img: 'assets/horizon-02.jpg' },
    { id: 'dlux', name: 'HORIZON L-S 84', desc: 'Hybrydowa 8×4 m — lamele + szkło w jednej bryle.',  img: 'assets/horizon-ls-02.jpg' },
  ],
  addons: [
    { icon: 'Led',    title: 'Liniowe oświetlenie LED',     desc: 'Ukryte w wieńcu 280 mm — światło nastrojowe ręcznie lub zdalnie.' },
    { icon: 'Auto',   title: 'Automatyka pogodowa',         desc: 'Czujniki deszczu, wiatru i nasłonecznienia. Lamele reagują same.' },
    { icon: 'Glass',  title: 'Szklane ściany przesuwne',    desc: 'Do 5 tafli szkła na torach do 500 cm — zimowe zamknięcie strefy.' },
    { icon: 'Lamel',  title: 'Aluminiowe shuttersy',        desc: 'Żaluzje poziome i pionowe — cień, prywatność, ochrona od wiatru.' },
    { icon: 'Fabric', title: 'Rolety zewnętrzne screen',    desc: 'Filtracja światła i widoku z zachowaniem przewiewu.' },
  ],
  dluxSpecs: [
    'Smukły wieniec konstrukcyjny 280 mm ukrywa technologię',
    'Odwodnienie zintegrowane w słupach — brak zewnętrznych rur',
    'Sterowanie SOMFY zgodne z systemem inteligentnego domu',
    'Ściany do wyboru: szyby przesuwne, shuttersy, screen',
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
    { icon: 'Pillar',  label: 'Słupy aluminiowe 100%' },
    { icon: 'Roof',    label: 'Belka kalenicowa' },
    { icon: 'Fabric',  label: 'Pokrycie z akrylu' },
    { icon: 'Motor',   label: 'Napęd rolety' },
    { icon: 'Frame',   label: 'Rama nośna' },
    { icon: 'Guide',   label: 'Listwy LED' },
    { icon: 'Bolt',    label: 'Prowadnice boczne' },
    { icon: 'Hook',    label: 'Mocowanie ścienne' },
    { icon: 'BoxL',    label: 'Panele boczne alu' },
    { icon: 'BoxR',    label: 'Donice dekoracyjne' },
  ],
  specs: [
    { label: 'Elementy aluminiowe',          value: '60 miesięcy' },
    { label: 'Elektryka i automatyka',       value: '24 miesiące' },
    { label: 'Pokrycie tkaninowe (akryl)',   value: '60 miesięcy' },
    { label: 'Ściany systemu ESG',           value: '8 / 10 / 12 mm' },
  ],
};

window.PRODUCTS = { LINEA, HORIZON, ROMA };
window.COLORS_BASE = COLORS_BASE;
window.COLORS_PREMIUM = COLORS_PREMIUM;
