#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('12.input.txt','utf8');
const input = A.parse(content, /(.)(.+)/g);
function solve(input) {
  let c = A.plane().cursor(0,0,2);
  for (const [i,a] of input) {
    if (i === 'L') c.turnL(a/45);
    else if (i === 'R') c.turnR(a/45);
    else if (i === 'F') c.fw(a);
    else c.move(i, a);
  }
  return c.mDist();
}
function solve2(input) {
  let p = A.plane();
  let rx = 0, ry = 0;
  let w = p.cursor(10,-1);
  for (const [i,a] of input) {
    if (i === 'L' || i === 'R') {
      let [x,y] = w.pos();
      w = p.cursor();
      w.turnL(i === 'L' ? a/45 : -a/45);
      w.bw(y);
      w.turnL();
      w.bw(x);
    } else if (i === 'F') {
      let [x,y] = w.pos();
      rx += x*a;
      ry += y*a;
    } else w.move(i, a);
  }
  return A.abs(rx) + A.abs(ry);
}
l(solve(input));
l(solve2(input));
