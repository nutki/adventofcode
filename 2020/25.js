#!/usr/bin/env node
const A = require("../advent");
const l = console.log;
const content = require("fs").readFileSync("25.input.txt", "utf8");

const [a, b] = A.parse(content, /(.+)/g);
function solve() {
  let v;
  let c = 0;
  for (v = 1; v !== a; c++) v = v * 7 % 20201227;
  for (v = 1; c--; ) v = v * b % 20201227;
  return v;
}
l(solve());
