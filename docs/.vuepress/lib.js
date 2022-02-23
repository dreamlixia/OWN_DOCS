const dirTree = require("directory-tree")
const path = require('path')

const compose = (...arg) => arg.reduce((a, b) => (...args) => a(b(...args)))

const getPath = (file) => path.resolve(__dirname, '..', file || '')

const getDir = (dir) => dirTree(dir, { extensions: /\.md/ })

const getContext = (root = {}) => {
    const { children = [], name } = root;

    const recursion = (item, prefix = []) => {
        const { name, children = [], type } = item
        const title = decodeURIComponent(name.replace(/\.md/, '').replace('README', ''))
        const links = prefix.concat(title)
        const link = links.join('/')

        if (type !== 'directory') {
            return title ? { title, path: link } : link
        }

        return {
            link: link.concat('/'),
            title,
            collapsable: true,
            children: children.map(item => recursion(item, links))
        }
    }

    return children.map(child => recursion(child, [`/${name}`]))
}

const getTree = compose(
    getContext,
    getDir,
    getPath
)

module.exports = compose(
    (context) => ({
        // nav: context.map(({title: text, link}) => ({ text, link })),
        sidebar: context.reduce((tree, side) => (tree[side.link] = side.children, tree), {})
    }),
    getTree
)