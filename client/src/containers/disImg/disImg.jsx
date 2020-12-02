import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TrackCover from '../../components/trackCover/trackCover';


class DisImg extends Component {
  render() {
    return (
      <div className="left-section">
        <div className="buttom-section">
          <TrackCover />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DisImg);
