#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('21.input.txt','utf8');

const input = A.parse(content, /(.+) \(contains (.+)\)/g)
  .map(([a, b]) => [a.split(' '), b.split(', ')]);
function solve() {
  const aMap = new Map();
  const iMap = new Map();
  for (const [ingredients, alergens] of input) {
    for (const alergen of alergens) {
      if (!aMap.has(alergen)) aMap.set(alergen, []);
      aMap.get(alergen).push(ingredients);
    }
  }
  const options = [...aMap.entries()].map(([a, ingredients]) =>
    [a, ingredients.flatten().freqa().filter(a => a[1] === ingredients.length).map(a => a[0])]
  );
  while(iMap.size < aMap.size) {
    let [a, ingredients] = options.find(x => x[1].count(i => !iMap.has(i)) === 1);
    iMap.set(ingredients.find(i => !iMap.has(i)), a);
  };
  const part1 = input.map(c => c[0]).flatten().count(i => !iMap.has(i))
  const part2 = [...iMap.entries()].sortBy(c => c[1]).map(c => c[0]).join(',');
  return [part1, part2];
}
l(solve());
