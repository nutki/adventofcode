#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('15.input.txt','utf8');
const intcode = require('./intcode');

const input = A.parse(content, /(-?\d+)/g);
function go(exe, cmd) {
  let res;
  let c = exe.clone([cmd], v => res = v);
  return [c, res];
}
function bfs(init) {
  let r;
  A.bfs([0,0,init,1], ([x,y,exe, res], d) => {
    if (res === 0) return [];
    r = [exe, d];
    if (res === 2 && d) return;
    return [[x+1,y],[x-1,y],[x,y+1],[x,y-1]].map(([x,y], i) => [x,y,...go(exe, i+1)])
  },([x,y]) => x+','+y);
  return r;
}
let s1 = bfs(intcode(input));
l(s1[1]);
let s2 = bfs(s1[0]);
l(s2[1]);
