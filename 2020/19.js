#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('19.input.txt','utf8');

const [c1, c2] = content.split(/\n\n/);
const input = A.parse(c1, /(.+): (.+)/g);
const words = A.parse(c2, /(\w+)/g);
function solve(part2) {
  let m = new Map(input);
  const f = (a) => {
    const res = m.get(a).toString().split(' | ').map(r => {
      if (part2 && a === 8) return f(42) + '+';
      if (part2 && a === 11) {
        const f42 = f(42), f31 = f(31)
        return '(' + A.seq(10).map(i => f42 + `{${i+1}}` + f31 +  `{${i+1}}`).join('|') + ')';
      }
      return r.split(' ').map(c => A.caseParse(c,
        [/(\d+)/, x => f(x)],
        [/"(.)"/, a => a])
      ).join('');
    });
    return '(?:' + res.join('|') + ')';
  };
  const pat = new RegExp('^' + f(0) + '$');

  return words.filter(w => pat.test(w)).length;
}
l(solve());
l(solve(true));
