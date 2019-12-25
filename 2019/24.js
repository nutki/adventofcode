#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('24.input.txt','utf8');
let p = A.plane()
p.load(content);
function div(p) {
  let r = 0;
  for (const [i,j,c] of p) if (c==='#') r |= 1 << (i + j * 5);
  return r;
}
const get = (w,x,y) => w ? (w.get(x,y) === '#' ? 1 : 0) : 0;
function evolve(p) {
  const q = A.plane();
  for (const [i,j,c] of p) {
    const n = [[i-1,j],[i+1,j],[i,j+1],[i,j-1]].reduce((c, [x,y]) => c + get(p,x,y), 0)
    q.set(i,j, get(p,i,j)?(n===1?'#':'.'):(n===1||n===2?'#':'.'));
  }
  return q;
}
function solve1() {
  let a = {}
  let q = p;
  while(true) {
    const d = div(q);
    if (a[d]) return d;
    a[d] = true;
    q = evolve(q);
  }  
}
function evolve2(plist) {
  let qlist = [];
  let cnt = 0;
  for (let k = 0; k < plist.length + 2; k++) {
    const po = k > 1 ? plist[k-2] : undefined;
    const p = k > 0 ? plist[k-1] : undefined;
    const pi = plist[k];
    const q = A.plane();
    for (let j = 0; j < 5; j++) for (let i = 0; i < 5; i++) {
      if (i === 2 && j === 2) continue;
      let n = [[i-1,j],[i+1,j],[i,j+1],[i,j-1]].reduce((c, [x,y]) => c + get(p,x,y), 0);
      if (i === 0) n += get(po, 1, 2);
      if (i === 4) n += get(po, 3, 2);
      if (j === 0) n += get(po, 2, 1);
      if (j === 4) n += get(po, 2, 3);
      if (i === 1 && j === 2) n += [0,1,2,3,4].reduce((c, j) => c + get(pi, 0, j), 0);
      if (i === 3 && j === 2) n += [0,1,2,3,4].reduce((c, j) => c + get(pi, 4, j), 0);
      if (i === 2 && j === 1) n += [0,1,2,3,4].reduce((c, i) => c + get(pi, i, 0), 0);
      if (i === 2 && j === 3) n += [0,1,2,3,4].reduce((c, i) => c + get(pi, i, 4), 0);
      let v = get(p,i,j)?(n===1?'#':'.'):(n===1||n===2?'#':'.');
      cnt += v === '#' ? 1 : 0;
      q.set(i,j,v);
    }
    qlist.push(q);
  }
  return [qlist, cnt];
}
function solve2() {
  let plist = [p], cnt;
  for (const i of A.seq(200)) {
    [plist, cnt] = evolve2(plist);
  }
  return cnt;  
}
l(solve1());
l(solve2());

