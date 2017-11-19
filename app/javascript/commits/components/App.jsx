import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Header from './Header'
import Home from './Home'

const App =() => {
  return (
    <MuiThemeProvider>
      <div>
        <Header />
        <Home />
      </div>
    </MuiThemeProvider>
  )
}

export default App
