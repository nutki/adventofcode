#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq, freqa, sort, parse } = A;
const content = fs.readFileSync('11.input.txt','utf8');

const input = parse(content, /(.*)\n/g);
const state = [0xFC,0x003,0,0,0];
function ser(s) { return s.join(',') }
function de(s) { return s.split(',').map(e => parseInt(e))}
const queue = [ [ser(state), 0] ];
const done = new Map();
let qp = 0;
function move2(e, f, from, to, d) {
    const st = f.slice();
    st[from] ^= e;
    st[to] ^= e;
    st[4] = to;
    const n = ser(st);
    if (done.has(n)) return;
    done.set(n, 1);
    queue.push([n, d]);
}
function move(e, f, d) {
    const el = f[4];
    if (el > 0) move2(e, f, el, el - 1, d);
    if (el < 3) move2(e, f, el, el + 1, d);
}
function boom (e) {
    const unsafe = e & ~(e >> 4) & 0xF;
    const res = unsafe && (e >> 4) ? true : false;
    return res;
}
while (qp < queue.length) {
    const [ e, d ] = queue[qp++];
    const f = de(e);
    if (f[3] === 0xff || qp % 100000 === 0) l(qp, d, e);
//    if (boom(f[0]) || boom(f[1]) || boom(f[2]) || boom(f[3])) continue;
    const el = f[4];
    const elf = f[el];
    for (let i of seq(10)) {
        if (!(elf & (1<<i))) continue;
        move(1<<i,f, d+1);
        for (let j of seq(10)) {
            if (i == j || !(elf & (1<<j))) continue;
            move((1<<i)|(1<<j),f, d+1);
        }
    }

} 
