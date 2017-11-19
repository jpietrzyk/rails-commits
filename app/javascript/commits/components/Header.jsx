import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { signOut } from 'redux-oauth';

import Navigation from './Navigation'

class Header extends Component {

  static propTypes = {
    isSignedIn: PropTypes.bool,
    dispatch: PropTypes.func
  }

  state = {
    expanded: false
  }

  handleLogout = () => {
    this.props.dispatch(signOut());
    // browserHistory.push('/');
    this.handleMenuToggle(false);
  }

  handleMenuToggle = (value) => {
    const expanded = typeof value === 'undefined' ? !this.state.expanded : value;

    this.setState({ expanded });
  }

  render() {
    const { ...restProps } = this.props;

    return (
      <Navigation
        onLogout     = {this.handleLogout}
        onMenuToggle = {this.handleMenuToggle}
        expanded     = {this.state.expanded}
        {...restProps}
      />
    );
  }
}

function mapStateToProps(state) {
  const signedIn = !!state.auth.getIn(['user', 'isSignedIn']);

  if (signedIn) {
    const name      = state.auth.getIn(['user', 'attributes', 'name']);
    const uid       = state.auth.getIn(['user', 'attributes', 'uid']);
    const img       = state.auth.getIn(['user', 'attributes', 'image']);

    return { isSignedIn: signedIn, name, uid, img };
  }

  return { isSignedIn: signedIn };
}

export default connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(Header)

