#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('15.input.txt','utf8');

const p = A.plane(), p2 = A.plane();
p.load(content);
let N = p.maxX() + 1;
for (const [x,y,v] of p) for (const i of A.seq(5)) for(const j of A.seq(5))
  p2.set(x+i*N,y+j*N,"123456789"[(i+j+parseInt(v)-1)%9]);
function solve(p) {
  let cnt = 0;
  let N = p.maxX() + 1;
  A.bfsW([0,0], ([x, y], d) => {
    if (x === N-1 && y === N-1) { cnt = d; return; }
    return A.neighbor4(x,y).filter(c => p.get(...c) !== undefined).map(c => [c, parseInt(p.get(...c))]);
  }, ([x, y]) => x*N+y);
  return cnt;
}
l(solve(p));
l(solve(p2));
