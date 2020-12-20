#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('19.input.txt','utf8');

function solve() {
  let cnt = '', cnt2 = 0;
  const p = A.plane(' ', content);
  for (const [x, y, a] of p) if (a === '|') {
    const c = p.cursor(x, y, 4);
    while(c.get() !== ' ') {
      while(c.get() !== '+' && c.get() != ' ') {
        if (c.get() >= 'A' && c.get() <= 'Z') cnt += c.get();
        c.fw(); cnt2++;
      }
      if (c.get() === '+') {
        if (c.getLeft() !== ' ') c.turnL(); else c.turnR();
        c.fw(); cnt2++;
      }
    }
    break;
  }
  return [cnt, cnt2];
}
l(solve())
