#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('24.input.txt','utf8');

const p = A.plane();
const o = p.load(content);
for (const a of "0123456789") {
  for (const b of "0123456789") {
    if (a !== b && o[a] && o[b]) {
      o[a+b] = A.bfs(o[a], ([x,y], d) => {
        if (p.get(x,y) === '#') return [];
        if (p.get(x,y) === b) return;
        return [[x,y+1],[x,y-1],[x+1,y],[x-1,y]]
      }).distance;
    }
  }
}
const b = A.best(v => -v)
for (const a of A.perm("1234567")) {
  let e = '0'
  let cnt = 0;
  for (let x of a) {
    cnt += o[e+x];
    e = x;
  }
  b.add(cnt+o[e+'0'])
}
l(b.get())
