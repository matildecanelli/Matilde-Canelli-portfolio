---
name: Matilde Canelli, portfolio
description: Una sola schermata viva. PORTFOLIO nero e solido, bolle lucide che fanno da lente e si aprono in pannelli.
colors:
  carta: "#f2f1ef"
  pannello: "#fbfaf8"
  nero: "#141212"
  tenue: "#57524f"
  bordeaux: "#510000"
  imaze-fucsia: "#e13155"
  imaze-nero: "#1d1d1b"
  imaze-titolo: "#c22448"
  synapses-giallo: "#fcc505"
  synapses-arancio: "#ed7238"
  synapses-titolo: "#b04614"
  ju1ce-lime: "#a0db2e"
  ju1ce-viola: "#5120f5"
  energiapura-acqua: "#519898"
  energiapura-blu: "#1b2859"
  virtuoso-rosa: "#b28c83"
  chi-sono-rosso: "#c0392b"
  contatti-notte: "#120202"
typography:
  display:
    fontFamily: "Satoshi, Helvetica Neue, Arial, sans-serif"
    fontSize: "adattata alla larghezza della scena (SVG, misurata in palco.js)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Satoshi, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 1.4rem + 5vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Satoshi, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.25rem, 1.05rem + 0.8vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Satoshi, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Satoshi, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  focus: "3px"
  immagine: "1.25rem"
  pannello: "28px"
  pillola: "999px"
  bolla: "50%"
spacing:
  margine: "clamp(1rem, 2.5vw, 2.25rem)"
  ritaglio: "clamp(10px, 2.5vw, 36px)"
  interno-pannello: "clamp(1.25rem, 4vw, 4rem)"
  colonna: "clamp(1rem, 2vw, 2rem)"
  stacco: "2.5rem"
  gruppo: "1.5rem"
  voce: "1rem"
components:
  menu-voce:
    textColor: "{colors.nero}"
    typography: "{typography.title}"
    padding: "0.35rem 0"
  pallino:
    rounded: "{rounded.bolla}"
    size: "0.85em"
  button-chiudi:
    backgroundColor: "{colors.nero}"
    textColor: "{colors.carta}"
    typography: "{typography.label}"
    rounded: "{rounded.pillola}"
    padding: "0 1.1rem"
    height: "2.75rem"
  pannello:
    backgroundColor: "{colors.pannello}"
    textColor: "{colors.nero}"
    rounded: "{rounded.pannello}"
  pannello-titolo:
    typography: "{typography.headline}"
    textColor: "{colors.nero}"
  pannello-immagine:
    rounded: "{rounded.immagine}"
    width: "100%"
  didascalia:
    typography: "{typography.label}"
    textColor: "{colors.tenue}"
---

# Design System: Matilde Canelli, portfolio

## Overview

**Creative North Star: "La lente sulla carta"**

Il sito è una sola schermata: una carta bianca appena calda, la parola PORTFOLIO nera, piena, a tutta larghezza, e sopra di lei sette bolle lucide che viaggiano lente dentro un recinto. Ogni bolla è una lente: dove passa, le lettere sotto diventano liquide; fuori restano nette. Ogni bolla è anche una voce del sito, e si apre in un pannello. L'interfaccia è quasi assente: nome in alto a sinistra, menu verticale a destra, tutto il resto è la scena.

La densità è bassa e il contrasto è netto: nero pieno su carta, con il colore che arriva solo dai progetti. Ogni progetto porta i suoi due colori dentro la propria bolla, nel pallino del menu e nel titolo del pannello; l'interfaccia non ha un colore suo oltre al nero e al bordeaux della stella. La profondità non viene dalle ombre ma dalla luce: riflessi bianchi sfocati dentro le bolle, e la scena che si sfoca dietro il pannello aperto.

Senza JavaScript il mondo resta leggibile come pagina normale: PORTFOLIO scritto in testo, pannelli come sezioni una sotto l'altra sulla carta.

**Key Characteristics:**
- Una schermata che non scorre; i contenuti stanno nei pannelli che escono dalle bolle.
- Satoshi in quattro pesi (400, 500, 700, 900), con il 900 come voce del mondo.
- Colore solo dai progetti, in coppie sfumate (`--c1` / `--c2`) dichiarate sulla voce.
- Nessuna ombra: lucentezza, sfocatura e trasparenza fanno la profondità.
- La stella di Matilde, bordeaux con il bordo sgranato, come firma ricorrente.

## Colors

Una carta calda e un nero quasi puro fanno tutto il lavoro; il colore entra solo con i progetti, sempre in coppia e sempre sfumato.

### Primary
- **Nero Inchiostro** (`nero`): PORTFOLIO, tutto il testo, il menu, il pulsante Chiudi, il contorno del focus e la selezione del testo. È l'unico colore dell'interfaccia.

