import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AppBar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'

import Avatar from 'material-ui/Avatar';

const Navigation = (props) => {
  return (
    <div>
      <AppBar title="Rails Commits" showMenuIconButton={true}
        iconElementLeft={
          <div>
            { props.isSignedIn &&
              <Avatar
                src={props.img}
                size={50}
              />
            }
          </div>
        }
        iconElementRight={
          <div>
            { props.isSignedIn &&
              <FlatButton
                label = {'SignOut'}
                onClick = {props.onLogout}
              />
            }
          </div>
        }
      />
      <Divider />
    </div>
  )
}

Navigation.propTypes = {
  isSignedIn: PropTypes.bool,
  onLogout: PropTypes.func,
  onMenuToggle: PropTypes.func
}

export default Navigation
