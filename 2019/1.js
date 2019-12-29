#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('1.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
let res1 = 0, res2 = 0;
for (let line of input) {
    res1 += Math.floor(line / 3) - 2;
    while(line) {
        line = A.max(0, Math.floor(line / 3) - 2)
        res2 += line;
    }   
}
l(res1, res2);
