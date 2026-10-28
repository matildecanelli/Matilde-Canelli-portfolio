/* ==========================================================================
   palco.js: PORTFOLIO e le bolle di vetro (Three.js, WebGL)

   L'idea, in quattro passi:
   1. PORTFOLIO viene disegnato in un canvas 2D nascosto e diventa una
      "texture": un'immagine che la scheda grafica può leggere.
   2. Quella texture riempie lo sfondo della scena 3D.
   3. Le bolle sono sfere con un materiale fatto a mano (uno "shader"):
      ogni punto della bolla legge lo sfondo spostato come farebbe il vetro
      (rifrazione), e lo legge 6 volte con indici diversi per ogni colore,
      così ai bordi le lettere si aprono in frange colorate (dispersione).
   4. Sulla superficie di ogni bolla si riflette la stella di Matilde.
   Ogni bolla è una voce del menu: cliccandola si apre il suo pannello.
   ========================================================================== */

import * as THREE from 'three';

const canvas = document.querySelector('[data-scena]');
const etichetta = document.querySelector('[data-etichetta]');
const menoMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Le voci arrivano dal menu: indirizzo, nome e colore di ciascuna
const voci = [...document.querySelectorAll('[data-voce]')].map((a, i) => ({
  id: a.dataset.voce,
  nome: a.textContent.trim(),
  colore: getComputedStyle(a).getPropertyValue('--c1').trim(),
  colore2: getComputedStyle(a).getPropertyValue('--c2').trim(),
  menu: a,
  indice: i,
}));

/* ---------- 0. Il motore: se WebGL non c'è, resta la scritta normale ---------- */
let motore;
try {
  motore = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
} catch (errore) {
  document.documentElement.classList.add('senza-webgl');
}

if (motore) avvia();

