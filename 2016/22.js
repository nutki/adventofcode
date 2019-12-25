#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('22.input.txt','utf8');

const input = A.parse(content, /x(\d+)-y(\d+) +(\d+)T +(\d+)T/g);
const p = A.plane()
const c = p.cursor()
function solve(input) {
  let cnt = 0, cnt1 = 0;
  function cm(m) {
    let t = c.pos(); c.move(m); p.set(...t, c.get()); c.set('_');
    cnt1++;
  }
  for (const line of input) {
    let rec = false;
    for (const lineB of input) {
      if (line === lineB) continue;
      if (line[3] === 0) continue;
      if (line[3] > lineB[2] - lineB[3]) continue;
      cnt++
      rec = true;
    }
    if (line[3] === 0) c.setX(line[0]), c.setY(line[1]);
    let t = line[3] === 0 ? '_' : rec ? '.' : '#';
    p.set(line[0],line[1],t);
  }
  p.set(33,0,'G')
//  p.print()
  for(const i of A.seq(16)) cm('L')
  for(const i of A.seq(25)) cm('U')
  for(const i of A.seq(29)) cm('R')
  for(const i of A.seq(32)) {
    cm('D')
    cm('L')
    cm('L')
    cm('U')
    cm('R')
  }
  p.print();
  return [cnt, cnt1];
}
l(solve(input))
