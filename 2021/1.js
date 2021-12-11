#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('1.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(part2) {
  let cnt = 0;
  let length = input.length;
  if (part2) {
    length -= 2;
    for (let i = 0; i < length; i++) {
      input[i] += input[i+1] + input[i+2];
    }
  }
  for (let i = 1; i < length; i++) {
    if (input[i] > input[i-1]) cnt++
  }
  return cnt;
}
l(solve());
l(solve(true));
