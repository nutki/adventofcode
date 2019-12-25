#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('15.input.txt','utf8');
const intcode = require('./intcode');

const input = A.parse(content, /(-?\d+)/g);
function go(path) {
  let r;
  intcode(input, path.split('').map(c => parseInt(c.charAt(0))), v => r = v)
  return r;
}
function bfs(init) {
  let r;
  A.bfs([0,0,init], ([x,y,path], d) => {
    let res = go(path);
    if (res === 0) return [];
    r = [path, d];
    if (res === 2 && d) return;
    return [[x+1,y],[x-1,y],[x,y+1],[x,y-1]].map(([x,y], i) => [x,y,path+(i+1)])
  },([x,y]) => x+','+y);
  return r;
}
let s1 = bfs("");
l(s1[1]);
let s2 = bfs(s1[0]);
l(s2[1]);
