import { qa, type Journey, type QA } from '../core/types';

// Source: zapiski/01-vesolje-in-osoncje.md

const PLANETS = [
  { text: 'Merkur', img: 'mercury', note: 'Soncu najbližji' },
  { text: 'Venera', img: 'venus', note: 'najbolj vroča' },
  { text: 'Zemlja', img: 'earth', note: 'življenje in voda' },
  { text: 'Mars', img: 'mars', note: 'rdeči planet' },
  { text: 'Jupiter', img: 'jupiter', note: 'največji' },
  { text: 'Saturn', img: 'saturn', note: 'obroči' },
  { text: 'Uran', img: 'uranus', note: 'nagnjen' },
  { text: 'Neptun', img: 'neptune', note: 'najbolj oddaljen' },
];

const conditions: QA[] = [
  qa('Kaj daje Sonce Zemlji?', 'Svetlobo in toploto', 'Tekočo vodo in kisik', 'Ozon in magnetno polje', 'Vodno paro in ozračje'),
  qa('Kaj je za življenje nujno potrebno?', 'Tekoča voda na površju', 'Površje, prekrito z lavo', 'Trden led na površju', 'Veliko lun okoli planeta'),
  qa('Kaj omogoča primerna temperatura?', 'Tekočo vodo in življenje', 'Nastanek magnetnega polja', 'Zaščito pred UV žarki', 'Svetlobo in energijo Sonca'),
  qa('Kaj uravnava temperaturo na Zemlji?', 'Ozračje Zemlje', 'Magnetno polje Zemlje', 'Gravitacija Lune', 'Vrtenje Zemlje'),
  qa('Kaj nas ščiti pred UV žarki?', 'Ozon (O₃)', 'Kisik (O₂)', 'Vodik (H₂)', 'Dušik (N₂)'),
  qa('Kaj je cona Zlatolaske?', 'Območje, ravno prav oddaljeno od Sonca', 'Območje, najbližje Soncu in zelo vroče', 'Območje, najbolj oddaljeno od Sonca', 'Območje, kjer je vedno premrzlo in temno'),
  qa('Kateri planet leži v coni Zlatolaske?', 'Zemlja', 'Venera', 'Mars', 'Neptun'),
  qa('Zakaj je na Merkurju in Veneri prevroče?', 'Sta preblizu Soncu', 'Sta predaleč od Sonca', 'Sta v coni Zlatolaske', 'Sta zunanja plinasta planeta'),
  qa('Kaj ščiti Zemljo pred škodljivimi vplivi iz vesolja?', 'Magnetno polje in ozračje', 'Luna in gravitacijska sila', 'Oceani in tekoča voda', 'Vrtenje in nagib Zemljine osi'),
  qa('Zakaj je na Marsu in zunanjih planetih premrzlo?', 'So predaleč od Sonca', 'So preblizu Soncu', 'Nimajo magnetnega polja', 'Imajo preveč tekoče vode'),
];

