#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('4.input.txt','utf8');

const input = content.split('\n\n');
const nums = A.parse(input.shift(), /(\d+)/g);
const t = [];
for (let i = 0; i < nums.length; i++) {
  t[nums[i]] = i;
}
function solve(part2) {
  let cnt = A.best(part2 ? ([x]) => x : ([x]) => -x);
  for (const line of input) {
    const board = A.parse(line, /(\d+)/g);
    const f = A.best(x => -x);
    for (let i = 0; i < 5; i++) {
      const col = [], row = [];
      for (let j = 0; j < 5; j++) {
        col.push(board[i * 5 + j]);
        row.push(board[j * 5 + i]);
      }
      f.add(col.map(x => t[x]).max());
      f.add(row.map(x => t[x]).max());
    }
    const t0 = f.get();
    const score = board.filter(v => t[v] > t0).sum();
    cnt.add([t0, score * nums[t0]]);
  }
  return cnt.get()[1];
}
l(solve());
l(solve(true));
