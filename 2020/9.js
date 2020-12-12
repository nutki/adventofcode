#!/usr/bin/env node
const { sum } = require('../advent');
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('9.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(input) {
  const n = input.length;
  const target = input[A.seq(25, n).find(
    i => ![...A.choose(input.slice(i-25,i), 2)].some(p => A.sum(p) === input[i])
  )];
  for (let l = 2; l <= n; l++) {
    for (let i = l; i <= n; i++) {
      const v = input.slice(i-l, i);
      if (A.sum(v) === target) {
        return [target, A.min(...v) + A.max(...v)];
      }
    }
  }
  return target;
}
l(solve(input));
