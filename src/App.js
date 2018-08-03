import React from 'react'
import { Router, Link } from 'react-static'
import Routes from 'react-static-routes'
import { hot } from 'react-hot-loader'

import ReactGA from 'react-ga'

import styled, { injectGlobal } from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import Normalize from 'components/Normalize'


// Initialize the Google Analytics script.
ReactGA.initialize('UA-11226891-6')


injectGlobal`
	${Normalize}

  html {
      box-sizing: border-box;
      font-size: 16px;
  }
  *,*::before,*::after {
      box-sizing:inherit;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    padding: 0;
    background: #EDEBEB;
  }

  h1 {
    display: block;
    margin: 0.67em 0;
  }
`

const AppStyles = styled.div`
  a {
    text-decoration: none;
    color: #108db8;
    font-weight: bold;
  }

  nav {
    width: 100%;
    background: #020100;
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

      color: #A8A8A8;
    }

    a:last-child {
      padding-right: 0;
    }

  ${breakpoint('desktop')`
    padding: 0 5rem;
  `}

  }

  img {
    max-width: 100%;
  }
`

class App extends React.Component {
  componentDidMount = () => ReactGA.pageview(window.location.pathname + window.location.search);
  componentDidUpdate = () => ReactGA.pageview(window.location.pathname + window.location.search);

  render () {
    return (
      <Router>
        <AppStyles>
          <nav>
            <Link exact to="/">Home</Link>
            <Link to="/#research">Research</Link>
            <Link to="/#team">Team</Link>
          </nav>
          <div className="content">
            <Routes />
          </div>
        </AppStyles>
      </Router>
    )
  }
}

export default hot(module)(App)
