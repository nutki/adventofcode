#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('7.input.txt','utf8');
const intcode = require('./intcode')

const input = A.parse(content, /(-?\d+)/g);
function solve(init){
  const b = A.best(v => v);
  for (const p of A.perm(init)) {
    let last = undefined;
    const node = p.map((a, i) => intcode(input, [a], v => {
      node[(i + 1) % 5].add(v);
      if (i === 4) last = v;
    }));
    node[0].add(0);
    b.add(last);
  }
  return b.get();
}
l(solve([0, 1, 2, 3, 4]));
l(solve([5, 6, 7, 8, 9]));
