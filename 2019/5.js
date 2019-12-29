#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('5.input.txt','utf8');
const intcode = require('./intcode');

const input = A.parse(content, /(-?\d+)/g);

intcode(input, [1], v => v && l(v));
intcode(input, [5], v => l(v));