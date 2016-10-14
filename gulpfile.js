var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),         //压缩css
    uglify = require('gulp-uglify'),                //压缩js
    minifyhtml = require('gulp-minify-html'),       //压缩html
    concat = require('gulp-concat'),                //文件合并
    rev = require('gulp-rev'),                      //对文件名加MD5后缀
    revCollector = require('gulp-rev-collector'),   //gulp-rev的插件，用于html模板更改引用路径
    del = require('del');                           //删除文件及目录


gulp.task('minifycss', function(){
    return gulp.src('assets/css/*.css')
        .pipe(concat('app.css'))
        .pipe(rev())
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});

gulp.task('images', function(){
    return gulp.src('assets/images/*')
        .pipe(gulp.dest('dist/images'))
});

gulp.task('minifyjs', function(){
    //return gulp.src('assets/js/**/*.js')
    return gulp.src([
            'assets/js/libs/zepto.js', 
            'assets/js/libs/touch.js',  
            'assets/js/libs/swiper.jquery.js',  
            'assets/js/libs/swiper.animate.js',  
            'assets/js/*.js'
        ])
        .pipe(concat('app.js'))
        .pipe(rev())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});

gulp.task('clean', function(){
    del(['dist/css', 'dist/js', 'dist/images']);
});

gulp.task('rev', function(){
    return gulp.src(['rev/**/*.json', './index.html'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(minifyhtml({
            empty:true,
            spare:true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean', 'minifycss', 'minifyjs'], function(){
    gulp.start('rev', 'images');
});