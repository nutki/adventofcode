#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('9.input.txt','utf8');

const p = A.plane();
p.load(content);
function solve() {
  let cnt = 0;
  for (const [x,y,v] of p) {
    if(!A.neighbor4(x,y).some(c => p.get(...c) <= v)) cnt += parseInt(v) + 1;
  }
  const res = [];
  for (const [x,y,v] of p) {
  if (v < '9') res.push(A.bfs([x,y], ([x,y]) => {
    p.set(x,y,'A');
    return A.neighbor4(x,y).filter(d => p.get(...d) < '9');
  }).size)
  }
  return [cnt, A.sort(res, x => -x).slice(0,3).prod()];
}
l(solve());
