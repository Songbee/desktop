const gulp = require("gulp");
const rollup = require("gulp-rollup");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("rollup-plugin-babel");

gulp.task("js", () => {
  gulp.src("./src/**/*.js")
      .pipe(sourcemaps.init())
        .pipe(rollup({
          entry: ["src/app.js", "src/main.js"],
          format: "cjs",
          plugins: [babel()]
        }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("./dist"));
});

gulp.task("html", () => {
  gulp.src("./src/index.html")
      .pipe(gulp.dest("./dist"));
});

gulp.task("sample-torrents", () => {
  gulp.src("./src/torrents/*.torrent")
      .pipe(gulp.dest("./dist/torrents"));
});

gulp.task("default", ["html", "js"]);
