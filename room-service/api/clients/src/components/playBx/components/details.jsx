import React from 'react';

import withUiActions from '../../../hoc/uiHoc';
import withStatus from '../../../hoc/statusHoc';

const artistName = {
  color: 'black',
  fontSize: 25
};

const details = props => {
  const artists = props.artists.length;
  return (
    <div className="details-section">
      <div className="add-remove-section">
        <p
          onClick={() => props.onAlbumClick(props.album)}
        >
          {props.songName}
        </p>
      </div>
      <div className="artist-name" style={artistName}>
        {props.artists.map((artist, i) => (
          <span key={i}>
            <span
              className="artist"
              onClick={() => props.onArtistClick(artist.uri.split(':')[2])}
            >
              {artist.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default withUiActions(withStatus(details));
