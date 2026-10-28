---
name: Matilde Canelli, portfolio
description: Una sola schermata viva. PORTFOLIO chiaro al centro del nero, sette bolle di vetro che lo rifrangono e si aprono in pannelli.
colors:
  fondo: "#0b0b0c"
  pannello: "#141416"
  chiaro: "#f1efea"
  tenue: "#a7a29c"
  portfolio-grigio: "#e9e9e9"
  bordeaux: "#510000"
  imaze-fucsia: "#e13155"
  imaze-titolo: "#ff6b85"
  synapses-giallo: "#fcc505"
  ju1ce-lime: "#a0db2e"
  energiapura-acqua: "#519898"
  energiapura-titolo: "#7cc9c9"
  virtuoso-rosa: "#b28c83"
  virtuoso-titolo: "#dcb8ae"
  chi-sono-rosso: "#c0392b"
  chi-sono-titolo: "#ef7a6c"
typography:
  display:
    fontFamily: "Anton, Impact, sans-serif"
    fontSize: "adattata al canvas: lo spazio libero tra i margini (menu escluso), al massimo il 34% dell'altezza (26% su schermo stretto)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "normal"
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
  body:
    fontFamily: "Satoshi, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Satoshi, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.55
    letterSpacing: "0.01em"
  label-scena:
    fontFamily: "Satoshi, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.45
rounded:
  focus: "3px"
  immagine: "1.25rem"
  pannello: "28px"
  pillola: "999px"
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
    textColor: "{colors.tenue}"
    typography: "{typography.label}"
    padding: "0.4rem 0"
  menu-voce-hover:
    textColor: "{colors.chiaro}"
  testa:
    textColor: "{colors.tenue}"
    typography: "{typography.label-scena}"
  etichetta-bolla:
    textColor: "{colors.chiaro}"
    typography: "{typography.label-scena}"
  button-chiudi:
    backgroundColor: "{colors.chiaro}"
    textColor: "{colors.fondo}"
    typography: "{typography.label}"
    rounded: "{rounded.pillola}"
    padding: "0 1.1rem"
    height: "2.75rem"
  pannello:
    backgroundColor: "{colors.pannello}"
    textColor: "{colors.chiaro}"
    rounded: "{rounded.pannello}"
    padding: "{spacing.interno-pannello}"
  pannello-titolo:
    typography: "{typography.headline}"
    textColor: "{colors.chiaro}"
  scheda-etichetta:
    textColor: "{colors.tenue}"
  pannello-immagine:
    rounded: "{rounded.immagine}"
    width: "100%"
  didascalia:
    typography: "{typography.label}"
    textColor: "{colors.tenue}"
---

# Design System: Matilde Canelli, portfolio

## Overview

**Creative North Star: "Il vetro nel buio"**

Il sito è una sola schermata nera. Al centro esatto c'è la parola PORTFOLIO, chiara, piena, in un grottesco condensato tipo manifesto; sopra di lei vagano sette bolle di vetro, una per ogni voce del menu. Ogni bolla è una lente vera: rifrange la scritta che ha dietro, ne apre i bordi in frange di colore, porta sul bordo una luce appena tinta del suo progetto e riflette sulla superficie la stella di Matilde, che si sposta seguendo il puntatore. Cliccata, la bolla si allarga fino ai quattro vertici della pagina e si ritira sul pannello del contenuto.

L'interfaccia è quasi assente e sta ai bordi: nome, ruolo e stella in alto a sinistra, il CV in alto a destra, un menu piccolo e grigio a destra a metà altezza (in basso al centro sul telefono). Il contrasto è tutto tra il nero del fondo e il chiaro del testo; il colore arriva solo dai progetti, spento nel vetro e acceso nel titolo del pannello. La profondità non viene dalle ombre ma dal vetro e dalla messa a fuoco.

Senza JavaScript o senza WebGL il mondo resta leggibile: PORTFOLIO scritto in Anton al centro, e senza JavaScript i pannelli diventano sezioni una sotto l'altra sul nero.

