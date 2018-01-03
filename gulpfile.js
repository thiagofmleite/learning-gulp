var gulp = require('gulp');
    imagemin = require('gulp-imagemin');
    clean = require('gulp-clean');
    concat = require('gulp-concat');
    htmlReplce = require('gulp-html-replace');
    uglify = require('gulp-uglify');
    usemin = require('gulp-usemin');
    cssmin = require('gulp-cssmin');
    browserSync = require('browser-sync');
    jshint = require('gulp-jshint');
    jshintStylish = require('jshint-stylish');
    csslint = require('gulp-csslint');
    autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['copy'], function(){
    console.log('Executando tarefa padrão...');
    gulp.start('build-img', 'usemin');
});

gulp.task('copy', ['clean'], function(){
    console.log('Copiando arquivos...');
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(){
    console.log('Limpando a pasta dist');
    var stream = gulp.src('dist')
        .pipe(clean());
    // Assim evitamos que a tarefa execute de maneira assíncrona e conflite com a copy
    return stream;
});

gulp.task('build-img', function(){
    console.log('Otimizando as imagens...');
    gulp.src('dist/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', function(){
    gulp.src('dist/**/*.html')
        .pipe(usemin({
            'js': [uglify],
            'css': [autoprefixer, cssmin]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/**/*.js').on('change', function(event){
       gulp.src(event.path)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish))
    });

    gulp.watch('src/**/*.css').on('change', function(event){
       gulp.src(event.path)
        .pipe(csslint())
        .pipe(csslint.reporter())
    });

    gulp.watch('src/**/*').on('change', browserSync.reload);
    
});

// gulp.task('build-js', function(){
//     console.log('Concatenando os JS...');
//     gulp.src(['dist/js/jquery.js', 'dist/js/home.js', 'dist/js/produto.js'])
//         .pipe(concat('all.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'))
// });

// gulp.task('build-html', function(){
//     console.log('Alterando o HTML');
//     gulp.src('dist/**/*.html')
//         .pipe(htmlReplce({
//             js: 'js/all.js'
//         }))
//         .pipe(gulp.dest('dist'));
    
// });