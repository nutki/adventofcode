#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('7.input.txt','utf8');

const input = A.parse(content, /(\d+)/g);
function solve(part2) {
  let x = input.min(), y = input.max();
  let b = A.best(x => -x);
  let f = part2 ? x => x * (x + 1) / 2 : x => x;
  for (let i = x; i <= y; i++) {
    b.add(input.map(v => f(A.abs(v - i))).sum())
  }
  return b.get();
}
l(solve());
l(solve(true));
