#!/usr/bin/env node
const A = require("../advent");
const l = console.log;
const content = require("fs").readFileSync("17.input.txt", "utf8");

const input = A.plane(".");
input.load(content);
function solve(part2) {
  let cnt = 0;
  let cube = new Set();
  for (let [x, y] of input) cube.add(`${x}.${y}.0.0`);
  let maxX = input.maxX();
  let maxY = input.maxY();
  let maxZ = 0,
    minZ = 0,
    minX = 0,
    minY = 0;
  let minT = (maxT = 0);
  for (let i = 0; i < 6; i++) {
    minX--, minY--, minZ--;
    maxX++, maxY++, maxZ++;
    if (part2) maxT++, minT--;
    let nextCube = new Set();
    cnt = 0;
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          for (let t = minT; t <= maxT; t++) {
            let s = 0;
            let c = cube.has(`${x}.${y}.${z}.${t}`);
            for (let dx = -1; dx <= 1; dx++) {
              for (let dy = -1; dy <= 1; dy++) {
                for (let dz = -1; dz <= 1; dz++) {
                  for (let dt = -1; dt <= 1; dt++) {
                    if (cube.has(`${x + dx}.${y + dy}.${z + dz}.${t + dt}`))
                      s++;
                  }
                }
              }
            }
            let res = s === 3 || (c && s === 4);
            if (res) {
              nextCube.add(`${x}.${y}.${z}.${t}`);
              cnt++;
            }
          }
        }
      }
    }
    cube = nextCube;
  }
  return cube.size;
}
l(solve());
l(solve(true));