**Key Characteristics:**
- Una schermata che non scorre; i contenuti stanno nei pannelli che escono dalle bolle.
- Due caratteri con ruoli separati: Anton solo per PORTFOLIO, Satoshi per tutto il resto.
- Fondo quasi nero, testo chiaro caldo, grigio tenue per tutto ciò che è secondario.
- Bolle di vetro in WebGL: rifrazione, dispersione cromatica, riflessi speculari, bordo Fresnel tinto, stella riflessa.
- Nessuna ombra: vetro, sfocatura e un gradino di nero fanno la profondità.
- La stella di Matilde (il PNG originale) accanto al nome, in Chi sono e riflessa in ogni bolla.

## Colors

Un nero quasi puro e un chiaro caldo fanno tutto il lavoro dell'interfaccia; il colore entra solo con i progetti, spento nel vetro e schiarito nei titoli.

### Primary
- **Chiaro Caldo** (`chiaro`): tutto il testo di lettura, i titoli dei pannelli, il nome in testa, i link, il pulsante Chiudi (come fondo), il contorno del focus e la selezione del testo. È l'unico colore dei controlli.

### Tertiary
Le tinte dei progetti. Ogni voce dichiara `--c1` (la sua tinta) e `--titolo` (il colore del nome nel pannello) sull'elemento.
- **Imaze**: Fucsia Imaze (`imaze-fucsia`); titolo in Fucsia Chiaro (`imaze-titolo`).
- **Synapses**: Giallo Synapses (`synapses-giallo`), che fa anche da titolo.
- **JU1CE**: Lime JU1CE (`ju1ce-lime`), che fa anche da titolo.
- **EnergiaPura**: Verde Acqua (`energiapura-acqua`); titolo in Acqua Chiara (`energiapura-titolo`).
- **Virtuoso**: Rosa Cipria (`virtuoso-rosa`); titolo in Cipria Chiara (`virtuoso-titolo`).
- **Chi sono**: Rosso Mattone (`chi-sono-rosso`); titolo in Corallo (`chi-sono-titolo`).
- **Contatti**: Bordeaux Stella (`bordeaux`); titolo in Chiaro Caldo.

### Neutral
- **Nero Fondo** (`fondo`): il fondo della scena, del canvas WebGL e della pagina; anche `theme-color`.
- **Nero Pannello** (`pannello`): il fondo dei pannelli aperti, un gradino più chiaro del fondo, così il pannello si stacca senza ombra.
- **Grigio Tenue** (`tenue`): le voci del menu a riposo, ruolo e frase in testa, le etichette della scheda, le didascalie, la nota sul codice nei Contatti. Regge 7:1 sul Nero Pannello, ma resta per il testo secondario.
- **Grigio PORTFOLIO** (`portfolio-grigio`): solo la parola PORTFOLIO, disegnata nella texture e nella versione di riserva; un passo più freddo e più spento del Chiaro Caldo, così la scritta resta sfondo e il testo resta testo.

### Named Rules
**The Tinta Rule.** Ogni voce dichiara la sua tinta come `--c1` sull'elemento (voce del menu e sezione del pannello), e tutto il resto la legge da lì: la bolla la prende dal menu e la spegne verso il grigio, lo strato dell'apertura la mescola al 45% nel Nero Pannello. Un colore di progetto non si scrive mai a mano in un foglio di stile o nello shader.

**The Titolo Leggibile Rule.** Il nome nel titolo usa `--titolo`, non `--c1`. Dove la tinta è già luminosa (Synapses, JU1CE) il titolo è la tinta stessa; dove è scura o media (Imaze, EnergiaPura, Virtuoso, Chi sono) il titolo ne usa una versione più chiara della stessa famiglia; Contatti usa il Chiaro Caldo. Ogni `--titolo` regge almeno 4.5:1 sul Nero Pannello.

**The Interfaccia Chiara Rule.** Pulsanti, link, focus e selezione sono nel Chiaro Caldo. Il colore appartiene ai progetti, non ai controlli.

## Typography

**Display Font:** Anton (con Impact, sans-serif), ospitato sul sito in latin e latin-ext
**Body Font:** Satoshi (con Helvetica Neue, Arial, sans-serif), pesi 400, 500, 700, 900

