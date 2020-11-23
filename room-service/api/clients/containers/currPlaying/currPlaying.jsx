import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setModal } from '../../store/actions/uiActions';
import TrackCover from '../../components/trackCover/trackCover';

class currPlaying extends Component {
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
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setModal
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(currPlaying);
