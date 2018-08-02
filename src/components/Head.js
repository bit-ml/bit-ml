import React from 'react'
import { Head } from 'react-static'
//

export default ({
  children,
  title,
  description,
  tagline,
  path,
  tags,
}) => (
  <Head>
    {children}
    {title && <title>{title}</title>}

    {/* Generic */}
    {path && <link rel="canonical" href={path} />}

    {/* Schema.org markup */}
    {/* {title && <meta itemProp="name" content={title} />} */}

    {/* tagline && <meta itemProp="tagline" content={tagline} /> */}
    {/* description && <meta itemProp="description" content={description} /> */}
    {/* tags && <meta itemProp="keywords" content={tags.join(',')} /> */}
  </Head>
)
