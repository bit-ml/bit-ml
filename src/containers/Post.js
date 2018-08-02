import React from 'react'
import { withRouteData, Link } from 'react-static'
import styled from 'styled-components'
import convert from 'htmr'
import LightboxGallery from 'components/LightboxGallery'
//


const Post = styled.div`
  margin: 0 auto;
`

const PostContent = styled.div`
  margin: 0 auto;
  max-width: 620px;
`


export default withRouteData(({ post, galleries }) => {
  const hasGallery = post.hasOwnProperty('galleries')
  let gallery_names = false
  if (hasGallery) {
    gallery_names = post.galleries.replace(/ /g, '').split(',')
  }

  return (
    <Post>
      <PostContent>
        <Link to="/blog/">{'<'} Back</Link>
        <br />
        <p>{galleries.tmlss2018_posters[0].width}</p>
        <h3>{post.title}</h3>
        <p>{post.gallery}</p>
        <p>{post.category}</p>
        {convert(post.contents)}

      </PostContent>

      {hasGallery ?
        gallery_names.map((key, index) => (
          <LightboxGallery key={index} photo_set={galleries[key]} />
        ))
      : <div />}
    </Post>
  )
})
