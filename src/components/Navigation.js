import { Link } from 'react-static'
import React from 'react'
import breakpoint from 'styled-components-breakpoint'
import styled from 'styled-components'

const Nav = styled.nav`
    width: 100%;
    background: ${props => props.bgColor};
    padding: 0 1rem;
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    display: flex;
    justify-content: space-between;

    a {
      padding: 0.5rem 0 0.25rem 0;

      font-style: normal;
      font-weight: 500;
      line-height: 23px;
      font-size: 14px;
      text-align: right;
      text-transform: uppercase;

      color: ${props => props.fontColor};
    }

    a:last-child {
      padding: 0.5rem;
      padding-right: 0;
    }

  ${breakpoint('desktop')`
    padding: 0 5rem;
    justify-content: flex-end;
    a {
      padding: 0.5rem 1rem 0.25rem 1rem;
    }
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
        <Link to="/teaching/lectures-and-courses">Teaching</Link>
        {/* <Link to="/blog">Blog</Link> */}
      </Nav>
    </header>
  )
}
