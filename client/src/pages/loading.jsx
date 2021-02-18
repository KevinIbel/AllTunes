import React, { useEffect, useState } from "react";
import { createRoom } from "../dataHandler/clients/backend";
import { Redirect } from "react-router-dom";
import "./style/loading.css";

//Pushing to master.

export default function Loading(props) {
  const [roomKey, setRoomKey] = useState();

  useEffect(() => {
    if (props.access_token && props.display_name && props.userId) {
      async function initRoom() {
        const host = {
          token: props.access_token,
          username: props.display_name,
          hostId: props.userId,
        };
        let data = await createRoom(host);
        if (process.env.NODE_ENV == "development") {
          data = { roomKey: "00000000" };
        }
        setRoomKey(data.roomKey);
        props.setRoomIp(data.roomIp);
      }
      initRoom();
    }
  }, [props.access_token, props.display_name, props.userId]);

  return roomKey ? (
    <Redirect
      to={`/hostroom/#roomKey=${roomKey}&access_token=${props.access_token}`}
    ></Redirect>
  ) : (
    <div class={"loadingText"}>
      The page is loading, you will be redirected shortly!
    </div>
  );
}
