import React, { Component }  from 'react'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';

import OAuthButton from './OAuthButton';

const cardStyle = {
  maxWidth: 750,
  margin: '25px auto'
}

const SignIn = () => {
  return(
    <Card style={cardStyle}>
      <CardTitle title="Sign In" subtitle="Authenticate with GitHub" />
      <CardText>
        Press 'Sign In' button to sign with GitHub and see news listllentesque.
      </CardText>
      <CardActions>
        <OAuthButton provider='github' />
      </CardActions>
    </Card>
  )
}

export default SignIn
