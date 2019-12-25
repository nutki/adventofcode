#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const md5_base = require('js-md5');
const l = console.log
const { max, min, abs, seq, freq, freqa, sort, parse } = A;
const content = fs.readFileSync('14.input.txt','utf8');

function md5(i) {
    for (let cnt = 0; cnt < 2017; cnt++) {
        i = md5_base(i);
    }
    return i;
}
const input = parse(content, /(.*)\n/g)[0];
let cnt = 0;
let a = [];
let res = 1;
let rr = [];
while(cnt < 30000) {
    const tmp = input + cnt;
    const sum = md5(tmp);
    let xxx;
    if (xxx = sum.match(/(.)\1\1\1\1/)) {
        l(cnt, sum, a.length);
        for (let aax in a) {
            const [aa, ab] = a[aax];
            if (aa < cnt - 1000) continue;
            if (ab !== xxx[1]) continue;
            l(res, aa, md5(input + aa))
            res++;
            rr.push(aa);
            a[aax] = [0,'x']

        }
    }
    if (xxx = sum.match(/(.)\1\1/)) {
        a.push([cnt, xxx[1]])
    };
    cnt++;
}
l('==')
rrr = sort(rr);
for (let i in rrr) {
    l(i, rrr[i]);
}
l(cnt);
