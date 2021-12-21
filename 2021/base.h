#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include <time.h>

uint64_t rdtsc(){
    unsigned int lo,hi;
    __asm__ __volatile__ ("rdtsc" : "=a" (lo), "=d" (hi));
    return ((uint64_t)hi << 32) | lo;
}



static struct timespec diff(struct timespec start, struct timespec end)
{
    struct timespec temp;
    if ((end.tv_nsec-start.tv_nsec)<0) {
        temp.tv_sec = end.tv_sec-start.tv_sec-1;
        temp.tv_nsec = 1000000000+end.tv_nsec-start.tv_nsec;
    } else {
        temp.tv_sec = end.tv_sec-start.tv_sec;
        temp.tv_nsec = end.tv_nsec-start.tv_nsec;
    }
    return temp;
}

static void timeme(char *step_name, void f()) {
    struct timespec time1, time2;
    uint64_t start = rdtsc();
    clock_gettime(CLOCK_MONOTONIC, &time1);
    f();
    uint64_t end = rdtsc();
    clock_gettime(CLOCK_MONOTONIC, &time2);
    struct timespec d = diff(time1,time2);
    printf("%-8s", step_name);
    if (d.tv_sec) {
        printf("%3ld.%03lds ", d.tv_sec, d.tv_nsec/1000000);
    } else if (d.tv_nsec > 1000000) {
        printf("%3ld.%03ldms", d.tv_nsec/1000000, d.tv_nsec/1000%1000);
    } else {
        printf("%3ld.%03ldus", d.tv_nsec/1000, d.tv_nsec%1000);
    }
    printf(" (%6lucycles)\n", end - start);    
}
int main() {
    timeme("Input",_read);
    timeme("Process",_main);
    timeme("Output",_print);
    return 0;
}
