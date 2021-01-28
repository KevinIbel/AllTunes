import React, { useEffect, useState } from "react";
import { createRoom } from "../dataHandler/clients/backend";
import "./style/loading.css";
import { Redirect } from "react-router-dom";
//Pushing to master.

export default function Loading(props) {
  const [roomKey, setRoomKey] = useState();

  useEffect(() => {
    if (props.access_token && props.display_name && props.id) {
      async function initRoom() {
        const host = {
          token: props.access_token,
          username: props.display_name,
          hostid: props.id,
        };
        if (host.token && host.username) {
          const data = await createRoom(host);
          setRoomKey(data.roomKey);
          props.setRoomIp(data.roomIp);
        }
      }
      initRoom();
    }
  }, [props.access_token, props.display_name, props.id]);

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
