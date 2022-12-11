#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('21.input.txt','utf8');

const input = A.parse(content, /(.+) => (.+)/g);
function solve(part2) {
  const M2 = new A.Map();
  const M3 = new A.Map();
  for (const [a,b] of input) {
    let ap = A.plane(' ', a.replaceAll('/','\n'));
    const bp = A.plane(' ', b.replaceAll('/','\n'));
    for (const j of A.seq(2)) {
      for (const i of A.seq(4)) {
        const code = [...ap].reduce((code, [x,y,v]) => v === '.' ? code : code + (1 << (x * (ap.maxX() + 1) + y)), 0);
        (ap.maxX() === 1 ? M2 : M3).set(code, bp);
        ap = ap.rotate()
      }
      ap = ap.flipX();
    }
  }
  let p = A.plane(' ', `.#.
..#
###`);
  for (const i of A.seq(part2 ? 18 : 5)) {
    const r = p.width % 2 ? M3 : M2;
    const s = p.width % 2 ? 3 : 2;
    const n = A.plane(' ');
    for (let i = 0; i < p.width / s; i++) {
      for (let j = 0; j < p.height / s; j++) {
        let code = 0;
        for (let ii = 0; ii < s; ii++) {
          for (let jj = 0; jj < s; jj++) {
            if (p.get(i * s + ii, j * s + jj) === '#') code += 1 << (ii * s + jj);
          }
        }
        for (const [x,y,v] of r.get(code)) {
          n.set(x + i * (s + 1), y + j * (s + 1), v);
        }
      }
    }
    p = n;
  }
  return [...p].sum(([x,y,v]) => v === '#');
}
l(solve());
l(solve(true));
