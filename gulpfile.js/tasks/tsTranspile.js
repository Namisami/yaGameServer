const { src, dest, watch } = require('gulp');
const ts = require('gulp-typescript');


const tsTranspiler = ts.createProject({
  noImplicitAny: true,
  removeComments: true,
})

function tsTranspile() {
  return src(['src/*.ts', 'src/**/*.ts'])
    .pipe(tsTranspiler())
    .on("error", () => { /* Ignore compiler errors */})
    .pipe(dest('dist'))
}

function tsFilesWatch() {
  return watch(['src/*.ts', 'src/**/*.ts'], tsTranspile)
}

exports.tsTranspile = tsTranspile;
exports.tsFilesWatch = tsFilesWatch;
