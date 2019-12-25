#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq, sort, parse } = A;
const content = fs.readFileSync('4.input.txt','utf8');

const input = parse(content, /([a-z-]+)-(\d+)\[([a-z]+)\]/g);
cnt = 0;
for([aa, id, ch] of input) {
    a = aa.replace(/-/g, '');
    a1 = Object.entries(freq(a));
    a2 = sort(a1, e => e[0]);
    a3 = sort(a2, e => -e[1]);
    rch = a3.map(e => e[0]).slice(0,5).join('')
    if (ch !== rch) continue;
    aa = aa.replace(/-/g, ' ');
    aa = aa.replace(/[a-z]/g, c => {
        ll = c.charCodeAt(0)-97
        ll += id;
        ll %= 26;
        ll = String.fromCharCode(ll + 97);
        return ll;
    });
    if (aa.match(/north/)) l(aa, id);
}
l(cnt)
