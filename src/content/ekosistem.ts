import { qa, type Journey, type QA } from '../core/types';

// Source: zapiski/03-ekosistem-in-prilagoditve.md

const osnove: QA[] = [
  qa('Biocenoza + biotop = ?', 'Ekosistem', 'Biom', 'Prilagoditev', 'Dejavnik okolja'),
  qa('Biocenoza so …', 'Živi dejavniki (organizmi)', 'Neživi dejavniki okolja', 'Življenjski prostor organizmov', 'Skupina ekosistemov s podobnimi dejavniki'),
  qa('Biotop je …', 'Življenjski prostor (neživi dejavniki)', 'Vsi organizmi, ki živijo na območju', 'Večja enota ekosistemov s podobnimi dejavniki', 'Živi dejavniki (vsa živa bitja)'),
  qa('Kateri dejavnik po zapiskih vpliva na rast rastlin?', 'Svetloba', 'Zračni tlak', 'Zemljina privlačnost'),
  qa('Kateri dejavnik po zapiskih določa, kateri organizmi lahko živijo v okolju?', 'Voda', 'Zračni tlak', 'Zemljina privlačnost'),
  qa('Neživi dejavniki vplivajo na …', 'Rast, preživetje in razširjenost organizmov', 'Samo rast in razmnoževanje rastlin in živali', 'Samo število živali, ne pa tudi rastlin', 'Samo barvo, velikost in obliko organizmov'),
  qa('Organizmi s svojim delovanjem …', 'Spreminjajo razmere v okolju', 'Se prilagajajo, okolja pa ne spreminjajo', 'Vplivajo le na druge organizme, ne na okolje', 'Določajo, kateri neživi dejavniki obstajajo'),
  qa('V katerem biomu leži Slovenija?', 'V biomu listopadnih gozdov', 'V biomu savane', 'V biomu puščave', 'V biomu tropskega deževnega gozda'),
  qa('Kaj je biom?', 'Večja enota ekosistemov s podobnimi dejavniki', 'Skupek živih in neživih dejavnikov enega ekosistema', 'Življenjski prostor ene same vrste organizmov', 'Skupina organizmov, ki živijo na istem območju'),
];

const jesen: QA[] = [
  qa('Zakaj listi jeseni odpadejo?', 'Zaradi pomanjkanja svetlobe in vode', 'Zaradi pomanjkanja zraka in prostora', 'Zaradi preveč padavin in vetra', 'Zaradi žuželk in drugih škodljivcev'),
  qa('Kaj se jeseni zgodi s klorofilom?', 'Propade, zato ni fotosinteze', 'Ostane nespremenjen, fotosinteza teče naprej', 'Nabere se v listih, zato postanejo pretežki', 'Preseli se v korenine, kjer se shrani'),
  qa('Kaj je adaptacija (prilagoditev)?', 'Lastnost, ki organizmu pomaga živeti v določenem okolju', 'Sprememba okolja, ki jo povzročijo organizmi s svojim delovanjem', 'Življenjski prostor, v katerem organizem živi', 'Skupina organizmov, ki živijo v istem okolju'),
  qa('Kaj imajo živali, ki pozimi ostanejo dejavne?', 'Gostejšo dlako ali perje in plast tolšče', 'Toplo zavetje v brlogu ali rovu, kjer prespijo', 'Sposobnost, da otrpnejo in mirujejo', 'Krila za selitev v toplejše kraje'),
  qa('Kako se imenuje zimsko spanje živali?', 'Hibernacija', 'Mirovanje rastlin', 'Otrpnelost telesa', 'Selitev v toplejše kraje'),
  qa('Kaj naredijo nekatere ptice pozimi?', 'Odselijo se v toplejše kraje', 'Zakopljejo se in prespijo zimo', 'Otrpnejo, dokler se ne ogreje', 'Ostanejo dejavne brez prilagoditev'),
  qa('Kaj naredijo listavci pozimi?', 'Odvržejo listje', 'Nadzemni deli odmrejo, spomladi poženejo novi', 'Iglice jih obvarujejo pred zmrzovanjem', 'Ostanejo zeleni, brez kakršnih koli sprememb'),
  qa('Kaj imajo iglavci, da prestanejo zimo?', 'Iglice, odpornejše proti zmrzovanju', 'Plast tolšče pod debelim lubjem', 'Listje, ki ga odvržejo vsako jesen', 'Nadzemne dele, ki pozimi povsem odmrejo'),
  qa('Kaj se zgodi s travniškimi rastlinami pozimi?', 'Nadzemni deli odmrejo, spomladi poženejo novi', 'Odvržejo listje, spomladi pa ga razvijejo na novo', 'Imajo iglice, odpornejše proti zmrzovanju', 'Ostanejo zelene in rastejo kot poleti'),
  qa('Zakaj je zima za rastline težka?', 'Manj svetlobe, voda je težje dostopna, nižje temperature', 'Primanjkuje zraka, tla so pretrda in zračni tlak je nižji', 'Preveč je sonca, rastline se pregrejejo, vode je preveč', 'Primanjkuje mineralnih snovi, listi so pretežki'),
];

