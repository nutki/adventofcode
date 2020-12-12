#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('9.input.txt','utf8');

const input = A.parse(content, /(<(?:!.|.)*?>|.)/g);
function solve(input) {
  let cnt = 0, cnt2 = 0;;
  let d = 0;
  for (const c of input) {
    if (c === '{') d++;
    if (c === '}') cnt += d--;
    if (c.startsWith('<')) {
      const g = A.parse(c, /!.|(.)/g).filter(Boolean);
      cnt2 += g.length - 2;
    }
  }
  return [cnt, cnt2];
}
l(solve(input))
