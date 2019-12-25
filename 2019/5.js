#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq, freqa, sort, parse } = A;
const content = fs.readFileSync('5.input.txt','utf8');

const input = parse(content, /(-?\d+)/g);

function intcode (code, input) {
    let pc = 0;
    let m = code.slice()
    let data = input.slice()
    const inst = () => m[pc] % 100;
    const par = (i) => m[pc + i + 1];
    const mpar = (i) => {
        const mode = Math.floor(m[pc] / Math.pow(10, i+2)) % 10;
        return mode === 1 ? par(i) : m[par(i)];
    }
    while (inst() !== 99) {
        switch (inst()) {
            case 1: m[par(2)] = mpar(0) + mpar(1); pc+=4; break;
            case 2: m[par(2)] = mpar(0) * mpar(1); pc+=4; break;
            case 3: m[par(0)] = data.shift(); pc +=2; break;
            case 4: l(mpar(0)); pc += 2; break;
            case 5: pc = mpar(0) ? mpar(1) : pc + 3; break;
            case 6: pc = !mpar(0) ? mpar(1) : pc + 3; break;
            case 7: m[par(2)] = mpar(0) < mpar(1) ? 1 : 0; pc+=4; break;
            case 8: m[par(2)] = mpar(0) === mpar(1) ? 1 : 0; pc+=4; break;
            default: throw("BAD INSTRUCTION " + inst())
        }
    }
}

intcode(input, [5])