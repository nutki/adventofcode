#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('24.input.txt','utf8');

const p = A.plane('.', content);
function solve(part2) {
  const x = p.width-2, y = p.height-2,t = x*y/A.gcd(x,y);
  const b = new Set();
  for (const [x1,y1,v] of p) {
    let o;
    if (v === 'v') o=[0,1];
    if (v === '^') o=[0,t-1];
    if (v === '>') o=[1,0];
    if (v === '<') o=[t-1,0];
    if (o) for (let i = 0; i < t; i++) {
      b.add([(x1-1+o[0]*i)%x,(y1-1+o[1]*i)%y,i].join());
    } else for (let i = 0; i < t; i++) {
      b.add([x1-1,y1-1,i].join(), '#');
    } 
  }
  const r = A.bfs([0,-1,0,part2 ? 0 : 2], ([x1,y1,t1,s]) => {
    if (y1 === y && s==0) s=1;
    if (y1 === -1 && s==1) s=2;
    if (y1 === y && s==2) return;
    return [...A.neighbor4(x1,y1),[x1,y1]].map(([x,y])=>[x,y,(t1+1)%t,s]).filter(([x1,y1,t1]) => y1 > -2 && y1 <=y && !b.has([x1,y1,t1].join()));
  });
  return r.distance;
}
l(solve());
l(solve(true));
