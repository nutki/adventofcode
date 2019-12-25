#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('13.input.txt','utf8');
const intcode = require('./intcode');

const input = A.parse(content, /(-?\d+)/g);
let cnt = 0;
intcode(input, [], (x, y, c) => c === 2 && cnt++);
input[0] = 2;
let bx, px, score;
let p = A.plane();
intcode(input, () => bx < px ? -1 : bx > px ? 1 : 0, (x, y, c) => {
    if (x < 0) {
        score = c;
        A.home()
        p.print()
        l(score)
    } else {
        p.set(x,y,[' ', '#', 'B', '_', 'o'][c])
        if (c === 4) bx = x;
        if (c === 3) px = x;
    }
});
l(cnt);
