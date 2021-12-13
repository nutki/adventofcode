#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('13.input.txt','utf8');

const [dots, folding] = content.split('\n\n');
const input = A.parse(dots, /(.+),(.+)/g);
const folds = A.parse(folding, /(.)=(.*)/g);
function solve(part2) {
  const p = A.plane(' ');
  for (let [x,y] of input) {
    for (const [dir, a] of (part2 ? folds : [folds[0]])) {
      if (dir === 'y') if (y >= a) y = 2*a - y;
      if (dir === 'x') if (x >= a) x = 2*a - x;
    }
    p.set(x,y,'█');
  }
  part2 && p.print();
  return Array.from(p).length;
}
l(solve());
solve(true);
