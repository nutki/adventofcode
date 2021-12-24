#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include <time.h>
#define N 10000

static char input[40960];
static int inputsize;
static int inputpos = 0;

static int getsint() {
    int val = 0, neg = 0;
    if (input[inputpos]=='-') inputpos++, neg = 1;
    for(;;) {
        char c = input[inputpos++];
        if (c >= '0' && c <= '9') val = val * 10 + c-'0';
        else break;
    }
    return neg ? -val : val;
}

static int min(int a, int b) { return a < b ? a : b; }
static int max(int a, int b) { return a > b ? a : b; }
static long cnt1, cnt2;
static void _read() {
    inputsize = read(0,input,sizeof(input));
}

struct cube { int x1,x2,y1,y2,z1,z2; };

static int check(struct cube*c1,struct cube *c2) {
  return c1->x1 <= c2->x2 && c2->x1 <= c1->x2 &&
         c1->y1 <= c2->y2 && c2->y1 <= c1->y2 &&
         c1->z1 <= c2->z2 && c2->z1 <= c1->z2;
}

static struct cube prod(struct cube*c1,struct cube *c2) {
  struct cube c = {max(c1->x1,c2->x1), min(c1->x2,c2->x2),
                   max(c1->y1,c2->y1), min(c1->y2,c2->y2),
                   max(c1->z1,c2->z1), min(c1->z2,c2->z2)};
  return c;
}
static long volume(struct cube*c) {
  return (long)(c->x2 - c->x1 + 1) * (c->y2 - c->y1 + 1) * (c->z2 - c->z1 + 1);
}

static int data[100000], di = 0;
static struct cubesel {
    int on;
    struct cube c;
} cubes[200*2000];
static int ci = 0;


static long substract(struct cube *c) {
    long sum = 0;
    int ciorg = ci;
    for (int i = 0; i < ciorg; i++) {
        struct cubesel cs = cubes[i];
        if(!check(c, &cs.c)) continue;
        struct cubesel p = { !cs.on, prod(c, &cs.c) };
        sum += (cs.on ? -1 : 1) * volume(&p.c);
        cubes[ci++] = p;
    }
    return sum;
}
static void _main() {
    long cnt = 0;
    while (inputpos < inputsize) {
        int on = input[inputpos + 1] == 'n';
        inputpos += on ? 5 : 6;
        data[di++] = on;
        data[di++] = getsint(); inputpos += 1;
        data[di++] = getsint(); inputpos += 2;
        data[di++] = getsint(); inputpos += 1;
        data[di++] = getsint(); inputpos += 2;
        data[di++] = getsint(); inputpos += 1;
        data[di++] = getsint(); inputpos += 0;
    }
    for (int i = 0; i < di; i+=7) {
        if (i == 20*7) cnt1 = cnt, ci = 0;
        int on = data[i];
        struct cube *c = (void*)(data + i + 1);
        cnt += substract(c);
        if (on) {
            cnt += volume(c);
            struct cubesel cs = { on, *c };
            cubes[ci++] = cs;
        }
    }
    cnt2 = cnt;
}
static void _print() {
    printf("%ld\n%ld\n", cnt1, cnt2);
}

#include "base.h"
