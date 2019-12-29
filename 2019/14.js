#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('14.input.txt','utf8');

const x = {};
const input = A.parse(content, /(.*?) => (\d+) (\S+)/g);
for (const [ing, amount, what] of input) {
  x[what] = [amount, A.parse(ing,/(\d+) ([A-Z]+)/g)];
}
function solve(FUEL) {
  const n = { FUEL };
  while(true) {
    const k = Object.keys(n).find(e => n[e] > 0 && e !== 'ORE');
    if (!k) break;
    const nr = Math.ceil(n[k]/x[k][0]);
    for (const [c, e] of x[k][1]) {
      n[e] = (n[e] || 0) + c * nr;
    }
    n[k] -= nr * x[k][0];
  }
  return n.ORE;    
}
l(solve(1));
l(A.binsearch(solve, 1000000000000, 0, 1000000000000)[0]);
