#!/usr/bin/env node
const fs = require('fs');
const A = require('../advent');
const l = console.log
const content = fs.readFileSync('2.input.txt','utf8');
const intcode = require('./intcode');

const input = A.parse(content, /(-?\d+)/g);
input[1] = 12;
input[2] = 2;
l(intcode(input).peek(0));
for (const i of A.seq(100)) {
  for (const j of A.seq(100)) {
    input[1] = i;
    input[2] = j;
    if (19690720 === intcode(input).peek(0)) l(i*100+j);
  }
}
