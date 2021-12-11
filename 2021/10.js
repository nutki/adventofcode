#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('10.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
}
const match = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
}
function solve() {
  let c2 = [], cnt = 0;
  outer: for (const line of input) {
    const s = [];
    for (const c of line) {
      if (!(c in match)) s.push(c);
      else if (s.pop() !== match[c]) {
        cnt += points[c];
        continue outer;
      }
    }
    c2.push(s.reduceRight((a, x) => a*5+points[x], 0));
  }
  return [cnt, A.sort(c2)[(c2.length - 1)/2]];
}
l(solve());
