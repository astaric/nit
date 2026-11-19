import { qa, type Journey, type QA } from '../core/types';

// Source: zapiski/04-zemlja-snov-in-energija.md

const osnove: QA[] = [
  qa('Snov je vse, kar ima …', 'Maso in zavzema določeno prostornino', 'Maso in zavzema določeno površino', 'Barvo in zavzema določeno prostornino', 'Težo in zavzema določeno obliko'),
  qa('Kdaj je v vesolju nastala snov?', 'Ob velikem poku', 'Ob nastanku Zemlje', 'Ob nastanku Sonca', 'Ob nastanku življenja'),
  qa('Iz česa je sestavljena snov?', 'Iz zelo majhnih delcev (atomov)', 'Iz neprekinjene mase brez delcev', 'Iz celic, kot pri živih bitjih', 'Iz drobnih kapljic tekočine'),
  qa('Zakaj delcev snovi ne vidimo s prostim očesom?', 'Ker so za prosto oko premajhni', 'Ker se prehitro premikajo za oko', 'Ker so predaleč od našega očesa', 'Ker jih zakriva zrak okoli nas'),
  qa('Koliko agregatnih stanj snovi poznamo?', 'Tri', 'Dve', 'Štiri', 'Pet'),
  qa('Voda je lahko …', 'V vseh treh agregatnih stanjih', 'Samo v tekočem in plinastem stanju', 'Samo v tekočem in trdnem stanju', 'Samo v tekočem stanju'),
  qa('Kaj pomeni oznaka (g) pri zapisu H₂O(g)?', 'Plinasto (gas)', 'Tekoče (liquid)', 'Trdno (solid)'),
  qa('Katera oznaka pomeni tekoče stanje?', '(l)', '(s)', '(g)', '(t)'),
  qa('Kako zapišemo vodno paro?', 'H₂O(g)', 'H₂O(s)', 'H₂O(l)', 'H₂O(p)'),
  qa('Kako zapišemo led?', 'H₂O(s)', 'H₂O(l)', 'H₂O(g)', 'H₂O(t)'),
  qa('Kako zapišemo tekočo vodo?', 'H₂O(l)', 'H₂O(s)', 'H₂O(g)', 'H₂O(t)'),
  qa('Kako se obnašajo delci v trdni snovi?', 'Primaknjeni so in le nihajo na mestu', 'Povsem mirujejo na svojem mestu', 'Odmaknejo se drug od drugega', 'Zelo so razmaknjeni po celem prostoru'),
  qa('Kako so razporejeni delci v plinu?', 'Zelo razmaknjeni po celem prostoru', 'Primaknjeni in le nihajo na mestu', 'Zbrani v spodnjem delu posode', 'Tesno skupaj, a se prosto premikajo'),
];

const voda: QA[] = [
  qa('Koliko Zemljine površine pokriva voda?', 'Približno 71 %', 'Približno 29 %', 'Približno 50 %', 'Približno 97,5 %'),
  qa('Koliko vse vode na Zemlji je slane?', 'Približno 97,5 %', 'Približno 92,5 %', 'Približno 71 %', 'Približno 2,5 %'),
  qa('Koliko vse vode na Zemlji je sladke?', 'Približno 2,5 %', 'Približno 97,5 %', 'Približno 25 %', 'Približno 71 %'),
  qa('Kaj pridobivamo iz morske vode?', 'Sol', 'Kovine', 'Posodo', 'Bombaž'),
  qa('Iz katere snovi pridobivamo kovine?', 'Iz rud', 'Iz gline', 'Iz morske vode', 'Iz bombaža'),
  qa('Iz gline izdelujemo …', 'Posodo', 'Kovine', 'Pohištvo', 'Oblačila'),
  qa('Kaj od naštetega je vir snovi za gradnjo?', 'Kamen', 'Bombaž', 'Lan', 'Morska voda'),
  qa('Kateri vir snovi pripada živi naravi?', 'Les iz dreves', 'Sol iz morske vode', 'Kovine iz rud', 'Posoda iz gline'),
  qa('Iz česa so bombažna in lanena vlakna?', 'Iz rastlin', 'Iz živalske dlake', 'Iz morske vode', 'Iz gline'),
  qa('Za kaj človek že od nekdaj izkorišča snovi iz narave?', 'Za prehrano, gradnjo, oblačila in orodje', 'Samo za prehrano in gradnjo, ne pa za orodje', 'Samo za izdelavo oblačil in posode', 'Samo za pridobivanje soli in kovin'),
];

