#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('4.input.txt','utf8');

const input = content.split("\n\n");
function solve(input, part2) {
  let cnt = 0;
  for (const line of input) {
    let a = A.parse(line, /(\w+):/g).filter(a => a !== 'cid').length;
    a===7 && (!part2 || /^\s*((byr:(19[2-9]\d|200[012])|iyr:20(1\d|20)|eyr:20(2\d|30)|hgt:((59|6\d|7[0-6])in|1([5-8]\d|9[0-3])cm)|hcl:#[a-f0-9]{6}|ecl:(amb|blu|brn|gry|grn|hzl|oth)|pid:\d{9}|cid:\S*)\b\s*)+$/.test(line)) && cnt++;
  }
  return cnt;
}
l(solve(input));
l(solve(input, true));
