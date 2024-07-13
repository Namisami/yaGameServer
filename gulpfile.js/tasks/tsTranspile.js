const { dest, watch } = require("gulp");
const ts = require("gulp-typescript");


const tsTranspiler = ts.createProject("tsconfig.json");

function tsTranspile() {
  return tsTranspiler.src()
    .pipe(tsTranspiler()).js
    // .on("error", () => { /* Ignore compiler errors */})
    .pipe(dest("public/assets/js"));
}

function tsFilesWatch() {
  return watch(["src/*.ts", "src/**/*.ts"], tsTranspile);
}

exports.tsTranspile = tsTranspile;
exports.tsFilesWatch = tsFilesWatch;
