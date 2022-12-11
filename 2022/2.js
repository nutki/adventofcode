#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('2.input.txt','utf8');

const input = A.parse(content, /(.) (.)/g).map(v => v.join(''));
function solve(part2) {
  return input.sum(line =>
    (part2 ? ({
      AX: 3,
      AY: 4,
      AZ: 8,
      BX: 1,
      BY: 5,
      BZ: 9,
      CX: 2,
      CY: 6,
      CZ: 7,
    }) : ({
      AX: 4,
      AY: 8,
      AZ: 3,
      BX: 1,
      BY: 5,
      BZ: 9,
      CX: 7,
      CY: 2,
      CZ: 6,
    }))[line]
  );
}
l(solve());
l(solve(true));
