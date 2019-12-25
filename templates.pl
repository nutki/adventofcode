#!/usr/bin/perl
$x = $ARGV[0];
die if -f "$x.js";
open A,">$x.js";
print A <<END;
#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('$x.input.txt','utf8');

const input = A.parse(content, /(.+)/g);
function solve(input) {
  let cnt = 0;
  for (const line of input) {
    l(line);
  }
  return cnt;
}
l(solve(input))
END
system "chmod a+x $x.js";
