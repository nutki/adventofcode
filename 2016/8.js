#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq, freqa, sort, parse } = A;
const content = fs.readFileSync('8.input.txt','utf8');

const input = parse(content, /(.*)\n/g);
let cnt = 0, cnt2 = 0;
let row = Array(50).fill('.');
let m = seq(6).map(() => row.slice());
for (const line of input) {
    for([x, y] of parse(line, /(\d+)x(\d+)/)) {
        for (i of seq(x)) {
            for (j of seq(y)) {
                m[j][i] = '#';
                cnt2++;
            }
        }
    }
    for([y, x] of parse(line, /y=(\d+) by (\d+)/)) {
        m[y] = [...m[y].slice(50-x),...m[y].slice(0, 50-x)];
    }
    for([x, y] of parse(line, /x=(\d+) by (\d+)/)) {
        col = m.map(e => e[x]);
        col2 = [...col.slice(6-y), ...col.slice(0, 6-y)];
        l(x,y, col, col2);
        col2.forEach((e, i) => m[i][x] = e);
    }

}
l(m.map(c => c.join('')).join('\n'));
m.forEach(row => row.forEach(e => cnt += e === '#' ? 1:0));
l(cnt, cnt2)
