#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq, freqa, sort, parse } = A;
const content = fs.readFileSync('10.input.txt','utf8');

const input = parse(content, /(.*)\n/g);
let y = 0;
const ast = [];
for (const line of input) {
    let x = 0;
    for (const c of line.split('')) {
        if (c==='#') {
            ast.push({x,y});
        }
        x++;
    }
    y++;
}
l(ast);
const res = [];
let i = 0;
for (const a of [ast[306]]) {
    const v = new Map();
    const d = new Map();
    for (const b of ast) {
        if (a === b) continue;
        const rx = b.x - a.x, ry = a.y - b.y;
        let rat = ry === 0 ? 1000 : abs(rx)/abs(ry);
        if (rx >=0 && ry < 0) rat = 10000 - rat;
        else if (rx < 0 && ry < 0) rat = 10000 + rat;
        else if (rx < 0 && ry >= 0) rat = 20000 - rat;
//        l(rx,ry,rat)
//        while (v.has(rat)) rat += 40000;
        const dist = rx*rx+ry*ry;
        if (!d.has(rat) || d.get(rat) > dist) {
            d.set(rat, dist);
            v.set(rat, b);
        }
    }
    const order = sort(Array.from(v.keys()));
//    l(order);
    for (let q of [10,20,50,199,200]) {
        const rr = v.get(order[q-1]);
        l(q,order[q], rr, rr.x-11, rr.y-13);
    }
    res.push(v.size);
    if (v.size === 286) l("HERE",a,i);
    i++;
//    l(v.size, v)
}
l(ast.length, sort(res, v => -v)[0])
/*

.7..7
.....
67775
....7
...87

*/