#!/usr/bin/env node
const A = require("../advent");
const l = console.log;
const content = require("fs").readFileSync("25.input.txt", "utf8");

const [a, b] = A.parse(content, /(.+)/g);
function solve() {
  let v = 1;
  let c = 0;
  while (true) {
    if (v === a) break;
    v *= 7;
    v %= 20201227;
    c++;
  }
  v = 1;
  while (c) {
    v *= b;
    v %= 20201227;
    c--;
  }
  return v;
}
l(solve());
