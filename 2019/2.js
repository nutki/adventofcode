#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq, freqa, sort, parse } = A;
const content = fs.readFileSync('2.input.txt','utf8');

const input = parse(content, /(-?\d+)/g);

for (const p of seq(10000)) {
    let m = input.slice()
    let pc = 0;
    m[1] = Math.floor(p / 100);
    m[2] = p%100;
    const inst = () => m[pc];
    const par = (i) => m[pc + i + 1];
    while (inst() !== 99) {
        switch (inst()) {
            case 1: m[par(2)] = m[par(0)] + m[par(1)]; pc+=4; break;
            case 2: m[par(2)] = m[par(0)] * m[par(1)]; pc+=4; break;
            default: throw("BAD INSTRUCTION " + inst())
        }
    }
    if (m[0] === 19690720) {
        l(p, m[0])
    }
}
