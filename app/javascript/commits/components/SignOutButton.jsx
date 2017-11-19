import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton'

import classnames from 'classnames';

import { signOut } from 'redux-oauth';

import omit from 'lodash/omit';

class SignOutButton extends Component {
  static propTypes = {
    label:        PropTypes.string,
    children:     PropTypes.node,
    icon:         PropTypes.node,
    dispatch:     PropTypes.func,
    disabled:     PropTypes.bool,
    loading:      PropTypes.bool,
    className:    PropTypes.string,
    key: PropTypes.string
  };

  static defaultProps = {
    children: <span>Sign Out</span>,
    icon:     null
  };

  handleClick = () => {
    const { dispatch } = this.props;

    this.props.dispatch(signOut());
  };

  render() {
    const { disabled, loading, icon, className } = this.props;

    const restProps = omit(this.props, ['disabled', 'loading', 'icon', 'className', 'dispatch']);

    const style = {};

    return (
      <RaisedButton
        icon      = {icon}
        disabled  = {disabled}
        onClick   = {this.handleClick}
        {...restProps}
      />
    );
  }
}

function mapStateToProps({ auth }, ownProps) {
  const disabled  = !auth.getIn(['user', 'isSignedIn']);
  const loading   = auth.getIn(['signOut', 'loading']);

  return { disabled, loading };
}

export default connect(
  mapStateToProps,
  null,
)(SignOutButton)
