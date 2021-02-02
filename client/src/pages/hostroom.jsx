import React, { useEffect, useState, useRef } from "react";
import { setToken } from "../dataHandler/store/actions/spotify";
import Footer from "../components/footer/footer";
import LobbyUsers from "../components/LobbyUsers/LobbyUsers";
import WebPlaybackReact from "../components/spotify/webPlayback";
import TrackTable from "../components/trackTable/TrackTable";
import "./style/hostroom.css";

export default function Hostroom(props) {
  const [ws, setWs] = useState();

  useEffect(() => {
    const wsUrl =
      process.env.NODE_ENV == "development"
        ? "ws://localhost:8888"
        : "ws://" + props.roomIp;
    setWs(new WebSocket(wsUrl));
  }, [props.roomIp]);

  useState(() => {
    setToken(props.access_token);
  }, props.access_token);

  return (
    <div class="main">
      {props.access_token ? (
        <WebPlaybackReact access_token={props.access_token}>
          <Footer />
        </WebPlaybackReact>
      ) : null}
      {ws ? (
        <TrackTable
          roomIp={props.roomIp}
          host={true}
          access_token={props.access_token}
          roomKey={props.roomKey}
          ws={ws}
        ></TrackTable>
      ) : null}
      {/* <LobbyUsers host={true} roomIp={props.roomIp} ws={ws}></LobbyUsers> */}
    </div>
  );
}
