#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('9.input.txt','utf8');
const tf = ([x,y],[tx,ty]) =>
  A.abs(x - tx) > 1 || A.abs(y-ty) > 1 ? [tx + Math.sign(x - tx), ty + Math.sign(y - ty)] : [tx,ty];
const input = A.parse(content, /(.) (.+)/g);
function solve(part2) {
  const p = A.plane(), c = p.cursor();
  const ll = part2 ? 9:1;
  let t = A.seq(ll).map(x=>[0, 0]);
  for (const [d, n] of input) {
    for (const i of A.seq(n)) {
      c.move(d);
      t[ll] = c.pos();
      for (let i = t.length - 1; i > 0; i--) t[i-1] = tf(t[i], t[i-1]);
      p.set(...t[0],'#');
    }
  }
  return [...p].length;
}
l(solve());
l(solve(true));
