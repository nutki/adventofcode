#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('12.input.txt','utf8');

const p = A.plane(), { E } = p.load(content);
function h(c) {
  if (!c) return 255;
  if (c == 'S') return 0;
  if (c == 'E') return 25;
  return c.charCodeAt(0) - 'a'.charCodeAt(0);
}
function solve(part2) {
  return A.bfs(E, cur => {
    const cv = p.get(...cur);
    if (cv == 'S' || (cv == 'a' && part2)) return;
    return A.neighbor4(...cur).filter(c => h(cv) - h(p.get(...c)) <= 1);
  }).distance;
}
l(solve());
l(solve(true));
