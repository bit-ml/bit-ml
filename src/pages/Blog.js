import React from 'react'
import { withRouteData, Link } from 'react-static'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import Head from 'components/Head'
import Nav from 'components/Navigation'
import Page from 'components/Page'
//


const BlogWrapper = styled.section`
  margin: 0 auto;
  max-width: 720px;
  padding: 0 1rem;

  ${breakpoint('desktop')`
    padding-left: 0 0 0 100px;
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

  /* Gray 1 */
  color: #333333;
`

const BlogList = styled.ul`
  padding-left: 0;
  &>li {
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 1.2rem;
    letter-spacing: 0.03em;
    list-style: none;
    margin-bottom: 1rem;
    &> a {
      color: #333;
      &:hover {
        color: #E6212B;
      }
    }
  }
`

export default withRouteData(({ posts }) => (
  <div>
    <Head
      title="Latest Blog Posts | Bitdefender Research"
      description="List of all the recent blog posts by Bitdefender's Machine Learning & Crypto Research Unit."
      tags={['machine-learning', 'research', 'bitdefender', 'posts']}
      image="https://bit-ml.github.io/tile.png" />

    <Nav pageName="blog" />

    <Page>
      <BlogWrapper>
        <Heading>Recent Posts</Heading>

        <BlogList>
          {posts.map((post, id) => (
            <li key={id}>
              <Link to={`/blog/post/${post.data.slug}/`}>{post.data.title}</Link>
            </li>
          ))}
        </BlogList>
      </BlogWrapper>
    </Page>

  </div>
))
