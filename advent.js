const freq = v => { const r = {}; for(i of v) r[i] = (r[i] || 0) + 1; return r }
const sort = (a, f = v => v) => Array.from(a).sort((a, b) => {
    const av = f(a), bv = f(b);
    return av > bv ? 1 : av < bv ? -1 : 0;
})
const freqmap = v => { const r = new Map(); for(i of v) r.set(i, (r.get(i) || 0) + 1); return r }
const freqa = v => sort(freqmap(v).entries(), c => -c[1])
const parse = (it, p) => {
    const res = [];
    for (const [_, ...m] of it.matchAll(p)) {
        res.push(m.map(e => e && e.match(/^-?[1-9]\d{0,15}$|^0$/) ? parseInt(e) : e));
    }
    return res.map(m => m.length === 1 ? m[0] : m);
}
const caseParse = (it, ...c) => {
    for (let [p, f] of c) {
        for (let v of parse(it, p)) {
            return f(v);
        }
    }
    return undefined;
}
const seq = (a, b) => Array.from(new Array(b === undefined ? a : b - a).keys()).map(v => b === undefined ? v : v + a);
function * perm(a, ll) {
    const aa = Array.from(a);
    const l = ll === undefined ? aa.length : Math.min(ll, aa.length);
    const res = Array(l).fill(undefined);
    const used = Array(aa.length).fill(false);
    let pos = 0;
    const idx = Array(aa.length).fill(0);
    while (pos >= 0) {
      if (pos == l) {
        yield res;
        pos--;
        used[idx[pos]-1] = false;
        continue;
      }
      if (idx[pos] == aa.length) {
        idx[pos] = 0;
        pos--;
        used[idx[pos]-1] = false;
        continue;
      }
      if (used[idx[pos]]) {
        idx[pos]++;
        continue;
      }
      res[pos] = aa[idx[pos]];
      used[idx[pos]] = true;
      idx[pos++]++;
    }
  }
  function * words(a, l) {
    const aa = Array.from(a);
    const res = Array(l).fill(undefined);
    let pos = 0;
    const idx = Array(aa.length).fill(0);
    while (pos >= 0) {
      if (pos == l) {
        yield res;
        pos--;
        continue;
      }
      if (idx[pos] == aa.length) {
        idx[pos--] = 0;
        continue;
      }
      res[pos] = aa[idx[pos]];
      idx[pos++]++;
    }
  }
  
  function * choose(a, l) {
    const aa = Array.from(a);
    const res = Array(l).fill(undefined);
    let pos = 0;
    const idx = Array(aa.length).fill(0);
    while (pos >= 0) {
      if (pos == l) {
        yield res.slice();
        pos--;
        continue;
      }
      if (idx[pos] == aa.length) {
        pos--;
        continue;
      }
      res[pos] = aa[idx[pos]];
      idx[pos++]++;
      idx[pos] = idx[pos - 1];
    }
  }
  
  function best(f = a => a) {
    let cur, curF;
    return ({
      add: (v) => {
        if (cur === undefined) cur = v, curF = f(v);
        else {
          const newF = f(v);
          if (newF > curF) {
            curF = newF;
            cur = v;
          }
        }
      },
      get: () => cur,
    });
  }
  
