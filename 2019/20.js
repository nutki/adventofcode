#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('20.input.txt','utf8');
const p = A.plane();
p.load(content);
const portals = {}, portalsEnt = {}
for (const [x, y, e] of p) {
  if (e >= 'A' && e <= 'Z') {
    const er = p.get(x+1, y)
    const el = p.get(x-1, y)
    const eu = p.get(x, y-1)
    const ed = p.get(x, y+1)
    let ent, epos;
    if (er === '.') {
      ent = el+e; epos = [x+1,y]
    }
    if (el === '.') {
      ent = e+er; epos = [x-1,y]
    }
    if (ed === '.') {
      ent = eu+e; epos = [x,y+1]
    }
    if (eu === '.') {
      ent = e+ed; epos = [x,y-1];
    }
    if (ent) {
      const z = x === 1 || y === 1 || x === p.maxX() - 1 || y === p.maxY() - 1
          ? 1 : -1;
      epos.push(z);
      const pent = portals[ent];
      const pentent = portalsEnt[ent];
      if (pent) {
        p.set(x,y,pent);
        p.set(pentent[0],pentent[1], epos);
      } else {
        portals[ent] = epos;
        portalsEnt[ent] = [x, y, z];
      }
    }
  }
}
function solve(part) {
  A.bfs([portals.AA[0], portals.AA[1], 0],([x,y,z],d) => {
    if (z < 0 || p.get(x,y) !== '.') return [];
    if (x === portals.ZZ[0] && y === portals.ZZ[1]) {
      if (z !== 0) return [];
      l(d);
      return;
    }
    return [[x+1,y],[x-1,y],[x,y+1],[x,y-1]].map(([x,y]) => {
      const port = p.get(x,y);
      if (port instanceof Array) {
        return [port[0],port[1],z+part*port[2]];
      }
      return [x,y,z];
    });
  });  
}
solve(0);
solve(1);

