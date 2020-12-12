#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('2.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(input, part2) {
  let cnt = 0;
  for (const line of input) {
    const [[min, max, c, [...r]]] = A.parse(line, /(\d+)-(\d+) ([a-z]): ([a-z]+)/);
    const n = r.filter(x => x === c).length;
    cnt += part2 ? r[min-1] === c ^ r[max-1] === c : n >= min & n <= max;
  }
  return cnt;
}
l(solve(input));
l(solve(input, true));
