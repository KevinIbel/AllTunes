import React, {useState} from "react";
import { setToken } from "../dataHandler/store/actions/spotify";
import WebPlaybackReact from "../components/spotify/webPlayback";
import UserDetails from "../components/userDetails/userDetails";
import LobbyUsers from "../components/LobbyUsers/LobbyUsers";
import TrackTable from "../components/trackTable/TrackTable";
import QueueSection from "../components/lobbyTopTracks/queueSection";
import Footer from "../components/footer/footer";
import QrModal from "../components/modal/qrmodal";
import "./style/room.css";



export default function Userroom(props) {

  useState(() => {
    setToken(props.access_token);
  }, props.access_token);

  return (

    <div class="main">
       {props.access_token ? (
                 <WebPlaybackReact access_token={props.access_token}>

      <Footer
        access_token={props.access_token}
          host={false}
          roomIp={props.roomIp}
          
        ></Footer>
                </WebPlaybackReact>

        ) : null}
          {props.access_token ? (
      <TrackTable roomIp={props.roomIp}></TrackTable>
      ) : null}
          {props.access_token ? (

      <LobbyUsers roomIp={props.roomIp}></LobbyUsers>
      ) : null}
          {props.access_token ? (

      <QueueSection 
                host={true} roomIp={props.roomIp}>

                </QueueSection>
                      ) : null}
                       <QrModal roomKey={props.roomKey}></QrModal>

    </div>

  );
}