const general: QA[] = [
  qa('Kako se imenuje začetek vesolja?', 'Veliki pok', 'Veliki trk', 'Rojstvo Sonca', 'Velika sprememba'),
  qa('Pred koliko leti je nastalo vesolje?', 'Pred 13,8 mrd. let', 'Pred 4,5 mrd. let', 'Pred 160 mio. let', 'Pred 13,8 mio. let'),
  qa('Osončje je del galaksije …', 'Rimska cesta', 'Andromeda', 'Veliki voz', 'Orionova meglica'),
  qa('Kateri planet imenujemo rdeči planet?', 'Mars', 'Venera', 'Jupiter', 'Merkur'),
  qa('Največji planet Osončja je …', 'Jupiter', 'Saturn', 'Neptun', 'Zemlja'),
  qa('Kaj povzroča menjavanje dneva in noči?', 'Vrtenje Zemlje okoli osi', 'Nagib Zemljine osi', 'Kroženje Zemlje okoli Sonca', 'Kroženje Lune okoli Zemlje'),
  qa('Kaj povzroča letne čase?', 'Kroženje okoli Sonca in nagib osi', 'Spreminjanje oddaljenosti Zemlje od Sonca', 'Kroženje Lune okoli Zemlje in nagib osi', 'Sončni in lunini mrki med letom'),
  qa('Kaj povzroča Lunine mene?', 'Kroženje Lune okoli Zemlje', 'Zemljina senca, ki pada na Luno', 'Vrtenje Zemlje okoli svoje osi', 'Kroženje Zemlje okoli Sonca'),
  qa('Kakšen je vrstni red pri sončnem mrku?', 'Sonce – Luna – Zemlja', 'Sonce – Zemlja – Luna', 'Luna – Sonce – Zemlja', 'Zemlja – Sonce – Luna'),
  qa('Kaj se zgodi pri luninem mrku?', 'Zemlja zasenči Luno', 'Luna zasenči Zemljo', 'Luna zasenči Sonce', 'Zemlja zasenči Sonce'),
  qa('Najbolj vroč planet Osončja je …', 'Venera', 'Merkur', 'Zemlja', 'Mars'),
  qa('Soncu najbližji planet je …', 'Merkur', 'Venera', 'Zemlja', 'Mars'),
  qa('Kateri planet ima zelo izrazite obroče?', 'Saturn', 'Jupiter', 'Uran', 'Neptun'),
  qa('Kateri planet je plinast (zunanji)?', 'Saturn', 'Venera', 'Zemlja', 'Mars'),
  qa('Kateri planet je kamnit (notranji)?', 'Zemlja', 'Jupiter', 'Saturn', 'Uran'),
  qa('Kaj drži planete v krožnicah okoli Sonca?', 'Gravitacijska sila', 'Magnetna sila Sonca', 'Pritisk sončne svetlobe', 'Vrtenje Sonca okoli osi'),
  qa('Od Sonca najbolj oddaljen planet je …', 'Neptun', 'Uran', 'Saturn', 'Jupiter'),
  qa('Kateri planet je močno nagnjen glede na svojo tirnico?', 'Uran', 'Zemlja', 'Saturn', 'Neptun'),
];

// Zemljin naslov in zgradba Osončja (Boss only; Catch uses `conditions`).
const naslov: QA[] = [
  qa('Zemljin naslov v vesolju, od najmanjšega do največjega, je …', 'Zemlja, Osončje, Rimska cesta, vesolje', 'Zemlja, Rimska cesta, Osončje, vesolje', 'Osončje, Zemlja, Rimska cesta, vesolje', 'Zemlja, Osončje, vesolje, Rimska cesta'),
  qa('Koliko planetov ima Osončje?', '8 planetov', '9 planetov', '7 planetov', '10 planetov'),
  qa('Kam spadajo asteroidi, meteoroidi in kometi?', 'Med majhna telesa Osončja', 'Med pritlikave planete Osončja', 'Med lune zunanjih planetov', 'Med notranje kamnite planete'),
  qa('Iz česa je vesolje večinoma?', 'Iz praznega prostora', 'Iz zvezd in planetov', 'Iz plina in prahu', 'Iz galaksij in meglic'),
];

