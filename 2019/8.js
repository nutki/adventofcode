#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('8.input.txt','utf8');
let b = A.best(v => -v[0]);
let me = Array(150).fill('2');
content.replace(/.{150}/g, (m) => {
    let z = A.freq(m);
    Array.from(m).forEach((i, idx) => me[idx] === '2' && (me[idx] = i));
    b.add([z[0], z[1] * z[2]]);
})
l(b.get()[1]);
l(me.map(a => ' #'[a]).join('').replace(/.{25}/g, m => `${m}\n`));
