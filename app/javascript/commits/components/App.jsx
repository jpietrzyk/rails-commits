import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Header from './Header'
import Home from './Home'
import DevTools from './DevTools'

const App =() => {
  return (
    <MuiThemeProvider>
      <div>
        <Header />
        <Home />
        {/*<Repository/>*/}
        <DevTools />
      </div>
    </MuiThemeProvider>
  )
}

export default App