**Character:** Anton è il sostituto pubblicabile di Impact: un condensato da manifesto, che esiste solo nella parola PORTFOLIO. Satoshi, lo stesso grottesco del CV, porta tutto il resto, dal 900 compatto dei titoli al 500 piccolo del menu.

### Hierarchy
- **Display** (Anton 400, adattata, interlinea 0.95): solo PORTFOLIO, disegnato in un canvas 2D che diventa la texture di sfondo della scena, centrato nella finestra. La misura riempie lo spazio tra i margini lasciando libera la larghezza del menu su entrambi i lati, fino al 34% dell'altezza. Su schermo stretto va su due righe, PORT / FOLIO, fino al 26% dell'altezza, centrato al 46%. La riserva HTML (senza JavaScript o WebGL) è testo maiuscolo a 18vw, interlinea 0.9, spaziatura 0.01em.
- **Headline** (Satoshi 900, `clamp(2.75rem, 1.4rem + 5vw, 6rem)`, 0.92, -0.04em): il titolo del pannello, su due righe ("Progetto" in chiaro, il nome in `--titolo`), bilanciato.
- **Title** (Satoshi 700, `clamp(1.25rem, 1.05rem + 0.8vw, 1.75rem)`, 1.3): la frase d'apertura di Chi sono e Contatti, il link al progetto successivo; in 900 con -0.02em per il sottotitolo interno (Prōsopon).
- **Body** (Satoshi 400, `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)`, 1.55): la scheda del progetto e i paragrafi, con `text-wrap: pretty`; i testi larghi stanno entro 44rem.
- **Label** (Satoshi 500, 0.875rem, spaziatura 0.01em): le voci del menu; a 700 per il pulsante Chiudi, a 400 per didascalie e nota sul codice.
- **Label scena** (Satoshi 500, 0.8125rem, 1.45): ciò che sta sulla scena intorno al vetro: ruolo in testa (a 400, con il nome in 700 chiaro), il link al CV, il nome della bolla al passaggio (con spaziatura 0.02em).

### Named Rules
**The Una Parola Rule.** Anton esiste solo per PORTFOLIO. Titoli, menu e testo sono sempre Satoshi; un nuovo titolo non prende Anton.

**The Peso Rule.** Dentro Satoshi la gerarchia si fa con il peso (400, 500, 700, 900), la misura e la spaziatura negativa sulle misure grandi, non con il colore o con il maiuscolo. Il maiuscolo appartiene solo a PORTFOLIO.

## Layout

