#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('17.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve1(n) {
  let a = [0];
  let idx = 0;
  for (let i = 1; i < 2018; i++) {
    idx += n;
    idx %= i;
    idx ++;
    a.splice(idx, 0, i);
  }
  return a[(idx+1)%a.length];
}
function solve2(n) {
  let cnt = 0;
  let idx = 0;
  for (let i = 1; i < 50000000; i++) {
    idx += n;
    idx %= i;
    idx ++;
    if (idx == 1) cnt = i;
  }
  return cnt;
}
l(solve1(input[0]))
l(solve2(input[0]))
