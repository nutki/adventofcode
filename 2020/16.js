#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('16.input.txt','utf8');

const input = A.parse(content, /(\d+)-(\d+) or (\d+)-(\d+)/g);
const tickets = A.parse(content, /(\d+(?:,\d+)+)/g).map(l => A.parse(l, /(\d+)/g));
function solve() {
  let cnt = 0;
  const valid = [];
  let rules = input.map(([a,b,c,d]) => v => v >= a && v <= b || v >= c && v <= d);
  let n = input.length;
  for (const line of tickets) {
    const notValid = line.filter(v => !rules.some(r => r(v)));
    for(const v of notValid) cnt+=v;
    if (!notValid.length) valid.push(line);
  }
  let res = new Map();
  const vp = rules.map(r => A.seq(n).filter(i => valid.every(t => r(t[i]))));
  while (res.size < n) {
    let resolved = [...res.values()];
    for (const i of A.seq(n)) if (!res.has(i)) {
      const validProps = vp[i].filter(v => !resolved.includes(v));
      if (validProps.length === 1) res.set(i, validProps[0]);
    }
  }
  const rr = A.seq(6).map(i => tickets[0][res.get(i)]);
  return [cnt, A.prod(rr)];
}
l(solve());
