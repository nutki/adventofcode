#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('10.input.txt','utf8');

const input = A.parse(content, /(\w+)(?: (.+))?/g);
function solve() {
  let cnt = 0, x = 1, res = 0, img = '';
  const inc = () => {
    const xpos = ++cnt % 40;
    img += xpos >= x && xpos <= x+2 ? '#' : ' ';
    if (!xpos) img += '\n';
    if (xpos == 20) res += cnt*x;
  }
  for (const [op, v] of input) {
    inc();
    if (op === 'addx') inc(), x += v;
  }
  l(img);
  return res;
}
l(solve());
