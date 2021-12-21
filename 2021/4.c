#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include <time.h>

static char input[40960];
static int inputsize;
static int inputpos = 0;

static int getint() {
    int val = 0;
    for(;;inputpos++) {
        char c = input[inputpos];
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
static int getchar() { return input[inputpos++]; }
static int cnt1, cnt2;
static void _read() {
    inputsize = read(0,input,sizeof(input));
}
static int t[100], nums[100];
static int max (int a, int b) { return a > b ? a : b; }
static int min (int a, int b) { return a < b ? a : b; }
static void _main() {
    int n = 0, m = 0;
    do {
        nums[n] = getint();
        t[nums[n]] = n;
        n++;
    } while(getchar() == ',');
    int mint = 10000, maxt = 0;
    do {
        char b[25];
        inputpos++;
        for (int k = 0; k < 25; k++) {
            int c1 = getchar() & 15;
            int c2 = getchar() & 15;
            getchar();
            b[k] = c1 * 10 + c2;
        }
        int minb = 100000;
        for (int i = 0; i < 5; i++) {
            int maxc = -1, maxr = -1;
            for (int j = 0; j < 5; j++) {
                maxc = max(t[b[i*5+j]], maxc);
                maxr = max(t[b[i+j*5]], maxr);
            }
            minb = min(maxc, min(maxr, minb));
        }
        int score = 0;
        for (int i = 0; i < 25; i++) if (t[b[i]] > minb) score += b[i];
        score *= nums[minb];
        if (minb < mint) {
            mint = minb;
            cnt1 = score;
        }
        if (minb > maxt) {
            maxt = minb;
            cnt2 = score;
        }
    } while (inputpos < inputsize);
}
static void _print() {
    printf("%d\n%d\n", cnt1, cnt2);
}

#include "base.h"
