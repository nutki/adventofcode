#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('10.input.txt','utf8');

const input = A.parse(content, /(\d+)/g);
function solve(input, part2) {
  if (part2) {
    input = input.join(',').split('').map(c => c.charCodeAt(0));
    input.push(17, 31, 73, 47, 23);
  }
  let v = A.range(256);
  let skip = 0;
  let idx = 0;
  l(input);
  for (let round = 0; round < (part2 ? 64:1); round++)
  for (const len of input) {
    v = A.rotL(v, idx);
    v = v.slice(0, len).reverse().concat(v.slice(len));
    v = A.rotR(v, idx);
    idx += len + skip++;
  }
  if (!part2) {
    return v[0] * v[1];
  } else {
    return A.range(16).map(i => {
      const sl = v.slice(i * 16, i * 16 + 16);
      return sl.reduce((a, b) => a ^ b).toString(16).padStart(2, '0');
    }).join('');
  }
}
l(solve(input))
l(solve(input, true));
