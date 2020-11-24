import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setModal } from '../../store/actions/uiActions';


class Modal extends Component {
  state = {};
  render() {
    return (
      <div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setModal
    },
    dispatch
  );
};
export default connect(
  mapDispatchToProps
)(Modal);
