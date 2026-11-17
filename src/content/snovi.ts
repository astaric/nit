import { qa, type Journey, type QA } from '../core/types';

// Source: zapiski/04-zemlja-snov-in-energija.md

const osnove: QA[] = [
  qa('Snov je vse, kar ima …', 'Maso in zavzema prostornino', 'Samo barvo', 'Samo obliko'),
  qa('Kdaj je v vesolju nastala snov?', 'Ob velikem poku', 'Ob nastanku Lune', 'Ob nastanku ljudi'),
  qa('Iz česa je sestavljena snov?', 'Iz delcev (atomov)', 'Iz svetlobe', 'Samo iz zraka'),
  qa('Zakaj delcev snovi ne vidimo s prostim očesom?', 'Ker so zelo majhni', 'Ker so zelo veliki', 'Ker so prozorni'),
  qa('Koliko agregatnih stanj snovi poznamo?', 'Tri', 'Dve', 'Pet'),
  qa('Voda je lahko …', 'V vseh treh agregatnih stanjih', 'Samo tekoča', 'Samo trdna'),
  qa('Oznaka (s) pomeni …', 'Trdno', 'Plinasto', 'Tekoče'),
  qa('Oznaka (l) pomeni …', 'Tekoče', 'Trdno', 'Plinasto'),
  qa('Oznaka (g) pomeni …', 'Plinasto', 'Tekoče', 'Trdno'),
  qa('Kako zapišemo vodno paro?', 'H₂O(g)', 'H₂O(s)', 'H₂O(l)'),
  qa('Kako zapišemo led?', 'H₂O(s)', 'H₂O(g)', 'H₂O(l)'),
  qa('Kako se obnašajo delci v trdni snovi?', 'Le nihajo na svojem mestu', 'Zelo hitro letijo po prostoru', 'Izginejo'),
  qa('Kako so razporejeni delci v plinu?', 'Zelo razmaknjeni po celem prostoru', 'Tesno skupaj', 'V pravilni mreži'),
];

const voda: QA[] = [
  qa('Koliko Zemljine površine pokriva voda?', 'Približno 71 %', 'Približno 10 %', 'Približno 95 %'),
  qa('Koliko vse vode na Zemlji je slane?', 'Približno 97,5 %', 'Približno 50 %', 'Približno 2,5 %'),
  qa('Koliko vode na Zemlji je sladke?', 'Le približno 2,5 %', 'Približno 97,5 %', 'Približno 71 %'),
  qa('Kaj pridobivamo iz morske vode?', 'Sol', 'Kovine', 'Les'),
  qa('Iz rud pridobivamo …', 'Kovine', 'Sol', 'Bombaž'),
  qa('Iz gline izdelujemo …', 'Posodo', 'Kovine', 'Oblačila'),
  qa('Kamen uporabljamo za …', 'Gradnjo', 'Pridobivanje soli', 'Izdelavo oblačil'),
  qa('Les dobimo iz …', 'Dreves', 'Rud', 'Morja'),
  qa('Bombaž in lan sta vir snovi iz …', 'Rastlin', 'Kamnin', 'Vode'),
  qa('Iz lesa naredimo …', 'Pohištvo', 'Kovine', 'Sol'),
];

const prehodi: QA[] = [
  qa('Taljenje je prehod iz …', 'Trdnega v tekoče', 'Tekočega v trdno', 'Plinastega v tekoče'),
  qa('Zamrzovanje je prehod iz …', 'Tekočega v trdno', 'Trdnega v tekoče', 'Tekočega v plinasto'),
  qa('Izparevanje (vrenje) je prehod iz …', 'Tekočega v plinasto', 'Plinastega v tekoče', 'Trdnega v tekoče'),
  qa('Kondenzacija je prehod iz …', 'Plinastega v tekoče', 'Tekočega v plinasto', 'Trdnega v plinasto'),
  qa('Sublimacija je prehod iz …', 'Trdnega v plinasto', 'Plinastega v trdno', 'Tekočega v trdno'),
  qa('Resublimacija je prehod iz …', 'Plinastega v trdno', 'Trdnega v plinasto', 'Tekočega v plinasto'),
  qa('Pri taljenju snov …', 'Segrevamo', 'Ohlajamo', 'Stehtamo'),
  qa('Pri kondenzaciji snov …', 'Ohlajamo', 'Segrevamo', 'Zmešamo'),
];

