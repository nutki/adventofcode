#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const { max, min, abs, seq, freq, freqa, sort, parse } = A;
const content = fs.readFileSync('13.input.txt','utf8');

const input = parse(content, /(.*)\n/g)[0];
function get(x, y) {
  return A.bitCount(x*x + 3*x + 2*x*y + y + y*y + input)&1;
}
for(const i of seq(10)) {
    l(seq(10).map(j => get(j, i)?"#":" ").join(''))
}
const d = new Map([["1,1", 0]]);
l(d)
const q = [[1,1]];
let qp = 0;
const add = (x,y,cd) => {
    if (x < 0 || y < 0 || get(x,y)) return;
    if (d.has([x,y].join(','))) return;
    d.set([x,y].join(','), cd+1);
    q.push([x,y]);
}
l(d.size)
while (qp < q.length) {
    const [x,y] = q[qp];
    const cd = d.get(q[qp++].join(','));
    if (cd === 50) break;
    add(x+1,y,cd);
    add(x-1,y,cd);
    add(x,y+1,cd);
    add(x,y-1,cd);
}
l(d.size)
