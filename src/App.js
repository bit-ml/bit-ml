import styled, { ThemeProvider, injectGlobal } from 'styled-components'

import CookieConsent from 'react-cookie-consent'
import Normalize from 'components/Normalize'
import React from 'react'
import ReactGA from 'react-ga'
import { Router } from 'react-static'
import Routes from 'react-static-routes'
import { hot } from 'react-hot-loader'
import { theme } from './theme'

// Initialize the Google Analytics script.
ReactGA.initialize('UA-11226891-6')
// ReactGA.set({ anonymizeIp: true, cookieExpires: 0 })

injectGlobal`
  ${Normalize}

  html {
    font-size: 19px;
    box-sizing: border-box;
  }
  *,*::before,*::after {
    box-sizing:inherit;
  }

  body {
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    font-weight: 400;
    line-height: 1.78rem;
    padding: 0;
    background: #FFF;
  }

  h1 {
    display: block;
    margin: 0.67em 0;
  }
`

const VerticalRythm = styled.div`
  display: block;
  position: absolute;
  left: 0px;
  right: 0px;
  pointer-events: none;
  user-select: none;
  top: 0px;
  height: 1670px;
  background: rgba(0, 0, 0, 0) linear-gradient(rgba(0, 119, 179, 0.2) 1px, transparent 1px) repeat scroll left top / 34px 34px;
`

class App extends React.Component {
  componentDidMount = () =>
    ReactGA.pageview(window.location.pathname + window.location.search);
  componentDidUpdate = () =>
    ReactGA.pageview(window.location.pathname + window.location.search);

  render () {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <div className="content">
            <Routes />

            <CookieConsent
              location="top"
              cookieName="gdpr_consent"
              expires={150}
              buttonText="Accept"
              onAccept={() => {}}
              style={{ background: 'rgba(24,27,42, 1)' }}
              buttonStyle={{
                background: 'transparent',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '16px',
                border: '1px solid #fff',
              }}
            >
              This website uses cookies for traffic analysis.
            </CookieConsent>

            {/* <VerticalRythm /> */}

          </div>
        </Router>
      </ThemeProvider>
    )
  }
}

export default hot(module)(App)
