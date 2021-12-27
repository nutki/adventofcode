#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include <time.h>
#include <stdlib.h>
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

#define SWAP(a,b) { __typeof__(a) temp; temp = a; a = b; b = temp; }
static int cnt1, cnt2;
static void _read() {
    inputsize = read(0,input,sizeof(input));
}
static char p[1024][1024];
static void _main() {
    int n = 0, c1 = 0, c2 = 0;
    while (inputpos < inputsize) {
        int a = getsint();
        int b = getsint(); inputpos+=3;
        int c = getsint();
        int d = getsint();
        int dx = a == c ? 0 : a < c ? 1 : -1, dy = b == d ? 0 : b < d ? 1 : -1;
        int len = abs(a - c) + 1;
        if (a == c) {
            if (b > d) SWAP(b,d);
            for (int y = b; y<=d; y++) {
                if ((p[a][y]&3)==1) c1++;
                if ((p[a][y]&3)<2) p[a][y]++;
                if ((p[a][y]>>2)==1) c2++;
                if ((p[a][y]>>2)<2) p[a][y]+=4;
            }
        } else 
        if (b == d) {
            if (a > c) SWAP(a,c);
            for (int x = a; x<=c; x++) {
                if ((p[x][b]&3)==1) c1++;
                if ((p[x][b]&3)<2) p[x][b]++;
                if ((p[x][b]>>2)==1) c2++;
                if ((p[x][b]>>2)<2) p[x][b]+=4;
            }
        }
        else for (int x = a, y = b, i = 0; i < len; x += dx, y += dy, i++) {
            if ((p[x][y]&3)==1) c1++;
            if ((p[x][y]&3)<2) p[x][y]++;
        }
    }
    cnt2 = c1;
    cnt1 = c2;
}
static void _print() {
    printf("%d\n%d\n", cnt1, cnt2);
}

#include "base.h"
