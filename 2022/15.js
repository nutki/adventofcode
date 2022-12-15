#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('15.input.txt','utf8');

const input = A.parse(content, /(\d+).*?(\d+).*?(-?\d+).*?(-?\d+)/g);
function solve() {
  const v = 2e6;
  const c = input.map(([x,y,bx,by]) => [x, A.abs(x-bx)+A.abs(y-by)-A.abs(y-v)]).filter(v => v[1]>0);
  const ex = new Set(input.filter(x => x[3] === v).map(x => x[2]));
  const a = input.map(([x,y,bx,by]) => [x+y,x-y,Math.abs(x-bx)+Math.abs(y-by)+1]);
  const xs = new Set(a.map(([x,,d]) => x+d)), ys = new Set(a.map(([,y,d]) => y+d));
  const xc = new Set(a.map(([x,,d]) => x-d).filter(x => xs.has(x)));
  const yc = new Set(a.map(([,y,d]) => y-d).filter(y => ys.has(y)));
  let rx, ry;
  for (const x of xc) for (const y of yc)
    if(!a.some(([x2,y2,d]) => x > x2-d && x < x2+d && y > y2-d && y < y2+d))
      rx = (x+y)/2, ry = (x-y)/2;
  if (ry === v) ex.add(rx);
  return [
    c.map(([x,r]) => x+r).max() - c.map(([x,r]) => x-r).min() + 1 - ex.size,
    rx * 4e6 + ry
  ];
}
l(solve());
