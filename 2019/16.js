#!/usr/bin/env node
const A = require('../advent');
const l = console.log
let content = require('fs').readFileSync('16.input.txt','utf8');

let input = A.parse(content, /(.)/g);
function solve(input, offset = 0) {
  input = input.slice(offset);
  for (const i of A.seq(100)) {
    const sums = input.slice();
    for (let j = sums.length - 1; j > 0; j--) {
      sums[j - 1] += sums[j];
    }
    input = input.map((a, ii) => {
      let res = 0, mm = 0;
      for(let j = ii; j < input.length; j+=ii+offset+1) {
        res += [1,-1,-1,1][mm++&3] * sums[j];
      }
      return A.abs(res)%10;
    });
  }
  return input.slice(0,8).join('');
}

l(solve(input))
let newInput = [];
for (let i = 0; i < 10000; i++) {
  newInput.splice(newInput.length, 0, ...input);
}
l(solve(newInput, parseInt(content.substring(0,7))))
