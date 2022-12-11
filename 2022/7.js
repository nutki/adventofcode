#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('7.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve() {
  let dir = [];
  let sizes = new A.Map();
  for (const line of input) {
    A.caseParse(line, 
      [/^. cd (.+)/g, (a) => a === '..' ? dir.pop() : dir.push(a)],
      [/(\d+)/sg, (a) => {
        for (let i = 0; i < dir.length; i++) {
          sizes.inc(dir.slice(0,i+1).join('/'), a);
        }
      }],
    )
  }
  let all = A.sort(sizes.values())
  let req = sizes.get('/') - 4e7;
  return [all.filter(s => s <= 1e5).sum(), all.find(v => v >= req)];
}
l(solve());
