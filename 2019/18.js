#!/usr/bin/env node
const A = require('../advent');
const l = console.log
let content = require('fs').readFileSync('18.input.txt','utf8');

function solve1(input) {
  const p = A.plane();
  let poi = p.load(input);
  let [x, y] = poi['@'];
  let start = y * 100 + x;
  A.bfs(start, (e, d) => {
    let x = e % 100;
    let y = Math.floor(e / 100) % 100;
    let keys = Math.floor(e / 10000) | 0;
    let what = p.get(x,y);
    if (what === '#') return [];
    if (what >= 'A' && what <= 'Z') {
      let k = 1 << (what.charCodeAt(0) - 65);
      if (!(keys & k)) return [];
    } 
    if (what >= 'a' && what <= 'z') {
      let k = 1 << (what.charCodeAt(0) - 97);
      if (!(keys & k)) {
        e += k * 10000;
      }
      if ((keys|k) === 0x3FFFFFF) {
        l(d);
        return;
      }
    }
    return [e-1,e+1,e-100,e+100]
  });
}
solve1(content);
function solve2(input) {
  const p = A.plane();
  let poi = p.load(input);
  let ip = poi['@'];
  let target = 0;
  let quadrant = {};
  p.set(ip[0]+1,ip[1],'#');
  p.set(ip[0]-1,ip[1],'#');
  p.set(ip[0],ip[1]+1,'#');
  p.set(ip[0],ip[1]-1,'#');
  let start = ip[0] + ip[1] * 100;
  start = [start - 101, start - 99, start + 99, start + 101, 0, 0];
  for (const [i, j, c] of p) {
    if (c >= 'a' && c <= 'z') {
      target |= 1 << (c.charCodeAt(0)-97);
    }
    if (c >= 'A' && c <= 'Z') {
      quadrant[c.toLowerCase()]=(i<ip[0]?0:1)+(j<ip[1]?0:2);
    }
  }
  function ne(state, pos) {
    const res = [];
    for(const o of [1,-1,100,-100]) {
      let e = state[pos] + o;
      let x = e % 100;
      let y = Math.floor(e / 100);  
      let what = p.get(x,y);
      if (what >= 'A' && what <= 'Z') {
        let k = 1 << (what.charCodeAt(0) - 65);
        if (!(state[5] & k)) continue;
      } 
      if (what === '#') continue;
      const r = state.slice();
      r[4] = pos;
      r[pos] += o;
      res.push(r);
    }
    return res;
  }
  function neAll(state) {
    let res = [];
    for (let i = 0; i < 4; i++) {
      state[4] = i;
      res.push(...ne(state, i))
    }
    return res;
  }
  A.bfs(start, (state, d) => {
    let e = state[state[4]];
    let x = e % 100;
    let y = Math.floor(e / 100);
    let what = p.get(x,y);
    if (what >= 'a' && what <= 'z') {
      let k = 1 << (what.charCodeAt(0) - 97);
      if (!(state[5] & k)) {
        state[5] |= k;
        if (state[5] === target) {
          l(d);
          return;
        }
        if (quadrant[what] !== undefined)
          return ne(state, quadrant[what]).concat(ne(state,state[4]));
      }
    }
    return d ? ne(state, state[4]) : neAll(state);
  })
}
solve2(content);
