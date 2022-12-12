#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('22.input.txt','utf8');

function solve(part2) {
  let cnt = 0;
  const p = A.plane(undefined, content);
  const next = part2 ? { '.': 'W', 'W': '#', '#': 'F', 'F': '.' } : { '.': '#', '#': '.' };
  const turn = { '.': 6, 'W':0, 'F': 4, '#': 2 };
  const c = p.cursor(Math.floor(p.width/2), Math.floor(p.height/2));
  for (let i = 0; i < (part2 ? 10000000 : 10000); i++) {
    const v = c.get() || '.', vn = next[v];
    c.turnR(turn[v]);
    c.set(vn);
    c.fw();
    cnt += vn === '#';
  }
  return cnt;
}
l(solve());
l(solve(true));