function plane(def = undefined, content) {
    const rows = new Map();
    let minX = 0, minY = 0, maxX = 0, maxY = 0;
    let cursors = [];
    const get = (x, y) => rows.has(y) ? rows.get(y).has(x) ? rows.get(y).get(x) : def : def;
    const del = (x, y) => {
      if (rows.has(y)) rows.get(y).delete(x);
    }
    const set = (x, y, v) => {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      if (v === def) {
        del(x, y);
        return;
      }
      if (!rows.has(y)) rows.set(y, new Map());
      rows.get(y).set(x, v);
    }
    function * entries() {
      for (const [y, r] of rows.entries()) for(const [x, c] of r.entries()) yield [x, y, c];
    }
    function load(input, map = v => v) {
      let x = 0, y = 0;
      const poi = {};
      if (input instanceof Array) input = input.join('\n');
      for (const c of input.split('')) {
        if (c === '\n') x=0, y++;
        else {
          const v = map(c,x,y);
          if (v !== def) poi[v] = [x,y];
          if (v !== def) set(x,y,v);
          x++;
        }
      }
      return poi;
    }
    function transform(f) {
      const p = plane(def);
      for (const e of entries()) p.set(...f(...e));
      return p;
    }
    function rotate(a = 1) {
      return transform(
        [
          (x, y, v) => [x, y, v],
          (x, y, v) => [maxY-y, x, v],
          (x, y, v) => [maxX-x, maxY-y, v],
          (x, y, v) => [y, maxX-x, v],
        ][a % 4]
      )
    }
    function * getLine(x, y, dx = 1, dy = 0, len, stop = true) {
      for (let i = 0; len === undefined || i < len; i++) {
        if (stop && (x < minX || x > maxX || y < minY || y > maxY)) break;
        yield get(x, y);
        x += dx;
        y += dy;
      }
    }
    function toGraph(w) {
      const g = graph();
      const f = (x,y) => y*1000 + x;
      for (const [x1, y1, c] of entries()) {
        for (const [x2, y2] of neighbor4(x1,y1)) {
          if (get(x2, y2) !== def) g.connect(f(x1,y1), f(x2,y2), w?.({x1,y1,x2,y2}));
        }
      }
      return g;
    }
    if (content) load(content);
    return ({
      [Symbol.iterator]: entries,
      load,
      get,
      set,
      del,
      maxX: () => maxX,
      maxY: () => maxY,
      minX: () => minX,
      minY: () => minY,
      rotate,
      transform,
      flipX: () => transform((x, y, v) => [maxX - x, y, v]),
      flipY: () => transform((x, y, v) => [x, maxY - y, v]),
      getLine,
      getLineStr: (...args) => [...getLine(...args)].join(''),
      graph: toGraph,
      print: (pad = 0) => {
        for (let j = minY; j <= maxY; j++) {
          const r = [];
          for (let i = minX; i <= maxX; i++) {
            let v = get(i, j);
            if (v === undefined || v == null) v = ' ';
            let t = v.toString().padStart(pad);
            for(const c of cursors)
              if (c.pos()[0] == i && c.pos()[1] == j)
                t = '\033[44m' + t + '\033[0m';
            r.push(t);
          }
          console.log(r.join(''));
        }
      },
      cursor: (x = 0, y = 0, heading = 0) => {
        const getRel = (rx, ry) => {
          const rHeading = heading + 2 & 7;
          const mx = x + rx * dirs[rHeading][0] + ry * dirs[heading][0];
          const my = y + rx * dirs[rHeading][1] + ry * dirs[heading][1];
          return get(mx, my)
        };
        const dirs = [
          [0,-1],
          [1,-1],
          [1,0],
          [1,1],
          [0,1],
          [-1,1],
          [-1,0],
          [-1,-1],
        ];
        const dnames = {
          u: dirs[0],
          d: dirs[4],
          r: dirs[2],
          l: dirs[6],
          '^': dirs[0],
          '>': dirs[2],
          'v': dirs[4],
          '<': dirs[6],
          n: dirs[0],
          s: dirs[4],
          e: dirs[2],
          w: dirs[6],
        }
        const c = ({
          pos: () => [x, y],
          setX: (nx) => x = nx,
          setY: (ny) => y = ny,
          setPos: (nx, ny) => [x, y] = [nx, ny],
          get: () => get(x, y),
          set: (v = true) => set(x, y, v),
          move: (dir, a = 1) => {
            for (const d of dir.toLowerCase()) {
              x += a * dnames[d][0], y += a * dnames[d][1];
            }
          },
          mDist: (nx = 0, ny = 0) => Math.abs(nx - x) + Math.abs(ny - y),
          dist2: (nx = 0, ny = 0) => (nx - x)*(nx - x) + (ny - y)*(ny - y),
          setH: (nh) => heading = nh,
          heading: () => heading,
          fw: (a = 1) => { x += a * dirs[heading][0], y += a * dirs[heading][1] },
          bw: (a = 1) => { x -= a * dirs[heading][0], y -= a * dirs[heading][1] },
          turnR: (a = 2) => heading = heading + a & 7,
          turnL: (a = 2) => heading = heading - a & 7,
          getRel,
          getLeft: () => getRel(-1, 0),
          getRight: () => getRel(1, 0),
          getFw: () => getRel(0, 1),
        });
        cursors.push(c)
        return c;
      }
    })
  }
  function cls() {
    console.log("\033[0;0H\033[3J")
  }
  function home() {
    console.log("\033[0;0H")
  }
  function bitCount (n) {
    n = n - ((n >> 1) & 0x55555555)
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
    return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
  }
  function deepEqual(a, b) {
    if (a === b) return true;
    if (a === undefined || b === undefined || a === null || b === null) return false;
    if (a instanceof Array && b instanceof Array) {
      if (a.length !== b.length) return false;
      return a.every((e, i) => deepEqual(e, b[i]));
    }
    if (typeof a === "object" && typeof b === "object") {
      let ak = Object.keys(a).sort();
      let bk = Object.keys(b).sort();
      if (ak.length !== bk.length) return false;
      if (!ak.every((e, i) => e === bk[i])) return false;
      if (!ak.every((e) => deepEqual(a[e], b[e]))) return false;
    }
    return false;
  }
  function hash(a) {
    if (typeof a === "number") {
      if (a === a | 0) return a;
      const b = new DataView(new ArrayBuffer(8));
      b.setFloat64(Math.abs(a));
      return b.getInt32(0) ^ b.getInt32(1);
    }
    if (typeof a === "string") {
      const r = 0;
      for (let i = 0; i < a.length; i++) {
        r = ((r << 5) - r | 0) + a.charCodeAt(i) | 0;
      }
      return r;
    }
    if (a instanceof Array) {
      const r = 0;
      for (const c of a) {
        r = ((r << 5) - r | 0) + hash(c) | 0;
      }
      return r;
    }
    if (a === null) return 0;
    if (typeof a === "object") {
      const r = 0;
      for (const c in a) {
        r = r ^ hash(a[c]);
      }
      return r;
    }
    if (a === true) return 1;
    return 0;
  }
  class M {
   m = new Map()
   size = 0
   set(k, v) {
     const h = hash(k)
     let a = this.m.get(h);
     if (!a) this.m.set(h, a = []);
     let e = a.findIndex(e => deepEqual(e[0], k));
     if  (e >= 0) {
       a[e][1] = v;
     } else {
       a.push([k, v]);
       this.size++;
     }
   }
   get(k) {
     const a = this.m.get(hash(k));
     return a ? a.find(e => deepEqual(e[0], k))[1] : undefined;
   }
   has(k) {
    const a = this.m.get(hash(k));
    return a ? a.contains(e => deepEqual(e[0], k)) : false;
   }
 }
