#!/usr/bin/env node

const benny = require('benny');
const path = require('node:path');
const swig_lib = require('bindings')('fake_swig.node');
const koffi = require('koffi');
const rs = require('ffi-rs');
try {
  const napi = require('ffi-napi');
} catch (e) {
  napi = null;
}

benny.add.skip_if = (cond) => cond ? benny.add.skip : benny.add;

const lib_ext_map = {
  'darwin': 'dylib',
  'linux': 'so',
  'win32': 'dll',
};
const lib_path = path.join(".", "build", "Release", "fake_lib." + lib_ext_map[process.platform]);
rs.open({
  library: 'libfake',
  path: lib_path,
});
const rs_lib = rs.define({
  my_strtoll: {
    library: "libfake",
    retType: rs.DataType.I64,
    paramsType: [rs.DataType.String, rs.DataType.I32],
  },
  my_test2: {
    library: "libfake",
    retType: rs.DataType.Double,
    paramsType: [rs.DataType.I64, rs.DataType.String],
  },
});
const koffi_lib = koffi.load(lib_path);
const napi_lib = napi?.Library(lib_path, {
  'my_strtoll': ['longlong', ['string', 'int']],
  'my_test2': ['double', ['longlong', 'string']],
});

const koffi_fun1 = koffi_lib.func('long long my_strtoll(const char *str, int base)');
const swig_fun1 = swig_lib.my_strtoll;
const rs_fun1 = rs_lib.my_strtoll;
const napi_fun1 = napi_lib?.my_strtoll;

const koffi_fun2 = koffi_lib.func('double my_test2(long time, const char *str)');
const swig_fun2 = swig_lib.my_test2;
const rs_fun2 = rs_lib.my_test2;
const napi_fun2 = napi_lib?.my_test2;

benny.suite(
  'FFI comparison: my_strtoll',

  benny.add('koffi', () => {
    koffi_fun1("12345", 16)
  }),

  benny.add('SWIG glue', () => {
    swig_fun1("12345", 16)
  }),

  benny.add('ffi-rs', () => {
    rs_fun1(["12345", 16])
  }),

  benny.add.skip_if(!napi)('ffi-napi', () => {
    napi_fun1("12345", 16)
  }),

  benny.cycle(),
  benny.complete(),
);

benny.suite(
  'FFI comparison: my_test2',

  benny.add('koffi', () => {
    koffi_fun2(1042, "blafoobar")
  }),

  benny.add('SWIG glue', () => {
    swig_fun2(1042, "blafoobar")
  }),

  benny.add('ffi-rs', () => {
    rs_fun2([1042, "blafoobar"])
  }),

  benny.add.skip_if(!napi)('ffi-napi', () => {
    napi_fun2(1042, "blafoobar")
  }),

  benny.cycle(),
  benny.complete(),
);
