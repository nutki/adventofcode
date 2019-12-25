#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq, freqa, sort, parse } = A;
const content = fs.readFileSync('10.input.txt','utf8');

const input = parse(content, /(.*)\n/g);
let cnt = 0;
let init = [];
let bots = []
let botLo = [], botHi = []
for (const line of input) {
    let ll = line.replace(/output (\d+)/g, (m, v) => 'bot ' + (parseInt(v) + 1000000))
    l(ll);
    let [ m ] = parse(ll, /value (\d+) goes to bot (\d+)/);
    if (m) {
        l(m)
        init.push(m);
    }
    [ m ] = parse(ll, /bot (\d+) gives low to bot (\d+) and high to bot (\d+)/)
    cnt++;
    if (m) {
        botLo[m[0]] = m[1]
        botHi[m[0]] = m[2]
    }
}
function pushBot(v, b) {
    if (!bots[b]) bots[b] = [];
    bots[b].push(v);
    if (b>= 1000000 && b < 1000004) l(v,b,bots[b].length);
    if (bots[b].length === 2) {
        const [lo, hi] = sort(bots[b]);
        if (lo === 17 && hi === 61) l("HA", b)
        pushBot(lo, botLo[b]);
        pushBot(hi, botHi[b])
    }
}
for (let [v, b] of init) {
    pushBot(v, b);
}
l(cnt);
l(23*31*53)