export const vesolje: Journey = {
  id: 'vesolje',
  title: 'Vesolje in Osončje',
  icon: '🚀',
  blurb: 'Veliki pok, planeti, mrki in pogoji za življenje',
  theme: { bg: 0x1b1f4b, ink: '#ffffff', dark: true, accent: 0xffd23f },
  stages: [
    {
      scene: 'Sequence', icon: '💥', label: 'Veliki pok',
      data: {
        title: 'Od velikega poka do danes',
        startLabel: 'Najprej', endLabel: 'Danes',
        items: [
          { text: 'Veliki pok', emoji: '💥', note: 'pred 13,8 mrd. let' },
          { text: 'Rojstvo Sonca', emoji: '☀️', note: 'plin in prah' },
          { text: 'Mlada Zemlja', emoji: '🌋', note: 'pred 4,5 mrd. let' },
          { text: 'Nastanek Lune', emoji: '🌙', note: 'po velikem trku' },
          { text: 'Oceani', emoji: '🌊', note: 'para → dež' },
          { text: 'Prvi organizmi', emoji: '🦠', note: 'bakterije' },
          { text: 'Kisik', emoji: '💨', note: 'spremeni ozračje' },
          { text: 'Prihod na kopno', emoji: '🌿', note: 'rastline, živali' },
          { text: 'Dinozavri', emoji: '🦖', note: '160+ mio. let' },
          { text: 'Človek', emoji: '🚶', note: 'po sesalcih' },
          { text: 'Danes', emoji: '🌍', note: 'edini planet z življenjem' },
        ],
      },
      recap: [
        'Vesolje je nastalo z velikim pokom pred 13,8 milijarde let.',
        'Zemlja je nastala pred približno 4,5 milijarde let. Bila je vroča in prekrita z lavo.',
        'Vodna para je postala dež → nastali so oceani, v njih prve bakterije.',
        'Kisik je spremenil ozračje, nato so rastline in živali prišle na kopno.',
        'Dinozavri so živeli več kot 160 milijonov let. Danes je Zemlja edini znani planet z življenjem.',
      ],
    },
    {
      scene: 'Sequence', icon: '🪐', label: 'Planeti po vrsti',
      data: { title: 'Planeti od Sonca navzven', startLabel: 'Najbližje Soncu', endLabel: 'Najdlje od Sonca', items: PLANETS },
      recap: [
        'Vrstni red od Sonca: Merkur, Venera, Zemlja, Mars, Jupiter, Saturn, Uran, Neptun.',
        'Merkur je Soncu najbližji, Neptun je od Sonca najbolj oddaljen.',
        'Venera je najbolj vroč planet. Mars je rdeči planet. Jupiter je največji.',
        'Saturn ima izrazite obroče. Uran se vrti močno nagnjen.',
      ],
    },
    {
      scene: 'Sorter', icon: '🔥', label: 'Cona Zlatolaske',
      data: {
        title: 'Cona Zlatolaske',
        bins: [
          { label: 'Prevroče', emoji: '🔥', color: 0xffb3a0 },
          { label: 'Cona Zlatolaske (tekoča voda)', emoji: '💧', color: 0xb9f3d3 },
          { label: 'Premrzlo', emoji: '❄️', color: 0xcdeeff },
        ],
        items: [
          { text: 'Merkur', img: 'mercury', bin: 0, why: 'Merkur je preblizu Soncu – prevroče.' },
          { text: 'Venera', img: 'venus', bin: 0, why: 'Venera je blizu Sonca in najbolj vroča.' },
          { text: 'Zemlja', img: 'earth', bin: 1, why: 'Zemlja je ravno prav oddaljena od Sonca – tekoča voda!' },
          { text: 'Mars', img: 'mars', bin: 2, why: 'Mars je predaleč od Sonca – premrzlo.' },
          { text: 'Jupiter', img: 'jupiter', bin: 2, why: 'Jupiter je predaleč od Sonca – premrzlo.' },
          { text: 'Saturn', img: 'saturn', bin: 2, why: 'Saturn je predaleč od Sonca – premrzlo.' },
          { text: 'Uran', img: 'uranus', bin: 2, why: 'Uran je predaleč od Sonca – premrzlo.' },
          { text: 'Neptun', img: 'neptune', bin: 2, why: 'Neptun je predaleč od Sonca – premrzlo.' },
        ],
      },
      recap: [
        'Blizu Sonca je prevroče (Merkur, Venera).',
        'Ravno prav oddaljena je Zemlja: tam je tekoča voda – to je cona Zlatolaske.',
        'Predaleč je premrzlo (Mars, Jupiter, Saturn, Uran, Neptun).',
        'Cona Zlatolaske = območje, ki je ravno prav oddaljeno od Sonca, da je možno bivanje.',
      ],
    },
    {
      scene: 'Sorter', icon: '🪨', label: 'Kamniti ali plinasti?',
      data: {
        title: 'Notranji ali zunanji planet?',
        bins: [
          { label: 'Notranji (kamniti)', emoji: '🪨', color: 0xffd9a8 },
          { label: 'Zunanji (plinasti)', emoji: '🎈', color: 0xd9d6ff },
        ],
        items: PLANETS.map((p, i) => ({ text: p.text, img: p.img, bin: i < 4 ? 0 : 1, why: i < 4 ? `${p.text} je notranji, kamnit planet.` : `${p.text} je zunanji, plinast planet.` })),
      },
      recap: [
        'Notranji (kamniti) planeti: Merkur, Venera, Zemlja, Mars.',
        'Zunanji (plinasti) planeti: Jupiter, Saturn, Uran, Neptun.',
        'Osončje sestavljajo Sonce, planeti z lunami, pritlikavi planet in majhna telesa (asteroidi, meteoroidi, kometi).',
      ],
    },
    {
      scene: 'Match', icon: '🔗', label: 'Značilnosti planetov',
      data: {
        title: 'Planeti in njihove značilnosti',
        perRound: 4,
        pairs: [
          { a: 'Merkur', ea: '⚫', b: 'Soncu najbližji planet' },
          { a: 'Venera', ea: '🟡', b: 'Najbolj vroč planet Osončja' },
          { a: 'Zemlja', ea: '🌍', b: 'Življenje in tekoča voda na površju' },
          { a: 'Mars', ea: '🔴', b: 'Imenujemo ga rdeči planet' },
          { a: 'Jupiter', ea: '🟠', b: 'Največji planet Osončja' },
          { a: 'Saturn', ea: '🪐', b: 'Zelo izrazit sistem obročev' },
          { a: 'Uran', ea: '🔵', b: 'Vrti se močno nagnjen glede na tirnico' },
          { a: 'Neptun', ea: '🌀', b: 'Od Sonca najbolj oddaljen planet' },
        ],
      },
      recap: [
        'Merkur – Soncu najbližji. Venera – najbolj vroča. Zemlja – življenje in tekoča voda.',
        'Mars – rdeči planet. Jupiter – največji. Saturn – obroči.',
        'Uran – vrti se močno nagnjen. Neptun – od Sonca najbolj oddaljen.',
      ],
    },
    {
      scene: 'Match', icon: '🌗', label: 'Gibanja in mrki',
      data: {
        title: 'Gibanja Zemlje in Lune',
        perRound: 3,
        pairs: [
          { a: 'Vrtenje Zemlje', ea: '🔄', b: 'Menjavanje dneva in noči' },
          { a: 'Kroženje Zemlje okoli Sonca + nagib osi', ea: '🌍', b: 'Letni časi' },
          { a: 'Kroženje Lune okoli Zemlje', ea: '🌙', b: 'Spreminjanje Luninih men' },
          { a: 'Sončni mrk', ea: '🌑', b: 'Luna je med Soncem in Zemljo' },
          { a: 'Lunin mrk', ea: '🌘', b: 'Zemlja je med Soncem in Luno' },
          { a: 'Gravitacijska sila', ea: '🧲', b: 'Telesa krožijo okoli Sonca' },
        ],
      },
      recap: [
        'Vrtenje Zemlje povzroča dan in noč.',
        'Kroženje Zemlje okoli Sonca skupaj z nagibom osi povzroča letne čase.',
        'Kroženje Lune okoli Zemlje povzroča Lunine mene.',
        'Sončni mrk: Sonce – Luna – Zemlja. Lunin mrk: Sonce – Zemlja – Luna.',
      ],
    },
    {
      scene: 'Eclipse', icon: '🌑', label: 'Mrki',
      recap: [
        'Sončni mrk: Luna je med Soncem in Zemljo, njena senca pade na Zemljo.',
        'Lunin mrk: Zemlja je med Soncem in Luno, Zemljina senca pade na Luno.',
      ],
    },
    {
      scene: 'Catch', icon: '🛰️', label: 'Pogoji za življenje',
      data: { title: 'Pogoji za življenje na Zemlji', questions: conditions, count: 8 },
      recap: [
        '1. Energija Sonca (svetloba in toplota). 2. Tekoča voda. 3. Primerna temperatura.',
        '4. Ozračje (plini, ki so pomembni za življenje, uravnava temperaturo).',
        '5. Zaščita: magnetno polje in ozračje. Ozon (O₃) nas ščiti pred UV žarki.',
      ],
    },
    {
      scene: 'Boss', icon: '👾', label: 'Boss: Vesoljski požiralec',
      data: { title: 'Končni boj: vesolje', boss: { emoji: '👾', name: 'Vesoljski požiralec' }, questions: [...general, ...naslov], count: 10 },
      recap: [
        'Zemljin naslov: Zemlja → Osončje → Rimska cesta → vesolje.',
        'Veliki pok 13,8 mrd. let; Osončje 4,6 mrd. let; vesolje je večinoma prazen prostor.',
        'Če katero vprašanje še dela težave, ponovi nivoje na zemljevidu.',
      ],
    },
  ],
};
