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
  tagline: 'Aluminiowy system zadaszeń do tworzenia realizacji przydomowych i samonośnych.',
  description: 'Sprawdza się jako zadaszenie tarasu, wejścia, strefy gospodarczej lub carport.',
  heroImg: 'assets/wiz-13.jpg',
  intro: 'System ALUKOMFORT LINEA został zaprojektowany jako zadaszenie aluminiowe o konstrukcji samonośnej, które nie wymaga mocowania do budynku. Dzięki przemyślanym technologii osłona pozwala tworzyć konstrukcje zintegrowane z budynkiem lub samodzielne.',
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
    { label: 'Maksymalny wysięg',                       value: '5 000 mm' },
    { label: 'Maksymalna szerokość tafli szkła',        value: '750 mm' },
    { label: 'Maksymalna szerokość płyty poliwęglanu',  value: '1 000 mm' },
    { label: 'Grubość szkła bezpiecznego',              value: '44.2 – 55.4' },
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
  tagline: 'Nowoczesne aluminiowe zadaszenia o płaskich dachach, dostępne w wersji lamelowej, szklanej oraz hybrydowej.',
  description: 'Może być montowany jako konstrukcja przyścienna lub wolnostojąca.',
  heroImg: 'assets/wiz-d.png',
  intro: 'ALUKOMFORT HORIZON to pergola aluminiowa o płaskich dachach, wyróżniająca się wyrafinowanym poziomem estetyczno‑technicznym i najwyższym stopniem indywidualizacji. System dostępny jest w trzech wariantach.',
  variants: [
    {
      id: 'L',
      name: 'HORIZON L',
      desc: 'Dach z ruchomych lameli',
      img: 'assets/horizon-l-04.jpg',
      description: 'Dach z ruchomych lameli. Lamele pozwalają regulować poziom doświetlenia i cyrkulacji powietrza. Sterowanie ręczne lub przy użyciu pilota i aplikacji. Kompletna konstrukcja odprowadza wody.',
    },
    {
      id: 'S',
      name: 'HORIZON S',
      desc: 'Dach szklany',
      img: 'assets/horizon-s-01.jpg',
      description: 'Dach z przeszkleniem o wysokiej przezierności aż do 85%. Pokrycie warstwami UV, VSG, ESG. Bezbarwny, neutralny, szkło bezpieczne zachowujące pełną widoczność.',
    },
    {
      id: 'LS',
      name: 'HORIZON L-S',
      desc: 'Dach hybrydowy: ruchome lamele + szkło',
      img: 'assets/horizon-ls-01.jpg',
      description: 'Wersja hybrydowa łącząca ruchome lamele oraz przeszklenie w jednej pełnowartościowej bryle.',
    },
  ],
  features: [
    'Profile o płaskim matowym poziomie',
    'Dach z ruchomych lameli, szkła lub bezpieczne hybrydowo',
    'Stopień odprowadzenie wody wysoki',
    'Montaż przyścienny lub wolnostojący',
    'Ukryty system odprowadzania wody',
    'Oświetlenie LED',
    'Ściany przestrzeń',
    'Automatyka sterująca',
  ],
  uses: [
    { icon: 'Terrace', label: 'Zadaszenie tarasu i balkonu' },
    { icon: 'Carport', label: 'Wiata samochodowa' },
    { icon: 'Entrance', label: 'Zadaszenie wejścia' },
    { icon: 'Commercial', label: 'Zewnętrzna przestrzeń gospodarcza' },
    { icon: 'Pool', label: 'Zadaszenie strefy komercyjnej' },
  ],
  specs: [
    { label: 'Maksymalna długość całkowita', value: '6000 mm' },
    { label: 'Maksymalny wysięg',            value: '6000 mm' },
    { label: 'Standardowe grubości dachu (lamele lub szkło)', value: '22 mm' },
    { label: 'Standardowe wysokości do krycia', value: '3000 mm' },
  ],
  models: [
    { id: 'stdL', name: 'HORIZON Standard L', desc: 'Konstrukcja otwarta 4‑punktowa.', img: 'assets/horizon-l-05.jpg' },
    { id: 'stdS', name: 'HORIZON Standard S', desc: 'Konstrukcja otwarta 2‑punktowa przyścienna.', img: 'assets/horizon-s-02.jpg' },
    { id: 'lux',  name: 'HORIZON Lux S-L',    desc: 'Wersja z rozbudowanymi możliwościami.', img: 'assets/horizon-02.jpg' },
    { id: 'dlux', name: 'HORIZON D-Lux L-S',  desc: 'Topowa konfiguracja hybrydowa.', img: 'assets/horizon-ls-02.jpg' },
  ],
  dluxSpecs: [
    'profile górny o przekroju 2500 × 3700',
    'system FM 2500 × 3700',
    'przyłącza boczne o rozstawie 1500 × 3700',
    'do wariantu FM 2500 × 2800',
  ],
};

