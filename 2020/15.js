#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('15.input.txt','utf8');

const input = A.parse(content, /(\d+)/g);
function solve(part2) {
  let cnt = part2 ? 30000000 : 2020;
  let p = new Map();
  let j = input.length - 1;
  let c, n = input[j];
  for (const [x, i] of input.entries()) p.set(i,x);
  while(j < cnt) {
    c = n;
    n = p.has(c) ? j - p.get(c) : 0;
    p.set(c,j++);
  }
  return c;
}
l(solve());
l(solve(true));
