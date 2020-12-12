#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('6.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(input, part2) {
  let cnt = 0;
  for (const line of input) {
    const v = A.parse(line, /(\d+)/g);
    const s = new Map();
    while(true) {
      const k = v.toString();
      if (s.has(k)) {
        return part2 ? cnt - s.get(k) : cnt;
      }
      s.set(k, cnt);
      const max = A.max(...v);
      const i = v.indexOf(max);
      v[i] = 0;
      for (let j = 0; j < max; j++) {
        v[(i+j+1)%v.length]++;
      }
      cnt++;
    }
  }
}
l(solve(input))
l(solve(input, true))
