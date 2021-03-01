import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default function QueueButton(props) {
  const [songuri] = useState(props.songuri);
  const [roomKey, setRoomKey] = useState(props.roomKey);
  const [access_token, setAccess_token] = useState(props.access_token);

  useState(() => {
    setAccess_token(props.access_token);
  }, [props.access_token, access_token]);

  useState(() => {
    setRoomKey(props.roomKey);
  }, [props.roomKey, roomKey]);

  function addToQueue(track) {
    props.ws.send(JSON.stringify({ type: "addTrackToQueue", data: track }))
  }

  return (
    <Button
      color="secondary"
      variant="contained"
      onClick={() => {
        addToQueue({
          name: props.name,
          songuri: props.songuri,
          trackCover: props.trackCover,
          artists: props.artists,
          duration_ms: props.duration_ms
        });
      }}
    > 
    Queue
    </Button>
  );
}
