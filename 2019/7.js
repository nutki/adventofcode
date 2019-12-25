#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq, freqa, sort, parse } = A;
const content = fs.readFileSync('7.input.txt','utf8');

const input = parse(content, /(-?\d+)/g);
function * intcode (code, input) {
    let pc = 0;
    let m = code.slice()
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
            case 3: m[par(0)] = yield "OK"; pc +=2; break;
            case 4: yield mpar(0); pc += 2; break;
            case 5: pc = mpar(0) ? mpar(1) : pc + 3; break;
            case 6: pc = !mpar(0) ? mpar(1) : pc + 3; break;
            case 7: m[par(2)] = mpar(0) < mpar(1) ? 1 : 0; pc+=4; break;
            case 8: m[par(2)] = mpar(0) === mpar(1) ? 1 : 0; pc+=4; break;
            default: throw("BAD INSTRUCTION " + inst())
        }
    }
}
const b = A.best(v => v);
for(const p of A.perm([0,1,2,3,4])) {
    const r = seq(5).map(() => intcode(input))
    r.forEach((c,i) => {
        c.next()
        c.next(p[i]+5)
    });
    let v = { value: 0, done: false }
    let last;
    while(!v.done) {
        r.forEach((c) => {
            v = c.next(v.value); c.next();
        })
        if (!v.done) last = v.value
    }
    b.add(last);
}
l(b.get())
