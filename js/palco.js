/* ==========================================================================
   palco.js: PORTFOLIO e le bolle-lente

   Come funziona l'effetto lente, in tre strati dello stesso SVG:
   1. PORTFOLIO nitido, con una maschera che lo nasconde DENTRO le bolle.
   2. Le bolle colorate.
   3. Una seconda copia di PORTFOLIO, deformata da un filtro (turbolenza +
      spostamento dei pixel), con una maschera che la mostra SOLO dentro le bolle.
   Così fuori dalle bolle le lettere sono nette, dentro diventano liquide.
   Ogni bolla è definita una sola volta (<ellipse> in <defs>) e riusata con
   <use> nei tre posti: muovendo quella, si muove tutto insieme.
   ========================================================================== */

(function () {
  const svg = document.querySelector('[data-scena]');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';
  const menoMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Le voci arrivano dal menu: nome, indirizzo e i due colori di ciascuna
  const voci = [...document.querySelectorAll('[data-voce]')].map((a, i) => {
    const stile = getComputedStyle(a);
    return {
      id: a.dataset.voce,
      nome: a.textContent.trim(),
      c1: stile.getPropertyValue('--c1').trim(),
      c2: stile.getPropertyValue('--c2').trim(),
      menu: a,
      indice: i,
    };
  });

  // Piccolo aiuto per creare elementi SVG con i loro attributi
  function crea(tag, attributi = {}, genitore) {
    const el = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attributi)) el.setAttribute(k, v);
    if (genitore) genitore.appendChild(el);
    return el;
  }

  /* ---------- Costruzione dell'SVG ---------- */
  const defs = crea('defs', {}, svg);

  // Il filtro "liquido": il rumore sposta i pixel delle lettere
  const liquido = crea('filter', { id: 'liquido', x: '-10%', y: '-30%', width: '120%', height: '160%' }, defs);
  const ingrassa = crea('feMorphology', { operator: 'dilate', radius: '3', result: 'grasso' }, liquido);
  const rumore = crea('feTurbulence', { type: 'fractalNoise', baseFrequency: '0.006', numOctaves: '1', seed: '7', result: 'rumore' }, liquido);
  const sposta = crea('feDisplacementMap', { in: 'grasso', in2: 'rumore', scale: '60', xChannelSelector: 'R', yChannelSelector: 'G', result: 'spostato' }, liquido);
  // sfoca e poi ripassa netto: i bordi strappati diventano gocce morbide
  const ammorbidisci = crea('feGaussianBlur', { in: 'spostato', stdDeviation: '5', result: 'sfocato' }, liquido);
  crea('feColorMatrix', { in: 'sfocato', values: '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8' }, liquido);
  // il rumore "respira" piano, così il liquido sembra muoversi (solo su schermi grandi)
  if (!menoMovimento && window.innerWidth > 700) {
    crea('animate', { attributeName: 'baseFrequency', values: '0.006;0.009;0.006', dur: '10s', repeatCount: 'indefinite' }, rumore);
  }

  // Il riflesso lucido delle bolle: un'ellisse bianca sfocata
  const lucido = crea('filter', { id: 'lucido', x: '-50%', y: '-50%', width: '200%', height: '200%' }, defs);
  crea('feGaussianBlur', { stdDeviation: '6' }, lucido);

  // Per ogni voce: la forma, il gradiente
  voci.forEach((v) => {
    v.forma = crea('ellipse', { id: `forma-${v.id}` }, defs);
    const g = crea('radialGradient', { id: `colore-${v.id}`, cx: '35%', cy: '30%', r: '80%' }, defs);
    crea('stop', { offset: '0%', 'stop-color': '#ffffff' }, g);
    crea('stop', { offset: '12%', 'stop-color': v.c1 }, g);
    crea('stop', { offset: '55%', 'stop-color': v.c1 }, g);
    crea('stop', { offset: '100%', 'stop-color': v.c2 }, g);
  });

  // Le due maschere: "fuori" nasconde l'interno delle bolle, "dentro" mostra solo quello
  const fuori = crea('mask', { id: 'fuori', maskUnits: 'userSpaceOnUse' }, defs);
  const sfondoFuori = crea('rect', { fill: 'white' }, fuori);
  const dentro = crea('mask', { id: 'dentro', maskUnits: 'userSpaceOnUse' }, defs);
  const sfondoDentro = crea('rect', { fill: 'black' }, dentro);
  voci.forEach((v) => {
    crea('use', { href: `#forma-${v.id}`, fill: 'black' }, fuori);
    crea('use', { href: `#forma-${v.id}`, fill: 'white' }, dentro);
  });

  // Strato 1: PORTFOLIO nitido
  const scrittaNitida = crea('g', { mask: 'url(#fuori)', fill: 'currentColor' }, svg);
  // Strato 2: le bolle (ognuna è un link al suo pannello)
  const bolle = crea('g', {}, svg);
  voci.forEach((v) => {
    v.link = crea('a', { href: `#${v.id}`, tabindex: '-1' }, bolle);   // da tastiera si usa il menu
    crea('use', { href: `#forma-${v.id}`, fill: `url(#colore-${v.id})` }, v.link);
    // il riflesso sta nel gruppo della bolla: una bolla dietro non presta le sue luci a quella davanti
    v.riflesso = crea('ellipse', { fill: 'white', opacity: '0.5', filter: 'url(#lucido)', 'pointer-events': 'none' }, v.link);
    v.punto = crea('circle', { fill: 'white', opacity: '0.9', 'pointer-events': 'none' }, v.link);
    v.etichetta = crea('text', { class: 'etichetta', 'text-anchor': 'middle' }, v.link);
    v.etichetta.textContent = v.nome;
  });
  // Strato 3: PORTFOLIO liquido, visibile solo dentro le bolle
  const scrittaLiquida = crea('g', { mask: 'url(#dentro)', filter: 'url(#liquido)', fill: 'currentColor', 'pointer-events': 'none' }, svg);

  /* ---------- Misure: la scritta occupa tutta la larghezza ---------- */
  let L = 0;  // larghezza della scena
  let A = 0;  // altezza della scena

  // Il recinto delle bolle: lontano dai testi del nome e del menu,
  // così le scritte piccole restano sempre su fondo chiaro
  const recinto = { sinistra: 0, destra: 0, alto: 0, basso: 0 };
  function misuraRecinto() {
    const scena = svg.getBoundingClientRect();
    const testa = document.querySelector('.testa').getBoundingClientRect();
    const menu = document.querySelector('.menu').getBoundingClientRect();
    recinto.sinistra = 0;
    recinto.alto = testa.bottom - scena.top + 8;
    if (L < 640) {
      recinto.destra = L;
      recinto.basso = menu.top - scena.top - 8;   // sul telefono il menu sta in basso
    } else {
      recinto.destra = menu.left - scena.left - 16; // su schermo largo il menu sta a destra
      recinto.basso = A;
    }
  }

  function scriviPortfolio() {
    L = svg.clientWidth;
    A = svg.clientHeight;
    svg.setAttribute('viewBox', `0 0 ${L} ${A}`);
    for (const r of [sfondoFuori, sfondoDentro]) { r.setAttribute('width', L); r.setAttribute('height', A); }

    const margine = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--margine')) * 16 || 24;
    const stretto = L < 640;
    const righe = stretto ? ['PORT', 'FOLIO'] : ['PORTFOLIO'];

    for (const gruppo of [scrittaNitida, scrittaLiquida]) gruppo.replaceChildren();

    // Prima misuriamo la parola a 100px, poi la ingrandiamo per riempire la larghezza
    const prova = crea('text', { 'font-family': 'Satoshi', 'font-weight': '900', 'font-size': '100', 'letter-spacing': '-4' }, svg);
    prova.textContent = stretto ? 'FOLIO' : 'PORTFOLIO';
    const larghezzaA100 = prova.getComputedTextLength();
    prova.remove();
    const corpo = Math.min(((L - margine * 2) / larghezzaA100) * 100, A * (stretto ? 0.24 : 0.36));
    const interlinea = corpo * 0.86;
    // la deformazione è proporzionale alla grandezza delle lettere
    ingrassa.setAttribute('radius', (corpo * 0.011).toFixed(1));
    sposta.setAttribute('scale', (corpo * 0.2).toFixed(1));
    ammorbidisci.setAttribute('stdDeviation', (corpo * 0.016).toFixed(1));
    // su schermi larghi la parola poggia sul fondo della pagina, sotto il menu;
    // sul telefono sta a metà, tra il nome in alto e il menu in basso
    const primaRiga = stretto ? A * 0.36 : A - margine - corpo * 0.04;

    righe.forEach((parola, i) => {
      for (const gruppo of [scrittaNitida, scrittaLiquida]) {
        const t = crea('text', {
          x: margine, y: primaRiga + i * interlinea,
          'font-family': 'Satoshi', 'font-weight': '900',
          'font-size': corpo.toFixed(1), 'letter-spacing': (-corpo * 0.04).toFixed(1),
        }, gruppo);
        t.textContent = parola;
      }
    });
  }

  /* ---------- Le bolle: posizione, velocità, forma ---------- */
  function casuale(n) { const x = Math.sin(n * 91.7) * 43758.5; return x - Math.floor(x); }

  function preparaBolle() {
    const base = Math.min(L, A);
    voci.forEach((v, i) => {
      const progetto = i < 5;
      v.raggio = base * (progetto ? 0.11 + casuale(i) * 0.05 : 0.085);
      v.allungo = 1 + casuale(i + 3) * 0.45;             // quanto è ovale
      const r = v.raggio * v.allungo;
      v.x = recinto.sinistra + r + casuale(i + 11) * Math.max(1, recinto.destra - recinto.sinistra - 2 * r);
      v.y = recinto.alto + r + casuale(i + 17) * Math.max(1, recinto.basso - recinto.alto - 2 * r);
      const angolo = casuale(i + 23) * Math.PI * 2;
      const velocita = (0.35 + casuale(i + 29) * 0.4) * Math.max(0.6, L / 1440);
      v.vx = Math.cos(angolo) * velocita;
      v.vy = Math.sin(angolo) * velocita;
      v.giro = casuale(i + 31) * 180;
      v.scala = 1;
      v.scalaObiettivo = 1;
    });
  }

  function disegnaBolla(v, tempo) {
    // un respiro lento: la bolla si allunga e si accorcia
    const respiro = menoMovimento ? 0 : Math.sin(tempo * 0.0008 + v.indice) * 0.06;
    const rx = v.raggio * v.scala * (v.allungo + respiro);
    const ry = v.raggio * v.scala * (1 - respiro);
    v.forma.setAttribute('cx', v.x.toFixed(1));
    v.forma.setAttribute('cy', v.y.toFixed(1));
    v.forma.setAttribute('rx', rx.toFixed(1));
    v.forma.setAttribute('ry', ry.toFixed(1));
    v.forma.setAttribute('transform', `rotate(${v.giro.toFixed(1)} ${v.x.toFixed(1)} ${v.y.toFixed(1)})`);
    v.riflesso.setAttribute('cx', (v.x - rx * 0.3).toFixed(1));
    v.riflesso.setAttribute('cy', (v.y - ry * 0.45).toFixed(1));
    v.riflesso.setAttribute('rx', (rx * 0.3).toFixed(1));
    v.riflesso.setAttribute('ry', (ry * 0.16).toFixed(1));
    v.punto.setAttribute('cx', (v.x - rx * 0.36).toFixed(1));
    v.punto.setAttribute('cy', (v.y - ry * 0.47).toFixed(1));
    v.punto.setAttribute('r', (Math.min(rx, ry) * 0.06).toFixed(1));
    v.etichetta.setAttribute('x', v.x.toFixed(1));
    v.etichetta.setAttribute('y', (v.y + Math.max(rx, ry) + 22).toFixed(1));
  }

  let fermo = false;   // diventa vero mentre un pannello è aperto
  function passo(tempo) {
    if (!fermo) {
      for (const v of voci) {
        v.x += v.vx;
        v.y += v.vy;
        // rimbalza sui bordi del recinto (la bolla intera resta dentro)
        const r = v.raggio * v.allungo * v.scala;
        if (v.x < recinto.sinistra + r || v.x > recinto.destra - r) v.vx *= -1;
        if (v.y < recinto.alto + r || v.y > recinto.basso - r) v.vy *= -1;
        v.x = Math.min(recinto.destra - r, Math.max(recinto.sinistra + r, v.x));
        v.y = Math.min(recinto.basso - r, Math.max(recinto.alto + r, v.y));
        v.giro += 0.04;
        v.scala += (v.scalaObiettivo - v.scala) * 0.15;
        disegnaBolla(v, tempo);
      }
    }
    requestAnimationFrame(passo);
  }

  // Passando sulla voce del menu, la sua bolla si gonfia e mostra il nome
  voci.forEach((v) => {
    const su = () => { v.scalaObiettivo = 1.18; v.link.classList.add('e-evidenza'); if (menoMovimento) disegnaBolla(v, 0); };
    const giu = () => { v.scalaObiettivo = 1; v.link.classList.remove('e-evidenza'); if (menoMovimento) disegnaBolla(v, 0); };
    for (const el of [v.menu, v.link]) {
      el.addEventListener('pointerenter', su);
      el.addEventListener('pointerleave', giu);
    }
    v.menu.addEventListener('focus', su);
    v.menu.addEventListener('blur', giu);
  });

  /* ---------- Avvio ---------- */
  document.fonts.ready.then(() => {
    scriviPortfolio();
    misuraRecinto();
    preparaBolle();
    voci.forEach((v) => disegnaBolla(v, 0));
    if (!menoMovimento) requestAnimationFrame(passo);
  });
  window.addEventListener('resize', () => {
    scriviPortfolio();
    misuraRecinto();
    preparaBolle();
    voci.forEach((v) => disegnaBolla(v, 0));
  });

  // Quello che serve a pannelli.js: dove sta una bolla adesso, e fermare/ripartire
  window.palco = {
    bolla(id) {
      const v = voci.find((x) => x.id === id);
      if (!v) return null;
      const r = svg.getBoundingClientRect();
      const scala = r.width / L;
      return { x: r.left + v.x * scala, y: r.top + v.y * scala, raggio: v.raggio * v.allungo * v.scala * scala };
    },
    ferma() { fermo = true; },
    riparti() { fermo = false; },
  };
})();
