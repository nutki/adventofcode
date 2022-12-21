#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('21.input.txt','utf8');

const input = A.parse(content, /(.+): (.*)/g);
function solve() {
  const g = A.graph();
  const oo = {}, val = {};
  for (const [r, op] of input) {
    if (typeof op !== 'number') {
      const [a1, , a2] = oo[r] = op.split(' ');
      g.connect(r,a1);
      g.connect(r,a2);
    } else val[r] = op;
  }
  const l1 = A.sort(g.bfs('root').distanceMap.entries(), x => -x[1]);
  const l2 = g.bfsRev('humn').distanceMap;
  for (const [n] of l1) if (!(n in val)){
    const [a1, o, a2] = oo[n], v1 = val[a1], v2 = val[a2];
    val[n] = o == '+' ? v1 + v2 : o == '-' ? v1 - v2 : o == '*' ? v1 * v2 : v1 / v2;
  }
  const step = (n, v) => {
    if (n === 'humn') return v;
    const [a1, o, a2] = oo[n], v1 = val[a1], v2 = val[a2];
    if (l2.has(a1)) {
      return step(a1, o == '+' ? v - v2 : o == '-' ? v + v2 : o == '*' ? v / v2 : v * v2);
    } else {
      return step(a2, o == '+' ? v - v1 : o == '-' ? v1 - v : o == '*' ? v / v1 : v1 / v);
    }
  }
  oo.root[1] = '-';
  return [val.root, step('root', 0)];
}
l(solve());
