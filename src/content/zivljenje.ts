import { qa, type Journey, type QA } from '../core/types';

// Source: zapiski/02-zivljenje-nekoc-in-danes-fosili.md

const celicni: QA[] = [
  qa('Kdaj se je pojavilo življenje?', 'Pred skoraj 4 milijardami let', 'Pred 600 milijoni let', 'Pred 300.000 leti'),
  qa('Kakšni so bili prvi organizmi?', 'Enocelični', 'Večcelični', 'Dinozavri'),
  qa('Današnjim … so bili podobni prvi organizmi.', 'Bakterijam', 'Rastlinam', 'Ribam'),
  qa('Kdo je v okolje začel sproščati kisik?', 'Cianobakterije (modrozelene cepljivke)', 'Dinozavri', 'Trilobiti'),
  qa('Kaj je naredil kisik?', 'Močno spremenil okolje: nekaterim škodil, drugim omogočil širjenje', 'Ni naredil nič', 'Ustvaril je Luno'),
  qa('Kako dolgo so živeli le enocelični organizmi?', 'Skoraj 3 milijarde let', 'Nekaj tisoč let', 'Samo 1 milijon let'),
  qa('Kdaj so se pojavili prvi večcelični organizmi?', 'Pred približno 1,2 milijarde let', 'Pred 4 milijardami let', 'Pred 60 milijoni let'),
  qa('Kje se je življenje dolgo razvijalo?', 'Predvsem v morju', 'Na kopnem', 'V zraku'),
  qa('Kaj pomeni beseda cianin?', 'Modrozeleno barvilo', 'Rdeče barvilo', 'Vrsta kisika'),
  qa('Kaj lahko vpliva na preživetje organizmov?', 'Vulkanski izbruhi, trki asteroidov, poledenitve', 'Samo dež', 'Nič'),
  qa('Prve bakterije so bile …', 'Enocelične', 'Večcelične', 'Kopenske rastline'),
  qa('Pred približno 600 milijoni let se je zgodil …', 'Velik porast števila živalskih vrst', 'Nastanek Sonca', 'Konec dinozavrov'),
];

const fosili: QA[] = [
  qa('Fosili so …', 'Sledi življenja iz preteklih obdobij', 'Sodobne rastline', 'Vrsta kamnine'),
  qa('Znanost, ki preučuje fosile, je …', 'Paleontologija', 'Astronomija', 'Ekologija'),
  qa('V kakšnih kamninah so fosili ohranjeni predvsem?', 'V sedimentnih', 'V steklu', 'V kovinah'),
  qa('Kje se lahko organizem ohrani (konzervacija)?', 'V jantarju, ledu ali suhem okolju', 'V vroči lavi', 'V toplem deževju'),
  qa('Kaj so živi fosili?', 'Organizmi, podobni svojim davnim sorodnikom', 'Pravkar nastali fosili', 'Živali, ki so nastale iz kamna'),
  qa('Kateri organizem je živi fosil?', 'Ginko', 'Hrast', 'Detelja'),
  qa('Kateri živi morski organizem je podoben izumrlemu amonitu?', 'Brodnik', 'Delfin', 'Rak'),
  qa('Iz fosilov sklepamo …', 'Kako so organizmi živeli in kako se je življenje spreminjalo', 'Koliko je star Mars', 'Kakšno bo vreme'),
  qa('Fosil je lahko …', 'Ostanek telesa, odtis ali druga sled', 'Samo kost', 'Samo zob'),
  qa('Fosili ali …', 'Okamnine', 'Kristali', 'Minerali'),
];

