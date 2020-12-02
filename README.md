# tdn-pages

[![NPM Downloads][downloads-image]][downloads-url]
[![NPM Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> static web app workflow

## Installation

```shell
$ npm install tdn-pages

# or yarn
$ yarn add tdn-pages
```

## Usage

有三个命令可以使用

  tdn-pages clean 

清除构建文件夹 

  tdn-pages  develop 

静态开发网页 会开启开发服务器，提供热更新

支持e6+和scss开发

  tdn-pages  build

构建生产环境代码



在根目录添加文件pages.config.js 可以配置初始化 文件路径和文件名称和页面数据

默认为

```javascript
module.exports = {
    build: {
        // 代码开发路径
        src: 'src',
        // 生产路径
        dist: 'dist',
        // 临时文件路径
        temp: 'temp',
        // 公共文件路径
        public: 'public',
        paths: {
            // 样式
            styles: 'assets/styles/*.scss',
            // js
            scripts: 'assets/scripts/*.js', 
            // 页面
            pages: '*.html', 
            // 图片
            images: 'assets/images/**',
            // 字体
            fonts: 'assets/fonts/**',
        }
    },
    // 页面渲染引擎数据
    data: {
        menus: [
            {
                name: 'Home',
                icon: 'aperture',
                link: 'index.html'
            },
            {
                name: 'Features',
                link: 'features.html'
            },
            {
                name: 'About',
                link: 'about.html'
            },
            {
                name: 'Contact',
                link: '#',
                children: [
                    {
                        name: 'Twitter',
                        link: 'https://twitter.com/w_zce'
                    },
                    {
                        name: 'About',
                        link: 'https://weibo.com/zceme'
                    },
                    {
                        name: 'divider'
                    },
                    {
                        name: 'About',
                        link: 'https://github.com/zce'
                    }
                ]
            }
        ],
        pkg: require('./package.json'),
        date: new Date()
    }
}
```



## API

<!-- TODO: Introduction of API -->

### tdnPages(name[, options])

#### name

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'zce.me'`

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; tdn <2387083001@qq.com>



[downloads-image]: https://img.shields.io/npm/dm/tdn-pages.svg
[downloads-url]: https://npmjs.org/package/tdn-pages
[version-image]: https://img.shields.io/npm/v/tdn-pages.svg
[version-url]: https://npmjs.org/package/tdn-pages
[license-image]: https://img.shields.io/github/license/mashedpotato2018/tdn-pages.svg
[license-url]: https://github.com/mashedpotato2018/tdn-pages/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/mashedpotato2018/tdn-pages.svg
[dependency-url]: https://david-dm.org/mashedpotato2018/tdn-pages
[devdependency-image]: https://img.shields.io/david/dev/mashedpotato2018/tdn-pages.svg
[devdependency-url]: https://david-dm.org/mashedpotato2018/tdn-pages?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: https://standardjs.com
