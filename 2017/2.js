#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('2.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(input, part2) {
  let cnt = 0;
  for (const line of input) {
    const values = A.parse(line, /(\d+)/g);
    cnt += part2 ?
      values.map(c => values.map(d => d/c).find(d => d>1 && d === Math.floor(d))).find(Boolean) :
      A.max(...values) - A.min(...values);
  }
  return cnt;
}
l(solve(input))
l(solve(input, true))
