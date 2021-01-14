import React from "react";



import QueueDetailsSection from "../components/queueDetails";
import withPlayer from "../../hoc/playerHoc";

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
      {props.nextSong.id ? (
        <QueueDetailsSection
          ids={
            props.nextSong.linked_from.id
              ? `${props.nextSong.linked_from.id},${props.nextSong.id}`
              : props.nextSong.id
          }
          contains={props.contains}
          songName={props.nextSong.name || ""}
          album={props.nextSong.album.uri.split(":")[2]}
          artists={props.nextSong.artists || []}
        />
      ) : null}
    </div>
    
  );
}

export default withPlayer(SongsPlayer);
