import React, { useState } from "react";
import { setToken } from "../dataHandler/store/actions/spotify";
import Footer from "../components/footer/footer";
import LobbyUsers from "../components/LobbyUsers/LobbyUsers";
import TrackTable from "../components/trackTable/TrackTable";
import QueueSection from "../components/lobbyTopTracks/queueSection";
import WebPlaybackReact from "../components/spotify/webPlayback";
import QrModal from "../components/modal/qrmodal";
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import { BrowserView, MobileView } from "react-device-detect";
import AllTunesLogo from './style/allTunesLogo.png';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import GroupIcon from '@material-ui/icons/Group';
import QRCode from "react-weblineindia-qrcode-generator";
import "./style/hostroom.css";
import "./style/room.css";

export default function Hostroom(props) {
  useState(() => {
    setToken(props.access_token);
  }, props.access_token);

  const url = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "http://35.246.33.106:3000"

  const [currentModal, openModal] = useState(null);


  
  return (
    <div>
      <BrowserView>
        <div className="main">
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
          <div class="qr">
            <QrModal roomKey={props.roomKey}></QrModal>
          </div>
        </div>
      </BrowserView>
      <MobileView  >
        <div className="mobileMain">
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

          <div className="queueueueue">
            {currentModal === 'queueList' ?
              <QueueSection
                host={true}
                roomIp={props.roomIp}>
              </QueueSection>
              : null}
          </div>

          <div className="qrMobile">
            {currentModal === 'qrCode' ?
              <QRCode value={url + `#roomKey=${props.roomKey}`} size={250} />
              : null}
          </div>

          <div className="switcher">
            <button
              onClick={() => openModal('queueList')} style={{ background: "rgb(40, 40, 40)", border: "none" }}>
              <div style={{ marginLeft: '4.5rem' }}></div>
              <QueueMusicIcon fontSize={"large"}></QueueMusicIcon>
            </button>

            <button onClick={() => openModal('roomQueueList')} style={{ background: "rgb(40, 40, 40)", border: "none" }}>
              <div style={{ marginLeft: '4rem' }}></div>
              <AudiotrackIcon fontSize={"large"}></AudiotrackIcon>
            </button>

            <button onClick={() => openModal('roomList')} style={{ background: "rgb(40, 40, 40)", border: "none" }}>
              <div style={{ marginLeft: '4.5rem' }}></div>
              <GroupIcon fontSize={"large"}></GroupIcon>
            </button>

            <button onClick={() => openModal('qrCode')} style={{ background: "rgb(40, 40, 40)", border: "none" }}>
              <div style={{ marginLeft: '4.5rem' }}></div>
              <AddCircleOutlineIcon fontSize={"large"}></AddCircleOutlineIcon>
            </button>

          </div>
          <div className="playback">
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
