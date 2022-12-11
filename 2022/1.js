#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('1.input.txt','utf8').split('\n\n');
const input = content.map(c => A.parse(c, /(.+)/g));

function solve(part2) {
  return A.sort(input.map(c => c.sum()), x => -x).slice(0,part2?3:1).sum();
}
l(solve());
l(solve(true));