### Secondary
- **Bordeaux Stella** (`bordeaux`): la stella di Matilde (in testa e nel pannello Chi sono), il secondo colore di Virtuoso e Chi sono, il primo di Contatti, e il colore dei titoli di Virtuoso, Chi sono e Contatti.

### Tertiary
Le coppie dei progetti. Il primo colore (`--c1`) è il corpo della bolla, il secondo (`--c2`) è il bordo verso cui sfuma; `--titolo` è il colore del nome nel titolo del pannello.
- **Imaze**: Fucsia Imaze (`imaze-fucsia`) verso Nero Imaze (`imaze-nero`); titolo in Fucsia Scuro (`imaze-titolo`).
- **Synapses**: Giallo Synapses (`synapses-giallo`) verso Arancio Synapses (`synapses-arancio`); titolo in Arancio Bruciato (`synapses-titolo`).
- **JU1CE**: Lime JU1CE (`ju1ce-lime`) verso Viola JU1CE (`ju1ce-viola`); titolo in Viola JU1CE.
- **EnergiaPura**: Verde Acqua (`energiapura-acqua`) verso Blu Notte (`energiapura-blu`); titolo in Blu Notte.
- **Virtuoso**: Rosa Cipria (`virtuoso-rosa`) verso Bordeaux Stella; titolo in Bordeaux Stella.
- **Chi sono**: Rosso Mattone (`chi-sono-rosso`) verso Bordeaux Stella; titolo in Bordeaux Stella.
- **Contatti**: Bordeaux Stella verso Notte Bordeaux (`contatti-notte`); titolo in Bordeaux Stella.

### Neutral
- **Carta Calda** (`carta`): il fondo della scena e della pagina senza JavaScript; anche `theme-color`.
- **Carta Pannello** (`pannello`): il fondo dei pannelli aperti, un gradino più chiaro della scena, così il pannello si stacca senza ombra.
- **Grigio Tenue** (`tenue`): didascalie delle immagini e la nota sul codice nei Contatti. Mai per testo di lettura principale.

### Named Rules
**The Coppia Rule.** Ogni voce dichiara i suoi due colori come proprietà `--c1` e `--c2` sull'elemento (voce del menu e sezione del pannello), e tutto il resto li legge da lì: bolla, pallino, strato colorato dell'apertura. Un colore di progetto non si scrive mai a mano in un foglio di stile.

**The Titolo Leggibile Rule.** Il nome nel titolo usa `--titolo`, non `--c1`: dove il colore della bolla non regge il contrasto sulla carta (fucsia e arancio), il titolo usa una versione più scura della stessa tinta. Se il secondo colore è già scuro (JU1CE, EnergiaPura, Virtuoso), il titolo usa quello.

**The Interfaccia Nera Rule.** Pulsanti, link, focus e selezione sono neri. Il colore appartiene ai progetti, non ai controlli.

## Typography

**Display Font:** Satoshi (con Helvetica Neue, Arial, sans-serif)
**Body Font:** Satoshi (stessa famiglia)

**Character:** Un solo grottesco, lo stesso del CV, che passa dal 900 compatto e stretto nella parola PORTFOLIO e nei titoli al 400 piano del testo. La gerarchia è fatta di peso e di misura, mai di un secondo carattere.

### Hierarchy
- **Display** (900, adattata alla larghezza, interlinea 0.86, spaziatura -0.04em): solo la parola PORTFOLIO, disegnata in SVG e ridimensionata per riempire la scena meno i margini; su schermi sotto i 640px va su due righe, PORT / FOLIO. Senza JavaScript è testo a 19vw in maiuscolo.
- **Headline** (900, `clamp(2.75rem, 1.4rem + 5vw, 6rem)`, 0.92, -0.04em): il titolo del pannello, su due righe ("Progetto" in nero, il nome nel colore `--titolo`), bilanciato.
- **Title** (700, `clamp(1.25rem, 1.05rem + 0.8vw, 1.75rem)`, 1.3): le voci del menu (con spaziatura -0.02em), la frase d'apertura dei pannelli Chi sono e Contatti, il link al progetto successivo; in 900 per il sottotitolo interno (Prōsopon).
- **Body** (400, `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)`, 1.55): la scheda del progetto e i paragrafi, con `text-wrap: pretty`; i testi larghi stanno entro 44rem.
- **Label** (400, 0.875rem, 1.4): il blocco nome e ruolo in testa (nome in 900, link al CV in 700), didascalie, il pulsante Chiudi (700), il nome della bolla che compare al passaggio (700, 14px).

