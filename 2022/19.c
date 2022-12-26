#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include <time.h>
#define N 10000

static char input[40960];
static int inputsize;
static int inputpos = 0;

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
static int getint() {
    int val = 0;
    skiptodigit();
    for(;;) {
        char c = input[inputpos++];
        if (c >= '0' && c <= '9') val = val * 10 + c-'0';
        else break;
    }
    return val;
}

static int cnt1, cnt2 = 1, t[N];
static void _read() {
    inputsize = read(0,input,sizeof(input));
}
static int max(int a, int b) { return a > b ? a : b; }
static int ceil(int a, int b) { return (a + b-1)/b; }
static int aa, ba, ca, cb, da, dc, limita;
static int current = 0, cmax = 0;

static void tick(int ar,int br,int cr,int a,int b,int c,int t) {
    if (current + (t-1)*t/2 < cmax) return;
    int tta = ceil(max(aa - a, 0), ar) + 1;
    if (t>tta && ar + a/t < limita) tick(ar+1,br,cr,a-aa+ar*tta,b+br*tta,c+cr*tta, t-tta);
    int ttb = ceil(max(ba - a, 0), ar) + 1;
    if (t>ttb && br + b/t < cb) tick(ar,br+1,cr,a-ba+ar*ttb,b+br*ttb,c+cr*ttb, t-ttb);
    if (br && cr + c/t < dc) {
        int ttc = max(ceil(max(ca - a, 0), ar), ceil(max(cb - b, 0), br)) + 1;
        if (t>ttc) tick(ar,br,cr+1,a-ca+ar*ttc,b-cb+br*ttc,c+cr*ttc, t - ttc);
    }
    if (cr) {
        int ttd = max(ceil(max(da - a, 0), ar), ceil(max(dc - c, 0), cr)) + 1;
        current += t-ttd;
        if (cmax < current) cmax = current;
        if (t>ttd) tick(ar,br,cr,a-da+ar*ttd,b+br*ttd,c-dc+cr*ttd, t - ttd);
        current -= t-ttd;
    }
}


static void _main() {
    while(skiptodigit()) {
        int i = getint();
        aa = getint(), ba = getint(), ca = getint(), cb = getint(), da = getint(), dc = getint();
        limita = aa;
        if (ba>limita) limita = ba;
        if (ca>limita) limita = ca;
        if (da>limita) limita = da;
        cmax = 0; tick(1,0,0,0,0,0,24);
        cnt1 += i * cmax;
        if (i <= 3) {
            cmax = 0; tick(1,0,0,0,0,0,32);
            cnt2 *= cmax;
        }
    }
}
static void _print() {
    printf("%d\n%d\n", cnt1, cnt2);
}

#include "base.h"
// static int tick(int ar,int br,int cr,int a,int b,int c,int t) {
//     int ra = 0;
//     if (current + (t-1)*(t-2) < cmax) return 0;
//     int tta = ceil(max(aa - a, 0), ar) + 1;
//     if (t>tta && ar + a/t < limita) ra = tick(ar+1,br,cr,a-aa+ar*tta,b+br*tta,c+cr*tta, t-tta);
//     int ttb = ceil(max(ba - a, 0), ar) + 1;
//     if (t>ttb && br + b/t < cb) ra = max(tick(ar,br+1,cr,a-ba+ar*ttb,b+br*ttb,c+cr*ttb, t-ttb), ra);
//     if (br && cr + c/t < dc) {
//         int ttc = max(ceil(max(ca - a, 0), ar), ceil(max(cb - b, 0), br)) + 1;
//         if (t>ttc) ra = max(tick(ar,br,cr+1,a-ca+ar*ttc,b-cb+br*ttc,c+cr*ttc, t - ttc), ra);  
//     }
//     if (cr) {
//         int ttd = max(ceil(max(da - a, 0), ar), ceil(max(dc - c, 0), cr)) + 1;
//         current += t-ttd;
//         if (t>ttd) ra = max(t-ttd+tick(ar,br,cr,a-da+ar*ttd,b+br*ttd,c-dc+cr*ttd, t - ttd), ra);
//         current -= t-ttd;
//     }
//     if (cmax < current) cmax = current;
//     return ra;
// }

// static void _main() {
//     while(skiptodigit()) {
//         int i = getint();
//         aa = getint(), ba = getint(), ca = getint(), cb = getint(), da = getint(), dc = getint();
//         limita = aa;
//         if (ba>limita) limita = ba;
//         if (ca>limita) limita = ca;
//         if (da>limita) limita = da;
//         cmax = 0;
//         cnt1 += i * tick(1,0,0,0,0,0,24);
//         cmax = 0;
//         if (i <= 3) cnt2 *= tick(1,0,0,0,0,0,32);
//     }
// }
