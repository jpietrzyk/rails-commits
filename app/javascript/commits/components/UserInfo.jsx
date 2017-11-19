import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';

import OAuthButton from './OAuthButton';
import Repository from './Repository'

const cardStyle = {
  maxWidth: 750,
  margin: '25px auto'
}

class UserInfo extends Component {
  static propTypes = {
    signedIn: PropTypes.bool,
    provider: PropTypes.string,
    name:     PropTypes.string,
    uid:      PropTypes.string
  }

  render() {
    const { signedIn } = this.props;

    if (!signedIn) {
      return (
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

    return (
      <Repository />
    );
  }
}

function mapStateToProps(state) {
  const signedIn = state.auth.getIn(['user', 'isSignedIn']) || false;

  if (signedIn) {
    const name      = state.auth.getIn(['user', 'attributes', 'name']);
    const provider  = state.auth.getIn(['user', 'attributes', 'provider']);
    const uid       = state.auth.getIn(['user', 'attributes', 'uid']);

    return { signedIn, name, provider, uid };
  }

  return { signedIn };
}

export default connect(
  mapStateToProps,
  null,
)(UserInfo)
