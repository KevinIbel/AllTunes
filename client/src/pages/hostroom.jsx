import React, { useState } from "react";
import { setToken } from "../dataHandler/store/actions/spotify";
import Footer from "../components/footer/footer";
import WebPlaybackReact from "../components/spotify/webPlayback";
import TrackTable from "../components/trackTable/TrackTable";
import "./style/hostroom.css";

export default function Hostroom(props) {
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [access_token, setAccess_token] = useState(props.access_token);
  const [roomKey, setRoomKey] = useState(props.roomKey);

  useState(() => {
    setAccess_token(props.access_token);
    setToken(props.access_token);
  }, props.access_token);

  useState(() => {
    setRoomKey(props.roomKey);
  }, props.roomKey);

  return (
    <div class="main">
      <WebPlaybackReact access_token={access_token}>
        <Footer />
      </WebPlaybackReact>
      <br></br>
      <TrackTable
        roomIp={props.roomIp}
        host={true}
        access_token={access_token}
        roomKey={roomKey}
      ></TrackTable>
    </div>
  );
}
