#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('10.input.txt','utf8');
const input = A.sort(A.parse(content, /(\d+)/g));
function solve(input) {
  let x = 0, y = 1;
  const t = [];
  for (const v of input) t[v-1]=1;
  let a = 0,b = 0,c = 1;
  for (const v of t) [a, b, c]=[b, c, v ? (c?x++:!b&&y++,a+b+c) : 0];
  return [x*y, c];
}
l(solve(input));
