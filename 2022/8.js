#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('8.input.txt','utf8');

let p = A.plane(' ', content);
let x = p.transform((x,y)=>[x,y,0])
function solve(part2) {
  for (let rep = 0; rep < 4; rep++) {
  p = p.rotate();
  x = x.rotate();
  for (let i = 0; i <= p.maxX(); i++) {
    let prev = ' ';
    for (let j = 0; j <= p.maxY(); j++) {
      let n = p.get(i,j);
      if (n > prev) x.set(i,j,1), prev = n;
    }
  }
  }
  const b = A.best();
  for (let i = 0; i <= p.maxX(); i++) {
    for (let j = 0; j <= p.maxY(); j++) {
      let n = [p.getLineStr(i, j+1, 0, 1),
      p.getLineStr(i, j-1, 0, -1),
      p.getLineStr(i+1, j, 1, 0),
      p.getLineStr(i-1, j, -1, 0)];
      let prev = p.get(i,j);
      let c = n.map(s => {
        const res = [...s].findIndex(s=>s>=prev);
        return res < 0 ? s.length : res + 1;
      })
      b.add(c.prod())
    }
  }
  return [[...x].sum(v=>v[2]), b.get()];
}
l(solve());
//l(solve(true));
