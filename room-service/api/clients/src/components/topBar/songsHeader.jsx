import React from 'react';

const simpleHeader = props => (
  <div>
    <h3>{props.title}</h3>
    <button
      onClick={props.playing ? props.pauseSong : props.playSong}
    >
      {props.playing ? 'PAUSE' : 'PLAY'}
    </button>
  </div>
);

export default simpleHeader;
