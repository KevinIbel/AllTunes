import React from 'react';
import withPlayer from '../../components/hoc/playerHoc';
import './trackCover.css';

const trackCover = props => {
  return props.currentSong.album ? (
    <div className="cover">
      <img class='cover'
        alt="cover"
        src={props.currentSong.album ? props.currentSong.album.images[2].url : ''}
      />
    </div>
  ) : null;
};

export default withPlayer(trackCover);
