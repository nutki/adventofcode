#include <stdint.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

typedef double ic_type;

struct ic {
  ic_type *m;
  int32_t m_count;
  int32_t pc;
  int32_t rel;
  ic_type output;
};

struct ic *init(ic_type *code, int32_t n) {
  struct ic *c = malloc(sizeof (struct ic));
  c->m = malloc(sizeof (ic_type) * (n));
  memcpy(c->m, code, sizeof (ic_type) * n);
  c->pc = c->rel = 0;
  c->m_count = n;
  return c;
}

struct ic *clone(struct ic * from) {
  int32_t n = from->m_count;
  struct ic *c = malloc(sizeof (struct ic));
  *c = *from;
  c->m = malloc(sizeof (ic_type) * n);
  memcpy(c->m, from->m, sizeof (ic_type) * n);
  return c;
}

#define par(i) (m[pc + (i) + 1])
static inline int get_mode(int32_t i, int pos) {
  if (pos == 0) return i / 100 % 10;
  else if (pos == 1) return i / 1000 % 10;
  return i / 10000 % 10;
}
static inline ic_type ic_mpar(ic_type *m, int32_t pc, int32_t rel, int32_t limit, int i) {
  int mode = get_mode(m[pc], i);
  if (mode == 1) return par(i);
  int addr = (int)par(i) + (mode == 2 ? rel : 0);
  return addr >= limit ? 0 : m[addr];
}
static inline int32_t ic_rpar(ic_type *m, int32_t pc, int32_t rel, int32_t limit, int i) {
  int mode = get_mode(m[pc], i);
  return par(i) + (mode == 2 ? rel : 0);
}
#define inst() ((int)m[pc] % 100)
#define mpar(i) ic_mpar(m, pc, rel, limit, i)
#define rpar(i) ic_rpar(m, pc, rel, limit, i)
#define set(a, v) do { int _a = (a); \
  if (_a < 0) { ret = -2; break; } \
  while (_a >= limit) m = realloc(m, sizeof (ic_type) * (limit += 1000)); \
  m[_a] = (v); \
} while(0)
int run(struct ic * c, ic_type input, int32_t has_input) {
  int32_t limit = c->m_count;
  ic_type *m = c->m;
  int32_t pc = c->pc;
  int32_t rel = c->rel;
  int ret = 0;
  while (inst() != 99 && !ret) {
    switch (inst()) {
      case 1: set(rpar(2), mpar(0) + mpar(1)); pc+=4; break;
      case 2: set(rpar(2), mpar(0) * mpar(1)); pc+=4; break;
      case 3: if(has_input) { set(rpar(0), input); has_input = 0; pc +=2; } else ret = 2; break;
      case 4: c->output = mpar(0); ret = 1; pc += 2; break;
      case 5: pc = mpar(0) ? mpar(1) : pc + 3; break;
      case 6: pc = !mpar(0) ? mpar(1) : pc + 3; break;
      case 7: set(rpar(2), mpar(0) < mpar(1)); pc+=4; break;
      case 8: set(rpar(2), mpar(0) == mpar(1)); pc+=4; break;
      case 9: rel += mpar(0); pc += 2; break;
      default: ret = -1; break;
    }
  }
  c->m = m;
  c->m_count = limit;
  c->pc = pc;
  c->rel = rel;
  return ret;
}
ic_type peek(struct ic *c, int32_t addr) {
  return c->m[addr];
}
ic_type output(struct ic *c) {
  return c->output;
}
ic_type done(struct ic *c) {
  return (int)c->m[c->pc] % 100 == 99;
}
