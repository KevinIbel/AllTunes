import React, { Component } from 'react';

import { connect } from 'react-redux';

import Top from '../../components/topBar/Top';
import PlayBox from '../../components/playBox/playBox';

import Songs from '../../components/sections/songList/songList';
import Artist from '../../components/sections/artist/artist';
import Album from '../../components/sections/album/album';
import Search from '../../components/sections/search/search';
import Modal from '../../components/playlistModal/modal';

class MainSection extends Component {
  render = () => {
    let name = this.props.user.display_name;
    let id = this.props.user.id;
      
    return (
      <div className="main-section">
        <Top username={name || id} />
        <Modal />
        <div className="main-section-container">
          {this.props.view === 'recently' ? <Songs recently /> : null}
          {this.props.view === 'songs' ? <Songs /> : null}
          {this.props.view === 'artist' ? <Artist /> : null}
          {this.props.view === 'album' ? <Album /> : null}
          {this.props.view === 'search' ? <Search /> : null}
        </div>
        <PlayBox/>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    view: state.uiReducer.view
  };
};

export default connect(mapStateToProps)(MainSection);