### Named Rules
**The Cinque Misure Rule.** Il testo ha cinque misure: piccolo, testo, frase, titolo e PORTFOLIO. Un nuovo elemento ne sceglie una; non se ne aggiunge una sesta.

**The Peso Rule.** La gerarchia si fa con il peso di Satoshi (400, 700, 900) e con la spaziatura negativa sulle misure grandi, non con il colore o con il maiuscolo. Il maiuscolo appartiene solo a PORTFOLIO.

## Layout

La scena è una griglia a due colonne e due righe alta esattamente `100svh`, con il margine `margine` su tutti i lati: testa in alto a sinistra, menu a destra su tutta l'altezza (allineato a destra, voci a 0.15rem di distanza, uno stacco di 1rem prima di Chi sono), e la scena SVG che copre tutto. Con JavaScript la pagina non scorre.

Su schermi larghi PORTFOLIO poggia sul fondo della scena; sotto i 640px sta a circa un terzo dell'altezza, tra il nome in alto e il menu in basso. Le bolle si muovono in un recinto che esclude la testa e il menu, così i testi piccoli restano sempre su carta.

Il pannello è una griglia a 12 colonne con gutter `colonna` e righe a `stacco`: testo e scheda nelle colonne 1–5 (1–8 per Chi sono e Contatti), immagini nelle colonne 7–12 in una griglia a due colonne con spazio `voce`, la stella nelle colonne 9–12. Il pannello lascia `ritaglio` di carta della scena intorno a sé, più `interno-pannello` di respiro all'interno.

Punti di rottura: sotto 40rem il menu scende in fondo alla scena come riga che va a capo, con voci alte almeno 2.75rem; sotto 52rem il pannello diventa a una colonna, la scheda impila etichetta e valore, la stella scende a metà larghezza allineata a destra, e il titolo lascia spazio sopra di sé al pulsante Chiudi.

## Elevation & Depth

Il sistema non usa ombre. La profondità viene dalla luce e dalla messa a fuoco: ogni bolla ha un gradiente radiale con un punto bianco in alto a sinistra, un riflesso bianco ellittico sfocato (opacità 0.5) e un punto di luce netto (opacità 0.9). Quando un pannello è aperto, la scena dietro si sfoca di 10px e scende a opacità 0.45 in 600ms. Il pannello si stacca dalla scena solo perché è un gradino più chiaro (Carta Pannello su Carta Calda) e ha gli angoli morbidi.

### Named Rules
**The Luce Non Ombra Rule.** Nessuna `box-shadow` né `drop-shadow`, a riposo o al passaggio. Per staccare un piano si usa un fondo più chiaro, la sfocatura di ciò che sta dietro, o il riflesso lucido di una bolla.

**The Lucido Rule.** Una superficie del mondo è lucida se ha il punto bianco in alto a sinistra (al 35% / 30%). Bolle, pallini del menu e strato colorato dell'apertura condividono questa sorgente di luce.

## Shapes

Il linguaggio delle forme è morbido e senza bordi. Le bolle sono ellissi (allungate fino a 1.45 volte) che respirano e ruotano piano; i pallini del menu sono cerchi pieni. Il pannello è un rettangolo con angoli a `pannello` ottenuto con `clip-path: inset(... round ...)`, la stessa tecnica che all'inizio lo fa coincidere con il cerchio della bolla. Le immagini hanno angoli a `immagine`; il pulsante Chiudi è una pillola. Nessun elemento ha un bordo disegnato: la forma è data dal riempimento o dal ritaglio.

La stella di Matilde è una forma unica a otto punte irregolari (simbolo `#forma-stella`, viewBox 900 × 940), sempre riempita con il filtro `#sgranato`, che le dà un bordo granuloso in bordeaux. Nel pannello Chi sono è ruotata di -14°.

## Components

### Bolla (componente firma)
Una lente lucida che viaggia sopra PORTFOLIO. Ogni bolla è definita una volta come ellisse e riusata in tre strati: maschera che nasconde le lettere nitide, la bolla colorata, maschera che mostra le lettere deformate dal filtro `#liquido` (dilatazione, turbolenza, spostamento, sfocatura e soglia, tutto proporzionale al corpo della parola).
- **Colore:** gradiente radiale dal bianco a `--c1` (12–55%) e poi a `--c2`.
- **Misura:** le cinque bolle progetto hanno raggio tra l'11% e il 16% del lato corto della scena, Chi sono e Contatti l'8.5%.
- **Movimento:** deriva costante con rimbalzo sui bordi del recinto, rotazione lenta, respiro dell'ovale (±6%). Si ferma mentre un pannello è aperto. Su schermi oltre i 700px il rumore del liquido respira in 10s.
- **Hover / Focus:** passando sulla bolla o sulla sua voce del menu (anche con il focus da tastiera), la bolla si gonfia a 1.18 e mostra il suo nome sotto di sé (Label 700, nero) in 200ms.
- **Interazione:** è un link al pannello, fuori dall'ordine di tabulazione; da tastiera si usa il menu.

