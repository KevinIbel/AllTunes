import React from "react";
import UserDetails from "../components/userDetails/userDetails";
import LobbyUsers from "../components/LobbyUsers/LobbyUsers";
import TrackTable from "../components/trackTable/TrackTable";
import QueueSection from "../components/lobbyTopTracks/queueSection";
import Footer from "../components/footer/footer";

import "./style/room.css";

export default function Userroom(props) {
  return (
    <div class="main">
      <UserDetails host={true} display_name={props.display_name}></UserDetails>
      <br></br>
      <Footer
          host={false}
          roomIp={props.roomIp}
        ></Footer>
      <TrackTable roomIp={props.roomIp}></TrackTable>
      <LobbyUsers roomIp={props.roomIp}></LobbyUsers>
      <QueueSection host={true} roomIp={props.roomIp}></QueueSection>
    </div>
  );
}
