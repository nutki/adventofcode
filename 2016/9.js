#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq, freqa, sort, parse } = A;
const content = fs.readFileSync('9.input.txt','utf8');
function len(line) {
    let r = 0;
    let zz;
    do {
        zz = parse(line, /^(.*?)\((\d+)x(\d+)\)(.*)/)
        for(let a of zz) {
            l(a[0],a[1],a[2], a[3].substring(0, a[1]));
            r += a[0].length;
            r += a[2] * len(a[3].substring(0, a[1]))
            line = a[3].substring(a[1]);
        }
    } while(zz.length)
    return r + line.length;
}
const input = parse(content, /(.*)\n/g);
let cnt = 0, res = '';
for (let line of input) {
    l(len(line))
}
