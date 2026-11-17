import { qa, type Journey, type QA } from '../core/types';

// Source: zapiski/03-ekosistem-in-prilagoditve.md

const osnove: QA[] = [
  qa('Biocenoza + biotop = ?', 'Ekosistem', 'Biom', 'Prilagoditev'),
  qa('Biocenoza so …', 'Živi dejavniki (organizmi)', 'Neživi dejavniki', 'Samo rastline'),
  qa('Biotop je …', 'Življenjski prostor (neživi dejavniki)', 'Skupina živali', 'Vrsta rastline'),
  qa('Kateri dejavnik vpliva na rast rastlin?', 'Svetloba', 'Zračni tlak', 'Luna'),
  qa('Kateri dejavnik določa, kateri organizmi lahko živijo v okolju?', 'Voda', 'Barva neba', 'Hrup'),
  qa('Neživi dejavniki vplivajo na …', 'Rast, preživetje in razširjenost organizmov', 'Samo barvo listov', 'Nič'),
  qa('Organizmi s svojim delovanjem …', 'Spreminjajo razmere v okolju', 'Ne vplivajo na okolje', 'Ustavijo čas'),
  qa('V katerem biomu leži Slovenija?', 'V listopadnem gozdu', 'V savani', 'V puščavi'),
  qa('Kaj je biom?', 'Večja naravna enota ekosistemov s podobnimi dejavniki', 'Majhna luža', 'Vrsta živali'),
];

const jesen: QA[] = [
  qa('Zakaj listi jeseni odpadejo?', 'Zaradi pomanjkanja svetlobe in vode', 'Ker jih pojedo živali', 'Ker se pogreje'),
  qa('Kaj se jeseni zgodi s klorofilom?', 'Propade, zato ni fotosinteze', 'Se podvoji', 'Spremeni se v led'),
  qa('Kaj je adaptacija (prilagoditev)?', 'Lastnost, ki organizmu pomaga živeti v določenem okolju', 'Vrsta kamnine', 'Del ozračja'),
  qa('Kaj imajo živali, ki pozimi ostanejo dejavne?', 'Gostejšo dlako ali perje in plast tolšče', 'Brlog', 'Perutnice'),
  qa('Zimsko spanje se imenuje …', 'Hibernacija', 'Fotosinteza', 'Kondenzacija'),
  qa('Kaj naredijo nekatere ptice pozimi?', 'Odselijo se v toplejše kraje', 'Zakopljejo se v tla', 'Postanejo kamen'),
  qa('Kaj naredijo listavci pozimi?', 'Odvržejo listje', 'Zrastejo višje', 'Ostanejo zeleni brez sprememb'),
  qa('Zakaj so iglice odporne?', 'So odpornejše proti zmrzovanju', 'So mehke', 'So polne vode'),
  qa('Kaj se zgodi s travniškimi rastlinami pozimi?', 'Nadzemni deli odmrejo, spomladi poženejo novi', 'Odletijo', 'Se stopijo'),
  qa('Zakaj je zima za rastline težka?', 'Primanjkuje svetlobe, voda je težje dostopna, temperature so nižje', 'Ker je preveč sonca', 'Ker je preveč vode'),
];

const dejavniki = [
  { text: 'Rastline', emoji: '🌿', bin: 0 },
  { text: 'Živali', emoji: '🐿️', bin: 0 },
  { text: 'Glive', emoji: '🍄', bin: 0 },
  { text: 'Protisti', emoji: '🔬', bin: 0 },
  { text: 'Bakterije', emoji: '🦠', bin: 0 },
  { text: 'Človek', emoji: '🧑', bin: 0 },
  { text: 'Svetloba', emoji: '☀️', bin: 1 },
  { text: 'Temperatura', emoji: '🌡️', bin: 1 },
  { text: 'Zrak', emoji: '💨', bin: 1 },
  { text: 'Voda', emoji: '💧', bin: 1 },
  { text: 'Tla', emoji: '🟫', bin: 1 },
  { text: 'Zračni tlak', emoji: '🎈', bin: 1 },
  { text: 'Zemljina privlačnost', emoji: '🍎', bin: 1 },
];

