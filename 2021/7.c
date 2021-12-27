#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include <time.h>
#include <stdlib.h>
#define N 10000

static char input[40960];
static int inputsize;
static int inputpos = 0;

static int getint() {
    int val = 0;
    for(;;) {
        char c = input[inputpos++];
        if (c >= '0' && c <= '9') val = val * 10 + c-'0';
        else break;
    }
    return val;
}

static int cnt1 = 1 << 30, cnt2 = 1 << 30;
static void _read() {
    inputsize = read(0,input,sizeof(input));
}
static int data[2000],n;
static void _main() {
    int n = 0, mx = 0, a;
    while (inputpos < inputsize) {
        data[n++] = a = getint();
        if (a > mx) mx = a;
    }
    for (int i = 0; i <= mx; i++) {
        int c1 = 0, c2 = 0;
        for (int j = 0; j < n; j++) {
            c1 += a = abs(data[j] - i);
            c2 += a * (a + 1) / 2;
        }
        if (c1 < cnt1) cnt1 = c1;
        if (c2 < cnt2) cnt2 = c2;
    }
}
static void _print() {
    printf("%d\n%d\n", cnt1, cnt2);
}

#include "base.h"
