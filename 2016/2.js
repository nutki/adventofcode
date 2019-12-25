#!/usr/bin/env node
const fs = require('fs');
const content = fs.readFileSync('2.input.txt','utf8');
const l = console.log;
const seq = n => Array.from(new Array(n).keys());
const { max, min, abs } = Math;
/*
123
456
789

  1
 234
56789
 ABC
  D
*/
v = 5;
for (c of content) {
    if (c == '\n') {
        l(v);
    } else {
        nv = ({
            // U: "123123456",
            // D: "456789789",
            // L: "112445778",
            // R: "233566899",
            U: "121452349678B",
            D: "36785ABC9ADCD",
            L: "122355678AABD",
            R: "134467899BCCD",
        })[c][v - 1]
        v = parseInt(nv, 16)
    }
}
