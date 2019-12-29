#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('12.input.txt','utf8');

const input = A.parse(content, /=(-?\d+).*?=(-?\d+).*?=(-?\d+)/g);
for (const m1 of input) m1.push(0, 0, 0);
let cyclesCount = 0;
const cycleStart = [], cycles = [];
for(let cnt = 0; cnt < 1000 || cyclesCount < 3; cnt++) {
  for (let i = 0; i < 3; i++) if (cycles[i] === undefined) {
    let ca = [];
    for (const m1 of input) {
      ca.push(m1[0+i], m1[3+i]);
    }
    let code = ca.join(',')
    if (cycleStart[i] === code) {
      cyclesCount++;
      cycles[i] = cnt;
    }
    if (!cnt) cycleStart[i] = code;
  }
  for (const m1 of input) {
    for (const m2 of input) {
      for (let i = 0; i < 3; i++) {
        if (m1[i] < m2[i]) m1[i+3]++;
        if (m1[i] > m2[i]) m1[i+3]--;
      }
    }
  }
  for (const m1 of input) {
    for (let i = 0; i < 3; i++) {
      m1[i] += m1[i + 3];
    }
  }
  if (cnt === 999) {
    let res = 0;
    for (const m1 of input) {
      let e1 = 0, e2 = 0;
      for (let i = 0; i < 3; i++) {
        e1 += A.abs(m1[i]);
        e2 += A.abs(m1[i+3]);
     }
     res += e1*e2;
    }
    l(res);
  }
}
l(A.lcm(...cycles))
