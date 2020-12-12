#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('1.input.txt','utf8');

const input = A.parse(content, /(\d)/g);
function solve(input, offset) {
  return A.sum(input, (v, i) => v === input[(i + offset) % input.length] ? v : 0);
}
l(solve(input, 1))
l(solve(input, input.length/2))
