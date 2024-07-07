const { src, dest, watch } = require('gulp');
const ts = require('gulp-typescript');
// const babel = require("gulp-babel");


const tsTranspiler = ts.createProject("tsconfig.json")

function tsTranspile() {
  return tsTranspiler.src()
    .pipe(tsTranspiler()).js
    // .on("error", () => { /* Ignore compiler errors */})
    .pipe(dest('dist'))
}

// function tsTranspile() {
//   return src(['src/*.ts', 'src/**/*.ts'])
//     .pipe(babel({
//       presets: ["@babel/preset-env"]
//     }))
//     .pipe(tsTranspiler())
//     .on("error", () => { /* Ignore compiler errors */})
//     .pipe(dest('dist'))
// }

function tsFilesWatch() {
  return watch(['src/*.ts', 'src/**/*.ts'], tsTranspile)
}

exports.tsTranspile = tsTranspile;
exports.tsFilesWatch = tsFilesWatch;
