// Dane produktów — dokładnie wg referencji (polski tekst, tabelki, kolory RAL, warianty)

const COLORS_BASE = [
  { name: 'RAL 7016', sub: 'Struktura', hex: '#2c3033', preview: 'uploads/colors-preview/linea/ral-7016.webp' },
  { name: 'RAL 9005', sub: 'Struktura', hex: '#0c0c0c', preview: 'uploads/colors-preview/linea/ral-9005.webp' },
  { name: 'RAL 9010', sub: 'Mat',       hex: '#f2f0ea', preview: 'uploads/colors-preview/linea/ral-9010.webp' },
];

const COLORS_PREMIUM = [
  { name: 'Terra',      sub: 'Premium', img: 'uploads/colors-preview/swatch-terra.webp',      hex: '#bea991', preview: 'uploads/colors-preview/linea/terra.webp' },
  { name: 'Grey Brown', sub: 'Premium', img: 'uploads/colors-preview/swatch-grey-brown.webp', hex: '#646363', preview: 'uploads/colors-preview/linea/grey-brown.webp' },
  { name: 'Mica',       sub: 'Premium', img: 'uploads/colors-preview/swatch-mica.webp',       hex: '#53565c', preview: 'uploads/colors-preview/linea/mica.webp' },
  { name: 'Azzurro',    sub: 'Premium', img: 'uploads/colors-preview/swatch-azzurro.webp',    hex: '#464b55', preview: 'uploads/colors-preview/linea/azzurro.webp' },
];

