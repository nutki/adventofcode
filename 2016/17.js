#!/usr/bin/env node
const A = require('../advent');
const md5 = require('js-md5');
const l = console.log
const content = require('fs').readFileSync('17.input.txt','utf8');

const input = A.parse(content, /(.+)/g)[0];
const q = [""];
let qp = 0;
function valid(path) {
    const f = A.freq(path);
    let x = (f.R||0) - (f.L||0);
    let y = (f.D||0) - (f.U||0);
    return x >= 0 && x <= 3 && y >= 0 && y <= 3;
}
function end(path) {
    const f = A.freq(path);
    let x = (f.R||0) - (f.L||0);
    let y = (f.D||0) - (f.U||0);
    return y === 3 && x === 3;
}
const add = (x) => {
    if (!valid(x)) return;
    q.push(x);
}
let longest;
const dirs = Array.from("UDLR");
while (qp < q.length) {
    const path = q[qp++];
    if (end(path)) {
        if(!longest) l(path)
        longest = path;
        continue;
    }
    const k = md5(input + path);
    dirs.forEach((e, i) => k.charAt(i) >= 'b' && add(path + e))
}
l(longest, longest.length);
