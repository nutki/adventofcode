#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('17.input.txt','utf8');

const input = A.parse(content, /([<>])/g);
function solve(part2) {
  let cnt = 0;
  const p = A.plane('.');
  for (const a of A.seq(7)) for (const b of A.seq(20)) p.set(a,-b,'.');
  for (const a of A.seq(7)) p.set(a,1,'#');
  let min = 1;
  for (let i = 0; i < 2022; i++) {
    const shape = [
      [[2,0],[3,0],[4,0],[5,0]],
      [[3,-2],[2,-1],[3,-1],[4,-1],[3,0]],
      [[4,-2],[4,-1],[2,0],[3,0],[4,0]],
      [[2,-3],[2,-2],[2,-1],[2,0]],
      [[2,-1],[3,-1],[2,0],[3,0]],
    ][i%5];
    const rock = shape.map(([x,y]) => p.cursor(x, y - 4 + min, 4));
    for (let j = 0; j < 100; j++) {
//    p.print();
    const wind = input[cnt] == '<' ? -1 : 1;
    cnt++; cnt %= input.length;
    if (rock.every(c => (c.pos()[0] + wind) >= 0 && (c.pos()[0] + wind) <= 6 && c.getRel(-wind,0) != '#')) {
      rock.forEach(c => c.move('R',wind));
    }
//    p.print();
    if (rock.every(c => c.getFw() != '#')) {
      rock.forEach(c => c.fw());
    } else break;
    }
    rock.forEach(c => c.set('#'));
    rock.forEach(c => min = c.pos()[1] < min ? c.pos()[1] : min);
//    p.print();
  }


  const well = [255];
  let h = 0;
  function pr(shape,sh) {
    l('---------')
    for (let y = well.length+3; y >= 0 && y >= well.length - 20; y--) {
      let f = y < well.length ? well[y] : 1;
      if (y >= sh && y <= sh+3) f |= (shape >> (8*(y-sh)))& 0xff;
      const s = '#' + f.toString(2).replaceAll('0','.').replaceAll('1','#').padStart(8,'.');
      l(s, y);
    }
  }
  cnt = 0;
  let prev = 0, prevj = 0, solplus = 0;
  function getback(sh) {
    const w = v => v < well.length ? well[v] : 1;
    return w(sh) + (w(sh+1)<<8) + (w(sh+2)<<16) + (w(sh+3)<<24); 
  }
  const minsh = A.best();
  const MAX = 1000000000000;
  for (let j = 0; j < MAX; j++) {
    if (cnt == 8 && !(j%5)) {
      l("!",j-prevj,well.length - prev);
      prev = well.length;
      prevj = j;
      while (j + 1725 < MAX) j += 1725, solplus += 2630;//3082813
    }
  let shape = [0b00111100,0b000100000011100000010000,0b000010000000100000111000, 0b00100000001000000010000000100000, 0b0011000000110000][j%5];
  let sh = well.length+3;
//  pr(shape, sh);
  for (let i = 0;; i++) {
    const back = getback(sh); 
//    l(input[cnt]);
  const nshape = input[cnt] == '<' ? shape << 1 : shape >>> 1; 
  cnt++; cnt %= input.length;
    shape = nshape & back ? shape : nshape;
//    pr(shape, sh);
//    l('v', back.toString(2));
    const backdown = getback(sh-1);
    if (shape & backdown) {
      break;
    } else sh--;
//    pr(shape, sh);
}
minsh.add(well.length - sh);
  while(shape) {
//    l(sh, shape);
    if (well.length <= sh) well[sh] = 1;
    well[sh] |= shape & 0xff;
    shape >>>= 8;
    sh++;
  }
  }
//  pr(0,0);
  l(well.length-1, well.length-1+solplus, minsh.get());
  return 1-min;
}
l(solve());
//l(solve(true));
