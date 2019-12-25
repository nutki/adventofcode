#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq } = A;
const content = fs.readFileSync('8.input.txt','utf8');
v =[]
me = Array(150).fill(2);
content.replace(/.{150}/g, (m) => {
    z = freq(m);
    for ([idx, i] of Array.from(m).entries()) {
        if (me[idx] == 2) me[idx] = i;
    }
    v.push({z:z[0], v:z[1] * z[2]});
})
l(v);

l(me.join('').replace(/.{25}/g, m => m + '\n').replace(/0/g,' ' ));