import React from 'react';
import withStatus from '../../../../../hoc/statusHoc';

const song = props => {
  const active = props.currentSong === props.item.id && props.playing;
  const buttonClass = !active ? 'fa-play-circle-o' : 'fa-pause-circle-o';

  return (
    <li className={'user-song-item' + (active ? ' active' : '')}>
      <div className="play-img">
        <img alt="song-cover" src={props.item.album.images[2].url} />
      </div>
      <div
        className="r-song"
        onClick={!active ? props.playTrack : props.pauseSong}
      >
        <i className={`fa ${buttonClass} play-btn`} aria-hidden="true" />
        <span>{props.index}</span>
      </div>
      <div className="song-title">
        <p>{props.item.name}</p>
      </div>
    </li>
  );
};

export default withStatus(song);
