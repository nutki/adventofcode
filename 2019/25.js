#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('25.input.txt','utf8');

const intcode = require('./intcode');

const input = A.parse(content, /(-?\d+)/g);
function go (prog) {
  let out = [];
  intcode(input,prog.split('').map(e => e.charCodeAt(0)), v => {
    out.push(String.fromCharCode(v));
    if (out[out.length-1]==='=' && out[out.length-2]==='=' &&
        out[out.length-3]==='\n') out = ['=','='];
  })
  return out.join('');
}

const visited = {};
A.bfs("", (path, dist) => {
  let loc = go(path + "inv\n");
  let matchRoom = loc.match(/== (.*?) ==/);
  matchRoom = matchRoom && matchRoom[1];
  let matchDirs = loc.match(/lead:\n((- .*\n)+)/);
  matchDirs = matchDirs ? Array.from(matchDirs[1].matchAll(/[a-z]+/g)).map(m => m[0]) : [];
  let matchItems = loc.match(/Items here:\n((- .*\n)+)/);
  matchItems = matchItems ? Array.from(matchItems[1].matchAll(/- (.+)/g)).map(m => m[1]) : [];
  let matchInv = loc.match(/inventory:\n((- .*\n)+)/);
  matchInv = matchInv ? Array.from(matchInv[1].matchAll(/- (.+)/g)).map(m => m[1]) : [];
  matchInv.sort();
  let matchPass = loc.match(/\d{4,}/);
  if (matchPass) {
    l(matchPass[0]);
    l(path);
    return;
  }
  const key = [matchRoom, ...matchInv].join('|');
  if (visited[key]) return [];
  visited[key] = true;
  for(const i of matchItems) {
    if (i !== 'infinite loop') matchDirs.push("take " + i); 
  }
  return matchDirs.map(d => path + d + '\n');
})
