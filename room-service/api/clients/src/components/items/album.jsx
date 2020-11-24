import React from 'react';

const album = ({ item, onArtistClick, onClick }) => {
  const artists = item.artists ? item.artists.length : 0;

  return (
    <li>
      <div onClick={() => onClick(item.id)}>
        <img
          alt="album cover"
          src={item.icons ? item.icons[0].url : item.images[0].url}
        />
      </div>
      <p onClick={() => onClick(item.id)}>
        {item.name}
      </p>
      <p>
        {item.artists ? item.artists.map((a, i) => (
              <span key={i}>
                <span
                  onClick={() => onArtistClick(a.id)}
                >
                  {a.name}
                </span>
                {artists !== i + 1 ? <span>, </span> : null}
              </span>
            ))
          : ''}
      </p>
    </li>
  );
};

export default album;
