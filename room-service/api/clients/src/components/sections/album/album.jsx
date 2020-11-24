import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../../songsTable/albumTable/albumTable';
import withStatus from '../../../hoc/statusHoc';

class Album extends Component {
  render = () => {
    return (
      < section loading={this.props.fetching}>
        <div>
          <Table
            songs={this.props.album.tracks ? this.props.album.tracks : []}
            uri={this.props.album ? this.props.album.uri : ''}
            {...this.props}
          />
        </div>
      </section>
    );
  };
}
const mapStateToProps = state => {
  return {
    album: state.albumReducer.currentAlbum || {},
    fetching: state.albumReducer.fetchAlbumPending
  };
};

export default connect(mapStateToProps)(withStatus(Album));
