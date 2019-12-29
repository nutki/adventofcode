#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('9.input.txt','utf8');
const intcode = require('./intcode');

const input = A.parse(content, /(-?\d+)/g);
intcode(input, [1], v => l(v));
intcode(input, [2], v => l(v));
