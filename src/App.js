import React from 'react'
import { Router } from 'react-static'
import Routes from 'react-static-routes'
import { hot } from 'react-hot-loader'
import ReactGA from 'react-ga'
import CookieConsent from 'react-cookie-consent'

import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
//
import Normalize from 'components/Normalize'
import { theme } from 'theme'
import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
// import 'highlight.js/styles/github.css'
// import 'prism-themes/themes/prism-material-light.css'


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
    line-height: 1.78rem;
    padding: 0;
    background: #FFF;
  }

  h1 {
    display: block;
    margin: 0.67em 0;
  }

  .math-display {
    overflow-x: auto;
    @media (min-width: 74.6875em) {
      overflow-x: initial;
    }
  }

  .remark-highlight {
    font-size: 14px;

    @media (min-width: 74.6875em) {
      font-size: 16px;
    }
  }

  p.hint.tip,
  p.hint.error,
  p.hint.warn {
    letter-spacing: 0;
    box-sizing: border-box;
    font-size: inherit;
    line-height: 1.6rem;
    word-spacing: 0.05rem;
    background-color: rgba(238, 238, 238, 0.5);
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
    padding: 8px 12px 8px 24px;
    margin-bottom: 16px;
    position: relative;
  }

  p.hint.tip:before,
  p.hint.error:before,
  p.hint.warn:before {
    border-radius: 100%;
    color: #fff;
    content: '!';
    font-size: 14px;
    font-weight: 700;
    left: -12px;
    line-height: 20px;
    position: absolute;
    height: 20px;
    width: 20px;
    text-align: center;
    top: 12px;
  }

  p.hint.tip {
    border-left: 4px solid #27ab83;
  }

  p.hint.tip:before {
    background-color: #27ab83;
  }

  p.hint.warn {
    border-left: 4px solid #f0b429;
  }

  p.hint.warn:before {
    background-color: #f0b429;
  }

  p.hint.error {
    border-left: 4px solid #ef4e4e;
  }

  p.hint.error:before {
    background-color: #ef4e4e;
  }


  .content table {
    /* Remove spacing between table cells (from Normalize.css) */
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #cbcbcb;
    font-size: 12px;
    line-height: 1.0rem;

    @media (min-width: 74.6875em) {
      font-size: 19px;
      line-height: 1.78rem;
    }
  }

  .content caption {
      color: #000;
      font: italic 85%/1 arial, sans-serif;
      padding: 1em 0;
      text-align: center;
  }

  .content td,
  .content th {
      border-left: 1px solid #cbcbcb;/*  inner column border */
      border-width: 0 0 0 1px;
      font-size: inherit;
      margin: 0;
      overflow: visible; /*to make ths where the title is really long work*/
      padding: 0.5em 1em; /* cell padding */
  }

  .content thead {
      background-color: #e0e0e0;
      color: #000;
      text-align: left;
      vertical-align: bottom;
  }

  /*
  striping:
    even - #fff (white)
    odd  - #f2f2f2 (light gray)
  */
  .content td {
      background-color: #f2f2f2;
  }

  /* nth-child selector for modern browsers */
  .content tr:nth-child(2n-1) td {
      background-color: transparent;
  }

  /* BORDERED TABLES */
  .content td {
      border-bottom: 1px solid #cbcbcb;
  }
  .content tbody > tr:last-child > td {
      border-bottom-width: 0;
  }


  /* HORIZONTAL BORDERED TABLES */

  .content td,
  .content th {
      border-width: 0 0 1px 0;
      border-bottom: 1px solid #cbcbcb;
  }
  .content tbody > tr:last-child > td {
      border-bottom-width: 0;
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
