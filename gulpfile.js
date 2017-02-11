const gulp = require("gulp");
const filter = require("gulp-filter");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const yarn = require("gulp-yarn");
const asar = require("gulp-asar");
const del = require("del");
const runSequence = require("run-sequence");

gulp.task("dist", () => {
  const f = {
    js: filter(["**/*.js"], { restore: true })
  };
  return gulp.src("./src/**")
    .pipe(f.js)
      .pipe(sourcemaps.init())
        .pipe(babel())
      .pipe(sourcemaps.write())
    .pipe(f.js.restore)
    .pipe(gulp.dest("./dist"));
});

gulp.task("vendor", function() {
  return gulp.src(["./package.json", "./yarn.lock"])
    .pipe(gulp.dest("./dist"))
    .pipe(yarn({ production: true }));
});

gulp.task("clean", function() {
    return del(["./build"]);
});

gulp.task("package", function() {
  return gulp.src("dist/**/*")
    .pipe(asar("songbee.asar"))
    .pipe(gulp.dest("./build"));
});

gulp.task("build:dev", cb => { runSequence(
  "clean",
  ["dist", "vendor"],
  cb
)});

gulp.task("build:prod", cb => { runSequence(
  "clean",
  ["dist", "vendor"],
  "package",
  cb
)});

gulp.task("default", ["build:dev"]);
