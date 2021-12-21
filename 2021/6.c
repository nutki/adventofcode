#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#define N 10000

static char input[40960];
static int inputsize;
static int inputpos = 0;


static void _read() {
    inputsize = read(0,input,sizeof(input));
}
static long long cnt1, cnt2;
static long long tab[1000];
static void _main() {
    while(inputpos < inputsize) {
        char c = input[inputpos++];
        if (c > '0' && c < '9') tab[c-'0']++;
    }
    long long *head = tab;
    for (int i = 0; i < 256; i++) {
        long long n2 = *head++;
        head[6] += n2;
        head[8] = n2;
        if (i==79) for (int i = 0; i < 9; i++) cnt1 += head[i];
    }
    for (int i = 0; i < 9; i++) cnt2 += head[i];
}
static void _print() {
    printf("%lld\n%lld\n", cnt1, cnt2);
}

#include "base.h"