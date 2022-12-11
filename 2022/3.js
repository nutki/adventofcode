#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('3.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(part2) {
  let cnt = 0;
  for (const line of input) {
    let c1 = new Set(line.substring(0, line.length/2));
    let c2 = new Set(line.substring(line.length/2));
    let intersection = new Set(
      [...c1].filter(x => c2.has(x)));
    for (const x of intersection) {
      cnt+= x.charCodeAt(0)%32 + (x < 'a' ? 26 : 0);
    }
  }
  let cnt2 = 0;
  while(input.length) {
    let c1 = new Set(input.pop());    
    let c2 = new Set(input.pop());    
    let c3 = new Set(input.pop());    
    let c4 = new Set(
      [...c1].filter(x => c2.has(x)));
      let intersection = new Set(
        [...c3].filter(x => c4.has(x)));
        for (const x of intersection) {
          cnt2+= x.charCodeAt(0)%32 + (x < 'a' ? 26 : 0);
        }
      
  }
  return [cnt, cnt2];
}
l(solve());
//l(solve(true));
