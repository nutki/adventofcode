#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('16.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function permMul(perm1, perm2) {
  return perm1.map(e => perm2[e]);
}
function permPow(perm, count) {
  let base = A.range(perm.length);
  while(count) {
    if (count & 1) base = permMul(base, perm);
    perm = permMul(perm, perm);
    count >>= 1;
  };
  return base;
}
function solve2(input, part2) {
  let cmds = input[0].split(',');
  let d = A.range(16);
  let m = A.range(16);
  for (const cmd of cmds) {
    A.caseParse(cmd,
      [/s(\d+)/, a => d = A.rotR(d, a)],
      [/p(.)\/(.)/, ([a,b]) => {
        let ap = a.charCodeAt(0)-97, bp = b.charCodeAt(0)-97;
        [m[ap],m[bp]] = [m[bp], m[ap]];
      }],
      [/x(\d+)\/(\d+)/, ([a,b]) => {
        [d[a],d[b]] = [d[b], d[a]];
      }],
    );
  }
  d = permPow(d, part2 ? 1000000000 : 1);
  m = permPow(m, part2 ? 1000000000 : 1);
  let z = new Map(Array.from(m.entries()).map(r => r.reverse()));
  return d.map(e => String.fromCharCode(z.get(e)+97)).join('');
}
l(solve2(input))
l(solve2(input, true))
