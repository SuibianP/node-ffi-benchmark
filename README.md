# node-ffi-benchmark

A crude benchmark for Node.js FFI solutions.

- [Koffi](https://koffi.dev)
- [SWIG](https://github.com/swig/swig/commit/ceed54758ae98c553d2d695d5d65902205b32223) (static glue)
- [ffi-rs](https://github.com/zhangyuang/node-ffi-rs)
- [ffi-napi](https://github.com/node-ffi-napi/node-ffi-napi)

## Feature comparison

- All four are ABI stable across Node versions.
- All three except Koffi validate parameter types. Try `koffi_fun1(0xdeadbeef, 16)`.
- SWIG can generate automatically from header and does not require maintaining interface descriptions in JS.

## Result

### darwin-arm64 v18.19.1

```
Running "FFI comparison: my_strtoll" suite...
Progress: 100%

  koffi:
    13 196 201 ops/s, ±0.12%   | fastest

  SWIG glue:
    8 192 637 ops/s, ±1.44%    | 37.92% slower

  ffi-rs:
    255 915 ops/s, ±0.39%      | 98.06% slower

  ffi-napi:
    127 686 ops/s, ±9.75%      | slowest, 99.03% slower

Finished 4 cases!
  Fastest: koffi
  Slowest: ffi-napi
Running "FFI comparison: my_test2" suite...
Progress: 100%

  koffi:
    142 943 ops/s, ±0.39%   | 0.31% slower

  SWIG glue:
    143 394 ops/s, ±0.32%   | fastest

  ffi-rs:
    83 052 ops/s, ±8.89%    | 42.08% slower

  ffi-napi:
    66 650 ops/s, ±10.17%    | slowest, 53.52% slower

Finished 4 cases!
  Fastest: SWIG glue
  Slowest: ffi-napi
```

### darwin-arm64 v22.14.0

```
Running "FFI comparison: my_strtoll" suite...
Progress: 100%

  koffi:
    13 372 005 ops/s, ±0.41%   | fastest

  SWIG glue:
    8 526 576 ops/s, ±0.24%    | 36.24% slower

  ffi-rs:
    444 805 ops/s, ±0.19%      | slowest, 96.67% slower

Finished 3 cases!
  Fastest: koffi
  Slowest: ffi-rs
Running "FFI comparison: my_test2" suite...
Progress: 100%

  koffi:
    142 199 ops/s, ±0.83%   | 1.84% slower

  SWIG glue:
    144 863 ops/s, ±0.17%   | fastest

  ffi-rs:
    108 370 ops/s, ±0.27%   | slowest, 25.19% slower

Finished 3 cases!
  Fastest: SWIG glue
  Slowest: ffi-rs
```

### win-x64 v18.20.7

```
Running "FFI comparison: my_strtoll" suite...
Progress: 100%

  koffi:
    5 114 458 ops/s, ±1.66%   | fastest

  SWIG glue:
    3 557 263 ops/s, ±1.27%   | 30.45% slower

  ffi-rs:
    93 627 ops/s, ±1.33%      | slowest, 98.17% slower

Finished 3 cases!
  Fastest: koffi
  Slowest: ffi-rs
Running "FFI comparison: my_test2" suite...
Progress: 100%

  koffi:
    92 849 ops/s, ±0.96%   | 0.27% slower

  SWIG glue:
    93 098 ops/s, ±1.04%   | fastest

  ffi-rs:
    47 878 ops/s, ±1.17%   | slowest, 48.57% slower

Finished 3 cases!
  Fastest: SWIG glue
  Slowest: ffi-rs
```

### win-x64 v22.14.0

```
Running "FFI comparison: my_strtoll" suite...
Progress: 100%

  koffi:
    5 401 717 ops/s, ±1.73%   | fastest

  SWIG glue:
    3 937 238 ops/s, ±1.39%   | 27.11% slower

  ffi-rs:
    193 936 ops/s, ±2.16%     | slowest, 96.41% slower

Finished 3 cases!
  Fastest: koffi
  Slowest: ffi-rs
Running "FFI comparison: my_test2" suite...
Progress: 100%

  koffi:
    94 090 ops/s, ±0.91%   | 0.25% slower

  SWIG glue:
    94 326 ops/s, ±1.08%   | fastest

  ffi-rs:
    64 576 ops/s, ±1.08%   | slowest, 31.54% slower

Finished 3 cases!
  Fastest: SWIG glue
  Slowest: ffi-rs
```
