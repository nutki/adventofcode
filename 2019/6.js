#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('6.input.txt','utf8');

const input = A.parse(content, /(\w+)\)(\w+)/g);
function solve(input) {
  let c = 0;
  const g = A.graph([], false);
  for (const [x,y] of input) g.connect(x,y);
  g.bfs('COM', (e, d) => c += d);
  const r = g.bfs('YOU', (e, d) => e === 'SAN').distance - 2;
  return [c, r];
}
l(solve(input))
