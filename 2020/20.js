#!/usr/bin/env node
const A = require("../advent");
const l = console.log;
const content = require("fs").readFileSync("20.input.txt", "utf8");

const mons = A.plane(
  " ",
  `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   
 `
);
const input = content
  .trim()
  .split("\n\n")
  .map((p) => A.parse(p, /Tile (.+):\n(.*)/gs))
  .map(([[i, c]]) => [i, A.plane(".", c)]);
function monsterAt(p, x, y) {
  for (const [xm, ym] of mons) {
    if (p.get(x + xm, y + ym) !== "#") return false;
  }
  return true;
}
function matchTop(p1, p2) {
  if (!p1._bottom) p1._bottom = p1.getLineStr(0, p1.maxY());
  if (!p2._top) p2._top = p2.getLineStr(0, 0);
  return p1._bottom === p2._top;
}
function matchLeft(p1, p2) {
  if (!p1._right) p1._right = p1.getLineStr(p1.maxX(), 0, 0, 1);
  if (!p2._left) p2._left = p2.getLineStr(0, 0, 0, 1);
  return p1._right === p2._left;
}
function solve() {
  const m = input.length;
  const n = Math.sqrt(m);
  let els = input
    .map(([x, p]) =>
      A.seq(8).map((i) => {
        let pr = p.rotate(i >> 1);
        if (i & 1) pr = pr.flipX();
        pr._id = x;
        return pr;
      })
    )
    .flatten();
  const used = [];
  const map = [];
  function move(pos) {
    if (pos === m) {
      const cor = [map[0], map[n - 1], map[m - 1], map[m - n]].prod(
        (p) => p._id
      );
      let cnt = 0;
      let mcnt = 0;
      const p = A.plane();
      for (let y = 0; y < n * 8; y++) {
        for (let x = 0; x < n * 8; x++) {
          const z = map[(y >> 3) * n + (x >> 3)].get((x & 7) + 1, (y & 7) + 1);
          if (z === "#") cnt++;
          p.set(x, y, z);
        }
      }
      for (let y = 0; y < n * 8 - mons.maxY() - 1; y++)
        for (let x = 0; x < n * 8 - mons.maxX() - 1; x++)
          if (monsterAt(p, x, y)) mcnt++;
      if (mcnt) l(cor, cnt - mcnt * 15);
      return;
    }
    const [y, x] = A.div(pos, n);
    for (const el of els) {
      if (used[el._id]) continue;
      if (y > 0 && !matchTop(map[pos - n], el)) continue;
      if (x > 0 && !matchLeft(map[pos - 1], el)) continue;
      used[el._id] = true;
      map[pos] = el;
      move(pos + 1);
      used[el._id] = false;
    }
  }
  move(0);
}
solve();
