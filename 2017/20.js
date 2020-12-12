#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('20.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function m(a) {
  for(let i = 5; i >= 0; i--) a[i] += a[i+3];
}
function p(a) {
  return `${a[0]} ${a[1]} ${a[2]}`;
}
function sort(a, n) {
  return A.sort(a, e => e[n]);
}
function sorted(a, n) {
  return !a.some((e, i) => i && a[i-1][n] > e[n]);
}
function solve(input, part2) {
  let a = input.map((line, i) => [...A.parse(line,/(-?\d+)/g), i]);
  let sr = [];
  do {
    for (let i = 0; i < 100; i++) {
      const pos = {}, dup = {};
      if (part2) {
        a.forEach(x => {
          let z = p(x);
          if (pos[z]) dup[z] = 1; else pos[z] = 1;
        });
        a = a.filter(x => !dup[p(x)]);
      }
      a.forEach(x => m(x));
    }
    const s0 = sort(a,0), s1 = sort(a,1), s3 = sort(a,2);
    sr = [sorted(s0, 3), sorted(s0, 6), sorted(s1, 4), sorted(s1, 7), sorted(s3, 5), sorted(s3, 8)];
  } while(sr.some(a => !a)); 
  if (part2) return a.length;
  const bb = A.best(a => -(A.abs(a[0]) + A.abs(a[1]) + A.abs(a[2])))
  a.forEach(e => bb.add(e));
  return bb.get()[9];
}
l(solve(input))
l(solve(input, true))
