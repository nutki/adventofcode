#include <unistd.h>
#include <iostream>
#include <queue>
#include <unordered_set>
using namespace std;
static char input[40960];
static int inputsize;
static int inputpos = 0;

static int cnt1, cnt2;
static void _read() {
    inputsize = read(0,input,sizeof(input));
}
static uint8_t pos[] = {
    0x00,0x01,0x03,0x05,0x07,0x09,0x0A,
    0x12,0x14,0x16,0x18,0x22,0x24,0x26,0x28,
    0x32,0x34,0x36,0x38,0x42,0x44,0x46,0x48,
};
static int costv[4] = {1,10,100,1000};
struct move {
    uint8_t m0,m1,c;
    __int128_t f;
} moves[7*16];
int moves_len;
int hc[16][32] = {
{},{},{},{},
{},{},{},{},
{3,2,2,4,6,8,9,                            0,4,6,8,       0,5,7,9,  0,6,8,10, 0,7,9,11},
{50,40,20,20,40,60,70,                     40,0,40,60,    50,0,50,70, 60,0,60,80, 70,0,70,90},
{700,600,400,200,200,400,500,              600,400,0,400, 700,500,0,500, 800,600,0,600, 900,700,0,700},
{9000,8000,6000,4000,2000,2000,3000,       8000,6000,4000,0,9000,7000,5000,0,10000,8000,6000,0,11000,9000,7000,0},
};
static int h(__int128_t b) {
    int sum = 0;
    for(int i = 0; b; i++, b >>= 4) sum += hc[b&15][i];
    return sum;
}

static int _solve(int part) {
    char a[16] = {input[28+3],input[28+5],input[28+7],input[28+9],input[42+3],input[42+5],input[42+7],input[42+9]};
    if (part == 2) {
        for (int i = 0; i < 4; i++) a[i+12] = a[i+4];
        for (int i = 0; i < 8; i++) a[i+4] = "DCBADBAC"[i];
    }
    moves_len = 7 * 8 * part;
    __int128_t init = 0, target;
    target = 0xBA98BA98;
    if (part == 2) target |= target << 32;
    for (int i = 8*part -1; i >=0; i--) {
        init = (init << 4) | (a[i] - 'A' + 0x8);
    }
    init <<= 7*4;
    target <<= 7*4;
    priority_queue<pair<int32_t, __int128_t>> q;
    unordered_set<__int128_t> visited;
    q.push({-h(init), init});
    while(!q.empty()) {
        auto p = q.top(); q.pop();
        auto n = p.second;
        auto d = p.first + h(n);
        if (n == target) return -d;
        if (visited.find(n) != visited.end()) continue;
        visited.insert(n);
        for (int i = 0; i < moves_len; i++) {
            auto move = moves[i];
            if (n & move.f) continue;
            auto m0 = move.m0;
            auto m1 = move.m1;
            __int128_t mask0 = ((__int128_t)15 << (m0*4)), mask1 = ((__int128_t)15 << (m1*4));
            __int128_t n2 = n & ~(mask0|mask1);
            __int128_t column_mask = (__int128_t)0xF000F000F000F << (m0*4); 
            n2 |= (n & mask0) >> (4*(m0-m1));
            n2 |= (n & mask1) << (4*(m0-m1));
            if (!(n & mask0) && (n & mask1) && (n2 & column_mask) == (target & column_mask)) {
                q.push({d - move.c * costv[(n >> (m1*4)) & 3] - h(n2), n2});
            }
            if ((n & mask0) && !(n & mask1) && (n & column_mask) != (target & column_mask)) {
                q.push({d - move.c * costv[(n >> (m0*4)) & 3] - h(n2), n2});
            }
        }
    }
    return -1;
}
static void _main() {
    for (int m0 = 7; m0 < 7 + 16; m0++) {
        for (int m1 = 0; m1 < 7; m1++) {
            int p0 = pos[m0], p1 = pos[m1];
            moves[moves_len].m0 = m0;
            moves[moves_len].m1 = m1;
            moves[moves_len].c = abs((p0&15)-(p1&15))+abs((p0>>4)-(p1>>4));
            moves[moves_len].f = 0;
            for(int m = m0; m >= 11; m -= 4) {
                moves[moves_len].f |= (__int128_t)0xF << (4*(m-4));
            }
            for(int i = 0; i < 7; i++) {
                int p = pos[i]&15;
                if (p > min(p0&15,p1&15) && p < max(p0&15,p1&15)) {
                    moves[moves_len].f |= (__int128_t)0xF << (4*i);
                }
            }
            moves_len++;
        }
    }
    cnt1 = _solve(1);
    cnt2 = _solve(2);
}
static void _print() {
    printf("%d\n%d\n", cnt1, cnt2);
}
#include "base.h"
