#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include <time.h>

static char input[40960];
static int inputsize;
static int inputpos = 0;

static int cnt1;
static void _read() {
    inputsize = read(0,input,sizeof(input));
}

#define N 256
#define SWAP(a,b) { __typeof__(a) temp; temp = a; a = b; b = temp; }

uint64_t _p[N][N/32], (*p)[N/32] = _p + 1;
uint64_t _p2[N][N/32], (*p2)[N/32]= _p2 + 1;
int get(uint64_t p[N][N/32], int x, int y) {
    return ((p[y][x/32]) >> ((x&31)*2))&3;
}
void set(uint64_t p[N][N/32], int x, int y, int v) {
    p[y][x/32] &= ~(3ll << ((x&31)*2));
    p[y][x/32] |= ((uint64_t)v << ((x&31)*2));
}

static int X,Y;
static void pri(uint64_t p[N][N/32]) {
    for (int j = 0; j < Y; j++) {
        for (int i = 0; i < X; i++) {
            putchar(".>_v"[get(p,i,j)]);
        }
        putchar('\n');
    }
}

static void _main() {
    int cnt = 0, i = 0,j = 0;
    while (inputpos < inputsize) {
        int c = input[inputpos++];
        if (c == '\n') {
            X = i; i=0; j++;
        } else {
            if (c != '.') set(p,i,j,c == 'v' ? 3 : 1);
            i++;
        }
    }
    Y = j;
    int anymoved = 0;
    do {
        cnt++;
        anymoved = 0;
        for (j = 0; j < Y; j++) {
            int preveast = get(p,X-1,j) == 1 ? 1 : 0;
            set(p,X,j,get(p,0,j));
            set(p,X+1,j,3);
            for (i = 0; i < (X+31)/32; i++) {
                __uint128_t v = *(__uint128_t*)(&p[j][i]);
                __uint128_t takenmask = (__int128_t)1 << 64 | 0x5555555555555555l;
                __uint128_t taken = v & takenmask;
                uint64_t east =  v & 0xaaaaaaaaaaaaaaaal;
                east = east >> 1;
                east ^= taken;
                taken |= taken << 1;
                __uint128_t moved = (((__int128_t)east << 2) | preveast) & ~taken;
                uint64_t removed = v ^ (moved >> 2);
                if ((int64_t)(moved)) anymoved = 1;
                p2[j][i] = removed | moved;
                preveast = east >> 62;
            }
        }
        SWAP(p,p2);
        
        for (i = 0; i < (X+31)/32; i++) {
            p[-1][i] = p[Y-1][i];
            p[Y][i] = p[0][i];
        }
        for (j = 0; j < Y; j++) {
            for (i = 0; i < (X+31)/32; i++) {
                uint64_t vprev = p[j-1][i];
                uint64_t v = p[j][i];
                uint64_t vnext = p[j+1][i];
                uint64_t taken = v & 0x5555555555555555l;
                uint64_t takennext = vnext & 0x5555555555555555l;
                uint64_t south =  v & 0xaaaaaaaaaaaaaaaal;
                uint64_t southprev =  vprev & 0xaaaaaaaaaaaaaaaal;
                south |= south >> 1;
                southprev |= southprev >> 1;
                taken |= taken << 1;
                takennext |= takennext << 1;
                uint64_t movedout = south & ~takennext;
                uint64_t movedin = southprev & ~taken;
                p2[j][i] = (v ^ movedout) | movedin;
                if (movedin) anymoved = 1;
            }
        }
        SWAP(p,p2);
    } while(anymoved);
    cnt1 = cnt;
}

static void _print() {
    printf("%d\n", cnt1);
}

#include "base.h"
