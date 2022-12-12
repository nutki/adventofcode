#!/usr/bin/env node
const child = require('child_process');
const fs = require('fs');
const notify = child.spawn('inotifywait', [ '-rme', 'CLOSE_WRITE', '.']);
let run = undefined;
let timeStart = undefined;
let year = process.cwd().match(/\/(20\d\d)$|$/)[1];
let create = process.argv[2];
const runnerStatedAt = Date.now();
console.log(year);
function onExit() {
  const elapsedSec = Math.floor((Date.now() - runnerStatedAt) / 1000);
  const elapsedMText = Math.floor(elapsedSec/60).toString().padStart(2, '0');
  const elapsedSText = (elapsedSec%60).toString().padStart(2, '0');
  const elapsedText = ` at ${elapsedMText}:${elapsedSText}`;
  console.log('\033[37;1mDone ' + (Date.now()-timeStart)/1000 + 's\033[0m' + elapsedText);
  run = undefined;
}
notify.stdout.on('data', (buffer) => {
  const x = buffer.toString().match(/(\S+) \S+ ((\d+)?\.(js|pl|c|cpp))\n/);
  if (!x) return;
  const name = x[1]+x[2];
  const input = `${x[3]}.input.txt`
  const bin = { js: 'node', pl: 'perl', c: '../runc', cpp: '../runc'}[x[4]];
  url = year ? ` https://adventofcode.com/${year}/day/${x[3]}` : '';
  if (run !== undefined) {
    run.off('exit', onExit);
    run.kill();
  }
  console.log('\033[0;0H\033[3J\033[J\033[37;1mRunning ' + name + url + '\033[0m')
  timeStart = Date.now();
  run = child.spawn(bin, [name, input], { stdio: 'inherit' });
  listen = run.on('exit', onExit);
});
notify.on('error', (...ev) => {
  console.log(ev)
});
if (create) {
  console.log("Creating template for day",create);
  const cookies = fs.readFileSync('../cookies','utf8');
  const url = 'https://adventofcode.com/'+year+'/day/'+create;
  child.execFile('curl', ['-b', cookies, '-o',create+'.input.txt',url+'/input'], () => {
    child.execFile('../templates.pl', [create], () => {
      console.log("Done create");
    });
  });
  child.execFile('curl', ['-b', cookies, '-o-',url], (_,text) => {
    const s = text.matchAll(/<pre><code>([^<]+)<.code><.pre>/g);
    let idx = 0;
    for (const i of s) {
      fs.writeFileSync(`${create}.input.e${++idx}.txt`, i[1]);
    }
    console.log(`Done ${idx} examples`);
  });
}
