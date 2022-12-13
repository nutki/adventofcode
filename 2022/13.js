#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('13.input.txt','utf8');

const cmp = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  if (typeof a === 'number') return cmp([a], b);
  if (typeof b === 'number') return cmp(a, [b]);
  for (let i = 0; i < a.length && i < b.length; i++) {
    const r = cmp(a[i], b[i]);
    if (r) return r;
  }
  return a.length - b.length;
}
const input = A.parse(content, /(.+)\n(.+)/g).map(x => x.map(eval));
function solve() {
  return [
    input.map((p, i) => cmp(...p) < 0 ? i+1 : 0).sum(),
    [2,6,...input.flatten()].sort(cmp).map((v, i) => v == 2 || v == 6 ? i+1 : 1).prod()
  ];
}
l(solve());