function gcd(...a) {
  return a.reduce((a, b) => {
    while (b) [a, b] = [b, a % b]
    return a;
  });
}
function extended_gcd(a, b) {
  let [old_r, r] = [a, b];
  let [old_s, s] = [1, 0];
  let [old_t, t] = [0, 1];
  while(r!==0) {
    const q = Math.floor(old_r / r);
    [old_r, r] = [r, old_r - q * r];
    [old_s, s] = [s, old_s - q * s];
    [old_t, t] = [t, old_t - q * t];
  }
  return [old_s, old_t, old_r, t, s];
}
function lcm(...a) {
  const z = a.map((_, i) => a.reduce((a, b, j) => i !== j ? a * b : a, 1));
  return a.reduce((a, b) => a * b) / gcd(...z);
}
function *primes(max) {
  let p = [];
  for (let i = 2; !max || i < max; i++) if (!p.some(e => i % e === 0)) {
    yield i;
    p.push(i);
  }
}

function bfs(init, visit, key) {
  if (!key) {
    key = init instanceof Array ? v => v.join(',') : v => v
  }
  const q = [init];
  const distanceMap = new Map([[key(init), 0]]);
  let qp = 0, distance;
  while (qp < q.length) {
    const e = q[qp];
    q[qp++] = undefined;
    distance = distanceMap.get(key(e));
    const a = visit(e, distance);
    if (a === undefined) break;
    for (const n of a) {
      if (distanceMap.has(key(n))) continue;
      distanceMap.set(key(n), distance + 1);
      q.push(n);
    }
  }
  return ({distance, distanceMap, size: qp});
}

