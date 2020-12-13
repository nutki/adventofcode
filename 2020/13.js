#!/usr/bin/env node
const A = require('../advent');
const B = BigInt;
const l = console.log
const content = require('fs').readFileSync('13.input.txt','utf8');
const [n, ...input] = A.parse(content, /(\w+)/g);
function solve() {
  let pairs = input.map((c, i) => [(c - i%c)%c, c]).filter(v => v[1] !== 'x');
  let b = A.best(([_, c])=>n%c-c);
  pairs.forEach(b.add);
  let c = b.get()[1];
  return [c*(c-n%c), pairs.reduce(([n1,m1], [n2,m2]) => {
    let [c1, c2] = A.extended_gcd(m1, m2);
    let m =  B(m1*m2);
    let r = B(c1*m1)*B(n2) + B(c2*m2)*B(n1);
    r %= m; r += m; r %= m;
    return [r,m].map(Number);
  })[0]];
}
l(solve());
