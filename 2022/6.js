#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('6.input.txt','utf8');

const input = A.parse(content, /(.)/g);
function solve(part2) {
  let cnt = 0, buf = '';
  for (const line of input) {
    buf = line + buf.substring(0,part2? 13: 3);
    cnt++;
    if ((new Set(buf)).size == (part2 ? 14 : 4)) return cnt;
  }
}
l(solve());
l(solve(true));