function bfsW(init, visit, key, h = () => 0) {
  if (!key) {
    key = init instanceof Array ? v => v.join(',') : v => v
  }
  const q = heap(k => k[1], [init, h(init)]);
  const distanceMap = new Map([[key(init), 0]]);
  const done = new Set()
  let qp = 0, distance, e;
  while (!q.empty()) {
    [e] = q.pop();
    qp++;
    distance = distanceMap.get(key(e));
    const a = visit(e, distance);
    if (a === undefined) break;
    for (const [n, d] of a) {
      const tentative_gscore = distance + d;
      if (distanceMap.has(key(n)) && distanceMap.get(key(n)) <= tentative_gscore) continue;
      if (distanceMap.has(key(n))) {
        q.remove(x => x[0] === n);
      }
      distanceMap.set(key(n), tentative_gscore);
      q.push([n, tentative_gscore + h(n)]);
    }
  }
  return ({distance, distanceMap, size: qp});
}

function connect(a, b, g1, g2 = g1) {
  if (!g1[a]) g1[a] = [];
  g1[a].push(b);
  if (g2 === false) return;
  if (!g2[b]) g2[b] = [];
  g2[b].push(a);
}
  
function once() {
  let done = false;
  return (f) => {
    if (done) return false;
    f && f();
    return done = true;
  };
}

function clamp(a, b) {
  return v => v < a ? a : v > b ? b : v;
}
function rotL(a, n) {
  n %= a.length;
  if (n < 0) n = a.length + n;
  return a.slice(n).concat(a.slice(0,n))
}
function rotR(a, n) {
  return rotL(a, -n);
}

function binsearch(a, what, s = 0, e = a.length) {
  if (a instanceof Array) a = x => a[x];
  let mid = s, midv;
  while (e - s > 1) {
    mid = Math.floor((s + e) / 2);
    midv = a(mid);
    if (midv === what) break;
    else if (midv > what) {
      e = mid;
    } else {
      s = mid + 1;
    }
  }
  return [mid, midv];
}

