#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('6.input.txt','utf8');

const input = A.parse(content, /(\d+)/g);
function solve(part2) {
  const a = new Array(9).fill(0);
  for (const [v,f] of A.freqa(input)) a[v] = f;
  for (let i = 0; i < (part2 ? 256 : 80); i++) {
    const n2 = a.shift();
    a[6] += n2;
    a[8] = n2;
  }
  return a.sum();
}
l(solve());
l(solve(true));
