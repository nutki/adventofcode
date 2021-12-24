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

static char cnt1[100], cnt2[100];
static void _read() {
    inputsize = read(0,input,sizeof(input));
}
static void _main() {
    int stack[100], sp = 0, i=0;
    while (inputpos < inputsize) {
        inputpos += 37;
        int a = input[inputpos] - '1'; inputpos+= input[inputpos] - '0'; inputpos += 7;
        int b = getsint(); inputpos += 79;
        int c = getsint(); inputpos += 16;
        if (!a) {
            stack[sp++] = c;
            stack[sp++] = i;
        } else {
            int j = stack[--sp];
            int diff = stack[--sp] + b;
            int diffn = diff < 0 ? diff : 0, diffp = diff < 0 ? 0 : diff;
            cnt1[i] = '9' + diffn; cnt1[j] = '9' - diffp;
            cnt2[i] = '1' + diffp; cnt2[j] = '1' - diffn;
        }
        i++;
    }
}
static void _print() {
    printf("%s\n%s\n", cnt1, cnt2);
}

#include "base.h"
