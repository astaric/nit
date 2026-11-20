import { qa, type Journey, type QA } from '../core/types';

// Source: zapiski/02-zivljenje-nekoc-in-danes-fosili.md

const celicni: QA[] = [
  qa('Kdaj se je pojavilo življenje?', 'Pred skoraj 4 milijardami let', 'Pred približno 3,5 milijarde let', 'Pred približno 1,2 milijarde let', 'Pred približno 600 milijoni let'),
  qa('Kakšni so bili prvi organizmi in komu so bili po zgradbi podobni?', 'Enocelični, podobni bakterijam', 'Enocelični, podobni evkariontom z jedrom', 'Večcelični, podobni današnjim glivam', 'Večcelični, podobni današnjim rastlinam'),
  qa('Kdo je v okolje začel sproščati kisik?', 'Cianobakterije (modrozelene cepljivke)', 'Prvi večcelični organizmi v morju', 'Prve kopenske rastline, ki so naselile kopno', 'Prvi evkarionti, celice z jedrom'),
  qa('Kaj je naredil kisik?', 'Močno spremenil okolje: nekaterim škodil, drugim koristil', 'Povzročil je izumrtje vseh organizmov, ki so živeli v morju', 'Škodil je vsem organizmom, nobenemu ni koristil', 'Koristil je vsem organizmom in jim omogočil širjenje'),
  qa('Kako dolgo so živeli le enocelični organizmi?', 'Skoraj 3 milijarde let', 'Skoraj 4 milijarde let', 'Približno 1,2 milijarde let', 'Približno 600 milijonov let'),
  qa('Kdaj so se pojavili prvi večcelični organizmi?', 'Pred približno 1,2 milijarde let', 'Pred približno 2 milijardama let', 'Pred približno 3,5 milijarde let', 'Pred približno 500 milijoni let'),
  qa('Kje se je življenje dolgo razvijalo?', 'Predvsem v morju', 'Predvsem v sladkih vodah na kopnem', 'Predvsem na kopnem v vlažnih močvirjih', 'Predvsem ob vulkanih na kopnem'),
  qa('Kaj pomeni beseda cianin?', 'Modrozeleno barvilo', 'Rdeče barvilo v rastlinah', 'Rumeno barvilo v bakterijah', 'Modrikast plin v ozračju'),
  qa('Kaj spreminja okolje in vpliva na preživetje organizmov?', 'Vulkanski izbruhi, trki asteroidov, poledenitve', 'Plimovanje morij, lunini mrki, menjava letnih časov', 'Menjava dneva in noči, dež, veter', 'Rast rastlin, razmnoževanje bakterij, nastanek fosilov'),
  qa('Pred približno 600 milijoni let se je zgodil …', 'Velik porast števila živalskih vrst', 'Izumrtje večine živalskih vrst v morju', 'Nastanek prvih evkariontov, celic z jedrom', 'Prve kopenske rastline so naselile kopno'),
];

