#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('18.input.txt', 'utf8');

const input = A.parse(content, /(.+)/g);
function solve() {
  let c = 0;
  const s = new Set(input);
  A.bfs([-1, -1, -1], v => A.neighbor3d6(...v).filter((x => x.every(x => x >= -1 && x <= 20) && !(s.has(x.join()) && ++c))));
  return [ input.sum(l => A.neighbor3d6(...A.parse(l, /(\d+)/g)).filter(x => !s.has(x.join())).length), c];
}
l(solve());
