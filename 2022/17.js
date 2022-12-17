#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('17.input.txt', 'utf8');

const input = A.parse(content, /([<>])/g);
function solve(part2) {
  const MAX = part2 ? 1000000000000 : 2022;
  let cnt = 0;
  const well = [255];
  function pr(shape, sh) {
    l('---------')
    for (let y = well.length + 3; y >= 0 && y >= well.length - 20; y--) {
      let f = y < well.length ? well[y] : 1;
      if (y >= sh && y <= sh + 3) f |= (shape >> (8 * (y - sh))) & 0xff;
      const s = '#' + f.toString(2).replaceAll('0', '.').replaceAll('1', '#').padStart(8, '.');
      l(s, y);
    }
  }
  let prev = 0, prevj = 0, solplus = 0;
  function getback(sh) {
    const w = v => v < well.length ? well[v] : 1;
    return w(sh) + (w(sh + 1) << 8) + (w(sh + 2) << 16) + (w(sh + 3) << 24);
  }
  for (let j = 0; j < MAX; j++) {
    if (cnt == 8 && !(j % 5)) {
      //      l("!",j-prevj,well.length - prev);
      prev = well.length;
      prevj = j;
      while (j + 1725 < MAX) j += 1725, solplus += 2630;
    }
    let shape = [0b00111100, 0b000100000011100000010000, 0b000010000000100000111000, 0b00100000001000000010000000100000, 0b0011000000110000][j % 5];
    let sh = well.length + 3;
    for (let i = 0; ; i++, sh--) {
      const back = getback(sh);
      const nshape = input[cnt] == '<' ? shape << 1 : shape >>> 1;
      cnt++; cnt %= input.length;
      shape = nshape & back ? shape : nshape;
      const backdown = getback(sh - 1);
      if (shape & backdown) break;
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
