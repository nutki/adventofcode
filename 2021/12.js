#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('12.input.txt','utf8');

const input = A.parse(content, /(.+)-(.+)/g);
function solve(part2) {
  let cnt = 0;
  const g = A.graph(false);
  for (const line of input) g.connect(...line);
  const visited = new Set();
  function dfs(n, extra) {
    let rem = true;
    if (n === 'end') { cnt++; return }
    if (visited.has(n)) {
      if (extra && n !== 'start') rem = extra = false; else return;
    }
    if (n.toLowerCase() === n) visited.add(n);
    for(const n2 of g.neighbors(n)) dfs(n2, extra);
    rem && visited.delete(n);
  }
  dfs('start', part2);
  return cnt;
}
l(solve());
l(solve(true));
