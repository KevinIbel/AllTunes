import React from 'react';

import './artistHeader.css';
import withPlayer from '../../../../../hoc/playerHoc';

const artistHeader = ({
  artist,
  playing,
  playContext,
  pauseSong,
  currentSong
}) => (
  <div>
    <div>
      <img
        alt="artist"
        src={artist.images && artist.images[0] ? artist.images[0].url : ''}
      />
      <div>
        <h3>{artist.name}</h3>
        <div>
          <div>
            {playing && artist.uri === currentSong.artists[0].uri ? (
              <button
                onClick={pauseSong}
              >
                {'PAUSE'}
              </button>
            ) : (
              <button
                onClick={() => playContext(artist.uri, 0)}
              >
                {'PLAY'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withPlayer(artistHeader);
