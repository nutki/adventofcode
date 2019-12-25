#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq, freqa, sort, parse } = A;
const content = fs.readFileSync('12.input.txt','utf8');

const input = parse(content, /(.*)\n/g);
let m = {c:1};
const val = (x) => typeof x === "number" ? x : (m[x] || 0);
let pc = 0;
let steps = 0;
while (pc < input.length && steps++ < 100000000) {
//    l(pc, input[pc], m)
    A.caseParse(input[pc++],
        [/cpy (\S+) (\S+)/, ([a, b]) => m[b] = val(a)],
        [/jnz (\S+) (\S+)/, ([a, b]) => val(a) && (pc += b - 1)],
        [/inc (\S+)/, (a) => m[a]++],
        [/dec (\S+)/, (a) => m[a]--],
        [/|/, () => { throw "BAD" }],
    );
}
l(m, steps)