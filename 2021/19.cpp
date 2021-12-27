#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include <time.h>
#include <unordered_map>
#include <unordered_set>
#include <immintrin.h>

using namespace std;
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
static int skiptonextline() {
    while(inputpos < inputsize) {
        char c = input[inputpos++];
        if (c == '\n') return 1;
    }
    return 0;
}
static long cnt1, cnt2;
static void _read() {
    inputsize = read(0,input,sizeof(input));
}

static __m128i signs[8] = {
    _mm_set_epi32(0,1,1,1),
    _mm_set_epi32(0,1,1,-1),
    _mm_set_epi32(0,1,-1,1),
    _mm_set_epi32(0,1,-1,-1),
    _mm_set_epi32(0,-1,1,1),
    _mm_set_epi32(0,-1,1,-1),
    _mm_set_epi32(0,-1,-1,1),
    _mm_set_epi32(0,-1,-1,-1),
};
static __m128i adds[8] = {
    _mm_set_epi32(0,0,0,0),
    _mm_set_epi32(0,0,-1,-1),
    _mm_set_epi32(0,-1,0,-1),
    _mm_set_epi32(0,-1,-1,0),
    _mm_set_epi32(0,0,0,-1),
    _mm_set_epi32(0,0,-1,0),
    _mm_set_epi32(0,-1,0,0),
    _mm_set_epi32(0,-1,-1,-1),
};
#define ORDER(x,y,z) _mm_set_epi8(-1,-1,-1,-1,z*4+3,z*4+2,z*4+1,z*4,y*4+3,y*4+2,y*4+1,y*4,x*4+3,x*4+2,x*4+1,x*4)
static __m128i shuffles[6] = {
    ORDER(0,1,2), // 0
    ORDER(0,2,1), // 1
    ORDER(1,2,0), // 2
    ORDER(1,0,2), // 1
    ORDER(2,0,1), // 2
    ORDER(2,1,0), // 1
};

struct point {
    __m128i x;
    bool operator== (const point &a) const {
        return _mm_movemask_ps(_mm_castsi128_ps(_mm_cmpeq_epi32(a.x, x))) == 0xF;
    }
};
static __m128i zero;
__m128i transform(__m128i src, __m128i translate, int rt) {
    __m128i v2 = adds[rt & 7];
    __m128i v3 = shuffles[rt >> 2];
    __m128i v4 = _mm_xor_si128(src, v2);
    __m128i v5 = _mm_sub_epi32(v4, v2);
    __m128i v6 = _mm_shuffle_epi8(v5, v3);
    __m128i v7 = _mm_add_epi32(v6,translate);
    return v7;
}
int dist (__m128i a, __m128i b) {
    __m128i v1 = _mm_sub_epi32(a,b);
    __m128i v2 = _mm_abs_epi32(v1);
    __m128i v3 = _mm_hadd_epi32(v2, zero);
    __m128i v4 = _mm_hadd_epi32(v3, zero);
    return _mm_cvtsi128_si32(v4);
}
namespace std {
    template <> struct hash<point> {
        std::size_t operator()(const struct point& k) const {
            return _mm_cvtsi128_si64(k.x) ^ (_mm_extract_epi64(k.x, 1) << 7);
        }
    }; 
}
static void pri(__m128i i) {
    uint64_t lo = _mm_cvtsi128_si64(i);
    uint64_t hi = _mm_extract_epi64(i, 1);
    int32_t x = lo;
    int32_t y = lo >> 32;
    int32_t z = hi;
    printf("[%d %d %d]", x, y, z);
}
template <typename K, typename V>
V getdef(const  std::unordered_map <K,V> & m, const K & key, const V & defval ) {
   typename std::unordered_map<K,V>::const_iterator it = m.find( key );
   if ( it == m.end() ) {
      return defval;
   }
   else {
      return it->second;
   }
}

#define N 100
#define M 32
static point data[N][M];
static int q[N], qp, m[N];
static bool visited[N];
static void _main() {
    long cnt = 0;
    int i = 0, n;
    __m128i scan[N] = { zero };
    unordered_set<struct point> allSet;
    while (inputpos < inputsize) {
        skiptonextline();
        int j = 0;
        while (inputpos < inputsize && input[inputpos]!='\n') {
            int a = getsint(), b = getsint(), c = getsint();
            struct point x = { _mm_set_epi32(0,c,b,a) };
            data[i][j++] = x;
        }
        m[i] = j;
        i++;
        inputpos++;
    }
    n = i;
    unordered_map<int,int> distMap[n];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m[i]; j++) {
            for (int k = 0; k < j; k++) {
                int d = dist(data[i][j].x, data[i][k].x);
                distMap[i].insert({d,1+getdef(distMap[i], d, 0)});
            }
        }
    }
    visited[q[qp++] = 0] = true;
    for (int i = 0; i < qp; i++) {
        int e = q[i];
        unordered_set<struct point> baseSet;
        for (int j = 0; j < m[e]; j++) {
            baseSet.insert(data[e][j]);
            allSet.insert(data[e][j]);
        }
        for (int j = 0; j < n; j++) if (!visited[j]) {
            auto m1 = distMap[e], m2 = distMap[j];
            int sum = 0;
            for (auto m1i = m1.begin(); m1i != m1.end(); m1i++) {
                sum += min(m1i->second,getdef(m2, m1i->first, 0));
            }
            if (sum < 66) continue;
            for (int x = 0; x < m[e]; x++) for (int y = 0; y < m[j]; y++) for (int tr = 0; tr < 24; tr++) {
                __m128i vy = data[j][x].x;
                __m128i vx = data[e][y].x;
                __m128i d = _mm_sub_epi32(vx, transform(vy, zero, tr));
                int cnt = 0;
                for (int k = 0; k < m[j]; k++) {
                    struct point p = { transform(data[j][k].x, d, tr) };
                    if (baseSet.find(p) != baseSet.end()) cnt++;
                }
                if (cnt == 12) {
                    for (int k = 0; k < m[j]; k++) {
                        data[j][k].x = transform(data[j][k].x, d, tr);
                    }
                    scan[qp] = transform(zero, d, tr);
                    visited[q[qp++] = j] = true;
                    goto out;
                }
            }
            out: ;
        }
    }
    int mx = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) {
            int d = dist(scan[i], scan[j]);
            if (d > mx) mx = d;
        }
    }
    cnt1 = allSet.size();
    cnt2 = mx;
}
static void _print() {
    printf("%ld\n%ld\n", cnt1, cnt2);
}

#include "base.h"
