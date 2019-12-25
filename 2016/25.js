#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('25.input.txt','utf8');

const input = A.parse(content, /(.*)\n/g);
function test (a) {
  let m = {a};
  const val = (x) => typeof x === "number" ? x : (m[x] || 0);
  let pc = 0;
  let steps = 0;
  let o = '';
  while (pc < input.length && o.length < 12 && steps++ < 200000) {
    A.caseParse(input[pc++],
          [/cpy (\S+) ([a-z])/, ([a, b]) => m[b] = val(a)],
          [/jnz (\S+) (\S+)/, ([a, b]) => val(a) && (pc += val(b) - 1)],
          [/inc (\S+)/, (a) => m[a]++],
          [/dec (\S+)/, (a) => m[a]--],
          [/out (\S+)/, (a) => {
            o += val(a).toString();
          }],
          [/|/, () => { l("BAD", input[pc - 1]) }],
      );
      if (steps%1000000 === 0) l(pc, m)
  }
  return o;
}
for (const i of A.seq(4096)) {
  const r = test(i);
  if (r == '010101010101') {
    l(i)
    break;
  }
}
