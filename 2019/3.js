#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('3.input.txt','utf8');
const input = A.parse(content, /(.+)/g).map(e => A.parse(e, /([RLDU])(\d+)/g));
let p = A.plane()
let c = p.cursor()
let b1 = A.best(v => -v), b2 = A.best(v => -v)
let cnt = 0;
for (const [d, n] of input[0]) {
    for (const i in A.seq(n)) {
        c.move(d)
        c.set(++cnt);
    }
}
c = p.cursor()
cnt = 0;
for (const [d, n] of input[1]) {
    for (const i in A.seq(n)) {
        c.move(d)
        ++cnt;
        if (c.get()) b2.add(cnt + c.get()), b1.add(c.mDist())
    }
}
l(b1.get());
l(b2.get());
