#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('14.input.txt','utf8');

function solve() {
  const p = A.plane();
  const coords = A.parse(content, /(\d+),(\d+)(?= -> (\d+),(\d+))/g);
  for (const [x1, y1, x2, y2] of coords) {
    const [x3, x4] = A.sort([x1, x2]);
    const [y3, y4] = A.sort([y1, y2]);
    for (let x = x3; x <= x4; x++) for (let y = y3; y <= y4; y++) p.set(x,y,'#');
  }
  let cnt = 0, cnt1 = 0;
  const yy = p.maxY() + 1;
  function place(x,y) {
    if (y < yy) [0,-1,1].forEach(i => !p.get(x+i,y+1) && place(x+i,y+1));
    if (y == yy && !cnt1) cnt1 = cnt;
    p.set(x,y,'o');
    cnt++;
  }
  place(500,0);
  return [cnt1, cnt];
}
l(solve());