export const zivljenje: Journey = {
  id: 'zivljenje',
  title: 'Življenje nekoč in danes',
  icon: '🦕',
  blurb: 'Časovni trak življenja, fosili in živi fosili',
  theme: { bg: 0xffe8a3, ink: '#5a3a22', dark: false, accent: 0xff9f6b },
  stages: [
    {
      scene: 'Sequence', icon: '⏳', label: 'Časovni trak',
      data: {
        title: 'Časovni trak življenja',
        startLabel: 'Najstarejše', endLabel: 'Najmlajše',
        items: [
          { text: 'Prvi enoceličarji', emoji: '🦠', note: 'pred skoraj 4 mrd. let' },
          { text: 'Fotosintetski enoceličarji', emoji: '💨', note: 'pred 3,5 mrd. let' },
          { text: 'Prvi mnogocelični', emoji: '🪸', note: 'pred 1,2 mrd. let' },
          { text: 'Ribe', emoji: '🐟', note: 'pred 500 mio. let' },
          { text: 'Prve kopenske rastline', emoji: '🌿', note: 'pred 470 mio. let' },
          { text: 'Dvoživke', emoji: '🐸', note: 'pred 370 mio. let' },
          { text: 'Plazilci', emoji: '🦎', note: 'pred 320 mio. let' },
          { text: 'Dinozavri', emoji: '🦖', note: 'pred 230 mio. let' },
          { text: 'Ptice', emoji: '🐦', note: 'pred 150 mio. let' },
          { text: 'Primati', emoji: '🐒', note: 'pred 60 mio. let' },
          { text: 'Homo sapiens', emoji: '🧑', note: 'pred 300.000 leti' },
        ],
      },
      recap: [
        'Enoceličarji (4 mrd.) → fotosintetski (3,5 mrd.) → mnogocelični (1,2 mrd.).',
        'Ribe (500 mio.) → kopenske rastline (470) → dvoživke (370) → plazilci (320).',
        'Dinozavri (230) → ptice (150) → primati (60) → Homo sapiens (300.000 let).',
      ],
    },
    {
      scene: 'Catch', icon: '🦠', label: 'Enocelični in kisik',
      data: { title: 'Prvi organizmi in kisik', questions: celicni, count: 9 },
      recap: [
        'Življenje se je pojavilo pred skoraj 4 milijardami let. Prvi organizmi so bili enocelični, podobni bakterijam.',
        'Skoraj 3 milijarde let so živeli samo enocelični organizmi.',
        'Cianobakterije (modrozelene cepljivke) so sproščale kisik, ki je močno spremenil okolje.',
        'Prvi večcelični organizmi: pred 1,2 mrd. let. Življenje se je dolgo razvijalo v morju.',
      ],
    },
    {
      scene: 'Match', icon: '🐸', label: 'Kdo je kdo?',
      data: {
        title: 'Skupine živih bitij',
        perRound: 4,
        pairs: [
          { a: 'Ribe', ea: '🐟', b: 'Prvi vretenčarji, živeli so v vodi' },
          { a: 'Dvoživke', ea: '🐸', b: 'Vretenčarji, ki so začeli živeti tudi na kopnem' },
          { a: 'Plazilci', ea: '🦎', b: 'Razmnoževanje manj vezano na vodo' },
          { a: 'Dinozavri', ea: '🦖', b: 'Raznolika skupina plazilcev, dolgo prevladovali na kopnem' },
          { a: 'Ptice', ea: '🐦', b: 'Razvile so se iz pernatih dinozavrov' },
          { a: 'Cvetnice', ea: '🌸', b: 'Rastline s cvetovi' },
          { a: 'Primati', ea: '🐒', b: 'Skupina sesalcev, v katero spada tudi človek' },
          { a: 'Cianobakterije', ea: '🦠', b: 'Prve so sproščale kisik' },
        ],
      },
      recap: [
        'Ribe so prvi vretenčarji. Dvoživke so prve zaživele tudi na kopnem.',
        'Plazilci se razmnožujejo manj vezano na vodo. Dinozavri so dolgo prevladovali na kopnem.',
        'Ptice so se razvile iz pernatih dinozavrov. Primati so skupina sesalcev, ki vključuje človeka.',
      ],
    },
    {
      scene: 'Match', icon: '🔍', label: 'Fosili – pojmi',
      data: {
        title: 'Fosili: kaj je kaj?',
        perRound: 5,
        pairs: [
          { a: 'Fosili (okamnine)', ea: '🦴', b: 'Sledi življenja iz preteklih obdobij' },
          { a: 'Paleontologija', ea: '🔬', b: 'Znanost, ki preučuje fosile in zgodovino življenja' },
          { a: 'Živi fosili', ea: '🌿', b: 'Podobni svojim davnim sorodnikom' },
          { a: 'Brodnik', ea: '🐚', b: 'Živ sorodnik izumrlega amonita' },
          { a: 'Ginko', ea: '🍃', b: 'Rastlina, primer živega fosila' },
        ],
      },
      recap: [
        'Fosili ali okamnine: ostanki teles, ostanki izločkov, odtisi in druge sledi, ohranjeni predvsem v sedimentnih kamninah.',
        'Paleontologija je znanost, ki preučuje fosile in zgodovino življenja.',
        'Živi fosili so podobni svojim davnim sorodnikom (brodnik, ginko).',
      ],
    },
    {
      scene: 'Catch', icon: '🦴', label: 'Fosili',
      data: { title: 'Fosili in paleontologija', questions: fosili, count: 8 },
      recap: [
        'Fosili so dokazi, iz katerih sklepamo, kako so organizmi živeli in kako se je življenje spreminjalo.',
        'Fosili se razlikujejo po načinu nastanka: sledi, odtisi, okamnine, pooglenitev, konzervacija (jantar, led, suho okolje).',
      ],
    },
    {
      scene: 'Boss', icon: '🦖', label: 'Boss: T-Rex',
      data: { title: 'Končni boj: življenje', boss: { emoji: '🦖', name: 'Mogočni T-Rex' }, questions: [...celicni, ...fosili], count: 10 },
      recap: [
        'Spremembe okolja vplivajo na preživetje: vulkanski izbruhi, trki asteroidov, poledenitve, podnebne spremembe.',
        'Če katero vprašanje še dela težave, ponovi nivoje na zemljevidu.',
      ],
    },
  ],
};
