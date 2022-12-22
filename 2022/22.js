#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('22.input.txt', 'utf8');

const [f, path] = content.split('\n\n');
const input = A.parse(path, /(L|R|\d+)/g);
function solve(part2) {
  let cnt = 0;
  const p = A.plane(' ');
  p.load(f);
  const c = p.cursor(0, 0, 2);
  while (c.get() === ' ') c.fw();
  const wrapH = [], wrapV = [];
  const wrapC = [[], [], [], []];
  const N = p.width / 3;
  for (let i = 0; i < N; i++) {
    wrapC[0][i] = [N, N + i, 1];
    wrapC[0][i + N] = [0, 3 * N + i, 1];
    wrapC[0][i + 2 * N] = [i, 4 * N - 1, 0];

    wrapC[1][i] = [2 * N - 1, 3 * N - i - 1, 3];
    wrapC[1][i + N] = [2 * N + i, N - 1, 0];
    wrapC[1][i + 2 * N] = [3 * N - 1, N - i - 1, 3];
    wrapC[1][i + 3 * N] = [N + i, 3 * N - 1, 0];

    wrapC[2][i] = [2 * N + i, 0, 2];
    wrapC[2][i + N] = [N - 1, 3 * N + i, 3];
    wrapC[2][i + 2 * N] = [2 * N - 1, N + i, 3];

    wrapC[3][i] = [0, 3 * N - i - 1, 1];
    wrapC[3][i + N] = [i, 2 * N, 2];
    wrapC[3][i + 2 * N] = [N, N - i - 1, 1];
    wrapC[3][i + 3 * N] = [N + i, 0, 2];
  }
  for (let i = 0; i < p.height; i++) {
    let j = 0;
    while ((p.get(j, i) == ' ') && j < p.width) j++;
    let k = p.width - 1;
    while ((p.get(k, i) == ' ') && k > 0) k--;
    wrapH[i] = k - j + 1;
  }
  for (let i = 0; i < p.width; i++) {
    let j = 0;
    while ((p.get(i, j) == ' ') && j < p.height) j++;
    let k = p.height - 1;
    while ((p.get(i, k) == ' ') && k > 0) k--;
    wrapV[i] = k - j + 1;
  }
  for (const a of input) {
    if (a == 'L') c.turnL();
    else if (a == 'R') c.turnR();
    else for (const s of A.seq(a)) {
      let fw = c.getFw();
      if (fw !== ' ') {
        if (fw == '.') c.fw(); else break;
      } else if (!part2) {
        let fwoffset = c.heading() % 4 ? 1 - wrapH[c.pos()[1]] : 1 - wrapV[c.pos()[0]];
        let fwwrap = c.getRel(0, fwoffset);
        if (fwwrap == '.') c.fw(fwoffset); else break;
      } else {
        let fwoffset = wrapC[c.heading() / 2][c.pos()[c.heading() % 4 ? 1 : 0]];
        if (p.get(fwoffset[0], fwoffset[1]) == '.') {
          c.setPos(fwoffset[0], fwoffset[1]);
          c.setH(fwoffset[2] * 2);
        } else break;
      }
    }
  }
  cnt += c.pos()[1] * 1000 + 1000;
  cnt += c.pos()[0] * 4 + 4;
  cnt += [3, 0, 1, 2][c.heading() / 2];
  return cnt;
}
l(solve());
l(solve(true));
