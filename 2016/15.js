#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq, freqa, sort, parse } = A;
const content = fs.readFileSync('15.input.txt','utf8');

const input = parse(content, /(\d+) pos.*?(\d+)\./g);
input.push([11,0])

let cnt = 0;
const mat = [];
for (const [c,p] of input) {
    l(c,p);
    cnt++;
    mat.push((c - cnt % c) %c);
}
l(0, input);
for(cnt = 1;;cnt ++) {
    let idx = 0, bad = false;
    for (const i of input) {
        i[1]++;
        if (i[1] === i[0]) i[1] = 0;
        if (i[1] !== mat[idx++]) bad = true;
    }
    //l(cnt, input)
    if (!bad) {
//        l(cnt, input)
        break;
    }
}
l(cnt);
l(mat);