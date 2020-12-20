#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('14.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function knot(v, i, len) {
  for (let j = i + len - 1; j > i; j--, i++) {
    [v[i&255], v[j&255]] = [v[j&255], v[i&255]];
  }
}
function hash(input) {
  input = input.split('').map(c => c.charCodeAt(0));
  input.push(17, 31, 73, 47, 23);
  let v = A.range(256);
  let skip = 0;
  let idx = 0;
  for (let round = 0; round < 64; round++)
  for (const len of input) {
    knot(v, idx, len);
    idx += len + skip++;
  }
  return A.range(16).map((p, i) => {
    const sl = v.slice(i * 16, i * 16 + 16);
    return sl.reduce((a, b) => a ^ b).toString(2).padStart(8, '0');
  }).join('');
}

function solve(input, part2) {
  const [key] = input;
  const p = A.plane('0', A.range(128).map(i => hash(`${key}-${i}`)));
  let sum = 0;
  for (const [x, y, v] of p) {
    if (v === '1') sum++;
    if (part2) A.bfs([x,y], ([x,y]) => {
      if (p.get(x,y) === '0') return [];
      p.set(x,y, '0');
      return A.neighbor4(x,y);
    })
  }
  return sum;
}
l(solve(input))
l(solve(input, true))
