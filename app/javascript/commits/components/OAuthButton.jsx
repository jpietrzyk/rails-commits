import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import classnames from 'classnames'

import { oAuthSignIn } from 'redux-oauth'

import omit from 'lodash/omit'
import FlatButton from 'material-ui/FlatButton'
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';

class OAuthSignInButton extends Component {
  static propTypes = {
    provider:     PropTypes.string.isRequired,
    label:        PropTypes.string,
    children:     PropTypes.node,
    icon:         PropTypes.node,
    dispatch:     PropTypes.func,
    disabled:     PropTypes.bool,
    loading:      PropTypes.bool,
    className:    PropTypes.string
  };

  static defaultProps = {
    label: 'Sign In'
  };

  handleClick = () => {
    const { provider, store } = this.props;

    this.props.dispatch(oAuthSignIn({ provider }));
  };

  render() {
    const { disabled, loading, icon, className } = this.props;

    const restProps = omit(this.props, ['disabled', 'loading', 'icon', 'className', 'dispatch', 'provider']);

    const style = {};

    return (
      <FlatButton
        disabled = {disabled}
        onClick = {this.handleClick}
        {...restProps}
      />
    );
  }
}

function mapStateToProps({ auth }, ownProps) {
  const disabled  = auth.getIn(['user', 'isSignedIn']);
  const loading   = auth.getIn(['oAuthSignIn', ownProps.provider, 'loading']);

  return { disabled, loading };
}

export default connect(
  mapStateToProps,
  null,
)(OAuthSignInButton)
