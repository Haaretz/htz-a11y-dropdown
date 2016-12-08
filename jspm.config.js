SystemJS.config({
  nodeConfig: {
    "paths": {
      "htz-a11y-dropdown/": "src/"
    }
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.12"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "htz-a11y-dropdown": {
      "main": "index.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "htz-dispatch-event": "github:haaretz/htz-dispatch-event@1.0.3",
    "htz-get-focusables": "github:haaretz/htz-get-focusables@1.0.0"
  },
  packages: {}
});
