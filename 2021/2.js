#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('2.input.txt','utf8');

const input = A.parse(content, /(.+) (\d+)/g);
function solve(part2) {
  let x = 0, y = 0, z = 0;
  for (const [d, n] of input) {
    if (d === 'forward') {
      x += n;
      if (part2) z += n * y;
    }
    if (d === 'down') y += n;
    if (d === 'up') y -= n;
  }
  return x * (part2 ? z : y);
}
l(solve());
l(solve(true));
