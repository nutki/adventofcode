#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include <time.h>
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
static int skiptodigit() {
    while(inputpos < inputsize) {
        char c = input[inputpos++];
        if (c >= '0' && c <= '9') {
            inputpos--;
            return 1;
        }
    }
    return 0;
}

static int cnt1, cnt2;
static void _read() {
    inputsize = read(0,input,sizeof(input));
}
static void _main() {
    int i = 0, x = 1<<30, y = 1<<31, z= 1<<30, t;
    while(skiptodigit()) {
        t = getint();
        cnt1 += z < t;
        cnt2 += x < t;
        x = y;
        y = z;
        z = t;
        i++;
    }
}
static void _print() {
    printf("%d\n%d\n", cnt1, cnt2);
}

#include "base.h"
