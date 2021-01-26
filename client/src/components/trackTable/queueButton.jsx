import React, { useState } from "react";
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

  function queueUpSong() {
    var config = {
      method: "post",
      url: `https://api.spotify.com/v1/me/player/queue/?uri=${songuri}`,
      headers: {
        Authorization: "Bearer " + access_token,
      },
    };

    return axios(config)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        throw error;
      });
  }

  return (
    <Button
      color="secondary"
      variant="contained"
      onClick={() => {
        queueUpSong();
      }}
    >
      Queue
    </Button>
  );
}
