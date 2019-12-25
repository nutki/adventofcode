#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('23.input.txt','utf8');

const input = A.parse(content, /(.*)\n/g);
let m = {a:12};
const val = (x) => typeof x === "number" ? x : (m[x] || 0);
let pc = 0;
let steps = 0;
while (pc < input.length && steps++ < 200000000) {
  if (pc === 4 && m.b > 0 && m.d > 0) {
    m.a += m.b * m.d;
    m.c = 0;
    m.d = 0;
    pc = 9;
  }
  A.caseParse(input[pc++],
        [/cpy (\S+) ([a-z])/, ([a, b]) => m[b] = val(a)],
        [/jnz (\S+) (\S+)/, ([a, b]) => val(a) && (pc += val(b) - 1)],
        [/inc (\S+)/, (a) => m[a]++],
        [/dec (\S+)/, (a) => m[a]--],
        [/tgl (\S+)/, ([a]) => {
          const rpc = pc + val(a)-1;
          l("tg", rpc, input[rpc])
          if (!input[rpc]) return;
          input[rpc] = input[rpc].replace(/.../, m => ({
            inc:"dec",
            dec:"inc",
            tgl:"inc",
            jnz:"cpy",
            cpy:"jnz",
          })[m])
        }],
        [/|/, () => { l("BAD", input[pc - 1]) }],
    );
    if (steps%1000000 === 0) l(pc, m)
}
l(m, steps)
