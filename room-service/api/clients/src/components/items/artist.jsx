import React from 'react';

const artist = ({ item, onClick }) => {
  return (
    <li
      onClick={() => onClick(item.id)}
      style={style}
    >
      <img
        src={item.images.length ? item.images[0].url : artistImg}
        alt={item.name}
        style={imgStyle}
      />
      <p>{item.name}</p>
    </li>
  );
};

export default artist;