export const snovi: Journey = {
  id: 'snovi',
  title: 'Snovi in agregatna stanja',
  icon: '🧊',
  blurb: 'Delci, trdno–tekoče–plinasto in viri snovi',
  theme: { bg: 0xcdeeff, ink: '#2a3550', dark: false, accent: 0x4aa3ff },
  stages: [
    {
      scene: 'Catch', icon: '⚛️', label: 'Kaj je snov?',
      data: { title: 'Snov, delci in oznake stanj', questions: osnove, count: 9 },
      recap: [
        'Snov je vse, kar ima maso in zavzema določeno prostornino. Nastala je ob velikem poku.',
        'Snov sestavljajo zelo majhni delci (atomi), ki jih ne vidimo s prostim očesom.',
        'Oznake: (s) trdno, (l) tekoče, (g) plinasto. Voda je lahko v vseh treh stanjih.',
      ],
    },
    {
      scene: 'Sorter', icon: '🧊', label: 'Trdno, tekoče, plinasto',
      data: {
        title: 'Agregatna stanja',
        bins: [
          { label: 'Trdno (s)', emoji: '🧊', color: 0xcdeeff },
          { label: 'Tekoče (l)', emoji: '💧', color: 0xb9d8ff },
          { label: 'Plinasto (g)', emoji: '💨', color: 0xe6e6ff },
        ],
        items: [
          { text: 'Led', emoji: '🧊', bin: 0 },
          { text: 'Kamen', emoji: '🪨', bin: 0 },
          { text: 'Delci le nihajo na mestu', bin: 0 },
          { text: 'Ima stalno obliko', bin: 0 },
          { text: 'Voda', emoji: '💧', bin: 1 },
          { text: 'Mleko', emoji: '🥛', bin: 1 },
          { text: 'Sok', emoji: '🧃', bin: 1 },
          { text: 'Teče in se prelije', bin: 1 },
          { text: 'Vodna para', emoji: '♨️', bin: 2 },
          { text: 'Zrak', emoji: '🌬️', bin: 2 },
          { text: 'Delci so zelo razmaknjeni po celem prostoru', bin: 2 },
          { text: 'Plin v plinski jeklenki', emoji: '🛢️', bin: 2 },
        ],
      },
      recap: [
        'Trdno: delci so blizu in le nihajo, ima določeno obliko.',
        'Tekoče: delci se odmaknejo drug od drugega, zavzame obliko posode (steklenica).',
        'Plinasto: delci so zelo razmaknjeni po celem prostoru (plinska jeklenka).',
      ],
    },
    {
      scene: 'StateLab', icon: '🔬', label: 'Laboratorij',
      recap: [
        'Taljenje: trdno → tekoče (segrevanje). Zamrzovanje/strjevanje: tekoče → trdno (ohlajanje).',
        'Izparevanje/vrenje: tekoče → plinasto (segrevanje). Kondenzacija: plinasto → tekoče (ohlajanje).',
      ],
    },
    {
      scene: 'Match', icon: '🔄', label: 'Prehodi',
      data: {
        title: 'Prehodi med agregatnimi stanji',
        perRound: 3,
        pairs: [
          { a: 'Taljenje', ea: '🧊', b: 'trdno → tekoče' },
          { a: 'Zamrzovanje (strjevanje)', ea: '❄️', b: 'tekoče → trdno' },
          { a: 'Izparevanje (vrenje)', ea: '♨️', b: 'tekoče → plinasto' },
          { a: 'Kondenzacija', ea: '💧', b: 'plinasto → tekoče' },
          { a: 'Sublimacija', ea: '🌫️', b: 'trdno → plinasto' },
          { a: 'Resublimacija', ea: '🥶', b: 'plinasto → trdno' },
        ],
      },
      recap: [
        'trdno → tekoče: taljenje. tekoče → trdno: zamrzovanje/strjevanje.',
        'tekoče → plinasto: izparevanje/vrenje. plinasto → tekoče: kondenzacija.',
        'trdno → plinasto: sublimacija. plinasto → trdno: resublimacija.',
      ],
    },
    {
      scene: 'Sorter', icon: '🔥', label: 'Segrevanje ali ohlajanje?',
      data: {
        title: 'Segrevanje ali ohlajanje?',
        bins: [
          { label: 'Segrevanje', emoji: '🔥', color: 0xffc9a8 },
          { label: 'Ohlajanje', emoji: '❄️', color: 0xcdeeff },
        ],
        items: [
          { text: 'Taljenje', emoji: '🧊', bin: 0 },
          { text: 'Izparevanje', emoji: '♨️', bin: 0 },
          { text: 'Vrenje', emoji: '🫖', bin: 0 },
          { text: 'Sublimacija', emoji: '🌫️', bin: 0 },
          { text: 'Zamrzovanje', emoji: '❄️', bin: 1 },
          { text: 'Strjevanje', emoji: '🧊', bin: 1 },
          { text: 'Kondenzacija', emoji: '💧', bin: 1 },
          { text: 'Resublimacija', emoji: '🥶', bin: 1 },
        ],
      },
      recap: [
        'Segrevanje: taljenje, izparevanje (vrenje), sublimacija.',
        'Ohlajanje: zamrzovanje (strjevanje), kondenzacija, resublimacija.',
      ],
    },
    {
      scene: 'Sorter', icon: '⛏️', label: 'Viri snovi',
      data: {
        title: 'Viri snovi v naravi',
        bins: [
          { label: 'Neživa narava', emoji: '⛰️', color: 0xffd9a8 },
          { label: 'Živa narava', emoji: '🌳', color: 0xb9f3d3 },
        ],
        items: [
          { text: 'Kamen za gradnjo', emoji: '🧱', bin: 0 },
          { text: 'Glina za posodo', emoji: '🏺', bin: 0 },
          { text: 'Rude za kovine', emoji: '⛏️', bin: 0 },
          { text: 'Morska voda za sol', emoji: '🧂', bin: 0 },
          { text: 'Les za pohištvo', emoji: '🪑', bin: 1 },
          { text: 'Bombaž za oblačila', emoji: '👕', bin: 1 },
          { text: 'Lanena vlakna', emoji: '🧵', bin: 1 },
        ],
      },
      recap: [
        'Človek že od nekdaj izkorišča snovi iz narave: les za pohištvo, kamen za gradnjo, glina za posodo, rude za kovine, morska voda za sol.',
        'Živa narava je tudi vir snovi: les iz dreves, bombaž in lan iz rastlin.',
      ],
    },
    {
      scene: 'Catch', icon: '🌊', label: 'Voda in viri',
      data: { title: 'Voda in viri snovi', questions: voda, count: 8 },
      recap: [
        'Voda pokriva približno 71 % Zemljinega površja.',
        'Od vse vode na Zemlji je približno 97,5 % slane in le 2,5 % sladke.',
      ],
    },
    {
      scene: 'Boss', icon: '⛄', label: 'Boss: Ledeni velikan',
      data: { title: 'Končni boj: snovi', boss: { emoji: '⛄', name: 'Ledeni velikan' }, questions: [...osnove, ...prehodi, ...voda], count: 10 },
      recap: [
        'Snov ima maso in zavzema prostornino; sestavljena je iz delcev (atomov).',
        'Trdno, tekoče, plinasto – in šest prehodov med njimi.',
        'Če katero vprašanje še dela težave, ponovi nivoje na zemljevidu.',
      ],
    },
  ],
};
