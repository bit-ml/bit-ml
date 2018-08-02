import React from 'react'
import { Head } from 'react-static'
//


const siteTitle = 'https://bit-ml.github.io/'
const siteTwitter = ''

export default ({
  children,
  title,
  description,
  tagline,
  image,
  path,
  tags,
}) => (
  <Head>
    {children}
    {title && <title>{title}</title>}

    {/* Generic */}
    {path && <link rel="canonical" href={path} />}
    {/* description && <meta name="description" content={description} /> */}
    {/* tags && <meta name="keywords" content={tags.join(',')} /> */}

    {/* Required Open Graph Info */}
    {title && <meta property="og:title" content={title} />}
    {description && <meta property="og:description" content={description} />}
    {siteTitle && <meta property="og:site_name" content={siteTitle} />}
    {tags && tags.slice(0, 6).map(tag => <meta key={tag} property="article:tag" content={tag} />)}
    {image && <meta key={image} itemProp="image" content={image} />}

    {/* Twitter Cards */}
    <meta name="twitter:card" content="summary" />
    {siteTwitter && <meta name="twitter:site" content={siteTwitter} />}
    {title && <meta name="twitter:title" content={title} />}
    {description && <meta name="twitter:description" content={description} />}
    {image && <meta name="twitter:image" content={image} />}

    {/* Schema.org markup */}
    {description && <meta itemProp="description" content={description} />}
    {tags && <meta itemProp="keywords" content={tags.join(',')} />}
  </Head>
)
