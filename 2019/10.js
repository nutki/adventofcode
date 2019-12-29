#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('10.input.txt','utf8');

const p = A.plane('.');
p.load(content);
let ast = Array.from(p).map(([x, y]) => ({x, y}));
function byAngle(a) {
  const v = new Map();
  for (const b of ast) {
    if (a === b) continue;
    const rx = b.x - a.x, ry = a.y - b.y;
    let rat = ry === 0 ? 1000 : A.abs(rx)/A.abs(ry);
    if (rx >= 0 && ry < 0) rat = 10000 - rat;
    else if (rx < 0 && ry < 0) rat = 10000 + rat;
    else if (rx < 0 && ry >= 0) rat = 20000 - rat;
    if(!v.has(rat)) v.set(rat, []);
    v.get(rat).push(b);
  }
  return v;
}
function nth(a, pos) {
  const v = byAngle(a);
  const m = (pos - 1) % v.size;
  const d = (pos - 1) / v.size | 0;
  const rad = A.sort(Array.from(v), v => v[0])[m];
  const rad2 = A.sort(rad[1], ({x,y}) => (a.x-x)*(a.x-x) + (a.y-y)*(a.y-y))[d];
  return rad2;
}
const best = A.best(v => v[1]);
for (const a of ast) best.add([a, byAngle(a).size]);
const [a, cnt] = best.get();
l(cnt);
const b = nth(a, 200)
l(b.x * 100 + b.y);
