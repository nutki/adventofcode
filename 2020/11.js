#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('11.input.txt','utf8');

function solve(part2) {
  let p = A.plane(' ', content), p2 = A.plane(' ');
  let prev = 0;
  for (;;) {
    let cnt = 0;
    let c = p.cursor();
    for (let [x, y, v] of p) {
      if (v !== '.') {
        c.setPos(x,y);
        let n = A.seq(8).map(() => {
          let v;
          for (let j = 1; (v = c.getRel(j, 0)) === '.' && part2; j++) ;
          c.turnR(1);
          return v;
        }).filter(v => v === '#').length;
        if (n === 0) v = '#';
        else if (n >= (part2 ? 5 : 4)) v = 'L';
        if (v === '#') cnt++;
      }
      p2.set(x,y,v)
    }
    if (cnt === prev) return cnt;
    [p2, p, prev] = [A.plane(), p2, cnt]
  }
}
l(solve());
l(solve(true));
