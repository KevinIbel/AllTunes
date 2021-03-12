import React, { useState } from "react";
import { setToken } from "../dataHandler/store/actions/spotify";
import Footer from "../components/footer/footer";
import LobbyUsers from "../components/LobbyUsers/LobbyUsers";
import TrackTable from "../components/trackTable/TrackTable";
import QueueSection from "../components/lobbyTopTracks/queueSection";
import WebPlaybackReact from "../components/spotify/webPlayback";
import "./style/hostroom.css";
import "./style/room.css";
import QrModal from "../components/modal/qrmodal";
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import {
  BrowserView,
  MobileView
} from "react-device-detect";
import OurLogo from './style/ourlogo.png';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import GroupIcon from '@material-ui/icons/Group';

export default function Hostroom(props) {
  useState(() => {
    setToken(props.access_token);
  }, props.access_token);

  const [currentModal, openModal] = useState(null);
  const [appState, changeChange] = useState({
      activeObject: null,
      objects: [{id: 1}]
  });
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
          <div className="modal">
            {currentModal === 'roomQueueList' ? 
              <TrackTable
              roomIp={props.roomIp}
              host={true}
              access_token={props.access_token}
              roomKey={props.roomKey}
              >  
              </TrackTable>
            : null}
            </div>
            <div className="roomModal">
              {currentModal === 'roomList' ?
              <LobbyUsers 
              roomIp={props.roomIp}>
              </LobbyUsers>
              : null}
            </div>
            <div className="modal"> 
            {currentModal === 'queueList' ?
              <QueueSection 
                host={true} 
                roomIp={props.roomIp}>
                </QueueSection>
            : null}
            </div>
          
          <div class="switcher">
            {appState.objects.map((elements,index) => (
            <button key={index} classnName="box active"
             onClick={() => openModal('queueList')} style={{ background: "rgb(40, 40, 40)", border: "none"}}>
              <div style={{ marginLeft: '4.5rem' }}></div>
              <QueueMusicIcon fontSize={"large"}></QueueMusicIcon>
            </button>
             ))}
            <button  onClick={() => openModal('roomList')} style={{ background: "rgb(40, 40, 40)", border: "none"}}>
              <div style={{ marginLeft: '5.5rem' }}></div>
              <GroupIcon fontSize={"large"}></GroupIcon>
            </button>
            <button onClick={() => openModal('roomQueueList')} style={{ background: "rgb(40, 40, 40)", border: "none" }}>
              <div style={{ marginLeft: '4rem' }}></div>
              <AudiotrackIcon fontSize={"large"}></AudiotrackIcon>
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
