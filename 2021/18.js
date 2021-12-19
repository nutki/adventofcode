#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('18.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function cost(a) {
  const stack = [];
  for (let [nc, nd] of a) {
    while (stack.length && stack[stack.length-1][1] === nd) {
      nc = 3*stack.pop()[0] + 2*nc; nd--;
    }
    stack.push([nc,nd]);
  }
  return stack[0][0];
}
function reduce(n) {
  outer: while(true) {
    for (let i = 0; i < n.length; i++) {
      if (n[i][1] === 5) {
        if (i) n[i-1][0] += n[i][0];
        if (i + 2 < n.length) n[i+2][0] += n[i+1][0];
        n.splice(i, 2, [0, n[i][1]-1]);
      }
    }
    for (let i = 0; i < n.length; i++) {
      if (n[i][0] > 9) {
        n.splice(i, 1, [Math.floor(n[i][0]/2),n[i][1]+1], [Math.ceil(n[i][0]/2),n[i][1]+1]);
        continue outer;
      }
    }
    return n;
  }
}
function reduce2(n) {
  for (let i = 0; i < n.length; i++) {
    if (n[i][1] === 5) {
      if (i) n[i-1][0] += n[i][0];
      if (i + 2 < n.length) n[i+2][0] += n[i+1][0];
      n.splice(i, 2, [0, n[i][1]-1]);
    }
  }
  for (let i = 0; i < n.length; i++) {
    if (n[i][0] > 9) {
      if (n[i][1] === 4) {
        if (i) n[i-1][0] += Math.floor(n[i][0]/2);
        if (i + 1 < n.length) n[i+1][0] += Math.ceil(n[i][0]/2);
        n[i][0] = 0;
        if(i) i-=2;
      } else {
        n.splice(i, 1, [Math.floor(n[i][0]/2),n[i][1]+1], [Math.ceil(n[i][0]/2),n[i][1]+1]);
        i--;
      }
    }
  }
  return n;
}
const add = (a,b) => reduce2([...a,...b].map(([a,b])=>[a,b+1]));
function solve() {
  const ts = input.map(line => {
    const a = [];
    let d = 0;
    for (const c of A.parse(line, /([\[\]0-9])/g)) {
      if (c === '[') d++;
      else if (c === ']') d--;
      else a.push([c,d]);
    }
    return a;
  });
  const r = cost(ts.reduce((prev, next) => add(prev, next)));
  const b = A.best();
  for (const x of A.perm(ts, 2)) b.add(cost(add(...x)));
  return [r,b.get()];
}
l(solve());
