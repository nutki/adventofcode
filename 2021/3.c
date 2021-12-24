#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include <time.h>
#define N 10000

static char input[40960];
static int inputsize;
static int inputpos = 0;

static int cnt1, cnt2;
static void _read() {
    inputsize = read(0,input,sizeof(input));
}
/*
507 493
268 233
141 106
79 48
40 23
21 8
11 2
7 1
4 1
2 1
1 1
1 1
*/
#define SWAP(a,b) { __typeof__(a) temp; temp = a; a = b; b = temp; }
static int data[4000],di,bitc[20];
static void _main() {
    int a = 0, i = 0, n = 0, b = 0;
    while (inputpos < inputsize)
    {
        if (input[inputpos] == '\n') {
            data[di++] = a; n = i; a = i = 0;
            inputpos++;
        } else {
            int bit = input[inputpos]&1;
            a+=a+bit;
            bitc[i]+=bit;
            inputpos++; i++;
        }
    }
    for (int i = 0; i < n; i++) {
        a += a + (bitc[i] >= di/2);
        b += b + (bitc[i] < di/2);
    }
    cnt1 = a*b;

    int lefta = di, leftb = di, lasta, lastb;
    a = b = 0;
    for (int i = n; i >0; i--) {
        int suma = 0, sumb = 0;
        for (int j = 0; j< di; j++) {
            if (data[j]>>i == a) lasta = j, suma+=(data[j]>>(i-1))&1;
            if (data[j]>>i == b) lastb = j, sumb+=(data[j]>>(i-1))&1;
        }
        a *= 2; b *= 2;
        if (lefta == 1) a+=suma;
        else if (suma >= lefta - suma) a++, lefta = suma; else lefta -= suma;
        if (leftb == 1) b+=sumb;
        else if (sumb < leftb - sumb) b++, leftb = sumb; else leftb -= sumb;
    }
    cnt2 = a * b;
}
static void _print() {
    printf("%d\n%d\n", cnt1, cnt2);
}

#include "base.h"
