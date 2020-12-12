#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('7.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(input, part2) {
  const g = A.graph();
  for (const line of input) {
    const [a] = A.parse(line, /(\w+ \w+)/);
    const b = A.parse(line, /(\d+) (\w+ \w+)/g);
    for (const v of b) g.connect(a, v[1], v[0]);
  }
  return (part2 ?
    g.dfsReduce('shiny gold', n => 1 + A.sum(n.map(([e, v]) => e * v))) :
    g.bfsRev('shiny gold').size) - 1;
}
l(solve(input));
l(solve(input, true));
