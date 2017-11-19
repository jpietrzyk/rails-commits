import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SignIn from './SignIn'
import Repository from './Repository'

const Feed = (props) => {
  const { signedIn } = props

  if (!signedIn) {
    return (
      <SignIn />
    )
  }

  return (
    <Repository />
  );
}

Feed.propTypes = {
  signedIn: PropTypes.bool,
}

function mapStateToProps(state) {
  const signedIn = state.auth.getIn(['user', 'isSignedIn']) || false
  return { signedIn };
}

export default connect(
  mapStateToProps,
  null,
)(Feed)
