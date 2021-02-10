import React, { useEffect, useState, useRef } from "react";
import { setToken } from "../dataHandler/store/actions/spotify";
import Footer from "../components/footer/footer";
import LobbyUsers from "../components/LobbyUsers/LobbyUsers";
import WebPlaybackReact from "../components/spotify/webPlayback";
import TrackTable from "../components/trackTable/TrackTable";
import QueueSection from "../components/lobbyTopTracks/queueSection";

import "./style/hostroom.css";

export default function Hostroom(props) {
  useState(() => {
    setToken(props.access_token);
  }, props.access_token);

  return (
    <div class="main">
      {props.access_token ? (
        <WebPlaybackReact access_token={props.access_token}>
          <Footer
            host={true}
            roomIp={props.roomIp}
          ></Footer>
        </WebPlaybackReact>
      ) : null}
      <TrackTable
        roomIp={props.roomIp}
        host={true}
        access_token={props.access_token}
        roomKey={props.roomKey}
      ></TrackTable>
      <LobbyUsers  roomIp={props.roomIp}></LobbyUsers>
      <QueueSection host={true} roomIp={props.roomIp}></QueueSection>

    </div>
  );
}