const fosili: QA[] = [
  qa('Fosili so …', 'Sledi življenja iz preteklih obdobij', 'Ostanki izumrlih živali, ne pa rastlin', 'Najstarejše kamnine na Zemlji', 'Kamnine, nastale iz ohlajene lave'),
  qa('Znanost, ki preučuje fosile, je …', 'Paleontologija', 'Arheologija', 'Geologija', 'Evolucijska biologija'),
  qa('V kakšnih kamninah so fosili ohranjeni predvsem?', 'V sedimentnih kamninah', 'V magmatskih kamninah', 'V metamorfnih kamninah', 'V granitnih kamninah'),
  qa('Kje se lahko organizem ohrani (konzervacija)?', 'V jantarju, ledu ali suhem okolju', 'V vlažnem listju in humusni prsti', 'V vročem pesku ob vulkanih', 'V sladki vodi in blatu jezer'),
  qa('Kaj so živi fosili?', 'Organizmi, podobni svojim davnim sorodnikom', 'Izumrli organizmi, ki so se ponovno pojavili', 'Organizmi, ohranjeni v jantarju ali ledu', 'Najmlajši fosili, ki so nastali v zadnjih letih'),
  qa('Kateri organizem je živi fosil?', 'Ginko', 'Hrast', 'Bukev', 'Lipa'),
  qa('Kateri živi morski organizem je podoben izumrlemu amonitu?', 'Brodnik', 'Hobotnica', 'Školjka', 'Morski ježek'),
  qa('Iz fosilov sklepamo …', 'Kako so organizmi živeli in kako se je življenje spreminjalo', 'Kako bodo organizmi živeli in kako se bo življenje spreminjalo', 'Kako so nastale kamnine in kako so se spreminjale celine', 'Kako so organizmi umirali in zakaj so izumrli'),
  qa('Fosil je lahko …', 'Ostanek telesa, izloček ali odtis', 'Samo okamnela kost ali zob živali', 'Samo celoten organizem, ohranjen v kamnu', 'Samo okostje, ki je ostalo v kamnini'),
  qa('Fosili ali …', 'Okamnine', 'Kristali', 'Minerali', 'Sedimenti'),
];

// Boss-only pool: dates from the timeline table and the ways fossils form.
const trak: QA[] = [
  qa('Katera od teh skupin je najstarejša?', 'Ribe, prvi vretenčarji v vodi', 'Dvoživke, prve tudi na kopnem', 'Plazilci, manj vezani na vodo', 'Dinozavri, dolgo na vrhu kopna'),
  qa('Kdaj so se pojavile prve kopenske rastline?', 'Pred približno 470 milijoni let', 'Pred približno 370 milijoni let', 'Pred približno 140 milijoni let', 'Pred približno 1,2 milijarde let'),
  qa('Iz česa so se razvile ptice?', 'Iz ene skupine pernatih dinozavrov', 'Iz dvoživk, ki so se naselile na kopno', 'Iz majhnih zgodnjih sesalcev ob dinozavrih', 'Iz primatov, ki so se vzpeli na drevesa'),
  qa('Kaj se je razširilo pred približno 140 milijoni let?', 'Cvetnice, rastline s cvetovi, v kredi', 'Prve kopenske rastline, ki so naselile kopno', 'Prvi mnogocelični organizmi v morju', 'Primati, skupina sesalcev s človekom'),
  qa('Kdaj so živeli prvi sesalci?', 'Že v času dinozavrov, pred več kot 200 mio. let', 'Šele po izumrtju dinozavrov, pred približno 60 mio. let', 'Skupaj s prvimi ribami, pred približno 500 mio. let', 'Skupaj s Homo sapiens, pred približno 300.000 leti'),
  qa('Kdaj se je pojavil Homo sapiens?', 'Pred približno 300.000 leti', 'Pred približno 2,8 milijona let', 'Pred približno 7 milijoni let', 'Pred približno 60 milijoni let'),
  qa('Kateri primer je konzervacija?', 'Žuželka, ohranjena v jantarju ali ledu', 'List, ki se je v zemlji spremenil v oglje', 'Stopinje dinozavra, ohranjene v strjenem blatu', 'Odtis školjke v mehkem sedimentu'),
];

// Boss: mostly the fresh timeline/fossil-formation questions, plus a few from the Catch pools.
const bossPool: QA[] = [
  ...trak,
  celicni[3], celicni[4], // kisik, trajanje enoceličarjev
  fosili[4], fosili[7], // živi fosili, sklepanje iz fosilov
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
      data: { title: 'Končni boj: življenje', boss: { emoji: '🦖', name: 'Mogočni T-Rex' }, questions: bossPool, count: 10 },
      recap: [
        'Spremembe okolja vplivajo na preživetje: vulkanski izbruhi, trki asteroidov, poledenitve, podnebne spremembe.',
        'Če katero vprašanje še dela težave, ponovi nivoje na zemljevidu.',
      ],
    },
  ],
};
