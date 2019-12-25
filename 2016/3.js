#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq, sort, parse } = A;
const content = fs.readFileSync('3.input.txt','utf8');

r = parse(content,/(\d+)\s+(\d+)\s+(\d+)/g);
cnt = 0;
r2 = [...r.map(a => a[0]), ...r.map(a => a[1]), ...r.map(a => a[2])]
l(r2.length/3);
for (i = 0; i < r2.length; i+=3) {
    a = [r2[i], r2[i+1], r2[i+2]];
    a = sort(a);
    if (a[0] + a[1] > a[2]) cnt++;
}
l(r2)
l(cnt)