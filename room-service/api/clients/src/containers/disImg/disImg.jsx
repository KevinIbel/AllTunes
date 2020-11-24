import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setModal } from '../../store/actions/uiActions';
import TrackCover from '../../components/trackCover/trackCover';


class DisImg extends Component {
  render() {
    return (
      <div>
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
)(DisImg);
