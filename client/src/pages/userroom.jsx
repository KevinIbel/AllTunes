import React, { useState, useEffect } from "react";
import { setToken } from "../dataHandler/store/actions/spotify";
import Footer from "../components/footer/footer";
import UserDetails from "../components/userDetails/userDetails";
import LobbyUsers from "../components/LobbyUsers/LobbyUsers";
import WebPlaybackReact from "../components/spotify/webPlayback";
import TrackTable from "../components/trackTable/TrackTable";
import "./style/room.css";

export default function Useroom(props) {
  const [ws, setWs] = useState();

  useEffect(() => {
    const wsUrl =
      process.env.NODE_ENV == "development"
        ? "ws://localhost:8888"
        : "ws://" + props.roomIp;
    setWs(new WebSocket(wsUrl));
  }, [props.roomIp]);

  return (
    <div class="main">
      <WebPlaybackReact access_token={props.access_token}></WebPlaybackReact>
      <UserDetails host={true} display_name={props.display_name}></UserDetails>
      <br></br>
      {ws ? <TrackTable roomIp={props.roomIp} ws={ws}></TrackTable> : null}
      <LobbyUsers host={true}></LobbyUsers>
    </div>
  );
}
