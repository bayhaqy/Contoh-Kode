const gulp = require('gulp');
const tailwindcss = require('tailwindcss');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');

gulp.task('tailwind', () => {
    return gulp.src('./src/**/styles/*.css')
        .pipe(postcss([
            tailwindcss(),
            autoprefixer(),
            cssnano({ preset: 'default' }),
        ]))
        .pipe(rename((file) => {
            // Extract the first directory name using regular expression
            const dirname = file.dirname.match(/([^\/]*)\/*$/)[1];
            file.dirname = 'dist'; // Set the new directory path
            file.basename = dirname + '.min'; // Set the new base name
        }))
        .pipe(gulp.dest('.'));
});
