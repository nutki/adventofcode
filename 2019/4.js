#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('4.input.txt','utf8');

const input = A.parse(content, /(\d+)/g);
function solve(a,b) {
  let cnt = 0;
  for (let i = a; i <= b; i++) {
    const is = i.toString();
    const f = A.freqa(is).some(([d, c]) => c == 2);
    const m = Array.from(is.matchAll(/.(?=(.))/g)).every(([v1, v2]) => v1 <= v2);
    if (f && m) cnt++
  }
  return cnt;
}
l(solve(...input))
