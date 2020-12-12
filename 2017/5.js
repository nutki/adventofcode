#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('5.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(input, part2) {
  let cnt = 0, i = 0;
  input = [...input];
  while(i >=0 && i < input.length) {
    let offset = input[i];
    if(part2 && offset >= 3) input[i]--; else input[i]++;
    i += offset;
    cnt++;
  }
  return cnt;
}
l(solve(input))
l(solve(input, true))
