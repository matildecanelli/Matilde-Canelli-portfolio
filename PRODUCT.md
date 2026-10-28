# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

HTML, CSS e JavaScript vanilla, senza framework e senza build step. Pubblicato su GitHub Pages aprendo `index.html`. Codice pulito e commentato in italiano: Matilde deve saperlo spiegare a un colloquio.

## Users

- **Selezionatori e agenzie** che valutano Matilde per uno **stage in sviluppo frontend**. Ricevono il link (spesso via email o LinkedIn) e lo aprono **dal telefono**, in pochi minuti, decidendo se chiamarla per un colloquio.
- In secondo piano: chi la valuta per ruoli di web/visual design.

## Product Purpose

Sito portfolio personale di Matilde Canelli, studentessa di magistrale in Digital Design & Communication (LABA Brescia). Serve a ottenere uno stage frontend. Il sito è **due cose insieme**: la vetrina dei progetti e il progetto più importante da mostrare per il frontend, perché è sviluppato da lei.

Successo: chi lo apre capisce in fretta chi è Matilde, guarda almeno un progetto, scarica il CV o la contatta.

## Positioning

Design e sviluppo **alla pari**: Matilde progetta l'identità visiva e scrive il codice di quello che progetta. La prova non è una dichiarazione ma il sito stesso: le lettere-blob interattive sono scritte da lei, e un link discreto al repository permette di leggerne il codice.

## Operating Context

- Il primo contatto è quasi sempre un link aperto su smartphone (375 px come riferimento).
- Il portfolio PDF esiste già ed è la fonte dei contenuti e delle immagini; il sito ha un linguaggio visivo suo (vedi Brand Commitments).
- CV scaricabile in PDF.

## Capabilities and Constraints

- Sezioni: copertina (hero), progetti (Imaze, Synapses, JU1CE, EnergiaPura, Virtuoso, in quest'ordine), una pagina per progetto con scheda (anno, contesto, ruolo, obiettivo, processo, risultato) e immagini di processo e finali, about "Ma chi è?", CV scaricabile, contatti sempre raggiungibili (email, telefono, LinkedIn, GitHub).
- Link al repository GitHub del sito.
- Lingua: **solo italiano per ora**; la struttura deve permettere di aggiungere l'inglese più avanti senza rifare tutto.
- Pagine leggere, immagini ottimizzate (WebP o JPG compressi, `loading="lazy"`).
- SEO di base: title, meta description, immagine Open Graph.
- Animazioni libere purché non rallentino lettura e caricamento e rispettino `prefers-reduced-motion`.
- **Aperti:** il link di Imaze cambierà (repository da rinominare): Matilde fornirà il nuovo indirizzo. Il video di EnergiaPura ora è dentro il sito (`assets/video/energiapura.mp4`), quindi il vecchio sito del video non serve più.
- Le locandine JU1CE contengono il refuso "THRISTY": è una scelta di Matilde tenerlo, non correggerlo e non segnalarlo come errore.

## Brand Commitments

**28/10/2026, versione corrente** (riferimenti: manifesto "VISION", la home di lucabotturi.com, il suo menu).

- **Palette nera:** tutto il sito, pannelli compresi, su fondo quasi nero; testo chiaro.
- **PORTFOLIO al centro** della schermata, in orizzontale e in verticale, grande, in Anton (il carattere "tipo Impact": Impact non si può pubblicare). È disegnato dentro la scena 3D così le bolle lo possono rifrangere.
- **Bolle di vetro (Three.js / WebGL):** sfere di vetro che rifrangono PORTFOLIO con dispersione cromatica (le lettere si aprono in frange blu e gialle ai bordi), con riflessi e bordo luminoso; ognuna ha appena la tinta del suo progetto. Vagano su tutta la schermata. Riferimento: il prompt "Design World" con il cubo di vetro, adattato a bolle.
- **La stella di Matilde riflessa** sulla superficie di ogni bolla; il riflesso si sposta seguendo il mouse.
- **Una particella per ogni voce del menu:** i 5 progetti, Chi sono, Contatti, con una tinta spenta del colore del progetto.
- **Menu piccolo e minimale**, a destra, centrato sull'altezza dello schermo (sul telefono in basso, centrato).
- **Apertura:** scegliendo una voce, la sua particella si allarga fino ai vertici della pagina e poi si restringe sul pannello del contenuto (ispirazione: lucabotturi.com, ricreata da zero). Ogni pannello ha il suo indirizzo (es. `#imaze`).
- **La stella di Matilde**, quella originale (PNG del portfolio), accanto al nome e in Chi sono. Se Matilde fornisce l'SVG originale, sostituisce il PNG. **Testi:** Satoshi.

Restano vincolanti: i testi di `materiale-sito/TESTI.md` così come sono, le immagini dei progetti, il tono diretto e ironico in prima persona.

## Evidence on Hand

- Testi approvati: `materiale-sito/TESTI.md` (da usare così come sono, senza inventare contenuti).
- Brief: `materiale-sito/PROMPT.md`.
- Portfolio PDF e CV: `materiale-sito/documenti/`.
- Immagini: `materiale-sito/immagini/` (pagine del portfolio, processo, merch, copertina a due livelli, stella).
- Font: `materiale-sito/font/`.
- Prova forte: Synapses 2026 è stato **adottato da LABA** come identità ufficiale; il video EnergiaPura ha vinto il **premio Miglior Soggetto**.
- Non esistono testimonianze, clienti o numeri oltre a questi: non inventarli.

## Product Principles

1. Il sito è la prova: ogni dettaglio di codice e di design deve reggere una domanda a un colloquio.
2. I lavori parlano: l'interfaccia lascia spazio ai progetti e ai loro colori.
3. Prima il telefono: se non funziona a 375 px, non funziona.
4. Un sito con una sua identità, non un template e non una copia del PDF.
5. Niente contenuti inventati.

## Accessibility & Inclusion

Contrasto sufficiente, testo alternativo sulle immagini, navigazione da tastiera, HTML semantico, rispetto di `prefers-reduced-motion`.
