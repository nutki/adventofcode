#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('8.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(input) {
  const cnt = A.best(a => a), m = {};
  for (const line of input) {
    const [[x, inc, v, cx, cond]] = A.parse(line, /(\w+) (dec|inc) (-?\d+) if (\w+) (.*)/g);
    m[x] = m[x] || 0;
    m[cx] = m[cx] || 0;
    if (eval(`m.${cx} ${cond}`)) {
      cnt.add(m[x] += inc === 'dec' ? -v : v);
    }
  }
  return [A.max(...Object.values(m)), cnt.get()];
}
l(solve(input))
