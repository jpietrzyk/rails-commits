import React, { Component } from 'react'
import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'

import Repository from './Repository'

const App =() => {
  return (
    <MuiThemeProvider>
      <div>
        <AppBar
          title="Rails Commits"
          showMenuIconButton={true}
        />
        <Divider/>
        <Repository/>
      </div>
    </MuiThemeProvider>
  )
}

export default App
