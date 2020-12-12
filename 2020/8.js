#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('8.input.txt','utf8');

const prg = A.parse(content, /(\w+) \+?(\S+)/g);

function run(i) {
  let pc = 0, acc = 0, exec = [];
  while(!exec[pc] && prg[pc]) {
    const [inst, arg] = prg[pc];
    exec[pc] = true;
    if (inst === 'acc') acc += arg;
    pc += inst === (pc === i ? 'nop' : 'jmp') ? arg : 1;
  }
  return [!exec[pc], acc];
}
l(run()[1]);
l(A.seq(prg.length).map(run).find(e => e[0])[1]);