// Fresh questions for the Boss (Catch uses osnove + jesen).
const okolje: QA[] = [
  qa('Kaj se zgodi z vodo, ko bober zgradi jez?', 'Tok se upočasni in nastane ribnik', 'Tok se pospeši in nastane slap', 'Struga se izsuši in nastane suho kopno', 'Voda se ogreje in nastane močvirje'),
  qa('Kaj se zgodi s tlemi, ko jih deževnik prerije z rovi?', 'Tla se zrahljajo, zrak in voda prodirata globlje', 'Tla se zbijejo, zrak in voda ne prodirata globlje', 'Tla se zasenčijo, odpadlo listje pa postane humus', 'Tla postanejo suha in brez zraka'),
  qa('Kaj potrebuje deževnik?', 'Vlažna tla', 'Vodno okolje', 'Suha tla z veliko svetlobe', 'Mineralne snovi v zraku'),
  qa('Kaj drevo spremeni v svojem okolju?', 'Daje senco, odpadlo listje postane humus', 'Zgradi jez, ki upočasni tok vode in ustvari ribnik', 'Z rovi zrahlja tla in prezrači zemljo', 'Z lepljivimi listi lovi žuželke'),
  qa('Kateri dejavniki okolja vplivajo na drevo?', 'Svetloba, voda, temperatura, mineralne snovi v tleh', 'Senca, nižja temperatura, odpadlo listje in nastali humus', 'Rovi deževnikov, jezovi in ribniki', 'Zračni tlak in Zemljina privlačnost'),
  qa('Kakšna je prilagoditev rosike (mesojedke)?', 'Lepljivi listi, ki lovijo žuželke', 'Dolge noge in kljun za lov v vodi', 'Kopita in močne noge za hojo po skalah', 'Gostejša dlaka in plast tolšče'),
  qa('Katera žival ima dolge noge in kljun za lov v vodi?', 'Čaplja', 'Gams', 'Lastovka', 'Srna'),
  qa('Katere živali pozimi ostanejo dejavne?', 'Zajec, srna in lisica', 'Kača, žaba in močerad', 'Medved, jež in jazbec', 'Lastovke in druge ptice selivke'),
  qa('Kaj se pozimi zgodi s kačami, žabami in močeradi?', 'Zaradi mraza otrpnejo', 'Odselijo se v toplejše kraje', 'Prespijo zimo v toplem brlogu', 'Ostanejo dejavne in iščejo hrano'),
  qa('Katera žival pozimi prespi (hibernacija)?', 'Medved', 'Zajec', 'Kača', 'Lastovka'),
  qa('Kaj naredijo rastline z mirovanjem pozimi?', 'Upočasnijo življenjske procese in fotosintezo', 'Pospešijo fotosintezo, da nadomestijo mraz', 'Pospešijo rast, da izkoristijo vlago v tleh', 'Povsem prenehajo z vsemi življenjskimi procesi'),
  qa('Kaj sestavlja ekosistem jezera?', 'Živa bitja v jezeru in njihov življenjski prostor', 'Samo živa bitja, ki živijo v vodi', 'Samo neživi dejavniki jezera: voda, tla in svetloba', 'Vsa jezera sveta s podobnimi dejavniki'),
];

// Boss pool: all fresh questions plus a few classics (Slovenija, biom, listi, iglavci, travniške rastline).
const bossPool: QA[] = [...okolje, osnove[7], osnove[8], jesen[0], jesen[7], jesen[8]];

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
        title: 'Okolje in organizmi',
        perRound: 3,
        pairs: [
          { a: 'Drevo spreminja okolje', ea: '🌳', b: 'Daje senco, odpadlo listje → humus' },
          { a: 'Deževnik spreminja okolje', ea: '🪱', b: 'Z rovi rahlja tla in omogoča prodiranje zraka in vode' },
          { a: 'Bober spreminja okolje', ea: '🦫', b: 'Z jezom upočasni tok vode in ustvari ribnik' },
          { a: 'Drevo potrebuje', ea: '🌳', b: 'Svetlobo, vodo, primerno temperaturo, mineralne snovi v tleh' },
          { a: 'Deževnik potrebuje', ea: '🪱', b: 'Vlažna tla' },
          { a: 'Bober potrebuje', ea: '🦫', b: 'Vodno okolje' },
        ],
      },
      recap: [
        'Dejavniki so med seboj povezani: okolje vpliva na organizme, organizmi pa spreminjajo okolje.',
        'Deževnik rahlja tla, bober z jezom naredi ribnik, drevo daje senco in humus.',
        'Okolje vpliva nanje: drevo potrebuje svetlobo, vodo, temperaturo in mineralne snovi v tleh, deževnik vlažna tla, bober vodno okolje.',
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
      data: { title: 'Končni boj: ekosistemi', boss: { emoji: '🐺', name: 'Zimski volk' }, questions: bossPool, count: 10 },
      recap: [
        'Ekosistem = biocenoza + biotop. Dejavniki so med seboj povezani.',
        'Prilagoditve pomagajo organizmom preživeti, tudi pozimi: mirovanje, spanje, selitev.',
        'Če katero vprašanje še dela težave, ponovi nivoje na zemljevidu.',
      ],
    },
  ],
};
