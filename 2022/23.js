#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('23.input.txt', 'utf8');

const p = A.plane('.', content);
function solve() {
  let cnt1 = 0, cnt2 = 0;
  const sN = [[-1, -1], [0, -1], [1, -1]];
  const sS = [[-1, 1], [0, 1], [1, 1]];
  const sW = [[-1, -1], [-1, 0], [-1, 1]];
  const sE = [[1, -1], [1, 0], [1, 1]];
  const s = [sN, sS, sW, sE];
  for (let ii = 1; !cnt1 || !cnt2; ii++) {
    const w = new A.Map();
    for (const [x, y] of p) {
      if (A.neighbor8(x, y).every(([x, y]) => p.get(x, y) === '.')) continue;
      const cs = s.find(v => v.every(([x1, y1]) => p.get(x + x1, y + y1) === '.'));
      if (cs) {
        const x1 = x + cs[1][0], y1 = y + cs[1][1], dcs = x1 + ' ' + y1;
        if (w.has(dcs)) w.delete(dcs); else w.set(dcs, [x, y, x1, y1]);
      }
    }
    for (const [x1, y1, x2, y2] of w.values()) {
      p.set(x1, y1, '.');
      p.set(x2, y2, '#');
    }
    if (!w.size && !cnt2) cnt2 = ii;
    if (ii == 965) cnt1 = A.seq(2).prod(i => [...p].map(x => x[i]).max() - [...p].map(x => x[i]).min() + 1) - [...p].length;
    s.push(s.shift());
  }
  return [cnt1, cnt2];
}
l(solve());
