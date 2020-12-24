#!/usr/bin/env node
const A = require("../advent");
const l = console.log;
const content = require("fs").readFileSync("24.input.txt", "utf8");

const input = A.parse(content, /(.+)/g).map((a) => A.parse(a, /([ew]|..)/g));
function solve() {
  let p = A.plane(0);
  for (const line of input) {
    let x = 0,
      y = 0;
    for (const d of line) {
      ({
        e: () => x++,
        w: () => x--,
        ne: () => y++,
        sw: () => y--,
        nw: () => { y++; x-- },
        se: () => { y--; x++ },
      })[d]();
    }
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
