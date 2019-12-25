#!/usr/bin/env node
const A = require('../advent');
const l = console.log;
const content = require('fs').readFileSync('1.input.txt','utf8');

const c = A.plane().cursor();
const t = A.best(v => -v);
const input = A.parse(content, /([LR])(\d+)/g);
for(const [a, b] of input) {
    a === 'L' ? c.turnL() : c.turnR();
    for (const i of A.seq(b)) {
        c.fw()
        if (c.get()) t.add(c.mDist())
        c.set(true);
    }
}
l(c.mDist(), t.get())
