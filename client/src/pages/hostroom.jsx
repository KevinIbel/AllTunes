import React, { useState } from "react";
import { setToken } from "../dataHandler/store/actions/spotify";
import Footer from "../components/footer/footer";
import LobbyUsers from "../components/LobbyUsers/LobbyUsers";
import WebPlaybackReact from "../components/spotify/webPlayback";
import TrackTable from "../components/trackTable/TrackTable";
import QueueSection from "../components/lobbyTopTracks/queueSection";
import "./style/hostroom.css";
import "./style/room.css";
import QrModal from "../components/modal/qrmodal";
import {
  BrowserView,
  MobileView
} from "react-device-detect";
import OurLogo from './style/ourlogo.png';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import GroupIcon from '@material-ui/icons/Group';

export default function Hostroom(props) {
  useState(() => {
    setToken(props.access_token);
  }, props.access_token);


  return (
    <div>
      <BrowserView>
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
          <LobbyUsers roomIp={props.roomIp}></LobbyUsers>
          <QueueSection host={true} roomIp={props.roomIp}></QueueSection>
          <QrModal roomKey={props.roomKey}></QrModal>
        </div>
      </BrowserView>
      <MobileView>
        <div class="mobileMain">
          <div class="logo">
            <img class="ourLogo" src={OurLogo} alt="All Tunes Logo" />
          </div>
          <div class="modal">

          </div>
          <div class="switcher">
            <button style={{background:"rgb(40, 40, 40)",border: "none", outlineWidth: 0}}>
            <QueueMusicIcon   fontSize={"large"}></QueueMusicIcon>
            </button>
            <button style={{background:"rgb(40, 40, 40)",border: "none", outlineWidth: 0}}>
            <div style={{ marginLeft: '8rem' }}></div>
            <AudiotrackIcon  fontSize={"large"}></AudiotrackIcon>
            </button>
            <button style={{background:"rgb(40, 40, 40)",border: "none", outlineWidth: 0}}>
            <div style={{ marginLeft: '2.5rem' }}></div>
            <GroupIcon  fontSize={"large"}></GroupIcon>
            </button>
          </div>
          <div class="playback">
            <WebPlaybackReact access_token={props.access_token}>
              <Footer
                host={true}
                roomIp={props.roomIp}
              ></Footer>
            </WebPlaybackReact>
          </div>
        </div>
      </MobileView>
    </div>
  );
}
