#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('14.input.txt','utf8');

const [ template, rules ] = content.split('\n\n');
const r = new Map(A.parse(rules, /(..) -> (.)/g));
function solve(part2) {
  const m = new A.Map(), c = new A.Map(A.freqa(template));
  for (let i = 0; i < template.length - 1; i++) m.inc(template.substring(i, i+2), 1)
  for (let i = 0; i < (part2 ? 40 : 10); i++) {
    for (const [k, v] of Array.from(m)) {
      m.inc(k[0]+r.get(k), v);
      m.inc(r.get(k)+k[1], v);
      m.inc(k, -v);
      c.inc(r.get(k), v);
    }
  }
  return A.max(...c.values()) - A.min(...c.values());
}
l(solve());
l(solve(true));
