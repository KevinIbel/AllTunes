import React, { useState, useEffect } from "react";
import DetailSection from "./components/detailsSection";
import SongsControl from "./components/songsControl";
import SongSlider from "./components/songSlider";
import VolumeControl from "./components/volumeControl";
import withPlayer from "../hoc/playerHoc";
import {playTracks, pauseSong} from '../../dataHandler/store/actions/spotify';
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

  // This useEffect should handle the different playback update messages.
  // THe different message types are : skipSong, previousSong, pauseSong, playSong, seekSong
  useEffect(() => {
    if (!ws) return;
    // Only update the playback when the message contains playback updates.
    ws.onmessage = (message) => {
      try {
        const contents = JSON.parse(message.data);
        console.log("SONG PLAYER:" + JSON.stringify(contents));
        
        // Here we should handle the different playback updates (eg. pause, play, skip)
        if (contents.type === "skipSong") { // The data should come is as data: { uris: [one_song's_uri] } (no position_ms because it will always be 0 for skipSong)
        playTracks([contents.data.uri], contents.data.position_ms)     
          // Make user's spotify play a given song. (will have a Song URI and position 0 (if position isn't 0 by default))
          // This is because we keep track of what's next in our app, not in SPotify
        } else if (contents.type === "previousSong") {
          playTracks([contents.data.uri], contents.data.position_ms)

          // Just set the current song to pos 0
        } else if (contents.type === "playSong") {
        console.log("SONG PLAYER playSong msg type:" + JSON.stringify(contents.data));
        playTracks([contents.data.uri], contents.data.position_ms)
        // play the song

      } //rest of msg type handling goes here
        
         else if (contents.type === "pauseSong") {

          pauseSong()
          // pause the song
        } //rest of msg type handling goes here

      } catch (e) {
        // If the message doesn't have playback updates, the playback isn't updated.
        console.log(e);
      }
    };
  }, [props.roomIp, ws]);

  // We should use this useEffect to make it so that a user's Spotify playback is updated when the join/the WS gets set up.

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
