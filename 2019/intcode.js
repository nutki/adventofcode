function icrunner(code, input = [], onData, pc = 0, rel = 0) {
  let output = [];
  let m = code.slice()
  const inst = () => m[pc] % 100;
  const par = (i) => m[pc + i + 1];
  const mpar = (i) => {
      const mode = Math.floor(m[pc] / Math.pow(10, i+2)) % 10;
      return mode === 1 ? par(i) : m[par(i) + (mode === 2 ? rel : 0)];
  }
  const rpar = (i) => {
      const mode = Math.floor(m[pc] / Math.pow(10, i+2)) % 10;
      return par(i) + (mode === 2 ? rel : 0);
  }
  function * intcode () {
    while (inst() !== 99) {
        switch (inst()) {
            case 1: m[rpar(2)] = mpar(0) + mpar(1); pc+=4; break;
            case 2: m[rpar(2)] = mpar(0) * mpar(1); pc+=4; break;
            case 3: m[rpar(0)] = yield; pc +=2; break;
            case 4: yield mpar(0); pc += 2; break;
            case 5: pc = mpar(0) ? mpar(1) : pc + 3; break;
            case 6: pc = !mpar(0) ? mpar(1) : pc + 3; break;
            case 7: m[rpar(2)] = mpar(0) < mpar(1) ? 1 : 0; pc+=4; break;
            case 8: m[rpar(2)] = mpar(0) === mpar(1) ? 1 : 0; pc+=4; break;
            case 9: rel += mpar(0); pc += 2; break;
            default: throw("BAD INSTRUCTION " + inst())
        }
    }
  }
  const exe = intcode();
  let state = exe.next();
  let inHanlder = false;
  function run() {
    while(!state.done) {
      let curInput = undefined;
      if (state.value === undefined) {
        curInput = typeof input === "function" ? input() : input.shift();
        if (curInput === undefined) break;
      } else {
        output.push(state.value);
        if (onData && output.length >= onData.length) {
          inHanlder = true;
          onData(...output);
          output = [];
          inHanlder = false;
        }
      }
      state = exe.next(curInput);
    }
  }
  run();
  return ({
    add: (...v) => { input.push(...v); if (!inHanlder) run() },
    get: () => output.shift(),
    getAll: () => { let o = output; output = []; return o; },
    done: () => state.done && output.length === 0,
    peek: (a) => m[a],
    clone: (input = input, onData = onData) => icrunner(m, input, onData, pc, rel),
  })
}
module.exports = icrunner;

