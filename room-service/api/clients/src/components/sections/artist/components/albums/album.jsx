import React from 'react';
import moment from 'moment';

import withUiActions from '../../../../../hoc/uiHoc';



const album = ({ album, onAlbumClick }) => (
  <div onClick={() => onAlbumClick(album.id)}>
    <div>
      <img alt="album cover" src={album.images[1].url} />
    </div>
    <div>
      <h4>{album.name}</h4>
      <span >
        {moment(album.release_date).format('YYYY')}
      </span>
    </div>
  </div>
);

export default withUiActions(album);
