import React from 'react'
import { withRouteData, Link } from 'react-static'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import convert from 'htmr'
import striptags from 'striptags'

import Head from 'components/Head'
import Nav from 'components/Navigation'
import Page from 'components/Page'
import LightboxGallery from 'components/LightboxGallery'
//


const Post = styled.div`
  margin: 0 auto;
`

const Heading = styled.h1`
  font-family: 'Exo 2', sans-serif;
  margin: 4rem 0;
  font-style: normal;
  font-weight: 700;
  line-height: 3rem;
  font-size: 2.2rem;
  letter-spacing: 0.03em;
  //text-transform: uppercase;

  /* Gray 1 */
  color: #333333;
`

const PostContent = styled.section`
  margin: 0 auto;
  max-width: 720px;
  padding: 0 1rem;

  ${breakpoint('desktop')`
    padding-left: 0 0 0 100px;
  `}

  >p {
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    line-height: 1.8rem;
    font-size: 1.2rem;
    letter-spacing: 0.03em;

    /* Gray 1 */
    color: #333333;
    > strong {
      font-weight: 500;
    }
  }
`

const PostWithGalleryWrapper = styled.div`
`

const Author = styled.p`
`


const PostHeader = styled.div`
  display: flex;

  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8rem;
  letter-spacing: 0.03em;
`


const BackLink = styled(Link)`
  flex-grow: 1;
  color: #828282;
  &:hover {
    color: #E6212B;
  }
`

const Date = styled.small`
  flex-grow: 1;
  font-size: 1rem;
  //text-transform: uppercase;
  text-align: right;
  color: #828282;
`


const PostFooter = styled.div`
  display: inline-block;
  background: #EDEBEB;
  width: 100%;
`

const PostFooterWraper = styled.div`
  display: flex;
  max-width: 720px;
  padding: 0 1rem;
  margin: 0 auto;

  &>p {
    flex-grow: 1;
    color: #828282;
  }

  ${breakpoint('desktop')`
    padding-left: 0 0 0 100px;
  `}
`


function SimplePost ({ post }) {
  const date = post.date.replace('-', ' ').replace('-', ', ')
  return (
    <PostContent>
      <PostHeader>
        <BackLink to="/">{'<'} Back Home</BackLink>
        <Date>published on {date}</Date>
      </PostHeader>

      <Heading>{post.title}</Heading>

      {convert(post.contents)}

    </PostContent>
  )
}


const Footer = ({ post }) => (
  <PostFooter>
    <PostFooterWraper>
      {post.authors && <Author>written by {post.authors}</Author>}
      {/* post.categories && <p>tags: {post.categories}</p> */}
    </PostFooterWraper>
  </PostFooter>
)


function PostWithGallery ({ post, galleries }) {
  let gallery_names = post.galleries.replace(/ /g, '').split(',')
  const names_columns = gallery_names.map(x => x.split(':'))
  gallery_names = names_columns.map(x => x[0])
  const columns = names_columns.map(x => Number.parseInt(x[1], 10))

  return (
    <PostWithGalleryWrapper>
      <SimplePost post={post} />

      {
        gallery_names.map((key, index) => (
          <LightboxGallery
            key={index} photo_set={galleries[key]} columns={columns[index]} />
        ))
      }

      <Footer post={post} />
    </PostWithGalleryWrapper>
  )
}


export default withRouteData(({ post, galleries, test }) => {
  const hasGallery = Object.hasOwnProperty.call(post, 'galleries')
  const keywords = post.categories.replace(/ /g, '').split(',')
  const synopsis = striptags(post.contents).substring(0, 350).replace(/\n/g, '')

  return (
    <div>
      <Head
        title={`${post.title} | Bitdefender Research`}
        description={`${synopsis}...`}
        tags={keywords}
        image="https://bit-ml.github.io/tile.png" />

      <Nav pageName="post" />

      <Page>
        <Post>
          {
            hasGallery
            ? <PostWithGallery post={post} galleries={galleries} test={test} />
            : <SimplePost post={post} />
          }
        </Post>
      </Page>
    </div>
  )
})
