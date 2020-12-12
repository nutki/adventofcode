#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('5.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(input, part2) {
  const aa = [];
  for (const line of input) {
    const a = A.parse(line, /(.)/g);
    aa.push(a.reduce((p, c) => 2*p+("RB".includes(c)&1), 0));
  }
  const max = A.max(...aa);
  return part2 ? A.seq(A.min(...aa), max).find(v => !aa.includes(v)) : max;
}
l(solve(input));
l(solve(input, true));