### Navigation
- **Stile:** lista verticale a destra, voci in Title 700 nere senza sottolineatura, ciascuna preceduta dal pallino della sua bolla.
- **Hover / Focus:** il pallino cresce a 1.5 in 300ms con la curva `ease`, e la bolla corrispondente si gonfia sulla scena.
- **Telefono:** sotto 40rem diventa una riga che va a capo in fondo alla scena, a 1.0625rem, con area di tocco di 2.75rem.

### Pallino
Il ricordo della bolla nell'interfaccia: cerchio di 0.85em con gradiente radiale dal bianco (0–8%) a `--c1` (40%) e `--c2`. Si usa accanto alla voce della bolla che rappresenta.

### Pannello e apertura
Il contenuto di ogni voce, con un suo indirizzo (`#imaze`, `#contatti`).
- **Superficie:** Carta Pannello, angoli a `pannello`, a `ritaglio` dai bordi dello schermo; scorre al suo interno.
- **Apertura (1150ms, `cubic-bezier(0.76, 0, 0.24, 1)`):** il ritaglio parte dal cerchio della bolla dov'è in quel momento, al 55% raggiunge i quattro vertici della pagina con angoli a zero, poi si ritira sul pannello. Uno strato con il gradiente della bolla resta pieno fino a metà e poi svanisce; i contenuti salgono di 24px e compaiono dal 55% in poi.
- **Chiusura (700ms, stessa curva):** il pannello torna nel cerchio della sua bolla.
- **Movimento ridotto:** con `prefers-reduced-motion` le bolle restano ferme, il liquido non respira, il pannello compare con una dissolvenza di 250ms e si chiude subito.
- **Accessibilità:** si comporta da dialog modale, la scena dietro diventa `inert`, il focus va al titolo e torna alla voce che l'ha aperto; Esc chiude.

### Buttons
- **Chiudi:** pillola nera con testo carta, Label 700, alta almeno 2.75rem, fissata in alto a destra dentro il ritaglio. Al passaggio si ingrandisce a 1.06 in 200ms con la curva `ease`. È l'unico pulsante del sistema.

### Link
- **Stile:** testo nel colore circostante, sottolineato a 1.5px con distanza 0.25em.
- **Hover:** la sottolineatura si ispessisce a 3px in 200ms.
- **Focus (globale):** contorno nero di 3px a 3px di distanza, angoli a `focus`.

### Scheda
La scheda del progetto (Anno, Contesto, Ruolo, Obiettivo, Processo, Risultato) come lista di definizioni: etichetta in 700 in una colonna di 7.5rem (6rem nei Contatti), valore in Body, righe a `voce`. Sotto 52rem etichetta e valore si impilano.

### Immagini di progetto
Figure a tutta larghezza della loro cella, angoli a `immagine`, didascalia in Label Grigio Tenue a 0.5rem sotto. Le figure larghe occupano entrambe le colonne della griglia immagini.

## Do's and Don'ts

### Do:
- **Do** dichiarare i colori di una nuova voce come `--c1`, `--c2` e `--titolo` sull'elemento, e verificare che `--titolo` regga almeno 4.5:1 sulla Carta Pannello.
- **Do** usare il nero per ogni controllo e lasciare il colore ai progetti.
- **Do** dare profondità con il riflesso lucido (luce al 35% / 30%), la sfocatura della scena (10px, opacità 0.45) o il gradino di carta.
- **Do** aprire ogni nuovo contenuto come pannello uscito dalla sua bolla, con la curva `cubic-bezier(0.76, 0, 0.24, 1)` a 1150ms in apertura e 700ms in chiusura.
- **Do** scegliere la misura di testo tra le cinque esistenti e gerarchizzare con il peso di Satoshi.
- **Do** dare a ogni movimento una versione ferma per `prefers-reduced-motion`.
- **Do** tenere le bolle nel recinto, lontane dai testi della testa e del menu.

### Don't:
- **Don't** usare `box-shadow` o `drop-shadow` su nessuna superficie.
- **Don't** trasformare la scena in una pagina a scorrimento con hero, sezioni e griglia di card.
- **Don't** usare un secondo carattere o un carattere di sistema per i titoli.
- **Don't** colorare pulsanti, link o focus con i colori dei progetti.
- **Don't** usare il maiuscolo fuori da PORTFOLIO.
- **Don't** disegnare bordi intorno a pannelli, immagini o pulsanti: la forma è data dal riempimento e dal ritaglio.
