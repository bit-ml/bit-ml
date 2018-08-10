import React from 'react'
import ReactDOM from 'react-dom'

// Your top level component
import App from './App'


// Load fonts in a non-blocking way.
// This will make sure WebFont.load is only used in the browser.
if (typeof window !== 'undefined') {
  const WebFont = require('webfontloader')

  WebFont.load({
    google: {
      families: ['Roboto:300,400,500', 'Exo+2:400,600'],
    },
  })
}

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined') {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate || ReactDOM.render
  const render = Comp => {
    renderMethod(<Comp />, document.getElementById('root'))
  }

  // Render!
  render(App)
}
