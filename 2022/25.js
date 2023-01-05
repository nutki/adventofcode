#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('25.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve() {
  let cnt = 0, res = '';
  const map = {'0':0,'1':1,'2':2,'-':-1,'=':-2}
  for (const line of input) {
    const v = line.toString().split('');
    let r = 0;
    while(v.length) r = r*5 + map[v.shift()];
    cnt+=r;
  }
  while(cnt) {
    const d = [0,1,2,'=','-'][cnt%5];
    res = d+res;
    cnt=(cnt-map[d])/5;
  }
  return res;
}
l(solve());
