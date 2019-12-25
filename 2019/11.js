#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('11.input.txt','utf8');
const intcode = require('./intcode');

const input = A.parse(content, /(-?\d+)/g);
function solve(partTwo) {
  let p = A.plane();
  let cur = p.cursor();
  if (partTwo) cur.set('#');
  intcode(input, () => cur.get() === '#' ? 1 : 0, (c, d) => {
    cur.set(c ? '#' : '.');
    cur.turnR(d ? 2 : -2);
    cur.fw();
  });
  return p;
}
l(Array.from(solve(false)).length);
solve(true).print()
