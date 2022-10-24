import fs from 'fs'
import React, { Component } from 'react'
import { reloadRoutes } from 'react-static/node'
import chokidar from 'chokidar'
import ImageSize from 'image-size'
import { ServerStyleSheet } from 'styled-components'

import { getContent } from './src/data_utils'

import PeopleJSON from './src/data/people'
import TeamsJSON from './src/data/teams'
import ProjectsJSON from './src/data/projects'


chokidar.watch('content').on('all', () => reloadRoutes())

function getGalleries() {
  const galleries_path = 'public/galleries/'
  const galleries = {}

  fs.readdirSync(galleries_path).forEach(item => {
    const gallery_path = galleries_path + item

    if (fs.statSync(gallery_path).isDirectory()) {
      galleries[item] = []
      fs.readdirSync(gallery_path).forEach(file => {
        // should do another verification here
        const dims = ImageSize(`public/galleries/${item}/${file}`)
        galleries[item].push({
          src: `/galleries/${item}/${file}`,
          width: dims.width,
          height: dims.height,
        })
      })
    }
  })
  return galleries
}

const { data: specialties } = { data: ProjectsJSON }
const { data: people } = { data: PeopleJSON }
const { data: teams } = { data: TeamsJSON }
// const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
// const { posts, courses } = await jdown('content')
const { galleries } = { galleries: getGalleries() }
const { posts, courses } = getContent('./content/collections')

export default {
  siteRoot: 'https://bit-ml.github.io',
  getSiteData: () => ({
    title: 'Bitdefender Machine Learning & Crypto Research Unit',
    description:
      'Bitdefender Machine Learning & Crypto Research Unit goals are to further the fields of machine learning and criptography while engaging with the international research community and to develop the local AI&ML scene by supporting and participating in local conferences, lecture and research groups.',
    tagline: 'Engaging with the broader Machine Learning Community.',
    tags: ['machine-learning', 'research', 'bitdefender'],
  }),

  getRoutes: async () => {
    posts.forEach(post => console.log(post.data.slug, Object.keys(post)))

    return [
      {
        path: '/',
        component: 'src/pages/Home',
        getData: () => ({
          specialties,
          people,
          teams,
          posts,
        }),
      },
      {
        path: '/blog',
        component: 'src/pages/Blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.data.slug}`,
          component: 'src/pages/Post',
          getData: () => ({
            post,
            galleries,
          }),
        })),
      },
      {
        path: '/teaching',
        // component: "src/pages/Blog",
        // getData: () => ({
        //   posts
        // }),
        children: courses.map(post => ({
          path: `/${post.data.slug}`,
          component: 'src/pages/Page',
          getData: () => ({
            post,
            galleries,
          }),
        })),
      },
      {
        is404: true,
        component: 'src/pages/404',
      },
    ]
  },

  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },

  Document: class CustomHtml extends Component {
    render() {
      const {
        Html, Head, Body, children, renderMeta, siteData,
      } = this.props

      return (
        <Html>
          <Head>
            <title>{`${siteData.title} | ${siteData.tagline}`}</title>

            <meta charSet="UTF-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <link rel="apple-touch-icon" href="icon.png" />

            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
}
