var rollup = require("rollup").rollup;
var transform = require("babel-core").transform;
var lebab = require("lebab").lebab;
var ugly = require("uglify-js");
var cache;
var fs = require("fs");

rollup({
  entry: "../src/Angled.js",
  cache: cache
}).then(function(bundle) {
  var res = bundle.generate({
    format: "umd"
  });
  
  fs.writeFileSync("./builds/dist/Angled.es6.js", res.code);
  fs.writeFileSync("./builds/dist/Angled.es5.js", transform(res.code).code);
  fs.writeFileSync("./builds/dist/Angled.es6.min.js", ugly.minify(lebab.transform(res.code)).code);
  fs.writeFileSync("./builds/dist/Angled.es5.min.js", ugly.minify(transform(res.code).code).code);
  
  console.log("[Angled] Built all distribution packages!")
});