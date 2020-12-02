/* 文件
 * @Author: 张泽涛
 * @Date: 2020-11-30 21:29:14
 * @LastEditTime: 2020-12-02 21:54:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pages-boilerplate\gulpfile.js
 */
// 实现这个项目的构建任务
const del = require('del');
const browserSync = require('browser-sync');

const { src, dest, parallel, series, watch } = require("gulp")
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
const bs = browserSync.create()
// const plugins.sass = require("gulp-sass")
// const plugins.babel = require("gulp-babel")
// const plugins.swig = require("gulp-swig")
// const plugins.imagemin = require("gulp-imagemin")

// 当前命令行的工作目录
const cwd = process.cwd()
// 默认配置
let config = {
    // default
    build: {
        src: 'src',
        dist: 'dist',
        temp: 'temp',
        public: 'public',
        paths: {
            styles: 'assets/styles/*.scss',
            scripts: 'assets/scripts/*.js', 
            pages: '*.html', 
            images: 'assets/images/**',
            fonts: 'assets/fonts/**',
        }
    }
}

try {
  const loadConfig = require(`${cwd}/pages.config.js`)
  config = Object.assign({},config, loadConfig)
} catch (error) {
    
}
// 删除文件及文件夹
const clean = () => {
    // temp临时目录
    return del([config.build.dist, config.build.temp])
}
// 将scss样式文件处理为css可运行文件
const style = () => {
    return src(config.build.paths.styles, { base: config.build.src,cwd: config.build.src })
        .pipe(plugins.sass({ outputStyle: 'expanded' }))
        .pipe(dest(config.build.temp))
        .pipe(bs.reload({ stream: true }))
}
// js转换为低语法的js
const script = () => {
    return src(config.build.paths.scripts, { base: config.build.src,cwd: config.build.src })
        // require优先本项目的node_module
        .pipe(plugins.babel({ presets: [require('@babel/preset-env')] }))
        .pipe(dest(config.build.temp))
        .pipe(bs.reload({ stream: true }))
}
// 页面把数据渲染到模本引擎
const page = () => {
    return src(config.build.paths.pages, { base: config.build.src,cwd: config.build.src })
        .pipe(plugins.swig({ data:config.data, defaults: { cache: false } }))
        .pipe(dest(config.build.temp))
        .pipe(bs.reload({ stream: true }))
}

// useref不被影响的不放到临时文件
// 图片无损压缩
const image = () => {
    return src(config.build.paths.images, { base: config.build.src,cwd: config.build.src })
        .pipe(plugins.imagemin())
        .pipe(dest(config.build.dist))
}

// 字体无损压缩
const font = () => {
    return src(config.build.paths.fonts, { base: config.build.src,cwd: config.build.src })
        .pipe(plugins.imagemin())
        .pipe(dest(config.build.dist))
}

// 其他文件
const extra = () => {
    return src('**', { base: config.build.public,cwd: config.build.public })
        .pipe(dest(config.build.dist));
}
// 开发服务器
const serve = () => {
    watch(config.build.paths.styles,{cwd: config.build.src}, style)
    watch(config.build.paths.scripts,{cwd: config.build.src}, script)
    watch(config.build.paths.pages,{cwd: config.build.src}, page)
    watch([
        config.build.paths.images,
        config.build.paths.fonts
    ], {cwd: config.build.src},bs.reload)
    watch('**',{cwd: config.build.public},bs.reload)
    bs.init({
        notify: false,
        port: 2080,
        // open: false,
        // files: 'dist/**',
        server: {
            baseDir: [config.build.temp, config.build.dist, config.build.public],
            routes: {
                '/node_modules': 'node_modules',
            }
        }
    })
}

//合并文件
const useref = () => {
    return src(config.build.paths.pages, { base: config.build.temp,cwd: config.build.temp })
        // 根据注释合并文件
        .pipe(plugins.useref({ searchPath: [config.build.temp, '.'] }))
        // 文件压缩 js css html
        // 压缩js
        .pipe(plugins.if(/\.js$/, plugins.uglify()))
        // 压缩css
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
        // 压缩html
        .pipe(plugins.if(/\.html$/, plugins.htmlmin({
            collapseWhitespace: true,//换行符和空格
            minifyCss: true,//css换行符
            minifyJs: true,//js换行符
        })))
        .pipe(dest(config.build.dist))
}

const complie = parallel(style, script, page)
const build = series(
    clean,//清除
    parallel(
        series(complie, useref),//编译合并
        image,
        font,
        extra
    )
)
const develop = series(complie, serve)
module.exports = {
    clean,
    develop,
    build
}