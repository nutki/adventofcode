#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('17.input.txt','utf8');
const intcode = require('./intcode');

const input = A.parse(content, /(-?\d+)/g);
const p = A.plane();
const c = p.cursor();
const poi = p.load(intcode(input).getAll().map(c => String.fromCharCode(c)).join(''));
c.setPos(...poi['^']);
c.set('#');
let res = 0;
for(const [i, j, c] of p) {
  if (c === '#' && p.get(i-1,j) === '#' && p.get(i+1,j) === '#' && p.get(i,j-1) === '#' && p.get(i,j+1) === '#') res += i*j;
}
l(res);
let res2 = [];
while(true) {
  if (c.getFw() === '#') {
    c.fw(); res2.push('F');
  } else if(c.getLeft() === '#') {
    c.turnL(); res2.push('L');
  } else if (c.getRight() === '#') {
    c.turnR(); res2.push('R');
  } else {
    break;
  }
}
res2 = res2.join('').replace(/F+/g, m => `,${m.length},`);
let m = res2.match(/^(.{1,20})(?:\1)*(.{1,20})(?:\1|\2)*(.{1,20})(?:\1|\2|\3)*$/);
res2 = res2.replace(new RegExp(m[1],'g'),'A,')
  .replace(new RegExp(m[2],'g'),'B,')
  .replace(new RegExp(m[3],'g'),'C,');
let ii = [res2,m[1],m[2],m[3],"n,"].map(a => a.replace(/,$/, '\n')).join('');
input[0] = 2;
intcode(input, ii.split('').map(c => c.charCodeAt(0)), v => v > 127 && l(v));
