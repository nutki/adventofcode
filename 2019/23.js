#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('23.input.txt','utf8');
const intcode = require('./intcode_em');

const input = A.parse(content, /(-?\d+)/g);
function go () {
  let nat, lastNatY;
  const runs = A.seq(50).map(i => intcode(input, [i], (a, x, y) => {
    if (a === 255) {
      if (!nat) l(y);
      nat = [x,y];
    } else {
      runs[a].add(x,y);
    }
  }));
  runs.forEach(i => i.add(-1));
  while (true) {
    if(nat[1] == lastNatY) {
      l(nat[1]);
      break;
    }
    lastNatY = nat[1];
    runs[0].add(...nat);
  }
}
go();
