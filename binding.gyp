{
  "targets": [
    {
	    "target_name": "fake_lib",
      "type": "shared_library",
	    "sources": ["libfake.cc"]
    },
    {
      "target_name": "fake_swig",
      "sources": [ "libfake.cc", "<(INTERMEDIATE_DIR)/libfake_wrap.cxx" ],
      "include_dirs": [
	      "<!(node -p \"require('node-addon-api').include_dir\")",
        "."
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "actions": [
        {
          "action_name": "swig",
          "inputs": ["libfake.i"],
          "outputs": ["<(INTERMEDIATE_DIR)/libfake_wrap.cxx"],
          "action": ["swig", "-c++", "-javascript", "-napi", '-o', '<@(_outputs)', '<@(_inputs)']
        }
      ]
    }
  ]
}