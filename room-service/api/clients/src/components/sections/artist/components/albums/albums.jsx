import React from 'react';

import Album from './album';

const albums = ({ albums, singles = false }) =>
  albums ? (
    <div>
      <div>
        <p>{singles ? 'Singles and EPs' : 'Albums'}</p>
        <div>
          {albums.map((album, i) => (
            <Album album={album} key={i} />
          ))}
        </div>
      </div>
    </div>
  ) : null;

export default albums;
