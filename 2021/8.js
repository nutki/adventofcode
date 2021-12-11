#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('8.input.txt','utf8');

const input = A.parse(content, /(.+) \| (.+)/g);
const sort = x => Array.from(x).sort().join('');
const cross = (x, y) => Array.from(x).sum(l => y.includes(l) ? 1 : 0);
function solve() {
  let cnt = 0;
  let cnt2 = 0;
  for (const [a, b] of input) {
    const d = {};
    const ww = a.split(' ').map(sort);
    const dx = A.sort(ww, x => x.length);
    d[dx[0]] = 1;
    d[dx[1]] = 7;
    d[dx[2]] = 4;
    d[dx[9]] = 8;
    const w = b.split(' ').map(sort);
    for (const v of w) if (d[v]) cnt ++;
    for(const z of dx.slice(6, 9)) {
      if (cross(dx[0], z) === 1) d[z] = 6;
      else if (cross(dx[2], z) === 4) d[z] = 9;
      else d[z] = 0;
    }
    for(const z of dx.slice(3, 6)) {
      if (cross(dx[0], z) === 2) d[z] = 3;
      else if (cross(dx[2], z) === 2) d[z] = 2;
      else d[z] = 5;
    }
    cnt2 += parseInt(w.map(x => d[x]).join(''));
  }
  return [ cnt, cnt2 ];
}
l(solve());
