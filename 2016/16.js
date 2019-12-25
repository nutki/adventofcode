#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('16.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(cnt) {
  for (const line of input) {
    let x = line;
    while(x.length < cnt) {
      x = x + '0' + x.split('').reverse().map(e => e === '1' ? '0': '1').join('')
      l(x.length)
    }
    x = x.substring(0, cnt)
    l(x.length)
    while(!(x.length % 2)) {
      x = x.replace(/../g, e => e === '00' || e === '11' ? '1' : '0');
      l(x.length)
    }
    l(x);
  }
}
solve(272)
solve(35651584)