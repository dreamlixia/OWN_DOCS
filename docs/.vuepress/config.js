const getConfig = require('./lib')
const config = getConfig('src');

module.exports = {
    title: '演示文档',
    description: '这是一段描述文字',
    themeConfig: {
        ...config,
        logo: "https://cdn4.buysellads.net/uu/1/41334/1550855401-cc_light.png",
        nav: [
            // { text: 'Home', link: '/' },
            { text: 'HTML', link: '/src/HTML/' },
            { text: 'JS', link: '/src/JS/' }
        ],
        displayAllHeaders: true //显示所有页面的标题链接
    }
}