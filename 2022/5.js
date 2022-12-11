#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('5.input.txt','utf8');
const [arr, moves] = content.split(/\n 1/g);
const towers = arr.split('\n').map(x => A.parse(x, /.(.)..?/g));

const input = A.parse(moves, /move (.+) from (.+) to (.+)/g);
function solve(part2) {
  const stacks = [];
  for (const l of towers) {
    for (let i = 0; i < l.length; i++) {
      if (l[i] !== ' ') {
        stacks[i] ||= [];
        stacks[i].push(l[i]);
      }
    }
  }
  for (const [t, from, to] of input) {
    const tmp = stacks[from-1].splice(0, t);
    if (!part2) tmp.reverse();
    stacks[to-1].splice(0, 0, ...tmp);
  }
  return stacks.map(c => c[0]).join('');
}
l(solve());
l(solve(true));
