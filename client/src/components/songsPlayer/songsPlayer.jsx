import React, { useState, useEffect } from "react";
import DetailSection from "./components/detailsSection";
import SongsControl from "./components/songsControl";
import SongSlider from "./components/songSlider";
import VolumeControl from "./components/volumeControl";
import withPlayer from "../hoc/playerHoc";
import {playTracks, pauseSong, nextSong} from '../../dataHandler/store/actions/spotify';
import "./songsPlayer.css";

const SongsPlayer = props => {
  const [ws, setWs] = useState();

  useEffect(() => {
    const wsUrl =
      process.env.NODE_ENV == "development"
        ? "ws://localhost:8888"
        : "ws://" + props.roomIp;
    setWs(new WebSocket(wsUrl));
  }, [props.roomIp]);

  // Handle the different playback update messages.
  useEffect(() => {
    if (!ws) return;
    // Only update the playback when the message contains playback updates.
    ws.onmessage = (message) => {
      try {
        const contents = JSON.parse(message.data);
        if (contents.type === "skipLastSong") {
          nextSong();
        } else if (contents.type === "previousSong") {
          playTracks([contents.data.uri], contents.data.positionMS);
        } else if (contents.type === "playSong") {
          playTracks([contents.data.uri], contents.data.positionMS);
        } else if (contents.type === "pauseSong") {
          pauseSong();
        }
      } catch (e) {
        // If the message doesn't have playback updates, the playback isn't updated.
        console.log(e);
      }
    };
  }, [props.roomIp, ws]);

  useEffect(() => {
    if (!ws) return;
    ws.onopen = () => {
      ws.send("PlaybackRequest");
    };
  }, [ws]);

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
      <SongSlider
        isEnabled
        value={position / duration}
        position={position}
        duration={duration}
        onChange={value =>
          this.props.seekSong(Math.round(value * duration * 1000))
        }
      />
      ) : null}
      <VolumeControl />
    </div>
    
  );
}

export default withPlayer(SongsPlayer);
