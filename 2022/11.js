#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('11.input.txt','utf8');

function solve(part2) {
  const input = content.split('\n\n').map(a => A.parse(a, /(\d+|[-+*]|old)/sg));
  for (const line of input) {
    line.reverse(); line[5] = line.pop();
    line.push(line.splice(6));
  }
  const cnt = new A.Map();
  const mod = input.prod(x => x[2]);
  for (const i of A.seq(part2 ? 10000 : 20)) {
    for (const m of input) {
      const [ nfalse, ntrue, div, op2, op1, idx, q] = m;
      cnt.inc(idx, q.length);
      for (const cur of q) {
        const v = op2 === 'old' ? cur : op2;
        let res = op1 === '*' ? cur * v : cur + v;
        if (!part2) res = A.div(res,3)[0];
        input[A.div(res, div)[1] ? nfalse : ntrue][6].push(res % mod);
      }
      m[6] = [];
    }
  }
  return A.sort(cnt.values()).slice(-2).prod();
}
l(solve());
l(solve(true));
