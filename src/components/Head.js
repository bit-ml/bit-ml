import React from 'react'
import { Head } from 'react-static'
//


export default ({
  children,
  title,
  description,
  path,
  images,
  tags,
  wordCount,
}) => (
  <Head>
    {children}
    {title && <title>{title}</title>}

    {/* Generic */}
    {path && <link rel="canonical" href={path} />}

    {/* Schema.org markup */}
    {/* {title && <meta itemProp="name" content={title} />} */}
    {description && <meta itemProp="description" content={description} />}
    {images &&
      images.slice(0, 6).map(image => <meta key={image} itemProp="image" content={image} />)}
    {tags && <meta itemProp="keywords" content={tags.join(',')} />}
    {wordCount && <meta itemProp="wordCount" content={wordCount} />}
  </Head>
)
