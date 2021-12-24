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
static void _main() {
    int x = 0, y = 0, z = 0;
    while (inputpos < inputsize)
    {
        int a;
        switch(input[inputpos]) {
            case 'f':
                a = input[inputpos+8]-'0';
                inputpos += 10;
                x += a;
                z += a * y;
                break;
            case 'd':
                a = input[inputpos+5]-'0';
                inputpos += 7;
                y += a;
                break;
            case 'u':
                a = input[inputpos+3]-'0';
                inputpos += 5;
                y -= a;
                break;
        }
    }
    cnt1 = x * y;
    cnt2 = x * z;
}
static void _print() {
    printf("%d\n%d\n", cnt1, cnt2);
}

#include "base.h"
