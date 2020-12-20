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
const rev = (n) => A.seq(10).sum((i) => (n & (1 << i) ? 1 << (9 - i) : 0));
const flipX = ([l, t, r, b]) => [r, rev(t), l, rev(b)];
const rotR = ([l, t, r, b]) => [b, rev(l), t, rev(r)];
function monsterAt(p, x, y) {
  for (const [xm, ym] of mons) {
    if (p.get(x + xm, y + ym) !== "#") return false;
  }
  return true;
}
function solve() {
  const n = Math.sqrt(input.length);
  const m = input.length;
  let el = [],
    eli = [],
    elp = [];
  for (const [x, p] of input) {
    let b = [0, 0, 0, 0];
    for (let i = 0; i < 10; i++) {
      b[0] += (p.get(0, i) === "#") << i;
      b[1] += (p.get(i, 0) === "#") << i;
      b[2] += (p.get(9, i) === "#") << i;
      b[3] += (p.get(i, 9) === "#") << i;
    }
    const all = [];
    for (let i of A.seq(4)) {
      all.push(b, flipX(b));
      b = rotR(b);
    }
    el[x] = all;
    elp[x] = p;
    eli.push(x);
  }
  const used = [];
  const map = [];
  function move(pos) {
    if (pos === m) {
      const cor = [map[0][0], map[n - 1][0], map[m - 1][0], map[m - n][0]];
      let cnt = 0;
      let found;
      const p = A.plane();
      for (let y = 0; y < n * 8; y++) {
        for (let x = 0; x < n * 8; x++) {
          let pos = (y >> 3) * n + (x >> 3);
          let pi = elp[map[pos][0]];
          let oi = map[pos][1];
          let xi = (x & 7) + 1,
            yi = (y & 7) + 1;
          if (oi & 1) xi = 9 - xi;
          for (let k = 0; k < oi >> 1; k++) [xi, yi] = [yi, 9 - xi];
          const z = pi.get(xi, yi);
          if (z === "#") cnt++;
          p.set(x, y, z);
        }
      }
      for (let y = 0; y < n * 8 - mons.maxY() - 1; y++)
        for (let x = 0; x < n * 8 - mons.maxX() - 1; x++)
          if (monsterAt(p, x, y)) (found = true), (cnt -= 15);
      if (found) l(cor.prod(), cnt);
      return;
    }
    const x = pos % n;
    const y = Math.floor(pos / n);
    const top = y > 0 ? el[map[pos - n][0]][map[pos - n][1]][3] : 0;
    const left = x > 0 ? el[map[pos - 1][0]][map[pos - 1][1]][2] : 0;
    const matches = [];
    for (const i of eli) {
      const e = el[i];
      if (used[i]) continue;
      for (let o = 0; o < 8; o++) {
        if (x > 0 && e[o][0] !== left) continue;
        if (y > 0 && e[o][1] !== top) continue;
        matches.push([i, o]);
      }
    }
    for (const [e, o] of matches) {
      used[e] = true;
      map[pos] = [e, o];
      move(pos + 1);
      used[e] = false;
    }
  }
  move(0);
}
solve();
