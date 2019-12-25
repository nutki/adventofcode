#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('18.input.txt','utf8');

let input = A.parse(content, /(.)/g).map(x => x==='^' ? 1: 0);
let cnt = 0;
for (const line of A.seq(400000)) {
    input = input.map((e, i) => {
        cnt += 1 - e;
        const c = (input[i-1] || 0) * 4 + (input[i]) * 2 + (input[i+1] || 0)
        return [0,1,0,1,1,0,1,0][c];
    })
}
l(cnt);
