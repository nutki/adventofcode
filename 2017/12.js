#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('12.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(input) {
  let cnt2 = 0, cnt1 = 0;
  let g = [], m = [];
  for (const line of input) {
    const [n, ...rest] = A.parse(line, /(\d+)/g);
    g[n] = rest;
  }
  for(const [i] of g.entries()) {
    if (!m[i]) cnt2++, A.bfs(i, a => {
      m[a]=1;
      if (!i) cnt1++;
      return g[a];
    });
  }
  return [cnt1, cnt2];
}
l(solve(input))
