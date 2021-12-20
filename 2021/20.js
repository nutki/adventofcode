#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('20.input.txt','utf8');

const [input0, input1] = content.split('\n\n')
let p = A.plane('.', input1);
function solve() {
  let cnt = 0;
  for (let k = 0; k < 50; k++) {
    cnt = 0;
    const p2 = A.plane(input0[p.get(-1000,-1000) === '.' ? 0 : 511]);
    for (let i = p.minX()-1; i <= p.maxX()+1; i++) {
      for (let j = p.minY()-1; j <= p.maxY()+1; j++) {
        const idxn = [...p.getLineDef(i-1,j-1,1,0,3),...p.getLineDef(i-1,j,1,0,3),...p.getLineDef(i-1,j+1,1,0,3)].reduce((p, n) => p+p+(n==='#'), 0);
        p2.set(i,j,input0[idxn]);
        if (input0[idxn] === '#') cnt++;
      }
    }
    p = p2;
    if (k === 1) l(cnt);
  }
  return cnt;
}
l(solve());
