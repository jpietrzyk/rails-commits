import React, { Component } from 'react'
import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'

import Repository from './Repository'
import OAuthButton from './OAuthButton'
import SignOutButton from './SignOutButton'
import DevTools from './DevTools'

const App =(props) => {
  console.log(props)
  return (
    <MuiThemeProvider>
      <div>
        <AppBar
          title="Rails Commits"
          showMenuIconButton={true}
        />
        <Divider/>
        <div key='AuthBtns'>
          <OAuthButton provider='github' key='OAuthGitHubBtn'>GitHub</OAuthButton>
          <SignOutButton key='SignOutBtn' />
        </div>
        <Repository/>
        <DevTools />
      </div>
    </MuiThemeProvider>
  )
}

export default App
