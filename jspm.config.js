SystemJS.config({
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
    "htz-dispatch-event": "github:haaretz/htz-dispatch-event@1.0.0",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.12"
  },
  packages: {}
});
