#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('4.input.txt','utf8');

const input = A.parse(content, /(.+)-(.+),(.+)-(.+)/g);
function solve() {
  return [
    input.sum(([a,b,c,d])=>a >= c && b <= d || a <= c && b >= d),
    input.sum(([a,b,c,d])=>a >= c && a <= d || c >= a && c <= b)
  ]
}
l(solve());
