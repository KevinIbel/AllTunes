import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './components/header/artistHeader';
import Popular from './components/popular/popular';
import Albums from './components/albums/albums';

class Artist extends Component {
  render = () => (
    <section loading={this.props.fetching}>
      <div>
        <Header artist={this.props.artist} />
        <Popular
          tracks={this.props.artist.popularTracks || []}
          artists={this.props.artist.relatedArtists || []}
        />
        {this.props.artist.albums && this.props.artist.albums.length ? (
          <Albums albums={this.props.artist.albums} />
        ) : null}
        {this.props.artist.singles && this.props.artist.singles.length ? (
          <Albums albums={this.props.artist.singles || []} singles />
        ) : null}
      </div>
    </section>
  );
}

const mapStateToProps = state => {
  return {
    artist: state.artistReducer.currentArtist
      ? state.artistReducer.currentArtist
      : {},
    fetching: state.artistReducer.fetchArtistPending
  };
};

export default connect(mapStateToProps)(Artist);