// Linea
const LINEA = {
  id: 'linea',
  name: 'LINEA',
  tagline: 'Konstrukcja aluminiowego zadaszenia przyściennego została zaprojektowana tak, aby umożliwiać realizację zadaszeń o różnorodnych funkcjach, formach i wymiarach.',
  description: 'System LINEA daje możliwość zbudowania konstrukcji dopasowanej do architektury budynku oraz indywidualnych potrzeb użytkowników.',
  heroImg: 'assets/wiz-13.webp',
  intro: 'System ALUKOMFORT LINEA to wszechstronna pergola tarasowa, która daje pełną elastyczność montażu — jako konstrukcja przyścienna zintegrowana z budynkiem lub wolnostojąca samonośna. Sprawdza się zarówno jako zadaszenie przydomowego tarasu i carportu, jak i w ogródkach letnich restauracji i kawiarni — gdzie chroni meble i gości przed kaprysami pogody.',
  usecases: [
    { img: 'uploads/icons/uc-taras.webp',       label: 'Zadaszenie tarasu i balkonu' },
    { img: 'uploads/icons/uc-wejscie.webp',     label: 'Zadaszenie wejścia do domu' },
    { img: 'uploads/icons/uc-carport.webp',     label: 'Wiata samochodowa' },
    { img: 'uploads/icons/uc-gospodarcza.webp', label: 'Przestrzeń gospodarcza' },
    { img: 'uploads/icons/uc-komercyjna.webp',  label: 'Ogródek gastronomiczny przy restauracji, hotelu lub kawiarni' },
  ],
  features: [
    { label: 'Profile z aluminium ekstrudowanego według własnych projektów' },
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
    { label: 'Grubość szkła bezpiecznego',              value: '44,2 – 55,4 mm' },
    { label: 'Grubość poliwęglanu komorowego',          value: '16 mm' },
  ],
  roofs: [
    {
      id: 'poli',
      name: 'Poliwęglan komorowy 16 mm',
      desc: 'Lekki, wytrzymały i dobrze przepuszczający światło. Krawędzie boczne fabrycznie zamknięte, góra i dół w folii paraizolacyjnej.',
      note: 'Szerokość płyty 98 cm · długość do 500–600 cm · rozstaw osiowy krokwi 100 cm · montaż ze spadkiem 5–8°.',
      options: [
        { name: 'Strong Opal',                sub: 'Maksymalna jasność',          hex: '#f0f1eb', desc: '6-warstwowy (6W). Mleczna barwa dająca maksymalne, rozproszone światło. Waga 2500 g/m².' },
        { name: 'Solar Control Strong Opal',  sub: 'Redukcja UV i temperatury',   hex: '#d7d8d1', desc: '6-warstwowy (6W) z powłoką Opal Cool — redukuje bliską podczerwień, więc pod dachem jest wyraźnie chłodniej. Waga 2500 g/m².' },
        { name: 'BOX Grey',                   sub: 'Stylowe chłodzenie',          hex: '#8790a0', desc: '2-warstwowy (2W). Szara, dymiona barwa — elegancki cień i stylowe chłodzenie. Waga 3600 g/m².' },
      ],
    },
    {
      id: 'szklo',
      name: 'Szkło bezpieczne ESG / VSG',
      desc: 'Naturalne światło i pełna bariera przed deszczem oraz śniegiem. Grubość 8–12 mm zależnie od wysięgu, szerokość tafli do 750 mm.',
      note: 'Długość standardowo do 4000 mm · rozstaw osiowy krokwi 60–75 cm · materiał zamawiany na wymiar.',
      options: [
        { name: 'ESG',      sub: 'Szkło hartowane',    hex: '#eaf3f6', desc: 'Norma PN-EN 12150. Do 7× odporniejsze na uderzenia i naprężenia termiczne; przy stłuczeniu rozpada się na drobne, bezpieczne kawałki.' },
        { name: 'VSG',      sub: 'Szkło laminowane',   hex: '#dfe7ea', desc: 'Norma PN-EN 14449. Tafle sklejone folią PVB/EVA — przy stłuczeniu nie rozpada się i utrzymuje kształt.' },
        { name: 'VSG/ESG',  sub: 'Kombinacja warstw',  hex: '#d3dfe3', desc: 'Laminat z wcześniej hartowanych tafli. Oznaczenia: 44.2 = 2×4 mm + 2 folie, 55.4 = 2×5 mm + 4 folie.' },
      ],
    },
  ],
  construction: [
    { name: 'Słup nośny 150 × 100 × 4 mm', desc: 'Pionowy element przenoszący obciążenia dachu. W jednym ze słupów ukryta jest rura odprowadzająca wodę.' },
    { name: 'Profil wzmacniający 150 × 100 mm', desc: 'Zwiększa sztywność konstrukcji przy dużych rozpiętościach i wysięgu.' },
    { name: 'Rynna z podwójnym dnem', desc: 'Zbiera wodę z całej połaci i kieruje ją do ukrytego odwodnienia w słupie — bez widocznych rur.' },
    { name: 'Krokiew standardowa / wzmocniona', desc: 'Belki nośne dachu. Standardowa do wysięgu 4 m, wzmocniona powyżej 4 m oraz pod cięższe pokrycie szklane.' },
    { name: 'Murłata z uszczelką', desc: 'Profil przyścienny, do którego mocowana jest konstrukcja przy montażu zintegrowanym z budynkiem.' },
    { name: 'Pokrywy krokwi (wewnętrzna i zewnętrzna)', desc: 'Maskują mocowania i krawędzie pokrycia, dając jednolitą, czystą linię dachu.' },
    { name: 'Komplet uszczelek systemowych', desc: 'Uszczelki murłaty, pokrywy i dolna krokwi zapewniają szczelność i chronią pokrycie dachowe.' },
    { name: 'Łączniki montażowe ze stali nierdzewnej', desc: 'Profile 100 × 50, 100 × 60 i 150 × 100 mm; kotwy i śruby nierdzewne — odporność na korozję na lata.' },
  ],
  constructionNote: 'Geometria systemu: maksymalny rozstaw słupów 500 cm, zalecana wysokość przednich słupów 230 cm, standardowy spadek dachu 8°. Rozstaw osiowy krokwi zależy od pokrycia — 100 cm dla poliwęglanu, 60–75 cm dla szkła.',
  coverings: [
    {
      group: 'Poliwęglan komorowy 16 mm',
      desc: 'Lekki, wytrzymały i dobrze przepuszczający światło. Krawędzie boczne fabrycznie zamknięte, górna i dolna zabezpieczone folią paraizolacyjną. Montaż ze spadkiem 5–8°.',
      items: [
        { name: 'Strong Opal — 6-warstwowy (6W)', sub: 'Mleczna barwa, maksymalne i rozproszone światło. 2500 g/m².' },
        { name: 'Solar Control Strong Opal — 6W', sub: 'Powłoka Opal Cool redukuje bliską podczerwień — niższa temperatura pod dachem. 2500 g/m².' },
        { name: 'BOX Grey — 2-warstwowy (2W)', sub: 'Szara, dymiona barwa — stylowe chłodzenie. 3600 g/m².' },
      ],
      params: 'Szerokość płyty 98 cm · długość do 500–600 cm · rozstaw osiowy krokwi 100 cm',
    },
    {
      group: 'Szkło bezpieczne ESG / VSG',
      desc: 'Naturalne światło i pełna bariera przed deszczem oraz śniegiem. Grubość 8–12 mm zależnie od wysięgu, szerokość tafli do 750 mm, długość standardowo do 4000 mm.',
      items: [
        { name: 'ESG — szkło hartowane', sub: 'Norma PN-EN 12150. Do 7× odporniejsze na uderzenia i naprężenia termiczne; rozpada się na drobne, bezpieczne kawałki.' },
        { name: 'VSG — szkło laminowane', sub: 'Norma PN-EN 14449. Tafle sklejone folią PVB/EVA — przy stłuczeniu nie rozpada się i utrzymuje kształt.' },
        { name: 'ESG/VSG — kombinacja', sub: 'Laminat z wcześniej hartowanych tafli. Oznaczenia: 44.2 = 2×4 mm + 2 folie, 55.4 = 2×5 mm + 4 folie.' },
      ],
      params: 'Rozstaw osiowy krokwi 60–75 cm · materiał zamawiany na wymiar',
    },
  ],
  mounting: {
    intro: 'Sposób montażu dobieramy do materiału, z którego zbudowany jest dom i taras — konstrukcję zintegrowaną mocujemy do ściany, samonośną stawiamy na własnych słupach.',
    integrated: ['Pustak ceramiczny', 'Beton komórkowy', 'Silikaty'],
    freestanding: ['Keramzytobeton', 'Drewno'],
    note: 'Kotwy i śruby ze stali nierdzewnej. Słupy mocujemy na łączniku lub betonujemy — o wyborze decyduje obciążenie konstrukcji i stan podłoża.',
    drainage: 'Woda spływa rynną z podwójnym dnem do rury ukrytej w słupie. Odpływ wykonujemy wg potrzeb: żygaczem w grunt, do kanalizacji, do zbiornika na deszczówkę lub do studni chłonnej.',
  },
  care: [
    'Podstawowe czyszczenie co kilka miesięcy: letnia woda z łagodnym detergentem o neutralnym pH, miękka ściereczka lub gąbka. Bez alkoholu, rozpuszczalników, octu i acetonu.',
    'Po umyciu spłukać czystą wodą. Najlepiej czyścić w dni pochmurne lub rano/wieczorem, nie przy mocnym nasłonecznieniu.',
    'Regularnie usuwać z rynny liście i zanieczyszczenia, by zapewnić swobodny odpływ wody.',
    'Przy intensywnych opadach w miarę możliwości usuwać nadmiar śniegu z połaci — nie obciążać dachu.',
    'Inspekcja konstrukcji co 6–12 miesięcy: mocowania, uszczelki, powłoka. Aluminium 6063 jest bezobsługowe i w 100% przetwarzalne.',
  ],
  downloads: [
    { label: 'Instrukcja montażu i użytkowania LINEA', size: 'PDF · 5,9 MB', file: 'uploads/dokumenty/instrukcja-montazu-linea.pdf' },
  ],
  addons: [
    { img: 'uploads/icons/add-drzwi.webp',   title: 'Szklane drzwi przesuwne',          desc: 'Tory o długości do 500 cm, maksymalnie 5 tafli szkła w układzie.' },
    { img: 'uploads/icons/add-screen.webp',  title: 'Rolety zewnętrzne screen',         desc: 'Skuteczna ochrona przeciwsłoneczna i większa prywatność strefy.' },
    { img: 'uploads/icons/add-zaluzje.webp', title: 'Żaluzje pionowe i poziome',        desc: 'Precyzyjna kontrola światła dzięki obrotowym lamelom.' },
    { img: 'uploads/icons/add-panele.webp',  title: 'Nieprzezierne panele dekoracyjne', desc: 'Nadają charakter zabudowie i zapewniają dyskrecję.' },
    { img: 'uploads/icons/add-fix.webp',     title: 'System Fix',                       desc: 'Kliny boczne z poliwęglanu w standardowej wersji.' },
    { img: 'uploads/icons/add-led.webp',     title: 'Liniowe oświetlenie LED',          desc: 'Ukryte w profilu, nastrojowe światło ręczne lub zdalne.' },
  ],
  scenarios: [
    { key: 'silownia', title: 'Domowa siłownia',      desc: 'Zamknięty moduł do treningu na świeżym powietrzu — z pełną zabudową ścian, oświetleniem LED i wentylacją.' },
    { key: 'carport',  title: 'Carport',              desc: 'Zadaszenie dla jednego lub dwóch samochodów. Odwodnienie zintegrowane w słupie, długość do 10 060 mm.' },
    { key: 'skladzik', title: 'Składzik ogrodowy',    desc: 'Zamknięta strefa gospodarcza 506 × 606 cm — na narzędzia, rowery i sprzęt sezonowy.' },
  ],
  examples: [
    {
      img: 'uploads/linea-przyklady/skladzik-drewutnia.webp',
      title: 'Strefa gospodarcza z drewutnią',
      desc: 'Zamknięty składzik z panelami poziomymi i miejscem na drewno kominkowe, połączony z otwartą wiatą. Liniowe LED w krawędzi dachu.',
    },
    {
      img: 'uploads/linea-przyklady/modul-wypoczynkowy.webp',
      title: 'Zamknięty moduł wypoczynkowy',
      desc: 'Salon ogrodowy za szklanymi drzwiami przesuwnymi — żaluzje pionowe od strony sąsiada, pełna zabudowa ścian i oświetlenie LED.',
    },
    {
      img: 'uploads/linea-przyklady/domowa-silownia.webp',
      title: 'Domowa siłownia pod zadaszeniem',
      desc: 'Strefa treningowa z roletami screen chroniącymi przed słońcem i wzrokiem z zewnątrz. Część otwarta pozostaje miejscem wypoczynku.',
    },
    {
      img: 'uploads/linea-przyklady/carport-zabudowa.webp',
      title: 'Carport z modułem zamkniętym',
      desc: 'Długie zadaszenie samonośne — miejsce postojowe dla auta i przeszklony moduł gospodarczy w jednej konstrukcji do 10 060 mm.',
    },
    {
      img: 'uploads/linea-przyklady/ogrod-zimowy.webp',
      title: 'Ogród letni przy domu',
      desc: 'Zadaszenie przyścienne z pełną zabudową szkłem ESG/VSG — osłonięty taras do wykorzystania przez cały ciepły sezon, niezależnie od pogody.',
    },
    {
      img: 'uploads/linea-przyklady/zaluzje-screen.webp',
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
  heroImg: 'assets/wiz-d.webp',
  intro: 'ALUKOMFORT HORIZON to luksusowa pergola bioklimatyczna dla najbardziej wymagających klientów — zadaszenie z pełną kontrolą nad światłem i otoczeniem. Znakiem rozpoznawczym jest smukły wieniec konstrukcyjny o wysokości 280 mm, w którym ukryta jest cała technologia — odprowadzanie wody, oświetlenie i automatyka.',
  variants: [
    {
      id: 'L',
      name: 'HORIZON L',
      desc: 'Dach lamelowy bioklimatyczny',
      img: 'uploads/horizon-modele/wariant-l.webp',
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
      img: 'uploads/horizon-modele/wariant-s.webp',
      description: 'Zadaszenie z dachem z wysokiej klasy szkła bezpiecznego ESG + VSG laminowanego 44.2 lub 55.2 (grubość 44.2–55.4 mm). Maksymalna szerokość tafli 750 mm. Realizowane pod indywidualny wymiar — nieprzesłonięte niebo przy pełnej ochronie przed deszczem.',
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
      img: 'uploads/horizon-modele/wariant-ls.webp',
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
    { img: 'uploads/icons/hz-wieniec.webp',     label: 'Smukły wieniec konstrukcyjny 280 mm — ukrywa technologię' },
    { img: 'uploads/icons/hz-dach.webp',        label: 'Minimalistyczna, płaska linia dachu' },
    { img: 'uploads/icons/hz-odwodnienie.webp', label: 'Ukryty system odprowadzania wody w słupach' },
    { img: 'uploads/icons/hz-automatyka.webp',  label: 'Automatyka pogodowa z czujnikami i sterowaniem SOMFY' },
    { img: 'uploads/icons/hz-led.webp',         label: 'Liniowe oświetlenie LED ukryte w wieńcu' },
    { img: 'uploads/icons/hz-sciany.webp',      label: 'Ściany: szyby przesuwne, aluminiowe shuttery, rolety screen' },
    { img: 'uploads/icons/usp-material.webp',   label: 'Profile ze stopu aluminium 6063 — odporność na korozję' },
    { img: 'uploads/icons/hz-normy.webp',       label: 'Zgodność z EN 1991-1-1/3/4 (obciążenia, śnieg, wiatr)' },
  ],
  uses: [
    { img: 'uploads/icons/hz-taras.webp',    label: 'Zadaszenie tarasu i balkonu' },
    { img: 'uploads/icons/hz-grill.webp',    label: 'Letnia kuchnia z grillem' },
    { img: 'uploads/icons/hz-basen.webp',    label: 'Plenerowa siłownia, basen lub prywatne SPA' },
    { img: 'uploads/icons/hz-bar.webp',      label: 'Luksusowe beach bary, restauracje i strefy VIP w hotelach' },
    { img: 'uploads/icons/hz-wejscie.webp',  label: 'Reprezentacyjne zadaszenia wejść biur i hoteli' },
    { img: 'uploads/icons/hz-carport.webp',  label: 'Carport i strefa gospodarcza' },
  ],
  models: [
    { id: 'stdL', name: 'HORIZON L 43',  roof: 'Dach lamelowy',          size: '4 × 3 m', note: 'Najmniejszy moduł standardowy.' },
    { id: 'stdS', name: 'HORIZON S 44',  roof: 'Dach szklany',           size: '4 × 4 m', note: 'Dach przezroczysty, pod indywidualny wymiar.' },
    { id: 'lux',  name: 'HORIZON L 64',  roof: 'Dach lamelowy',          size: '6 × 4 m', note: 'Popularny rozmiar nad taras.' },
    { id: 'dlux', name: 'HORIZON L-S 84', roof: 'Dach hybrydowy',         size: '8 × 4 m', note: 'Lamele i szkło w jednej bryle.' },
  ],
  coreNote: 'Zamknięte moduły zabudowy oferujemy jako gotowe systemy CORE — dla dachu szklanego: CORE S 44, CORE S 64 i CORE S 84, a dla dachu lamelowego i hybrydowego: CORE L 44, CORE L-S 64 i CORE L-S 84. Zabudowa ścian nie wpływa na statykę konstrukcji.',
  construction: [
    { name: 'Aluminium konstrukcyjne odporne na korozję', desc: 'Wysokiej klasy stop, odporny na warunki atmosferyczne — optyczna lekkość przy dużej wytrzymałości.' },
    { name: 'Trwałe połączenia skręcane', desc: 'Skręcane węzły i precyzyjna geometria profili zapewniają stabilność całego systemu przez lata.' },
    { name: 'Wieniec konstrukcyjny 280 mm', desc: 'Ukrywa odwodnienie, oświetlenie LED i automatykę — minimalistyczna, płaska linia dachu bez widocznych kabli i rur.' },
    { name: 'Ruchome lamele aluminiowe (wariant L / L-S)', desc: 'Precyzyjne mechanizmy obrotu lameli minimalizujące ryzyko zakleszczeń; pełne zamknięcie, regulacja kąta lub częściowe otwarcie.' },
    { name: 'Krokiew wzmocniona pod szkło (wariant S / L-S)', desc: 'Przeznaczona do dachów szklanych o wysięgu powyżej 4 m — chroni przed ugięciem i działaniem sił zewnętrznych.' },
    { name: 'Zintegrowane odprowadzanie wody', desc: 'Systemy eliminujące zaleganie wody na dachu, z odpływem ukrytym w konstrukcji.' },
  ],
  constructionNote: 'Konstrukcja przyścienna lub wolnostojąca o maksymalnej wysokości 280 cm. Sterowanie lameli silnikami SOMFY (ręcznie, pilotem lub aplikacją), z opcjonalną automatyką pogodową. Zgodność z normami obciążeń EN 1991-1-3 (śnieg) i EN 1991-1-4 (wiatr).',
  care: [
    'Czyszczenie letnią wodą z łagodnym detergentem o neutralnym pH, miękką ściereczką. Bez alkoholu, rozpuszczalników, octu i acetonu.',
    'Regularnie usuwać liście i zanieczyszczenia z odwodnienia i prowadnic lameli.',
    'Przy intensywnych opadach śniegu odśnieżać dach zgodnie z przepisami prawa budowlanego — nie obciążać konstrukcji.',
    'Inspekcja co 6–12 miesięcy: mocowania, mechanizmy obrotu lameli, uszczelki i powłoka. Aluminium jest bezobsługowe i w pełni przetwarzalne.',
  ],
  downloads: [
    { label: 'Karta produktu HORIZON L (dach lamelowy)', size: 'PDF · 2,2 MB', file: 'uploads/dokumenty/karta-horizon-l.pdf' },
    { label: 'Karta produktu HORIZON S (dach szklany)', size: 'PDF · 3,5 MB', file: 'uploads/dokumenty/karta-horizon-s.pdf' },
  ],
  addons: [
    { img: 'uploads/icons/add-led.webp',       title: 'Liniowe oświetlenie LED',     desc: 'Ukryte w wieńcu 280 mm — światło nastrojowe ręcznie lub zdalnie.' },
    { img: 'uploads/icons/hz-pogoda.webp',     title: 'Automatyka pogodowa',         desc: 'Czujniki deszczu, wiatru i nasłonecznienia. Lamele reagują same.' },
    { img: 'uploads/icons/add-drzwi.webp',     title: 'Szklane ściany przesuwne',    desc: 'Przesuwne lub stałe — do 5 tafli szkła na torach do 500 cm.' },
    { img: 'uploads/icons/add-zaluzje.webp',   title: 'Aluminiowe shuttery',         desc: 'Żaluzje poziome i pionowe — cień, prywatność, ochrona przed wiatrem.' },
    { img: 'uploads/icons/add-screen.webp',    title: 'Rolety zewnętrzne screen',    desc: 'Filtracja światła i widoku z zachowaniem przewiewu.' },
  ],
  dluxSpecs: [
    'Smukły wieniec konstrukcyjny 280 mm ukrywa technologię',
    'Odwodnienie zintegrowane w słupach — brak zewnętrznych rur',
    'Sterowanie SOMFY zgodne z systemem inteligentnego domu',
    'Ściany do wyboru: szyby przesuwne, shuttery, rolety screen',
  ],
  examples: [
    {
      img: 'uploads/horizon-przyklady/przyscienna-lounge.webp',
      title: 'Pergola przyścienna ze strefą lounge',
      desc: 'HORIZON L zintegrowany z bryłą domu — lamele dawkują światło nad wypoczynkiem, a wieczorem strefę oświetla liniowe LED w wieńcu.',
    },
    {
      img: 'uploads/horizon-przyklady/pergola-lamelowa-szklo.webp',
      title: 'Wolnostojąca pergola z szybami przesuwnymi',
      desc: 'HORIZON L na środku ogrodu — szklane ściany przesuwne chronią przed wiatrem, nie odcinając widoku na zieleń.',
    },
    {
      img: 'uploads/horizon-przyklady/jadalnia-grill-orig.webp',
      title: 'Podwójny moduł z jadalnią i grillem',
      desc: 'Dwa segmenty HORIZON L w jednej linii — osobna strefa wypoczynku i ogrodowa jadalnia z miejscem na grill.',
    },
    {
      img: 'uploads/horizon-przyklady/lounge-palenisko.webp',
      title: 'Salon ogrodowy z paleniskiem',
      desc: 'Otwarte lamele nad paleniskiem odprowadzają ciepło i dym, a zabudowane ściany osłaniają strefę po zmroku.',
    },
    {
      img: 'uploads/horizon-przyklady/ogrod-zimowy-szklo.webp',
      title: 'Ogród letni przy domu',
      desc: 'HORIZON S z dachem ze szkła bezpiecznego — narożna zabudowa tarasu na ciepły sezon, z nieprzesłoniętym niebem.',
    },
    {
      img: 'uploads/horizon-przyklady/letnia-kuchnia-basen.webp',
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
  heroImg: 'assets/wiz-c.webp',
  intro: 'ALUKOMFORT ROMA to pergola tkaninowa, w której roleta rzymska z akrylowego płótna pełni rolę dynamicznego poszycia dachu. System pozwala regulować ilość światła, daje przyjemny cień w upale i tworzy lekką, nowoczesną przestrzeń wypoczynkową. To zadaszenie sprawdza się nad tarasem, w ogrodzie i w strefie gastronomicznej.',
  features: [
    { img: 'uploads/icons/rm-platno.webp',    label: 'Poszycie z płótna 100% akryl — ochrona UV i miękki cień' },
    { img: 'uploads/icons/usp-material.webp', label: 'Konstrukcja z ekstrudowanego stopu aluminium 6063' },
    { img: 'uploads/icons/rm-moduly.webp',    label: 'Modułowość — gotowe moduły łączliwe dla dużych przestrzeni' },
    { img: 'uploads/icons/hz-pogoda.webp',    label: 'Opcjonalna automatyka pogodowa' },
    { img: 'uploads/icons/add-led.webp',      label: 'Opcjonalne liniowe oświetlenie LED' },
    { img: 'uploads/icons/hz-sciany.webp',    label: 'System ścian bocznych — szkło, rolety screen, panele' },
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
    { img: 'uploads/icons/rc-slupy.webp',      label: 'Słupy aluminiowe' },
    { img: 'uploads/icons/rc-belka.webp',      label: 'Belka kalenicowa' },
    { img: 'uploads/icons/rm-platno.webp',     label: 'Płótno akrylowe 100%' },
    { img: 'uploads/icons/rc-rolka.webp',      label: 'Rolka prosta i kątowa z mocowaniem linki' },
    { img: 'uploads/icons/rc-rama.webp',       label: 'Rama nośna' },
    { img: 'uploads/icons/add-led.webp',       label: 'Listwy LED (opcja)' },
    { img: 'uploads/icons/rc-prowadnica.webp', label: 'Prowadnice 40 × 40 mm' },
    { img: 'uploads/icons/rc-wieszak.webp',    label: 'Wieszaki 40 × 25 mm' },
    { img: 'uploads/icons/rc-zaslepka.webp',   label: 'Boczki aluminiowe i zaślepki szyn' },
    { img: 'uploads/icons/rc-donica.webp',     label: 'Donice dekoracyjne (opcja)' },
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
      img: 'uploads/roma-przyklady/jadalnia-ogrodowa.webp',
      title: 'Jadalnia ogrodowa pod roletą',
      desc: 'Rozłożona roleta rzymska daje miękki cień nad stołem — tkanina akrylowa filtruje światło bez efektu ciemnej plamy.',
    },
    {
      img: 'uploads/roma-przyklady/wieczorny-salon-led.webp',
      title: 'Wieczorny salon z oświetleniem LED',
      desc: 'Liniowe LED między fałdami tkaniny tworzą nastrojowe światło — pergola pracuje także po zmroku.',
    },
    {
      img: 'uploads/roma-przyklady/strefa-wypoczynku.webp',
      title: 'Strefa wypoczynku w ogrodzie',
      desc: 'Wolnostojący moduł z siatkami aluminiowymi pod pnącza — lekka alternatywa dla ciężkiej zabudowy tarasu.',
    },
    {
      img: 'uploads/roma-przyklady/taras-restauracji.webp',
      title: 'Taras restauracji nad wodą',
      desc: 'Moduły ROMA połączone w jedną linię zadaszenia — ogródek restauracyjny działa niezależnie od słońca.',
    },
    {
      img: 'uploads/roma-przyklady/ogrodek-kawiarni.webp',
      title: 'Ogródek letni kawiarni',
      desc: 'Kompaktowy moduł nad stolikami bistro — przyciąga gości i wydłuża sezon ogródka o chłodniejsze miesiące.',
    },
    {
      img: 'uploads/roma-przyklady/strefa-basen.webp',
      title: 'Strefa relaksu przy basenie',
      desc: 'Leżaki w miękkim cieniu rolety rzymskiej — tkanina akrylowa odporna na UV i wilgoć sprawdza się tuż przy wodzie.',
    },
  ],
};

const CERTIFICATES = [
  { label: 'Certyfikat ZKP — PN-EN 1090-1 (PL)', size: 'PDF · 0,4 MB', file: 'uploads/certyfikaty/tuv-nord-zkp-1090-PL.pdf' },
  { label: 'Certificate ZKP — PN-EN 1090-1 (EN)', size: 'PDF · 0,4 MB', file: 'uploads/certyfikaty/tuv-nord-zkp-1090-EN.pdf' },
  { label: 'Zertifikat ZKP — PN-EN 1090-1 (DE)', size: 'PDF · 0,4 MB', file: 'uploads/certyfikaty/tuv-nord-zkp-1090-DE.pdf' },
  { label: 'Raport badań PN-EN 1090 + ISO 3834 (PL/EN)', size: 'PDF · 18 MB', file: 'uploads/certyfikaty/tuv-nord-raport-1090-3834.pdf' },
];

window.PRODUCTS = { LINEA, HORIZON, ROMA };
window.CERTIFICATES = CERTIFICATES;
window.COLORS_BASE = COLORS_BASE;
window.COLORS_PREMIUM = COLORS_PREMIUM;
