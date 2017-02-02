const gulp = require("gulp");
const filter = require("gulp-filter");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const asar = require("gulp-asar");

gulp.task("build", () => {
  const f = {
    noModules: filter(["!node_modules/**/*"], { restore: true }),
    js: filter(["**/*.js"], { restore: true })
  };

  // HACK: The * in the `src*` is to trick gulp to use `.`-relative path in
  //       `file.relative` instead of `./src`-relative. The first `./src/`
  //       forces gulp-asar to create a directory in which the contents
  //       would be put. This all should be fixed and cleaned up.

  gulp.src([
    "./package.json",
    "./node_modules*/**",
    "./src*/**",

    // Do not include Electron and READMEs (which are surprisingly big)
    "!./node_modules/.bin/**",
    "!./node_modules/electron*/**",
    "!./node_modules/gulp*/**",
    "!./node_modules/gulp*",
    "!./**/README*",
  ]).pipe(f.noModules)
    .pipe(f.js)
      .pipe(sourcemaps.init())
        .pipe(babel())
      .pipe(sourcemaps.write())
    .pipe(f.js.restore)
    .pipe(f.noModules.restore)
    .pipe(asar("songbee.asar"))
    .pipe(gulp.dest("./dist"));
});

gulp.task("default", ["build"]);
