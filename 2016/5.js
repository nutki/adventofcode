#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const md5 = require('js-md5');
const l = console.log
const { max, min, abs, seq, freq, sort, parse } = A;
const content = fs.readFileSync('5.input.txt','utf8');

const input = parse(content, /(.+)/g);
res = Array(8).fill('_');
rc = 0;
for (const line of input) {
    l(line)
    x = 0;
    while (rc < 8) {
        xx = md5(line + x);
        mm = xx.match(/^00000([0-7])(.)/);
        if (mm) {
            pos = parseInt(mm[1])
            if (res[pos] === '_') {
                res[pos] = mm[2];
                l(mm[2], res.join(''))
                rc++;
            }
        }
        x++
    }
}
l(res.join(''));
