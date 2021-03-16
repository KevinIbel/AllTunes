import React from 'react';
import SongsPlayer from '../songsPlayer/songsPlayer';

const style = {
  position: 'fixed',
  width: '100%',
  bottom: 0,
  left: 0,
  background: 'rgb(40, 40, 40)',
  height: 90,
  zIndex: 1
};



const footer = props => (
  <div className="footer" style={style}>
    <SongsPlayer host={props.host} />
  </div>
); 

export default footer;
