const gulp = require("gulp");
const filter = require("gulp-filter");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");

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
