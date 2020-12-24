#!/usr/bin/env node
const A = require("../advent");
const l = console.log;
const content = require("fs").readFileSync("23.input.txt", "utf8");

const n = A.parse(content, /(\d)/g);
function solve(part2) {
  const next = [];
  while (part2 && n.length < 1000000) n.push(n.length + 1);
  for (let i = 0; i < n.length; i++) {
    next[n[i]] = n[(i + 1) % n.length];
  }
  let current = n[0];
  for (let i = 0; i < (part2 ? 10000000 : 100); i++) {
    let pick = [next[current], next[next[current]], next[next[next[current]]]];
    let dest = current;
    do dest = dest === 1 ? n.length : dest - 1; while (pick.includes(dest));
    next[current] = next[pick[2]];
    next[pick[2]] = next[dest];
    next[dest] = pick[0];
    current = next[current];
  }
  if (part2) return next[1] * next[next[1]];
  let t = 0;
  for (let z = next[1]; z !== 1; z = next[z]) t = t * 10 + z;
  return t;
}
l(solve());
l(solve(true));
