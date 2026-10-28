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
- **Aperti:** i link di Imaze ed EnergiaPura cambieranno (repository da rinominare): Matilde fornirà i nuovi indirizzi.
- Le locandine JU1CE contengono il refuso "THRISTY": è una scelta di Matilde tenerlo, non correggerlo e non segnalarlo come errore.

## Brand Commitments

**28/10/2026, visione aggiornata di Matilde** (sostituisce le lettere-goccia bordeaux; riferimenti: manifesti "VISION" e "YOUR REALITY IS NOT MINE", la pagina "Blobs", il menu di lucabotturi.com).

- **Apertura:** la scritta PORTFOLIO grande, solida, nera, in un grottesco pesante. Sopra viaggiano di continuo bolle e blob lucidi, sfumati, con riflessi.
- **Le bolle fanno da lente:** dove una bolla passa sopra PORTFOLIO, le lettere sotto si deformano e diventano liquide; fuori dalla bolla restano nette.
- **Una bolla per ogni voce del menu:** i 5 progetti, Chi sono, Contatti. Ogni bolla progetto è sfumata nei due colori del suo progetto (TESTI.md): Imaze #1d1d1b/#e13155, Synapses #fcc505/#ed7238, JU1CE #5120f5/#a0db2e, EnergiaPura #1b2859/#519898, Virtuoso #b28c83/#510000. Chi sono e Contatti nel mondo della stella (bordeaux): da confermare.
- **Menu a destra.** Scegliendo una voce (dal menu o cliccando la bolla), la sua bolla, che sta viaggiando, si apre: si allarga tirando gli angoli fino ai vertici della pagina, poi si restringe sul pannello con il contenuto (progetto, Chi sono, Contatti). Ispirazione: l'apertura dei pannelli di lucabotturi.com, ricreata da zero.
- **La stella di Matilde** resta un elemento del mondo, insieme alle bolle.
- **Ogni pannello ha il suo indirizzo** (es. `#imaze`) per poter mandare il link a un singolo progetto; senza JavaScript i contenuti restano leggibili come pagina normale.
- **Testi:** Satoshi (il font del CV).
- **Telefono:** le bolle si toccano direttamente; il menu laterale va adattato allo schermo stretto.

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
