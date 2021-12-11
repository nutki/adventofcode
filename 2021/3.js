#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('3.input.txt','utf8');

function filter(s, pos) {
  const r1 = s.filter(v => v.toString()[pos] === '1');
  const r0 = s.filter(v => v.toString()[pos] === '0');
  return [r0, r1];
}
const input = A.parse(content, /(.+)/g);
function solve(part2) {
  let m = input[0].toString().length;
  let x = 0, y = 0;
  let xd = input, yd = input;
  for (let i = 0; i < m; i++) {
    x *= 2; y *= 2;
    if (xd.length === 1) {
      if(xd[0][i] === '1') x++;
    } else {
      const [r0x, r1x] = filter(xd, i);
      if (r1x.length >= r0x.length) x++;
      if (part2) xd = r1x.length >= r0x.length ? r1x : r0x;
    }
    if (yd.length === 1) {
      if(yd[0][i] === '1') y++;
    } else {
      const [r0y, r1y] = filter(yd, i);
      if (r1y.length < r0y.length) y++;
      if (part2) yd = r1y.length < r0y.length ? r1y : r0y;
    }
  }
  return x * y;
}
l(solve());
l(solve(true));