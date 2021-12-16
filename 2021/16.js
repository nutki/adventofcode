#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('16.input.txt','utf8');
const input = Array.from(A.parse(content, /(.+)/g)[0].replaceAll(/./g,m => parseInt(m,16).toString(2).padStart(4, '0')));
function solve() {
  let cnt = 0, pos = 0;
  const bits = n => input.slice(pos,pos+=n).reduce((c,a)=>c+c+parseInt(a),0);
  function read() {
    cnt += bits(3);
    const t = bits(3);
    let ops = [];
    if (t === 4) {
      let c = 0, i = 1;
      while(i) [i, c] = [bits(1), c * 16 + bits(4)];
      return c;
    } else if (!bits(1)) {
      let len = bits(15), target = pos + len;
      while(pos < target) ops.push(read());
    } else {
      ops = A.seq(bits(11)).map(() => read());
    }
    return [
      (...a) => a.sum(),
      (...a) => a.prod(),
      A.min,
      A.max,
      null,
      (x,y) => x > y | 0,
      (x,y) => x < y | 0,
      (x,y) => x === y | 0,
    ][t](...ops);
  }
  const res = read();
  return [ cnt, res ];
}
l(solve());
