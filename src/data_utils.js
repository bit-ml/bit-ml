/* eslint-disable space-before-function-paren */
// import path from 'path'
import fs from 'fs'

const unified = require('unified')
const vfile = require('to-vfile')
const markdown = require('remark-parse')
const frontmatter = require('vfile-matter')
const math = require('remark-math')
const htmlKatex = require('remark-html-katex')
const prism = require('remark-prism')
const emoji = require('remark-emoji')
const hint = require('remark-hint')
const gfm = require('remark-gfm')
const html = require('remark-html')
// const { wikiLinkPlugin } = require('remark-wiki-link');
// const footnotes = require('remark-footnotes')
// const highlight = require('remark-highlight.js')


function extract_title_to_vFile(tree, file) {
  let title = ''
  try {
    title = tree.children[0].children[0].value
  } catch (error) {
    throw TypeError(error)
  }
  file.data.matter = {
    ...file.data.matter,
    title,
  }
}

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const processor = unified()
  .use(markdown)
  // .use(highlight)
  .use(() => extract_title_to_vFile)
  // .use(footnotes, { inlineNotes: true })
  .use(math)
  .use(htmlKatex)
  .use(gfm)
  .use(emoji)
  .use(prism, {
    plugins: [
      'prismjs/plugins/line-numbers/prism-line-numbers',
      'prismjs/plugins/show-invisibles/prism-show-invisibles',
    ],
  })
  .use(hint)
  // .use(wikiLinkPlugin, { hrefTemplate: permalink => `/notes/${permalink.replace(' ', '_')}/` })
  .use(html)


export const getContent = data_path => {

  const collection_names = getDirectories(data_path)
  const collections = {}

  collection_names.forEach(cname => {
    const cpath = `${data_path}/${cname}/`
    collections[cname] = []

    fs.readdirSync(cpath).forEach((f, i) => {
      const data = vfile.readSync(cpath + f)
      frontmatter(data, { strip: true })

      processor.process(data, (err, file) => {
        if (err) throw err
        file.data = { ...file.data.matter, id: i }
        collections[cname].push(file)
      })
    })
  })

  // extract_slug_(posts)
  return collections
}
