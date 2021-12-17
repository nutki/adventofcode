#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('17.input.txt','utf8');

const [x1,x2,y1,y2] = A.parse(content, /(-?\d+)/g);
function solve() {
  let cnt = A.best(), cnt2 = 0;
  for (let i = y1; i <= -y1; i++) for (let j = 0; j <= x2; j++) {
    let vx = j, vy = i, x = 0, y = 0;
    for(let s=1;x <= x2 && y >= y1;s++) {
      x += vx; y += vy--;
      if (vx) vx--;
      if (y >= y1 && y <= y2 && x >= x1 && x <= x2) {
        cnt2++;
        i > 0 && cnt.add((i*i+i)/2);
        break;
      }
    }
  }
  return [cnt.get(), cnt2];
}
l(solve());
