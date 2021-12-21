#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include <string.h>
#include <stdint.h>

static char input[40960];
static int inputsize;
static int inputpos = 0;

static long long cnt1, cnt2;
static void _read() {
    inputsize = read(0,input,sizeof(input));
}
#define MAX_ITER 100
#define MAX_N 100
#define N ((MAX_N+2*MAX_ITER)>>2)
#define SWAP(a,b) { __typeof__(a) temp; temp = a; a = b; b = temp; }
static uint16_t b1[N*N], b2[N*N], *board1 = b1, *board2 = b2;
static uint8_t rule4x4[1<<16], ruletmp[1<<16];
static int rule3x3(int i) { return ruletmp[i&0x777]; }
static void _main() {
    for(int i = 0; i < 512; i++) ruletmp[(i&7)|(((i>>3)&7)<<4)|(((i>>6)&7)<<8)] = input[inputpos++]&1;
    for(int i = 0; i < (1 << 16); i++) {
        rule4x4[i] = rule3x3(i) + rule3x3(i>>1)*2 + rule3x3(i>>4)*16 + rule3x3(i>>5)*32;
    }
    inputpos += 2;
    int n = strchr(input + inputpos, '\n') - input - inputpos;
    for(int y = 0; y < n; y++) {
        for(int x = 0; x < n; x++) {
            if (input[inputpos++]&1) board1[y/4*N + x/4] |= 1 << (15 - (y&3)*4 -(x&3));
        }
        inputpos++;
    }
    int def = 0;
    for (int i = 1; i <= 50; i++) {
        SWAP(board1, board2);
        n += 2;
        int count = 0, x, y, ndef = rule4x4[def] ? 0xffff : 0;
        for(y = 0; y < (n+3)/4; y++) {
            uint16_t a, b = def, c, d = def;
            for (x = 0; x < (n+3)/4; x++) {
                // a|b
                // -+- => +-
                // c|d    |res
                a = b; b = y ? board2[y*N+x-N] : def;
                c = d; d = board2[y*N+x];
                uint16_t res = rule4x4[d];
                res |= rule4x4[(d>>10)&0x33|(c>>6)&0xcc|(a<<10)&0xcc00|(b<<6)&0x3300]<<10;
                res |= rule4x4[(d>>8)|(b<<8)&0xff00]<<8; 
                res |= rule4x4[(d>>2)&0x3333|(c<<2)&0xcccc]<<2;
                board1[y*N+x] = res;
                if (i == 2 || i == 50) count += __builtin_popcount(res);
            }
            board1[y*N+x] = ndef;
        }
        for (x = 0; x <= (n+3)/4; x++) board1[y*N+x] = ndef;
        def = ndef;
        if (i == 2) cnt1 = count;
        if (i == 50) cnt2 = count;
    }
}
static void _print() {
    printf("%lld\n%lld\n", cnt1, cnt2);
}
#include "base.h"
