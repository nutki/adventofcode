#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('6.input.txt','utf8');

const input = A.parse(content, /(\w+)\)(\w+)/g);
function solve(input) {
  let c = 0, n = {}
  for (const [x,y] of input) A.connect(x,y,n);
  A.bfs('COM', (e, d) => (c += d, n[e]));
  const r = A.bfs('YOU', (e, d) => e === 'SAN' ? undefined : n[e]).distance - 2;
  return [c, r];
}
l(solve(input))
