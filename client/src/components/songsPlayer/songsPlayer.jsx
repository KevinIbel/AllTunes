import React from "react";

import "./songsPlayer.css";

import DetailSection from "./components/detailsSection";
import SongsControl from "./components/songsControl";
import SongSider from "./components/songSider";
import VolumeControl from "./components/volumeControl";
import withPlayer from "../hoc/playerHoc";

function SongsPlayer(props) {
  function toSeconds(ms) {
    return ms / 1000;
  }

  const position = toSeconds(props.trackPosition) || 0;
  const duration = props.currentSong
    ? toSeconds(props.currentSong.duration_ms)
    : 1;

  return (
    
 
    <div className="player-container">
      {(props.currentSong.id) ? (
        <DetailSection
          ids={
            props.currentSong.linked_from.id
              ? `${props.currentSong.linked_from.id},${props.currentSong.id}`
              : props.currentSong.id
          }
          contains={props.contains}
          songName={props.currentSong.name || ""}
          album={props.currentSong.album.uri.split(":")[2]}
          artists={props.currentSong.artists || []}
        />
      ) : null}
      {(props.host) ? (
      <SongsControl {...props} />
      ) : null}
      {(props.host) ? (
      <SongSider
        isEnabled
        value={position / duration}
        position={position}
        duration={duration}
        onChange={(value) =>
          props.seekSong(Math.round(value * duration * 1000))
        }
      />
      ) : null}
      <VolumeControl />
    </div>
    
  );
}

export default withPlayer(SongsPlayer);