// Roma
const ROMA = {
  id: 'roma',
  name: 'ROMA',
  tagline: 'Aluminiowe zadaszenia z systemem tkaninowym i teksty rzymską. Stylowa forma, prawa regulacja światła i przyjemny chłód w strefie wypoczynku przy domu.',
  description: '',
  heroImg: 'assets/wiz-c.png',
  intro: 'ALUKOMFORT ROMA to zadaszenie wykorzystujące roletę rzymską jako dynamiczne przeszkolnienie. System pozwala regulować ilość światła, dając komfortowy cień w upale słońca i tworzy lekką, nowoczesną przestrzeń wypoczynkową.',
  features: [
    { icon: 'Profile', label: 'Profile boczne drugie przenośne' },
    { icon: 'Shield', label: 'Dach z farnie i tkaniny rzymskie z pełnym podparciem. Regulowana ścieżka jazdy światła i cyrkulacja powietrza.' },
    { icon: 'Led', label: 'Oświetlenie powierzchnione zewnętrzne w EN i ściągach' },
    { icon: 'Wall', label: 'Możliwość zastosowania oświetlenia LED' },
    { icon: 'Auto', label: 'Możliwość zastosowania automatyki' },
  ],
  modules: [
    { w: 3, h: 3 }, { w: 4, h: 3 }, { w: 4, h: 4 },
    { w: 5, h: 4 }, { w: 6, h: 4 },
  ],
  uses: [
    { icon: 'Terrace', label: 'Zadaszenie tarasu i balkonu, taras jak restauracji, kawiarni i hotelu' },
  ],
  components: [
    { icon: 'Pillar',  label: 'Profile zlewane 100% alu.' },
    { icon: 'Roof',    label: 'Rolka kalenica' },
    { icon: 'Fabric',  label: 'Pokrycie tkaninowe' },
    { icon: 'Motor',   label: 'Mocowanie rynnowe' },
    { icon: 'Frame',   label: 'Mocowanie boczne' },
    { icon: 'Guide',   label: 'Listwy LED' },
    { icon: 'Bolt',    label: 'Prowadnice' },
    { icon: 'Hook',    label: 'Zapadki ścienne' },
    { icon: 'BoxL',    label: 'Boczki aluminiowe' },
    { icon: 'BoxR',    label: 'Boczki 3+3' },
  ],
  specs: [
    { label: 'Pokrycie rzymskie', value: '60 miesięcy' },
    { label: 'Fakcje pokrywania', value: '24 miesięcy' },
    { label: 'Pokrycie podstawowe', value: '60 miesięcy' },
    { label: 'Ściany systemu ESG',  value: '8/10/12 mm' },
  ],
};

window.PRODUCTS = { LINEA, HORIZON, ROMA };
window.COLORS_BASE = COLORS_BASE;
window.COLORS_PREMIUM = COLORS_PREMIUM;
