import React from "react";
import UserDetails from "../components/userDetails/userDetails";
import LobbyUsers from "../components/LobbyUsers/LobbyUsers";
import TrackTable from "../components/trackTable/TrackTable";
import "./style/room.css";

export default function Userroom(props) {
  return (
    <div class="main">
      <UserDetails host={true} display_name={props.display_name}></UserDetails>
      <br></br>
      <TrackTable roomIp={props.roomIp}></TrackTable>
      <LobbyUsers roomIp={props.roomIp}></LobbyUsers>
    </div>
  );
}
