#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('25.input.txt','utf8');
const intcode = require('./intcode_em');

const input = A.parse(content, /(-?\d+)/g);
let initRoom = '';
const init = intcode(input, [], v => initRoom += String.fromCharCode(v));
function go(prev, cmd) {
  const cmdCodes = Array.from(cmd + '\n').map(c => c.charCodeAt(0));
  let currnetRoom = '';
  const current = prev.clone(cmdCodes, v => currnetRoom  += String.fromCharCode(v));
  return [current, currnetRoom];
}
function roomName(loc) {
  let matchRoom = loc.match(/== (.*?) ==/);
  return matchRoom && matchRoom[1];
}
function roomDirs(loc) {
  let matchDirs = loc.match(/lead:\n((- .*\n)+)/);
  return matchDirs ? Array.from(matchDirs[1].matchAll(/[a-z]+/g)).map(m => m[0]) : [];
}
function roomItems(loc) {
  let matchItems = loc.match(/Items here:\n((- .*\n)+)/);
  return matchItems ? Array.from(matchItems[1].matchAll(/- (.+)/g)).map(m => m[1]) : [];
}
A.bfs([init, initRoom], ([prev, room, ...inv], dist) => {
  const name = roomName(room);
  if (name === null) return [];
  const dirs = roomDirs(room);
  const items = roomItems(room).filter(i => i !== 'infinite loop' && !inv.includes(i));
  let matchPass = room.match(/\d{4,}/);
  if (matchPass) {
    l(matchPass[0], dist, ...inv);
    return;
  }
  return dirs.map(d => [...go(prev, d), ...inv]).concat(
    items.map(i => [go(prev, `take ${i}`)[0], room, ...[...inv, i].sort()]));
}, ([prev, room, ...inv]) => [roomName(room), ...inv].join(','));
