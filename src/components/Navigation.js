import React from 'react'
import { Link } from 'react-static'

import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

const Nav = styled.nav`
    width: 100%;
    background: ${props => props.bgColor};
    padding: 0 1rem;
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    text-align: right;

    a {
      padding: 1rem;
      display: inline-block;

      font-style: normal;
      font-weight: 500;
      line-height: 23px;
      font-size: 14px;
      text-align: right;
      text-transform: uppercase;

      color: ${props => props.fontColor};
    }

    a:last-child {
      padding-right: 0;
    }

  ${breakpoint('desktop')`
    padding: 0 5rem;
  `}
`


export default ({ pageName }) => {
  const bgColor = pageName === 'home' ? '#020100' : 'transparent'
  const fontColor = pageName === 'home' ? '#A8A8A8' : '#333'

  return (
    <header>
      <Nav bgColor={bgColor} fontColor={fontColor}>
        <Link exact to="/">Home</Link>
        <Link to="/#research">Research</Link>
        <Link to="/#team">Team</Link>
        { /* <Link to="/blog">Blog</Link> */ }
      </Nav>
    </header>
  )
}
