import React from 'react';
import SongPlayer from '../songsPlayer/songPlayer';

const style = {
  position: 'fixed',
  width: '100%',
  bottom: 0,
  left: 0,
  background: 'rgb(40, 40, 40)',
  height: 80,
  zIndex: 2000
};



const footer = props => (
  <div className="footer" style={style}>
    <SongPlayer host={props.host} />
  </div>
); 

export default footer;
