#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const B = BigInt
const content = require('fs').readFileSync('14.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(part2) {
  let cnt = 0, m1, m0, mX, mem = new Map();
  const set = (a, v) => { cnt += v; cnt -= mem.get(a) || 0; mem.set(a, v) }
  for (const line of input) {
    A.caseParse(line,
      [/mask = (.+)/, m => {
        const a = Array.from(m);
        mX = a.map((v, i) => [v, 35-i]).filter(([v, i]) => v === 'X').map(([v, i]) => B(i));
        m1 = part2 ?
          B(parseInt(a.map(v => v==='X'?0:1).join(''),2)) :
          B(parseInt(a.map(v => v==='X'?1:v).join(''),2));
        m0 = B(parseInt(a.map(v => v==='X'?0:v).join(''),2));
      }],
      [/mem.(\d+). = (\d+)/, ([a, v]) => {
        if (!part2) set(a, Number(B(v) & m1 | m0));
        else for (let i = 0; i < (1 << mX.length); i++) {
          let aa = B(a) & m1 | m0;
          for (let j = 0; j < mX.length; j++)
            if (i & (1 << j)) aa |= (1n << mX[j]);
          set(Number(aa), v);
        }
      }]);
  }
  return cnt;
}
l(solve());
l(solve(true));
