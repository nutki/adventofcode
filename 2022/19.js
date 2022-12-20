#!/usr/bin/env node
const A = require('../advent');
const l = console.log
const content = require('fs').readFileSync('19.input.txt','utf8');

const input = A.parse(content, /(\d+).*?(\d+).*?(\d+).*?(\d+).*?(\d+).*?(\d+).*?(\d+)/g);
function solve(part2) {
  let cnt = part2 ? 1 : 0;
  for (const [i, aa, ba, ca, cb, da, dc] of (part2 ? input.slice(0, 3) : input)) {
    let maxd = 0;
    const limita = Math.max(aa,ba,ca,da);
    const tick = (ar,br,cr,dr,a,b,c,d,t) => {
      const tta = Math.ceil(Math.max(aa - a, 0) / ar) + 1;
      if (t>tta && ar + a/t < limita) tick(ar+1,br,cr,dr,a-aa+ar*tta,b+br*tta,c+cr*tta,d+dr*tta, t-tta);
      const ttb = Math.ceil(Math.max(ba - a, 0) / ar) + 1;
      if (t>ttb && br + b/t < cb) tick(ar,br+1,cr,dr,a-ba+ar*ttb,b+br*ttb,c+cr*ttb,d+dr*ttb, t-ttb);
      if (br && cr + c/t < dc) {
        const ttc = A.max(Math.ceil(Math.max(ca - a, 0) / ar), Math.ceil(Math.max(cb - b, 0) / br)) + 1;
        if (t>ttc) tick(ar,br,cr+1,dr,a-ca+ar*ttc,b-cb+br*ttc,c+cr*ttc,d+dr*ttc, t - ttc);  
      }
      if (cr) {
        const ttd = A.max(Math.ceil(Math.max(da - a, 0) / ar), Math.ceil(Math.max(dc - c, 0) / cr)) + 1;
        if (t>ttd) tick(ar,br,cr,dr+1,a-da+ar*ttd,b+br*ttd,c-dc+cr*ttd,d+dr*ttd, t - ttd);
      }
      const dx = d+dr*t;
      if (dx > maxd) maxd = dx;
    }
    tick(1,0,0,0,0,0,0,0,part2 ? 32 : 24);
    if (part2) cnt *= maxd; else cnt += maxd * i;
  }
  return cnt;
}
l(solve());
l(solve(true));
