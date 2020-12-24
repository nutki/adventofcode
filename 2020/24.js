#!/usr/bin/env node
const A = require("../advent");
const l = console.log;
const content = require("fs").readFileSync("24.input.txt", "utf8");

const input = A.parse(content, /(.+)/g).map((a) => A.parse(a, /([ew]|..)/g));
function solve() {
  let p = A.plane(0);
  for (const line of input) {
    let s = { e: 0, w: 0, ne: 0, sw: 0, nw: 0, se: 0 };
    for (const d of line) s[d]++;
    let x = s.e - s.w - s.nw + s.se;
    let y = s.ne - s.sw + s.nw - s.se;
    p.set(x, y, 1 - p.get(x, y));
  }
  l([...p].length);
  for (const i of A.seq(100)) {
    let np = A.plane(0);
    for (let y = p.minY() - 1; y <= p.maxY() + 1; y++) {
      for (let x = p.minX() - 1; x <= p.maxX() + 1; x++) {
        let sum =
          p.get(x, y - 1) +
          p.get(x, y + 1) +
          p.get(x + 1, y) +
          p.get(x - 1, y) +
          p.get(x + 1, y - 1) +
          p.get(x - 1, y + 1);
        let cur = p.get(x, y);
        if (sum === 2 || (cur && sum === 1)) np.set(x, y, 1);
      }
    }
    p = np;
  }
  return [...p].length;
}
l(solve());
