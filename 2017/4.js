#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('4.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(input, part2) {
  let cnt = 0;
  for (const line of input) {
    let words = A.parse(line, /(\w+)/g);
    if (part2) words = words.map(w => A.sort(w.split('')));
    if(!Object.values(A.freq(words)).some(c => c>1)) cnt ++;
  }
  return cnt;
}
l(solve(input))
l(solve(input, true))
