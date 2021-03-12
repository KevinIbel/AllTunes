import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function uiHoc(ComposedComponent) {
  class UiHoc extends Component {

    render = () => (
      <ComposedComponent
        {...this.props}
      />
    );
  }
  return connect(null)(UiHoc);
}
