import React, { useEffect, useState } from "react";
import UserDetails from "../components/userDetails/userDetails";
import LobbyUsers from "../components/LobbyUsers/LobbyUsers";
import TrackTable from "../components/trackTable/TrackTable";
import QrModal from "../components/modal/qrmodal";
import "./style/room.css";

export default function Userroom(props) {
  return (
    <section>
      <div class="main">
        <UserDetails host={true} display_name={props.display_name}></UserDetails>
        <br></br>
        <TrackTable roomIp={props.roomIp}></TrackTable>
        <LobbyUsers roomIp={props.roomIp}></LobbyUsers>
        <QrModal roomKey={props.roomKey}></QrModal>
      </div>
    </section>
  );
}
