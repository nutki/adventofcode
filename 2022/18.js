#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('18.input.txt', 'utf8');

const input = A.parse(content, /(.+)/g);
function solve() {
  let cnt1 = 0, cnt2 = 0;
  const nx = (x, y, z) => [[x - 1, y, z], [x + 1, y, z], [x, y + 1, z], [x, y - 1, z], [x, y, z + 1], [x, y, z - 1]];
  const s = new Set(input);
  const d = A.bfs([-1, -1, -1], v =>
    nx(...v).filter(([x, y, z]) => x >= -1 && y >= -1 && z >= -1 && x <= 20 && y <= 20 && z <= 20 && !s.has([x, y, z].join()))
  ).distanceMap;
  for (const line of input) {
    const n = nx(...A.parse(line, /(\d+)/g));
    cnt1 += n.filter(x => !s.has(x.join())).length;
    cnt2 += n.filter(x => d.has(x.join())).length;
  }
  return [cnt1, cnt2];
}
l(solve());
