#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('18.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(input) {
  let cnt2 = 0, cnt1;
  const cpu0 = { m: {}, pc: 0, q: [], ready: 1 };
  const cpu1 = { m: {}, pc: 0, q: [], ready: 1 };
  const cpus = [cpu0, cpu1];
  for (let i = 0; i < 26; i++) {
    cpu0.m[String.fromCharCode(i+97)] = 0;
    cpu1.m[String.fromCharCode(i+97)] = 0;
  }
  cpu1.m.p = 1;
  let pc = 0;
  let m = cpu0.m;
  let q = cpu0.q;
  let ready = 1;
  let current = 0;
  const swap = () => {
    cpus[current].pc = pc;
    cpus[current].ready = ready;
    current = 1 - current;
    m = cpus[current].m;
    pc = cpus[current].pc;
    q = cpus[current].q;
    ready = cpus[current].ready;
  }
  const get = x => typeof x === 'string' ? m[x] : x;
  while (pc >= 0 && pc < input.length) {
    A.caseParse(input[pc],
      [/set (.) (.+)/, ([a, b]) => m[a] = get(b)],
      [/jgz (.) (.+)/, ([a, b]) => get(a) > 0 && (pc += get(b) - 1)],
      [/snd (.)/, a => {
        cpus[1-current].q.push(get(a));
        cpus[1-current].ready = 1;
        if (current) cnt2++;
      }],
      [/rcv (.)/, a => {
        if (q.length) m[a] = q.shift(); else ready = 0;
      }],
      [/mul (.) (.+)/, ([a, b]) => m[a] *= get(b)],
      [/mod (.) (.+)/, ([a, b]) => m[a] %= get(b)],
      [/add (.) (.+)/, ([a, b]) => m[a] += get(b)],
    );
    if (!ready) {
      swap();
      if (cnt1 === undefined) cnt1 = q[q.length-1];
//    l("Switching to ", current, "at", pc, input[pc], cnt2, q.length);
      if (!ready) break;
    } else {
      pc++;
    }
  }
  return [cnt1, cnt2];
}
l(solve(input))