export const ekosistem: Journey = {
  id: 'ekosistem',
  title: 'Ekosistemi in prilagoditve',
  icon: '🌳',
  blurb: 'Dejavniki okolja, biomi, adaptacije in zima',
  theme: { bg: 0xcdeccb, ink: '#3b2a1a', dark: false, accent: 0x5dd39e },
  stages: [
    {
      scene: 'Sorter', icon: '🌱', label: 'Živo ali neživo?',
      data: {
        title: 'Živi in neživi dejavniki okolja',
        bins: [
          { label: 'Živi dejavniki', emoji: '🐿️', color: 0xb9f3d3 },
          { label: 'Neživi dejavniki', emoji: '☀️', color: 0xffe9b8 },
        ],
        items: dejavniki.map((d) => ({ ...d, why: d.bin === 0 ? `${d.text} je živi dejavnik (živo bitje).` : `${d.text} je neživi dejavnik okolja.` })),
      },
      recap: [
        'Živi dejavniki: vsa živa bitja – rastline, živali, glive, protisti, bakterije, človek.',
        'Neživi dejavniki: svetloba, temperatura, zrak, voda, tla, zračni tlak, Zemljina privlačnost.',
      ],
    },
    {
      scene: 'Match', icon: '🧩', label: 'Ekosistem – pojmi',
      data: {
        title: 'Ekosistem in njegovi deli',
        perRound: 5,
        pairs: [
          { a: 'Biocenoza', ea: '🦊', b: 'Živi dejavniki, organizmi' },
          { a: 'Biotop', ea: '🏞️', b: 'Neživi dejavniki, življenjski prostor' },
          { a: 'Ekosistem', ea: '🌲', b: 'Biocenoza + biotop (gozd, travnik, jezero, reka …)' },
          { a: 'Biom', ea: '🌍', b: 'Večja naravna enota ekosistemov s podobnimi dejavniki' },
          { a: 'Adaptacija', ea: '🦒', b: 'Lastnost, ki organizmu pomaga živeti v okolju' },
        ],
      },
      recap: [
        'Biocenoza (živi dejavniki) + biotop (neživi dejavniki, življenjski prostor) = ekosistem.',
        'Primeri ekosistemov: gozd, travnik, jezero, reka, jama, morje.',
        'Ekosisteme s podobnimi dejavniki združujemo v biome.',
      ],
    },
    {
      scene: 'Match', icon: '🪱', label: 'Okolje se spreminja',
      data: {
        title: 'Organizmi spreminjajo okolje',
        perRound: 3,
        pairs: [
          { a: 'Deževnik', ea: '🪱', b: 'Z rovi rahlja tla in omogoča prodiranje zraka in vode' },
          { a: 'Bober', ea: '🦫', b: 'Z jezom upočasni tok vode in ustvari ribnik' },
          { a: 'Drevo', ea: '🌳', b: 'Daje senco, odpadlo listje → humus' },
          { a: 'Svetloba', ea: '☀️', b: 'Vpliva na rast rastlin' },
          { a: 'Voda', ea: '💧', b: 'Določa, kateri organizmi lahko živijo v okolju' },
          { a: 'Rastline', ea: '🌿', b: 'Spreminjajo senco, tla in količino vode' },
        ],
      },
      recap: [
        'Dejavniki so med seboj povezani: okolje vpliva na organizme, organizmi pa spreminjajo okolje.',
        'Deževnik rahlja tla, bober z jezom naredi ribnik, drevo daje senco in humus.',
      ],
    },
    {
      scene: 'Sorter', icon: '🏜️', label: 'Biomi',
      data: {
        title: 'Biomi sveta',
        bins: [
          { label: 'Puščava', emoji: '🏜️', color: 0xffe0a8 },
          { label: 'Savana', emoji: '🦒', color: 0xf3f0a8 },
          { label: 'Tropski deževni gozd', emoji: '🦜', color: 0xb9f3d3 },
          { label: 'Listopadni gozd', emoji: '🍂', color: 0xffd0b0 },
        ],
        items: [
          { text: 'Zelo malo padavin', bin: 0, emoji: '🌵' },
          { text: 'Topla, suha in deževna doba', bin: 1 },
          { text: 'Toplo in zelo veliko padavin', bin: 2 },
          { text: 'Štirje letni časi, dovolj padavin', bin: 3 },
          { text: 'V tem biomu leži Slovenija', bin: 3, emoji: '🇸🇮' },
          { text: 'Kaktusi', bin: 0, emoji: '🌵', why: 'Kaktusi rastejo v puščavi – tam je malo padavin.' },
          { text: 'Žirafe in sloni v travi', bin: 1, emoji: '🐘' },
          { text: 'Papige in opice', bin: 2, emoji: '🐒' },
        ],
      },
      recap: [
        'Puščava: malo padavin. Savana: topla, suha in deževna doba.',
        'Tropski deževni gozd: toplo in veliko padavin. Listopadni gozd: štirje letni časi, dovolj padavin.',
        'Slovenija leži v biomu listopadnih gozdov.',
      ],
    },
    {
      scene: 'Match', icon: '🦒', label: 'Prilagoditve',
      data: {
        title: 'Prilagoditve organizmov',
        perRound: 5,
        pairs: [
          { a: 'Rosika (mesojedka)', ea: '🪴', b: 'Lepljivi listi lovijo žuželke' },
          { a: 'Čaplja', ea: '🪿', b: 'Dolge noge in kljun za lov v vodi' },
          { a: 'Gams', ea: '🐐', b: 'Kopita in močne noge za hojo po skalah' },
          { a: 'Listavci', ea: '🍂', b: 'Pozimi odvržejo listje' },
          { a: 'Iglavci', ea: '🌲', b: 'Iglice so odpornejše proti zmrzovanju' },
        ],
      },
      recap: [
        'Prilagoditev (adaptacija) je lastnost, ki organizmu pomaga živeti v določenem okolju.',
        'Rosika: lepljivi listi lovijo žuželke. Čaplja: dolge noge in kljun. Gams: kopita in močne noge.',
      ],
    },
    {
      scene: 'Sorter', icon: '🌲', label: 'Rastline pozimi',
      data: {
        title: 'Kako rastline preživijo zimo?',
        bins: [
          { label: 'Listavci', emoji: '🍂', color: 0xffd0b0 },
          { label: 'Iglavci', emoji: '🌲', color: 0xb9f3d3 },
          { label: 'Travniške rastline', emoji: '🌾', color: 0xf3f0a8 },
        ],
        items: [
          { text: 'Odvržejo listje', bin: 0 },
          { text: 'Bukev', bin: 0, emoji: '🌳' },
          { text: 'Hrast', bin: 0, emoji: '🌳' },
          { text: 'Iglice so odpornejše proti zmrzovanju', bin: 1 },
          { text: 'Smreka', bin: 1, emoji: '🌲' },
          { text: 'Jelka', bin: 1, emoji: '🎄' },
          { text: 'Nadzemni deli odmrejo', bin: 2 },
          { text: 'Spomladi poženejo nove', bin: 2, emoji: '🌱' },
        ],
      },
      recap: [
        'Pozimi primanjkuje svetlobe, voda je težje dostopna, temperature so nižje.',
        'Rastline mirujejo: upočasnijo življenjske procese in fotosintezo.',
        'Listavci odvržejo listje, iglavci imajo iglice odpornejše proti zmrzovanju, pri travniških rastlinah odmrejo nadzemni deli.',
      ],
    },
    {
      scene: 'Sorter', icon: '🐻', label: 'Živali pozimi',
      data: {
        title: 'Kako živali preživijo zimo?',
        bins: [
          { label: 'Ostanejo dejavne', emoji: '🦊', color: 0xffe9b8 },
          { label: 'Prespijo (hibernacija)', emoji: '😴', color: 0xd9d6ff },
          { label: 'Otrpnejo', emoji: '🥶', color: 0xcdeeff },
          { label: 'Se selijo', emoji: '✈️', color: 0xb9f3d3 },
        ],
        items: [
          { text: 'Zajec', bin: 0, emoji: '🐇' },
          { text: 'Srna', bin: 0, emoji: '🦌' },
          { text: 'Lisica', bin: 0, emoji: '🦊' },
          { text: 'Medved', bin: 1, emoji: '🐻' },
          { text: 'Jež', bin: 1, emoji: '🦔' },
          { text: 'Jazbec', bin: 1, emoji: '🦡' },
          { text: 'Netopir', bin: 1, emoji: '🦇' },
          { text: 'Veverica', bin: 1, emoji: '🐿️' },
          { text: 'Kača', bin: 2, emoji: '🐍' },
          { text: 'Žaba', bin: 2, emoji: '🐸' },
          { text: 'Lastovka', bin: 3, emoji: '🐦' },
        ],
      },
      recap: [
        'Ostanejo dejavne: gostejša dlaka ali perje, plast tolšče (zajec, srna, lisica).',
        'Umaknejo se v brlog ali rov in prespijo – zimsko spanje ali hibernacija (medved, jež, jazbec, netopir, veverica).',
        'Otrpnejo: kače, žabe, močeradi. Selijo se: lastovke in druge ptice selivke.',
      ],
    },
    {
      scene: 'Catch', icon: '🍂', label: 'Dejavniki in zima',
      data: { title: 'Dejavniki okolja in zima', questions: [...osnove, ...jesen], count: 10 },
      recap: [
        'Listi jeseni odpadejo zaradi pomanjkanja svetlobe in vode (klorofil propade, ni fotosinteze).',
        'Neživi dejavniki vplivajo na rast, preživetje in razširjenost organizmov; organizmi spreminjajo razmere v okolju.',
      ],
    },
    {
      scene: 'Boss', icon: '🐺', label: 'Boss: Zimski volk',
      data: { title: 'Končni boj: ekosistemi', boss: { emoji: '🐺', name: 'Zimski volk' }, questions: [...osnove, ...jesen], count: 10 },
      recap: [
        'Ekosistem = biocenoza + biotop. Dejavniki so med seboj povezani.',
        'Prilagoditve pomagajo organizmom preživeti, tudi pozimi: mirovanje, spanje, selitev.',
        'Če katero vprašanje še dela težave, ponovi nivoje na zemljevidu.',
      ],
    },
  ],
};
