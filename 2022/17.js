#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('17.input.txt', 'utf8');

const input = A.parse(content, /([<>])/g);
function solve(part2) {
  const MAX = part2 ? 1000000000000 : 2022;
  let cnt = 0;
  const well = [255];
  let solplus = 0;
  const last = [];
  function getback(sh) {
    const w = v => v < well.length ? well[v] : 1;
    return w(sh) + (w(sh + 1) << 8) + (w(sh + 2) << 16) + (w(sh + 3) << 24);
  }
  for (let j = 0; j < MAX; j++) {
    if (!(j % 5) && !solplus) {
      if (last[cnt]) {
        const dh = well.length - last[cnt][0], dj = j - last[cnt][1];
        let cmp = 0;
        for (let i = well.length - dh * 2; i < well.length - dh; i++) {
          if (i - dh >= 0 && well[i] == well[i - dh]) cmp++;
        }
        if (cmp === dh) {
          const div = Math.floor((MAX - j - 1) / dj);
          j += div * dj;
          solplus += div * dh;
        }
      }
      last[cnt] = [well.length, j];
    }
    let shape = [0b00111100, 0b000100000011100000010000, 0b000010000000100000111000, 0b00100000001000000010000000100000, 0b0011000000110000][j % 5];
    let sh = well.length + 3;
    for (let i = 0; ; i++, sh--) {
      const nshape = input[cnt] == '<' ? shape << 1 : shape >>> 1;
      cnt++; cnt %= input.length;
      shape = nshape & getback(sh) ? shape : nshape;
      if (shape & getback(sh - 1)) break;
    }
    while (shape) {
      if (well.length <= sh) well[sh] = 1;
      well[sh] |= shape & 0xff;
      shape >>>= 8;
      sh++;
    }
  }
  return well.length - 1 + solplus;
}
l(solve());
l(solve(true));
