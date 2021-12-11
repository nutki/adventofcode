#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('11.input.txt','utf8');

function solve(part2) {
  const p = A.plane()
  p.load(content);
  let cnt = 0;
  for (let i = 0; i < 100 || part2; i++) {
    const q = [];
    let cnt2 = 0;
    function inc(x,y,f) {
      const c = p.get(x,y);
      if (c === '9') {
        cnt++; cnt2++;
        q.push(...A.neighbor8(x,y));
      }
      if (f || c > '0') p.set(x,y,"1234567890"[c])
    }
    for (const [x,y] of p) inc(x,y,1);
    while(q.length) inc(...q.pop());
    if (part2 && cnt2 === 100) return i+1;
  }
  return cnt;
}
l(solve());
l(solve(true));
