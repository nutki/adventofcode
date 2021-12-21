#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('21.input.txt','utf8');

const input = A.parse(content, /\d.*(\d+)/g);
const dice = [[ 6, 7 ], [ 5, 6 ], [ 7, 6 ], [ 4, 3 ], [ 8, 3 ], [ 3, 1 ], [ 9, 1 ]];
function solve(part2) {
  let cnt = 0, cnt2 = [0,0], [p1,p2] = input;
  let d = 0, score1 = 0, score2 = 0;
  p1--; p2--;
  function getd() {
    d = (d+1) % 100;
    cnt++;
    return d ? d : 100;
  }
  if (!part2) for (;;) {
    p1 += getd()+getd()+getd();
    p1 %= 10;
    score1 += p1 + 1;
    if (score1 >= 1000) return score2 * cnt;
    [p1,p2,score1,score2] = [p2,p1,score2, score1];
  }
  let m1 = new A.Map([[[0,0,p1,p2].join(),1]])
  for (let i = 0; m1.size; i++) {
    const m2 = new A.Map();
    for (const [k, v] of m1) {
      const [s1,s2,p1,p2] = k.split(',').map(x=>parseInt(x));
      for (const [dc, dv] of dice) {
        let pn = (p1 + dc) %10;
        let sn = s1 + pn + 1;
        if (sn >= 21) cnt2[i%2] += v * dv;
        else m2.inc([s2,sn,p2,pn].join(),v*dv);
      }
    }
    m1 = m2;
  }
  return cnt2.max();
}
l(solve());
l(solve(true));
