#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq, freqa, sort, parse } = A;
const content = fs.readFileSync('9.input.txt','utf8');

const input = parse(content, /(-?\d+)/g);
function * intcode (code) {
    let pc = 0;
    let rel = 0;
    let m = code.slice()
    const inst = () => m[pc] % 100;
    const par = (i) => m[pc + i + 1];
    const mpar = (i) => {
        const mode = Math.floor(m[pc] / Math.pow(10, i+2)) % 10;
        return mode === 1 ? par(i) : m[par(i) + (mode === 2 ? rel : 0)];
    }
    const rpar = (i) => {
        const mode = Math.floor(m[pc] / Math.pow(10, i+2)) % 10;
        return par(i) + (mode === 2 ? rel : 0);
    }
    while (inst() !== 99) {
        switch (inst()) {
            case 1: m[rpar(2)] = mpar(0) + mpar(1); pc+=4; break;
            case 2: m[rpar(2)] = mpar(0) * mpar(1); pc+=4; break;
            case 3: m[rpar(0)] = yield "OK"; pc +=2; break;
            case 4: yield mpar(0); pc += 2; break;
            case 5: pc = mpar(0) ? mpar(1) : pc + 3; break;
            case 6: pc = !mpar(0) ? mpar(1) : pc + 3; break;
            case 7: m[rpar(2)] = mpar(0) < mpar(1) ? 1 : 0; pc+=4; break;
            case 8: m[rpar(2)] = mpar(0) === mpar(1) ? 1 : 0; pc+=4; break;
            case 9: rel += mpar(0); pc += 2; break;
            default: throw("BAD INSTRUCTION " + inst())
        }
    }
}
const run = intcode(input);
let v = { value: 0, done: false }
let c = 0;
while(!v.done && c++ < 20) {
    v = run.next(2);
    l(v);
}
l("DONE");
