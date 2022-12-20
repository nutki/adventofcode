#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('20.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(part2) {
  const a = input.map((a,i) => [part2 ? a * 811589153 : a,i]), b = [...a];
  for(const x of A.seq(part2 ? 10 : 1)) {
    for (const [v,i] of a) {
      const j = b.findIndex(e => e[1] == i);
      const old = b.splice(j,1)[0];
      b.splice((j + v + b.length) % b.length, 0, old);
    }
  }
  const start = b.findIndex(e => !e[0]);
  return [1,2,3].sum(i => b[(start + i*1000)%b.length][0]);
}
l(solve());
l(solve(true));