const prehodi: QA[] = [
  qa('Taljenje je prehod iz …', 'Trdnega v tekoče', 'Tekočega v trdno', 'Plinastega v tekoče', 'Trdnega v plinasto'),
  qa('Zamrzovanje je prehod iz …', 'Tekočega v trdno', 'Trdnega v tekoče', 'Tekočega v plinasto', 'Plinastega v trdno'),
  qa('Izparevanje (vrenje) je prehod iz …', 'Tekočega v plinasto', 'Plinastega v tekoče', 'Trdnega v plinasto', 'Tekočega v trdno'),
  qa('Kondenzacija je prehod iz …', 'Plinastega v tekoče', 'Tekočega v plinasto', 'Plinastega v trdno', 'Trdnega v plinasto'),
  qa('Sublimacija je prehod iz …', 'Trdnega v plinasto', 'Plinastega v trdno', 'Tekočega v plinasto', 'Trdnega v tekoče'),
  qa('Resublimacija je prehod iz …', 'Plinastega v trdno', 'Trdnega v plinasto', 'Plinastega v tekoče', 'Tekočega v trdno'),
  qa('Pri taljenju snov …', 'Segrevamo, da preide v tekoče stanje', 'Ohlajamo, da preide v tekoče stanje', 'Segrevamo, da preide v trdno stanje', 'Ohlajamo, da preide v plinasto stanje'),
  qa('Pri kondenzaciji snov …', 'Ohlajamo, da preide v tekoče stanje', 'Segrevamo, da preide v tekoče stanje', 'Ohlajamo, da preide v plinasto stanje', 'Segrevamo, da preide v plinasto stanje'),
];

// Lastnosti stanj: delci in obnašanje trdnih, tekočih in plinastih snovi, segrevanje/ohlajanje (Boss).
const lastnosti: QA[] = [
  qa('Kaj je značilno za trdno snov?', 'Ima določeno obliko telesa', 'Zavzame obliko posode', 'Delci so zelo razmaknjeni po celem prostoru', 'Delci se odmaknejo drug od drugega'),
  qa('Kaj velja za delce v tekočini?', 'Odmaknejo se drug od drugega', 'Primaknjeni so in le nihajo na mestu', 'Zelo so razmaknjeni po celem prostoru', 'Povsem mirujejo na svojem mestu'),
  qa('Kaj se zgodi s tekočino, ko jo prelijemo v steklenico?', 'Zavzame obliko steklenice', 'Ohrani obliko prejšnje posode', 'Ohrani svojo obliko, ne glede na steklenico', 'Strdi se in dobi obliko trdnega telesa'),
  qa('Kaj velja za plin v plinski jeklenki?', 'Nima določene oblike ne prostornine', 'Ima določeno obliko in prostornino', 'Ima določeno obliko, ne pa prostornine', 'Ima določeno prostornino, ne pa oblike'),
  qa('Kaj je skupno tekočini in plinu?', 'Zavzameta obliko posode', 'Delci le nihajo na mestu', 'Delci so tesno primaknjeni', 'Delci mirujejo drug ob drugem'),
  qa('Kako se delci v trdni snovi razlikujejo od delcev v tekočini?', 'V trdni so primaknjeni, v tekočini se odmaknejo', 'V trdni se odmaknejo, v tekočini so primaknjeni', 'V obeh so delci enako primaknjeni in le nihajo', 'V trdni so zelo razmaknjeni, v tekočini primaknjeni'),
  qa('Kateri od teh prehodov zahteva segrevanje?', 'Sublimacija', 'Resublimacija', 'Kondenzacija', 'Zamrzovanje'),
  qa('Kateri od teh prehodov zahteva ohlajanje?', 'Zamrzovanje', 'Taljenje', 'Izparevanje', 'Sublimacija'),
  qa('Kaj se zgodi z vodo H₂O(l), ko jo dovolj segrejemo?', 'Izpari v vodno paro, H₂O(g)', 'Kondenzira v vodno paro, H₂O(g)', 'Sublimira v vodno paro, H₂O(g)', 'Zamrzne v led, H₂O(s)'),
];

// Boss: lastnosti + prehodi + 4 vprašanja iz osnov in vode (snov, delci, slana voda, rude).
const bossMix: QA[] = [osnove[0], osnove[2], voda[1], voda[4]];

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
      data: { title: 'Končni boj: snovi', boss: { emoji: '⛄', name: 'Ledeni velikan' }, questions: [...lastnosti, ...prehodi, ...bossMix], count: 10 },
      recap: [
        'Snov ima maso in zavzema prostornino; sestavljena je iz delcev (atomov).',
        'Trdno, tekoče, plinasto – in šest prehodov med njimi.',
        'Če katero vprašanje še dela težave, ponovi nivoje na zemljevidu.',
      ],
    },
  ],
};
