import React from 'react'
import { withRouteData, Link } from 'react-static'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import convert from 'htmr'
import striptags from 'striptags'

import Head from 'components/Head'
import Nav from 'components/Navigation'
import LightboxGallery from 'components/LightboxGallery'
//


const PageWithCoverImg = styled.div`
  ${breakpoint('desktop')`
    display: flex;
    justify-content: space-between;

    nav {
      padding: 0;
    }
  `}

  ${breakpoint('tablet')`
    display: flex;
    justify-content: space-between;
  `}
`


const Post = styled.div`
  margin: 0 auto;
  padding: 0 1rem;

  ${breakpoint('tablet')`
    max-width: 62%;
    padding: 0 2rem;
  `}

  ${breakpoint('desktop')`
    max-width: 62%;
    padding: 0 5rem;
  `}
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

  >p a {
    text-decoration: underline;
    color: #333;
    &:hover {color: #E6212B}
  }

  >img,
  > p img {
    margin: 0 auto;
    display: block;
  }

  >blockquote {
    font-size: 1.1rem;
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    font-style: italic;
    font-weight: 300;
    line-height: 1.8rem;
    letter-spacing: 0.03em;
    text-align: right;
    margin-right: 0;
    // background-color: #f2f2f2;
    padding: 24px;

    quotes: "\\201E" "\\201C";
    &:before{
      display: inline-block;
      transform: translate(-15px, -15px);
      content: open-quote;
      // color: #E6212B;
      color: #EDEBEB;
      font-size: 5rem;
      font-weight: 400;
    }
    
    >footer{
      margin-top: 10px;
      font-style: normal;
      font-weight: 400;
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


const CoverImg = styled.div`

  ${breakpoint('tablet')`
    background: #fff url(${props => props.featured_img}) no-repeat bottom;
    background-size: cover;
    position: sticky;
    top: 0;
    left: 0;
    height: 100vh;
    width: 38%;
  `}

  ${breakpoint('desktop')`
    background: #fff url(${props => props.featured_img}) no-repeat bottom;
    background-size: cover;
    position: sticky;
    top: 0;
    left: 0;
    height: 100vh;
    width: 38%;
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
        image={post.featured_img} />

      <PageWithCoverImg>
        <CoverImg featured_img={post.featured_img} />

        <Post>
          <Nav pageName="post" />

          {
            hasGallery
            ? <PostWithGallery post={post} galleries={galleries} test={test} />
            : <SimplePost post={post} />
          }

          <Footer post={post} />

        </Post>
      </PageWithCoverImg>
    </div>
  )
})
