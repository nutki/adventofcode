#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('1.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(input, part2) {
  for (const a of A.choose(input, part2 ? 3:2)) {
    if (A.sum(a) === 2020) return A.prod(a);
  }
}
l(solve(input))
l(solve(input, true))
