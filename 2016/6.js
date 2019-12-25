#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq, sort, parse } = A;
const content = fs.readFileSync('6.input.txt','utf8');

const input = parse(content, /(.*)\n/g).map(c => c[0]);
res = '';
for (i of seq(8)) {
    a0 = input.map(a => a[i])
    a3 = A.freqa(a0)
    a4 = a3[0][0]
    res += a4
    l(a4)
}
l(res)