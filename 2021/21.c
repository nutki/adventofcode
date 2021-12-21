#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include <string.h>
#include <stdint.h>
#include <stdlib.h>

static char input[40960];
static int inputsize;
static int inputpos = 0;

static long long cnt1, cnt2;
static void _read() {
    inputsize = read(0,input,sizeof(input));
}
#define N 0x10000
#define SWAP(a,b) { __typeof__(a) temp; temp = a; a = b; b = temp; }
static uint64_t map1[N], map2[N], *m1 = map1, *m2 = map2;
static uint16_t queue1[N], queue2[N], *q1 = queue1, *q2 = queue2;
static int ql1, ql2;

static void _main() {
    int p1 = input[28]-'1', p2 = input[29+29]-'1';
    uint64_t part2[2];
    m1[q1[ql1++] = p1 | (p2 << 8)] = 1;
    for (int i = 0; ql1; i++) {
        for (int j = 0; j < ql1; j++) {
            int k = q1[j];
            uint64_t v = m1[k];
            int p1 = (k&0xff)%10, s1 = (k&0xff)/10;
            m1[k] = 0;
            k >>= 8;
            for (int ii = 0;ii < 7*4; ii+=4) {
                int dc = (0x6574839 >> ii) & 0xf;
                int dv = (0x7663311 >> ii) & 0xf;
                int pn = (p1 + dc) % 10;
                int sn = s1 + pn + 1;
                if (sn >= 21) part2[i%2] += v * dv;
                else {
                    int nk = k + (pn + sn * 10) * 256;
                    if (!m2[nk]) q2[ql2++] = nk;
                    m2[nk] += v * dv; 
                }
            }
        }
        ql1 = ql2; ql2 = 0;
        SWAP(m1,m2)
        SWAP(q1,q2)
    }
    cnt2 = part2[0] > part2[1] ? part2[0] : part2[1];
    int td = 0, score1 = 0, score2 = 0;
    for (;;) {
        p1 = (p1+3*td+6) % 10;
        td += 3;
        score1 += p1 + 1;
        if (score1 >= 1000) break;
        SWAP(score1, score2)
        SWAP(p1,p2)
    }
    cnt1 = td * score2;
}
static void _print() {
    printf("%lld\n%lld\n", cnt1, cnt2 );
}
#include "base.h"