La scena è alta esattamente `100svh` e con JavaScript la pagina non scorre. Il canvas copre tutta la scena; sopra di lui, a `margine` dai bordi, stanno la testa (stella di 2.4rem e testo, in alto a sinistra), il link al CV (in alto a destra) e il menu (a destra, centrato sull'altezza, voci allineate a destra a 0.15rem di distanza, uno stacco di 0.9rem prima di Chi sono). PORTFOLIO sta al centro esatto della finestra.

Le bolle vagano su tutta la scena, anche sopra la scritta e oltre i bordi: solo il loro centro resta dentro lo schermo (a 0.35 del raggio dal bordo). La loro misura è il 14% del lato corto (20% su schermo stretto), moltiplicato per un fattore tra 0.85 e 1.25 per i cinque progetti e 0.72 per Chi sono e Contatti.

Il pannello è una griglia a 12 colonne con gutter `colonna` e righe a `stacco`: testo e scheda nelle colonne 1–5 (1–8 per Chi sono e Contatti), immagini nelle colonne 7–12 in una griglia a due colonne con spazio `voce`, la stella nelle colonne 9–12. Il pannello lascia `ritaglio` di scena intorno a sé, più `interno-pannello` di respiro all'interno.

Punti di rottura: sotto 40rem il menu scende in fondo alla scena come riga centrata che va a capo, con voci alte almeno 2.75rem. La scena è "stretta" sotto i 640px o quando la finestra è più alta che larga: PORTFOLIO su due righe, bolle più grandi, metà delle letture del vetro. Sotto 52rem il pannello diventa a una colonna, la scheda impila etichetta e valore, la stella scende a metà larghezza allineata a destra, e il titolo lascia spazio sopra di sé al pulsante Chiudi.

## Elevation & Depth

Il sistema non usa ombre. La profondità viene dal vetro e dalla messa a fuoco. Ogni bolla è una sfera disegnata in due passaggi: prima le facce posteriori, che rifrangono la scena in un foglio a mezza precisione, poi le facce anteriori, che rifrangono quel foglio; in entrambi lo sfondo viene letto sei volte con indici diversi (rosso, giallo, verde, ciano, blu, viola), così le lettere sotto il vetro si spostano e ai bordi si aprono in frange colorate. Sopra si sommano due riflessi speculari (luce principale dall'alto a sinistra), un bordo Fresnel appena tinto del progetto e la stella riflessa. Quando un pannello è aperto la scena dietro si sfoca di 10px e scende a opacità 0.35 in 600ms; il pannello si stacca perché è un gradino più chiaro (Nero Pannello su Nero Fondo).

### Named Rules
**The Vetro Non Ombra Rule.** Nessuna `box-shadow` né `drop-shadow`, a riposo o al passaggio. Per staccare un piano si usa il gradino di nero, la sfocatura di ciò che sta dietro, o il vetro.

**The Luce Unica Rule.** La luce viene dall'alto a sinistra: la luce principale dello shader e il centro dello strato colorato dell'apertura (al 35% / 30%) condividono questa sorgente.

**The Tinta Spenta Rule.** Nel vetro il colore del progetto è sempre spento: la tinta viene mescolata al 55% verso un grigio medio e appare solo nel bordo Fresnel. Il corpo della bolla resta trasparente; il colore pieno appartiene al titolo del pannello.

## Shapes

Il linguaggio delle forme è morbido e senza bordi. Le bolle sono sfere che respirano appena (si schiacciano e si allungano del 3%). Il pannello è un rettangolo con angoli a `pannello` ottenuto con `clip-path: inset(... round ...)`, la stessa tecnica che all'inizio lo fa coincidere con il cerchio della bolla. Le immagini hanno angoli a `immagine`; il pulsante Chiudi è una pillola. Nessun elemento ha un bordo disegnato: la forma è data dal riempimento, dal ritaglio o dal vetro.

La stella di Matilde è il PNG originale (`assets/img/stella.png`), bordeaux con il bordo sgranato: accanto al nome, in grande nel pannello Chi sono, e nello shader come canale alfa riflesso sulle bolle.

## Components

### Bolla di vetro (componente firma)
Una lente trasparente che vaga sopra PORTFOLIO, una per voce del menu.
- **Materiale:** shader fatto a mano su una sfera (96 × 64 segmenti). Rifrazione nello spazio dello schermo con dispersione su sei bande, in 16 letture per pixel su schermo largo e 8 su schermo stretto; saturazione 1.08; due riflessi speculari; bordo Fresnel verso la tinta spenta del progetto; la stella riflessa attraverso il vettore di riflessione, leggermente rosata, che segue il puntatore.
- **Movimento:** deriva costante in una direzione casuale con rimbalzo sui bordi, respiro lento dell'ovale. Si ferma mentre un pannello è aperto.
- **Hover / Focus:** passando sulla bolla o sulla sua voce del menu (anche con il focus da tastiera), la bolla si gonfia a 1.08 e il suo nome compare al centro (Label scena, chiaro) in 250ms; il cursore diventa una mano.
- **Interazione:** un clic (non un trascinamento oltre 8px) apre il pannello cambiando l'indirizzo. Il canvas è `aria-hidden`; da tastiera si usa il menu.
- **Riserva:** se WebGL non parte, il canvas sparisce e PORTFOLIO resta come testo HTML al centro.

### Navigation
- **Stile:** lista verticale piccola a destra, voci in Label grigio tenue senza sottolineatura.
- **Hover / Focus:** la voce diventa chiara in 200ms e scivola di 0.3rem verso sinistra in 300ms con la curva `ease` del sistema; la bolla corrispondente si gonfia sulla scena.
- **Telefono:** sotto 40rem diventa una riga centrata in fondo alla scena, con 1.1rem tra le voci e area di tocco di 2.75rem; niente scivolamento.

### Pannello e apertura
Il contenuto di ogni voce, con un suo indirizzo (`#imaze`, `#contatti`).
- **Superficie:** Nero Pannello, testo chiaro, angoli a `pannello`, a `ritaglio` dai bordi dello schermo; scorre al suo interno.
- **Apertura (1150ms, `cubic-bezier(0.76, 0, 0.24, 1)`):** il ritaglio parte dal cerchio della bolla dov'è in quel momento, al 55% raggiunge i quattro vertici della pagina con angoli a zero, poi si ritira sul pannello. Uno strato con un gradiente radiale dalla tinta (mescolata al 45%) al Nero Pannello resta pieno fino a metà e poi svanisce; i contenuti salgono di 24px e compaiono dal 55% in poi.
- **Chiusura (700ms, stessa curva):** il pannello torna nel cerchio della sua bolla.
- **Movimento ridotto:** con `prefers-reduced-motion` le bolle restano ferme (la scena si ridisegna solo al passaggio del puntatore), il pannello compare con una dissolvenza di 250ms e si chiude subito.
- **Accessibilità:** si comporta da dialog modale, la scena dietro diventa `inert`, il focus va al titolo e torna alla voce che l'ha aperto; Esc chiude.

### Buttons
- **Chiudi:** pillola chiara con testo nero, Label 700, alta almeno 2.75rem, fissata in alto a destra dentro il ritaglio. Al passaggio si ingrandisce a 1.06 in 200ms con la curva `ease`. È l'unico pulsante del sistema.

### Link
- **Stile:** testo nel colore circostante, sottolineato a 1.5px con distanza 0.25em.
- **Hover:** la sottolineatura si ispessisce a 3px in 200ms.
- **Focus (globale):** contorno chiaro di 2px a 3px di distanza, angoli a `focus`.

### Testa
Stella (2.4rem) e blocco in Label scena grigio tenue: il nome in 700 chiaro, sotto ruolo e frase sullo stage. Il link al CV, sempre in Label scena, sta in alto a destra alla stessa altezza.

### Scheda
La scheda del progetto (Anno, Contesto, Ruolo, Obiettivo, Processo, Risultato) come lista di definizioni: etichetta in 700 grigio tenue in una colonna di 7.5rem (6rem nei Contatti), valore in Body chiaro, righe a `voce`. Sotto 52rem etichetta e valore si impilano.

### Immagini di progetto
Figure a tutta larghezza della loro cella, angoli a `immagine`, didascalia in Label 400 grigio tenue a 0.5rem sotto. Le figure larghe occupano entrambe le colonne della griglia immagini.

## Do's and Don'ts

### Do:
- **Do** dichiarare la tinta di una nuova voce come `--c1` e il colore del nome come `--titolo` sull'elemento, e verificare che `--titolo` regga almeno 4.5:1 sul Nero Pannello.
- **Do** usare il Chiaro Caldo per ogni controllo e lasciare il colore ai progetti.
- **Do** dare profondità con il vetro, la sfocatura della scena (10px, opacità 0.35) o il gradino tra Nero Fondo e Nero Pannello.
- **Do** aprire ogni nuovo contenuto come pannello uscito dalla sua bolla, con la curva `cubic-bezier(0.76, 0, 0.24, 1)` a 1150ms in apertura e 700ms in chiusura.
- **Do** dare a ogni nuova voce del menu la sua bolla, con la tinta spenta al 55% verso il grigio.
- **Do** dimezzare le letture del vetro su schermo stretto e lasciare sempre la riserva in HTML se WebGL non parte.
- **Do** dare a ogni movimento una versione ferma per `prefers-reduced-motion`.

### Don't:
- **Don't** usare `box-shadow` o `drop-shadow` su nessuna superficie.
- **Don't** trasformare la scena in una pagina a scorrimento con hero, sezioni e griglia di card.
- **Don't** usare Anton fuori da PORTFOLIO, né un terzo carattere.
- **Don't** colorare pulsanti, link o focus con le tinte dei progetti.
- **Don't** riempire il corpo delle bolle di colore: il vetro resta trasparente e la tinta sta nel bordo.
- **Don't** usare il maiuscolo fuori da PORTFOLIO.
- **Don't** disegnare bordi intorno a pannelli, immagini o pulsanti: la forma è data dal riempimento e dal ritaglio.
