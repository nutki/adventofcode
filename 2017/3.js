#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('3.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function res1(c, n) {
  for (let i = 2; i <= n; i++) {
    if(!c.getRight()) c.turnR(); c.fw(); c.set(i);
  }
  return A.sum(c.pos(), A.abs);
}
function res2(c, n) {
  for (let i = 2; ; i++) {
    if(!c.getRight()) c.turnR(); c.fw();
    let cnt = A.sum(A.range(8), () => (c.turnR(1), c.getFw()));
    c.set(cnt);
    if (cnt > n) return cnt;
  }
}
function solve(input, part2) {
  const [n] = input;
  const p = A.plane(0), c = p.cursor();
  c.set(1);
  return part2 ? res2(c, n) : res1(c, n);
}
l(solve(input))
l(solve(input, true))
