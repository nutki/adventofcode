#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq, freqa, sort, parse } = A;
const content = fs.readFileSync('12.input.txt','utf8');

const input = parse(content, /=(-?\d+).*?=(-?\d+).*?=(-?\d+)/g);
let cnt = 0;
for (const m1 of input) m1.push(0, 0, 0);
let res2 = [];
for (let i = 0; i < 3; i++) {
const x = new Map();
cnt = 0;
for(;; cnt++) {
let ca = [];
for (const m1 of input) {
    ca.push(m1[0+i], m1[3+i]);
}
let code = ca.join(',')
if (x.has(code)) {
    res2.push(cnt);
    break;
}
x.set(code, cnt);
for (const m1 of input) {
    for (const m2 of input) {
            if (m1[i] < m2[i]) m1[i+3]++;
            if (m1[i] > m2[i]) m1[i+3]--;
    }
}
for (const m1 of input) {
        m1[i] += m1[i + 3];
}
}
}
l(A.lcm(...res2))
let res = 0;
// for (const m1 of input) {
//     let e1 = 0, e2 = 0;
//     for (let i = 0; i < 3; i++) {
//         e1 += abs(m1[i]);
//         e2 += abs(m1[i+3]);
//     }
//     res += e1*e2;
// }
l(res);
