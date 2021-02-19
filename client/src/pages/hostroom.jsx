import React, { useEffect, useState, useRef } from "react";
import { setToken } from "../dataHandler/store/actions/spotify";
import Footer from "../components/footer/footer";
import LobbyUsers from "../components/LobbyUsers/LobbyUsers";
import WebPlaybackReact from "../components/spotify/webPlayback";
import TrackTable from "../components/trackTable/TrackTable";
import "./style/hostroom.css";
import QrModal from "../components/modal/qrmodal";

export default function Hostroom(props) {
  useState(() => {
    setToken(props.access_token);
  }, props.access_token);

  return (
    <section>
      <div class="main">
        {props.access_token ? (
          <WebPlaybackReact access_token={props.access_token}>
            <Footer />
          </WebPlaybackReact>
        ) : null}
        <TrackTable
          roomIp={props.roomIp}
          host={true}
          access_token={props.access_token}
          roomKey={props.roomKey}
        ></TrackTable>
        <LobbyUsers host={true} roomIp={props.roomIp}></LobbyUsers>
        <QrModal roomKey={props.roomKey}></QrModal>
      </div>
    </section>
    
  );
}
