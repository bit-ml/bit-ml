import React from 'react'
import { Router } from 'react-static'
import Routes from 'react-static-routes'
import { hot } from 'react-hot-loader'

import CookieConsent from 'react-cookie-consent'
import ReactGA from 'react-ga'

import styled, { injectGlobal } from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import Normalize from 'components/Normalize'


// Initialize the Google Analytics script.
ReactGA.initialize('UA-11226891-6')
// ReactGA.set({ anonymizeIp: true, cookieExpires: 0 })


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
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 16px;
    padding: 0;
    background: #FFF;
  }

  h1 {
    display: block;
    margin: 0.67em 0;
  }
`

class App extends React.Component {
  componentDidMount = () => ReactGA.pageview(window.location.pathname + window.location.search);
  componentDidUpdate = () => ReactGA.pageview(window.location.pathname + window.location.search);

  render() {
    return (
      <Router>
        <div className="content">

          <Routes />

          <CookieConsent
            location="top"
            cookieName="gdpr_consent"
            expires={150}
            buttonText="Accept"
            onAccept={() => { }}
            style={{ background: "rgba(24,27,42, 1)" }}
            buttonStyle={{
              background: "transparent", color: "rgba(255,255,255,0.8)",
              fontSize: "16px", border: "1px solid #fff"
            }}
          >
            This website uses cookies for traffic analysis.
          </CookieConsent>
        </div>
      </Router>
    )
  }
}

export default hot(module)(App)
