#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('21.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(code, reverse = false) {
  let a = code.split('');
  let ops = input.slice(0);
  if (reverse) ops.reverse();
  for (const line of ops) {
    A.caseParse(line,
      [/swap letter (.) with letter (.)/, ([x,y]) => {
        let px = a.indexOf(x)
        let py = a.indexOf(y);
        [a[px],a[py]] = [y,x];
      }],
      [/move position (\d+) to position (\d+)/, ([x,y]) => {
        if (reverse) [x, y] = [y, x];
        let [v] = a.splice(x, 1);
        a.splice(y,0,v);
      }],
      [/reverse positions (\d+) through (\d+)/, ([x,y]) => {
        let v = a.splice(x, y - x + 1);
        v.reverse();
        a.splice(x, 0, ...v);
      }],
      [/rotate based on position of letter (.)/, (x) => {
        let px = a.indexOf(x);
        let r = reverse ? [-1,-1,-6,-2,-7,-3,0,-4] : [1,2,3,4,6,7,8,9];
        a = A.rotR(a, r[px])
      }],
      [/swap position (\d+) with position (\d+)/, ([x,y]) => {
        [a[x],a[y]] = [a[y],a[x]];
      }],
      [/rotate left (\d+) step/, (x) => {
        a = A.rotL(a, reverse ? -x : x)
      }],
      [/rotate right (\d+) step/, (x) => {
        a = A.rotR(a, reverse ? -x : x)
      }],
      [/(.+)/, (a) => l(a)]);
  }
  return a.join('');
}
l(solve('abcdefgh'))
l(solve('cbeghdaf', true))
l(solve('fbgdceah', true))
l(solve('bacdefgh'))
l(A.rotR([0,1,2,3,4,5], 1))