#!/usr/bin/env node
const A = require('../advent');
const B = BigInt;
const l = console.log
const content = require('fs').readFileSync('13.input.txt','utf8');
const [n, ...input] = A.parse(content, /(\w+)/g);
function solve(input) {
  let pairs = input.map((c, i) => [(c - i%c)%c, c]).filter(v => v[1] !== 'x');
  for (let i = n; ; i++) {
    const b = pairs.find(v => i%v[1] === 0);
    if (b) {
      l(b[1]*(i-n));
      break;
    }
  }
  return pairs.reduce((p1, p2) => {
    let cf = A.extended_gcd(p1[1], p2[1]);
    let m =  p1[1]*p2[1];
    let M = B(m);
    let r = Number(((B(cf[0]*p1[1])*B(p2[0])+B(cf[1]*p2[1])*B(p1[0]))%M+M)%M);
    return [r,m];
  })[0];
}
l(solve(input));
