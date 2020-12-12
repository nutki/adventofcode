#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('7.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(input) {
  let gv = {};
  for (const line of input) {
    const [[n, w, c]] = A.parse(line, /(\w+) \((\d+)\)(.*)/);
    const c2 = A.parse(c, /(\w+)/g);
    gv[n] = { n, w, c2 };
  }
  const gvv = Object.values(gv);
  const vv = gvv.find(v => !gvv.some(v1 => v1.c2.includes(v.n))).n;
  const cgw = n => {
    const subsums = gv[n].c2.map(nn => cgw(nn));
    const f = A.freqa(subsums);
    if (f.length>1) {
      const goodsum = f[0][0];
      subsums.forEach((c, i) => {
        if (c != goodsum) {
          const diff = c - goodsum;
          gv[gv[n].c2[i]].w -= diff;
          subsums[i] -= diff;
          l(gv[gv[n].c2[i]].w);
        }
      });
    }
    return gv[n].w + A.sum(subsums);
  }
  l(vv);
  cgw(vv);
}
solve(input)
