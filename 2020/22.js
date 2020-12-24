#!/usr/bin/env node
const A = require("../advent");
const l = console.log;
const content = require("fs").readFileSync("22.input.txt", "utf8");

function game(decks, part2) {
  const seen = new Set();
  const [p1, p2] = decks;
  let w;
  while (p1.length && p2.length) {
    let sig = decks.map(d => d.join(',')).join(' ');
    if (seen.has(sig)) return 0;
    seen.add(sig);
    if (part2 && p1.length > p1[0] && p2.length > p2[0]) {
      w = game([p1.slice(1, p1[0] + 1), p2.slice(1, p2[0] + 1)], part2);
    } else {
      w = p1[0] > p2[0] ? 0 : 1;
    }
    decks[w].push(decks[w].shift(), decks[1 - w].shift());
  }
  return p1.length ? 0 : 1;
}
function solve(part2) {
  const input = A.parse(content, /Player \d+:\n((?:.+\n)*)/g).map((c) =>
    A.parse(c, /(\d+)/g)
  );
  let w = input[game(input, part2)];
  let n = w.length;
  return w.sum((e) => e * n--);
}
l(solve());
l(solve(true));
