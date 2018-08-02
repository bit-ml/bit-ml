
import React from 'react'
import { withRouteData, Link } from 'react-static'
//

export default withRouteData(({ posts }) => (
  <div>
    <h1>Recent Posts.</h1>
    <br />
    All Posts:
    <ul>
      {posts.map((post, id) => (
        <li key={id}>
          <Link to={`/blog/post/${post.slug}/`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  </div>
))