function avvia() {
  motore.setClearColor(0x0b0b0c, 1);
  motore.outputColorSpace = THREE.SRGBColorSpace;
  const stretto = () => window.innerWidth < 640 || window.innerWidth / window.innerHeight < 1;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);

  /* ---------- 1. PORTFOLIO in un canvas 2D, che diventa texture ---------- */
  const tela = document.createElement('canvas');
  const pennello = tela.getContext('2d');
  const sfondo = new THREE.CanvasTexture(tela);
  sfondo.colorSpace = THREE.SRGBColorSpace;
  sfondo.minFilter = THREE.LinearFilter;
  sfondo.generateMipmaps = false;

  function disegnaScritta(L, A, dpr) {
    tela.width = Math.round(L * dpr);
    tela.height = Math.round(A * dpr);
    pennello.setTransform(dpr, 0, 0, dpr, 0, 0);
    pennello.fillStyle = '#0b0b0c';
    pennello.fillRect(0, 0, L, A);

    // La parola deve stare lontana dal menu: stesso spazio libero a destra e a sinistra
    const menu = document.querySelector('.menu').getBoundingClientRect();
    const margine = Math.max(16, Math.min(36, L * 0.025));
    const telefono = stretto();
    const libero = telefono ? L - margine * 2 : L - 2 * (menu.width + margine * 3);
    const righe = telefono ? ['PORT', 'FOLIO'] : ['PORTFOLIO'];

    let corpo = 100;
    pennello.font = `400 ${corpo}px Anton`;
    const piuLarga = Math.max(...righe.map((r) => pennello.measureText(r).width));
    corpo = Math.min((libero / piuLarga) * 100, A * (telefono ? 0.26 : 0.34));
    pennello.font = `400 ${corpo}px Anton`;
    pennello.fillStyle = '#e9e9e9';
    pennello.textAlign = 'center';
    pennello.textBaseline = 'alphabetic';

    // al centro esatto: l'altezza delle maiuscole di Anton è circa 0.73 del corpo
    const maiuscole = corpo * 0.73;
    const interlinea = corpo * 0.95;
    const centroY = A * (telefono ? 0.46 : 0.5);
    righe.forEach((riga, i) => {
      const y = centroY + maiuscole / 2 + (i - (righe.length - 1) / 2) * interlinea;
      pennello.fillText(riga, L / 2, y);
    });
    sfondo.needsUpdate = true;
  }

  // Lo sfondo è un rettangolo che copre tutto lo schermo
  const scenaSfondo = new THREE.Scene();
  const quadro = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
      uniforms: { uTex: { value: sfondo } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: `uniform sampler2D uTex; varying vec2 vUv;
        void main(){ gl_FragColor = texture2D(uTex, vUv);
        #include <colorspace_fragment>
        }`,
      depthTest: false,
      depthWrite: false,
    })
  );
  quadro.frustumCulled = false;
  scenaSfondo.add(quadro);

  /* ---------- 2. Il vetro: lo shader delle bolle ---------- */
  const giri = stretto() ? 8 : 16;   // quante letture per pixel: meno sul telefono, che è più lento
  const vertice = `
    uniform float uTempo; uniform float uSeme; uniform float uIrregolare;
    varying vec3 vNormal; varying vec3 vEye;

    // la superficie della bolla: una sfera spinta in fuori e in dentro da onde lente
    vec3 deforma(vec3 p){
      float t = uTempo * 0.5;
      float onda = sin(p.x * 2.1 + t + uSeme) * sin(p.y * 1.8 + t * 1.3 + uSeme * 2.0) * 0.6
                 + sin(p.z * 2.6 + p.x * 1.2 - t * 0.8 + uSeme * 3.0) * 0.4;
      return p * (1.0 + onda * uIrregolare);
    }

    void main(){
      vec3 p = deforma(position);
      // la nuova normale: guardiamo due punti vicini sulla superficie deformata
      vec3 n0 = normalize(normal);
      vec3 t1 = normalize(cross(n0, abs(n0.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
      vec3 t2 = cross(n0, t1);
      vec3 pa = deforma(normalize(position + t1 * 0.01));
      vec3 pb = deforma(normalize(position + t2 * 0.01));
      vec3 n = normalize(cross(pa - p, pb - p));
      if (dot(n, n0) < 0.0) n = -n;

      vec4 mondo = modelMatrix * vec4(p, 1.0);
      vec4 vista = viewMatrix * mondo;
      gl_Position = projectionMatrix * vista;
      vNormal = normalize(normalMatrix * n);
      vEye = normalize(vista.xyz);
    }`;
  const frammento = `
    #define GIRI ${giri}
    uniform sampler2D uTexture; uniform sampler2D uStella; uniform vec2 uResolution;
    uniform float uIorR, uIorY, uIorG, uIorC, uIorB, uIorP;
    uniform float uRefractPower, uChromatic, uSaturation, uShininess, uDiffuseness, uFresnelPower;
    uniform vec3 uLight; uniform float uBackside; uniform vec3 uTinta;
    uniform vec2 uSpostaStella; uniform float uForzaStella;
    uniform vec3 uColore1; uniform vec3 uColore2; uniform float uForzaColori;
    varying vec3 vNormal; varying vec3 vEye;

    vec3 saturazione(vec3 c, float a){ float l = dot(c, vec3(0.2125, 0.7154, 0.0721)); return mix(vec3(l), c, a); }
    float luce(vec3 dir, float lucidita, float diffusa, vec3 n, vec3 occhio){
      vec3 l = normalize(-dir); vec3 meta = normalize(-occhio + l);
      return pow(max(dot(n, meta), 0.0), lucidita) + max(0.0, dot(n, l)) * diffusa;
    }
    vec3 leggi(vec2 uv){ return texture2D(uTexture, uv).rgb; }

    void main(){
      vec2 uv = gl_FragCoord.xy / uResolution;
      vec3 n = normalize(vNormal);
      if (uBackside > 0.5) n = -n;
      vec3 occhio = normalize(vEye);
      vec3 colore = vec3(0.0);

      for (int i = 0; i < GIRI; i++) {
        float scivola = float(i) / float(GIRI) * 0.045;
        vec3 rR = refract(occhio, n, 1.0 / uIorR);
        vec3 rY = refract(occhio, n, 1.0 / uIorY);
        vec3 rG = refract(occhio, n, 1.0 / uIorG);
        vec3 rC = refract(occhio, n, 1.0 / uIorC);
        vec3 rB = refract(occhio, n, 1.0 / uIorB);
        vec3 rP = refract(occhio, n, 1.0 / uIorP);
        float r = leggi(uv + rR.xy * (uRefractPower + scivola * 1.0) * uChromatic).x * 0.5;
        vec3 tY = leggi(uv + rY.xy * (uRefractPower + scivola * 1.0) * uChromatic);
        float y = (tY.x * 2.0 + tY.y * 2.0 - tY.z) / 6.0;
        float g = leggi(uv + rG.xy * (uRefractPower + scivola * 2.0) * uChromatic).y * 0.5;
        vec3 tC = leggi(uv + rC.xy * (uRefractPower + scivola * 2.5) * uChromatic);
        float c = (tC.y * 2.0 + tC.z * 2.0 - tC.x) / 6.0;
        float b = leggi(uv + rB.xy * (uRefractPower + scivola * 3.0) * uChromatic).z * 0.5;
        vec3 tP = leggi(uv + rP.xy * (uRefractPower + scivola * 1.0) * uChromatic);
        float p = (tP.z * 2.0 + tP.x * 2.0 - tP.y) / 6.0;
        float R = r + (2.0 * p + 2.0 * y - c) / 3.0;
        float G = g + (2.0 * y + 2.0 * c - p) / 3.0;
        float B = b + (2.0 * c + 2.0 * p - y) / 3.0;
        colore += vec3(R, G, B);
      }
      colore /= float(GIRI);
      colore = saturazione(colore, uSaturation);

      float lampi = luce(uLight, uShininess, uDiffuseness, n, occhio)
                  + 0.25 * luce(vec3(1.0, 1.0, -1.0), uShininess * 0.6, uDiffuseness * 0.5, n, occhio);
      colore += lampi * (uBackside > 0.5 ? 0.35 : 1.0);

      // i riflessi nei colori del progetto: il vetro riflette una "stanza" dipinta
      // con i suoi due colori, più forte verso i bordi della bolla, come nel vetro vero
      vec3 riflesso = reflect(occhio, n);
      vec3 stanza = mix(uColore2, uColore1, smoothstep(-0.6, 0.8, riflesso.y + riflesso.x * 0.3));
      float versoBordo = pow(1.0 - abs(dot(occhio, n)), 1.6);
      colore += stanza * (0.0 + versoBordo * 0.55) * uForzaColori * (uBackside > 0.5 ? 0.4 : 1.0);
      // due lampi colorati, uno per colore del progetto
      colore += uColore1 * luce(vec3(1.0, -0.7, 1.0), uShininess * 0.4, 0.0, n, occhio) * 0.8 * uForzaColori;
      colore += uColore2 * luce(vec3(-0.9, -1.0, 0.6), uShininess * 0.3, 0.0, n, occhio) * 0.6 * uForzaColori;

      // bordo luminoso (Fresnel), appena tinto del colore del progetto
      float f = pow(1.0 + dot(occhio, n), uFresnelPower);
      colore = mix(colore, mix(vec3(1.0), uTinta, 0.45), f * (uBackside > 0.5 ? 0.25 : 0.55));

      // la stella di Matilde riflessa sulla superficie (solo sul lato davanti)
      if (uBackside < 0.5) {
        vec3 rifl = reflect(occhio, n);
        vec2 suv = (rifl.xy - uSpostaStella) * 0.5 + 0.5;
        suv.y = 1.0 - suv.y;
        if (suv.x > 0.0 && suv.x < 1.0 && suv.y > 0.0 && suv.y < 1.0) {
          float stella = texture2D(uStella, suv).a;
          // sfuma la stella verso i bordi dell'immagine e verso il profilo della sfera,
          // dove la riflessione si schiaccia: niente ovali puntinati
          float lontanoDalBordo = min(min(suv.x, suv.y), min(1.0 - suv.x, 1.0 - suv.y));
          stella *= smoothstep(0.0, 0.06, lontanoDalBordo) * smoothstep(0.05, 0.3, abs(dot(occhio, n)));
          colore += stella * uForzaStella * mix(vec3(1.0), uColore1, 0.25);
        }
      }

      colore += vec3(0.004, 0.005, 0.007);
      gl_FragColor = vec4(colore, 1.0);
      #include <colorspace_fragment>
    }`;

  // la stella, caricata come texture (finché non arriva, il riflesso è spento)
  const stellaTex = new THREE.TextureLoader().load('assets/img/stella.png', () => {
    for (const b of bolle) { b.davanti.uniforms.uForzaStella.value = 0.32; }
    disegnaSeFermo();
  });

  const tempoCondiviso = { value: 0 };   // lo stesso orologio per tutte le bolle
  const uniformiBase = () => ({
    uTexture: { value: null }, uStella: { value: stellaTex }, uResolution: { value: new THREE.Vector2() },
    uIorR: { value: 1.15 }, uIorY: { value: 1.16 }, uIorG: { value: 1.18 },
    uIorC: { value: 1.22 }, uIorB: { value: 1.22 }, uIorP: { value: 1.22 },
    uRefractPower: { value: 0.2 }, uChromatic: { value: 0.5 }, uSaturation: { value: 1.08 },
    uShininess: { value: 90 }, uDiffuseness: { value: 0.02 }, uFresnelPower: { value: 5.0 },
    uLight: { value: new THREE.Vector3(-1, 1, 1) }, uBackside: { value: 0 },
    uTinta: { value: new THREE.Color(1, 1, 1) },
    uSpostaStella: { value: new THREE.Vector2(-0.04, 0.04) }, uForzaStella: { value: 0 },
    uColore1: { value: new THREE.Color() }, uColore2: { value: new THREE.Color() }, uForzaColori: { value: 0.45 },
    uTempo: tempoCondiviso, uSeme: { value: 0 }, uIrregolare: { value: 0.11 },
  });

  /* ---------- 3. Le bolle: una per voce ---------- */
  const forma = new THREE.SphereGeometry(1, 96, 64);
  const scena = new THREE.Scene();
  function casuale(n) { const x = Math.sin(n * 91.7) * 43758.5; return x - Math.floor(x); }

  const bolle = voci.map((v, i) => {
    const davanti = new THREE.ShaderMaterial({ uniforms: uniformiBase(), vertexShader: vertice, fragmentShader: frammento, side: THREE.FrontSide });
    const dietro = new THREE.ShaderMaterial({ uniforms: uniformiBase(), vertexShader: vertice, fragmentShader: frammento, side: THREE.BackSide });
    dietro.uniforms.uBackside.value = 1;
    dietro.uniforms.uRefractPower.value = 0.14;
    // la tinta del progetto, spenta: mescolata con il grigio
    const tinta = new THREE.Color(v.colore).lerp(new THREE.Color(0.7, 0.7, 0.7), 0.55);
    davanti.uniforms.uTinta.value = tinta;
    dietro.uniforms.uTinta.value = tinta;
    // i due colori del progetto per i riflessi, e un "seme" perché ogni bolla abbia la sua forma
    for (const m of [davanti, dietro]) {
      m.uniforms.uSeme.value = i * 1.7 + 0.4;
      m.uniforms.uColore1.value.set(v.colore);
      m.uniforms.uColore2.value.set(v.colore2);
    }
    const sfera = new THREE.Mesh(forma, davanti);
    sfera.userData.voce = v;
    scena.add(sfera);
    return {
      voce: v, sfera, davanti, dietro,
      dimensione: (i < 5 ? 1.35 + casuale(i) * 0.35 : 0.8),   // le bolle dei progetti sono le più grandi
      fase: casuale(i + 7) * Math.PI * 2,
      x: 0, y: 0, vx: 0, vy: 0, scala: 1, scalaObiettivo: 1,
    };
  });

  /* ---------- Lo scoppio: la bolla si rompe in goccioline di vetro ---------- */
  const gocce = [];                       // { mesh, vx, vy, misura, vita }
  const gruppoGocce = new THREE.Group();
  scena.add(gruppoGocce);
  const DURATA_GOCCE = 0.65;              // secondi

  function scoppia(b) {
    const r0 = b.raggio * b.scala;
    b.sfera.visible = false;
    for (let k = 0; k < 26; k++) {
      const angolo = (k / 26) * Math.PI * 2 + Math.random() * 0.3;
      const goccia = new THREE.Mesh(forma, b.davanti);   // lo stesso vetro della bolla
      const misura = r0 * (0.04 + Math.random() * 0.07);
      goccia.position.set(b.x + Math.cos(angolo) * r0 * 0.92, b.y + Math.sin(angolo) * r0 * 0.92, b.sfera.position.z);
      const spinta = r0 * (2.2 + Math.random() * 2.6);
      gocce.push({ mesh: goccia, vx: Math.cos(angolo) * spinta, vy: Math.sin(angolo) * spinta, misura, vita: 0 });
      gruppoGocce.add(goccia);
    }
  }

  function muoviGocce(dt) {
    for (let i = gocce.length - 1; i >= 0; i--) {
      const g = gocce[i];
      g.vita += dt;
      const frenata = Math.pow(0.9, dt * 60);
      g.vx *= frenata;
      g.vy = g.vy * frenata - altezzaVista * 0.6 * dt;   // un po' di gravità
      g.mesh.position.x += g.vx * dt;
      g.mesh.position.y += g.vy * dt;
      const resta = Math.max(0, 1 - g.vita / DURATA_GOCCE);
      g.mesh.scale.setScalar(g.misura * resta);
      if (g.vita >= DURATA_GOCCE) { gruppoGocce.remove(g.mesh); gocce.splice(i, 1); }
    }
  }

  /* ---------- 4. Due "fogli" su cui disegnare prima dello schermo ---------- */
  const fogli = [0, 1].map(() => new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType }));
  const [foglioDietro, foglioDavanti] = fogli;
  for (const b of bolle) {
    b.dietro.uniforms.uTexture.value = foglioDietro.texture;
    b.davanti.uniforms.uTexture.value = foglioDavanti.texture;
  }

  /* ---------- Misure: tutto si ricalcola quando cambia la finestra ---------- */
  let L = 0, A = 0, altezzaVista = 0, larghezzaVista = 0;
  function misura() {
    L = window.innerWidth;
    A = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    motore.setPixelRatio(dpr);
    motore.setSize(L, A, false);
    camera.aspect = L / A;
    camera.updateProjectionMatrix();
    altezzaVista = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    larghezzaVista = altezzaVista * camera.aspect;
    const buffer = motore.getDrawingBufferSize(new THREE.Vector2());
    for (const f of fogli) f.setSize(buffer.x, buffer.y);
    for (const b of bolle) { b.davanti.uniforms.uResolution.value.copy(buffer); b.dietro.uniforms.uResolution.value.copy(buffer); }
    disegnaScritta(L, A, dpr);

    // grandezza delle bolle: in pixel sullo schermo, poi tradotta in unità della scena
    const base = Math.min(L, A) * (stretto() ? 0.15 : 0.14);
    bolle.forEach((b) => { b.raggio = (base * b.dimensione / A) * altezzaVista; });
  }

  function posizionaAllInizio() {
    bolle.forEach((b, i) => {
      b.x = (casuale(i + 11) - 0.5) * larghezzaVista * 0.8;
      b.y = (casuale(i + 17) - 0.5) * altezzaVista * 0.8;
      const angolo = casuale(i + 23) * Math.PI * 2;
      const velocita = (0.16 + casuale(i + 29) * 0.18) * (altezzaVista / 5.36);   // unità al secondo
      b.crociera = velocita;
      b.vx = Math.cos(angolo) * velocita;
      b.vy = Math.sin(angolo) * velocita;
    });
  }

  /* ---------- Il disegno di un fotogramma ---------- */
  function disegna() {
    if (!menoMovimento) tempoCondiviso.value = performance.now() / 1000;
    for (const b of bolle) {
      const respiro = menoMovimento ? 0 : Math.sin(performance.now() * 0.0009 + b.fase) * 0.03;
      b.sfera.position.set(b.x, b.y, b.voce.indice * 0.02);
      b.sfera.scale.set(b.raggio * b.scala * (1 + respiro), b.raggio * b.scala * (1 - respiro), b.raggio * b.scala);
    }
    // 1. sfondo nel foglio "dietro"
    motore.setRenderTarget(foglioDietro);
    motore.render(scenaSfondo, camera);
    // 2. sfondo + retro delle bolle nel foglio "davanti"
    motore.setRenderTarget(foglioDavanti);
    motore.render(scenaSfondo, camera);
    for (const b of bolle) b.sfera.material = b.dietro;
    gruppoGocce.visible = false;
    motore.autoClear = false;
    motore.render(scena, camera);
    gruppoGocce.visible = true;
    motore.autoClear = true;
    // 3. sullo schermo: sfondo + fronte delle bolle, che leggono il foglio "davanti"
    motore.setRenderTarget(null);
    motore.render(scenaSfondo, camera);
    for (const b of bolle) b.sfera.material = b.davanti;
    motore.autoClear = false;
    motore.clearDepth();
    motore.render(scena, camera);
    motore.autoClear = true;
  }

  /* ---------- Movimento: le bolle vagano e rimbalzano sui bordi ---------- */
  let fermo = false;
  let ultimo = performance.now();
  function passo(adesso) {
    const dt = Math.min((adesso - ultimo) / 1000, 0.05);
    ultimo = adesso;
    if (!fermo || gocce.length) {
      if (gocce.length) muoviGocce(dt);
      for (const b of (fermo ? [] : bolle)) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        const r = b.raggio * 0.35;   // il centro resta sullo schermo, la bolla può uscire un po'
        const limX = larghezzaVista / 2 - r;
        const limY = altezzaVista / 2 - r;
        if (b.x < -limX || b.x > limX) { b.vx *= -1; b.x = THREE.MathUtils.clamp(b.x, -limX, limX); }
        if (b.y < -limY || b.y > limY) { b.vy *= -1; b.y = THREE.MathUtils.clamp(b.y, -limY, limY); }
        b.scala += (b.scalaObiettivo - b.scala) * Math.min(1, dt * 8);
      }
      // le bolle si sfiorano e si intersecano un po', poi si respingono: mai un unico blocco
      for (let i = 0; i < bolle.length; i++) {
        for (let j = i + 1; j < bolle.length; j++) {
          const a = bolle[i], c = bolle[j];
          if (!a.sfera.visible || !c.sfera.visible || fermo) continue;
          const dx = c.x - a.x, dy = c.y - a.y;
          const distanza = Math.hypot(dx, dy) || 0.001;
          const minima = (a.raggio * a.scala + c.raggio * c.scala) * 0.78;
          if (distanza < minima) {
            const spinta = ((minima - distanza) / minima) * 2.2 * dt;
            const ux = dx / distanza, uy = dy / distanza;
            a.vx -= ux * spinta; a.vy -= uy * spinta;
            c.vx += ux * spinta; c.vy += uy * spinta;
          }
        }
      }
      // ogni bolla torna alla sua velocità di crociera, così nessuna accelera all'infinito
      for (const b of (fermo ? [] : bolle)) {
        const v = Math.hypot(b.vx, b.vy) || 0.001;
        const k = 1 + (b.crociera / v - 1) * Math.min(1, dt * 1.5);
        b.vx *= k; b.vy *= k;
      }
      disegna();
      aggiornaEtichetta();
    }
    requestAnimationFrame(passo);
  }
  function disegnaSeFermo() { if (menoMovimento) disegna(); }

  /* ---------- Il mouse e il dito: la stella si sposta, le bolle si toccano ---------- */
  const raggio = new THREE.Raycaster();
  const puntatore = new THREE.Vector2();
  let sopra = null;      // la bolla sotto il puntatore
  let inizio = null;     // dove è iniziato un tocco, per distinguere click e trascinamento

  function bollaSotto(x, y) {
    puntatore.set((x / L) * 2 - 1, -(y / A) * 2 + 1);
    raggio.setFromCamera(puntatore, camera);
    const colpita = raggio.intersectObjects(bolle.filter((b) => b.sfera.visible).map((b) => b.sfera))[0];
    return colpita ? bolle.find((b) => b.sfera === colpita.object) : null;
  }
  function evidenzia(b) {
    if (sopra === b) return;
    if (sopra && !sopra.daMenu) sopra.scalaObiettivo = 1;
    sopra = b;
    if (b) b.scalaObiettivo = 1.08;
    canvas.classList.toggle('e-sopra-bolla', Boolean(b));
    etichetta.textContent = b ? b.voce.nome : '';
    etichetta.classList.toggle('e-visibile', Boolean(b));
    disegnaSeFermo();
  }
  function aggiornaEtichetta() {
    if (!sopra) return;
    const p = new THREE.Vector3(sopra.x, sopra.y, 0).project(camera);
    etichetta.style.left = `${(p.x + 1) / 2 * L}px`;
    etichetta.style.top = `${(1 - p.y) / 2 * A}px`;
  }

  window.addEventListener('pointermove', (e) => {
    // la stella riflessa segue il puntatore: si muove sulla superficie delle bolle
    for (const b of bolle) {
        b.davanti.uniforms.uSpostaStella.value.set(-0.04 + (e.clientX / L - 0.5) * 0.12, 0.04 - (e.clientY / A - 0.5) * 0.12);
    }
    if (e.target === canvas) evidenzia(bollaSotto(e.clientX, e.clientY));
    else if (sopra && !sopra.daMenu) evidenzia(null);
    if (menoMovimento) disegna();
  });
  canvas.addEventListener('pointerdown', (e) => { inizio = { x: e.clientX, y: e.clientY }; });
  canvas.addEventListener('pointerup', (e) => {
    if (!inizio || Math.hypot(e.clientX - inizio.x, e.clientY - inizio.y) > 8) return;   // era un trascinamento
    const b = bollaSotto(e.clientX, e.clientY);
    if (b) location.hash = b.voce.id;
    inizio = null;
  });

  // Passando sulla voce del menu, la sua bolla si gonfia e mostra il nome
  bolle.forEach((b) => {
    const su = () => { b.daMenu = true; evidenzia(b); };
    const giu = () => { b.daMenu = false; b.scalaObiettivo = 1; if (sopra === b) evidenzia(null); };
    b.voce.menu.addEventListener('pointerenter', su);
    b.voce.menu.addEventListener('pointerleave', giu);
    b.voce.menu.addEventListener('focus', su);
    b.voce.menu.addEventListener('blur', giu);
  });

  /* ---------- Avvio: aspettiamo il font, altrimenti la scritta nasce sbagliata ---------- */
  const font = Promise.all([document.fonts.load('400 100px Anton'), document.fonts.ready]);
  const attesa = new Promise((ok) => setTimeout(ok, 2500));
  Promise.race([font, attesa]).then(() => {
    misura();
    posizionaAllInizio();
    disegna();
    if (!menoMovimento) requestAnimationFrame(passo);
  });
  window.addEventListener('resize', () => { misura(); disegna(); });

  // Quello che serve a pannelli.js: dove sta una bolla sullo schermo, e fermare/ripartire
  window.palco = {
    bolla(id) {
      const b = bolle.find((x) => x.voce.id === id);
      if (!b || !altezzaVista) return null;
      const p = new THREE.Vector3(b.x, b.y, 0).project(camera);
      return { x: (p.x + 1) / 2 * L, y: (1 - p.y) / 2 * A, raggio: (b.raggio * b.scala / altezzaVista) * A };
    },
    ferma() { fermo = true; evidenzia(null); },
    riparti() { fermo = false; ultimo = performance.now(); },
    // la bolla si gonfia per un attimo e poi scoppia; la promessa si risolve allo scoppio
    scoppia(id) {
      const b = bolle.find((x) => x.voce.id === id);
      if (!b || menoMovimento || !b.sfera.visible) return Promise.resolve();
      b.scalaObiettivo = 1.22;
      return new Promise((fatto) => setTimeout(() => { scoppia(b); fatto(); }, 160));
    },
    // dopo la chiusura del pannello la bolla rinasce, piccola, e si gonfia
    riforma(id) {
      const b = bolle.find((x) => x.voce.id === id);
      if (!b || b.sfera.visible) return;
      b.sfera.visible = true;
      b.scala = 0.05;
      b.scalaObiettivo = 1;
    },
  };
}
