#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('22.input.txt','utf8');

let input = A.parse(content, /(.+)/g);
function solve1(input, N, pos) {
  return input.reduce((pos, line) => A.caseParse(line,
    [/deal into new stack/, () => N - pos - 1],
    [/deal with increment (\S+)/, a => mulMod(pos, a, N)],
    [/cut (\S+)/, a => ((pos - a) % N + N) % N],
  ), pos);
}
function solve2(input, N, x, rep = 1) {
  let [a, b] = input.reduceRight(([a, b], line) => A.caseParse(line,
    [/new stack/, () => [(N - a) % N, (N + N - b - 1) % N]],
    [/increment (\S+)/, aa => [ modDiv(a, aa, N), modDiv(b, aa, N) ]],
    [/cut (\S+)/, bb => [ a, ((b + bb) % N + N) % N] ],
  ), [1, 0]);
  while (rep) {
    if (rep % 2) x = (mulMod(x,a,N) + b) % N;
    [a, b] = [mulMod(a,a,N), (mulMod(a,b,N) + b) % N];
    rep = Math.floor(rep / 2);
  }
  return x;
}
l(solve1(input, 10007, 2019));
l(solve2(input, 119315717514047, 2020, 101741582076661));

function gcdExtended(a, b) {
  let x = 0, y = 1, u = 1, v = 0;
  while (a !== 0) {
    let q = Math.floor(b / a);
    [x, y, u, v] = [u, v, x - u * q, y - v * q];
    [a, b] = [b % a, a];
  }
  return [b, x, y];
}
function modInverse(a, m) {
  const [g, x] = gcdExtended(a, m);
  if (g !== 1) throw('Bad mod inverse');
  return (x + m) % m;
}
function modDiv(a, b, m) {
  return Number(BigInt(a) * BigInt(modInverse(b, m)) % BigInt(m));
}
function mulMod(a,b,m) {
  return Number(BigInt(a) * BigInt(b) % BigInt(m))
}
