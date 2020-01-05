const icem = require('./intcode.em');
const init = icem.cwrap('init','number',['array','number'])
function icrunner(code, input = [], onData) {
  let output = [];
  const ics = code instanceof Array ?
    init(new Uint8Array(new Float64Array(code).buffer), code.length) :
    icem._clone(code);
  let inHanlder = false;
  function run() {
    let curInput = undefined;
    while (!icem._done(ics)) {
      const res = icem._run(ics, curInput, curInput === undefined ? 0 : 1);
      curInput = undefined;
      if (res < 0) throw "INVALID INTCODE: " + res;
      if (res === 1) {
        output.push(icem._output(ics));
        if (onData && output.length >= onData.length) {
          inHanlder = true;
          onData(...output);
          output = [];
          inHanlder = false;
        }
      }
      if (res === 2) {
        curInput = typeof input === "function" ? input() : input.shift();
        if (curInput === undefined) break;
      }
      if (!res) break;
    }
  }
  run();
  return ({
    add: (...v) => { input.push(...v); if (!inHanlder) run() },
    get: () => output.shift(),
    getAll: () => { let o = output; output = []; return o; },
    done: () => icem._done(ics) && output.length === 0,
    peek: (a) => icem._peek(ics, a),
    clone: (input = input, onData = onData) => icrunner(ics, input, onData),
  });
}
module.exports = icrunner;
