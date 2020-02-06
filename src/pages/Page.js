import { color, space, typography } from 'styled-system'

import Head from 'components/Head'
import LightboxGallery from 'components/LightboxGallery'
import Nav from 'components/Navigation'
import React from 'react'
import breakpoint from 'styled-components-breakpoint'
import convert from 'htmr'
import striptags from 'striptags'
import styled from 'styled-components'
import { withRouteData } from 'react-static'

//

const PageWithCoverImg = styled.div`
  background-color: ${props => props.theme.colors.background}
    ${breakpoint('desktop')`
    display: flex;
    justify-content: space-between;

    nav {
      padding: 0;
    }
  `} ${breakpoint('tablet')`
    display: flex;
    justify-content: space-between;
  `};
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
  // text-transform: uppercase;
`
Heading.defaultProps = {
  mt: 1,
  mb: 2,
  p: 0,
  fontFamily: 'title',
  fontSize: 8,
  titleWeight: 'titleSemi',
  lineHeight: 'title',
  color: 'highContrast',
}

const PostContent = styled.section`
  margin: 0 auto;
  max-width: 720px;

  > h1 {
    font-family: ${props => props.theme.fonts.title};
    font-size: ${props => props.theme.fontSizes[8]};
    font-weight: ${props => props.theme.fontWeights.titleSemi};
    margin-top: ${props => props.theme.space[1]};
    margin-bottom: ${props => props.theme.space[1]};
    padding: ${props => props.theme.space[0]};
    line-height: ${props => props.theme.lineHeights.title};
    > span {
      display: block;
      font-size: ${props => props.theme.fontSizes[5]};
    }
  }

  > h2 {
    font-family: ${props => props.theme.fonts.title};
    font-size: ${props => props.theme.fontSizes[7]};
    font-weight: ${props => props.theme.fontWeights.titleSemi};
    margin-top: ${props => props.theme.space[1]};
    margin-bottom: ${props => props.theme.space[1]};
    padding: ${props => props.theme.space[0]};
    line-height: ${props => props.theme.lineHeights.title};
  }

  > h3 {
    font-family: ${props => props.theme.fonts.title};
    font-size: ${props => props.theme.fontSizes[6]};
    font-weight: ${props => props.theme.fontWeights.titleSemi};
    margin-top: ${props => props.theme.space[1]};
    margin-bottom: ${props => props.theme.space[1]};
    padding: ${props => props.theme.space[0]};
    line-height: ${props => props.theme.lineHeights.copy};
  }

  > h4 {
    font-family: ${props => props.theme.fonts.title};
    font-size: ${props => props.theme.fontSizes[5]};
    font-weight: ${props => props.theme.fontWeights.titleSemi};
    margin-top: ${props => props.theme.space[1]};
    margin-bottom: ${props => props.theme.space[1]};
    padding: ${props => props.theme.space[0]};
    line-height: ${props => props.theme.lineHeights.copy};
  }

  > h5 {
    font-family: ${props => props.theme.fonts.title};
    font-size: ${props => props.theme.fontSizes[4]};
    font-weight: ${props => props.theme.fontWeights.titleSemi};
    margin-top: ${props => props.theme.space[1]};
    margin-bottom: ${props => props.theme.space[0]};
    padding: ${props => props.theme.space[0]};
    line-height: ${props => props.theme.lineHeights.copy};
  }

  p {
    font-family: ${props => props.theme.fonts.body};
    font-size: ${props => props.theme.fontSizes[3]};
    font-weight: ${props => props.theme.fontWeights.bodyNormal};
    margin-top: ${props => props.theme.space[0]};
    margin-bottom: ${props => props.theme.space[1]};
    padding: 0;
    font-style: normal;
    letter-spacing: 0.03em;
    color: ${props => props.theme.colors.highContrast};

    > strong {
      font-weight: ${props => props.theme.fontWeights.bodyBold};
    }
  }

  a {
    text-decoration: underline;
    color: ${props => props.theme.colors.highContrast};
    &:hover {
      color: ${props => props.theme.colors.brandRed};
    }
  }

  ul,
  ol {
    margin-top: ${props => props.theme.space[0]};
    margin-bottom: ${props => props.theme.space[1]};
    font-weight: ${props => props.theme.fontWeights.bodyNormal};
    line-height: ${props => props.theme.lineHeights.copy};
    > li ul {
      margin-bottom: ${props => props.theme.space[0]};
    }
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
    &:hover {
      background-color: ${props => props.theme.colors.tintedBackground};
    }
    padding: 5px;
  }
  .mo__link {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    padding: 0;
    color: ${props => props.theme.colors.highContrast};
    &:hover {
      color: ${props => props.theme.colors.highContrast};
    }
    flex-wrap: wrap;
    text-decoration: none;
    ${breakpoint('desktop')`
      justify-content: flex-end;
    `}
  }
  .mo__img {
    flex-basis: auto;
    margin: 0 1rem 0 0;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    ${breakpoint('desktop')`
      width: 100px;
      height: 100px;
    `}
  }
  .mo__header {
    flex-grow: 1;
    flex-basis: 100px;
  }
  .mo__title {
    font-weight: 500;
    font-size: ${props => props.theme.fontSizes[3]};
    margin: ${props => props.theme.space[0]};
    ${breakpoint('desktop')`
      font-size: ${props => props.theme.fontSizes[4]};
    `}
  }
  .mo__body {
    font-size: ${props => props.theme.fontSizes[2]};
    font-weight: ${props => props.theme.fontWeights.bodyNormal};
    line-height: ${props => props.theme.lineHeights.small};
    flex-grow: 0;
    ${breakpoint('desktop')`
      width: calc(100% - (100px + 1rem));
    `}
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
      {/* <Heading>{post.title}</Heading> */}
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

function checkGallery (post) {
  let hasGallery = Object.hasOwnProperty.call(post, 'galleries')
  if (hasGallery === true) {
    if (post.galleries == null) {
      console.log(
        'Warning, you have a gallery field in in your markdown ' +
          'but it has no value.',
        post.galleries
      )
      hasGallery = false
    }
  }
  return hasGallery
}

export default withRouteData(({ post, galleries, test }) => {
  const hasGallery = checkGallery(post)
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