function nextPow2(n) {
  let p = 1;
  while (p < n) p *= 2;
  return p;
}
function range(n) {
  return [...Array(n).keys()];
}
function sum(a, f = x => x) {
  let s = 0, i = 0;
  for (const v of a) s += Number(f(v, i++));
  return s;
}
function prod(a, f = x => x) {
  let s = 1, i = 0;
  for (const v of a) s *= f(v, i++);
  return s;
}
function neighbor4(x = 0, y = 0) {
  return [[x,y+1],[x,y-1],[x+1,y],[x-1,y]];
}
function neighbor8(x = 0, y = 0) {
  return [[x,y+1],[x,y-1],[x+1,y],[x-1,y],[x+1,y+1],[x-1,y-1],[x-1,y+1],[x+1,y-1]];
}
function graph(dir = true) {
  const v = {};
  let ne = 0;
  const connect = (v1, v3, e) => {
    ne++;
    v[v1] = v[v1] || {fe:[], re:[], fee:[], ree:[]};
    v[v3] = v[v3] || {fe:[], re:[], fee:[], ree:[]};
    v[v1].fe.push(v3);
    (dir ? v[v3].re : v[v3].fe).push(v1);
    if (e !== undefined) {
      v[v1].fee.push([v3, e]);
      (dir ? v[v3].ree : v[v3].fee).push([v1, e]);
    }
  }
  const vertices = () => Object.keys(v);
  const roots = () => vertices().filter(k => v[k].re.length === 0);
  const leaves = () => vertices().filter(k => v[k].fe.length === 0);
  return {
    vertices,
    bfs: (init, visit) => bfs(init, (e, d) => (visit && visit(e, d) === true ? undefined : v[e].fe)),
    bfsRev: (init, visit) => bfs(init, (e, d) => (visit && visit(e, d) === true ? undefined : v[e].re)),
    bfsW: (init, visit) => bfsW(init, (e, d) => (visit && visit(e, d) === true ? undefined : v[e].fee)),
    bfsWRev: (init, visit) => bfsW(init, (e, d) => (visit && visit(e, d) === true ? undefined : v[e].ree)),
    dfsReduce: (init, visit) => {
      const t = (n) => visit(v[n].fee.map(([n2, e]) => [t(n2), e, n]), n);
      return t(init);
    },
    dfsReduceRev: (init, visit) => {
      const t = (n) => visit(v[n].ree.map(([n2, e]) => [t(n2), e, n]), n);
      return t(init);
    },
    neighbors: (v1) => v[v1].fe,
    neighborsRev: (v1) => v[v1].re,
    roots, leaves,
    connect,
    desc: () => {
      const atos = (a) => !a.length ? "" : `: ${a[0]}${a.length > 0 ? "..." : ""}`
      console.log(`${vertices().length} nodes ${ne} edges`)
      if (dir) {
        const r = roots(), l = leaves();
        console.log(`${r.length} roots${atos(r)}`);
        console.log(`${l.length} leaves${atos(l)}`);
      }
    }
  };
}
function heap(key = v => v, ...init) {
  const h = [ null, ...init ];
  function up() {
    let pos = h.length - 1;
    if (pos < 2) return;
    let kpos = key(h[pos]);
    while(pos > 1) {
      const parent = pos/2|0;
      if (kpos >=  key(h[parent])) break;
      [h[pos], h[parent]] = [h[parent], h[pos]];
      pos = parent;
    }
  }
  function down(pos = 1) {
    while(pos * 2 < h.length) {
      const left = pos * 2, right = pos * 2 + 1;
      const min = right === h.length || key(h[left]) < key(h[right]) ? left : right;
      if (key(h[min]) >= key(h[pos])) break;
      [h[pos], h[min]] = [h[min], h[pos]];
      pos = min;
    }
  }
  return {
    push: (v) => { h.push(v); up(); },
    pop: () => {
      const r = h[1];
      if (h.length > 2) h[1] = h.pop(); else h.pop();
      down();
      return r;
    },
    empty: () => h.length === 1,
    remove: (f) => {
      for (let i = 1; i < h.length; i++) {
        if (f(h[i])) {
          if (h.length > i+1) h[i] = h.pop(); else h.pop();
          down(i);
          return;
        }
      }
    },
    h,
  }
}

class ExtendedMap extends Map {
  inc(k, v) { this.set(k, (this.get(k)||0)+v) }
}
module.exports = {
    seq,
    bitSeq: n => seq(n).map(i => 1 << i),
    sort,
    freq, freqa,
    min: Math.min,
    max: Math.max,
    abs: Math.abs,
    parse,
    caseParse,
    perm, words, choose,
    best,
    plane,
    bitCount,
    deepEqual,
    hash,
    cls,
    home,
    gcd,
    lcm,
    primes,
    bfs,
    connect,
    once,
    rotL,
    rotR,
    nextPow2,
    clamp,
    binsearch,
    range,
    sum,
    prod,
    neighbor4,
    neighbor8,
    graph,
    extended_gcd,
    heap,
    bfsW,
    div: (a, b) => [Math.floor(a / b), a % b],
    mod: (a, b) => (a % b + b) % b,
    Map: ExtendedMap,
}
Array.prototype.max = function (f = v => v) { return Math.max(...this.map(f)) };
Array.prototype.min = function (f = v => v) { return Math.min(...this.map(f)) };
Array.prototype.sum = function (f) { return sum(this, f) };
Array.prototype.prod = function (f) { return prod(this, f) };
Array.prototype.freq = function () { return freq(this); };
Array.prototype.freqa = function () { return freqa(this); };
Array.prototype.sortBy = function (f) { return sort(this, f); };
Array.prototype.binsearch = function (w, s, e) { return binsearch(this, w, s, e)[0]; };
Array.prototype.count = function (f) { return this.filter(f).length; };
Array.prototype.flatten = function () {
  const r = [];
  this.forEach(e => {
    for (const c of e) r.push(c);
  });
  return r;
}
