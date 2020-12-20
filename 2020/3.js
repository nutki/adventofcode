#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('3.input.txt','utf8');

function solve(ax, ay) {
  let cnt = 0;
  const p = A.plane('', content);
  let x = ax, y = ay;
  while (y <= p.maxY()) {
      cnt += p.get(x,y) === '#';
      y += ay;
      x = (x + ax) % (p.maxX() + 1);
  }   
  return cnt;
}
l(solve(3,1));
l(solve(3,1)*solve(1,1)*solve(5,1)*solve(7,1)*solve(1,2));
