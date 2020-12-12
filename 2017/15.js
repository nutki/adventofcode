#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('15.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(input, part2) {
  let cnt = 0;
  let [a] = A.parse(input[0], /(\d+)/);
  let [b] = A.parse(input[1], /(\d+)/);
  const limit = part2 ? 5000000 : 40000000;
  for (let i = 0; i < limit; i++) {
    do { a = a * 16807 % 2147483647 } while (part2 && a&3);
    do { b = b * 48271 % 2147483647 } while (part2 && b&7);
    if (!((a ^ b) & 0xFFFF)) cnt++
  }
  return cnt;
}
l(solve(input))
l(solve(input, true))
