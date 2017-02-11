const gulp = require("gulp");
const filter = require("gulp-filter");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const yarn = require("gulp-yarn");
const del = require("del");

gulp.task("build", () => {
  const f = {
    js: filter(['**/*.js'], { restore: true })
  };
  return gulp.src("./src/**")
    .pipe(f.js)
      .pipe(sourcemaps.init())
        .pipe(babel())
      .pipe(sourcemaps.write())
    .pipe(f.js.restore)
    .pipe(gulp.dest("./dist"));
});

gulp.task("default", ["build"]);
gulp.task("vendor", function() {
  return gulp.src(["./package.json", "./yarn.lock"])
    .pipe(gulp.dest("./dist"))
    .pipe(yarn({ production: true }));
});

gulp.task("clean", function() {
    return del(["./build"]);
});
