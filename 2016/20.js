#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('20.input.txt','utf8');

const input = A.parse(content, /(\d+)-(\d+)/g);
function solve(input) {
  let points = [];
  for (const [a,b] of input) {
    points.push([a,1],[b+1,-1])
  }
  points = A.sort(points, v => v[0]*2 + (v[1]<0?1:0))
  let level = 0, res = 0, lastX = 0, first;
  for (const [a, d] of points) {
    if (!level) res += a-lastX;
    level += d;
    if (!level && !first) first = a;
    lastX = a;
  }
  l(res, first)
}
solve(input)
