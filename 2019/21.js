#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('21.input.txt','utf8');
const intcode = require('./intcode');

const input = A.parse(content, /(-?\d+)/g);
function go (prog) {
  let line = '';
  intcode(input,prog.split('').map(e => e.charCodeAt(0)), v => {
    if (v > 128) l(v)
    else if (v === 10) {
      l(line); line = '';
    } else {
      line += String.fromCharCode(v);
    }
  })
}
go(
`NOT A J
NOT C T
AND D T
OR T J
WALK
`);
go(
`OR D J
OR E T
OR H T
AND T J
NOT A T
NOT T T
AND B T
AND C T
NOT T T
AND T J
RUN
`);