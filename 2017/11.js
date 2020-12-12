#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('11.input.txt','utf8');

const input = A.parse(content, /(\w+)/g);
function hexdist(n, nw, ne) {
  if (nw > 0 && ne > 0) {
    const m = A.min(nw, ne);
    nw -= m; ne -= m; n += m;
  }
  if (nw < 0 && ne < 0) {
    const m = A.max(nw, ne);
    nw -= m; ne -= m; n += m;
  }
  const x = A.abs(nw) + A.abs(ne);
  const maxy = -A.min(nw, ne);
  const miny = -A.max(nw, ne);
  if (n > maxy) return A.abs(n) + A.abs(miny);
  if (n < miny) return A.abs(n) + A.abs(maxy);
  const y = A.abs(n);
  return x;
}
function hexdist2(n, nw, ne) {
  n += nw;
  ne -= nw;
  return (ne > 0) == (n > 0) ? A.abs(ne) + A.abs(n) : A.max(A.abs(ne), A.abs(n));
}
function solve(input) {
  let b = A.best(c => c);
  let [n, ne, nw] = [0, 0, 0];
  for (const d of input) {
    if (d === 'n') n++;
    if (d === 's') n--;
    if (d === 'nw') nw++;
    if (d === 'ne') ne++;
    if (d === 'sw') ne--;
    if (d === 'se') nw--;
    b.add(hexdist2(n, nw, ne));
  }
  return [hexdist2(n, nw, ne), b.get()];
}
l(solve(input))
