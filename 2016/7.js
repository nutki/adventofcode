#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq, freqa, sort, parse } = A;
const content = fs.readFileSync('7.input.txt','utf8');

const input = parse(content, /(.+)/g).map(c => c[0]);
let cnt = 0;
for (const line of input) {
//    if (line.match(/([a-z])(?!\1)([a-z])\2\1/) && !line.match(/\[[a-z]*?([a-z])(?!\1)([a-z])\2\1/)) cnt++, l(line)
    v = [];
    line1 = line.replace(/\[([a-z]*)\]/g, (m, g) => {
        v.push(g);
        return ',';
    })
    line2 = line1 + '-' + v.join()
    l(line2)
    if (line2.match(/([a-z])(?!\1)([a-z])\1.*?-.*?\2\1\2/)) cnt++;
}
l(cnt)
