#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('5.input.txt','utf8');

const input = A.parse(content, /(\d+),(\d+) -> (\d+),(\d+)/g);
function solve(part2) {
  let cnt = 0;
  let p = A.plane(0);
  for (const [x1,y1,x2,y2] of input) {
    if (!part2 && x1 !== x2 && y1 !== y2) continue; 
    const ii = x1 === x2 ? 0 : x1 > x2 ? -1 : 1;
    const jj = y1 === y2 ? 0 : y1 > y2 ? -1 : 1;
    for (let i = x1, j = y1; ; i+=ii, j+=jj) {
        p.set(i,j,p.get(i,j)+1);
        if (i === x2 && j === y2) break;
    }
  }
  for (const [x,y,v] of p) {
    if(v > 1) cnt++; 
  }
  return cnt;
}
l(solve());
l(solve(true));
