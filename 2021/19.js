#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('19.input.txt','utf8');

const input = content.split('\n\n').map(s => A.parse(s, /(-?\d+),(-?\d+),(-?\d+)/g));
const transf = A.seq(24).map((i) => {
  const o = [
    (x,y,z) => [x,y,z], (x,y,z) => [x,z,y], (x,y,z) => [y,z,x],
    (x,y,z) => [y,x,z], (x,y,z) => [z,x,y], (x,y,z) => [z,y,x],
  ][i/4|0];
  const s = [
    (x,y,z) => [x,y,z], (x,y,z) => [x,-y,-z], (x,y,z) => [-x,y,-z], (x,y,z) => [-x,-y,z],
    (x,y,z) => [x,y,-z], (x,y,z) => [x,-y,z], (x,y,z) => [-x,y,z], (x,y,z) => [-x,-y,-z],
  ][i%8];
  return (x,y,z) => o(...s(x,y,z))
});
const dist = ([[x1,y1,z1],[x2,y2,z2]])=>A.abs(x1-x2)+A.abs(y1-y2)+A.abs(z1-z2);
function solve() {
  const m = new Map(input.map(a => [a, Array.from(A.choose(a,2)).map(dist).freq()]));
  const q = [input[0]], scan = [[0,0,0]], allSet = new Set();
  for (let qp = 0; qp < q.length; ) {
    const base = q[qp++], baseSet = new Set();
    for (const x of base) baseSet.add(x.join()), allSet.add(x.join());
    const inSet = x => baseSet.has(x.join());
    for (const line of input) if (!q.includes(line)) {
      const p1f = m.get(base), p2f = m.get(line);
      if (Object.keys(p1f).sum(a => A.min(p1f[a], p2f[a] | 0)) < 66) continue;
      l1: for(const x of base) for(const y of line) for (const rt of transf) {
        const yr = rt(...y), t = x.map((v,i) => v - yr[i]);
        const tt = (x,y,z) => [x+t[0],y+t[1],z+t[2]];
        if (line.sum(z => inSet(tt(...rt(...z))))>=12) {
          for (let i = 0; i < line.length; i++) line[i] = tt(...rt(...line[i]));
          scan.push(tt(...rt(0,0,0)))
          q.push(line);
          break l1;
        }
      }
    }
  }
  return [allSet.size, Array.from(A.choose(scan,2)).max(dist)];
}
l(solve());
