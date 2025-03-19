#ifdef SWIG
#  define LIBFAKE_EXPORT
#else
#  ifdef _WIN32
#    define LIBFAKE_EXPORT __declspec(dllexport)
#  else
#    define LIBFAKE_EXPORT __attribute__((visibility("default")))
#  endif
#endif

#ifdef __cplusplus
extern "C" {
#endif

LIBFAKE_EXPORT long long my_strtoll(const char* str, int base);
LIBFAKE_EXPORT double my_test2(long time, const char* str);

#ifdef __cplusplus
}
#endif
