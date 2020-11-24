import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setView, setModal } from '../store/actions/uiActions';
import { fetchArtist } from '../store/actions/artistActions';
import { fetchAlbum } from '../store/actions/albumActions';

export default function(ComposedComponent) {
  class UiHoc extends Component {


    onArtistClick = id => {
      this.props.fetchArtist(id);
      this.props.setView('artist');
    };

    onAlbumClick = id => {
      this.props.fetchAlbum(id);
      this.props.setView('album');
    };

    onSearch = () => {
      this.props.setView('search');
    };

    render = () => (
      <ComposedComponent
        {...this.props}
        onArtistClick={this.onArtistClick}
        onAlbumClick={this.onAlbumClick}
        onSearch={this.onSearch}
      />
    );
  }

  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        fetchArtist,
        fetchAlbum,
        setView,
        setModal
      },
      dispatch
    );
  };

  return connect(null,mapDispatchToProps)(UiHoc);
}
