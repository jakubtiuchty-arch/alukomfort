// Strona /regulamin — regulamin świadczenia usług drogą elektroniczną (UŚUDE)
// Usługodawca: Plast-Met Systemy Ogrodzeniowe Sp. z o.o. Sp.k.

function PageRegulamin() {
  usePageMeta({
    title: 'Regulamin serwisu | ALUKOMFORT — Plast-Met',
    description: 'Regulamin świadczenia usług drogą elektroniczną w serwisie ALUKOMFORT (www.zadaszeniatrzebnica.pl) — zasady korzystania, formularz kontaktowy, konfigurator wizualizacji, reklamacje.',
    canonical: 'https://www.zadaszeniatrzebnica.pl/regulamin',
  });

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Strona główna', href: '/' },
        { label: 'Regulamin' },
      ]} />

      <section className="onas-hero">
        <div className="container">
          <div className="onas-hero__eyebrow">ALUKOMFORT · PLAST-MET</div>
          <h1 className="onas-hero__title">Regulamin serwisu</h1>
          <p className="onas-hero__lead">
            Regulamin określa zasady korzystania z serwisu www.zadaszeniatrzebnica.pl oraz świadczenia usług drogą elektroniczną
            zgodnie z ustawą z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container legal">
          <p className="legal__meta">Ostatnia aktualizacja: 14 czerwca 2026 r.</p>

          <h2>§1. Postanowienia ogólne</h2>
          <ol className="legal__ol">
            <li>
              Niniejszy Regulamin określa zasady świadczenia usług drogą elektroniczną za pośrednictwem serwisu
              internetowego dostępnego pod adresem <strong>www.zadaszeniatrzebnica.pl</strong> (dalej: „Serwis").
            </li>
            <li>
              Usługodawcą i właścicielem Serwisu jest <strong>Plast-Met Systemy Ogrodzeniowe Sp. z o.o. Sp.k.</strong>{' '}
              z siedzibą w Trzebnicy (55-100), ul. Milicka 34A, KRS 0000532739, NIP 9151793747, REGON 360251140
              (dalej: „Usługodawca"). ALUKOMFORT jest marką handlową Usługodawcy.
            </li>
            <li>
              Kontakt z Usługodawcą jest możliwy pod adresem e-mail <a href="mailto:biuro@plast-met.pl">biuro@plast-met.pl</a>{' '}
              oraz telefonicznie pod numerem <a href="tel:+48713120793">+48 (71) 312 07 93</a>.
            </li>
            <li>
              Użytkownikiem jest każda osoba korzystająca z Serwisu. Korzystanie z Serwisu oznacza akceptację
              niniejszego Regulaminu.
            </li>
          </ol>

          <h2>§2. Rodzaje i zakres usług</h2>
          <ol className="legal__ol">
            <li>Za pośrednictwem Serwisu Usługodawca świadczy nieodpłatnie następujące usługi drogą elektroniczną:
              <ul className="legal__list">
                <li>udostępnianie treści informacyjnych o produktach i działalności (przeglądanie Serwisu);</li>
                <li>formularz kontaktowy oraz formularz zapytania o bezpłatną wycenę;</li>
                <li>konfigurator wizualizacji generujący poglądowy podgląd zadaszenia na zdjęciu (dalej: „Konfigurator").</li>
              </ul>
            </li>
            <li>
              Usługi świadczone są w języku polskim i mają charakter informacyjny oraz służą nawiązaniu kontaktu
              handlowego. Za pośrednictwem Serwisu nie są zawierane umowy sprzedaży ani nie jest prowadzona
              sprzedaż na odległość.
            </li>
            <li>
              Prezentowane w Serwisie produkty, opisy oraz ewentualne ceny i wyceny nie stanowią oferty
              w rozumieniu art. 66 Kodeksu cywilnego, lecz zaproszenie do zawarcia umowy (art. 71 Kodeksu cywilnego).
            </li>
          </ol>

          <h2>§3. Warunki techniczne</h2>
          <ol className="legal__ol">
            <li>Do korzystania z Serwisu niezbędne jest:
              <ul className="legal__list">
                <li>urządzenie z dostępem do sieci Internet;</li>
                <li>aktualna przeglądarka internetowa z włączoną obsługą JavaScript;</li>
                <li>aktywne konto poczty elektronicznej — w przypadku usług wymagających podania adresu e-mail.</li>
              </ul>
            </li>
            <li>
              Usługodawca dokłada starań, aby Serwis działał nieprzerwanie, zastrzega jednak możliwość czasowych
              przerw technicznych wynikających z konserwacji lub przyczyn niezależnych.
            </li>
          </ol>

          <h2>§4. Konfigurator wizualizacji</h2>
          <ol className="legal__ol">
            <li>
              Konfigurator umożliwia wygenerowanie poglądowej grafiki przedstawiającej wybrany system zadaszenia
              na podstawie zdjęcia przesłanego przez Użytkownika oraz wybranych parametrów.
            </li>
            <li>
              Przesyłając zdjęcie, Użytkownik oświadcza, że posiada prawa do jego wykorzystania oraz że zdjęcie
              <strong> nie zawiera wizerunków osób</strong> ani innych treści, których przetwarzanie naruszałoby
              prawa osób trzecich lub przepisy prawa.
            </li>
            <li>
              Wygenerowana wizualizacja ma charakter <strong>wyłącznie poglądowy i orientacyjny</strong>. Nie
              odzwierciedla rzeczywistych wymiarów, kolorystyki, proporcji ani warunków montażu i nie stanowi
              projektu technicznego, oferty ani gwarancji wykonania. Wiążące parametry i cena ustalane są wyłącznie
              w indywidualnej wycenie i umowie.
            </li>
            <li>
              Szczegóły przetwarzania zdjęć i danych w ramach Konfiguratora, w tym powierzenia ich zewnętrznemu
              dostawcy usługi generowania grafiki, opisuje <a href="/polityka-prywatnosci">Polityka prywatności</a>.
            </li>
          </ol>

          <h2>§5. Zakaz dostarczania treści bezprawnych</h2>
          <ol className="legal__ol">
            <li>
              Użytkownika obowiązuje zakaz dostarczania treści o charakterze bezprawnym, w tym przesyłania
              za pośrednictwem formularzy lub Konfiguratora treści naruszających prawo, dobra osobiste lub prawa
              osób trzecich (art. 8 ust. 3 pkt 2 lit. b ustawy o świadczeniu usług drogą elektroniczną).
            </li>
            <li>
              Użytkownik zobowiązany jest do korzystania z Serwisu w sposób zgodny z prawem, dobrymi obyczajami oraz
              niezakłócający jego funkcjonowania.
            </li>
          </ol>

          <h2>§6. Własność intelektualna</h2>
          <ol className="legal__ol">
            <li>
              Treści Serwisu — w tym teksty, zdjęcia, grafiki, logotypy i znaki towarowe (w szczególności znak
              ALUKOMFORT i PLAST-MET) — podlegają ochronie prawnej i stanowią własność Usługodawcy lub są
              wykorzystywane na podstawie odpowiednich uprawnień.
            </li>
            <li>
              Kopiowanie, rozpowszechnianie lub inne wykorzystanie treści Serwisu bez zgody Usługodawcy jest
              niedozwolone, z wyjątkiem dozwolonego użytku przewidzianego prawem.
            </li>
          </ol>

          <h2>§7. Reklamacje</h2>
          <ol className="legal__ol">
            <li>
              Reklamacje dotyczące usług świadczonych drogą elektroniczną można składać na adres e-mail
              <a href="mailto:biuro@plast-met.pl"> biuro@plast-met.pl</a> lub pisemnie na adres siedziby
              Usługodawcy.
            </li>
            <li>
              Reklamacja powinna zawierać opis problemu oraz dane kontaktowe umożliwiające udzielenie odpowiedzi.
            </li>
            <li>
              Usługodawca rozpatruje reklamację i udziela odpowiedzi w terminie <strong>14 dni</strong> od jej
              otrzymania, na adres podany przez składającego.
            </li>
          </ol>

          <h2>§8. Rezygnacja z usług</h2>
          <ol className="legal__ol">
            <li>
              Usługi świadczone są na żądanie Użytkownika i mają charakter jednorazowy lub ciągły. Użytkownik może
              w każdej chwili zaprzestać korzystania z Serwisu.
            </li>
            <li>
              Zaprzestanie korzystania z usług nieodpłatnych następuje przez opuszczenie Serwisu lub niewysyłanie
              kolejnych zapytań i nie wiąże się z żadnymi kosztami.
            </li>
          </ol>

          <h2>§9. Dane osobowe</h2>
          <p>
            Zasady przetwarzania danych osobowych Użytkowników, informacje o podstawach prawnych, odbiorcach danych
            oraz prawach przysługujących osobom, których dane dotyczą, określa <a href="/polityka-prywatnosci">Polityka
            prywatności</a>, stanowiąca integralną część niniejszego Regulaminu.
          </p>

          <h2>§10. Pozasądowe rozwiązywanie sporów (konsumenci)</h2>
          <p>
            Konsument może skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń,
            m.in. zwracając się do wojewódzkiego inspektora Inspekcji Handlowej lub do powiatowego (miejskiego)
            rzecznika konsumentów. Szczegółowe informacje dostępne są na stronie Urzędu Ochrony Konkurencji
            i Konsumentów (<a href="https://uokik.gov.pl" target="_blank" rel="noopener">uokik.gov.pl</a>).
          </p>

          <h2>§11. Postanowienia końcowe</h2>
          <ol className="legal__ol">
            <li>W sprawach nieuregulowanych Regulaminem zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu cywilnego oraz ustawy o świadczeniu usług drogą elektroniczną.</li>
            <li>Usługodawca zastrzega prawo do zmiany Regulaminu z ważnych przyczyn (np. zmiana przepisów lub zakresu usług). Zmiany obowiązują od chwili publikacji w Serwisie. Do usług rozpoczętych przed zmianą stosuje się Regulamin w brzmieniu dotychczasowym.</li>
            <li>Regulamin jest dostępny nieodpłatnie w Serwisie w formie umożliwiającej jego pobranie, odtworzenie i utrwalenie.</li>
          </ol>
        </div>
      </section>
    </>
  );
}

window.PageRegulamin = PageRegulamin;
