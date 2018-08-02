import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'

import ProjectsJSON from './src/data/projects'
import PeopleJSON from './src/data/people'


export default {
  siteRoot: 'https://bit-ml.github.io',
  getSiteData: () => ({
    title: 'Bitdefender Machine Learning and Crypto Research Unit',
    description: 'Bitdefender Machine Learning & Crypto Research Unit goals are to further the fields of machine learning and criptography while engaging with the international research community and to develop the local AI&ML scene by supporting and participating in local conferences, lecture and research groups.',
    tagline: 'Engaging with the broader Machine Learning Community.',
    tags: ['machine-learning', 'research', 'bitdefender'],
  }),

  getRoutes: async () => {
    const { data: specialties } = { data: ProjectsJSON }
    const { data: people } = { data: PeopleJSON }

    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getData: () => ({
          specialties, people,
        }),
      },
      {
        is404: true,
        component: 'src/containers/404',
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
    render () {
      const {
        Html, Head, Body, children, renderMeta, siteData,
      } = this.props

      return (
        <Html>
          <Head>
            <title>{`${siteData.title} | ${siteData.tagline}`}</title>
            <meta name="description" content={siteData.description} />
            <meta name="keywords" content={siteData.tags.join(',')} />

            <meta charSet="UTF-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <link rel="apple-touch-icon" href="icon.png" />

            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
}
