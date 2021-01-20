import React, { useEffect, useState } from "react";
import { createRoom } from "../dataHandler/clients/backend";
import "./style/loading.css";
import { Redirect } from "react-router-dom";

export default function Loading(props) {
  const [roomKey, setRoomKey] = useState();

  useEffect(() => {
    if(props.access_token && props.display_name){
      async function initRoom() {
      const host = {
        token: props.access_token,
        hostname: props.display_name,
        hostid: props.id
      };
      const data = await createRoom(host);
      setRoomKey(data.key);
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
