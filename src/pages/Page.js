import { Link, withRouteData } from 'react-static'
import { color, space, typography } from 'styled-system'

import Head from 'components/Head'
import LightboxGallery from 'components/LightboxGallery'
import Nav from 'components/Navigation'
import React from 'react'
import breakpoint from 'styled-components-breakpoint'
import convert from 'htmr'
import striptags from 'striptags'
import styled from 'styled-components'

//

const PageWithCoverImg = styled.div`
  background-color: ${props => props.theme.colors.background}
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
  ${typography}
  ${color}
  ${space}
  text-transform: uppercase;
`
Heading.defaultProps = {
  mt: 1,
  mb: 2,
  p: 0,
  fontFamily: 'title',
  fontSize: 8,
  fontWeight: 2,
  lineHeight: 'title',
  color: 'highContrast',
}

const PostContent = styled.section`
  margin: 0 auto;
  max-width: 720px;

  > h2 {
    font-family: ${props => props.theme.fonts.title};
    font-size: ${props => props.theme.fontSizes[7]};
    font-weight: ${props => props.theme.fontWeights[2]};
    margin-top: ${props => props.theme.space[1]};
    margin-bottom: ${props => props.theme.space[1]};
    padding: ${props => props.theme.space[0]};
    line-height: ${props => props.theme.lineHeights.title};
  }

  > h3 {
    font-family: ${props => props.theme.fonts.title};
    font-size: ${props => props.theme.fontSizes[6]};
    font-weight: ${props => props.theme.fontWeights[2]};
    margin-top: ${props => props.theme.space[1]};
    margin-bottom: ${props => props.theme.space[0]};
    padding: ${props => props.theme.space[0]};
    line-height: ${props => props.theme.lineHeights.copy};
  }

  > h4 {
    font-family: ${props => props.theme.fonts.title};
    font-size: ${props => props.theme.fontSizes[5]};
    font-weight: ${props => props.theme.fontWeights[2]};
    margin-top: ${props => props.theme.space[1]};
    margin-bottom: ${props => props.theme.space[0]};
    padding: ${props => props.theme.space[0]};
    line-height: ${props => props.theme.lineHeights.copy};
  }

  > h5 {
    font-family: ${props => props.theme.fonts.title};
    font-size: ${props => props.theme.fontSizes[4]};
    font-weight: ${props => props.theme.fontWeights[2]};
    margin-top: ${props => props.theme.space[1]};
    margin-bottom: ${props => props.theme.space[0]};
    padding: ${props => props.theme.space[0]};
    line-height: ${props => props.theme.lineHeights.copy};
  }

  p {
    font-family: ${props => props.theme.fonts.body};
    font-size: ${props => props.theme.fontSizes[3]};
    font-weight: ${props => props.theme.fontWeights[0]};
    margin-top: ${props => props.theme.space[0]};
    margin-bottom: ${props => props.theme.space[1]};
    padding: 0;
    font-style: normal;
    letter-spacing: 0.03em;
    color: ${props => props.theme.colors.highContrast};
    > a {
      text-decoration: underline;
      color: ${props => props.theme.colors.highContrast};
      &:hover {
        color: ${props => props.theme.colors.brandRed};
      }
    }
    > strong {
      font-weight: ${props => props.theme.fontWeights[1]};
    }
  }


  ul, ol {
    margin-top: ${props => props.theme.space[0]};
    margin-bottom: ${props => props.theme.space[1]};
    font-weight: ${props => props.theme.fontWeights[0]};
    line-height: ${props => props.theme.lineHeights.copy};
  }




  > img,
  > p img {
    margin: 0 auto;
    display: block;
  }

  .title--separator {
    text-align: right;
    border-bottom: 1px solid ${props => props.theme.colors.lowContrast};
  }

  .mo {
    margin: 0;
  }
  .mo__link {
    display: flex;
    align-items: flex-start;
    padding: 0;
    color: #333;
  }
  .mo__img {
    width: 128px;
    margin: 0 1rem 0 0;
  }
  .mo__content {
    flex: 1;
    font-weight: 300;
  }
  .mo__title {
    font-weight: 500;
    font-size: 21px;
    margin: ${props => props.theme.space[0]};
  }
  .mo__body {
    font-size: ${props => props.theme.fontSizes[2]};
    line-height: ${props => props.theme.lineHeights.copy};
  }

  > blockquote {
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

    quotes: "\\201E""\\201C";
    &:before {
      display: inline-block;
      transform: translate(-15px, -15px);
      content: open-quote;
      color: ${props => props.theme.colors.lowContrast};
      font-size: 5rem;
      font-weight: 400;
    }

    > footer {
      margin-top: 10px;
      font-style: normal;
      font-weight: 400;
    }
  }
`

const PostWithGalleryWrapper = styled.div``

const Author = styled.p``

const PostFooter = styled.div`
  display: inline-block;
  background: #edebeb;
  width: 100%;
`

const PostFooterWraper = styled.div`
  display: flex;
  max-width: 720px;
  padding: 0 1rem;
  margin: 0 auto;

  & > p {
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
  return (
    <PostContent>

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

      {gallery_names.map((key, index) => (
        <LightboxGallery
          key={index}
          photo_set={galleries[key]}
          columns={columns[index]}
        />
      ))}
    </PostWithGalleryWrapper>
  )
}

export default withRouteData(({ post, galleries, test }) => {
  const hasGallery = Object.hasOwnProperty.call(post, 'galleries')
  const keywords = post.categories.replace(/ /g, '').split(',')
  const synopsis = striptags(post.contents)
    .substring(0, 350)
    .replace(/\n/g, '')

  return (
    <div>
      <Head
        title={`${post.title} | Bitdefender Research`}
        description={`${synopsis}...`}
        tags={keywords}
        image={post.featured_img}
      />

      <PageWithCoverImg>
        <CoverImg featured_img={post.featured_img} />

        <Post>
          <Nav pageName="post" />

          {hasGallery ? (
            <PostWithGallery post={post} galleries={galleries} test={test} />
          ) : (
            <SimplePost post={post} />
          )}

          <Footer post={post} />
        </Post>
      </PageWithCoverImg>
    </div>
  )
})
