#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('19.input.txt','utf8');

const input = A.parse(content, /(.+)/g)[0];
function solve(input) {
  let en = A.seq(input+1).slice(1);
  let off = 0;
  while(en.length > 1) {
    const no = en.length % 2;
    en = en.filter((e,i) => i%2 === off);
    off ^= no;
  }
  l(en[0]);
}
solve(5)
solve(input)

function solve2(input) {
  let en = A.seq(input).map(v => (v + Math.floor(input/2)) % input + 1);
  let off = input % 2 ? 1 : 2;
  while(en.length > 2) {
    const no = en.length % 3;
    en = en.filter((e,i) => i%3 === off);
    off = (off + 3 - no) % 3;
  }
  l(en[off === 2 ? 1 : 0]);
}
solve2(5)
solve2(input)