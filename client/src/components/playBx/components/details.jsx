import React from 'react';

import withUiActions from '../../../hoc/uiHoc';
import withStatus from '../../../hoc/statusHoc';

import './details.css';

const artistName = {
  color: 'white',
  fontSize: 25
};

const albumName = {
  color: 'white',
  fontSize: 65
};

const songName = {
  fontSize: 25
};

const details = props => {
  const artists = props.artists.length;
  return (
    <div className="details-section">
      <div className="add-remove-section">
      <div style={albumName}
          className={
            'song-name' + (props.albumName.length > 30 ? ' overflow' : '')
          }
        >
          {props.albumName}
        </div>
        <div style={songName}
          className={
            'song-name' + (props.songName.length > 30 ? ' overflow' : '')
          }
        >
          {props.songName}
        </div>
      </div>
      <div className="artist-name" style={artistName}>
        {props.artists.map((artist, i) => (
          <span key={i}>
              {artist.name}
            {i + 1 !== artists ? ', ' : ''}
          </span>
        ))}
      </div>
    </div>
  );
};

export default withUiActions(withStatus(details));
