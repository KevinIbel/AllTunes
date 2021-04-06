import React, {useState} from "react";
import { setToken } from "../dataHandler/store/actions/spotify";
import WebPlaybackReact from "../components/spotify/webPlayback";
import LobbyUsers from "../components/LobbyUsers/LobbyUsers";
import TrackTable from "../components/trackTable/TrackTable";
import QueueSection from "../components/lobbyTopTracks/queueSection";
import Footer from "../components/footer/footer";
import QrModal from "../components/modal/qrmodal";
import {BrowserView,MobileView} from "react-device-detect";
import AllTunesLogo from './style/allTunesLogo.png';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import GroupIcon from '@material-ui/icons/Group';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import "./style/hostroom.css";
import "./style/room.css";

export default function Userroom(props) {

  useState(() => {
    setToken(props.access_token);
  }, props.access_token);

  const [currentModal, openModal] = useState(null);

  return (
    <div>
    <BrowserView>
      <div className="main">
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
      <TrackTable 
        roomIp={props.roomIp}>
      </TrackTable>
      ) : null}
          {props.access_token ? (

      <LobbyUsers roomIp={props.roomIp}></LobbyUsers>
      ) : null}
          {props.access_token ? (
      <QueueSection host={true} roomIp={props.roomIp}></QueueSection>
        ) : null}
         <QrModal roomKey={props.roomKey}></QrModal>

    </div>
    </BrowserView>
    <MobileView  >
        <div className="mobileMain">
          <div className="logo">
            <img className="allTunesLogo" src={AllTunesLogo} alt="All Tunes Logo" />
          </div>
          <div className="modal">
            {props.access_token && currentModal === 'roomQueueList' ? 
              <TrackTable
              roomIp={props.roomIp}
              >  
              </TrackTable>
            : null}
          </div>

            <div className="roomModal">
              {props.access_token && currentModal === 'roomList' ?
              <LobbyUsers 
              roomIp={props.roomIp}>
              </LobbyUsers>
              : null}
            </div>

            <div className="modal"> 
            {props.access_token && currentModal === 'queueList' ?
              <QueueSection 
                roomIp={props.roomIp}>
              </QueueSection>
            : null}
            </div>
          
          <div className="switcher">
            <button
             onClick={() => openModal('queueList')} style={{ background: "rgb(40, 40, 40)", border: "none"}}>
              <div style={{ marginLeft: '4.5rem' }}></div>
              <QueueMusicIcon fontSize={"large"}></QueueMusicIcon>
            </button>

            <button onClick={() => openModal('roomQueueList')} style={{ background: "rgb(40, 40, 40)", border: "none" }}>
              <div style={{ marginLeft: '4rem' }}></div>
              <AudiotrackIcon fontSize={"large"}></AudiotrackIcon>
            </button>

            <button  onClick={() => openModal('roomList')} style={{ background: "rgb(40, 40, 40)", border: "none"}}>
              <div style={{ marginLeft: '4.5rem' }}></div>
              <GroupIcon fontSize={"large"}></GroupIcon>
            </button>

          </div>
          <div className="playback">
            <WebPlaybackReact access_token={props.access_token}>
              <Footer
                roomIp={props.roomIp}
              ></Footer>
            </WebPlaybackReact>
          </div>
        </div>
      </MobileView>
    </div>
  );
}
