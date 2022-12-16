#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('16.input.txt','utf8');

const input = A.parse(content, /Valve (..) has flow rate=(\d+); .*?([A-Z].*)/g);
function solve() {
  const g = A.graph();
  for (const [v1,,vc] of input) vc.split(', ').forEach(v2 => g.connect(v1, v2));
  const valves = input.filter(r => r[1]).map(r => r[0]);
  const flows = input.filter(r => r[1]).map(r => r[1]);
  const N = valves.length
  const d = ['AA',...valves].flatMap(v => {
    const dm = g.bfs(v).distanceMap;
    return valves.map(v2 => dm.get(v2) + 1);
  });
  const cache = new Int16Array((1<<N)*(N+1)*31);
  cache.fill(-1);
  function step(current, visited, timeleft) {
    const key = visited + ((current + 1 + timeleft * (N + 1)) << N);
    if (cache[key] >= 0) return cache[key];
    let best = 0;
    for (let i = 0; i < N; i++) if (!(visited & (1 << i))) {
      const t = timeleft - d[(current+1) * N + i];
      if (t > 0) {
        const c = step(i, visited | (1<<i), t) + t * flows[i];
        if (c > best) best = c;
      }
    }
    return cache[key] = best;
  } 
  const cnt1 = step(-1, 0, 30);
  const splits = A.seq(1<<N).map(i => step(-1, i, 26));
  const cnt2 = A.seq(1<<N).map(i => splits[i] + splits[(1<<N)-1-i]).max();
  return [cnt1, cnt2];
}
l(solve());
