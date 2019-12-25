#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('25.input.txt','utf8');

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
let prog = `south
take mutex
east
take mug
east
take polygon
east
east
east
take pointer
south
west
east
north
west
north
south
west
west
north
take loom
north
take hypercube
south
south
west
west
south
take manifold
west
west
take klein bottle
east
south
north
east
north
north
west
east
south
east
east
east
east
east
south
drop loom
drop pointer
drop manifold
drop polygon
west
west
`;

let inv = ['drop klein bottle',
'drop loom',
'drop mutex',
'drop pointer',
'drop hypercube',
'drop mug',
'drop manifold'];
// for (i = 74; i < 75; i++) {
//   let p = inv.filter((e, j) => i & (1 << j))
//   l(p);
//   go(prog + p.join("\n") + "\nwest\nwest\n")
// }
go(prog);
