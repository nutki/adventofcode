#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('13.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(input) {
  let cnt = 0, cnt2;
  let fw = [];
  for (const line of input) {
    const [d, s] = A.parse(line, /(\d+)/g);
    fw[d] = s;
  }
  cnt = fw.reduce((p, e, i) => i % (e*2-2) === 0 ? p + i * e : p, 0);
  for (let s = 0; ; s++) {
    if (!fw.some((e, i) => (i + s) % (e*2-2) === 0)) {
      cnt2 = s; break;
    }
  }
  return [cnt, cnt2];
}
l(solve(input))
