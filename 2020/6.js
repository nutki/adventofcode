#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('6.input.txt','utf8');
const letters = A.seq(97,97+26).map(c => String.fromCharCode(c));
const input = content.split("\n\n");
function solve(input, part2) {
  let cnt = 0;
  for (const line of input) {
    const lines = part2 ? A.parse(line, /(\w+)/g) : [line];
    const a = letters.filter(c => lines.every(l => l.includes(c)));
    cnt += a.length;
  }
  return cnt;
}
l(solve(input));
l(solve(input, true));
