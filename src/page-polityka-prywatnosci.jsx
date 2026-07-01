// Strona /polityka-prywatnosci — zgodna z RODO, UŚUDE i PKE (cookies)
// Administrator: Plast-Met Systemy Ogrodzeniowe Sp. z o.o. Sp.k.

function PagePrivacy() {
  usePageMeta({
    title: 'Polityka prywatności | ALUKOMFORT — Plast-Met',
    description: 'Polityka prywatności serwisu ALUKOMFORT (www.zadaszeniatrzebnica.pl). Zasady przetwarzania danych osobowych zgodnie z RODO, informacja o plikach cookies i prawach użytkowników.',
    canonical: 'https://www.zadaszeniatrzebnica.pl/#/polityka-prywatnosci',
  });

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Strona główna', href: '#/' },
        { label: 'Polityka prywatności' },
      ]} />

      <section className="onas-hero">
        <div className="container">
          <div className="onas-hero__eyebrow">ALUKOMFORT · PLAST-MET</div>
          <h1 className="onas-hero__title">Polityka prywatności</h1>
          <p className="onas-hero__lead">
            Dokument wyjaśnia, jakie dane osobowe zbieramy w serwisie www.zadaszeniatrzebnica.pl, w jakim celu i na jakiej
            podstawie prawnej je przetwarzamy oraz jakie prawa przysługują Ci w związku z ich przetwarzaniem.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container legal">
          <p className="legal__meta">Ostatnia aktualizacja: 14 czerwca 2026 r.</p>

          <h2>1. Administrator danych osobowych</h2>
          <p>
            Administratorem Twoich danych osobowych jest <strong>Plast-Met Systemy Ogrodzeniowe Sp. z o.o.
            Sp.k.</strong> z siedzibą w Trzebnicy (55-100), przy ul. Milickiej 34A, wpisana do rejestru
            przedsiębiorców Krajowego Rejestru Sądowego pod numerem <strong>KRS 0000532739</strong>,
            NIP <strong>9151793747</strong>, REGON <strong>360251140</strong> (dalej: „Administrator" lub „my").
            ALUKOMFORT jest marką handlową Administratora.
          </p>
          <ul className="legal__list">
            <li>E-mail: <a href="mailto:biuro@plast-met.pl">biuro@plast-met.pl</a></li>
            <li>Telefon: <a href="tel:+48713120793">+48 (71) 312 07 93</a></li>
            <li>Adres korespondencyjny: ul. Milicka 34A, 55-100 Trzebnica</li>
          </ul>
          <p>
            We wszystkich sprawach dotyczących przetwarzania danych osobowych oraz korzystania z przysługujących
            Ci praw możesz skontaktować się z nami pod powyższymi danymi. Administrator nie ma obowiązku powołania
            inspektora ochrony danych.
          </p>

          <h2>2. Jakie dane zbieramy, w jakim celu i na jakiej podstawie</h2>
          <p>Dane osobowe przetwarzamy wyłącznie w zakresie niezbędnym do realizacji poniższych celów.</p>

          <div className="legal__table-wrap">
            <table className="legal__table">
              <thead>
                <tr>
                  <th>Cel przetwarzania</th>
                  <th>Zakres danych</th>
                  <th>Podstawa prawna (RODO)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Obsługa zapytania z formularza kontaktowego oraz prowadzenie korespondencji</td>
                  <td>imię i nazwisko, adres e-mail, numer telefonu (opcjonalnie), treść wiadomości</td>
                  <td>art. 6 ust. 1 lit. b (czynności zmierzające do zawarcia umowy) oraz art. 6 ust. 1 lit. f (prawnie uzasadniony interes — udzielenie odpowiedzi)</td>
                </tr>
                <tr>
                  <td>Przygotowanie bezpłatnej, indywidualnej wyceny zadaszenia (formularz „Zamów wycenę")</td>
                  <td>imię i nazwisko, adres e-mail, telefon, dane o oczekiwanym produkcie i parametrach</td>
                  <td>art. 6 ust. 1 lit. b (działania na żądanie osoby przed zawarciem umowy)</td>
                </tr>
                <tr>
                  <td>Wygenerowanie poglądowej wizualizacji pergoli na przesłanym zdjęciu (konfigurator wizualizacji) oraz kontakt handlowy w sprawie wyceny</td>
                  <td>adres e-mail, telefon, adres/lokalizacja inwestycji (opcjonalnie), uwagi, <strong>zdjęcie nieruchomości</strong> przesłane przez użytkownika</td>
                  <td>art. 6 ust. 1 lit. a (zgoda) oraz art. 6 ust. 1 lit. b (działania przed zawarciem umowy)</td>
                </tr>
                <tr>
                  <td>Zapewnienie bezpieczeństwa serwisu, diagnostyka i statystyka techniczna</td>
                  <td>adres IP, typ przeglądarki (user-agent), data i godzina zapytania, logi serwera</td>
                  <td>art. 6 ust. 1 lit. f (prawnie uzasadniony interes — bezpieczeństwo i prawidłowe działanie serwisu)</td>
                </tr>
                <tr>
                  <td>Ustalenie, dochodzenie lub obrona ewentualnych roszczeń</td>
                  <td>dane podane w ramach powyższych celów</td>
                  <td>art. 6 ust. 1 lit. f (prawnie uzasadniony interes)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>3. Konfigurator wizualizacji — zdjęcia</h2>
          <p>
            Jeżeli korzystasz z konfiguratora wizualizacji, przesłane przez Ciebie zdjęcie przekazujemy do zewnętrznego
            dostawcy usługi generowania grafiki (OpenAI, L.L.C.) <strong>wyłącznie w celu jednorazowego wygenerowania
            wizualizacji</strong>. Zgodnie z polityką OpenAI dotyczącą interfejsu API, dane przesyłane przez API
            <strong> nie są wykorzystywane do trenowania modeli</strong>; mogą być przez OpenAI przechowywane przez
            okres do 30 dni wyłącznie w celu wykrywania nadużyć, a następnie są usuwane. Prosimy o nieprzesyłanie
            zdjęć zawierających wizerunki osób ani innych danych, na których przetwarzanie nie masz podstawy.
            Wygenerowana grafika ma charakter wyłącznie poglądowy.
          </p>

          <h2>4. Odbiorcy danych i podmioty przetwarzające</h2>
          <p>
            Twoje dane możemy powierzać zaufanym dostawcom usług, którzy przetwarzają je w naszym imieniu na
            podstawie umów powierzenia przetwarzania danych:
          </p>
          <ul className="legal__list">
            <li><strong>Vercel Inc.</strong> — hosting serwisu i obsługa funkcji serwerowych;</li>
            <li><strong>OpenAI, L.L.C.</strong> — wygenerowanie wizualizacji w konfiguratorze;</li>
            <li><strong>Resend (Plus Five Five, Inc.)</strong> — dostarczanie wiadomości e-mail (powiadomienia o zapytaniach);</li>
            <li><strong>Google Ireland Ltd.</strong> — udostępnianie czcionek internetowych (Google Fonts) ładowanych podczas wyświetlania strony.</li>
          </ul>
          <p>
            Dane mogą być też udostępnione podmiotom uprawnionym na podstawie przepisów prawa oraz — w niezbędnym
            zakresie — podmiotom świadczącym nam usługi prawne lub księgowe.
          </p>

          <h2>5. Przekazywanie danych poza Europejski Obszar Gospodarczy</h2>
          <p>
            Część wskazanych powyżej dostawców (m.in. OpenAI, Vercel, Google) ma siedzibę lub przetwarza dane
            w Stanach Zjednoczonych. Przekazywanie danych poza EOG odbywa się z zachowaniem zabezpieczeń wymaganych
            przez RODO — na podstawie decyzji Komisji Europejskiej (ramy ochrony danych UE–USA, „EU-US Data Privacy
            Framework") lub standardowych klauzul umownych (art. 46 RODO). Kopię stosowanych zabezpieczeń możesz
            uzyskać, kontaktując się z nami.
          </p>

          <h2>6. Okres przechowywania danych</h2>
          <ul className="legal__list">
            <li>dane z zapytań i korespondencji — przez czas niezbędny do obsługi sprawy, a następnie do czasu przedawnienia ewentualnych roszczeń;</li>
            <li>dane przetwarzane na podstawie zgody — do czasu jej cofnięcia;</li>
            <li>dane związane z zawartą umową — przez okres jej realizacji oraz przez okres wymagany przepisami (m.in. podatkowymi);</li>
            <li>logi serwera — przez okres niezbędny dla bezpieczeństwa, zwykle nie dłużej niż 12 miesięcy.</li>
          </ul>

          <h2>7. Twoje prawa</h2>
          <p>W związku z przetwarzaniem danych przysługuje Ci prawo do:</p>
          <ul className="legal__list">
            <li>dostępu do danych oraz uzyskania ich kopii;</li>
            <li>sprostowania (poprawiania) danych;</li>
            <li>usunięcia danych („prawo do bycia zapomnianym");</li>
            <li>ograniczenia przetwarzania;</li>
            <li>przenoszenia danych;</li>
            <li>wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie;</li>
            <li>cofnięcia zgody w dowolnym momencie — bez wpływu na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem;</li>
            <li>wniesienia skargi do organu nadzorczego — Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).</li>
          </ul>
          <p>Aby skorzystać z powyższych praw, skontaktuj się z nami pod adresem <a href="mailto:biuro@plast-met.pl">biuro@plast-met.pl</a>.</p>

          <h2>8. Dobrowolność podania danych</h2>
          <p>
            Podanie danych jest dobrowolne, jednak niezbędne do realizacji wybranej usługi — np. udzielenia
            odpowiedzi na zapytanie, przygotowania wyceny czy wygenerowania wizualizacji. Brak podania danych
            uniemożliwia skorzystanie z tych funkcji.
          </p>

          <h2>9. Zautomatyzowane podejmowanie decyzji i profilowanie</h2>
          <p>
            Nie podejmujemy wobec Ciebie decyzji opierających się wyłącznie na zautomatyzowanym przetwarzaniu,
            w tym profilowaniu, które wywoływałyby skutki prawne lub w podobny sposób istotnie na Ciebie wpływały.
            Konfigurator wizualizacji generuje wyłącznie poglądową grafikę i nie podejmuje decyzji dotyczących Twojej osoby.
          </p>

          <h2>10. Pliki cookies i pamięć lokalna</h2>
          <p>
            Serwis korzysta z plików cookies oraz technologii pamięci lokalnej przeglądarki (localStorage)
            zgodnie z art. 398 ustawy z dnia 12 lipca 2024 r. — Prawo komunikacji elektronicznej.
          </p>
          <ul className="legal__list">
            <li><strong>Cookies i dane niezbędne (techniczne)</strong> — konieczne do prawidłowego działania serwisu i jego funkcji; ich wykorzystanie nie wymaga zgody.</li>
            <li><strong>Pamięć lokalna (localStorage)</strong> — wykorzystywana funkcjonalnie, m.in. do tymczasowego zapamiętania danych wpisanych w formularzach po stronie Twojej przeglądarki; dane te nie są wysyłane na nasz serwer bez Twojego działania.</li>
            <li><strong>Czcionki Google Fonts</strong> — podczas wyświetlania strony Twoja przeglądarka łączy się z serwerami Google w celu pobrania czcionek, co może wiązać się z przetwarzaniem adresu IP przez Google.</li>
          </ul>
          <p>
            Serwis <strong>nie wykorzystuje obecnie cookies marketingowych ani narzędzi analitycznych</strong>
            (np. Google Analytics). Zakresem i czasem przechowywania plików cookies możesz zarządzać w ustawieniach
            swojej przeglądarki — możesz je blokować lub usuwać, co może jednak ograniczyć działanie niektórych
            funkcji serwisu.
          </p>

          <h2>11. Bezpieczeństwo danych</h2>
          <p>
            Stosujemy odpowiednie środki techniczne i organizacyjne zapewniające bezpieczeństwo danych, w tym
            szyfrowanie transmisji (protokół HTTPS/TLS) oraz ograniczenie dostępu do danych wyłącznie do osób
            upoważnionych.
          </p>

          <h2>12. Zmiany polityki prywatności</h2>
          <p>
            Polityka może być aktualizowana w razie zmiany przepisów lub zakresu świadczonych usług. Aktualna wersja
            jest każdorazowo publikowana w serwisie wraz z datą ostatniej aktualizacji.
          </p>
        </div>
      </section>
    </>
  );
}

window.PagePrivacy = PagePrivacy;
