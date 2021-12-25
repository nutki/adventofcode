#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('25.input.txt','utf8');

let p = A.plane('.', content);
function solve(part2) {
  let cnt = 0;
//  p.print();
  let maxX = p.maxX() + 1;
  let maxY = p.maxY() + 1;

  let moved = 0;
  do {
  moved = 0; cnt++;
  const p2 = A.plane('.'), p3 = A.plane('.');
  for (let [x,y,v] of p) {
    if (v === '>') {
      if (p.get((x+1)%maxX,y) === '.') x=(x+1)%maxX, moved++;
    }
    p2.set(x,y,v);
  }
  p2.print();
  for (let [x,y,v] of p2) {
    if (v === 'v') {
      if (p2.get(x,(y+1)%maxY) === '.') y=(y+1)%maxY, moved++;
    }
    p3.set(x,y,v);
  }
  p3.print();
  return;
  p = p3;
  l(moved);
  } while(moved);
  return cnt;
}
l(solve());
//l(solve(true));
