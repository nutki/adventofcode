#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('19.input.txt','utf8');
const intcode = require('./intcode_em');

const input = A.parse(content, /(-?\d+)/g);
function go (x, y) {
  return intcode(input, [x, y]).get();
}
let cnt = 0;
for (const i of A.seq(50)) for (const j of A.seq(50)) cnt += go(i,j);
l(cnt)
const p = A.plane(0);
let sums = Array(1000).fill(0);
for (let j = 900;; j++) {
  let prev = 0;
  let ranges = [];
  for (let i of A.seq(1000)) {
    let v = go(i,j);
    if (v !== prev) {
      ranges.push(i);
    }
    sums[i] += v - p.get(i,j-100);
    p.set(i,j,v);
    prev = v;
  }
  let hund = sums.map(a => a>=100);
  let first = hund.indexOf(true);
  let last = hund.lastIndexOf(true);
  let len = first < 0 ? 0 : last - first + 1;
  if (len === 100) {
    l(j-99 + 10000 * ranges[0])
    break;
  }
}
