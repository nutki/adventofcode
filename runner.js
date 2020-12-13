#!/usr/bin/env node
const child = require('child_process');
const fs = require('fs');
const notify = child.spawn('inotifywait', [ '-rme', 'CLOSE_WRITE', '.']);
let run = undefined;
let timeStart = undefined;
let year = process.cwd().match(/\/(20\d\d)$|$/)[1];
let create = process.argv[2];
console.log(year);
function onExit() {
  console.log('\033[37;1mDone ' + (Date.now()-timeStart)/1000 + 's\033[0m');
  run = undefined;
}
notify.stdout.on('data', (buffer) => {
  const x = buffer.toString().match(/(\S+) \S+ ((\d+)?\.(js|pl))\n/);
  if (!x) return;
  const name = x[1]+x[2];
  const input = `${x[3]}.input.txt`
  const bin = { js: 'node', pl: 'perl'}[x[4]];
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
  console.log(create)
  const cookies = fs.readFileSync('cookies','utf8')
  child.execFile('curl', ['-b', cookies, '-o',create+'.input.txt','https://adventofcode.com/'+year+'/day/'+create+'/input'], () => {
    child.execFile('../templates.pl', [create]);
  });
  console.log('Done create')
}
