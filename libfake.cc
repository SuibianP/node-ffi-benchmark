#include "libfake.h"
#include <cstdlib>
#include <cstring>

long long my_strtoll(const char* str, int base) {
  return strtoll(str, NULL, base);
}

double my_test2(long time, const char* str) {
  double retval = strlen(str);
  for (long i = 0; i < time; i++) {
    retval += (double)(rand()) / RAND_MAX;
  }
  return retval;
}
